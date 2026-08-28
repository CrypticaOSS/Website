"use client"

import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="border-t py-6 mt-10 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} - 2025 Copyright - Cryptica. | Orginal Owner:{" "}
        <a
          href="https://github.com/CodeMeAPixel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          CodeMeAPixel (Pixelated)
        </a>
        . {t("all-rights-reserved")}
      </p>
    </footer>
  )
}
