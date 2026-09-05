"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const isDeveloper = process.env.NEXT_PUBLIC_AUTH_MODE === "mock"

  useEffect(() => {
    if (isDeveloper) {
      setEmail("demo@cryptica.app")
      setPassword("CrypticaDemo123!")
    }
  }, [isDeveloper])

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
      toast.error(error instanceof Error ? error.message : "Unable to sign in.")
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
      toast.error(error instanceof Error ? error.message : "Unable to sign in.")
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <main className="bg-background relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/10 absolute -top-40 -left-40 size-[34rem] rounded-full blur-3xl" />
        <div className="bg-primary/8 absolute -right-32 -bottom-48 size-[38rem] rounded-full blur-3xl" />

        <div className="absolute inset-0 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.035]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="border-border/60 hidden border-r p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="border-primary/15 bg-primary/10 flex size-11 items-center justify-center overflow-hidden rounded-2xl border shadow-sm">
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
              <p className="text-lg font-extrabold tracking-tight">Cryptica</p>
              <p className="text-muted-foreground text-xs">
                Password security, simplified.
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <div className="border-primary/15 bg-primary/8 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold">
              <ShieldCheck className="size-3.5" />
              Privacy-first account security
            </div>

            <h1 className="max-w-lg text-4xl leading-[1.08] font-extrabold tracking-[-0.04em] xl:text-5xl">
              Your passwords.
              <span className="text-gradient-primary block">
                Your security.
              </span>
            </h1>

            <p className="text-muted-foreground mt-5 max-w-lg text-base leading-7">
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

          <div className="border-border/70 bg-card/60 max-w-xl rounded-2xl border p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
                <Sparkles className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  The password generator stays free
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
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
              <div className="border-primary/15 bg-primary/10 flex size-10 items-center justify-center overflow-hidden rounded-xl border">
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
              <div className="border-primary/15 bg-primary/10 text-primary mb-5 flex size-11 items-center justify-center rounded-2xl border shadow-sm">
                <LockKeyhole className="size-5" />
              </div>

              <h2 className="text-3xl font-extrabold tracking-[-0.035em]">
                Welcome back
              </h2>

              <p className="text-muted-foreground mt-2 text-sm leading-6">
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
              <div className="bg-border h-px flex-1" />
              <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.12em] uppercase">
                or continue with email
              </span>
              <div className="bg-border h-px flex-1" />
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
                  className="bg-background/80 h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-primary text-xs font-semibold hover:underline"
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
                    className="bg-background/80 h-12 rounded-xl pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg transition"
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
                    onCheckedChange={(value) => setRememberMe(value === true)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-muted-foreground cursor-pointer text-sm font-normal"
                  >
                    Remember me
                  </Label>
                </div>

                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Secure session
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSigningIn}
                className="group shadow-primary h-12 w-full rounded-xl"
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

            {isDeveloper ? (
              <div className="border-primary/15 bg-primary/[0.055] mt-5 rounded-xl border p-3">
                <p className="text-primary text-xs font-semibold">
                  Development authentication
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  While AUTH_MODE is set to mock, any non-empty email and
                  password can sign in. The browser still receives a normal
                  HTTP-only session cookie through the same API used in
                  production.
                </p>
              </div>
            ) : null}

            <p className="text-muted-foreground mt-8 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
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
    <div className="border-border/60 bg-card/35 flex items-start gap-3 rounded-2xl border p-4 backdrop-blur-sm">
      <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground mt-1 text-xs leading-5">
          {description}
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-2 size-4">
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.98h5.38c-.23 1.49-1.68 4.37-5.38 4.37A6.45 6.45 0 0 1 12 5.55c2.11 0 3.52.9 4.33 1.68l2.95-2.85C17.38 2.61 14.91 1.55 12 1.55a10.45 10.45 0 1 0 0 20.9c6.03 0 10.02-4.24 10.02-10.21 0-.69-.08-1.2-.17-1.14Z"
      />
    </svg>
  )
}
