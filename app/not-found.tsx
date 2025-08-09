"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const t = useTranslations()

  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-8xl font-extrabold mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">{t("page-not-found")}</h2>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        {t("page-not-found-description")}
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        {t("back-to-home")}
      </Link>
    </div>
  )
}
