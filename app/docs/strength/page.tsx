"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  DataHistogram20Regular,
  Info20Regular,
  Shield20Regular,
  LockClosed20Regular
} from "@fluentui/react-icons";

export default function StrengthDocsPage() {
  const t = useTranslations();

  return (
    <>
      <div className="flex items-center mb-8">
        <DataHistogram20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("docs-password-strength")} {t("docs-analyzer")}</h2>
      </div>

      <p className="mb-6">{t("docs-strength-intro-page") || "Cryptica's Password Strength Analyzer helps you evaluate the security of your passwords. This guide explains how the analyzer works, what the different metrics mean, and how to interpret the results."}</p>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{t("docs-privacy-note-strength") || "Privacy First"}</h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">{t("docs-strength-privacy-note-page") || "All password analysis is performed locally in your browser. Your passwords are never sent to any server or stored anywhere."}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t("how-analyzer-works-page") || "How the Analyzer Works"}</h3>

      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("analyzer-explanation-page") || "The Password Strength Analyzer evaluates several factors to determine how resistant your password is to various types of attacks:"}</p>

        <ul className="list-disc space-y-2 pl-5">
          <li><strong>{t("length") || "Length"}</strong>: {t("length-desc-strength") || "The number of characters in your password. Longer passwords are generally more secure."}</li>
          <li><strong>{t("complexity-strength") || "Complexity"}</strong>: {t("complexity-desc-strength") || "The mix of different character types (lowercase, uppercase, numbers, special characters)."}</li>
          <li><strong>{t("entropy") || "Entropy"}</strong>: {t("entropy-desc-strength") || "A measure of randomness and unpredictability, calculated based on length and character set."}</li>
          <li><strong>{t("patterns-strength") || "Pattern Recognition"}</strong>: {t("patterns-desc-strength") || "Detection of common patterns that could weaken a password."}</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t("strength-categories-page") || "Strength Categories"}</h3>

      <div className="space-y-6 mb-8">
        <div className="border border-red-200 dark:border-red-900 rounded-lg p-5 bg-red-50 dark:bg-red-950/50">
          <h4 className="text-lg font-medium mb-3 text-red-700 dark:text-red-400">{t("very-weak") || "Very Weak"}</h4>
          <p className="mb-2 text-red-600 dark:text-red-500">{t("very-weak-desc-page") || "These passwords could be cracked almost instantly."}</p>

          <h5 className="font-medium mb-2 text-red-600 dark:text-red-500">{t("characteristics-strength") || "Characteristics"}:</h5>
          <ul className="list-disc space-y-1 pl-5 text-red-600 dark:text-red-500">
            <li>{t("very-weak-char-1") || "Very short (less than 6 characters)"}</li>
            <li>{t("very-weak-char-2") || "Contains only one type of character (e.g., only lowercase letters)"}</li>
            <li>{t("very-weak-char-3") || "Common words or patterns (e.g., '123456', 'password')"}</li>
          </ul>
        </div>

        <div className="border border-orange-200 dark:border-orange-900 rounded-lg p-5 bg-orange-50 dark:bg-orange-950/50">
          <h4 className="text-lg font-medium mb-3 text-orange-700 dark:text-orange-400">{t("weak") || "Weak"}</h4>
          <p className="mb-2 text-orange-600 dark:text-orange-500">{t("weak-desc-page") || "These passwords could be cracked within minutes to hours."}</p>

          <h5 className="font-medium mb-2 text-orange-600 dark:text-orange-500">{t("characteristics-strength") || "Characteristics"}:</h5>
          <ul className="list-disc space-y-1 pl-5 text-orange-600 dark:text-orange-500">
            <li>{t("weak-char-1") || "Short (6-8 characters)"}</li>
            <li>{t("weak-char-2") || "Contains two types of characters (e.g., lowercase letters and numbers)"}</li>
            <li>{t("weak-char-3") || "Simple modifications of dictionary words (e.g., 'password123')"}</li>
          </ul>
        </div>

        <div className="border border-yellow-200 dark:border-yellow-900 rounded-lg p-5 bg-yellow-50 dark:bg-yellow-950/50">
          <h4 className="text-lg font-medium mb-3 text-yellow-700 dark:text-yellow-400">{t("moderate") || "Moderate"}</h4>
          <p className="mb-2 text-yellow-600 dark:text-yellow-500">{t("moderate-desc-page") || "These passwords would take days to weeks to crack."}</p>

          <h5 className="font-medium mb-2 text-yellow-600 dark:text-yellow-500">{t("characteristics-strength") || "Characteristics"}:</h5>
          <ul className="list-disc space-y-1 pl-5 text-yellow-600 dark:text-yellow-500">
            <li>{t("moderate-char-1") || "Medium length (9-12 characters)"}</li>
            <li>{t("moderate-char-2") || "Contains three types of characters"}</li>
            <li>{t("moderate-char-3") || "Some complexity but may still contain recognizable patterns"}</li>
          </ul>
        </div>

        <div className="border border-green-200 dark:border-green-900 rounded-lg p-5 bg-green-50 dark:bg-green-950/50">
          <h4 className="text-lg font-medium mb-3 text-green-700 dark:text-green-400">{t("strong") || "Strong"}</h4>
          <p className="mb-2 text-green-600 dark:text-green-500">{t("strong-desc-page") || "These passwords would take months to years to crack."}</p>

          <h5 className="font-medium mb-2 text-green-600 dark:text-green-500">{t("characteristics-strength") || "Characteristics"}:</h5>
          <ul className="list-disc space-y-1 pl-5 text-green-600 dark:text-green-500">
            <li>{t("strong-char-1") || "Good length (13-16 characters)"}</li>
            <li>{t("strong-char-2") || "Contains all four types of characters"}</li>
            <li>{t("strong-char-3") || "No obvious patterns or dictionary words"}</li>
          </ul>
        </div>

        <div className="border border-blue-200 dark:border-blue-900 rounded-lg p-5 bg-blue-50 dark:bg-blue-950/50">
          <h4 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">{t("very-strong") || "Very Strong"}</h4>
          <p className="mb-2 text-blue-600 dark:text-blue-500">{t("very-strong-desc-page") || "These passwords would take decades to centuries to crack with current technology."}</p>

          <h5 className="font-medium mb-2 text-blue-600 dark:text-blue-500">{t("characteristics-strength") || "Characteristics"}:</h5>
          <ul className="list-disc space-y-1 pl-5 text-blue-600 dark:text-blue-500">
            <li>{t("very-strong-char-1") || "Long (17+ characters)"}</li>
            <li>{t("very-strong-char-2") || "High complexity with all character types"}</li>
            <li>{t("very-strong-char-3") || "High entropy and randomness"}</li>
            <li>{t("very-strong-char-4") || "No recognizable patterns or words"}</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t("analyzing-metrics") || "Understanding Analysis Metrics"}</h3>

      <div className="border rounded-lg p-5 mb-8">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">{t("entropy-explained") || "Entropy (Bits)"}</h4>
            <p className="text-sm text-muted-foreground mb-2">{t("entropy-explained-desc") || "Entropy is a measure of password unpredictability, expressed in bits. Each bit of entropy doubles the number of guesses needed to find the password through brute force."}</p>

            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li><strong>{t("low-entropy") || "Low Entropy"}</strong>: &lt; 40 bits</li>
              <li><strong>{t("medium-entropy") || "Medium Entropy"}</strong>: 40-60 bits</li>
              <li><strong>{t("high-entropy") || "High Entropy"}</strong>: 60-80 bits</li>
              <li><strong>{t("very-high-entropy") || "Very High Entropy"}</strong>: &gt; 80 bits</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-1">{t("character-composition-page") || "Character Composition"}</h4>
            <p className="text-sm text-muted-foreground">{t("composition-explained-desc") || "The analyzer breaks down the types of characters in your password and shows the distribution. A well-balanced password should include a mix of different character types."}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">{t("crack-time-page") || "Estimated Crack Time"}</h4>
            <p className="text-sm text-muted-foreground">{t("crack-time-explained-desc") || "This is an estimation of how long it would take to crack your password using current technology and brute force methods. Note that this is an approximation and can vary based on the attacker's resources."}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t("improving-passwords") || "Improving Your Passwords"}</h3>

      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("improvement-intro") || "Based on the analysis, the Strength Analyzer provides personalized suggestions to improve your password:"}</p>

        <div className="space-y-4">
          <div className="flex items-start">
            <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <h4 className="font-medium">{t("length-suggestions") || "Length Suggestions"}</h4>
              <p className="text-sm text-muted-foreground">{t("length-suggestions-desc") || "If your password is too short, the analyzer will suggest increasing its length to a more secure minimum."}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <h4 className="font-medium">{t("diversity-suggestions") || "Character Diversity"}</h4>
              <p className="text-sm text-muted-foreground">{t("diversity-suggestions-desc") || "Recommendations for adding missing character types to increase complexity."}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <h4 className="font-medium">{t("pattern-warnings") || "Pattern Warnings"}</h4>
              <p className="text-sm text-muted-foreground">{t("pattern-warnings-desc") || "Alerts about detected patterns that could make your password vulnerable, such as keyboard patterns, repeating characters, or sequential numbers."}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">{t("best-practices") || "Password Best Practices"}</h3>

      <div className="border rounded-lg p-5 mb-8">
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>{t("unique-passwords") || "Use Unique Passwords"}</strong>: {t("unique-passwords-desc") || "Never reuse passwords across different websites or services."}</li>
          <li><strong>{t("length-over-complexity") || "Prioritize Length"}</strong>: {t("length-over-complexity-desc") || "When possible, choose a longer password over a shorter but more complex one."}</li>
          <li><strong>{t("avoid-personal-info") || "Avoid Personal Information"}</strong>: {t("avoid-personal-info-desc") || "Don't include names, birthdays, or other personal details that could be easily guessed."}</li>
          <li><strong>{t("use-generator") || "Use a Password Generator"}</strong>: {t("use-generator-desc") || "For maximum security, use Cryptica's password generator to create strong, random passwords."}</li>
          <li><strong>{t("use-manager") || "Use a Password Manager"}</strong>: {t("use-manager-desc") || "Store your complex passwords in a secure password manager so you don't have to memorize them."}</li>
        </ol>
      </div>

      <div className="mt-10 border-t pt-4">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("docs-back")}
        </Link>
      </div>
    </>
  );
}
