"use client"

import { useTranslations } from "next-intl"

export interface PasswordAnalysisProps {
  generatedPassword: string
}

export default function PasswordAnalysis(props: PasswordAnalysisProps) {
  const t = useTranslations()
  const { generatedPassword } = props
  // Render password in a normal white monospace style
  function renderColoredPassword() {
    if (!generatedPassword) return null

    return (
      <div className="mt-2 font-mono text-lg break-all text-white">
        {generatedPassword.split("").map((char, index) => (
          <span key={index} className="text-white">
            {char}
          </span>
        ))}
      </div>
    )
  }
  return (
    <div className="bg-secondary dark:bg-primary-foreground rounded-md p-3">
      {renderColoredPassword()}
    </div>
  )
}
