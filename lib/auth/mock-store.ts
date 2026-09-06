import "server-only"

import { randomBytes } from "crypto"

import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  LoginResult,
} from "@/lib/auth/types"
import {
  MOCK_REMEMBER_ME_TTL_SECONDS,
  MOCK_SESSION_TTL_SECONDS,
} from "@/lib/auth/config"

type StoredSession = {
  session: AuthSession
  expiresAtMs: number
}

/**
 * Development-only in-memory session store.
 *
 * This is intentionally simple. It behaves like a server-side session store,
 * but sessions disappear when the dev server restarts.
 *
 * When you move to production, replace the provider implementation with your
 * real database/Redis/auth provider. The frontend API contract stays the same.
 */
const sessions = new Map<string, StoredSession>()

function createDemoUser(email: string): AuthUser {
  const cleanEmail = email.trim().toLowerCase()

  return {
    id: `mock_${Buffer.from(cleanEmail).toString("base64url").slice(0, 20)}`,
    name:
      cleanEmail === "demo@cryptica.app"
        ? "Cryptica Demo"
        : cleanEmail.split("@")[0] || "Cryptica User",
    email: cleanEmail,
    image: null,
    role: "USER",
  }
}

export async function createMockLogin(
  credentials: LoginCredentials
): Promise<
  LoginResult & {
    token?: string
    maxAge?: number
  }
> {
  const email = credentials.email.trim()
  const password = credentials.password

  if (!email) {
    return {
      ok: false,
      error: "Email address is required.",
    }
  }

  if (!password) {
    return {
      ok: false,
      error: "Password is required.",
    }
  }

  const maxAge = credentials.rememberMe
    ? MOCK_REMEMBER_ME_TTL_SECONDS
    : MOCK_SESSION_TTL_SECONDS

  const expiresAtMs = Date.now() + maxAge * 1000

  const session: AuthSession = {
    user: createDemoUser(email),
    expiresAt: new Date(expiresAtMs).toISOString(),
  }

  const token = randomBytes(32).toString("base64url")

  sessions.set(token, {
    session,
    expiresAtMs,
  })

  return {
    ok: true,
    session,
    token,
    maxAge,
  }
}

export async function getMockSession(
  token: string
): Promise<AuthSession | null> {
  const stored = sessions.get(token)

  if (!stored) {
    return null
  }

  if (Date.now() >= stored.expiresAtMs) {
    sessions.delete(token)
    return null
  }

  return stored.session
}

export async function deleteMockSession(token: string) {
  sessions.delete(token)
}
