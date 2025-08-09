"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function ContactPage() {
  const t = useTranslations()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <div className="bg-card rounded-lg shadow-sm p-8 border">
        <h1 className="text-4xl font-bold mb-2 text-center">{t("contact-us")}</h1>
        <p className="text-muted-foreground leading-relaxed">
          Thank you for using Cryptica! If you have any questions, feedback, or need assistance,
          we&apos;re here to help. Please reach out to us using the appropriate email address below.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">General Inquiries</h2>
            <p className="mb-4 text-muted-foreground">For general questions about Cryptica or our services.</p>
            <a href="mailto:info@bytebrush.dev" className="text-primary hover:underline">info@bytebrush.dev</a>
          </div>

          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Technical Support</h2>
            <p className="mb-4 text-muted-foreground">Having issues with Cryptica? Our support team is ready to help.</p>
            <a href="mailto:support@bytebrush.dev" className="text-primary hover:underline">support@bytebrush.dev</a>
          </div>

          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Privacy Concerns</h2>
            <p className="mb-4 text-muted-foreground">Questions about our privacy policy or data practices.</p>
            <a href="mailto:privacy@bytebrush.dev" className="text-primary hover:underline">privacy@bytebrush.dev</a>
          </div>

          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Legal Matters</h2>
            <p className="mb-4 text-muted-foreground">For legal inquiries related to Cryptica.</p>
            <a href="mailto:legal@bytebrush.dev" className="text-primary hover:underline">legal@bytebrush.dev</a>
          </div>
          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Discord Server</h2>
            <p className="mb-4 text-muted-foreground">Join our Discord server for community support and discussions.</p>
            <a href="https://discord.gg/bka49hEnhw" className="text-primary hover:underline">Join Discord</a>
          </div>
          <div className="border rounded-lg p-6 bg-card/50 hover:bg-card/80 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Find us on Twitter</h2>
            <p className="mb-4 text-muted-foreground">Stay updated with the latest news and updates from Cryptica.</p>
            <a href="https://twitter.com/CrypticaApp" className="text-primary hover:underline">Follow us on Twitter</a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Our Policies</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Before contacting us, you might find answers in our policy documents:
          </p>
          <ul className="space-y-1">
            <li><Link href="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Response Time</h2>
          <p className="text-muted-foreground leading-relaxed">
            We aim to respond to all inquiries within 48 hours during business days. Thank you for your patience.
          </p>
        </div>

        <div className="border-t pt-6 mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ByteBrush Studios. {t("all-rights-reserved")}
          </p>
        </div>
      </div>
    </div>
  )
}
