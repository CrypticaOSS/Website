"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="mb-6 p-4 rounded-full bg-destructive/10">
        <AlertTriangle className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-3xl font-bold mb-4">{t("something-went-wrong")}</h1>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        {t("error-description")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          {t("try-again")}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {t("back-to-home")}
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && error.message && (
        <div className="mt-8 p-4 bg-muted text-muted-foreground rounded-md text-left max-w-2xl overflow-auto">
          <p className="font-mono text-sm mb-2">{error.message}</p>
          {error.stack && (
            <pre className="text-xs mt-2 whitespace-pre-wrap">
              {error.stack}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
