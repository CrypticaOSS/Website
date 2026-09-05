"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  ArrowLeft,
  Home,
  SearchX,
} from "lucide-react"

export default function NotFound() {
  const t = useTranslations()

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-background" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[110px]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize:
            "72px 72px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 75%)",
        }}
      />

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-border/70 bg-card/60 px-6 py-10 text-center shadow-2xl shadow-black/10 backdrop-blur-2xl sm:px-10 sm:py-14">
        {/* Top glow */}
        <div className="pointer-events-none absolute inset-x-16 -top-24 h-48 rounded-full bg-primary/15 blur-[70px]" />

        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-background/50 shadow-sm">
            <SearchX className="h-6 w-6 text-primary" />
          </div>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Error 404
          </div>

          {/* 404 */}
          <div className="relative">
            <h1 className="select-none bg-gradient-to-b from-foreground to-foreground/20 bg-clip-text text-8xl font-bold tracking-[-0.08em] text-transparent sm:text-9xl">
              404
            </h1>
          </div>

          {/* Copy */}
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("page-not-found")}
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            {t("page-not-found-description")}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <Home className="h-4 w-4" />
              {t("back-to-home")}
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-muted/60 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            The page may have been moved, removed or never existed.
          </div>
        </div>
      </section>
    </main>
  )
}