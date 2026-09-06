"use client"

import {
  createContext,
  ReactNode,
  useContext,
} from "react"

import { useAuth } from "@/hooks/use-auth"

type AuthContextValue = ReturnType<typeof useAuth>

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside <AuthProvider>."
    )
  }

  return context
}
