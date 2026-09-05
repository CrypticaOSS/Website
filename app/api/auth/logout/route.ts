import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { AUTH_COOKIE_NAME } from "@/lib/auth/config"
import { logoutWithProvider } from "@/lib/auth/provider"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (token) {
      await logoutWithProvider(token)
    }

    const response = NextResponse.json({
      ok: true,
    })

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error("[AUTH:LOGOUT]", error)

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to sign out.",
      },
      {
        status: 500,
      }
    )
  }
}
