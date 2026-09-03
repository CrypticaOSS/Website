import { NextResponse } from "next/server"

import { AUTH_COOKIE_NAME, AUTH_MODE } from "@/lib/auth/config"
import { loginWithProvider } from "@/lib/auth/provider"
import type { LoginCredentials } from "@/lib/auth/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoginCredentials>

    const result = await loginWithProvider({
      email: typeof body.email === "string" ? body.email : "",
      password: typeof body.password === "string" ? body.password : "",
      rememberMe: body.rememberMe === true,
    })

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error,
        },
        {
          status: 401,
        }
      )
    }

    if (!result.token || !result.maxAge) {
      throw new Error("Auth provider did not return a session token.")
    }

    const response = NextResponse.json({
      ok: true,
      session: result.session,
      mode: AUTH_MODE,
    })

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.maxAge,
    })

    return response
  } catch (error) {
    console.error("[AUTH:LOGIN]", error)

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to sign in.",
      },
      {
        status: 500,
      }
    )
  }
}
