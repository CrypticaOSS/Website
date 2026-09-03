"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Github,
  KeyRound,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { useAuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthContext()

  const [email, setEmail] = useState("demo@cryptica.app")
  const [password, setPassword] = useState("CrypticaDemo123!")
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      toast.error("Enter an email address")
      return
    }

    if (!password) {
      toast.error("Enter a password")
      return
    }

    try {
      setIsSigningIn(true)

      await login({
        email,
        password,
        rememberMe,
      })

      toast.success("Welcome to Cryptica")

      router.push("/vault")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in."
      )
    } finally {
      setIsSigningIn(false)
    }
  }

  async function handleMockProvider(provider: string) {
    try {
      setIsSigningIn(true)

      await login({
        email:
          provider === "GitHub"
            ? "demo@users.noreply.github.com"
            : "demo@gmail.com",
        password: `mock-${provider.toLowerCase()}-login`,
        rememberMe,
      })

      toast.success(`Signed in with ${provider}`)

      router.push("/vault")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in."
      )
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 size-[38rem] rounded-full bg-primary/8 blur-3xl" />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden border-r border-border/60 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-primary/15 bg-primary/10 shadow-sm">
              <Image
                src="/logo.png"
                alt="Cryptica"
                width={40}
                height={40}
                className="size-10 object-contain"
                priority
              />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight">
                Cryptica
              </p>
              <p className="text-xs text-muted-foreground">
                Password security, simplified.
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-3.5" />
              Privacy-first account security
            </div>

            <h1 className="max-w-lg text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] xl:text-5xl">
              Your passwords.
              <span className="block text-gradient-primary">
                Your security.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Sign in to access your encrypted vault, saved generator presets,
              security activity and account-only protection tools.
            </p>

            <div className="mt-8 grid gap-3">
              <Feature
                icon={LockKeyhole}
                title="Encrypted vault"
                description="Keep account passwords organised behind your Cryptica account."
              />
              <Feature
                icon={KeyRound}
                title="Saved generator presets"
                description="Keep your preferred password generation rules ready on every visit."
              />
              <Feature
                icon={ShieldCheck}
                title="Security activity"
                description="Review important account and password-security events in one place."
              />
            </div>
          </div>

          <div className="max-w-xl rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  The password generator stays free
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  You never need an account just to generate a secure password.
                  Accounts unlock syncing and private Cryptica tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center p-5 sm:p-8 lg:p-12">
          <div className="w-full max-w-[440px]">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-3 lg:hidden"
            >
              <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl border border-primary/15 bg-primary/10">
                <Image
                  src="/logo.png"
                  alt="Cryptica"
                  width={36}
                  height={36}
                  className="size-9 object-contain"
                />
              </div>

              <span className="text-lg font-extrabold tracking-tight">
                Cryptica
              </span>
            </Link>

            <div>
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm">
                <LockKeyhole className="size-5" />
              </div>

              <h2 className="text-3xl font-extrabold tracking-[-0.035em]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in to continue to your Cryptica account.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSigningIn}
                onClick={() => handleMockProvider("GitHub")}
                className="h-11 rounded-xl"
              >
                <Github className="mr-2 size-4" />
                GitHub
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={isSigningIn}
                onClick={() => handleMockProvider("Google")}
                className="h-11 rounded-xl"
              >
                <GoogleIcon />
                Google
              </Button>
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  disabled={isSigningIn}
                  className="h-12 rounded-xl bg-background/80"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    disabled={isSigningIn}
                    className="h-12 rounded-xl bg-background/80 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(value) =>
                      setRememberMe(value === true)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Secure session
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSigningIn}
                className="group h-12 w-full rounded-xl shadow-primary"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-5 rounded-xl border border-primary/15 bg-primary/[0.055] p-3">
              <p className="text-xs font-semibold text-primary">
                Development authentication
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                While AUTH_MODE is set to mock, any non-empty email and password
                can sign in. The browser still receives a normal HTTP-only
                session cookie through the same API used in production.
              </p>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/35 p-4 backdrop-blur-sm">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mr-2 size-4"
    >
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.98h5.38c-.23 1.49-1.68 4.37-5.38 4.37A6.45 6.45 0 0 1 12 5.55c2.11 0 3.52.9 4.33 1.68l2.95-2.85C17.38 2.61 14.91 1.55 12 1.55a10.45 10.45 0 1 0 0 20.9c6.03 0 10.02-4.24 10.02-10.21 0-.69-.08-1.2-.17-1.14Z"
      />
    </svg>
  )
}
