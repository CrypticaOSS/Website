"use client"

import {
  type FormEvent,
  useEffect,
  useState,
} from "react"

import { useSearchParams } from "next/navigation"

type ApprovalState =
  | "idle"
  | "approving"
  | "approved"
  | "error"

export default function ActivatePage() {
  const searchParams = useSearchParams()

  const [code, setCode] = useState("")
  const [state, setState] =
    useState<ApprovalState>("idle")

  const [error, setError] =
    useState<string | null>(null)

  /*
   * Automatically populate the code when Electron opens:
   *
   * /activate?code=F8KD-42PQ
   */
  useEffect(() => {
    const queryCode = searchParams.get("code")

    if (!queryCode) {
      return
    }

    const normalized = queryCode
      .trim()
      .toUpperCase()

    setCode(normalized)
  }, [searchParams])

  const normalizedCode = code
    .trim()
    .toUpperCase()

  const codeValid =
    /^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(
      normalizedCode
    )

  async function approve(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!codeValid) {
      setError(
        "Enter the eight-character code shown in the Cryptica desktop app."
      )

      return
    }

    setState("approving")
    setError(null)

    try {
      const response = await fetch(
        "/api/auth/device/approve",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userCode: normalizedCode,
          }),
        }
      )

      const data = await response
        .json()
        .catch(() => null)

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message ??
                "Unable to approve this device."
        )
      }

      setState("approved")
    } catch (error) {
      console.error(
        "[DEVICE:APPROVE]",
        error
      )

      setState("error")

      setError(
        error instanceof Error
          ? error.message
          : "Unable to approve this device."
      )
    }
  }

  function handleCodeChange(
    value: string
  ) {
    let nextValue = value
      .toUpperCase()
      .replace(/[^A-Z2-9]/g, "")
      .slice(0, 8)

    if (nextValue.length > 4) {
      nextValue = `${nextValue.slice(
        0,
        4
      )}-${nextValue.slice(4)}`
    }

    setCode(nextValue)

    if (state === "error") {
      setState("idle")
    }

    setError(null)
  }

  /*
   * Successful authorization screen
   */

  if (state === "approved") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-500">
            ✓
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Device authorised
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Cryptica Desktop has been
            authorised to access your
            account.
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            You can close this window and
            return to the desktop app.
          </p>

          <div className="mt-6 rounded-xl border bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              Device
            </p>

            <p className="mt-1 text-sm font-medium">
              Cryptica Desktop
            </p>
          </div>
        </div>
      </main>
    )
  }

  /*
   * Authorization form
   */

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-xl">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border bg-muted font-semibold">
              C
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Authorise Cryptica Desktop
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Enter the code shown in the
              Cryptica desktop application
              to connect it to your
              account.
            </p>
          </div>

          <form
            onSubmit={approve}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="device-code"
                className="mb-2 block text-sm font-medium"
              >
                Device code
              </label>

              <input
                id="device-code"
                name="device-code"
                type="text"
                value={code}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="F8KD-42PQ"
                maxLength={9}
                disabled={
                  state === "approving"
                }
                onChange={(event) =>
                  handleCodeChange(
                    event.target.value
                  )
                }
                className="h-14 w-full rounded-xl border bg-background px-4 text-center font-mono text-xl font-semibold tracking-[0.2em] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
              >
                {error}
              </div>
            )}

            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm font-medium">
                Cryptica Desktop is
                requesting access
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Only approve this request
                if you started the sign-in
                process yourself.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                !codeValid ||
                state === "approving"
              }
              className="h-12 w-full rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === "approving"
                ? "Authorising…"
                : "Allow device"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            Device codes expire
            automatically after 10
            minutes.
          </p>
        </div>
      </div>
    </main>
  )
}