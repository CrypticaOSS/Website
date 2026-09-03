"use client"

import {
  type FormEvent,
  useRef,
  useState,
} from "react"

import {
  AlertCircle,
  Bell,
  Building2,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

import {
  getPasswordStrength,
  getStrengthInfo,
  PasswordStrength,
} from "@/lib/password"

import {
  checkPasswordBreach,
} from "@/lib/breaches"

import {
  Button,
} from "@/components/ui/button"

import {
  Input,
} from "@/components/ui/input"

import {
  Label,
} from "@/components/ui/label"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type Breach = {
  name: string
  title: string
  domain: string
  breachDate: string
  addedDate: string
  modifiedDate: string
  affectedAccounts: number
  description: string
  logo: string
  dataClasses: string[]
  verified: boolean
  fabricated: boolean
  spamList: boolean
  malware: boolean
}

type AccountResult = {
  ok: boolean
  breached: boolean
  email: string
  totalBreaches: number
  breaches: Breach[]
}

function getStrengthLabel(
  strength:
    PasswordStrength,
) {
  switch (strength) {
    case PasswordStrength.VeryWeak:
      return "Very weak"

    case PasswordStrength.Weak:
      return "Weak"

    case PasswordStrength.Moderate:
      return "Moderate"

    case PasswordStrength.Strong:
      return "Strong"

    case PasswordStrength.VeryStrong:
      return "Very strong"

    default:
      return "Unknown"
  }
}

function getStrengthPercentage(
  strength:
    PasswordStrength,
) {
  switch (strength) {
    case PasswordStrength.VeryWeak:
      return 20

    case PasswordStrength.Weak:
      return 40

    case PasswordStrength.Moderate:
      return 60

    case PasswordStrength.Strong:
      return 80

    case PasswordStrength.VeryStrong:
      return 100

    default:
      return 0
  }
}

function ComingSoonFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-card/60 p-4">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>

      <p className="mt-3 text-sm font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

/*
 * Securely generate random characters.
 *
 * Never use Math.random() for passwords.
 */
function secureRandomIndex(
  max: number,
) {
  if (
    max <= 0
  ) {
    return 0
  }

  const maximum =
    0xffffffff -
    (0xffffffff %
      max)

  const random =
    new Uint32Array(
      1,
    )

  do {
    crypto.getRandomValues(
      random,
    )
  } while (
    random[0] >=
    maximum
  )

  return (
    random[0] %
    max
  )
}

function generatePassword(
  length = 20,
) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}:,.<>?"

  return Array.from(
    {
      length,
    },
    () =>
      characters[
        secureRandomIndex(
          characters.length,
        )
      ],
  ).join("")
}

export default function BreachesPage() {
  /*
   * Password checker
   */
  const [
    password,
    setPassword,
  ] =
    useState("")

  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false)

  const [
    passwordLoading,
    setPasswordLoading,
  ] =
    useState(false)

  const [
    passwordResult,
    setPasswordResult,
  ] =
    useState<
      number | null
    >(null)

  const [
    passwordError,
    setPasswordError,
  ] =
    useState<
      string | null
    >(null)

  /*
   * Account checker
   */
  const [
    email,
    setEmail,
  ] =
    useState("")

  const [
    accountLoading,
    setAccountLoading,
  ] =
    useState(false)

  const [
    accountResult,
    setAccountResult,
  ] =
    useState<
      AccountResult | null
    >(null)

  const [
    accountError,
    setAccountError,
  ] =
    useState<
      string | null
    >(null)

  const passwordInput =
    useRef<HTMLInputElement>(
      null,
    )

  const strength =
    getPasswordStrength(
      password,
    )

  const analysis =
    getStrengthInfo(
      password,
    )

  async function checkPassword(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!password) {
      return
    }

    setPasswordLoading(
      true,
    )

    setPasswordResult(
      null,
    )

    setPasswordError(
      null,
    )

    try {
      const result =
        await checkPasswordBreach(
          password,
        )

      setPasswordResult(
        result,
      )
    } catch (error) {
      console.error(
        error,
      )

      setPasswordError(
        "Cryptica couldn't check this password right now. Please try again.",
      )
    } finally {
      setPasswordLoading(
        false,
      )
    }
  }

  async function checkAccount(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const cleanEmail =
      email
        .trim()
        .toLowerCase()

    if (!cleanEmail) {
      return
    }

    setAccountLoading(
      true,
    )

    setAccountResult(
      null,
    )

    setAccountError(
      null,
    )

    try {
      const response =
        await fetch(
          "/api/breaches/account",
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
              JSON.stringify({
                email:
                  cleanEmail,
              }),
          },
        )

      const data =
        await response.json()

      if (
        response.status ===
        401
      ) {
        window.location.href =
          "/login?callbackUrl=/breaches"

        return
      }

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to search breaches.",
        )
      }

      setAccountResult(
        data,
      )
    } catch (error) {
      setAccountError(
        error instanceof
          Error
          ? error.message
          : "Unable to search breaches.",
      )
    } finally {
      setAccountLoading(
        false,
      )
    }
  }

  function createPassword() {
    const generated =
      generatePassword(
        20,
      )

    setPassword(
      generated,
    )

    setPasswordResult(
      null,
    )

    setPasswordError(
      null,
    )

    requestAnimationFrame(
      () =>
        passwordInput.current?.focus(),
    )
  }

  async function copyPassword() {
    if (!password) {
      return
    }

    await navigator.clipboard.writeText(
      password,
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-7 shadow-sm sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldAlert className="size-3.5 text-primary" />

              Cryptica Breach Centre
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find exposed credentials
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Check passwords against known compromised-password data or
              search an email address for known data breaches.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-background/50 px-4 py-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Powered by HIBP
              </p>

              <p className="text-xs text-muted-foreground">
                Privacy-aware breach checking
              </p>
            </div>
          </div>
        </div>
      </section>

      <Tabs
        defaultValue="password"
        className="mt-6"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl border bg-card p-1 sm:w-auto sm:inline-grid">
          <TabsTrigger
            value="password"
            className="gap-2"
          >
            <KeyRound className="size-4" />

            Password
          </TabsTrigger>

          <TabsTrigger
            value="account"
            className="gap-2"
          >
            <Mail className="size-4" />

            Email address
          </TabsTrigger>
        </TabsList>

        {/* Password */}

        <TabsContent
          value="password"
          className="mt-5"
        >
          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <section className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <KeyRound className="size-5 text-primary" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Password exposure
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Check whether a password appears in known compromised
                    password datasets.
                  </p>
                </div>
              </div>

              <form
                className="mt-6"
                onSubmit={
                  checkPassword
                }
              >
                <Label htmlFor="password">
                  Password
                </Label>

                <div className="mt-2 flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={
                        passwordInput
                      }
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        password
                      }
                      onChange={(
                        event,
                      ) => {
                        setPassword(
                          event
                            .target
                            .value,
                        )

                        setPasswordResult(
                          null,
                        )
                      }}
                      autoComplete="new-password"
                      placeholder="Enter a password"
                      className="h-11 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (
                            current,
                          ) =>
                            !current,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-11"
                    disabled={
                      !password
                    }
                    onClick={() =>
                      void copyPassword()
                    }
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={
                      createPassword
                    }
                  >
                    <Sparkles className="size-4" />

                    Generate
                  </Button>
                </div>

                {password && (
                  <div className="mt-5 rounded-xl border bg-muted/15 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">
                        Strength
                      </span>

                      <span className="text-sm font-semibold">
                        {getStrengthLabel(
                          strength,
                        )}
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{
                          width: `${getStrengthPercentage(
                            strength,
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <Metric
                        label="Length"
                        value={
                          analysis.length
                        }
                      />

                      <Metric
                        label="Entropy"
                        value={`${analysis.entropy} bits`}
                      />

                      <Metric
                        label="Numbers"
                        value={
                          analysis.numbers
                        }
                      />

                      <Metric
                        label="Symbols"
                        value={
                          analysis.special
                        }
                      />
                    </div>
                  </div>
                )}

                {passwordError && (
                  <ErrorBox>
                    {passwordError}
                  </ErrorBox>
                )}

                {passwordResult !==
                  null && (
                  <div className="mt-5">
                    {passwordResult >
                    0 ? (
                      <ResultBox
                        danger
                        icon={
                          ShieldAlert
                        }
                        title="Password compromised"
                      >
                        This password appears{" "}
                        <strong>
                          {passwordResult.toLocaleString()}
                        </strong>{" "}
                        times in known compromised-password data. Do not use
                        it.
                      </ResultBox>
                    ) : (
                      <ResultBox
                        icon={
                          CheckCircle2
                        }
                        title="No known exposure found"
                      >
                        This password wasn&apos;t found in the compromised-password
                        corpus. That doesn&apos;t guarantee it is safe, so it should
                        still be strong and unique.
                      </ResultBox>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="mt-5 w-full"
                  size="lg"
                  disabled={
                    !password ||
                    passwordLoading
                  }
                >
                  {passwordLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Shield className="size-4" />
                      Check password
                    </>
                  )}
                </Button>
              </form>
            </section>

            <aside className="space-y-4">
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />

                  <h3 className="font-semibold">
                    Password privacy
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Cryptica hashes the password in your browser and only sends
                  the first five characters of its SHA-1 hash to the Pwned
                  Passwords range API.
                </p>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Your password and complete hash are never sent to HIBP.
                </p>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-5">
                  <h3 className="font-semibold">
                  If it&apos;s compromised
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    • Stop using the password.
                  </li>

                  <li>
                    • Change it anywhere you&apos;ve reused it.
                  </li>

                  <li>
                    • Generate a unique replacement.
                  </li>

                  <li>
                    • Enable 2FA where available.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </TabsContent>

        {/* Account */}

       <TabsContent
  value="account"
  className="mt-5"
>
  <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-14 shadow-sm sm:px-10 sm:py-20">
    {/* Background effects */}
    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

    <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative mx-auto max-w-2xl text-center">
      {/* Icon */}
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-primary/10 shadow-sm">
        <Mail className="size-7 text-primary" />
      </div>

      {/* Badge */}
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
        <Sparkles className="size-3.5 text-primary" />

        Coming soon
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
        Email breach monitoring
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        We&apos;re building account breach monitoring that will help you
        discover when your email address appears in known data breaches.
      </p>

      {/* Preview */}
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border bg-background/50 p-5 text-left">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <ShieldCheck className="size-5 text-primary" />
          </div>

          <div>
            <p className="font-medium">
              What&apos;s coming
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Search known breaches, see what information was exposed and
              receive clear guidance on what you should secure.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ComingSoonFeature
            icon={Search}
            title="Breach search"
            description="Check an email against known breach data."
          />

          <ComingSoonFeature
            icon={ShieldAlert}
            title="Exposure details"
            description="See which information may have been exposed."
          />

          <ComingSoonFeature
            icon={Bell}
            title="Breach alerts"
            description="Get notified about newly discovered exposure."
          />

          <ComingSoonFeature
            icon={LockKeyhole}
            title="Security guidance"
            description="Know what action to take after a breach."
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="mx-auto mt-6 flex max-w-lg items-start gap-3 rounded-xl border bg-muted/20 p-4 text-left">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

        <p className="text-xs leading-5 text-muted-foreground">
          We&apos;re taking additional time to make sure account breach
          monitoring fits Cryptica&apos;s privacy-first approach before making
          it available.
        </p>
      </div>

      <div className="mt-7">
        <Button
          variant="outline"
          disabled
        >
          <Mail className="size-4" />

          Email search coming soon
        </Button>
      </div>
    </div>
  </section>
</TabsContent>
      </Tabs>
    </main>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value:
    string | number
}) {
  return (
    <div className="rounded-lg border bg-background/50 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  )
}

function ErrorBox({
  children,
}: {
  children:
    React.ReactNode
}) {
  return (
    <div className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />

      <div>
        {children}
      </div>
    </div>
  )
}

function ResultBox({
  icon:
    Icon,

  title,

  children,

  danger = false,
}: {
  icon:
    typeof Shield

  title:
    string

  children:
    React.ReactNode

  danger?:
    boolean
}) {
  return (
    <div
      className={
        danger
          ? "rounded-xl border border-destructive/20 bg-destructive/5 p-5"
          : "rounded-xl border border-primary/20 bg-primary/5 p-5"
      }
    >
      <div className="flex items-start gap-3">
        <div
          className={
            danger
              ? "flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10"
              : "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"
          }
        >
          <Icon
            className={
              danger
                ? "size-4 text-destructive"
                : "size-4 text-primary"
            }
          />
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}

function BreachCard({
  breach,
}: {
  breach:
    Breach
}) {
  return (
    <article className="overflow-hidden rounded-xl border bg-background/40">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
            <Building2 className="size-5 text-destructive" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">
                {breach.title}
              </h3>

              {breach.verified && (
                <span className="rounded-full border bg-primary/5 px-2 py-0.5 text-[11px] text-primary">
                  Verified
                </span>
              )}

              {breach.malware && (
                <span className="rounded-full border border-destructive/20 bg-destructive/5 px-2 py-0.5 text-[11px] text-destructive">
                  Malware
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {breach.domain ||
                "Unknown domain"}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
          <p>
            Breached{" "}
            {new Date(
              `${breach.breachDate}T00:00:00`,
            ).toLocaleDateString()}
          </p>

          <p className="mt-1">
            {breach.affectedAccounts.toLocaleString()} accounts
          </p>
        </div>
      </div>

      <div className="border-t p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Exposed data
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {breach.dataClasses.map(
            (
              item,
            ) => (
              <span
                key={
                  item
                }
                className="rounded-full border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ),
          )}
        </div>

        {breach.domain && (
          <a
            href={`https://${breach.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            {breach.domain}

            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </article>
  )
}