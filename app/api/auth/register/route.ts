import {
  createHash,
  randomBytes,
} from "node:crypto"

import argon2 from "argon2"
import { NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"

import {
  AUTH_COOKIE_NAME,
  MOCK_SESSION_TTL_SECONDS,
} from "@/lib/auth/config"

import {
  sendVerificationEmail,
} from "@/lib/email/send-verification-email"

import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

const EMAIL_VERIFICATION_TTL_MS =
  30 * 60 * 1000

const SESSION_TTL_SECONDS =
  Number(
    process.env.AUTH_SESSION_TTL_SECONDS ??
      MOCK_SESSION_TTL_SECONDS,
  )

type RegisterBody = {
  name?: unknown
  email?: unknown
  password?: unknown
}

function normalizeEmail(
  email: string,
) {
  return email
    .trim()
    .toLowerCase()
}

function isValidEmail(
  email: string,
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email,
  )
}

function validatePassword(
  password: string,
) {
  if (
    password.length < 12
  ) {
    return "Password must contain at least 12 characters."
  }

  if (
    !/[A-Z]/.test(
      password,
    )
  ) {
    return "Password must contain an uppercase letter."
  }

  if (
    !/[a-z]/.test(
      password,
    )
  ) {
    return "Password must contain a lowercase letter."
  }

  if (
    !/\d/.test(
      password,
    )
  ) {
    return "Password must contain a number."
  }

  if (
    !/[^A-Za-z0-9]/.test(
      password,
    )
  ) {
    return "Password must contain a symbol."
  }

  return null
}

function hashToken(
  token: string,
) {
  return createHash(
    "sha256",
  )
    .update(token)
    .digest("hex")
}

export async function POST(
  request: Request,
) {
  try {
    let body: RegisterBody

    try {
      body =
        await request.json()
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid request body.",
        },
        {
          status: 400,
        },
      )
    }

    const name =
      typeof body.name ===
      "string"
        ? body.name.trim()
        : ""

    const email =
      typeof body.email ===
      "string"
        ? normalizeEmail(
            body.email,
          )
        : ""

    const password =
      typeof body.password ===
      "string"
        ? body.password
        : ""

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Name is required.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      name.length > 100
    ) {
      return NextResponse.json(
        {
          error:
            "Name is too long.",
        },
        {
          status: 400,
        },
      )
    }

    if (
      !email ||
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          error:
            "Enter a valid email address.",
        },
        {
          status: 400,
        },
      )
    }

    const passwordError =
      validatePassword(
        password,
      )

    if (
      passwordError
    ) {
      return NextResponse.json(
        {
          error:
            passwordError,
        },
        {
          status: 400,
        },
      )
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },

        select: {
          id: true,
        },
      })

    if (
      existingUser
    ) {
      return NextResponse.json(
        {
          error:
            "An account with this email address already exists.",
        },
        {
          status: 409,
        },
      )
    }

    /*
     * ------------------------------------------------------------
     * Password hash
     * ------------------------------------------------------------
     *
     * This is the authentication password hash.
     *
     * It is NOT the vault encryption key.
     */

    const passwordHash =
      await argon2.hash(
        password,
        {
          type:
            argon2.argon2id,

          memoryCost:
            Number(
              process.env
                .ARGON2_MEMORY_COST ??
                "65536",
            ),

          timeCost:
            Number(
              process.env
                .ARGON2_TIME_COST ??
                "3",
            ),

          parallelism:
            Number(
              process.env
                .ARGON2_PARALLELISM ??
                "1",
            ),
        },
      )

    /*
     * ------------------------------------------------------------
     * Session token
     * ------------------------------------------------------------
     */

    const sessionToken =
      randomBytes(32)
        .toString(
          "base64url",
        )

    const sessionTokenHash =
      hashToken(
        sessionToken,
      )

    /*
     * ------------------------------------------------------------
     * Email verification token
     * ------------------------------------------------------------
     */

    const verificationToken =
      randomBytes(32)
        .toString(
          "base64url",
        )

    const verificationTokenHash =
      hashToken(
        verificationToken,
      )

    const now =
      new Date()

    const sessionExpiresAt =
      new Date(
        now.getTime() +
          SESSION_TTL_SECONDS *
            1000,
      )

    const verificationExpiresAt =
      new Date(
        now.getTime() +
          EMAIL_VERIFICATION_TTL_MS,
      )

    /*
     * ------------------------------------------------------------
     * Create account
     * ------------------------------------------------------------
     */

    const user =
      await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return tx.user.create({
            data: {
              name,
              email,

              credentials: {
                create: {
                  passwordHash,
                },
              },

              sessions: {
                create: {
                  tokenHash:
                    sessionTokenHash,

                  expiresAt:
                    sessionExpiresAt,
                },
              },

              emailVerificationTokens:
                {
                  create: {
                    tokenHash:
                      verificationTokenHash,

                    expiresAt:
                      verificationExpiresAt,
                  },
                },

              auditEvents: {
                create: {
                  type:
                    "ACCOUNT_CREATED",

                  metadata: {
                    registration:
                      "credentials",
                  },
                },
              },
            },

            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              emailVerifiedAt:
                true,
              createdAt: true,
            },
          })
        },
      )

    /*
     * ------------------------------------------------------------
     * Verification email
     * ------------------------------------------------------------
     *
     * Deliberately outside the database transaction.
     */

    let verificationEmailSent =
      true

    try {
      await sendVerificationEmail({
        to: user.email,

        name:
          user.name ??
          "Cryptica user",

        token:
          verificationToken,
      })
    } catch (error) {
      verificationEmailSent =
        false

      console.error(
        "[AUTH:REGISTER] Failed to send verification email:",
        error,
      )
    }

    /*
     * ------------------------------------------------------------
     * Response
     * ------------------------------------------------------------
     */

    const response =
      NextResponse.json(
        {
          ok: true,

          user: {
            id:
              user.id,

            name:
              user.name,

            email:
              user.email,

            image:
              user.image,

            role:
              user.role,

            emailVerifiedAt:
              user.emailVerifiedAt
                ?.toISOString() ??
              null,
          },

          emailVerification:
            {
              required:
                true,

              sent:
                verificationEmailSent,
            },
        },
        {
          status: 201,
        },
      )

    /*
     * ------------------------------------------------------------
     * Session cookie
     * ------------------------------------------------------------
     */

    response.cookies.set({
      name:
        AUTH_COOKIE_NAME,

      value:
        sessionToken,

      httpOnly:
        true,

      secure:
        process.env
          .NODE_ENV ===
        "production",

      sameSite:
        "lax",

      path:
        "/",

      maxAge:
        SESSION_TTL_SECONDS,
    })

    return response
  } catch (error) {
    console.error(
      "[AUTH:REGISTER] Registration failed:",
      error,
    )

    return NextResponse.json(
      {
        error:
          "Unable to create your account right now.",
      },
      {
        status: 500,
      },
    )
  }
}