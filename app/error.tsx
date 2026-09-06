"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import Link from "next/link"

import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  ShieldAlert,
} from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & {
    digest?: string
  }

  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-background" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[110px]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-border/70 bg-card/60 px-6 py-10 text-center shadow-2xl shadow-black/10 backdrop-blur-2xl sm:px-10 sm:py-14">
        {/* Top accent */}
        <div className="pointer-events-none absolute inset-x-16 -top-24 h-48 rounded-full bg-destructive/15 blur-[70px]" />

        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-destructive/70 to-transparent" />

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 shadow-sm">
            <ShieldAlert className="h-7 w-7 text-destructive" />
          </div>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" />
            Application error
          </div>

          {/* Title */}
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            {t("something-went-wrong")}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            {t("error-description")}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              {t("try-again")}
            </button>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-muted/60 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back-to-home")}
            </Link>
          </div>

          {/* Digest */}
          {error.digest && (
            <div className="mt-8 rounded-xl border border-border/70 bg-background/30 px-4 py-3 text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Error reference
              </p>

              <p className="mt-1 break-all font-mono text-xs text-foreground/80">
                {error.digest}
              </p>
            </div>
          )}

          {/* Development details */}
          {process.env.NODE_ENV === "development" &&
            error.message && (
              <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background/40 text-left">
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Development details
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      This section is only visible
                      during development.
                    </p>
                  </div>

                  <div className="h-2 w-2 rounded-full bg-destructive" />
                </div>

                <div className="max-h-[320px] overflow-auto p-4">
                  <p className="break-words font-mono text-xs leading-5 text-destructive">
                    {error.message}
                  </p>

                  {error.stack && (
                    <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 text-muted-foreground">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </div>
            )}

          {/* Footer hint */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-30" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>

            Your vault and account data remain protected.
          </div>
        </div>
      </section>
    </main>
  )
}