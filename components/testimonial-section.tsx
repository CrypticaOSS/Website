import { useTranslations } from "next-intl"

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

export default function TestimonialSection() {
  const t = useTranslations()

  const testimonials = [
    {
      author: {
        name: t("testimonial-1-name", { default: "Connor H." }),
        handle: "@connor200024",
      },
      text: t("testimonial-1", {
        default: "I use this password manager for all my passwords and monitor data brokers. Love it! :D",
      }),
    },
    {
      author: {
        name: t("testimonial-2-name", { default: "William H." }),
        handle: "@william02",
      },
      text: t("testimonial-2", {
        default: "Use cryptica for all my passwords, I like to use the breach checker also. I am also using a plan subscription from them.",
      }),
    },
    {
      author: {
        name: t("testimonial-3-name", { default: "Robert T." }),
        handle: "@robertxyz",
      },
      text: t("testimonial-3", {
        default: "The usage of Cryptica has greatly improved my password management and online security.",
      }),
    },
  ]

  return (
    <TestimonialsSection
      title={t("testimonial-title", { default: "What Users Are Saying" })}
      description={t("testimonial-description", {
        default: "A few words from people using Cryptica to build better password habits.",
      })}
      testimonials={testimonials}
    />
  )
}
