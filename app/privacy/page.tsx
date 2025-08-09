"use client"

import { useTranslations } from "next-intl"

export default function PrivacyPage() {
  const t = useTranslations()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2 text-center">{t("privacy-policy")}</h1>
      <p className="text-muted-foreground text-center mb-10">Last Updated: August 8, 2025</p>

      <div className="space-y-6">

        <p className="text-muted-foreground leading-relaxed">
          ByteBrush Studios (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard your information when you use our Cryptica service
          (&quot;Service&quot;).
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Information We Do Not Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong>Cryptica is designed with privacy at its core.</strong> We do not collect, store, or transmit:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Your passwords</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Encryption keys</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Encrypted or decrypted content</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Password vault data</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Personal information</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            All processing happens locally on your device. Your sensitive data never leaves your device when using
            our core features.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Local Storage</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cryptica uses browser local storage to save:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>User preferences (theme, language, etc.)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Password generation history</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Password vault entries (fully encrypted in your browser)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Custom presets</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            This data is stored only on your device and is not transmitted to our servers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Optional APIs and Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Some advanced features require external APIs:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Password Breach Checking:</strong> Uses the Have I Been Pwned API to check if passwords have appeared in known data breaches. Only a partial hash of your password is sent, never the actual password.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>AI Password Generation (Optional):</strong> If you choose to use AI features and provide your own API key, your prompts will be sent to the OpenAI API. We do not store your API key or prompts.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Usage Analytics</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use anonymous analytics to understand how users interact with Cryptica. These analytics do not include
            any personal information or sensitive data. You can opt out of analytics in the settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Since we do not collect personal data, most data privacy regulations (like GDPR and CCPA) have limited
            applicability. However, we respect and support your rights to:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Access your locally stored data (available in your browser)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Delete your locally stored data (using the reset options in settings)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Control what information is stored (through preferences)</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
            <a href="mailto:privacy@bytebrush.dev" className="block mt-2 text-primary hover:underline">privacy@bytebrush.dev</a>
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
