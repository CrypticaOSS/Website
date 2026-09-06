"use client"

import type { FormEvent } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Vault,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)

  const passwordChecks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }

  const passwordValid = Object.values(passwordChecks).every(Boolean)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!name.trim()) {
      toast.error("Enter your name")
      return
    }

    if (!email.trim()) {
      toast.error("Enter your email address")
      return
    }

    if (!passwordValid) {
      toast.error(
        "Your password does not meet the security requirements.",
      )
      return
    }

    if (password !== confirmPassword) {
      toast.error("Your passwords do not match.")
      return
    }

    if (!acceptedTerms) {
      toast.error(
        "Please accept the Terms of Service and Privacy Policy.",
      )
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          result?.error ?? "Unable to create your account.",
        )
      }

      toast.success("Welcome to Cryptica")

      router.push("/vault")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-6xl items-center py-6 lg:py-10">
      <div
        className="
          grid w-full overflow-hidden rounded-3xl
          border border-border/70
          bg-card/45
          shadow-xl
          backdrop-blur-xl
          lg:grid-cols-[1.05fr_0.95fr]
        "
      >
        {/* ============================================================ */}
        {/* Left / marketing                                             */}
        {/* ============================================================ */}

        <div
          className="
            relative hidden overflow-hidden
            border-r border-border/70
            bg-linear-to-br
            from-primary/[0.10]
            via-background/40
            to-background/10
            p-10
            lg:flex lg:flex-col lg:justify-between
          "
        >
          <div
            className="
              pointer-events-none absolute -left-32 -top-32
              size-96 rounded-full
              bg-primary/[0.13]
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute -bottom-40 -right-40
              size-96 rounded-full
              bg-primary/[0.08]
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]
              bg-size-[56px_56px]
              opacity-[0.025]
            "
          />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div
                className="
                  flex size-10 items-center justify-center
                  rounded-xl
                  border border-primary/15
                  bg-primary/10
                  text-primary
                "
              >
                <LockKeyhole className="size-5" />
              </div>

              <div>
                <p className="font-bold tracking-tight">
                  Cryptica
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Password security toolkit
                </p>
              </div>
            </Link>

            <div className="mt-16 max-w-lg">
              <div
                className="
                  mb-4 inline-flex items-center gap-2
                  rounded-full
                  border border-primary/15
                  bg-primary/[0.08]
                  px-3 py-1.5
                  text-xs font-semibold
                  text-primary
                "
              >
                <Sparkles className="size-3.5" />
                Your secure space
              </div>

              <h1
                className="
                  text-4xl font-extrabold
                  tracking-[-0.045em]
                  xl:text-5xl
                "
              >
                Your passwords.
                <span className="block text-primary">
                  Your security.
                </span>
              </h1>

              <p
                className="
                  mt-5 max-w-md
                  text-sm leading-7
                  text-muted-foreground
                "
              >
                Create a Cryptica account to unlock your vault,
                saved generator presets, security activity and
                account protection tools.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <Feature
                icon={Vault}
                title="Your private vault"
                description="Keep your saved credentials organised and available from your account."
              />

              <Feature
                icon={KeyRound}
                title="Saved generator presets"
                description="Reuse your preferred password rules whenever you need them."
              />

              <Feature
                icon={ShieldCheck}
                title="Security tools"
                description="Review activity, breaches and account security from one place."
              />
            </div>
          </div>

          <div
            className="
              relative mt-14 rounded-2xl
              border border-border/60
              bg-background/35
              p-4
              backdrop-blur-xl
            "
          >
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-muted-foreground">
                Cryptica is built around privacy-conscious password
                tools and secure account sessions.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Register form                                                */}
        {/* ============================================================ */}

        <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
          <div
            className="
              pointer-events-none absolute -right-24 -top-24
              size-64 rounded-full
              bg-primary/[0.06]
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-md">
            <div className="mb-8">
              <div
                className="
                  mb-5 flex size-11 items-center justify-center
                  rounded-xl
                  border border-primary/15
                  bg-primary/10
                  text-primary
                  lg:hidden
                "
              >
                <LockKeyhole className="size-5" />
              </div>

              <p
                className="
                  mb-2 text-xs font-bold
                  uppercase tracking-[0.12em]
                  text-primary
                "
              >
                Create your account
              </p>

              <h2
                className="
                  text-3xl font-extrabold
                  tracking-[-0.035em]
                "
              >
                Join Cryptica
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create an account to unlock your private Cryptica
                features.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name
                </Label>

                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  disabled={loading}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  className="h-11 rounded-xl bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  disabled={loading}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="h-11 rounded-xl bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    value={password}
                    disabled={loading}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    className="
                      h-11 rounded-xl
                      bg-background/60
                      pr-11
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {password.length > 0 && (
                  <div
                    className="
                      mt-3 grid gap-2 rounded-xl
                      border border-border/60
                      bg-background/35
                      p-3
                      sm:grid-cols-2
                    "
                  >
                    <PasswordRequirement
                      met={passwordChecks.length}
                      label="12+ characters"
                    />

                    <PasswordRequirement
                      met={passwordChecks.uppercase}
                      label="Uppercase letter"
                    />

                    <PasswordRequirement
                      met={passwordChecks.lowercase}
                      label="Lowercase letter"
                    />

                    <PasswordRequirement
                      met={passwordChecks.number}
                      label="Number"
                    />

                    <PasswordRequirement
                      met={passwordChecks.symbol}
                      label="Symbol"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    disabled={loading}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    className="
                      h-11 rounded-xl
                      bg-background/60
                      pr-11
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {confirmPassword.length > 0 && (
                  <p
                    className={
                      password === confirmPassword
                        ? "text-xs text-emerald-500"
                        : "text-xs text-destructive"
                    }
                  >
                    {password === confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  disabled={loading}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked === true)
                  }
                  className="mt-0.5"
                />

                <Label
                  htmlFor="terms"
                  className="
                    text-xs font-normal
                    leading-5
                    text-muted-foreground
                  "
                >
                  I agree to Cryptica&apos;s{" "}
                  <Link
                    href="/terms"
                    className="
                      font-semibold text-primary
                      hover:underline
                    "
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="
                      font-semibold text-primary
                      hover:underline
                    "
                  >
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="
                  h-11 w-full rounded-xl
                  font-semibold
                "
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 size-4" />
                    Create account
                  </>
                )}
              </Button>
            </form>

            <div
              className="
                my-7 flex items-center gap-3
                text-xs text-muted-foreground
              "
            >
              <div className="h-px flex-1 bg-border" />
              Already have an account?
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button
              asChild
              variant="outline"
              className="
                h-11 w-full rounded-xl
                bg-background/40
              "
            >
              <Link href="/login">
                Sign in to Cryptica
              </Link>
            </Button>

            <div
              className="
                mt-7 rounded-xl
                border border-primary/15
                bg-primary/[0.05]
                p-3
              "
            >
              <div className="flex gap-3">
                <ShieldCheck
                  className="
                    mt-0.5 size-4 shrink-0
                    text-primary
                  "
                />

                <p
                  className="
                    text-[11px] leading-5
                    text-muted-foreground
                  "
                >
                  Cryptica is currently running its development
                  authentication system. Production account storage
                  will use the same account interface without changing
                  this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{
    className?: string
  }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div
        className="
          flex size-10 shrink-0 items-center justify-center
          rounded-xl
          border border-primary/15
          bg-primary/10
          text-primary
        "
      >
        <Icon className="size-[18px]" />
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p
          className="
            mt-1 max-w-sm
            text-xs leading-5
            text-muted-foreground
          "
        >
          {description}
        </p>
      </div>
    </div>
  )
}

function PasswordRequirement({
  met,
  label,
}: {
  met: boolean
  label: string
}) {
  return (
    <div
      className={
        met
          ? "flex items-center gap-2 text-xs text-emerald-500"
          : "flex items-center gap-2 text-xs text-muted-foreground"
      }
    >
      <div
        className={
          met
            ? "flex size-4 items-center justify-center rounded-full bg-emerald-500/10"
            : "flex size-4 items-center justify-center rounded-full bg-secondary"
        }
      >
        {met && (
          <Check className="size-2.5" />
        )}
      </div>

      {label}
    </div>
  )
}