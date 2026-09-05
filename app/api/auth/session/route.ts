import {
  NextResponse,
} from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export const runtime = "nodejs"

export async function GET() {
  const session =
    await getCurrentSession()

  if (!session) {
    return NextResponse.json(
      {
        authenticated: false,
        session: null,
      },
      {
        status: 200,
      },
    )
  }

  return NextResponse.json(
    {
      authenticated: true,
      session,
    },
    {
      status: 200,
    },
  )
}