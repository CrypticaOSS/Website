import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the team behind Cryptica.",
}

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}