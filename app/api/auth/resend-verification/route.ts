import {
  createHash,
  randomBytes,
} from "node:crypto"

import { NextResponse } from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

import {
  sendVerificationEmail,
} from "@/lib/email/send-verification-email"

import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const VERIFICATION_TTL_MS =
  30 * 60 * 1000

function hashToken(
  token: string,
) {
  return createHash("sha256")
    .update(token)
    .digest("hex")
}

function debugLog(
  message: string,
  data?: Record<string, unknown>,
) {
  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    if (data) {
      console.log(
        `[AUTH:RESEND-VERIFICATION] ${message}`,
        data,
      )
    } else {
      console.log(
        `[AUTH:RESEND-VERIFICATION] ${message}`,
      )
    }
  }
}

export async function POST() {
  const requestStartedAt =
    Date.now()

  debugLog(
    "Request received.",
  )

  try {
    /*
     * ------------------------------------------------------------
     * Session
     * ------------------------------------------------------------
     */

    debugLog(
      "Checking current session...",
    )

    const session =
      await getCurrentSession()

    if (!session) {
      debugLog(
        "No authenticated session found.",
      )

      return NextResponse.json(
        {
          error:
            "You must be signed in.",
        },
        {
          status: 401,
        },
      )
    }

    debugLog(
      "Authenticated session found.",
      {
        userId:
          session.user.id,

        email:
          session.user.email,

        role:
          session.user.role,

        emailVerifiedAt:
          session.user
            .emailVerifiedAt ??
          null,
      },
    )

    /*
     * ------------------------------------------------------------
     * User
     * ------------------------------------------------------------
     */

    debugLog(
      "Loading user from database...",
    )

    const user =
      await prisma.user.findUnique({
        where: {
          id:
            session.user.id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          emailVerifiedAt: true,
        },
      })

    if (!user) {
      console.error(
        "[AUTH:RESEND-VERIFICATION] User from session does not exist in database.",
        {
          userId:
            session.user.id,
        },
      )

      return NextResponse.json(
        {
          error:
            "Account not found.",
        },
        {
          status: 404,
        },
      )
    }

    debugLog(
      "User loaded successfully.",
      {
        userId:
          user.id,

        email:
          user.email,

        name:
          user.name ??
          null,

        verified:
          Boolean(
            user.emailVerifiedAt,
          ),

        emailVerifiedAt:
          user.emailVerifiedAt
            ?.toISOString() ??
          null,
      },
    )

    /*
     * ------------------------------------------------------------
     * Already verified
     * ------------------------------------------------------------
     */

    if (
      user.emailVerifiedAt
    ) {
      debugLog(
        "Email is already verified. Resend cancelled.",
        {
          userId:
            user.id,

          email:
            user.email,
        },
      )

      return NextResponse.json(
        {
          error:
            "Your email address is already verified.",
        },
        {
          status: 400,
        },
      )
    }

    /*
     * ------------------------------------------------------------
     * Generate token
     * ------------------------------------------------------------
     */

    debugLog(
      "Generating new verification token...",
    )

    const rawToken =
      randomBytes(32)
        .toString(
          "base64url",
        )

    const tokenHash =
      hashToken(
        rawToken,
      )

    const expiresAt =
      new Date(
        Date.now() +
          VERIFICATION_TTL_MS,
      )

    debugLog(
      "Verification token generated.",
      {
        /*
         * Never log rawToken.
         *
         * A small portion of the hash is
         * safe enough for correlating logs.
         */
        tokenHashPrefix:
          tokenHash.slice(
            0,
            8,
          ),

        tokenLength:
          rawToken.length,

        expiresAt:
          expiresAt.toISOString(),
      },
    )

    /*
     * ------------------------------------------------------------
     * Replace existing tokens
     * ------------------------------------------------------------
     */

    debugLog(
      "Replacing existing unused verification tokens...",
      {
        userId:
          user.id,
      },
    )

    const [
      deleteResult,
      createdToken,
    ] =
      await prisma.$transaction(
        async (tx) => {
          const deleted =
            await tx.emailVerificationToken.deleteMany({
              where: {
                userId:
                  user.id,

                usedAt:
                  null,
              },
            })

          const created =
            await tx.emailVerificationToken.create({
              data: {
                userId:
                  user.id,

                tokenHash,

                expiresAt,
              },

              select: {
                id: true,
                createdAt: true,
                expiresAt: true,
              },
            })

          return [
            deleted,
            created,
          ] as const
        },
      )

    debugLog(
      "Verification token stored.",
      {
        removedOldTokens:
          deleteResult.count,

        verificationTokenId:
          createdToken.id,

        createdAt:
          createdToken.createdAt.toISOString(),

        expiresAt:
          createdToken.expiresAt.toISOString(),
      },
    )

    /*
     * ------------------------------------------------------------
     * Send email
     * ------------------------------------------------------------
     */

    debugLog(
      "Attempting verification email delivery...",
      {
        to:
          user.email,

        name:
          user.name ??
          "Cryptica user",
      },
    )

    const emailStartedAt =
      Date.now()

    try {
      await sendVerificationEmail({
        to:
          user.email,

        name:
          user.name ??
          "Cryptica user",

        token:
          rawToken,
      })

      debugLog(
        "Verification email delivered successfully.",
        {
          to:
            user.email,

          durationMs:
            Date.now() -
            emailStartedAt,
        },
      )
    } catch (error) {
      console.error(
        "[AUTH:RESEND-VERIFICATION] Email delivery failed:",
        {
          to:
            user.email,

          durationMs:
            Date.now() -
            emailStartedAt,

          error:
            error instanceof Error
              ? {
                  name:
                    error.name,

                  message:
                    error.message,

                  stack:
                    error.stack,
                }
              : error,
        },
      )

      /*
       * Remove the token because the user
       * never received the corresponding link.
       */

      debugLog(
        "Cleaning up failed verification token...",
        {
          tokenHashPrefix:
            tokenHash.slice(
              0,
              8,
            ),
        },
      )

      try {
        await prisma.emailVerificationToken.delete({
          where: {
            tokenHash,
          },
        })

        debugLog(
          "Failed verification token removed.",
        )
      } catch (
        cleanupError
      ) {
        console.error(
          "[AUTH:RESEND-VERIFICATION] Failed to clean up verification token:",
          cleanupError,
        )
      }

      return NextResponse.json(
        {
          error:
            "We couldn't send the verification email. Please try again.",
        },
        {
          status: 502,
        },
      )
    }

    /*
     * ------------------------------------------------------------
     * Success
     * ------------------------------------------------------------
     */

    debugLog(
      "Request completed successfully.",
      {
        durationMs:
          Date.now() -
          requestStartedAt,

        userId:
          user.id,

        email:
          user.email,
      },
    )

    return NextResponse.json(
      {
        ok: true,

        message:
          "Verification email sent.",
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(
      "[AUTH:RESEND-VERIFICATION] Unexpected route error:",
      {
        durationMs:
          Date.now() -
          requestStartedAt,

        error:
          error instanceof Error
            ? {
                name:
                  error.name,

                message:
                  error.message,

                stack:
                  error.stack,
              }
            : error,
      },
    )

    return NextResponse.json(
      {
        error:
          "Unable to resend verification email.",
      },
      {
        status: 500,
      },
    )
  }
}