import "server-only"

import { AUTH_MODE } from "@/lib/auth/config"
import type { LoginCredentials, LoginResult } from "@/lib/auth/types"
import {
  createMockLogin,
  deleteMockSession,
  getMockSession,
} from "@/lib/auth/mock-store"

export async function loginWithProvider(credentials: LoginCredentials) {
  if (AUTH_MODE === "mock") {
    return createMockLogin(credentials)
  }

  /**
   * PRODUCTION AUTH GOES HERE.
   *
   * Keep this function's return contract identical and your frontend does not
   * need to change.
   *
   * Examples:
   * - verify an Argon2 password against a Prisma user record
   * - call an external identity service
   * - create a Redis/database-backed session
   *
   * Return:
   * {
   *   ok: true,
   *   session: { user, expiresAt },
   *   token: "...",
   *   maxAge: 2592000
   * }
   */
  throw new Error(
    "AUTH_MODE=production is enabled but the production auth provider has not been configured."
  )
}

export async function getSessionWithProvider(token: string) {
  if (AUTH_MODE === "mock") {
    return getMockSession(token)
  }

  /**
   * Replace this with your production session lookup.
   */
  throw new Error(
    "AUTH_MODE=production is enabled but the production auth provider has not been configured."
  )
}

export async function logoutWithProvider(token: string) {
  if (AUTH_MODE === "mock") {
    await deleteMockSession(token)
    return
  }

  /**
   * Replace this with your production session deletion/revocation.
   */
  throw new Error(
    "AUTH_MODE=production is enabled but the production auth provider has not been configured."
  )
}
