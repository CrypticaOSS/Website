export type UserRole =
  | "USER"
  | "SUPPORT"
  | "ADMIN"
  | "OWNER"

export type AuthUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: UserRole
  emailVerifiedAt?: string | null
}

export type AuthSession = {
  user: AuthUser
  expiresAt: string
}

export type LoginCredentials = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResult =
  | {
      ok: true
      session: AuthSession
    }
  | {
      ok: false
      error: string
    }

export interface AuthProvider {
  login(
    credentials:
      LoginCredentials,
  ): Promise<LoginResult>

  getSession(
    sessionToken: string,
  ): Promise<AuthSession | null>

  logout(
    sessionToken: string,
  ): Promise<void>
}