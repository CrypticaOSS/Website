import "server-only"

import {
  NextResponse,
} from "next/server"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export async function requireAdminApi() {
  const session =
    await getCurrentSession()

  if (!session) {
    return {
      ok: false as const,

      response:
        NextResponse.json(
          {
            error:
              "Authentication required.",
          },
          {
            status: 401,
          },
        ),
    }
  }

  if (
    session.user.role !==
      "ADMIN" &&
    session.user.role !==
      "OWNER"
  ) {
    return {
      ok: false as const,

      response:
        NextResponse.json(
          {
            error:
              "Administrator access required.",
          },
          {
            status: 403,
          },
        ),
    }
  }

  return {
    ok: true as const,
    session,
  }
}