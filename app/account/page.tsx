"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  MailCheck,
  MailWarning,
  MonitorSmartphone,
  RectangleEllipsis,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
  Vault,
} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useAuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
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
import { Separator } from "@/components/ui/separator"

export default function AccountPage() {
  const router = useRouter()

  const {
    loading,
    authenticated,
    user,
    session,
    logout,
    refresh,
  } = useAuthContext()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const [
    verificationDialogOpen,
    setVerificationDialogOpen,
  ] = useState(false)

  const [
    resendingVerification,
    setResendingVerification,
  ] = useState(false)

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace(
        "/login?callbackUrl=/account",
      )
    }
  }, [
    loading,
    authenticated,
    router,
  ])

  useEffect(() => {
    if (!user) return

    setName(user.name ?? "")
    setEmail(user.email ?? "")
  }, [user])

  async function handleSaveProfile() {
    if (!name.trim()) {
      toast.error("Enter your name")
      return
    }

    if (!email.trim()) {
      toast.error(
        "Enter your email address",
      )
      return
    }

    try {
      setSaving(true)

      // Mock-only for now.
      //
      // Replace with:
      // PATCH /api/auth/account
      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      )

      toast.success(
        "Profile updated",
      )

      await refresh()
    } catch {
      toast.error(
        "Unable to update your profile",
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleResendVerification() {
    try {
      setResendingVerification(true)

      const response = await fetch(
        "/api/auth/resend-verification",
        {
          method: "POST",
          credentials: "include",
        },
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to resend verification email.",
        )
      }

      toast.success(
        "Verification email sent",
        {
          description:
            "Check your inbox and follow the verification link.",
        },
      )

      setVerificationDialogOpen(false)

      await refresh()
    } catch (error) {
      toast.error(
        "Unable to resend verification email",
        {
          description:
            error instanceof Error
              ? error.message
              : undefined,
        },
      )
    } finally {
      setResendingVerification(false)
    }
  }

  async function handleSignOut() {
    try {
      setSigningOut(true)

      await logout()

      toast.success("Signed out")

      router.push("/")
      router.refresh()
    } catch {
      toast.error(
        "Unable to sign out",
      )
    } finally {
      setSigningOut(false)
    }
  }

  if (
    loading ||
    !authenticated ||
    !user
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading your account…
        </div>
      </div>
    )
  }

  const expiresAt =
    session?.expiresAt
      ? new Date(
          session.expiresAt,
        )
      : null

  const emailVerified =
    Boolean(
      user.emailVerifiedAt,
    )

  const isAdmin =
    user.role === "ADMIN" ||
    user.role === "OWNER"

  return (
    <>
      <div className="mx-auto w-full max-w-6xl py-4 sm:py-8">
        <section
          className="
            relative overflow-hidden rounded-3xl
            border border-border/70
            bg-card/45
            p-6
            shadow-sm
            backdrop-blur-xl
            sm:p-8 lg:p-10
          "
        >
          <div
            className="
              pointer-events-none absolute -right-40 -top-40
              size-96 rounded-full
              bg-primary/[0.08]
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute inset-x-0 top-0 h-px
              bg-linear-to-r
              from-transparent
              via-primary/30
              to-transparent
            "
          />

          <div className="relative">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <div
                  className="
                    mb-4 inline-flex items-center gap-2
                    rounded-full
                    border border-primary/15
                    bg-primary/[0.07]
                    px-3 py-1.5
                    text-xs font-semibold
                    text-primary
                  "
                >
                  <ShieldCheck className="size-3.5" />
                  Your Cryptica account
                </div>

                <h1
                  className="
                    text-3xl font-extrabold
                    tracking-[-0.035em]
                    sm:text-4xl
                  "
                >
                  Account settings
                </h1>

                <p
                  className="
                    mt-3 max-w-xl
                    text-sm leading-6
                    text-muted-foreground
                    sm:text-base sm:leading-7
                  "
                >
                  Manage your Cryptica
                  profile, security
                  preferences and active
                  account session.
                </p>
              </div>

              <div
                className="
                  flex items-center gap-3
                  rounded-2xl
                  border border-border/70
                  bg-background/40
                  p-3
                "
              >
                <div
                  className="
                    flex size-11 shrink-0 items-center justify-center
                    rounded-xl
                    border border-primary/15
                    bg-primary/10
                    text-primary
                  "
                >
                  <UserRound className="size-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">
                      {user.name ||
                        "Cryptica user"}
                    </p>

                    {emailVerified && (
                      <BadgeCheck className="size-4 shrink-0 text-primary" />
                    )}
                  </div>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Email verification warning */}

            {!emailVerified && (
              <div
                className="
                  mt-8
                  flex flex-col gap-4
                  rounded-2xl
                  border border-amber-500/20
                  bg-amber-500/[0.06]
                  p-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex gap-3">
                  <div
                    className="
                      flex size-10 shrink-0 items-center justify-center
                      rounded-xl
                      bg-amber-500/10
                      text-amber-500
                    "
                  >
                    <MailWarning className="size-[18px]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Verify your email
                      address
                    </p>

                    <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                      Your Cryptica
                      account has not yet
                      been verified. Check
                      your inbox for the
                      verification link or
                      request a new one.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setVerificationDialogOpen(
                      true,
                    )
                  }
                  className="
                    shrink-0
                    rounded-xl
                    border-amber-500/25
                    bg-background/40
                    hover:bg-amber-500/10
                  "
                >
                  <RefreshCw className="mr-2 size-4" />
                  Resend link
                </Button>
              </div>
            )}

            {/* Main grid */}

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="space-y-6">
                {/* Email status */}

                <AccountCard
                  icon={
                    emailVerified
                      ? MailCheck
                      : MailWarning
                  }
                  title="Email verification"
                  description="Verification protects your account and confirms that you control the registered email address."
                >
                  <div
                    className={`
                      flex flex-col gap-4
                      rounded-2xl
                      border p-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      ${
                        emailVerified
                          ? "border-primary/15 bg-primary/[0.04]"
                          : "border-amber-500/20 bg-amber-500/[0.04]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          flex size-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          ${
                            emailVerified
                              ? "bg-primary/10 text-primary"
                              : "bg-amber-500/10 text-amber-500"
                          }
                        `}
                      >
                        {emailVerified ? (
                          <CheckCircle2 className="size-[18px]" />
                        ) : (
                          <AlertTriangle className="size-[18px]" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {emailVerified
                            ? "Email verified"
                            : "Email not verified"}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {emailVerified ? (
                      <span
                        className="
                          inline-flex w-fit items-center gap-1.5
                          rounded-full
                          border border-primary/15
                          bg-primary/10
                          px-2.5 py-1
                          text-[10px] font-bold
                          uppercase tracking-wide
                          text-primary
                        "
                      >
                        <BadgeCheck className="size-3" />
                        Verified
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() =>
                          setVerificationDialogOpen(
                            true,
                          )
                        }
                        className="rounded-xl"
                      >
                        <Mail className="mr-2 size-4" />
                        Verify email
                      </Button>
                    )}
                  </div>

                  {isAdmin &&
                    emailVerified && (
                      <div
                        className="
                          mt-4 flex items-start gap-3
                          rounded-xl
                          border border-primary/15
                          bg-primary/[0.04]
                          p-3
                        "
                      >
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

                        <p className="text-xs leading-5 text-muted-foreground">
                          This verified
                          account has{" "}
                          <span className="font-semibold text-foreground">
                            {user.role}
                          </span>{" "}
                          privileges.
                        </p>
                      </div>
                    )}
                </AccountCard>

                {/* Profile */}

                <AccountCard
                  icon={UserRound}
                  title="Profile"
                  description="The basic information attached to your Cryptica account."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Display name
                      </Label>

                      <Input
                        id="name"
                        value={name}
                        onChange={(
                          event,
                        ) =>
                          setName(
                            event.target
                              .value,
                          )
                        }
                        placeholder="Your name"
                        className="h-11 rounded-xl bg-background/65"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email address
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(
                          event,
                        ) =>
                          setEmail(
                            event.target
                              .value,
                          )
                        }
                        placeholder="you@example.com"
                        className="h-11 rounded-xl bg-background/65"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button
                      onClick={
                        handleSaveProfile
                      }
                      disabled={saving}
                      className="rounded-xl"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 size-4" />
                          Save changes
                        </>
                      )}
                    </Button>
                  </div>
                </AccountCard>

                {/* Security */}

                <AccountCard
                  icon={LockKeyhole}
                  title="Security"
                  description="Manage the credentials and protections used for your account."
                >
                  <div className="divide-y divide-border/60">
                    <AccountAction
                      icon={
                        RectangleEllipsis
                      }
                      title="Password"
                      description="Change the password used to access your Cryptica account."
                      action="Change password"
                      href="/account/password"
                    />

                    <AccountAction
                      icon={
                        ShieldCheck
                      }
                      title="Two-factor authentication"
                      description="Add another layer of protection to your Cryptica account."
                      action="Set up"
                      href="/account/security"
                    />

                    <AccountAction
                      icon={KeyRound}
                      title="Recovery options"
                      description="Configure account recovery methods before you need them."
                      action="Manage"
                      href="/account/security"
                    />
                  </div>
                </AccountCard>

                {/* Session */}

                <AccountCard
                  icon={
                    MonitorSmartphone
                  }
                  title="Current session"
                  description="Information about the Cryptica session currently active in this browser."
                >
                  <div
                    className="
                      grid gap-4 rounded-2xl
                      border border-border/70
                      bg-background/35
                      p-4
                      sm:grid-cols-2
                    "
                  >
                    <SessionDetail
                      icon={
                        CheckCircle2
                      }
                      label="Status"
                      value="Active"
                    />

                    <SessionDetail
                      icon={Mail}
                      label="Signed in as"
                      value={user.email}
                    />

                    <SessionDetail
                      icon={Clock3}
                      label="Expires"
                      value={
                        expiresAt
                          ? expiresAt.toLocaleString(
                              "en-GB",
                              {
                                dateStyle:
                                  "medium",
                                timeStyle:
                                  "short",
                              },
                            )
                          : "Unknown"
                      }
                    />

                    <SessionDetail
                      icon={
                        emailVerified
                          ? MailCheck
                          : MailWarning
                      }
                      label="Email"
                      value={
                        emailVerified
                          ? "Verified"
                          : "Not verified"
                      }
                    />

                    <SessionDetail
                      icon={
                        ShieldCheck
                      }
                      label="Account role"
                      value={
                        user.role ??
                        "USER"
                      }
                    />

                    <SessionDetail
                      icon={
                        ShieldCheck
                      }
                      label="Session type"
                      value="Secure HTTP-only cookie"
                    />
                  </div>
                </AccountCard>

                {/* Danger zone */}

                <div
                  className="
                    overflow-hidden rounded-2xl
                    border border-destructive/20
                    bg-destructive/[0.025]
                  "
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex gap-3">
                      <div
                        className="
                          flex size-10 shrink-0 items-center justify-center
                          rounded-xl
                          bg-destructive/10
                          text-destructive
                        "
                      >
                        <AlertTriangle className="size-[18px]" />
                      </div>

                      <div>
                        <h2 className="font-bold">
                          Danger zone
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          These actions
                          affect access to
                          your Cryptica
                          account.
                        </p>
                      </div>
                    </div>

                    <Separator className="my-5" />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Sign out of
                          Cryptica
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          End the current
                          session on this
                          device.
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        onClick={
                          handleSignOut
                        }
                        disabled={
                          signingOut
                        }
                        className="
                          rounded-xl
                          border-destructive/25
                          text-destructive
                          hover:bg-destructive/10
                          hover:text-destructive
                        "
                      >
                        {signingOut ? (
                          <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                          <LogOut className="mr-2 size-4" />
                        )}

                        Sign out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right rail */}

              <aside className="space-y-4">
                <div
                  className="
                    overflow-hidden rounded-2xl
                    border border-primary/15
                    bg-linear-to-br
                    from-primary/[0.09]
                    via-primary/[0.04]
                    to-transparent
                    p-5
                  "
                >
                  <div
                    className="
                      mb-4 flex size-10 items-center justify-center
                      rounded-xl
                      border border-primary/15
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Sparkles className="size-[18px]" />
                  </div>

                  <p className="font-bold">
                    Account security
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Keep your email
                    verified and review
                    your security settings
                    regularly to protect
                    your Cryptica account.
                  </p>

                  <div
                    className="
                      mt-4 inline-flex items-center gap-2
                      rounded-full
                      border border-primary/15
                      bg-background/40
                      px-2.5 py-1
                      text-[10px] font-bold
                      uppercase tracking-[0.08em]
                      text-primary
                    "
                  >
                    <span
                      className={`
                        size-1.5 rounded-full
                        ${
                          emailVerified
                            ? "bg-primary"
                            : "bg-amber-500"
                        }
                      `}
                    />

                    {emailVerified
                      ? "Email verified"
                      : "Verification required"}
                  </div>
                </div>

                <QuickLink
                  href="/vault"
                  icon={Vault}
                  title="Password vault"
                  description="Open your encrypted vault."
                />

                <QuickLink
                  href="/activity"
                  icon={Clock3}
                  title="Account activity"
                  description="Review recent security events."
                />

                <QuickLink
                  href="/presets"
                  icon={KeyRound}
                  title="Generator presets"
                  description="Manage your saved password rules."
                />
              </aside>
            </div>
          </div>
        </section>
      </div>

      {/* Verification popup */}

      <Dialog
        open={
          verificationDialogOpen
        }
        onOpenChange={
          setVerificationDialogOpen
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div
              className="
                mb-2 flex size-11 items-center justify-center
                rounded-xl
                border border-primary/15
                bg-primary/10
                text-primary
              "
            >
              <Mail className="size-5" />
            </div>

            <DialogTitle>
              Resend verification email?
            </DialogTitle>

            <DialogDescription className="leading-6">
              We&apos;ll send a new
              verification link to{" "}
              <span className="font-medium text-foreground">
                {user.email}
              </span>
              . Any previous unused
              verification links may be
              replaced.
            </DialogDescription>
          </DialogHeader>

          <div
            className="
              rounded-xl
              border border-border/70
              bg-muted/30
              p-3
            "
          >
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

              <p className="text-xs leading-5 text-muted-foreground">
                The new verification
                link will expire after
                30 minutes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setVerificationDialogOpen(
                  false,
                )
              }
              disabled={
                resendingVerification
              }
            >
              Cancel
            </Button>

            <Button
              onClick={() =>
                void handleResendVerification()
              }
              disabled={
                resendingVerification
              }
            >
              {resendingVerification ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Mail className="mr-2 size-4" />
                  Send verification email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function AccountCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{
    className?: string
  }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section
      className="
        rounded-2xl
        border border-border/70
        bg-card/55
        p-5
        backdrop-blur-xl
        sm:p-6
      "
    >
      <div className="mb-6 flex gap-3">
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
          <h2 className="font-bold">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

function AccountAction({
  icon: Icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ComponentType<{
    className?: string
  }>
  title: string
  description: string
  action: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="
        group flex items-center gap-4
        py-4 first:pt-0 last:pb-0
      "
    >
      <div
        className="
          flex size-9 shrink-0 items-center justify-center
          rounded-xl
          bg-secondary
          text-muted-foreground
          transition-colors
          group-hover:bg-primary/10
          group-hover:text-primary
        "
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <div
        className="
          hidden items-center gap-1
          text-xs font-semibold
          text-primary
          sm:flex
        "
      >
        {action}

        <ArrowRight
          className="
            size-3.5
            transition-transform
            group-hover:translate-x-0.5
          "
        />
      </div>
    </Link>
  )
}

function SessionDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{
    className?: string
  }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <div
        className="
          mt-0.5 flex size-8 shrink-0 items-center justify-center
          rounded-lg
          bg-primary/10
          text-primary
        "
      >
        <Icon className="size-3.5" />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[10px] font-bold
            uppercase tracking-[0.08em]
            text-muted-foreground
          "
        >
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{
    className?: string
  }>
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="
        group flex items-center gap-3
        rounded-2xl
        border border-border/70
        bg-card/45
        p-4
        transition-all duration-200
        hover:border-primary/20
        hover:bg-card/70
      "
    >
      <div
        className="
          flex size-9 shrink-0 items-center justify-center
          rounded-xl
          bg-primary/10
          text-primary
        "
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <ArrowRight
        className="
          size-4 text-muted-foreground/50
          transition-all
          group-hover:translate-x-0.5
          group-hover:text-primary
        "
      />
    </Link>
  )
}