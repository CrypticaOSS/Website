import "server-only"

import crypto from "node:crypto"
import argon2 from "argon2"

import { AUTH_MODE } from "@/lib/auth/config"
import type {
  LoginCredentials,
  LoginResult,
} from "@/lib/auth/types"

import {
  createMockLogin,
  deleteMockSession,
  getMockSession,
} from "@/lib/auth/mock-store"

import { prisma } from "@/lib/prisma"

const SESSION_TTL_SECONDS =
  60 * 60 * 8

const REMEMBER_SESSION_TTL_SECONDS =
  60 * 60 * 24 * 30

function generateSessionToken() {
  return crypto
    .randomBytes(32)
    .toString("base64url")
}

function hashSessionToken(
  token: string
) {
  return crypto
    .createHash("sha256")
    .update(token, "utf8")
    .digest("hex")
}

export async function loginWithProvider(
  credentials: LoginCredentials
): Promise<LoginResult> {
  if (AUTH_MODE === "mock") {
    return createMockLogin(
      credentials
    )
  }

  const email =
    credentials.email
      .trim()
      .toLowerCase()

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        credential: true,
      },
    })

  if (
    !user ||
    !user.credential
  ) {
    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  const passwordValid =
    await argon2.verify(
      user.credential.passwordHash,
      credentials.password
    )

  if (!passwordValid) {
    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  const token =
    generateSessionToken()

  const tokenHash =
    hashSessionToken(token)

  const ttl =
    credentials.rememberMe
      ? REMEMBER_SESSION_TTL_SECONDS
      : SESSION_TTL_SECONDS

  const expiresAt =
    new Date(
      Date.now() +
        ttl * 1000
    )

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  })

  return {
    ok: true,

    token,

    maxAge: ttl,

    session: {
      user: {
        id: user.id,
        email: user.email,
        name:
          user.name ?? null,
        image:
          user.image ?? null,
        role: user.role,
      },

      expiresAt:
        expiresAt.toISOString(),
    },
  }
}

export async function getSessionWithProvider(
  token: string
) {
  if (AUTH_MODE === "mock") {
    return getMockSession(
      token
    )
  }

  const tokenHash =
    hashSessionToken(token)

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

  if (
    session.expiresAt <=
    new Date()
  ) {
    await prisma.session
      .delete({
        where: {
          id: session.id,
        },
      })
      .catch(() => undefined)

    return null
  }

  return {
    user: {
      id:
        session.user.id,

      email:
        session.user.email,

      name:
        session.user.name ??
        null,

      image:
        session.user.image ??
        null,

      role:
        session.user.role,
    },

    expiresAt:
      session.expiresAt
        .toISOString(),
  }
}

export async function logoutWithProvider(
  token: string
) {
  if (AUTH_MODE === "mock") {
    await deleteMockSession(
      token
    )

    return
  }

  const tokenHash =
    hashSessionToken(token)

  await prisma.session
    .delete({
      where: {
        tokenHash,
      },
    })
    .catch(() => undefined)
}
