// src/app/api/auth/device/approve/route.ts

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { AUTH_COOKIE_NAME } from "@/lib/auth/config"
import { getSessionWithProvider } from "@/lib/auth/provider"

import {
  approveDevice,
  CrypticaApiError,
} from "@/lib/crypticaApi"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* Read auth cookie                                                       */
    /* ---------------------------------------------------------------------- */

    const cookieStore = await cookies()

    const availableCookies = cookieStore
      .getAll()
      .map((cookie) => cookie.name)

    console.log(
      "[AUTH:DEVICE:APPROVE] Available cookies:",
      availableCookies
    )

    console.log(
      "[AUTH:DEVICE:APPROVE] Looking for cookie:",
      AUTH_COOKIE_NAME
    )

    const authCookie =
      cookieStore.get(AUTH_COOKIE_NAME)

    const token =
      authCookie?.value ?? null

    console.log(
      "[AUTH:DEVICE:APPROVE] Auth cookie:",
      {
        found: Boolean(token),
        name: authCookie?.name ?? null,
        tokenLength:
          token?.length ?? 0,
      }
    )

    if (!token) {
      console.warn(
        "[AUTH:DEVICE:APPROVE] No authentication cookie was found."
      )

      return NextResponse.json(
        {
          ok: false,
          code: "UNAUTHORIZED",
          error:
            "You need to sign in before approving a device.",
        },
        {
          status: 401,
        }
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Resolve website session                                                */
    /* ---------------------------------------------------------------------- */

    console.log(
      "[AUTH:DEVICE:APPROVE] Validating session token...",
      {
        tokenLength: token.length,
      }
    )

    let session

    try {
      session =
        await getSessionWithProvider(
          token
        )
    } catch (error) {
      console.error(
        "[AUTH:DEVICE:APPROVE] Session provider threw an error:",
        error
      )

      return NextResponse.json(
        {
          ok: false,
          code:
            "SESSION_PROVIDER_ERROR",
          error:
            "Unable to validate your current session.",
        },
        {
          status: 500,
        }
      )
    }

    console.log(
      "[AUTH:DEVICE:APPROVE] Session validation result:",
      session
        ? {
            found: true,
            hasUser:
              Boolean(session.user),
            userId:
              session.user?.id ??
              null,
            email:
              session.user?.email ??
              null,
          }
        : {
            found: false,
          }
    )

    if (!session) {
      console.warn(
        "[AUTH:DEVICE:APPROVE] Session provider returned no session.",
        {
          cookieName:
            AUTH_COOKIE_NAME,
          tokenLength:
            token.length,
        }
      )

      return NextResponse.json(
        {
          ok: false,
          code:
            "SESSION_NOT_FOUND",
          error:
            "Your session is invalid or has expired.",
        },
        {
          status: 401,
        }
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Validate session user                                                  */
    /* ---------------------------------------------------------------------- */

    const userId =
      session.user?.id

    if (!userId) {
      console.error(
        "[AUTH:DEVICE:APPROVE] Session exists but did not contain a user ID.",
        {
          hasUser:
            Boolean(session.user),
          email:
            session.user?.email ??
            null,
        }
      )

      return NextResponse.json(
        {
          ok: false,
          code:
            "INVALID_SESSION",
          error:
            "Unable to identify the signed-in user.",
        },
        {
          status: 401,
        }
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Parse device code                                                      */
    /* ---------------------------------------------------------------------- */

    let body: {
      userCode?: unknown
    }

    try {
      body =
        (await request.json()) as {
          userCode?: unknown
        }
    } catch {
      console.warn(
        "[AUTH:DEVICE:APPROVE] Request body was not valid JSON."
      )

      return NextResponse.json(
        {
          ok: false,
          code:
            "INVALID_REQUEST",
          error:
            "The request body is invalid.",
        },
        {
          status: 400,
        }
      )
    }

    const userCode =
      typeof body.userCode ===
        "string"
        ? body.userCode
            .trim()
            .toUpperCase()
        : ""

    console.log(
      "[AUTH:DEVICE:APPROVE] Device code received:",
      {
        present:
          Boolean(userCode),
        userCode,
      }
    )

    if (!userCode) {
      return NextResponse.json(
        {
          ok: false,
          code:
            "INVALID_CODE",
          error:
            "A device code is required.",
        },
        {
          status: 400,
        }
      )
    }

    if (
      !/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(
        userCode
      )
    ) {
      console.warn(
        "[AUTH:DEVICE:APPROVE] Invalid device code format:",
        {
          userCode,
        }
      )

      return NextResponse.json(
        {
          ok: false,
          code:
            "INVALID_CODE",
          error:
            "The device code is invalid.",
        },
        {
          status: 400,
        }
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Approve device                                                         */
    /* ---------------------------------------------------------------------- */

    console.log(
      "[AUTH:DEVICE:APPROVE] Approving device:",
      {
        userCode,
        userId,
      }
    )

    await approveDevice({
      userCode,
      userId,
    })

    console.log(
      "[AUTH:DEVICE:APPROVE] Device approved successfully:",
      {
        userCode,
        userId,
      }
    )

    return NextResponse.json({
      ok: true,
      approved: true,
    })
  } catch (error) {
    console.error(
      "[AUTH:DEVICE:APPROVE] Unhandled error:",
      error
    )

    if (
      error instanceof
      CrypticaApiError
    ) {
      return NextResponse.json(
        {
          ok: false,
          code:
            error.code ??
            "DEVICE_APPROVAL_FAILED",
          error:
            error.message,
        },
        {
          status:
            error.status,
        }
      )
    }

    return NextResponse.json(
      {
        ok: false,
        code:
          "INTERNAL_SERVER_ERROR",
        error:
          "Unable to approve this device.",
      },
      {
        status: 500,
      }
    )
  }
}
