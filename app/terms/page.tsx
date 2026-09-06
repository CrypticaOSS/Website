"use client"

import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  FileText,
  KeyRound,
  Scale,
  ShieldAlert,
  UserRoundCheck,
} from "lucide-react"
import { useTranslations } from "next-intl"

const sections = [
  { id: "acceptance", number: "01", label: "Acceptance" },
  { id: "service", number: "02", label: "The service" },
  { id: "your-responsibilities", number: "03", label: "Your responsibilities" },
  { id: "acceptable-use", number: "04", label: "Acceptable use" },
  { id: "intellectual-property", number: "05", label: "Intellectual property" },
  { id: "disclaimers", number: "06", label: "Disclaimers" },
  { id: "liability", number: "07", label: "Liability" },
  { id: "changes", number: "08", label: "Changes" },
  { id: "contact", number: "09", label: "Contact" },
]

const responsibilities = [
  "Maintain the security of your device, browser, and any credentials you create or store.",
  "Keep backup copies of information that is important to you.",
  "Use current, supported software and apply security updates promptly.",
  "Review generated passwords and encryption settings before relying on them.",
]

const prohibitedUses = [
  "Use the Service in violation of applicable law or regulation.",
  "Attempt to interfere with, disrupt, or compromise the Service or its infrastructure.",
  "Reverse engineer, copy, or resell the Service except where applicable law permits it.",
  "Use the Service to harm others, bypass security controls, or facilitate unauthorized access.",
]

export default function TermsPage() {
  const t = useTranslations()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="glass relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Scale className="size-3.5" aria-hidden="true" />
            Legal center
          </div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{t("terms-of-service")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            The straightforward rules for using Cryptica, designed to help you protect your digital life with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
            <span>Last updated September 5, 2026</span>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-8 lg:self-start" aria-label="Terms of service sections">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
          <nav className="grid grid-cols-2 gap-x-4 gap-y-1 border-l border-border/70 pl-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-1">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <span className="font-mono text-[10px] text-primary/70">{section.number}</span>
                <span>{section.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl space-y-12">
          <p className="text-lg leading-8 text-foreground/85">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of Cryptica, including our website, applications, and related services (collectively, the &quot;Service&quot;). In these Terms, &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to Cryptica.
          </p>

          <section id="acceptance" className="scroll-mt-8">
            <SectionHeading number="01" title="Acceptance of these terms" icon={<BadgeCheck className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">By accessing or using the Service, you agree to these Terms. If you do not agree, do not access or use the Service. You must be legally able to enter into this agreement in the jurisdiction where you use the Service.</p>
          </section>

          <section id="service" className="scroll-mt-8">
            <SectionHeading number="02" title="The Cryptica service" icon={<KeyRound className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">Cryptica is a password management and encryption toolkit that helps you generate, assess, organize, and protect digital credentials. Core features process data locally on your device. You remain in control of the information you choose to create, import, or store.</p>
            <div className="mt-5 rounded-xl border border-border/60 bg-card/45 p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">Your data and privacy</p>
              <p className="mt-1">Our <a href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</a> explains how the Service handles information, including optional third-party features.</p>
            </div>
          </section>

          <section id="your-responsibilities" className="scroll-mt-8">
            <SectionHeading number="03" title="Your responsibilities" icon={<UserRoundCheck className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">You are responsible for how you use the Service and for safeguarding the information under your control. In particular, you agree to:</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">{responsibilities.map((item) => <ListItem key={item}>{item}</ListItem>)}</ul>
          </section>

          <section id="acceptable-use" className="scroll-mt-8">
            <SectionHeading number="04" title="Acceptable use" icon={<ShieldAlert className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">Use Cryptica responsibly and only for legitimate purposes. You must not:</p>
            <ul className="mt-5 space-y-2">{prohibitedUses.map((item) => <ListItem key={item}>{item}</ListItem>)}</ul>
          </section>

          <section id="intellectual-property" className="scroll-mt-8">
            <SectionHeading number="05" title="Intellectual property" icon={<FileText className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">The Service, including its design, branding, content, features, and functionality, is owned by Cryptica or its licensors and is protected by applicable intellectual property laws. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for its intended purpose.</p>
          </section>

          <section id="disclaimers" className="scroll-mt-8">
            <SectionHeading number="06" title="Disclaimers" icon={<ShieldAlert className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the fullest extent permitted by law, Cryptica disclaims all warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p className="mt-5 leading-7 text-muted-foreground">Security tools can reduce risk, but no service can guarantee absolute security. We do not warrant that the Service will always be secure, uninterrupted, error-free, or compatible with every device or browser.</p>
          </section>

          <section id="liability" className="scroll-mt-8">
            <SectionHeading number="07" title="Limitation of liability" icon={<Scale className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">To the fullest extent permitted by law, Cryptica and its licensors will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, goodwill, or business opportunity arising from or related to your use of, or inability to use, the Service.</p>
          </section>

          <section id="changes" className="scroll-mt-8">
            <SectionHeading number="08" title="Changes to these terms" icon={<BadgeCheck className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">We may update these Terms to reflect changes to the Service, applicable law, or our practices. When we do, we will post the revised Terms here and update the &quot;Last updated&quot; date. Your continued use of the Service after the effective date means you accept the revised Terms.</p>
          </section>

          <section id="contact" className="scroll-mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <SectionHeading number="09" title="Questions about these terms?" icon={<Scale className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">For questions about these Terms of Service, please contact us.</p>
            <a href="mailto:legal@crypticapp.org" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">legal@crypticapp.org <ArrowUpRight className="size-4" /></a>
          </section>
        </article>
      </div>
    </div>
  )
}

function SectionHeading({ number, title, icon }: { number: string; title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 border-b border-border/70 pb-4">
      <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="font-mono text-xs text-primary/75">{number}</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
    </div>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/45 px-4 py-3 text-sm leading-6 text-muted-foreground">
      <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}
