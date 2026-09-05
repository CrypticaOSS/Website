"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Laptop,
  Loader2,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react"
import { toast } from "sonner"

type Device = {
  id: string
  clientId: string
  clientName: string
  scopes: string[]
  createdAt: string
  expiresAt: string
}

type DevicesResponse = {
  devices: Device[]
}

function formatDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Unknown"
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function getDeviceIcon(clientId: string) {
  if (clientId.includes("desktop")) {
    return Laptop
  }

  if (
    clientId.includes("mobile") ||
    clientId.includes("ios") ||
    clientId.includes("android")
  ) {
    return Smartphone
  }

  return MonitorSmartphone
}

export function ConnectedDevicesClient() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [revokingId, setRevokingId] = useState<string | null>(null)
  const [revokingAll, setRevokingAll] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeCount = devices.length

  const loadDevices = useCallback(async (background = false) => {
    if (background) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    setError(null)

    try {
      const response = await fetch("/api/devices", {
        method: "GET",
        cache: "no-store",
      })

      const data = (await response.json().catch(() => null)) as
        | DevicesResponse
        | { error?: string }
        | null

      if (!response.ok) {
        throw new Error(
          data &&
            "error" in data &&
            typeof data.error === "string"
            ? data.error
            : "Unable to load connected devices.",
        )
      }

      setDevices(
        data && "devices" in data && Array.isArray(data.devices)
          ? data.devices
          : [],
      )
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : "Unable to load connected devices."

      setError(message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void loadDevices()
  }, [loadDevices])

  async function revokeDevice(device: Device) {
    if (
      !window.confirm(
        `Sign out ${device.clientName}? The device will need to be linked again before it can access your Cryptica account.`,
      )
    ) {
      return
    }

    setRevokingId(device.id)

    try {
      const response = await fetch(
        `/api/devices/${encodeURIComponent(device.id)}`,
        {
          method: "DELETE",
        },
      )

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to sign this device out.",
        )
      }

      setDevices((current) =>
        current.filter((item) => item.id !== device.id),
      )

      toast.success("Device signed out", {
        description:
          "Its Cryptica refresh session has been revoked.",
      })
    } catch (cause) {
      toast.error("Could not sign out device", {
        description:
          cause instanceof Error
            ? cause.message
            : "Please try again.",
      })
    } finally {
      setRevokingId(null)
    }
  }

  async function revokeAllDevices() {
    if (devices.length === 0) {
      return
    }

    if (
      !window.confirm(
        "Sign out every connected device? Each desktop app will need to be linked again.",
      )
    ) {
      return
    }

    setRevokingAll(true)

    try {
      const response = await fetch("/api/devices", {
        method: "DELETE",
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to sign out your devices.",
        )
      }

      setDevices([])

      toast.success("All devices signed out", {
        description:
          "All active desktop refresh sessions have been revoked.",
      })
    } catch (cause) {
      toast.error("Could not sign out devices", {
        description:
          cause instanceof Error
            ? cause.message
            : "Please try again.",
      })
    } finally {
      setRevokingAll(false)
    }
  }

  const expiryCopy = useMemo(() => {
    if (devices.length === 0) {
      return "No desktop sessions are currently connected."
    }

    return `${activeCount} active ${
      activeCount === 1 ? "device" : "devices"
    } linked to your account.`
  }, [activeCount, devices.length])

  return (
    <main className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-56 top-96 -z-10 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-6 border-b border-border/70 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Account security
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              Connected devices
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Review the devices linked to your Cryptica account and
              remotely revoke access from any device you no longer use
              or recognise.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadDevices(true)}
            disabled={refreshing || loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-xl">
            <p className="text-sm text-muted-foreground">
              Connected devices
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {loading ? "—" : activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-xl sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>

              <div>
                <p className="font-medium text-foreground">
                  Device access is protected
                </p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {expiryCopy} Revoking a device prevents its saved
                  refresh session from creating new access tokens.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-border/70 bg-card/60 shadow-xl shadow-black/5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="font-semibold text-foreground">
                Active sessions
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Devices with an active Cryptica refresh session.
              </p>
            </div>

            {devices.length > 0 && (
              <button
                type="button"
                onClick={revokeAllDevices}
                disabled={revokingAll || revokingId !== null}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {revokingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                Sign out all
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Loading connected devices…
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[280px] items-center justify-center px-6 py-10">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  Couldn&apos;t load your devices
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => void loadDevices()}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            </div>
          ) : devices.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center px-6 py-10">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/50">
                  <MonitorSmartphone className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  No connected devices
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  When you link Cryptica Desktop to your account, the
                  active session will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/70">
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.clientId)
                const revoking = revokingId === device.id

                return (
                  <div
                    key={device.id}
                    className="flex flex-col gap-5 px-5 py-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background/50">
                        <DeviceIcon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-foreground">
                            {device.clientName}
                          </p>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Active
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Linked {formatDate(device.createdAt)}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground/80">
                          Session expires {formatDate(device.expiresAt)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => void revokeDevice(device)}
                      disabled={revoking || revokingAll}
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/15 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {revoking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      Sign out
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <div className="mt-6 rounded-2xl border border-border/70 bg-card/40 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                See something you don&apos;t recognise?
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Sign that device out immediately. It will have to go
                through Cryptica&apos;s device-link approval flow again
                before it can reconnect to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
