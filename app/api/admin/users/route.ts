import {
  NextResponse,
} from "next/server"

import {
  requireAdminApi,
} from "@/lib/auth/admin-api"

import {
  prisma,
} from "@/lib/prisma"

export async function GET() {
  const auth =
    await requireAdminApi()

  if (!auth.ok) {
    return auth.response
  }

  const users =
    await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
        createdAt: true,

        _count: {
          select: {
            vaults: true,
            sessions: true,
          },
        },
      },

      take: 100,
    })

  return NextResponse.json({
    users,
  })
}