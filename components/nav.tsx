"use client"

import type { ComponentType } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  DocumentText20Regular,
  History20Regular,
  Home20Regular,
  Info20Regular,
  List20Regular,
  LockClosed20Regular,
  Mail20Regular,
  Password20Regular,
  Person20Regular,
  Settings20Regular,
  Shield20Regular,
  ShieldLock20Regular,
  Sim20Regular,
  SignOut20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"

import {
  ChevronRight,
  CreditCard,
  Github,
  LayoutDashboard,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
  Download,
  MonitorSmartphone
} from "lucide-react"

import { useTranslations } from "next-intl"

import { useAuthContext } from "@/components/auth-provider"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

type NavigationItem = {
  label: string
  href: string
  icon: ComponentType<{
    className?: string
  }>
  exact?: boolean
  badge?: string
}

function isRouteActive(
  pathname: string,
  href: string,
  exact = false,
) {
  if (exact || href === "/") {
    return pathname === href
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  )
}

export function AppSidebar() {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()

  const {
    loading,
    authenticated,
    user,
    logout,
  } = useAuthContext()

  const isAuthenticated =
    !loading && authenticated

  const isAdmin =
    isAuthenticated &&
    (
      user?.role === "ADMIN" ||
      user?.role === "OWNER"
    )

  async function handleSignOut() {
    await logout()

    router.push("/")
    router.refresh()
  }

  const publicTools: NavigationItem[] = [
    {
      label: t("generate"),
      href: "/generate",
      icon: LockClosed20Regular,
      badge: "Free",
    },
    {
      label: t("strength"),
      href: "/strength",
      icon: Shield20Regular,
    },
    {
      label: t("encryption"),
      href: "/encryption",
      icon: Translate20Regular,
    },
  ]

  const accountTools: NavigationItem[] = [
    {
      label: t("vault"),
      href: "/vault",
      icon: Password20Regular,
    },
    {
      label: t("activity"),
      href: "/activity",
      icon: History20Regular,
    },
    {
      label: t("presets"),
      href: "/presets",
      icon: List20Regular,
    },
    {
      label: t("breaches"),
      href: "/breaches",
      icon: ShieldLock20Regular,
    },
    {
      label: t("devices"),
      href: "/devices",
      icon: MonitorSmartphone,
    },
    {
      label: t("downloads"),
      href: "/downloads",
      icon: Download,
    },
  ]

  const adminTools: NavigationItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Subscriptions",
      href: "/admin/subscriptions",
      icon: CreditCard,
    },
  ]

  const companyLinks: NavigationItem[] = [
    {
      label: t("team"),
      href: "/team",
      icon: Users,
    },
    {
      label: t("contact-us"),
      href: "/contact",
      icon: Mail20Regular,
    },
    {
      label: t("documentation"),
      href: "/docs",
      icon: Info20Regular,
    },
    {
      label: t("pricing"),
      href: "/pricing",
      icon: CreditCard,
    },
  ]

  const legalLinks: NavigationItem[] = [
    {
      label: t("terms-of-service"),
      href: "/terms",
      icon: DocumentText20Regular,
    },
    {
      label: t("privacy-policy"),
      href: "/privacy",
      icon: ShieldLock20Regular,
    },
  ]

  const renderNavigationItem = (
    item: NavigationItem,
  ) => {
    const Icon = item.icon

    const active = isRouteActive(
      pathname,
      item.href,
      item.exact,
    )

    return (
      <SidebarMenuItem
        key={item.href}
      >
        <SidebarMenuButton
          asChild
          isActive={active}
          tooltip={item.label}
          className="
            group/menu-item
            h-10 rounded-xl px-3
            text-sidebar-foreground/75
            transition-all duration-200

            hover:bg-sidebar-accent
            hover:text-sidebar-accent-foreground

            data-[active=true]:bg-primary/10
            data-[active=true]:font-semibold
            data-[active=true]:text-primary

            group-data-[collapsible=icon]:mx-auto
            group-data-[collapsible=icon]:size-10
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:p-0
          "
        >
          <Link href={item.href}>
            <span
              className="
                flex size-7 shrink-0
                items-center justify-center
                rounded-lg
                transition-colors

                group-data-[active=true]/menu-item:bg-primary/10

                group-data-[collapsible=icon]:size-8
                group-data-[collapsible=icon]:rounded-lg
              "
            >
              <Icon className="size-[18px]" />
            </span>

            <span
              className="
                min-w-0 flex-1 truncate
                group-data-[collapsible=icon]:hidden
              "
            >
              {item.label}
            </span>

            {item.badge && (
              <span
                className="
                  rounded-full
                  border border-primary/15
                  bg-primary/10
                  px-2 py-0.5
                  text-[10px] font-bold
                  uppercase tracking-wide
                  text-primary

                  group-data-[collapsible=icon]:hidden
                "
              >
                {item.badge}
              </span>
            )}

            <ChevronRight
              className="
                size-3.5
                -translate-x-1
                text-muted-foreground/50
                opacity-0
                transition-all duration-200

                group-hover/menu-item:translate-x-0
                group-hover/menu-item:opacity-100

                group-data-[collapsible=icon]:hidden
              "
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="
        border-r
        border-sidebar-border/70
        bg-sidebar/95
        backdrop-blur-xl
        transition-[width]
        duration-200
      "
    >
      {/* ================================================================ */}
      {/* Brand                                                            */}
      {/* ================================================================ */}

      <SidebarHeader
        className="
          p-3
          group-data-[collapsible=icon]:p-2
        "
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              isActive={pathname === "/"}
              tooltip={t("home")}
              className="
                group/brand
                h-14 rounded-2xl px-2

                hover:bg-sidebar-accent/70
                data-[active=true]:bg-sidebar-accent/70

                group-data-[collapsible=icon]:size-12
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:rounded-xl
                group-data-[collapsible=icon]:p-0
              "
            >
              <Link href="/">
                <div
                  className="
                    relative
                    flex size-10 shrink-0
                    items-center justify-center
                    overflow-hidden rounded-xl
                    border border-primary/15
                    bg-primary/10
                    shadow-sm

                    group-data-[collapsible=icon]:size-9
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-linear-to-br
                      from-primary/15
                      to-transparent
                    "
                  />

                  <Image
                    src="/logo.png"
                    alt="Cryptica"
                    width={34}
                    height={34}
                    priority
                    className="
                      relative
                      size-[34px]
                      object-contain
                    "
                  />
                </div>

                <div
                  className="
                    grid min-w-0 flex-1
                    text-left leading-tight

                    group-data-[collapsible=icon]:hidden
                  "
                >
                  <span
                    className="
                      truncate
                      text-[15px] font-bold
                      tracking-tight
                    "
                  >
                    {t("title")}
                  </span>

                  <span
                    className="
                      truncate
                      text-[11px]
                      text-muted-foreground
                    "
                  >
                    Password security toolkit
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator
        className="
          mx-3 w-auto
          opacity-60

          group-data-[collapsible=icon]:mx-2
        "
      />

      {/* ================================================================ */}
      {/* Navigation                                                       */}
      {/* ================================================================ */}

      <SidebarContent
        className="
          scrollbar-hide
          px-2 py-2

          group-data-[collapsible=icon]:px-1.5
        "
      >
        {/* Home */}

        <SidebarGroup
          className="
            px-1 py-2

            group-data-[collapsible=icon]:px-0
            group-data-[collapsible=icon]:py-1.5
          "
        >
          <SidebarGroupLabel
            className="
              mb-1 px-3
              text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted-foreground/65

              group-data-[collapsible=icon]:hidden
            "
          >
            {t("home")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavigationItem({
                label: t("home"),
                href: "/",
                icon: Home20Regular,
                exact: true,
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Public tools */}

        <SidebarGroup
          className="
            px-1 py-2

            group-data-[collapsible=icon]:px-0
            group-data-[collapsible=icon]:py-1.5
          "
        >
          <SidebarGroupLabel
            className="
              mb-1 px-3
              text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted-foreground/65

              group-data-[collapsible=icon]:hidden
            "
          >
            {t("tools")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {publicTools.map(
                renderNavigationItem,
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ============================================================ */}
        {/* Account tools                                                */}
        {/* ============================================================ */}

        {loading ? (
          <SidebarGroup
            className="
              px-1 py-2

              group-data-[collapsible=icon]:px-0
              group-data-[collapsible=icon]:py-1.5
            "
          >
            <div
              className="
                mx-1 h-28
                animate-pulse
                rounded-2xl
                border border-sidebar-border/50
                bg-sidebar-accent/25

                group-data-[collapsible=icon]:mx-auto
                group-data-[collapsible=icon]:size-10
              "
            />
          </SidebarGroup>
        ) : isAuthenticated ? (
          <SidebarGroup
            className="
              px-1 py-2

              group-data-[collapsible=icon]:px-0
              group-data-[collapsible=icon]:py-1.5
            "
          >
            <div
              className="
                mb-1
                flex items-center justify-between
                px-3

                group-data-[collapsible=icon]:hidden
              "
            >
              <SidebarGroupLabel
                className="
                  h-auto p-0
                  text-[10px] font-bold
                  uppercase tracking-[0.14em]
                  text-muted-foreground/65
                "
              >
                Your Cryptica
              </SidebarGroupLabel>

              <span
                className="
                  rounded-full
                  bg-primary/10
                  px-1.5 py-0.5
                  text-[9px] font-bold
                  uppercase tracking-wide
                  text-primary
                "
              >
                Account
              </span>
            </div>

            <SidebarGroupContent>
              <SidebarMenu>
                {accountTools.map(
                  renderNavigationItem,
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup
            className="
              px-1 py-2

              group-data-[collapsible=icon]:px-0
              group-data-[collapsible=icon]:py-1.5
            "
          >
            <>
              <div
                className="
                  mx-1
                  overflow-hidden
                  rounded-2xl
                  border border-primary/15
                  bg-linear-to-br
                  from-primary/[0.09]
                  via-primary/[0.04]
                  to-transparent
                  p-3

                  group-data-[collapsible=icon]:hidden
                "
              >
                <div
                  className="
                    mb-3
                    flex size-9
                    items-center justify-center
                    rounded-xl
                    border border-primary/15
                    bg-primary/10
                    text-primary
                  "
                >
                  <Sparkles className="size-4" />
                </div>

                <p className="text-sm font-semibold">
                  Unlock your Cryptica
                </p>

                <p
                  className="
                    mt-1
                    text-xs leading-5
                    text-muted-foreground
                  "
                >
                  Sign in for your vault,
                  saved presets, activity
                  history and account
                  security tools.
                </p>

                <Link
                  href="/login"
                  className="
                    mt-3
                    flex h-9
                    items-center justify-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-3
                    text-xs font-semibold
                    text-primary-foreground
                    shadow-sm
                    transition
                    hover:opacity-90
                  "
                >
                  <Sim20Regular className="size-4" />

                  Sign in
                </Link>
              </div>

              <SidebarMenu
                className="
                  hidden
                  group-data-[collapsible=icon]:flex
                "
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Sign in to unlock account tools"
                    isActive={isRouteActive(
                      pathname,
                      "/login",
                    )}
                    className="
                      mx-auto
                      size-10
                      justify-center
                      rounded-xl
                      border border-primary/15
                      bg-primary/8
                      p-0
                      text-primary

                      hover:bg-primary/15
                      hover:text-primary

                      data-[active=true]:bg-primary/15
                    "
                  >
                    <Link href="/login">
                      <Sim20Regular className="size-[18px]" />

                      <span className="sr-only">
                        Sign in
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
          </SidebarGroup>
        )}

        {/* ============================================================ */}
        {/* Administration                                              */}
        {/* ============================================================ */}

        {isAdmin && (
          <>
            <SidebarSeparator
              className="
                mx-3 my-1
                w-auto
                opacity-50

                group-data-[collapsible=icon]:mx-2
              "
            />

            <SidebarGroup
              className="
                px-1 py-2

                group-data-[collapsible=icon]:px-0
                group-data-[collapsible=icon]:py-1.5
              "
            >
              <div
                className="
                  mb-1
                  flex items-center justify-between
                  px-3

                  group-data-[collapsible=icon]:hidden
                "
              >
                <SidebarGroupLabel
                  className="
                    h-auto p-0
                    text-[10px] font-bold
                    uppercase tracking-[0.14em]
                    text-muted-foreground/65
                  "
                >
                  Administration
                </SidebarGroupLabel>

                <span
                  className="
                    inline-flex
                    items-center gap-1
                    rounded-full
                    border border-primary/15
                    bg-primary/10
                    px-1.5 py-0.5
                    text-[9px] font-bold
                    uppercase tracking-wide
                    text-primary
                  "
                >
                  <ShieldCheck className="size-2.5" />

                  {user?.role === "OWNER"
                    ? "Owner"
                    : "Admin"}
                </span>
              </div>

              <SidebarGroupContent>
                <SidebarMenu>
                  {adminTools.map(
                    renderNavigationItem,
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* ============================================================ */}
        {/* Company                                                     */}
        {/* ============================================================ */}

        <SidebarGroup
          className="
            px-1 py-2

            group-data-[collapsible=icon]:px-0
            group-data-[collapsible=icon]:py-1.5
          "
        >
          <SidebarGroupLabel
            className="
              mb-1 px-3
              text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted-foreground/65

              group-data-[collapsible=icon]:hidden
            "
          >
            {t("other")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {companyLinks.map(
                renderNavigationItem,
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ============================================================ */}
        {/* Socials                                                     */}
        {/* ============================================================ */}

        <SidebarGroup
          className="
            px-1 py-2

            group-data-[collapsible=icon]:px-0
            group-data-[collapsible=icon]:py-1.5
          "
        >
          <SidebarGroupLabel
            className="
              mb-1 px-3
              text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted-foreground/65

              group-data-[collapsible=icon]:hidden
            "
          >
            {t("socials")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={t("twitter")}
                  className="
                    group/social-item
                    h-10 rounded-xl px-3
                    text-sidebar-foreground/70

                    hover:bg-sidebar-accent
                    hover:text-sidebar-accent-foreground

                    group-data-[collapsible=icon]:mx-auto
                    group-data-[collapsible=icon]:size-10
                    group-data-[collapsible=icon]:justify-center
                    group-data-[collapsible=icon]:p-0
                  "
                >
                  <a
                    href="https://twitter.com/CrypticaApp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="
                        flex size-7 shrink-0
                        items-center justify-center
                        rounded-lg

                        group-data-[collapsible=icon]:size-8
                      "
                    >
                      <Twitter className="size-[17px]" />
                    </span>

                    <span className="group-data-[collapsible=icon]:hidden">
                      {t("twitter")}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={t("github")}
                  className="
                    group/social-item
                    h-10 rounded-xl px-3
                    text-sidebar-foreground/70

                    hover:bg-sidebar-accent
                    hover:text-sidebar-accent-foreground

                    group-data-[collapsible=icon]:mx-auto
                    group-data-[collapsible=icon]:size-10
                    group-data-[collapsible=icon]:justify-center
                    group-data-[collapsible=icon]:p-0
                  "
                >
                  <a
                    href="https://github.com/CrypticaOSS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="
                        flex size-7 shrink-0
                        items-center justify-center
                        rounded-lg

                        group-data-[collapsible=icon]:size-8
                      "
                    >
                      <Github className="size-[17px]" />
                    </span>

                    <span className="group-data-[collapsible=icon]:hidden">
                      {t("github")}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={t("discord")}
                  className="
                    group/social-item
                    h-10 rounded-xl px-3
                    text-sidebar-foreground/70

                    hover:bg-sidebar-accent
                    hover:text-sidebar-accent-foreground

                    group-data-[collapsible=icon]:mx-auto
                    group-data-[collapsible=icon]:size-10
                    group-data-[collapsible=icon]:justify-center
                    group-data-[collapsible=icon]:p-0
                  "
                >
                  <a
                    href="https://discord.gg/n5VBFAVpAe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="
                        flex size-7 shrink-0
                        items-center justify-center
                        rounded-lg

                        group-data-[collapsible=icon]:size-8
                      "
                    >
                      <MessageCircle className="size-[17px]" />
                    </span>

                    <span className="group-data-[collapsible=icon]:hidden">
                      {t("discord")}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ============================================================ */}
        {/* Legal                                                       */}
        {/* ============================================================ */}

        <SidebarGroup
          className="
            px-1 py-2

            group-data-[collapsible=icon]:px-0
            group-data-[collapsible=icon]:py-1.5
          "
        >
          <SidebarGroupLabel
            className="
              mb-1 px-3
              text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted-foreground/65

              group-data-[collapsible=icon]:hidden
            "
          >
            Legal
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {legalLinks.map(
                renderNavigationItem,
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ================================================================ */}
      {/* Footer / account                                                 */}
      {/* ================================================================ */}

      <SidebarSeparator
        className="
          mx-3 w-auto
          opacity-60

          group-data-[collapsible=icon]:mx-2
        "
      />

      <SidebarFooter
        className="
          p-3

          group-data-[collapsible=icon]:p-2
        "
      >
        {loading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                className="
                  h-12
                  animate-pulse
                  rounded-xl
                  bg-sidebar-accent/40

                  group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:size-11
                "
              />
            </SidebarMenuItem>
          </SidebarMenu>
        ) : isAuthenticated ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={isRouteActive(
                  pathname,
                  "/account",
                )}
                tooltip={
                  user?.name ??
                  user?.email ??
                  "Account"
                }
                className="
                  h-14 rounded-2xl px-2

                  hover:bg-sidebar-accent/70

                  data-[active=true]:bg-sidebar-accent/70

                  group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:size-11
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:rounded-xl
                  group-data-[collapsible=icon]:p-0
                "
              >
                <Link href="/account">
                  <div
                    className="
                      flex size-9 shrink-0
                      items-center justify-center
                      overflow-hidden
                      rounded-xl
                      border border-sidebar-border
                      bg-secondary
                    "
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={
                          user.name ??
                          "Account"
                        }
                        width={36}
                        height={36}
                        className="
                          size-full
                          object-cover
                        "
                      />
                    ) : (
                      <Person20Regular
                        className="
                          size-5
                          text-muted-foreground
                        "
                      />
                    )}
                  </div>

                  <div
                    className="
                      grid min-w-0 flex-1
                      text-left leading-tight

                      group-data-[collapsible=icon]:hidden
                    "
                  >
                    <div
                      className="
                        flex min-w-0
                        items-center gap-2
                      "
                    >
                      <span
                        className="
                          min-w-0 truncate
                          text-sm font-semibold
                        "
                      >
                        {user?.name ??
                          "Your account"}
                      </span>

                      {isAdmin && (
                        <ShieldCheck
                          className="
                            size-3.5 shrink-0
                            text-primary
                          "
                        />
                      )}
                    </div>

                    <span
                      className="
                        truncate
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      {user?.email ??
                        "Manage account"}
                    </span>
                  </div>

                  <Settings20Regular
                    className="
                      size-4
                      text-muted-foreground

                      group-data-[collapsible=icon]:hidden
                    "
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() =>
                  void handleSignOut()
                }
                tooltip="Sign out"
                className="
                  h-9 rounded-xl px-3
                  text-muted-foreground

                  hover:bg-destructive/10
                  hover:text-destructive

                  group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:size-10
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:p-0
                "
              >
                <SignOut20Regular className="size-4" />

                <span
                  className="
                    group-data-[collapsible=icon]:hidden
                  "
                >
                  Sign out
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={isRouteActive(
                  pathname,
                  "/login",
                )}
                tooltip="Sign in"
                className="
                  h-12 rounded-xl
                  border border-sidebar-border/70
                  bg-sidebar-accent/40
                  px-3

                  hover:bg-sidebar-accent

                  group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:size-11
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:p-0
                "
              >
                <Link href="/login">
                  <div
                    className="
                      flex size-8
                      items-center justify-center
                      rounded-lg
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Sim20Regular className="size-[18px]" />
                  </div>

                  <div
                    className="
                      grid min-w-0 flex-1
                      text-left leading-tight

                      group-data-[collapsible=icon]:hidden
                    "
                  >
                    <span
                      className="
                        truncate
                        text-sm font-semibold
                      "
                    >
                      Sign in
                    </span>

                    <span
                      className="
                        truncate
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      Sync your Cryptica
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}