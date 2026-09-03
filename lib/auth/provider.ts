// src/lib/auth/provider.ts

import "server-only"

import crypto from "node:crypto"
import argon2 from "argon2"

import { AUTH_MODE } from "@/lib/auth/config"

import type {
  AuthSession,
  LoginCredentials,
  LoginResult,
} from "@/lib/auth/types"

import {
  createMockLogin,
  deleteMockSession,
  getMockSession,
} from "@/lib/auth/mock-store"

import { prisma } from "@/lib/prisma"

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const SESSION_TTL_SECONDS =
  60 * 60 * 8

const REMEMBER_SESSION_TTL_SECONDS =
  60 * 60 * 24 * 30

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function generateSessionToken(): string {
  return crypto
    .randomBytes(32)
    .toString("base64url")
}

function hashSessionToken(
  token: string
): string {
  return crypto
    .createHash("sha256")
    .update(token, "utf8")
    .digest("hex")
}

/* -------------------------------------------------------------------------- */
/* Login                                                                      */
/* -------------------------------------------------------------------------- */

export async function loginWithProvider(
  credentials: LoginCredentials
): Promise<LoginResult> {
  /* ------------------------------------------------------------------------ */
  /* Mock authentication                                                      */
  /* ------------------------------------------------------------------------ */

  if (AUTH_MODE === "mock") {
    return createMockLogin(
      credentials
    )
  }

  /* ------------------------------------------------------------------------ */
  /* Normalize email                                                          */
  /* ------------------------------------------------------------------------ */

  const email =
    credentials.email
      .trim()
      .toLowerCase()

  /* ------------------------------------------------------------------------ */
  /* Find user                                                                */
  /* ------------------------------------------------------------------------ */

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        credentials: true,
      },
    })

  if (!user) {
    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Resolve credential                                                       */
  /* ------------------------------------------------------------------------ */

  const credentialsRelation =
    user.credentials

  const credential =
    Array.isArray(
      credentialsRelation
    )
      ? credentialsRelation[0]
      : credentialsRelation

  if (!credential) {
    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Verify password                                                          */
  /* ------------------------------------------------------------------------ */

  let passwordValid = false

  try {
    passwordValid =
      await argon2.verify(
        credential.passwordHash,
        credentials.password
      )
  } catch (error) {
    console.error(
      "[AUTH:PROVIDER] Failed to verify password:",
      error
    )

    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  if (!passwordValid) {
    return {
      ok: false,
      error:
        "Invalid email or password.",
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Create session                                                           */
  /* ------------------------------------------------------------------------ */

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
      userId:
        user.id,

      tokenHash,

      expiresAt,
    },
  })

  /* ------------------------------------------------------------------------ */
  /* Build session                                                            */
  /* ------------------------------------------------------------------------ */

  const session: AuthSession = {
    user: {
      id:
        user.id,

      email:
        user.email,

      name:
        user.name ??
        null,

      image:
        user.image ??
        null,

      role:
        user.role,

      emailVerifiedAt:
        user.emailVerifiedAt
          ? user.emailVerifiedAt.toISOString()
          : null,
    },

    expiresAt:
      expiresAt.toISOString(),
  }

  console.log(
    "[AUTH:PROVIDER] Login successful:",
    {
      userId: user.id,
      email: user.email,
      expiresAt:
        expiresAt.toISOString(),
      rememberMe:
        Boolean(
          credentials.rememberMe
        ),
    }
  )

  return {
    ok: true,

    session,

    token,

    maxAge: ttl,
  }
}

/* -------------------------------------------------------------------------- */
/* Get session                                                                */
/* -------------------------------------------------------------------------- */

export async function getSessionWithProvider(
  token: string
): Promise<AuthSession | null> {
  /* ------------------------------------------------------------------------ */
  /* Mock authentication                                                      */
  /* ------------------------------------------------------------------------ */

  if (AUTH_MODE === "mock") {
    return getMockSession(
      token
    )
  }

  if (!token) {
    return null
  }

  /* ------------------------------------------------------------------------ */
  /* Hash incoming cookie token                                               */
  /* ------------------------------------------------------------------------ */

  const tokenHash =
    hashSessionToken(token)

  /* ------------------------------------------------------------------------ */
  /* Find database session                                                    */
  /* ------------------------------------------------------------------------ */

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
    console.warn(
      "[AUTH:PROVIDER] Session not found.",
      {
        tokenLength:
          token.length,
      }
    )

    return null
  }

  /* ------------------------------------------------------------------------ */
  /* Check expiry                                                             */
  /* ------------------------------------------------------------------------ */

  const now =
    new Date()

  if (
    session.expiresAt <=
    now
  ) {
    console.warn(
      "[AUTH:PROVIDER] Session expired:",
      {
        sessionId:
          session.id,

        userId:
          session.userId,

        expiresAt:
          session.expiresAt.toISOString(),
      }
    )

    try {
      await prisma.session.delete({
        where: {
          id:
            session.id,
        },
      })
    } catch (error) {
      console.error(
        "[AUTH:PROVIDER] Failed to remove expired session:",
        error
      )
    }

    return null
  }

  /* ------------------------------------------------------------------------ */
  /* Validate attached user                                                   */
  /* ------------------------------------------------------------------------ */

  if (!session.user) {
    console.error(
      "[AUTH:PROVIDER] Session exists without an attached user:",
      {
        sessionId:
          session.id,

        userId:
          session.userId,
      }
    )

    return null
  }

  /* ------------------------------------------------------------------------ */
  /* Return website auth session                                              */
  /* ------------------------------------------------------------------------ */

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

      emailVerifiedAt:
        session.user.emailVerifiedAt
          ? session.user.emailVerifiedAt.toISOString()
          : null,
    },

    expiresAt:
      session.expiresAt
        .toISOString(),
  }
}

/* -------------------------------------------------------------------------- */
/* Logout                                                                     */
/* -------------------------------------------------------------------------- */

export async function logoutWithProvider(
  token: string
): Promise<void> {
  /* ------------------------------------------------------------------------ */
  /* Mock authentication                                                      */
  /* ------------------------------------------------------------------------ */

  if (AUTH_MODE === "mock") {
    await deleteMockSession(
      token
    )

    return
  }

  if (!token) {
    return
  }

  /* ------------------------------------------------------------------------ */
  /* Delete database session                                                  */
  /* ------------------------------------------------------------------------ */

  const tokenHash =
    hashSessionToken(token)

  try {
    await prisma.session.delete({
      where: {
        tokenHash,
      },
    })
  } catch {
    // Session may already be gone/expired.
    // Logout should remain idempotent.
  }
}