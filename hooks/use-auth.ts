"use client"

import { useCallback, useEffect, useState } from "react"

import type { AuthSession } from "@/lib/auth/types"

type AuthState = {
  loading: boolean
  authenticated: boolean
  session: AuthSession | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    loading: true,
    authenticated: false,
    session: null,
  })

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch auth session.")
      }

      const data = await response.json()

      setState({
        loading: false,
        authenticated: data.authenticated === true,
        session: data.session ?? null,
      })
    } catch {
      setState({
        loading: false,
        authenticated: false,
        session: null,
      })
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const login = useCallback(
    async ({
      email,
      password,
      rememberMe,
    }: {
      email: string
      password: string
      rememberMe?: boolean
    }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to sign in.")
      }

      setState({
        loading: false,
        authenticated: true,
        session: data.session,
      })

      return data.session as AuthSession
    },
    []
  )

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    setState({
      loading: false,
      authenticated: false,
      session: null,
    })
  }, [])

  return {
    ...state,
    user: state.session?.user ?? null,
    login,
    logout,
    refresh,
  }
}
