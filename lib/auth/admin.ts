import "server-only"

import { redirect } from "next/navigation"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export function hasAdminRole(
  role: string,
) {
  return (
    role === "ADMIN" ||
    role === "OWNER"
  )
}

export async function requireAdmin() {
  const session =
    await getCurrentSession()

  if (!session) {
    redirect(
      "/login?callbackUrl=/admin",
    )
  }

  if (
    !hasAdminRole(
      session.user.role,
    )
  ) {
    redirect("/")
  }

  return session
}