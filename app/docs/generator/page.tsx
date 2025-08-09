"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  LightbulbFilament20Regular, 
  Info20Regular,
  ShieldKeyhole20Regular,
  Password20Regular
} from "@fluentui/react-icons";

export default function PasswordGeneratorDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <Password20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("docs-password-generator")} {t("docs-guide")}</h2>
      </div>
      
      <p className="mb-6">{t("docs-password-generator-intro") || "Cryptica's password generator helps you create strong, unique passwords tailored to your specific needs. This guide explains how to use our password generator effectively and understand the technology behind it."}</p>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{t("docs-password-security") || "Password Security"}</h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">{t("docs-password-security-desc") || "Strong passwords are your first line of defense against unauthorized access. Using unique, complex passwords for each service significantly reduces your risk of being compromised."}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("docs-generation-methods") || "Password Generation Methods"}</h3>
      
      <div className="space-y-6 mb-8">
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("docs-standard-generator") || "Standard Generator"}</h4>
          <p className="mb-3">{t("docs-standard-generator-desc") || "The standard generator allows you to create passwords with customizable parameters to meet specific requirements."}</p>
          
          <h5 className="font-medium mb-2">{t("docs-how-to-use")}:</h5>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("docs-generator-step-1") || "Set your desired password length using the slider."}</li>
            <li>{t("docs-generator-step-2") || "Select the character types to include (uppercase, lowercase, numbers, special characters)."}</li>
            <li>{t("docs-generator-step-3") || "Click the Generate button to create a new password."}</li>
            <li>{t("docs-generator-step-4") || "Use the Copy button to copy the password to your clipboard."}</li>
          </ol>
          
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">{t("docs-pro-tip") || "Pro Tip"}:</p>
            <p className="text-sm">{t("docs-generator-tip") || "For maximum security, use all character types and a length of at least 16 characters."}</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("strength-based-generator") || "Strength-Based Generator"}</h4>
          <p className="mb-3">{t("strength-based-desc") || "Let Cryptica automatically determine the appropriate parameters based on your desired security level."}</p>
          
          <h5 className="font-medium mb-2">{t("strength-levels") || "Strength Levels"}:</h5>
          <ul className="list-disc space-y-2 pl-5 mb-4">
            <li><strong>{t("moderate") || "Moderate"}</strong>: {t("moderate-desc") || "Good for less critical accounts, 10-12 characters with some complexity."}</li>
            <li><strong>{t("strong") || "Strong"}</strong>: {t("strong-desc") || "Recommended for most accounts, 14-16 characters with good complexity."}</li>
            <li><strong>{t("very-strong") || "Very Strong"}</strong>: {t("very-strong-desc") || "For high-security needs, 18+ characters with maximum complexity."}</li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("ai-generator") || "AI-Assisted Generator"}</h4>
          <p className="mb-3">{t("ai-generator-desc") || "Create memorable yet secure passwords with the help of AI."}</p>
          
          <h5 className="font-medium mb-2">{t("how-it-works") || "How It Works"}:</h5>
          <p className="mb-3">{t("ai-generator-explanation") || "Our AI generator creates passwords that are both strong and memorable by generating thematic passwords based on prompts. You can provide your own prompt or use one of our random suggestions."}</p>
          
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">{t("important-note") || "Important Note"}:</p>
            <p className="text-sm">{t("ai-generator-note") || "While AI-generated passwords are designed to be more memorable, they still maintain strong security standards. The AI never stores your generated passwords."}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("password-presets") || "Using Password Presets"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("presets-desc") || "Password presets allow you to save your preferred generation settings for quick access."}</p>
        
        <h5 className="font-medium mb-2">{t("managing-presets") || "Managing Presets"}:</h5>
        <ol className="list-decimal space-y-2 pl-5 mb-4">
          <li>{t("preset-step-1") || "Create a preset by configuring your desired settings and clicking 'Save as Preset'."}</li>
          <li>{t("preset-step-2") || "Access your saved presets from the Presets page or the dropdown in the generator."}</li>
          <li>{t("preset-step-3") || "Edit or delete presets as needed to keep your collection organized."}</li>
        </ol>
        
        <p className="text-sm text-muted-foreground">{t("preset-tip") || "Tip: Create different presets for different types of websites or services based on their specific password requirements."}</p>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("password-analysis") || "Password Analysis"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("analysis-desc") || "Cryptica provides real-time analysis of your generated passwords to help you understand their strength."}</p>
        
        <h5 className="font-medium mb-2">{t("analysis-metrics") || "Analysis Metrics"}:</h5>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>{t("entropy") || "Entropy"}</strong>: {t("entropy-desc") || "A measure of password randomness and unpredictability, measured in bits."}</li>
          <li><strong>{t("character-composition") || "Character Composition"}</strong>: {t("composition-desc") || "Breakdown of the types of characters used in the password."}</li>
          <li><strong>{t("strength-score") || "Strength Score"}</strong>: {t("score-desc") || "Overall rating of the password's security on a scale from Very Weak to Very Strong."}</li>
          <li><strong>{t("crack-time") || "Estimated Crack Time"}</strong>: {t("crack-time-desc") || "Approximate time it would take for a typical attack to guess the password."}</li>
        </ul>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("technical-details") || "Technical Details"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("technical-details-desc") || "For those interested in the technical implementation, Cryptica's password generator uses:"}</p>
        
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("tech-detail-1") || "Cryptographically secure random number generation"}</li>
          <li>{t("tech-detail-2") || "Advanced entropy calculation based on NIST guidelines"}</li>
          <li>{t("tech-detail-3") || "Password strength evaluation using multiple factors including length, character set size, and composition"}</li>
          <li>{t("tech-detail-4") || "For AI-assisted generation: secure API calls with no password storage"}</li>
        </ul>
      </div>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("docs-back")}
        </Link>
      </div>
    </>
  );
}
