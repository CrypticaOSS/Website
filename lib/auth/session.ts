import "server-only"

import { createHash } from "node:crypto"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  AUTH_COOKIE_NAME,
} from "@/lib/auth/config"

import { prisma } from "@/lib/prisma"

function hashToken(
  token: string,
) {
  return createHash("sha256")
    .update(token)
    .digest("hex")
}

export async function getCurrentSession() {
  const cookieStore =
    await cookies()

  const token =
    cookieStore.get(
      AUTH_COOKIE_NAME,
    )?.value

  if (!token) {
    return null
  }

  const tokenHash =
    hashToken(token)

  const session =
    await prisma.session.findUnique({
      where: {
        tokenHash,
      },

      include: {
        user: true,
      },
    })

  if (!session) {
    return null
  }

  if (session.revokedAt) {
    return null
  }

  if (
    session.expiresAt <=
    new Date()
  ) {
    return null
  }

  return {
    user: {
      id: session.user.id,
      name: session.user.name,
      email:
        session.user.email,
      image:
        session.user.image,
      role:
        session.user.role,
      emailVerifiedAt:
        session.user
          .emailVerifiedAt
          ?.toISOString() ??
        null,
    },

    expiresAt:
      session.expiresAt
        .toISOString(),
  }
}

export async function requireSession() {
  const session =
    await getCurrentSession()

  if (!session) {
    redirect(
      "/login",
    )
  }

  return session
}