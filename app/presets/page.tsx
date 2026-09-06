"use client"

import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  Download,
  FileJson,
  FolderCog,
  Loader2,
  Plus,
  Save,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
} from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type RangeConfig = {
  included: boolean
  min: number
  max: number
  useRange: boolean
}

type PasswordPreset = {
  id: string

  name: string
  length: number

  lowerCases: RangeConfig
  upperCases: RangeConfig
  numbers: RangeConfig
  special: RangeConfig

  createdAt?: string
  updatedAt?: string
}

type PresetForm = {
  name: string
  length: number

  lowerCases: RangeConfig
  upperCases: RangeConfig
  numbers: RangeConfig
  special: RangeConfig
}

const EMPTY_RANGE: RangeConfig = {
  included: false,
  min: 0,
  max: 10,
  useRange: false,
}

function createEmptyForm(): PresetForm {
  return {
    name: "My preset",

    length: 16,

    lowerCases: {
      ...EMPTY_RANGE,
      included: true,
    },

    upperCases: {
      ...EMPTY_RANGE,
      included: true,
    },

    numbers: {
      ...EMPTY_RANGE,
      included: true,
    },

    special: {
      ...EMPTY_RANGE,
    },
  }
}

export default function PresetsPage() {
  const [
    presets,
    setPresets,
  ] =
    useState<PasswordPreset[]>([])

  const [
    form,
    setForm,
  ] =
    useState<PresetForm>(
      createEmptyForm,
    )

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
    createOpen,
    setCreateOpen,
  ] =
    useState(false)

  const [
    deleteTarget,
    setDeleteTarget,
  ] =
    useState<PasswordPreset | null>(
      null,
    )

  const [
    deleting,
    setDeleting,
  ] =
    useState(false)

  const fileInputRef =
    useRef<HTMLInputElement>(
      null,
    )

  const loadPresets =
    useCallback(
      async () => {
        setLoading(true)

        try {
          const response =
            await fetch(
              "/api/presets",
              {
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
              "/login?callbackUrl=/presets"

            return
          }

          if (!response.ok) {
            throw new Error(
              data.error ??
                "Unable to load presets.",
            )
          }

          setPresets(
            Array.isArray(
              data.presets,
            )
              ? data.presets
              : [],
          )
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load presets.",
          )
        } finally {
          setLoading(false)
        }
      },
      [],
    )

  useEffect(() => {
    void loadPresets()
  }, [
    loadPresets,
  ])

  const presetCount =
    presets.length

  const averageLength =
    useMemo(() => {
      if (
        presets.length ===
        0
      ) {
        return 0
      }

      return Math.round(
        presets.reduce(
          (
            total,
            preset,
          ) =>
            total +
            preset.length,
          0,
        ) /
          presets.length,
      )
    }, [
      presets,
    ])

  function updateRange(
    key:
      | "lowerCases"
      | "upperCases"
      | "numbers"
      | "special",

    patch:
      Partial<RangeConfig>,
  ) {
    setForm(
      (current) => ({
        ...current,

        [key]: {
          ...current[key],
          ...patch,
        },
      }),
    )
  }

  async function createPreset(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (
      !form.name.trim()
    ) {
      toast.error(
        "Enter a preset name.",
      )

      return
    }

    if (
      !form.lowerCases
        .included &&
      !form.upperCases
        .included &&
      !form.numbers
        .included &&
      !form.special
        .included
    ) {
      toast.error(
        "Select at least one character type.",
      )

      return
    }

    setSaving(true)

    try {
      const response =
        await fetch(
          "/api/presets",
          {
            method: "POST",

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

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to create preset.",
        )
      }

      setPresets(
        (current) => [
          data.preset,
          ...current,
        ],
      )

      setForm(
        createEmptyForm(),
      )

      setCreateOpen(
        false,
      )

      toast.success(
        "Preset saved to your account.",
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create preset.",
      )
    } finally {
      setSaving(false)
    }
  }

  async function deletePreset() {
    if (!deleteTarget) {
      return
    }

    setDeleting(true)

    try {
      const response =
        await fetch(
          `/api/presets/${deleteTarget.id}`,
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
            "Unable to delete preset.",
        )
      }

      setPresets(
        (current) =>
          current.filter(
            (preset) =>
              preset.id !==
              deleteTarget.id,
          ),
      )

      toast.success(
        `${deleteTarget.name} deleted.`,
      )

      setDeleteTarget(
        null,
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete preset.",
      )
    } finally {
      setDeleting(false)
    }
  }

  function exportPresets() {
    const safePresets =
      presets.map(
        ({
          id: _id,
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          ...preset
        }) => preset,
      )

    const blob =
      new Blob(
        [
          JSON.stringify(
            safePresets,
            null,
            2,
          ),
        ],
        {
          type:
            "application/json",
        },
      )

    const url =
      URL.createObjectURL(
        blob,
      )

    const link =
      document.createElement(
        "a",
      )

    link.href =
      url

    link.download =
      "cryptica-presets.json"

    document.body.appendChild(
      link,
    )

    link.click()
    link.remove()

    URL.revokeObjectURL(
      url,
    )

    toast.success(
      "Presets exported.",
    )
  }

  async function importPresets(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0]

    event.target.value =
      ""

    if (!file) {
      return
    }

    try {
      const text =
        await file.text()

      const parsed =
        JSON.parse(text)

      if (
        !Array.isArray(
          parsed,
        )
      ) {
        throw new Error(
          "Preset file must contain an array.",
        )
      }

      let imported = 0

      for (
        const item of
        parsed
      ) {
        const response =
          await fetch(
            "/api/presets",
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
                  item,
                ),
            },
          )

        if (
          response.ok
        ) {
          imported++
        }
      }

      await loadPresets()

      if (
        imported === 0
      ) {
        toast.error(
          "No valid presets were imported.",
        )

        return
      }

      toast.success(
        `${imported} ${
          imported === 1
            ? "preset"
            : "presets"
        } imported.`,
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to import presets.",
      )
    }
  }

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-7 shadow-sm sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <SlidersHorizontal className="size-3.5 text-primary" />

                Password generator presets
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your presets
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Save your favourite password generation configurations and use
                them again whenever you need them.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-background/50 px-4 py-3">
                <p className="text-xl font-bold">
                  {presetCount}
                </p>

                <p className="text-xs text-muted-foreground">
                  Saved presets
                </p>
              </div>

              <div className="rounded-xl border bg-background/50 px-4 py-3">
                <p className="text-xl font-bold">
                  {averageLength ||
                    "—"}
                </p>

                <p className="text-xs text-muted-foreground">
                  Avg. length
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}

        <section className="mt-6 flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">
              Preset library
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Synced securely with your Cryptica account.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Upload className="size-4" />

              Import
            </Button>

            <input
              ref={
                fileInputRef
              }
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={
                importPresets
              }
            />

            <Button
              variant="outline"
              disabled={
                presets.length ===
                0
              }
              onClick={
                exportPresets
              }
            >
              <Download className="size-4" />

              Export
            </Button>

            <Button
              onClick={() =>
                setCreateOpen(
                  true,
                )
              }
            >
              <Plus className="size-4" />

              New preset
            </Button>
          </div>
        </section>

        {/* Privacy/status */}

        <div className="mt-4 flex items-start gap-3 rounded-xl border bg-muted/25 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="size-4 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium">
              Account synced
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Presets contain generator configuration only. They never contain
              generated passwords or vault credentials.
            </p>
          </div>
        </div>

        {/* List */}

        <section className="mt-6">
          {loading ? (
            <div className="flex min-h-72 items-center justify-center rounded-2xl border bg-card">
              <div className="text-center">
                <Loader2 className="mx-auto size-6 animate-spin text-primary" />

                <p className="mt-3 text-sm text-muted-foreground">
                  Loading presets...
                </p>
              </div>
            </div>
          ) : presets.length ===
            0 ? (
            <div className="rounded-2xl border border-dashed bg-card/50 px-6 py-16 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <FolderCog className="size-6 text-primary" />
              </div>

              <h3 className="mt-5 font-semibold">
                No presets yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Create a preset to save a password generation configuration to
                your Cryptica account.
              </p>

              <Button
                className="mt-6"
                onClick={() =>
                  setCreateOpen(
                    true,
                  )
                }
              >
                <Plus className="size-4" />

                Create your first preset
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {presets.map(
                (preset) => (
                  <PresetCard
                    key={
                      preset.id
                    }
                    preset={
                      preset
                    }
                    onDelete={() =>
                      setDeleteTarget(
                        preset,
                      )
                    }
                  />
                ),
              )}
            </div>
          )}
        </section>
      </main>

      {/* Create preset */}

      <Dialog
        open={
          createOpen
        }
        onOpenChange={
          setCreateOpen
        }
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <form
            onSubmit={
              createPreset
            }
          >
            <DialogHeader>
              <DialogTitle>
                Create password preset
              </DialogTitle>

              <DialogDescription>
                Save a reusable configuration for the Cryptica password
                generator.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                <div className="space-y-2">
                  <Label htmlFor="preset-name">
                    Name
                  </Label>

                  <Input
                    id="preset-name"
                    value={
                      form.name
                    }
                    onChange={(
                      event,
                    ) =>
                      setForm(
                        (
                          current,
                        ) => ({
                          ...current,

                          name:
                            event
                              .target
                              .value,
                        }),
                      )
                    }
                    maxLength={
                      100
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preset-length">
                    Length
                  </Label>

                  <Input
                    id="preset-length"
                    type="number"
                    min={
                      4
                    }
                    max={
                      4096
                    }
                    value={
                      form.length
                    }
                    onChange={(
                      event,
                    ) =>
                      setForm(
                        (
                          current,
                        ) => ({
                          ...current,

                          length:
                            Number(
                              event
                                .target
                                .value,
                            ),
                        }),
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <CharacterSection
                  title="Lowercase letters"
                  description="Include a–z"
                  value={
                    form.lowerCases
                  }
                  onChange={(
                    patch,
                  ) =>
                    updateRange(
                      "lowerCases",
                      patch,
                    )
                  }
                />

                <CharacterSection
                  title="Uppercase letters"
                  description="Include A–Z"
                  value={
                    form.upperCases
                  }
                  onChange={(
                    patch,
                  ) =>
                    updateRange(
                      "upperCases",
                      patch,
                    )
                  }
                />

                <CharacterSection
                  title="Numbers"
                  description="Include 0–9"
                  value={
                    form.numbers
                  }
                  onChange={(
                    patch,
                  ) =>
                    updateRange(
                      "numbers",
                      patch,
                    )
                  }
                />

                <CharacterSection
                  title="Special characters"
                  description="Include symbols and punctuation"
                  value={
                    form.special
                  }
                  onChange={(
                    patch,
                  ) =>
                    updateRange(
                      "special",
                      patch,
                    )
                  }
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                disabled={
                  saving
                }
                onClick={() =>
                  setCreateOpen(
                    false,
                  )
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  saving
                }
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />

                    Save preset
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}

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
              Delete preset?
            </DialogTitle>

            <DialogDescription>
              {deleteTarget
                ? `"${deleteTarget.name}" will be permanently removed from your Cryptica account.`
                : "This preset will be permanently removed."}
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
                void deletePreset()
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

                  Delete preset
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CharacterSection({
  title,
  description,
  value,
  onChange,
}: {
  title: string
  description: string

  value:
    RangeConfig

  onChange: (
    patch:
      Partial<RangeConfig>,
  ) => void
}) {
  return (
    <div className="rounded-xl border bg-muted/15 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Label className="text-sm font-medium">
            {title}
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <Switch
          checked={
            value.included
          }
          onCheckedChange={(
            checked,
          ) =>
            onChange({
              included:
                checked,
            })
          }
        />
      </div>

      {value.included && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={
                value.useRange
              }
              onCheckedChange={(
                checked,
              ) =>
                onChange({
                  useRange:
                    checked ===
                    true,
                })
              }
            />

            <Label className="text-xs">
              Require a minimum/maximum amount
            </Label>
          </div>

          {value.useRange && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Minimum
                </Label>

                <Input
                  type="number"
                  min={
                    0
                  }
                  value={
                    value.min
                  }
                  onChange={(
                    event,
                  ) =>
                    onChange({
                      min:
                        Math.max(
                          0,
                          Number(
                            event
                              .target
                              .value,
                          ),
                        ),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Maximum
                </Label>

                <Input
                  type="number"
                  min={
                    value.min
                  }
                  value={
                    value.max
                  }
                  onChange={(
                    event,
                  ) =>
                    onChange({
                      max:
                        Math.max(
                          value.min,
                          Number(
                            event
                              .target
                              .value,
                          ),
                        ),
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PresetCard({
  preset,
  onDelete,
}: {
  preset:
    PasswordPreset

  onDelete:
    () => void
}) {
  const types = [
    preset.lowerCases
      .included &&
      "Lowercase",

    preset.upperCases
      .included &&
      "Uppercase",

    preset.numbers
      .included &&
      "Numbers",

    preset.special
      .included &&
      "Symbols",
  ].filter(
    Boolean,
  ) as string[]

  return (
    <article className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors hover:border-primary/20">
      <div className="flex items-start justify-between gap-3 border-b bg-muted/15 p-5">
        <div className="flex min-w-0 gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Settings2 className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {preset.name}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {preset.length} character password
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={
            onDelete
          }
          className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Included
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {types.map(
            (type) => (
              <span
                key={
                  type
                }
                className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
              >
                {type}
              </span>
            ),
          )}
        </div>

        <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <FileJson className="size-3.5 text-primary" />

          Account preset
        </div>
      </div>
    </article>
  )
}