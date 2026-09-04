import {
  ArrowDownToLine,
  CheckCircle2,
  Download,
  Laptop,
  LockKeyhole,
  Monitor,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import {
  redirect,
} from "next/navigation"

import {
  Button,
} from "@/components/ui/button"

import {
  getCurrentSession,
} from "@/lib/auth/session"

export const dynamic =
  "force-dynamic"

type LatestWindowsRelease = {
  version: string | null
  filename: string | null
  size: number | null
  releaseDate: string | null
}

const UPDATE_BASE_URL =
  (
    process.env
      .CRYPTICA_UPDATE_API_URL ||
    "https://api.crypticapp.org/v1/updates"
  ).replace(
    /\/+$/,
    "",
  )

function parseLatestYml(
  text: string,
): LatestWindowsRelease {
  const version =
    text.match(
      /^version:\s*["']?([^"'\r\n]+)["']?\s*$/m,
    )?.[1]?.trim() ??
    null

  const filename =
    text.match(
      /^path:\s*["']?([^"'\r\n]+)["']?\s*$/m,
    )?.[1]?.trim() ??
    text.match(
      /^\s*-\s*url:\s*["']?([^"'\r\n]+)["']?\s*$/m,
    )?.[1]?.trim() ??
    null

  const sizeText =
    text.match(
      /^size:\s*(\d+)\s*$/m,
    )?.[1] ??
    text.match(
      /^\s+size:\s*(\d+)\s*$/m,
    )?.[1] ??
    null

  const releaseDate =
    text.match(
      /^releaseDate:\s*['"]?([^'"\r\n]+)['"]?\s*$/m,
    )?.[1]?.trim() ??
    null

  return {
    version,
    filename,

    size:
      sizeText
        ? Number(
            sizeText,
          )
        : null,

    releaseDate,
  }
}

async function getLatestWindowsRelease():
  Promise<LatestWindowsRelease> {
  try {
    const response =
      await fetch(
        `${UPDATE_BASE_URL}/windows/latest.yml`,
        {
          cache:
            "no-store",

          headers: {
            Accept:
              "text/yaml,text/plain;q=0.9,*/*;q=0.8",
          },
        },
      )

    if (!response.ok) {
      console.error(
        "[DOWNLOADS] Unable to load latest.yml:",
        response.status,
        response.statusText,
      )

      return {
        version: null,
        filename: null,
        size: null,
        releaseDate: null,
      }
    }

    return parseLatestYml(
      await response.text(),
    )
  } catch (error) {
    console.error(
      "[DOWNLOADS] Unable to load latest release:",
      error,
    )

    return {
      version: null,
      filename: null,
      size: null,
      releaseDate: null,
    }
  }
}

function formatBytes(
  bytes: number | null,
) {
  if (
    bytes === null ||
    !Number.isFinite(
      bytes,
    ) ||
    bytes <= 0
  ) {
    return "Windows 64-bit"
  }

  const megabytes =
    bytes /
    1024 /
    1024

  return `${megabytes.toFixed(0)} MB · Windows 64-bit`
}

function formatReleaseDate(
  value: string | null,
) {
  if (!value) {
    return null
  }

  const date =
    new Date(
      value,
    )

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day:
        "numeric",

      month:
        "long",

      year:
        "numeric",
    },
  ).format(
    date,
  )
}

export default async function DownloadsPage() {
  const session =
    await getCurrentSession()

  if (!session) {
    redirect(
      "/login?callbackUrl=/downloads",
    )
  }

  const latest =
    await getLatestWindowsRelease()

  const releaseDate =
    formatReleaseDate(
      latest.releaseDate,
    )

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ================================================================ */}
      {/* Hero                                                             */}
      {/* ================================================================ */}

      <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-transparent" />

        <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <LockKeyhole className="size-3.5 text-primary" />

            Signed-in users only
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Download Cryptica
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Install the latest desktop release of Cryptica and keep your
            password vault close at hand. Updates are delivered automatically
            after installation.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Downloads                                                        */}
      {/* ================================================================ */}

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <Monitor className="size-5 text-primary" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Cryptica for Windows
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  The latest stable desktop release.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                    {latest.version
                      ? `v${latest.version}`
                      : "Latest version"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />

                    Stable
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {formatBytes(
                    latest.size,
                  )}
                </p>

                {releaseDate && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Released {releaseDate}
                  </p>
                )}
              </div>

              <Button
                asChild
                size="lg"
                className="h-11 shrink-0"
              >
                <a
                  href="/api/downloads/windows"
                  download
                >
                  <Download className="size-4" />

                  Download for Windows
                </a>
              </Button>
            </div>

            <div className="mt-6 grid gap-3 border-t pt-6 sm:grid-cols-3">
              <div className="rounded-xl bg-muted/30 p-4">
                <ShieldCheck className="size-4 text-primary" />

                <p className="mt-3 text-sm font-medium">
                  Auth protected
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Downloads are only served to signed-in Cryptica users.
                </p>
              </div>

              <div className="rounded-xl bg-muted/30 p-4">
                <Sparkles className="size-4 text-primary" />

                <p className="mt-3 text-sm font-medium">
                  Automatic updates
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Future desktop updates download and install automatically.
                </p>
              </div>

              <div className="rounded-xl bg-muted/30 p-4">
                <ArrowDownToLine className="size-4 text-primary" />

                <p className="mt-3 text-sm font-medium">
                  Latest release
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  The button always resolves to the newest published build.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Sidebar                                                      */}
        {/* ============================================================ */}

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Laptop className="size-5 text-primary" />
            </div>

            <h3 className="mt-4 font-semibold">
              Other platforms
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              macOS and Linux builds are planned. Windows is currently the
              supported desktop platform.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold">
              Already installed?
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              You normally do not need to download Cryptica again. The desktop
              app checks for newer releases and updates itself automatically.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}