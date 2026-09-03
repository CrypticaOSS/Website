"use client"

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import Link from "next/link"

import {
  AlertTriangle,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Globe2,
  KeyRound,
  Loader2,
  LockKeyhole,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react"

import { toast } from "sonner"

import {
  Button,
} from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Input,
} from "@/components/ui/input"

import {
  Label,
} from "@/components/ui/label"

import {
  Textarea,
} from "@/components/ui/textarea"

type VaultEntry = {
  id: string
  service: string
  username: string
  password: string
  notes: string

  favorite: boolean

  createdAt: string
  updatedAt: string
}

type VaultForm = {
  service: string
  username: string
  password: string
  notes: string
}

const EMPTY_FORM:
  VaultForm = {
    service: "",
    username: "",
    password: "",
    notes: "",
  }

export default function VaultPage() {
  const [
    entries,
    setEntries,
  ] =
    useState<VaultEntry[]>(
      [],
    )

  const [
    form,
    setForm,
  ] =
    useState<VaultForm>(
      EMPTY_FORM,
    )

  const [
    search,
    setSearch,
  ] =
    useState("")

  const [
    loading,
    setLoading,
  ] =
    useState(true)

  const [
    saving,
    setSaving,
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
    showNewPassword,
    setShowNewPassword,
  ] =
    useState(false)

  const [
    visiblePasswords,
    setVisiblePasswords,
  ] =
    useState<
      Set<string>
    >(
      new Set(),
    )

  const [
    copiedId,
    setCopiedId,
  ] =
    useState<string | null>(
      null,
    )

  const [
    deleteTarget,
    setDeleteTarget,
  ] =
    useState<VaultEntry | null>(
      null,
    )

  const [
    deleting,
    setDeleting,
  ] =
    useState(false)

  const loadVault =
    useCallback(
      async () => {
        setLoading(true)
        setError(null)

        try {
          const response =
            await fetch(
              "/api/vault",
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
            await response.json()

          if (
            response.status ===
            401
          ) {
            window.location.href =
              "/login?callbackUrl=/vault"

            return
          }

          if (!response.ok) {
            throw new Error(
              data.error ??
                "Unable to load your vault.",
            )
          }

          setEntries(
            data.entries ??
              [],
          )
        } catch (
          caughtError
        ) {
          const message =
            caughtError instanceof
            Error
              ? caughtError.message
              : "Unable to load your vault."

          setError(message)
        } finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadVault()
  }, [loadVault])

  const filteredEntries =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase()

      if (!query) {
        return entries
      }

      return entries.filter(
        (entry) =>
          entry.service
            .toLowerCase()
            .includes(
              query,
            ) ||
          entry.username
            .toLowerCase()
            .includes(
              query,
            ),
      )
    }, [
      entries,
      search,
    ])

  function updateForm<
    K extends keyof VaultForm,
  >(
    key: K,
    value: VaultForm[K],
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      }),
    )
  }

  async function handleAdd(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (
      !form.service.trim() ||
      !form.password
    ) {
      toast.error(
        "Service and password are required.",
      )

      return
    }

    setSaving(true)

    try {
      const response =
        await fetch(
          "/api/vault",
          {
            method:
              "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                form,
              ),
          },
        )

      const data =
        await response.json()

      if (
        response.status ===
        401
      ) {
        window.location.href =
          "/login?callbackUrl=/vault"

        return
      }

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to save password.",
        )
      }

      setEntries(
        (current) => [
          data.entry,
          ...current,
        ],
      )

      setForm(
        EMPTY_FORM,
      )

      setShowNewPassword(
        false,
      )

      toast.success(
        "Password added to your vault.",
      )
    } catch (
      caughtError
    ) {
      toast.error(
        caughtError instanceof
          Error
          ? caughtError.message
          : "Unable to save password.",
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (
      !deleteTarget
    ) {
      return
    }

    setDeleting(true)

    try {
      const response =
        await fetch(
          `/api/vault/${deleteTarget.id}`,
          {
            method:
              "DELETE",

            credentials:
              "include",
          },
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to delete password.",
        )
      }

      setEntries(
        (current) =>
          current.filter(
            (entry) =>
              entry.id !==
              deleteTarget.id,
          ),
      )

      toast.success(
        `${deleteTarget.service} removed from your vault.`,
      )

      setDeleteTarget(
        null,
      )
    } catch (
      caughtError
    ) {
      toast.error(
        caughtError instanceof
          Error
          ? caughtError.message
          : "Unable to delete password.",
      )
    } finally {
      setDeleting(false)
    }
  }

  function togglePassword(
    id: string,
  ) {
    setVisiblePasswords(
      (current) => {
        const next =
          new Set(current)

        if (
          next.has(id)
        ) {
          next.delete(id)
        } else {
          next.add(id)
        }

        return next
      },
    )
  }

  async function copyPassword(
    entry: VaultEntry,
  ) {
    try {
      await navigator.clipboard.writeText(
        entry.password,
      )

      setCopiedId(
        entry.id,
      )

      toast.success(
        "Password copied.",
      )

      window.setTimeout(
        () => {
          setCopiedId(
            (current) =>
              current ===
              entry.id
                ? null
                : current,
          )
        },
        1800,
      )
    } catch {
      toast.error(
        "Unable to copy password.",
      )
    }
  }

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-7 shadow-sm sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

          <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />

                Encrypted password vault
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your vault
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Keep account credentials organised and encrypted in one place.
                Your saved entries are protected before they are written to
                the database.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-background/50 px-4 py-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <LockKeyhole className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {entries.length} saved
                </p>

                <p className="text-xs text-muted-foreground">
                  Encrypted vault items
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
          {/* Add password */}
          <aside>
            <div className="sticky top-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="border-b px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Plus className="size-5 text-primary" />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Add a login
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      Save another account to your encrypted vault.
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={
                  handleAdd
                }
                autoComplete="off"
                className="space-y-5 p-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="service">
                    Service
                  </Label>

                  <div className="relative">
                    <Globe2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="service"
                      value={
                        form.service
                      }
                      onChange={(
                        event,
                      ) =>
                        updateForm(
                          "service",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. GitHub"
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username or email
                  </Label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="username"
                      value={
                        form.username
                      }
                      onChange={(
                        event,
                      ) =>
                        updateForm(
                          "username",
                          event.target.value,
                        )
                      }
                      placeholder="name@example.com"
                      className="h-11 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      Password
                    </Label>

                    <Link
                      href="/generate"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Sparkles className="size-3" />

                      Generate
                    </Link>
                  </div>

                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        form.password
                      }
                      onChange={(
                        event,
                      ) =>
                        updateForm(
                          "password",
                          event.target.value,
                        )
                      }
                      placeholder="Enter a password"
                      className="h-11 px-9 font-mono"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          (current) =>
                            !current,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showNewPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showNewPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">
                    Notes
                    <span className="ml-1 font-normal text-muted-foreground">
                      optional
                    </span>
                  </Label>

                  <Textarea
                    id="notes"
                    value={
                      form.notes
                    }
                    onChange={(
                      event,
                    ) =>
                      updateForm(
                        "notes",
                        event.target.value,
                      )
                    }
                    placeholder="Recovery information, account details..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="h-11 w-full"
                >
                  {saving ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Encrypting and saving...
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      Add to vault
                    </>
                  )}
                </Button>

                <div className="flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-xs leading-5 text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

                  Password contents are encrypted before being stored in
                  PostgreSQL.
                </div>
              </form>
            </div>
          </aside>

          {/* Password list */}
          <section className="min-w-0">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Saved logins
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Search and manage your saved credentials.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={
                    search
                  }
                  onChange={(
                    event,
                  ) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search your vault..."
                  className="pl-9"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-72 items-center justify-center rounded-2xl border bg-card">
                <div className="text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-primary" />

                  <p className="mt-3 text-sm text-muted-foreground">
                    Unlocking your vault...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                <AlertTriangle className="mx-auto size-8 text-destructive" />

                <h3 className="mt-4 font-semibold">
                  Couldn&apos;t load your vault
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {error}
                </p>

                <Button
                  variant="outline"
                  onClick={() =>
                    void loadVault()
                  }
                  className="mt-5"
                >
                  Try again
                </Button>
              </div>
            ) : filteredEntries.length ===
              0 ? (
              <div className="rounded-2xl border border-dashed bg-card/50 px-6 py-16 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <LockKeyhole className="size-6 text-primary" />
                </div>

                <h3 className="mt-5 font-semibold">
                  {search
                    ? "No matching passwords"
                    : "Your vault is empty"}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {search
                    ? "Try searching with another service, username or email address."
                    : "Save your first login using the form beside your vault."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map(
                  (entry) => {
                    const visible =
                      visiblePasswords.has(
                        entry.id,
                      )

                    const copied =
                      copiedId ===
                      entry.id

                    return (
                      <article
                        key={
                          entry.id
                        }
                        className="group overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/20"
                      >
                        <div className="flex items-start justify-between gap-4 border-b bg-muted/15 px-5 py-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background">
                              <Globe2 className="size-4 text-primary" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate font-semibold">
                                {
                                  entry.service
                                }
                              </h3>

                              {entry.username ? (
                                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <UserRound className="size-3" />

                                  <span className="truncate">
                                    {
                                      entry.username
                                    }
                                  </span>
                                </div>
                              ) : (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  No username saved
                                </p>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setDeleteTarget(
                                entry,
                              )
                            }
                            className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>

                        <div className="space-y-4 p-5">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Password
                            </Label>

                            <div className="mt-2 flex gap-2">
                              <div className="relative min-w-0 flex-1">
                                <Input
                                  readOnly
                                  type={
                                    visible
                                      ? "text"
                                      : "password"
                                  }
                                  value={
                                    entry.password
                                  }
                                  className="h-10 pr-10 font-mono"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    togglePassword(
                                      entry.id,
                                    )
                                  }
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                  {visible ? (
                                    <EyeOff className="size-4" />
                                  ) : (
                                    <Eye className="size-4" />
                                  )}
                                </button>
                              </div>

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  void copyPassword(
                                    entry,
                                  )
                                }
                                className="size-10 shrink-0"
                              >
                                {copied ? (
                                  <Check className="size-4 text-emerald-500" />
                                ) : (
                                  <Copy className="size-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {entry.notes && (
                            <div className="rounded-xl bg-muted/35 p-3">
                              <div className="flex gap-2">
                                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                                  {
                                    entry.notes
                                  }
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between border-t pt-3 text-[11px] text-muted-foreground">
                            <span>
                              Updated{" "}
                              {new Date(
                                entry.updatedAt,
                              ).toLocaleDateString()}
                            </span>

                            <div className="flex items-center gap-1">
                              <ShieldCheck className="size-3 text-primary" />

                              Encrypted
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  },
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <Dialog
        open={
          Boolean(
            deleteTarget,
          )
        }
        onOpenChange={(
          open,
        ) => {
          if (
            !open &&
            !deleting
          ) {
            setDeleteTarget(
              null,
            )
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete password?
            </DialogTitle>

            <DialogDescription>
              {deleteTarget
                ? `${deleteTarget.service} will be removed from your vault.`
                : "This password will be removed from your vault."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={
                deleting
              }
              onClick={() =>
                setDeleteTarget(
                  null,
                )
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={
                deleting
              }
              onClick={() =>
                void handleDelete()
              }
            >
              {deleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete password
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}