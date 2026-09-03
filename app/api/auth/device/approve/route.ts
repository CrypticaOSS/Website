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
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.json(
        {
          ok: false,
          code: "UNAUTHORIZED",
          error: "You need to sign in before approving a device.",
        },
        {
          status: 401,
        }
      )
    }

    const session = await getSessionWithProvider(token)

    if (!session) {
      return NextResponse.json(
        {
          ok: false,
          code: "UNAUTHORIZED",
          error: "Your session is invalid or has expired.",
        },
        {
          status: 401,
        }
      )
    }

    if (!session.user?.id) {
      console.error(
        "[AUTH:DEVICE:APPROVE] Session did not contain a user ID."
      )

      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_SESSION",
          error: "Unable to identify the signed-in user.",
        },
        {
          status: 401,
        }
      )
    }

    const body = (await request.json()) as {
      userCode?: unknown
    }

    const userCode =
      typeof body.userCode === "string"
        ? body.userCode.trim().toUpperCase()
        : ""

    if (!userCode) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_CODE",
          error: "A device code is required.",
        },
        {
          status: 400,
        }
      )
    }

    if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(userCode)) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_CODE",
          error: "The device code is invalid.",
        },
        {
          status: 400,
        }
      )
    }

    await approveDevice({
      userCode,
      userId: session.user.id,
    })

    return NextResponse.json({
      ok: true,
      approved: true,
    })
  } catch (error) {
    console.error("[AUTH:DEVICE:APPROVE]", error)

    if (error instanceof CrypticaApiError) {
      return NextResponse.json(
        {
          ok: false,
          code:
            error.code ??
            "DEVICE_APPROVAL_FAILED",
          error: error.message,
        },
        {
          status: error.status,
        }
      )
    }

    return NextResponse.json(
      {
        ok: false,
        code: "INTERNAL_SERVER_ERROR",
        error: "Unable to approve this device.",
      },
      {
        status: 500,
      }
    )
  }
}