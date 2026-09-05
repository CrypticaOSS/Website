import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import DashboardCard from "@/components/dash-card"
import FeatureHighlights from "@/components/feature-highlights"
import ShowcaseSection from "@/components/showcase-section"
import TestimonialSection from "@/components/testimonial-section"
import { Button } from "@/components/ui/button"

export default function Home() {
  const t = useTranslations()

  const cards = [
    {
      title: t("generate"),
      description: t("generate-desc"),
      icon: "\uF5A8",
      link: "/generate",
    },
    {
      title: t("strength"),
      description: t("strength-desc"),
      icon: "\uF50D",
      link: "/strength",
    },
    {
      title: t("encryption"),
      description: t("encryption-desc"),
      icon: "\uF4C1",
      link: "/encryption",
    },
  ]

  return (
    <main className="relative w-full overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative isolate border-b border-border/50">
        {/* Background */}
        <div className="absolute inset-0 -z-20 bg-background" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_36%),radial-gradient(circle_at_80%_10%,hsl(var(--primary)/0.08),transparent_30%)]" />

        <div
          className="
            absolute inset-0 -z-10 opacity-[0.035]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:48px_48px]
          "
        />

        <div className="container mx-auto px-4 py-24 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div
              className="
                mx-auto mb-6 inline-flex items-center gap-2
                rounded-full border border-primary/20
                bg-primary/5 px-4 py-2
                text-sm font-medium text-primary
                shadow-sm backdrop-blur
              "
            >
              <ShieldCheck className="h-4 w-4" />

              <span>
                Privacy-first password tools
              </span>
            </div>

            <h1
              className="
                mx-auto max-w-4xl
                text-balance text-5xl font-bold tracking-tight
                sm:text-6xl lg:text-7xl
              "
            >
              <span className="text-foreground">
                {t("title")}
              </span>

              <span
                className="
                  mt-2 block bg-gradient-to-r
                  from-primary via-primary to-primary/60
                  bg-clip-text text-transparent
                "
              >
                Built around your privacy.
              </span>
            </h1>

            <p
              className="
                mx-auto mt-7 max-w-2xl
                text-pretty text-lg leading-8
                text-muted-foreground sm:text-xl
              "
            >
              {t("title-desc")}
            </p>

            {/* CTA */}
            <div
              className="
                mt-10 flex flex-col items-center justify-center
                gap-3 sm:flex-row
              "
            >
              <Button
                size="lg"
                asChild
                className="
                  h-12 rounded-xl px-6 text-base
                  shadow-lg shadow-primary/20
                "
              >
                <Link href="/generate">
                  {t("get-started")}

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="
                  h-12 rounded-xl border-border/70
                  bg-background/60 px-6 text-base
                  backdrop-blur
                "
              >
                <Link href="https://crypticapp.org/docs">
                  {t("learn-more")}
                </Link>
              </Button>
            </div>

            {/* Trust points */}
            <div
              className="
                mx-auto mt-10 flex max-w-2xl
                flex-wrap items-center justify-center gap-x-6 gap-y-3
                text-sm text-muted-foreground
              "
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Local-first processing
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No password storage
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Fast and easy to use
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Main tools                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Cryptica Toolkit
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("explore")}
            </h2>

            <p className="mt-4 text-lg leading-7 text-muted-foreground">
              Generate, analyse and protect your passwords with tools designed
              to be simple, fast and privacy-conscious.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((el) => (
              <div
                key={el.title}
                className="
                  group relative
                  rounded-2xl border border-border/60
                  bg-card/70 p-px
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:shadow-xl
                  hover:shadow-primary/5
                "
              >
                <div
                  className="
                    pointer-events-none absolute inset-0 rounded-2xl
                    bg-gradient-to-b from-primary/5 to-transparent
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  <DashboardCard
                    goto={t("go-to", { page: el.title })}
                    link={el.link}
                    title={el.title}
                    description={el.description}
                    icon={el.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Value strip                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl border border-primary/20
                  bg-primary/10 text-primary
                "
              >
                <LockKeyhole className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Privacy by design
                </p>

                <p className="text-sm text-muted-foreground">
                  Sensitive operations happen locally wherever possible.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl border border-primary/20
                  bg-primary/10 text-primary
                "
              >
                <Zap className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Built for speed
                </p>

                <p className="text-sm text-muted-foreground">
                  Get useful results without unnecessary complexity.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl border border-primary/20
                  bg-primary/10 text-primary
                "
              >
                <KeyRound className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Password focused
                </p>

                <p className="text-sm text-muted-foreground">
                  Dedicated tools without all the usual dashboard clutter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Showcase                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div
            className="
              relative overflow-hidden
              rounded-3xl border border-border/60
              bg-card/50 px-6 py-12
              shadow-xl shadow-black/5
              backdrop-blur-sm
              sm:px-10 lg:px-14
            "
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <ShowcaseSection
                title={t("showcase", {
                  default: "Cryptica in Action",
                })}
                subtitle={t("showcase-desc", {
                  default:
                    "See how Cryptica makes password management simple and secure",
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Features                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative border-y border-border/50 bg-muted/20 py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <FeatureHighlights
            title={t("feature-highlights", {
              default: "Why Choose Cryptica",
            })}
            features={[
              {
                title: t("security-first", {
                  default: "Security First",
                }),
                description: t("security-first-desc", {
                  default:
                    "Your passwords never leave your device. Processing is performed locally whenever possible to maximise privacy.",
                }),
                icon: "\uF4C1",
              },
              {
                title: t("beautiful-themes", {
                  default: "Beautiful Themes",
                }),
                description: t("beautiful-themes-desc", {
                  default:
                    "Choose from elegant themes designed to keep the interface clean, consistent and comfortable to use.",
                }),
                icon: "\uF5A8",
              },
              {
                title: t("breach-detection", {
                  default: "Breach Detection",
                }),
                description: t("breach-detection-desc", {
                  default:
                    "Check whether credentials may have appeared in known data breaches and identify passwords worth replacing.",
                }),
                icon: "\uF50D",
              },
            ]}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Testimonials                                                        */}
      {/* ------------------------------------------------------------------ */}

      <TestimonialSection />

      {/* ------------------------------------------------------------------ */}
      {/* Final CTA                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4">
          <div
            className="
              relative overflow-hidden rounded-3xl
              border border-primary/20
              bg-primary/[0.06]
              px-6 py-14 text-center
              sm:px-12 sm:py-16
            "
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.18),transparent_45%)]" />

            <div className="relative mx-auto max-w-2xl">
              <div
                className="
                  mx-auto mb-5 flex h-12 w-12
                  items-center justify-center rounded-2xl
                  border border-primary/20
                  bg-primary/10 text-primary
                "
              >
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Better password habits start here.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Use Cryptica to create stronger passwords, analyse existing
                credentials and make better security decisions.
              </p>

              <Button
                size="lg"
                asChild
                className="
                  mt-8 h-12 rounded-xl px-7
                  shadow-lg shadow-primary/20
                "
              >
                <Link href="/generate">
                  Start generating

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}