"use client"

import { useTranslations } from "next-intl"

export default function TermsPage() {
  const t = useTranslations()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2 text-center">{t("terms-of-service")}</h1>
      <p className="text-muted-foreground text-center mb-10">Last Updated: August 8, 2025</p>

      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-semibold mb-3">Welcome to Cryptica</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to Cryptica (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a password management and encryption toolkit developed
            by ByteBrush Studios. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Cryptica
            website, applications, and services (collectively, the &quot;Service&quot;).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the Terms, you may not access the Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cryptica is a password management and encryption toolkit designed to help users create, analyze, and secure
            digital credentials. The Service processes all data locally on your device. No passwords or sensitive data
            are transmitted to our servers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Privacy and Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your privacy is important to us. Please refer to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for
            information on how we collect, use, and disclose information from our users.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. User Responsibilities</h2>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for maintaining the security of your device and any data stored using our Service.
            We recommend using secure, up-to-date operating systems and browsers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service and its original content, features, and functionality are and will remain the exclusive property of
            ByteBrush Studios and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied.
            While we strive to provide a secure and reliable service, we cannot guarantee that the Service will always be
            available, uninterrupted, or error-free.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            ByteBrush Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use or inability to use the Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
            at least 30 days&apos; notice prior to any new terms taking effect.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at:
            <a href="mailto:legal@bytebrush.dev" className="block mt-2 text-primary hover:underline">legal@bytebrush.dev</a>
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
