"use client"

import Link from "next/link"
import {
  BookCompass20Regular,
  CheckmarkCircle20Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

export default function GettingStartedDocsPage() {
  const t = useTranslations()

  return (
    <>
      <div className="mb-8 flex items-center">
        <BookCompass20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {t("getting-started") || "Getting Started with Cryptica"}
        </h2>
      </div>

      <p className="mb-6">
        {t("getting-started-intro") ||
          "Welcome to Cryptica! This guide will help you understand the core features and get started with using our secure password management and encryption tools."}
      </p>

      <h3 className="mb-4 text-xl font-semibold">
        {t("what-is-cryptica") || "What is Cryptica?"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("cryptica-description") ||
            "Cryptica is a comprehensive password and encryption tool designed with privacy and security at its core. Unlike traditional password managers, Cryptica is fully client-side, meaning your sensitive data never leaves your device unless you explicitly enable encrypted synchronization."}
        </p>

        <h4 className="mb-2 font-medium">
          {t("key-features") || "Key Features"}:
        </h4>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>{t("password-generation") || "Password Generation"}</strong>
            :{" "}
            {t("password-generation-brief") ||
              "Create strong, unique passwords tailored to your needs."}
          </li>
          <li>
            <strong>{t("encryption-tools") || "Encryption Tools"}</strong>:{" "}
            {t("encryption-tools-brief") ||
              "Encrypt and decrypt sensitive text using powerful AES-256 encryption."}
          </li>
          <li>
            <strong>{t("password-analysis") || "Password Analysis"}</strong>:{" "}
            {t("password-analysis-brief") ||
              "Evaluate the strength of your passwords and get improvement suggestions."}
          </li>
          <li>
            <strong>{t("activity-tracking") || "Activity Tracking"}</strong>:{" "}
            {t("activity-tracking-brief") ||
              "Keep a record of your password generation and encryption activities."}
          </li>
          <li>
            <strong>
              {t("cross-device-sync") || "Optional Synchronization"}
            </strong>
            :{" "}
            {t("sync-brief") ||
              "Securely synchronize your data across devices using encrypted storage."}
          </li>
        </ul>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("quick-start-guide") || "Quick Start Guide"}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <div className="mb-3 flex items-start">
            <CheckmarkCircle20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
            <h4 className="text-lg font-medium">
              {t("step-1") || "Step 1: Generate a Strong Password"}
            </h4>
          </div>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("step-1-1") ||
                "Navigate to the Generate page from the main menu."}
            </li>
            <li>
              {t("step-1-2") ||
                "Choose your preferred generation method (Standard, Strength-based, or AI-assisted)."}
            </li>
            <li>
              {t("step-1-3") ||
                "Configure your password parameters or select a strength level."}
            </li>
            <li>
              {t("step-1-4") ||
                "Click the Generate button to create your password."}
            </li>
            <li>
              {t("step-1-5") ||
                "Use the Copy button to copy the password to your clipboard."}
            </li>
          </ol>

          <Link
            href="/docs/generator"
            className="text-primary text-sm hover:underline"
          >
            {t("learn-more-about-generator") ||
              "Learn more about the Password Generator →"}
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <div className="mb-3 flex items-start">
            <CheckmarkCircle20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
            <h4 className="text-lg font-medium">
              {t("step-2") || "Step 2: Encrypt Sensitive Information"}
            </h4>
          </div>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("step-2-1") ||
                "Navigate to the Encryption page from the main menu."}
            </li>
            <li>
              {t("step-2-2") || "Enter or paste the text you want to encrypt."}
            </li>
            <li>
              {t("step-2-3") ||
                "Create a strong encryption password (or use the password generator)."}
            </li>
            <li>
              {t("step-2-4") || "Click the Encrypt button to secure your data."}
            </li>
            <li>
              {t("step-2-5") ||
                "Copy the encrypted result and store it safely."}
            </li>
          </ol>

          <Link
            href="/docs/encryption"
            className="text-primary text-sm hover:underline"
          >
            {t("learn-more-about-encryption") ||
              "Learn more about the Encryption Tools →"}
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <div className="mb-3 flex items-start">
            <CheckmarkCircle20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
            <h4 className="text-lg font-medium">
              {t("step-3") || "Step 3: Analyze Password Strength"}
            </h4>
          </div>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("step-3-1") ||
                "Navigate to the Strength page from the main menu."}
            </li>
            <li>
              {t("step-3-2") ||
                "Enter or paste a password you want to analyze."}
            </li>
            <li>
              {t("step-3-3") ||
                "Review the detailed strength analysis and metrics."}
            </li>
            <li>
              {t("step-3-4") ||
                "Consider the improvement suggestions provided."}
            </li>
          </ol>

          <Link
            href="/docs/strength"
            className="text-primary text-sm hover:underline"
          >
            {t("learn-more-about-strength") ||
              "Learn more about the Strength Analyzer →"}
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <div className="mb-3 flex items-start">
            <CheckmarkCircle20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
            <h4 className="text-lg font-medium">
              {t("step-4") || "Step 4: Customize Your Settings"}
            </h4>
          </div>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("step-4-1") ||
                "Navigate to the Settings page from the main menu."}
            </li>
            <li>
              {t("step-4-2") ||
                "Adjust the theme to your preference (Light, Dark, or System)."}
            </li>
            <li>{t("step-4-3") || "Select your preferred language."}</li>
            <li>
              {t("step-4-4") ||
                "Configure security settings like clipboard timeout."}
            </li>
            <li>
              {t("step-4-5") ||
                "Optionally, set up database synchronization if you want to use Cryptica across multiple devices."}
            </li>
          </ol>

          <Link
            href="/docs/settings"
            className="text-primary text-sm hover:underline"
          >
            {t("learn-more-about-settings") || "Learn more about Settings →"}
          </Link>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("using-presets") || "Using Password Presets"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("presets-intro") ||
            "Password presets allow you to save your frequently used password generation settings for quick access:"}
        </p>

        <ol className="mb-4 list-decimal space-y-2 pl-5">
          <li>
            {t("preset-step-1") ||
              "Navigate to the Presets page from the main menu."}
          </li>
          <li>
            {t("preset-step-2") ||
              "Click the 'New Preset' button to create a preset."}
          </li>
          <li>
            {t("preset-step-3") ||
              "Configure the password parameters (length, character types, etc.)."}
          </li>
          <li>
            {t("preset-step-4") ||
              "Give your preset a descriptive name and save it."}
          </li>
          <li>
            {t("preset-step-5") ||
              "Use your saved presets from the Generate page or Presets page."}
          </li>
        </ol>

        <p className="text-muted-foreground text-sm">
          {t("presets-tip") ||
            "Tip: Create different presets for different types of websites or services. For example, you might want a 'Banking' preset with maximum security and a 'Social Media' preset that meets specific requirements."}
        </p>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("setting-up-sync") || "Setting Up Synchronization (Optional)"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("sync-intro") ||
            "If you want to use Cryptica across multiple devices, you can set up database synchronization:"}
        </p>

        <ol className="mb-4 list-decimal space-y-2 pl-5">
          <li>
            {t("sync-step-1") ||
              "Navigate to the Settings page from the main menu."}
          </li>
          <li>
            {t("sync-step-2") ||
              "Scroll down to the Database Connection section."}
          </li>
          <li>
            {t("sync-step-3") ||
              "Choose your preferred database provider (Supabase, Firebase, or Custom API)."}
          </li>
          <li>
            {t("sync-step-4") ||
              "Enter the required connection details for your chosen provider."}
          </li>
          <li>
            {t("sync-step-5") ||
              "Test the connection to ensure it's working properly."}
          </li>
          <li>
            {t("sync-step-6") ||
              "Toggle the synchronization switch to enable syncing."}
          </li>
        </ol>

        <div className="bg-muted mt-4 rounded-md p-3">
          <p className="mb-1 text-sm font-medium">
            {t("sync-security-note") || "Security Note"}:
          </p>
          <p className="text-sm">
            {t("sync-security-reminder") ||
              "All synchronized data is encrypted before being sent to your database. Your encryption keys remain on your device and are never transmitted."}
          </p>
        </div>

        <Link
          href="/docs/database"
          className="text-primary mt-4 block text-sm hover:underline"
        >
          {t("learn-more-about-database") ||
            "Learn more about Database Synchronization →"}
        </Link>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("keyboard-shortcuts") || "Keyboard Shortcuts"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("shortcuts-intro") ||
            "Cryptica supports several keyboard shortcuts to help you work more efficiently:"}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium">
              {t("global-shortcuts") || "Global Shortcuts"}
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("nav-generate") || "Navigate to Generate"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  G
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("nav-encrypt") || "Navigate to Encryption"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  E
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("nav-strength") || "Navigate to Strength"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  S
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("nav-settings") || "Navigate to Settings"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  O
                </kbd>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-medium">
              {t("feature-shortcuts") || "Feature Shortcuts"}
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("generate-password") || "Generate Password"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  Ctrl+G
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("copy-password") || "Copy to Clipboard"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  Ctrl+C
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("toggle-visibility") || "Toggle Visibility"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  Ctrl+V
                </kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">
                  {t("clear-fields") || "Clear Fields"}
                </span>
                <kbd className="bg-muted rounded px-2 py-1 text-xs font-semibold">
                  Esc
                </kbd>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("additional-resources") || "Additional Resources"}
      </h3>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href="/docs/security"
          className="hover:bg-muted/50 block rounded-lg border p-4 transition-colors"
        >
          <h4 className="mb-2 text-lg font-medium">
            {t("security-guide") || "Security Guide"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("security-guide-desc") ||
              "Learn about Cryptica's security architecture and best practices."}
          </p>
        </Link>

        <Link
          href="/docs/activity"
          className="hover:bg-muted/50 block rounded-lg border p-4 transition-colors"
        >
          <h4 className="mb-2 text-lg font-medium">
            {t("activity-tracking-guide") || "Activity Tracking Guide"}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("activity-guide-desc") ||
              "Understand how to use and manage your activity history."}
          </p>
        </Link>
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
