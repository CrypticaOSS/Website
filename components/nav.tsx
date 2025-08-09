"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DocumentText20Regular,
  History20Regular,
  Info20Regular,
  List20Regular,
  LockClosed20Regular,
  Mail20Regular,
  Password20Regular,
  Settings20Regular,
  Shield20Regular,
  ShieldLock20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
import { Twitter, Github, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

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
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
  const t = useTranslations()
  // Get the current page
  const currentPage = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={currentPage === "/" ? "bg-accent" : ""}
              size="lg"
              asChild
            >
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="Home"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{t("title")}</span>
                  <span className="truncate text-xs">{t("home")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("pinned")}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/activity">
                <SidebarMenuButton
                  className={currentPage === "/activity" ? "bg-accent" : ""}
                >
                  <History20Regular />
                  {t("activity")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/presets">
                <SidebarMenuButton
                  className={currentPage === "/presets" ? "bg-accent" : ""}
                >
                  <List20Regular />
                  {t("presets")}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("tools")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/vault">
                  <SidebarMenuButton
                    className={currentPage === "/vault" ? "bg-accent" : ""}
                  >
                    <Password20Regular />
                    {t("vault")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/generate">
                  <SidebarMenuButton
                    className={currentPage === "/generate" ? "bg-accent" : ""}
                  >
                    <LockClosed20Regular />
                    {t("generate")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/strength">
                  <SidebarMenuButton
                    className={currentPage === "/strength" ? "bg-accent" : ""}
                  >
                    <Shield20Regular />
                    {t("strength")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/encryption">
                  <SidebarMenuButton
                    className={currentPage === "/encryption" ? "bg-accent" : ""}
                  >
                    <Translate20Regular />
                    {t("encryption")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/breaches">
                  <SidebarMenuButton
                    className={currentPage === "/breaches" ? "bg-accent" : ""}
                  >
                    <ShieldLock20Regular />
                    {t("breaches")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("legal")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/contact">
                  <SidebarMenuButton
                    className={currentPage === "/contact" ? "bg-accent" : ""}
                  >
                    <Mail20Regular />
                    {t("contact-us")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/docs">
                  <SidebarMenuButton
                    className={currentPage === "/docs" ? "bg-accent" : ""}
                  >
                    <Info20Regular />
                    {t("documentation")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/terms">
                  <SidebarMenuButton
                    className={currentPage === "/terms" ? "bg-accent" : ""}
                  >
                    <DocumentText20Regular />
                    {t("terms-of-service")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/privacy">
                  <SidebarMenuButton
                    className={currentPage === "/privacy" ? "bg-accent" : ""}
                  >
                    <ShieldLock20Regular />
                    {t("privacy-policy")}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("socials")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                >
                  <a href="https://twitter.com/CrypticaApp" target="_blank" rel="noopener noreferrer">
                    <Twitter className="size-5" />
                    {t("twitter")}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                >
                  <a href="https://github.com/CrypticaOSS" target="_blank" rel="noopener noreferrer">
                    <Github className="size-5" />
                    {t("github")}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                >
                  <a href="https://discord.gg/bka49hEnhw" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-5" />
                    {t("discord")}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton
                className={currentPage === "/settings" ? "bg-accent" : ""}
                size="lg"
              >
                <Settings20Regular />
                {t("settings")}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
