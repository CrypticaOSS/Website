"use client"

import {
  ArrowUpRight,
  Check,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"
import { useTranslations } from "next-intl"

const sections = [
  { id: "what-we-dont-collect", number: "01", label: "What we do not collect" },
  { id: "local-storage", number: "02", label: "Local storage" },
  { id: "optional-services", number: "03", label: "Optional services" },
  { id: "analytics", number: "04", label: "Usage analytics" },
  { id: "your-rights", number: "05", label: "Your rights" },
  { id: "changes", number: "06", label: "Policy changes" },
  { id: "contact", number: "07", label: "Contact" },
]

const privateByDefault = [
  "Passwords",
  "Encryption keys",
  "Encrypted or decrypted content",
  "Password vault data",
  "Personal information",
]

const localData = [
  "User preferences (theme, language, etc.)",
  "Password generation history",
  "Password vault entries (fully encrypted in your browser)",
  "Custom presets",
]

const rights = [
  "Access your locally stored data (available in your browser)",
  "Delete your locally stored data (using the reset options in settings)",
  "Control what information is stored (through preferences)",
]

export default function PrivacyPage() {
  const t = useTranslations()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="glass relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Trust center
          </div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{t("privacy-policy")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Cryptica is built to keep your most sensitive information close: on your device, under your control, and out of our hands.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
            <span>Last updated September 5, 2026</span>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-8 lg:self-start" aria-label="Privacy policy sections">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
          <nav className="grid grid-cols-2 gap-x-4 gap-y-1 border-l border-border/70 pl-4 sm:grid-cols-4 lg:grid-cols-1 lg:gap-1">
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
            Cryptica (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Cryptica service (&quot;Service&quot;).
          </p>

          <section id="what-we-dont-collect" className="scroll-mt-8">
            <SectionHeading number="01" title="Information we do not collect" icon={<EyeOff className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground"><strong className="text-foreground">Cryptica is designed with privacy at its core.</strong> We do not collect, store, or transmit the following:</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {privateByDefault.map((item) => <ListItem key={item}>{item}</ListItem>)}
            </ul>
            <p className="mt-5 leading-7 text-muted-foreground">All processing happens locally on your device. Your sensitive data never leaves your device when using our core features.</p>
          </section>

          <section id="local-storage" className="scroll-mt-8">
            <SectionHeading number="02" title="Local storage" icon={<KeyRound className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">Cryptica uses browser local storage to save:</p>
            <ul className="mt-5 space-y-2">{localData.map((item) => <ListItem key={item}>{item}</ListItem>)}</ul>
            <p className="mt-5 leading-7 text-muted-foreground">This data is stored only on your device and is not transmitted to our servers.</p>
          </section>

          <section id="optional-services" className="scroll-mt-8">
            <SectionHeading number="03" title="Optional APIs and third-party services" icon={<ArrowUpRight className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">Some advanced features require external APIs:</p>
            <div className="mt-5 space-y-3">
              <InfoRow title="Password breach checking">Uses the Have I Been Pwned API to check if passwords have appeared in known data breaches. Only a partial hash of your password is sent, never the actual password.</InfoRow>
              <InfoRow title="AI password generation">If you choose to use AI features and provide your own API key, your prompts will be sent to the OpenAI API. We do not store your API key or prompts.</InfoRow>
            </div>
          </section>

          <section id="analytics" className="scroll-mt-8">
            <SectionHeading number="04" title="Usage analytics" icon={<EyeOff className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">We use anonymous analytics to understand how users interact with Cryptica. These analytics do not include any personal information or sensitive data. You can opt out of analytics in the settings.</p>
          </section>

          <section id="your-rights" className="scroll-mt-8">
            <SectionHeading number="05" title="Your rights" icon={<ShieldCheck className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">Since we do not collect personal data, most data privacy regulations (like GDPR and CCPA) have limited applicability. However, we respect and support your rights to:</p>
            <ul className="mt-5 space-y-2">{rights.map((item) => <ListItem key={item}>{item}</ListItem>)}</ul>
          </section>

          <section id="changes" className="scroll-mt-8">
            <SectionHeading number="06" title="Changes to this privacy policy" icon={<LockKeyhole className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>
          </section>

          <section id="contact" className="scroll-mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <SectionHeading number="07" title="Questions about your privacy?" icon={<ShieldCheck className="size-5" />} />
            <p className="mt-5 leading-7 text-muted-foreground">If you have any questions about this Privacy Policy, please contact us.</p>
            <a href="mailto:privacy@crypticapp.org" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">privacy@crypticapp.org <ArrowUpRight className="size-4" /></a>
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

function InfoRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/45 p-4 text-sm leading-6 text-muted-foreground">
      <p className="font-semibold capitalize text-foreground">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  )
}
