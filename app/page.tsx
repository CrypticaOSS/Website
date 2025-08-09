import Link from "next/link"
import { useSettings } from "@/hooks/use-settings"
import { useTranslations } from "next-intl"

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
      link: "./generate",
    },
    {
      title: t("strength"),
      description: t("strength-desc"),
      icon: "\uF50D",
      link: "./strength",
    },
    {
      title: t("encryption"),
      description: t("encryption-desc"),
      icon: "\uF4C1",
      link: "./encryption",
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 pt-16 pb-24 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl mb-8">
            {t("title-desc")}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="https://codemeapixel.dev/projects/cryptica">
                {t("learn-more")}
              </Link>
            </Button>
            <Button size="lg" className="bg-primary" asChild>
              <Link href="/generate">{t("get-started")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">{t("explore")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((el) => (
              <div key={el.title} className="transform transition-all hover:scale-105 hover:shadow-xl">
                <DashboardCard
                  goto={t("go-to", { page: el.title })}
                  link={el.link}
                  title={el.title}
                  description={el.description}
                  icon={el.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Showcase Section */}
      <section className="mb-16 bg-muted/10 py-12 -mx-4 px-4">
        <div className="container mx-auto">
          <ShowcaseSection
            title={t("showcase", { default: "Cryptica in Action" })}
            subtitle={t("showcase-desc", { default: "See how Cryptica makes password management simple and secure" })}
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="mb-16">
        <div className="container mx-auto">
          <FeatureHighlights
            title={t("feature-highlights", { default: "Why Choose Cryptica" })}
            features={[
              {
                title: t("security-first", { default: "Security First" }),
                description: t("security-first-desc", { default: "Your passwords never leave your device. All processing happens locally for maximum privacy." }),
                icon: "\uF4C1"
              },
              {
                title: t("beautiful-themes", { default: "Beautiful Themes" }),
                description: t("beautiful-themes-desc", { default: "Choose from multiple elegant themes to customize your experience." }),
                icon: "\uF5A8"
              },
              {
                title: t("breach-detection", { default: "Breach Detection" }),
                description: t("breach-detection-desc", { default: "Check if your passwords have been compromised in known data breaches." }),
                icon: "\uF50D"
              }
            ]}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16 bg-muted/10 py-12 -mx-4 px-4">
        <div className="container mx-auto">
          <TestimonialSection />
        </div>
      </section>
    </div>
  )
}
