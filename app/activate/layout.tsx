import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Authorise device | Cryptica",

  robots: {
    index: false,
    follow: false,
  },
}

export default function ActivateLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}