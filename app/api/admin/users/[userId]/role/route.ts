import {
  NextResponse,
} from "next/server"

import {
  requireAdminApi,
} from "@/lib/auth/admin-api"

import {
  prisma,
} from "@/lib/prisma"

const VALID_ROLES = [
  "USER",
  "SUPPORT",
  "ADMIN",
] as const

type AllowedRole =
  (typeof VALID_ROLES)[number]

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      userId: string
    }>
  },
) {
  const auth =
    await requireAdminApi()

  if (!auth.ok) {
    return auth.response
  }

  const {
    userId,
  } = await params

  let body: {
    role?: unknown
  }

  try {
    body =
      await request.json()
  } catch {
    return NextResponse.json(
      {
        error:
          "Invalid request.",
      },
      {
        status: 400,
      },
    )
  }

  if (
    typeof body.role !==
    "string"
  ) {
    return NextResponse.json(
      {
        error:
          "Role is required.",
      },
      {
        status: 400,
      },
    )
  }

  if (
    !VALID_ROLES.includes(
      body.role as AllowedRole,
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid role.",
      },
      {
        status: 400,
      },
    )
  }

  if (
    userId ===
    auth.session.user.id
  ) {
    return NextResponse.json(
      {
        error:
          "You cannot change your own role.",
      },
      {
        status: 400,
      },
    )
  }

  const user =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        role:
          body.role as
            AllowedRole,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

  return NextResponse.json({
    ok: true,
    user,
  })
}