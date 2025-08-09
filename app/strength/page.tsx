"use client"

import { useEffect, useState } from "react"
import {
  Checkmark20Regular,
  Dismiss20Regular,
  Eye20Regular,
  EyeOff20Regular,
  Shield20Regular,
} from "@fluentui/react-icons"
import { Label } from "@radix-ui/react-label"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function StrengthPage() {
  const t = useTranslations()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [analysis, setAnalysis] = useState({
    lowercase: 0,
    uppercase: 0,
    numbers: 0,
    special: 0,
    length: 0,
    score: 0,
  })
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Analyze password whenever it changes
  useEffect(() => {
    analyzePassword(password)
  }, [password])
  function analyzePassword(pwd: string) {
    // Count character types
    const lowercase = (pwd.match(/[a-z]/g) || []).length
    const uppercase = (pwd.match(/[A-Z]/g) || []).length
    const numbers = (pwd.match(/[0-9]/g) || []).length
    const special = (pwd.match(/[^a-zA-Z0-9]/g) || []).length
    const length = pwd.length

    // Calculate score (simple algorithm)
    let score = 0
    if (length > 0) {
      // Base score from length (up to 40 points)
      score += Math.min(length * 4, 40)

      // Points for character variety
      if (lowercase > 0) score += 5
      if (uppercase > 0) score += 10
      if (numbers > 0) score += 10
      if (special > 0) score += 15

      // Bonus for mixed character types
      const typesUsed = [
        lowercase > 0,
        uppercase > 0,
        numbers > 0,
        special > 0,
      ].filter(Boolean).length
      score += (typesUsed - 1) * 10
    }

    // Cap at 100
    score = Math.min(score, 100)

    // Generate suggestions
    const newSuggestions = []
    if (length < 8) {
      newSuggestions.push(t("strength-suggestion-length"))
    }
    if (lowercase === 0) {
      newSuggestions.push(t("strength-suggestion-lowercase"))
    }
    if (uppercase === 0) {
      newSuggestions.push(t("strength-suggestion-uppercase"))
    }
    if (numbers === 0) {
      newSuggestions.push(t("strength-suggestion-digit"))
    }
    if (special === 0) {
      newSuggestions.push(t("strength-suggestion-special"))
    }
    if (
      length > 0 &&
      (lowercase === length ||
        uppercase === length ||
        numbers === length ||
        special === length)
    ) {
      newSuggestions.push(t("strength-suggestion-mix"))
    }

    // Check for common patterns
    if (/^[0-9]+$/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-numbers"))
    }
    if (/^[a-zA-Z]+$/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-letters"))
    }
    if (/(.)\1{2,}/.test(pwd)) {
      newSuggestions.push(t("strength-suggestion-only-repeating"))
    }

    setAnalysis({
      lowercase,
      uppercase,
      numbers,
      special,
      length,
      score,
    })

    setSuggestions(newSuggestions)
  }

  // Get color based on score
  function getStrengthColor(score: number) {
    if (score === 0) return "bg-gray-300/50"
    if (score < 30) return "bg-gradient-to-r from-red-500 to-red-600"
    if (score < 50) return "bg-gradient-to-r from-orange-500 to-orange-600"
    if (score < 70) return "bg-gradient-to-r from-yellow-500 to-yellow-600"
    if (score < 90) return "bg-gradient-to-r from-green-500 to-green-600"
    return "bg-gradient-to-r from-emerald-500 to-teal-500"
  }

  // Render password with colored characters
  function renderColoredPassword() {
    if (!password) return null

    return (
      <div className="mt-2 font-mono text-lg break-all leading-relaxed">
        {password.split("").map((char, index) => {
          let className = ""

          if (/[a-z]/.test(char)) {
            className = "text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded-md mx-0.5" // Lowercase
          } else if (/[A-Z]/.test(char)) {
            className = "text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-md mx-0.5" // Uppercase
          } else if (/[0-9]/.test(char)) {
            className = "text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md mx-0.5" // Numbers
          } else {
            className = "text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded-md mx-0.5" // Special
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  function getStrengthLabel(score: number) {
    if (score === 0) return t("unknown")
    if (score < 30) return t("very-weak")
    if (score < 50) return t("weak")
    if (score < 70) return t("moderate")
    if (score < 90) return t("strong")
    return t("very-strong")
  }
  return (
    <main>
      <div className="mb-4 flex items-center space-x-2">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-1.5">
          <Shield20Regular className="h-5 w-5 text-white" />
        </div>
        <p className="ml-2 text-xl font-bold">{t("strength")}</p>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Password Input Section */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-2xl">{t("enter-password")}</CardTitle>
            </div>
            <CardDescription className="text-base">{t("password-desc")}</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enterpwrstrength")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff20Regular className="h-5 w-5" />
                    ) : (
                      <Eye20Regular className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>

              {password && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t("advanced-vision")}</Label>
                    <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4">
                      {renderColoredPassword()}
                      <div className="mt-3 flex flex-wrap gap-3 text-sm">
                        <span className="text-blue-600 bg-blue-100/10 px-2 py-1 rounded-md">{t("lowercases")}</span>
                        <span className="text-red-600 bg-red-100/10 px-2 py-1 rounded-md">{t("uppercases")}</span>
                        <span className="text-green-600 bg-green-100/10 px-2 py-1 rounded-md">{t("nbrs")}</span>
                        <span className="text-purple-600 bg-purple-100/10 px-2 py-1 rounded-md">
                          {t("specialchars")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">
                        {t("strength")}: <span className="font-semibold">{getStrengthLabel(analysis.score)}</span>
                      </Label>
                      <span className="text-sm font-semibold">{analysis.score}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-background/80 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(analysis.score)} transition-all duration-500 ease-in-out`}
                        style={{ width: `${analysis.score}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Section - Only shown when password is entered */}
        {password && (
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-xl"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-2xl">{t("password-analysis")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("password-analysis-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-6">
                {/* Character counts */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4 transition-all hover:border-primary/30">
                    <div className="text-muted-foreground text-sm font-medium">
                      {t("length")}
                    </div>
                    <div className="text-2xl font-bold mt-1">{analysis.length}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4 transition-all hover:border-blue-500/30">
                    <div className="text-sm text-blue-600 font-medium">{t("lowercases")}</div>
                    <div className="text-2xl font-bold mt-1">{analysis.lowercase}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4 transition-all hover:border-red-500/30">
                    <div className="text-sm text-red-600 font-medium">{t("uppercases")}</div>
                    <div className="text-2xl font-bold mt-1">{analysis.uppercase}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4 transition-all hover:border-green-500/30">
                    <div className="text-sm text-green-600 font-medium">{t("nbrs")}</div>
                    <div className="text-2xl font-bold mt-1">{analysis.numbers}</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-md p-4 transition-all hover:border-purple-500/30 md:col-span-1 col-span-2">
                    <div className="text-sm text-purple-600 font-medium">
                      {t("specialchars")}
                    </div>
                    <div className="text-2xl font-bold mt-1">{analysis.special}</div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                  <h3 className="font-medium text-base">{t("strength-suggestions")}</h3>
                  {suggestions.length > 0 ? (
                    <ul className="space-y-3 mt-3">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 bg-background/80 backdrop-blur-sm border border-red-500/10 p-3 rounded-md">
                          <Dismiss20Regular className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                          <span className="text-sm">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-md mt-3">
                      <Checkmark20Regular className="h-5 w-5" />
                      <span className="text-sm font-medium">{t("strength-no-suggestions")}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State Message - Only shown when no password is entered */}
        {!password && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-background/50 backdrop-blur-sm border border-primary/10 mb-4">
              <Shield20Regular className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">{t("enter-password-to-analyze") || "Enter a password to analyze"}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("strength-analyzer-description") || "Our password strength analyzer will check your password and provide feedback on how to make it more secure."}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
