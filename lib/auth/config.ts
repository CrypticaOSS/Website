export const AUTH_COOKIE_NAME = "cryptica_session"

export const AUTH_MODE =
  process.env.AUTH_MODE === "production" ? "production" : "mock"

export const MOCK_SESSION_TTL_SECONDS = 60 * 60 * 8
export const MOCK_REMEMBER_ME_TTL_SECONDS = 60 * 60 * 24 * 30
