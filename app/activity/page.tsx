"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Eye,
  EyeOff,
  Filter,
  Gauge,
  History,
  Loader2,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react"

import { useTranslations } from "next-intl"
import { toast } from "sonner"

import {
  useSettings,
} from "@/hooks/use-settings"

import {
  PasswordStrength,
} from "@/lib/password"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Button,
} from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ActivityItem = {
  id: string
  type: "PASSWORD_GENERATED"
  strength: string | null
  length: number | null
  source: string | null
  createdAt: string
}

type ActivityApiResponse = {
  ok: boolean
  items: ActivityItem[]
  total: number
}

type ActivityStats = {
  total: number
  veryWeak: number
  weak: number
  moderate: number
  strong: number
  veryStrong: number
}

function normaliseStrength(
  strength: string | null,
) {
  return strength
    ?.trim()
    .toUpperCase()
    .replaceAll("-", "_")
    .replaceAll(" ", "_") ?? ""
}

function getStats(
  items: ActivityItem[],
): ActivityStats {
  const stats: ActivityStats = {
    total: items.length,
    veryWeak: 0,
    weak: 0,
    moderate: 0,
    strong: 0,
    veryStrong: 0,
  }

  for (const item of items) {
    const strength =
      normaliseStrength(
        item.strength,
      )

    switch (strength) {
      case "VERY_WEAK":
        stats.veryWeak++
        break

      case "WEAK":
        stats.weak++
        break

      case "MODERATE":
        stats.moderate++
        break

      case "STRONG":
        stats.strong++
        break

      case "VERY_STRONG":
      case "VERYGOOD":
      case "VERY_GOOD":
        stats.veryStrong++
        break
    }
  }

  return stats
}

function formatStrength(
  strength: string | null,
) {
  const value =
    normaliseStrength(
      strength,
    )

  switch (value) {
    case "VERY_WEAK":
      return "Very weak"

    case "WEAK":
      return "Weak"

    case "MODERATE":
      return "Moderate"

    case "STRONG":
      return "Strong"

    case "VERY_STRONG":
    case "VERYGOOD":
    case "VERY_GOOD":
      return "Very strong"

    default:
      return "Unknown"
  }
}

function formatDate(
  date: string,
) {
  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(
    new Date(date),
  )
}

function matchesFilter(
  item: ActivityItem,
  filter: string,
) {
  if (filter === "all") {
    return true
  }

  const strength =
    normaliseStrength(
      item.strength,
    )

  switch (filter) {
    case "veryweak":
      return (
        strength ===
        "VERY_WEAK"
      )

    case "weak":
      return (
        strength ===
        "WEAK"
      )

    case "moderate":
      return (
        strength ===
        "MODERATE"
      )

    case "strong":
      return (
        strength ===
        "STRONG"
      )

    case "verygood":
      return [
        "VERY_STRONG",
        "VERYGOOD",
        "VERY_GOOD",
      ].includes(
        strength,
      )

    default:
      return true
  }
}

export default function ActivityPage() {
  const t =
    useTranslations()

  const {
    settings,
  } =
    useSettings()

  const [
    items,
    setItems,
  ] =
    useState<ActivityItem[]>(
      [],
    )

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    deleting,
    setDeleting,
  ] =
    useState(false)

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    )

  const [
    filter,
    setFilter,
  ] =
    useState("all")

  const [
    advancedVision,
    setAdvancedVision,
  ] =
    useState(false)

  const loadActivities =
    useCallback(
      async () => {
        setLoading(true)
        setError(null)

        try {
          const response =
            await fetch(
              "/api/activity",
              {
                method:
                  "GET",

                credentials:
                  "include",

                cache:
                  "no-store",
              },
            )

          const data =
            (await response.json()) as
              Partial<ActivityApiResponse> & {
                error?: string
              }

          if (
            response.status ===
            401
          ) {
            window.location.href =
              "/login?callbackUrl=/activity"

            return
          }

          if (!response.ok) {
            throw new Error(
              data.error ??
                "Unable to load activity.",
            )
          }

          setItems(
            Array.isArray(
              data.items,
            )
              ? data.items
              : [],
          )
        } catch (
          caughtError
        ) {
          const message =
            caughtError instanceof
            Error
              ? caughtError.message
              : "Unable to load activity."

          setError(
            message,
          )
        } finally {
          setLoading(
            false,
          )
        }
      },
      [],
    )

  useEffect(() => {
    void loadActivities()
  }, [
    loadActivities,
  ])

  const stats =
    useMemo(
      () =>
        getStats(
          items,
        ),
      [
        items,
      ],
    )

  const filteredItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            matchesFilter(
              item,
              filter,
            ),
        ),
      [
        items,
        filter,
      ],
    )

  async function clearActivity() {
    setDeleting(true)

    try {
      const response =
        await fetch(
          "/api/activity",
          {
            method:
              "DELETE",

            credentials:
              "include",
          },
        )

      const data =
        await response.json()

      if (
        response.status ===
        401
      ) {
        window.location.href =
          "/login?callbackUrl=/activity"

        return
      }

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to clear activity.",
        )
      }

      setItems([])

      toast.success(
        "Activity history cleared.",
      )
    } catch (
      caughtError
    ) {
      toast.error(
        caughtError instanceof
          Error
          ? caughtError.message
          : "Unable to clear activity.",
      )
    } finally {
      setDeleting(
        false,
      )
    }
  }

  const cards = [
    {
      label:
        t("very-weak"),

      value:
        stats.veryWeak,

      description:
        "Needs improvement",

      icon:
        AlertTriangle,
    },

    {
      label:
        t("weak"),

      value:
        stats.weak,

      description:
        "Below recommended",

      icon:
        LockKeyhole,
    },

    {
      label:
        t("moderate"),

      value:
        stats.moderate,

      description:
        "Reasonable strength",

      icon:
        Gauge,
    },

    {
      label:
        t("strong"),

      value:
        stats.strong,

      description:
        "Good protection",

      icon:
        ShieldCheck,
    },

    {
      label:
        t("very-strong"),

      value:
        stats.veryStrong,

      description:
        "Excellent strength",

      icon:
        Sparkles,
    },
  ]

  return (
    <TooltipProvider
      delayDuration={0}
    >
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-7 shadow-sm sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <History className="size-3.5 text-primary" />

                Account activity
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Password activity
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Review password generation activity saved to your Cryptica
                account. Password contents are never stored in your activity
                history.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-background/50 px-4 py-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {stats.total}{" "}
                  {stats.total === 1
                    ? "event"
                    : "events"}
                </p>

                <p className="text-xs text-muted-foreground">
                  Synced with your account
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" />

            <h2 className="font-semibold">
              Strength overview
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-transparent" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "total",
                    )}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {
                      stats.total
                    }
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Recorded password events
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Activity className="size-5 text-primary" />
                </div>
              </div>
            </div>

            {cards.map(
              ({
                label,
                value,
                description,
                icon:
                  Icon,
              }) => (
                <div
                  key={
                    label
                  }
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {
                          label
                        }
                      </p>

                      <p className="mt-2 text-3xl font-bold tracking-tight">
                        {
                          value
                        }
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {
                          description
                        }
                      </p>
                    </div>

                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" />

                <h2 className="text-xl font-semibold">
                  Recent activity
                </h2>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Password generation metadata from your account.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground" />

                <Select
                  value={
                    filter
                  }
                  onValueChange={
                    setFilter
                  }
                >
                  <SelectTrigger className="h-9 w-[170px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      {t(
                        "all",
                      )}
                    </SelectItem>

                    <SelectItem value="veryweak">
                      {t(
                        "very-weak",
                      )}
                    </SelectItem>

                    <SelectItem value="weak">
                      {t(
                        "weak",
                      )}
                    </SelectItem>

                    <SelectItem value="moderate">
                      {t(
                        "moderate",
                      )}
                    </SelectItem>

                    <SelectItem value="strong">
                      {t(
                        "strong",
                      )}
                    </SelectItem>

                    <SelectItem value="verygood">
                      {t(
                        "very-strong",
                      )}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tooltip>
                <TooltipTrigger
                  asChild
                >
                  <Button
                    type="button"
                    variant={
                      advancedVision
                        ? "secondary"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setAdvancedVision(
                        (
                          current,
                        ) =>
                          !current,
                      )
                    }
                  >
                    {advancedVision ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}

                    <span className="hidden sm:inline">
                      Details
                    </span>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Show additional activity details
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  asChild
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      void loadActivities()
                    }
                    disabled={
                      loading
                    }
                    className="size-9"
                  >
                    <RefreshCw
                      className={
                        loading
                          ? "size-4 animate-spin"
                          : "size-4"
                      }
                    />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Refresh activity
                </TooltipContent>
              </Tooltip>

              {items.length >
                0 && (
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        deleting
                      }
                      className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />

                      <span className="hidden sm:inline">
                        Clear history
                      </span>
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Clear password activity?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        This removes your password-generation history from
                        Cryptica. Security and account audit records are not
                        affected.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        disabled={
                          deleting
                        }
                      >
                        {t(
                          "cancel",
                        )}
                      </AlertDialogCancel>

                      <AlertDialogAction
                        disabled={
                          deleting
                        }
                        onClick={() =>
                          void clearActivity()
                        }
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 size-4" />
                            Clear activity
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          <div className="mb-4 flex items-start gap-3 rounded-xl border bg-muted/25 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="size-4 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Privacy-safe history
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Cryptica records strength, length, source and date only. The
                generated password itself is never written to your activity
                database.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-72 items-center justify-center rounded-2xl border bg-card">
              <div className="text-center">
                <Loader2 className="mx-auto size-6 animate-spin text-primary" />

                <p className="mt-3 text-sm text-muted-foreground">
                  Loading activity...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
              <AlertTriangle className="mx-auto size-7 text-destructive" />

              <h3 className="mt-4 font-semibold">
                Unable to load activity
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {
                  error
                }
              </p>

              <Button
                variant="outline"
                className="mt-5"
                onClick={() =>
                  void loadActivities()
                }
              >
                <RefreshCw className="size-4" />

                Try again
              </Button>
            </div>
          ) : filteredItems.length >
            0 ? (
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="divide-y">
                {filteredItems.map(
                  (
                    item,
                  ) => (
                    <article
                      key={
                        item.id
                      }
                      className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <KeyActivityIcon
                            strength={
                              item.strength
                            }
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">
                              Password generated
                            </p>

                            <span className="rounded-full border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                              {formatStrength(
                                item.strength,
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.length ??
                              "Unknown"}{" "}
                            characters
                            {item.source
                              ? ` · ${item.source}`
                              : ""}
                          </p>

                          {advancedVision && (
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span>
                                Event ID:{" "}
                                <span className="font-mono">
                                  {
                                    item.id
                                  }
                                </span>
                              </span>

                              <span>
                                Type:{" "}
                                {
                                  item.type
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(
                            item.createdAt,
                          )}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
                          <ShieldCheck className="size-3 text-primary" />

                          Metadata only
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-card/50 px-6 py-16 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <History className="size-6 text-primary" />
              </div>

              <h3 className="mt-5 font-semibold">
                {items.length >
                0
                  ? "No matching activity"
                  : t(
                      "no-activity",
                    )}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {items.length >
                0
                  ? "There are no password events matching the selected strength."
                  : t(
                      "no-activity-desc",
                    )}
              </p>

              {filter !==
                "all" &&
                items.length >
                  0 && (
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() =>
                      setFilter(
                        "all",
                      )
                    }
                  >
                    Show all activity
                  </Button>
                )}
            </div>
          )}
        </section>
      </main>
    </TooltipProvider>
  )
}

function KeyActivityIcon({
  strength,
}: {
  strength: string | null
}) {
  const value =
    normaliseStrength(
      strength,
    )

  if (
    value ===
      "VERY_STRONG" ||
    value ===
      "VERYGOOD" ||
    value ===
      "VERY_GOOD"
  ) {
    return (
      <Sparkles className="size-5 text-primary" />
    )
  }

  if (
    value ===
    "STRONG"
  ) {
    return (
      <ShieldCheck className="size-5 text-primary" />
    )
  }

  if (
    value ===
    "MODERATE"
  ) {
    return (
      <Gauge className="size-5 text-primary" />
    )
  }

  if (
    value ===
      "WEAK" ||
    value ===
      "VERY_WEAK"
  ) {
    return (
      <AlertTriangle className="size-5 text-primary" />
    )
  }

  return (
    <Activity className="size-5 text-primary" />
  )
}