import { NextResponse } from "next/server"

import { getCurrentSession } from "@/lib/auth/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const API_URL = (
  process.env.CRYPTICA_API_URL ||
  "https://api.crypticapp.org"
).replace(/\/+$/, "")

const INTERNAL_API_KEY =
  process.env.CRYPTICA_INTERNAL_API_KEY

function headers(userId: string) {
  if (!INTERNAL_API_KEY) {
    throw new Error(
      "CRYPTICA_INTERNAL_API_KEY is not configured.",
    )
  }

  return {
    "X-Internal-Key": INTERNAL_API_KEY,
    "X-Cryptica-User-Id": userId,
    Accept: "application/json",
  }
}

async function parse(response: Response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return { error: text }
  }
}

export async function GET() {
  try {
    const session = await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required.",
          code: "UNAUTHENTICATED",
        },
        { status: 401 },
      )
    }

    const response = await fetch(
      `${API_URL}/v1/auth/devices`,
      {
        method: "GET",
        cache: "no-store",
        headers: headers(session.user.id),
      },
    )

    const data = await parse(response)

    if (response.status === 401 || response.status === 403) {
      return NextResponse.json(
        {
          error:
            "The Cryptica API rejected the website server authentication.",
          code: "UPSTREAM_UNAUTHORIZED",
        },
        { status: 502 },
      )
    }

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(
      "[DEVICES:PROXY:GET]",
      error,
    )

    return NextResponse.json(
      {
        error: "Unable to load connected devices.",
      },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  try {
    const session = await getCurrentSession()

    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required.",
          code: "UNAUTHENTICATED",
        },
        { status: 401 },
      )
    }

    const response = await fetch(
      `${API_URL}/v1/auth/devices`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: headers(session.user.id),
      },
    )

    const data = await parse(response)

    if (response.status === 401 || response.status === 403) {
      return NextResponse.json(
        {
          error:
            "The Cryptica API rejected the website server authentication.",
          code: "UPSTREAM_UNAUTHORIZED",
        },
        { status: 502 },
      )
    }

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(
      "[DEVICES:PROXY:DELETE]",
      error,
    )

    return NextResponse.json(
      {
        error: "Unable to sign out connected devices.",
      },
      { status: 500 },
    )
  }
}
