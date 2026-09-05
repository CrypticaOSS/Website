"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  ArrowUpRight,
  Clock3,
  FileText,
  Gavel,
  Mail,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

type ContactOption = {
  title: string
  description: string
  href: string
  action: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

const contactOptions: ContactOption[] = [
  {
    title: "General enquiries",
    description:
      "Questions about Cryptica, our services, features or anything else that does not fit another category.",
    href: "mailto:info@crypticapp.org",
    action: "info@crypticapp.org",
    icon: Mail,
  },
  {
    title: "Technical support",
    description:
      "Having trouble with Cryptica? Get help with account, password-tool or technical issues.",
    href: "mailto:support@crypticapp.org",
    action: "support@crypticapp.org",
    icon: MessagesSquare,
  },
  {
    title: "Privacy",
    description:
      "Questions or concerns about privacy, personal information and how Cryptica handles your data.",
    href: "mailto:privacy@crypticapp.org",
    action: "privacy@crypticapp.org",
    icon: ShieldCheck,
  },
  {
    title: "Legal",
    description:
      "For legal notices, formal enquiries and matters relating to Cryptica's policies or services.",
    href: "mailto:legal@crypticapp.org",
    action: "legal@crypticapp.org",
    icon: Gavel,
  },
  {
    title: "Discord community",
    description:
      "Join the Cryptica community for discussion, updates and community support.",
    href: "https://discord.gg/n5VBFAVpAe",
    action: "Join Discord",
    icon: MessagesSquare,
    external: true,
  },
  {
    title: "Twitter / X",
    description:
      "Follow Cryptica for product updates, announcements and the latest project news.",
    href: "https://twitter.com/CrypticaApp",
    action: "Follow Cryptica",
    icon: Sparkles,
    external: true,
  },
]

function ContactCard({
  option,
}: {
  option: ContactOption
}) {
  const Icon = option.icon

  return (
    <a
      href={option.href}
      target={option.external ? "_blank" : undefined}
      rel={option.external ? "noopener noreferrer" : undefined}
      className="
        group relative overflow-hidden rounded-2xl
        border border-border/70
        bg-card/55 p-5
        backdrop-blur-xl
        transition-all duration-200
        hover:border-primary/20
        hover:bg-card/80
        hover:shadow-lg
      "
    >
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-24
          bg-linear-to-b from-primary/[0.06] to-transparent
          opacity-0 transition-opacity
          group-hover:opacity-100
        "
      />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl border border-primary/15
              bg-primary/10 text-primary
            "
          >
            <Icon className="size-[18px]" />
          </div>

          <ArrowUpRight
            className="
              size-4 text-muted-foreground/50
              transition-all duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-primary
            "
          />
        </div>

        <h2 className="text-base font-bold tracking-tight">
          {option.title}
        </h2>

        <p className="mt-2 min-h-15 text-sm leading-6 text-muted-foreground">
          {option.description}
        </p>

        <div className="mt-5">
          <span
            className="
              text-sm font-semibold text-primary
              group-hover:underline
            "
          >
            {option.action}
          </span>
        </div>
      </div>
    </a>
  )
}

export default function ContactPage() {
  const t = useTranslations()

  return (
    <div className="mx-auto w-full max-w-6xl py-4 sm:py-8">
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-border/70
          bg-card/45
          p-6 shadow-sm
          backdrop-blur-xl
          sm:p-8 lg:p-10
        "
      >
        <div
          className="
            pointer-events-none absolute -right-40 -top-40
            size-96 rounded-full
            bg-primary/[0.07]
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
          <div className="mb-10 max-w-2xl">
            <div
              className="
                mb-4 inline-flex items-center gap-2
                rounded-full
                border border-primary/15
                bg-primary/[0.07]
                px-3 py-1.5
                text-xs font-semibold text-primary
              "
            >
              <MessagesSquare className="size-3.5" />
              We&apos;re here to help
            </div>

            <h1
              className="
                text-3xl font-extrabold
                tracking-[-0.035em]
                sm:text-4xl
              "
            >
              {t("contact-us")}
            </h1>

            <p
              className="
                mt-3 max-w-xl
                text-sm leading-6
                text-muted-foreground
                sm:text-base sm:leading-7
              "
            >
              Need help, have feedback or want to get in touch with the
              Cryptica team? Choose the option that best matches your enquiry.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contactOptions.map((option) => (
              <ContactCard
                key={option.title}
                option={option}
              />
            ))}
          </div>

          <div
            className="
              mt-8 grid gap-4
              border-t border-border/60
              pt-8
              lg:grid-cols-2
            "
          >
            <div
              className="
                rounded-2xl
                border border-border/70
                bg-background/35
                p-5
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl bg-primary/10 text-primary
                  "
                >
                  <FileText className="size-[18px]" />
                </div>

                <div>
                  <h2 className="font-bold">
                    Policies & information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    You may find the answer you&apos;re looking for in our
                    policies before contacting the team.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href="/terms"
                      className="
                        inline-flex h-9 items-center gap-2
                        rounded-xl border border-border
                        bg-background/60 px-3
                        text-xs font-semibold
                        transition-colors
                        hover:bg-accent
                      "
                    >
                      <Scale className="size-3.5" />
                      Terms of Service
                    </Link>

                    <Link
                      href="/privacy"
                      className="
                        inline-flex h-9 items-center gap-2
                        rounded-xl border border-border
                        bg-background/60 px-3
                        text-xs font-semibold
                        transition-colors
                        hover:bg-accent
                      "
                    >
                      <ShieldCheck className="size-3.5" />
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border border-border/70
                bg-background/35
                p-5
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl bg-primary/10 text-primary
                  "
                >
                  <Clock3 className="size-[18px]" />
                </div>

                <div>
                  <h2 className="font-bold">
                    Response times
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    We aim to respond to enquiries within 48 hours on business
                    days. More complex support, privacy or legal enquiries may
                    occasionally take a little longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}