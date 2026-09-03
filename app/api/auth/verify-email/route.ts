import { createHash } from "node:crypto"

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

function hashToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex")
}

function getVerifiedRole(email: string) {
  const normalized =
    email.trim().toLowerCase()

  if (
    normalized.endsWith(
      "@crypticapp.org",
    )
  ) {
    return "ADMIN" as const
  }

  return "USER" as const
}

export async function GET(
  request: Request,
) {
  const url =
    new URL(request.url)

  const token =
    url.searchParams.get("token")

  const appUrl =
    process.env
      .NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"

  if (!token) {
    return NextResponse.redirect(
      `${appUrl}/login?verified=invalid`,
    )
  }

  const tokenHash =
    hashToken(token)

  const record =
    await prisma
      .emailVerificationToken
      .findUnique({
        where: {
          tokenHash,
        },

        include: {
          user: true,
        },
      })

  if (!record) {
    return NextResponse.redirect(
      `${appUrl}/login?verified=invalid`,
    )
  }

  if (record.usedAt) {
    return NextResponse.redirect(
      `${appUrl}/login?verified=used`,
    )
  }

  if (
    record.expiresAt <=
    new Date()
  ) {
    return NextResponse.redirect(
      `${appUrl}/login?verified=expired`,
    )
  }

  const role =
    getVerifiedRole(
      record.user.email,
    )

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: record.userId,
      },

      data: {
        emailVerifiedAt:
          new Date(),

        role,
      },
    }),

    prisma
      .emailVerificationToken
      .update({
        where: {
          id: record.id,
        },

        data: {
          usedAt:
            new Date(),
        },
      }),
  ])

  return NextResponse.redirect(
    `${appUrl}/vault?verified=true`,
  )
}