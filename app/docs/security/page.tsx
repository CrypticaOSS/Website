"use client"

import Link from "next/link"
import {
  Checkmark20Regular,
  Info20Regular,
  ShieldKeyhole20Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

export default function SecurityDocsPage() {
  const t = useTranslations()

  return (
    <>
      <div className="mb-8 flex items-center">
        <ShieldKeyhole20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {t("security")} {t("guide")}
        </h2>
      </div>

      <p className="mb-6">
        {t("security-intro") ||
          "Cryptica is built with security as a foundational principle. This guide explains our security architecture, the measures we've implemented to protect your data, and best practices for using Cryptica securely."}
      </p>

      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start">
          <Info20Regular className="mt-0.5 mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              {t("zero-knowledge") || "Zero-Knowledge Design"}
            </h3>
            <p className="mt-1 text-blue-700 dark:text-blue-400">
              {t("zero-knowledge-desc") ||
                "Cryptica is designed as a zero-knowledge application. This means we never have access to your sensitive data, encryption keys, or passwords. All encryption and decryption operations happen locally on your device."}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("security-architecture") || "Security Architecture"}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("client-side-processing") || "Client-Side Processing"}
          </h4>
          <p className="mb-3">
            {t("client-side-desc") ||
              "All sensitive operations in Cryptica are performed client-side (in your browser or app), which means:"}
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              {t("client-point-1") ||
                "Your data never leaves your device in unencrypted form"}
            </li>
            <li>
              {t("client-point-2") ||
                "Encryption and decryption keys are never transmitted"}
            </li>
            <li>
              {t("client-point-3") ||
                "Generated passwords remain exclusively on your device"}
            </li>
            <li>
              {t("client-point-4") ||
                "Even if our servers were compromised, your data would remain secure"}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("encryption-standards") || "Encryption Standards"}
          </h4>
          <p className="mb-3">
            {t("standards-desc") ||
              "Cryptica uses industry-standard, battle-tested encryption algorithms:"}
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>AES-256</strong>:{" "}
              {t("aes-desc") ||
                "Advanced Encryption Standard with 256-bit key length for symmetric encryption"}
            </li>
            <li>
              <strong>PBKDF2</strong>:{" "}
              {t("pbkdf2-desc") ||
                "Password-Based Key Derivation Function 2 for secure key generation from passwords"}
            </li>
            <li>
              <strong>
                {t("secure-random") || "Secure Random Generation"}
              </strong>
              :{" "}
              {t("random-desc") ||
                "Cryptographically secure random number generation for passwords and encryption keys"}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("data-storage") || "Data Storage"}
          </h4>
          <p className="mb-3">
            {t("storage-desc") ||
              "Cryptica offers flexible data storage options while maintaining security:"}
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>{t("local-storage") || "Local Storage"}</strong>:{" "}
              {t("local-storage-desc") ||
                "By default, your data is stored only on your device using browser local storage."}
            </li>
            <li>
              <strong>
                {t("optional-sync") || "Optional Synchronization"}
              </strong>
              :{" "}
              {t("sync-desc") ||
                "If enabled, data is encrypted before being synchronized to your chosen database."}
            </li>
            <li>
              <strong>
                {t("encrypted-sync") || "Encrypted Synchronization"}
              </strong>
              :{" "}
              {t("encrypted-sync-desc") ||
                "All synchronized data is encrypted with your master key, which is never sent to the server."}
            </li>
          </ul>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("security-features") || "Key Security Features"}
      </h3>

      <div className="mb-8 space-y-4">
        <div className="flex items-start">
          <Checkmark20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">
              {t("auto-clear") || "Automatic Clipboard Clearing"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t("auto-clear-desc") ||
                "When enabled, Cryptica automatically clears sensitive data from your clipboard after a configurable time period to prevent accidental exposure."}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Checkmark20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">
              {t("password-visibility") || "Password Visibility Control"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t("visibility-desc") ||
                "All sensitive fields have visibility toggles, allowing you to control when passwords and encrypted content are visible on screen."}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Checkmark20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">
              {t("offline-capability") || "Offline Capability"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t("offline-desc") ||
                "Cryptica functions fully offline, ensuring your data remains accessible and secure even without an internet connection."}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Checkmark20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">{t("open-source") || "Open Source"}</h4>
            <p className="text-muted-foreground text-sm">
              {t("open-source-desc") ||
                "Cryptica's code is open source, allowing security experts to verify our security claims and implementation."}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("user-security") || "User Security Best Practices"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("best-practices-desc") ||
            "While Cryptica is designed to be secure, following these practices will further enhance your security:"}
        </p>

        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>
              {t("master-password") || "Use a Strong Master Password"}
            </strong>
            :{" "}
            {t("master-password-desc") ||
              "If you enable synchronization, your master password is your main line of defense. Make it strong and unique."}
          </li>
          <li>
            <strong>{t("device-security") || "Secure Your Device"}</strong>:{" "}
            {t("device-security-desc") ||
              "Keep your device secure with up-to-date software, anti-malware protection, and screen locks."}
          </li>
          <li>
            <strong>
              {t("browser-updates") || "Keep Your Browser Updated"}
            </strong>
            :{" "}
            {t("browser-updates-desc") ||
              "Ensure you're using the latest version of your browser to benefit from security patches."}
          </li>
          <li>
            <strong>{t("https") || "Verify HTTPS Connection"}</strong>:{" "}
            {t("https-desc") ||
              "Always ensure you're accessing Cryptica over a secure HTTPS connection."}
          </li>
          <li>
            <strong>{t("logout") || "Clear Browser Data When Needed"}</strong>:{" "}
            {t("logout-desc") ||
              "On shared devices, consider clearing your browser data after using Cryptica."}
          </li>
        </ol>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("security-faq") || "Security FAQ"}
      </h3>

      <div className="mb-8 space-y-4">
        <div>
          <h4 className="mb-1 font-medium">
            {t("faq-1") || "Is my data safe if I use database synchronization?"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("faq-1-answer") ||
              "Yes. When synchronization is enabled, all data is encrypted with your master key before being sent to the database. The encryption key never leaves your device, making it impossible for anyone (including database administrators) to access your actual data."}
          </p>
        </div>

        <div>
          <h4 className="mb-1 font-medium">
            {t("faq-2") ||
              "Can Cryptica recover my data if I forget my master password?"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("faq-2-answer") ||
              "No. Due to the zero-knowledge design, we have no way to recover your data if you forget your master password. There are no backdoors or recovery mechanisms. This ensures maximum security but requires you to remember your master password."}
          </p>
        </div>

        <div>
          <h4 className="mb-1 font-medium">
            {t("faq-3") ||
              "How does Cryptica protect against brute force attacks?"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("faq-3-answer") ||
              "Cryptica uses strong key derivation functions (PBKDF2) with multiple iterations to slow down brute force attempts. Additionally, all encryption operations are performed client-side, which means an attacker would need direct access to your device to attempt brute forcing."}
          </p>
        </div>

        <div>
          <h4 className="mb-1 font-medium">
            {t("faq-4") || "Is it safe to use Cryptica on a public computer?"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("faq-4-answer") ||
              "While Cryptica is designed to be secure, we generally recommend against using any security tool on public computers, as they may have keyloggers or other malware installed. If you must use a public computer, ensure you clear the browser data afterward and consider changing any passwords you accessed."}
          </p>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("security-audits") || "Security Audits and Compliance"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("audits-desc") ||
            "We are committed to maintaining the highest security standards:"}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            {t("audit-point-1") ||
              "Regular security audits of our codebase and infrastructure"}
          </li>
          <li>
            {t("audit-point-2") ||
              "Transparent disclosure of security issues and fixes"}
          </li>
          <li>
            {t("audit-point-3") ||
              "Continuous monitoring for new security threats and vulnerabilities"}
          </li>
          <li>
            {t("audit-point-4") ||
              "Compliance with relevant data protection regulations"}
          </li>
        </ul>
      </div>

      <div className="mt-10 border-t pt-4">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-primary text-sm"
        >
          ← {t("back-to-docs") || "Back to Documentation"}
        </Link>
      </div>
    </>
  )
}
