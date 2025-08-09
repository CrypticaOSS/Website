"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  HelpCircle,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  Trash2,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { checkPasswordBreach } from "@/lib/breaches"
import {
  getPasswordStrength,
  getStrengthInfo,
  PasswordStrength,
} from "@/lib/password"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Crack time estimation utility
function estimateCrackTime(
  entropy: number
): { time: string; scenario: string }[] {
  // Entropy in bits, guesses = 2^entropy
  const guesses = Math.pow(2, entropy)
  // Guesses per second for different attack scenarios
  const scenarios = [
    { label: "Offline fast attack (10B/sec)", rate: 1e10 },
    { label: "Offline slow attack (100K/sec)", rate: 1e5 },
    { label: "Online attack (100/sec)", rate: 100 },
    { label: "Online throttled (1/sec)", rate: 1 },
  ]
  return scenarios.map((s) => {
    const seconds = guesses / s.rate
    let time
    if (seconds < 60) time = `${seconds.toFixed(2)} seconds`
    else if (seconds < 3600) time = `${(seconds / 60).toFixed(2)} minutes`
    else if (seconds < 86400) time = `${(seconds / 3600).toFixed(2)} hours`
    else if (seconds < 31536000) time = `${(seconds / 86400).toFixed(2)} days`
    else if (seconds < 31536000 * 100)
      time = `${(seconds / 31536000).toFixed(2)} years`
    else time = `centuries+`
    return { time, scenario: s.label }
  })
}

// Helper for local history (hash only, not plain text)
function sha1HexSync(str: string): string {
  // Use a simple sync hash for localStorage key (not cryptographically secure, but fine for local history)
  let hash = 0,
    i,
    chr
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash.toString(16)
}

type BreachHistoryItem = { hash: string; count: number; checked: string }
const HISTORY_KEY = "breach-history-v1"

function loadHistory(): BreachHistoryItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")
  } catch {
    return []
  }
}

function saveHistory(history: BreachHistoryItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

const FAQ = [
  {
    q: "What is a password breach?",
    a: "A password breach means your password was found in a public database of leaked credentials, often from hacked websites. If your password is breached, it is unsafe to use!",
  },
  {
    q: "What should I do if my password is breached?",
    a: "Immediately change your password everywhere you used it. Use a unique, strong password for each account.",
  },
  {
    q: "How does this tool work?",
    a: "We use the HaveIBeenPwned API, which checks your password using a privacy-preserving method (k-Anonymity). Your full password is never sent to any server.",
  },
  {
    q: "What is a strong password?",
    a: "A strong password is long, random, and uses a mix of letters, numbers, and symbols. Avoid using the same password for multiple sites.",
  },
  {
    q: "What is the dark web?",
    a: "The dark web is a part of the internet not indexed by search engines, where stolen data (including passwords) is often traded.",
  },
]

export default function BreachesTool() {
  const [password, setPassword] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [autoClear, setAutoClear] = useState(true)
  const [history, setHistory] = useState<BreachHistoryItem[]>([])
  const [showCopied, setShowCopied] = useState(false)
  const [rateLimit, setRateLimit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  // Password analysis
  const strength = getPasswordStrength(password)
  const analysis = getStrengthInfo(password)

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)
    setRateLimit(false)
    try {
      const count = await checkPasswordBreach(password)
      setResult(count)
      // Save to history (hash only)
      const hash = sha1HexSync(password)
      const now = new Date().toISOString()
      const newEntry = { hash, count, checked: now }
      const newHistory = [
        newEntry,
        ...history.filter((h) => h.hash !== hash),
      ].slice(0, 10)
      setHistory(newHistory)
      saveHistory(newHistory)
      if (autoClear) setPassword("")
    } catch (err: unknown) {
      if (err instanceof Error && err.message?.includes("rate limit"))
        setRateLimit(true)
      setError("Failed to check password. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!password) return
    navigator.clipboard.writeText(password)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 1500)
  }

  function handleGenerate() {
    // For demo: generate a strong password (could use your generator UI)
    const chars = {
      lowerCases: "abcdefghijklmnopqrstuvwxyz",
      upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    }
    const newPwd = Array.from(
      { length: 16 },
      () => chars.lowerCases + chars.upperCases + chars.numbers + chars.special
    )
      .map((set) => set[Math.floor(Math.random() * set.length)])
      .join("")
    setPassword(newPwd)
    if (inputRef.current) inputRef.current.focus()
  }

  function getStrengthLabel(s: PasswordStrength) {
    switch (s) {
      case PasswordStrength.VeryWeak:
        return "Very Weak"
      case PasswordStrength.Weak:
        return "Weak"
      case PasswordStrength.Moderate:
        return "Moderate"
      case PasswordStrength.Strong:
        return "Strong"
      case PasswordStrength.VeryStrong:
        return "Very Strong"
      default:
        return ""
    }
  }

  const t = useTranslations()

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <div className="rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-1.5">
          <ShieldAlert className="h-5 w-5 text-white" />
        </div>
        <p className="ml-2 text-xl font-bold">
          {t("breaches") || "Password Breach Checker"}
        </p>
      </div>

      <Tabs defaultValue="checker" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checker" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5 opacity-0 transition-opacity group-data-[state=active]:opacity-100"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Check Password
            </span>
          </TabsTrigger>
          <TabsTrigger value="history" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity group-data-[state=active]:opacity-100"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Recent Checks
            </span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-yellow-500/5 opacity-0 transition-opacity group-data-[state=active]:opacity-100"></div>
            <span className="relative z-10 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Password Breach Checker Tab */}
        <TabsContent value="checker" className="mt-6">
          <Card className="bg-card/50 relative overflow-hidden border-0 shadow-lg backdrop-blur-sm">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-red-500/80 to-orange-500/80 p-1.5">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">
                  {t("breaches-tool-title") || "Password Breach Checker"}
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                Check if your password has been found in public data breaches
                using HaveIBeenPwned.
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={handleCheck}
              autoComplete="off"
              aria-label="Password breach check form"
            >
              <CardContent className="relative z-10 flex flex-col gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="breach-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <Input
                        id="breach-password"
                        ref={inputRef}
                        type="password"
                        placeholder="Enter password to check..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        aria-label="Password to check"
                        className="bg-background/80 border-primary/10 focus:border-primary/30 h-12 backdrop-blur-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Copy password"
                      onClick={handleCopy}
                      disabled={!password}
                      className="bg-background/80 border-primary/10 hover:border-primary/30 h-12 w-12 backdrop-blur-sm"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Generate password"
                      onClick={handleGenerate}
                      className="bg-background/80 border-primary/10 hover:border-primary/30 h-12 w-12 backdrop-blur-sm"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {showCopied && (
                  <div className="bg-primary/10 text-primary flex items-center gap-1.5 rounded px-2 py-1 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Copied to clipboard! (Be careful with clipboard safety.)
                  </div>
                )}

                {password && (
                  <div className="bg-background/50 border-primary/10 rounded-lg border p-4 backdrop-blur-sm">
                    <div className="mb-1.5 flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Password Strength
                      </Label>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          strength === PasswordStrength.VeryWeak
                            ? "bg-red-100/10 text-red-500"
                            : strength === PasswordStrength.Weak
                              ? "bg-orange-100/10 text-orange-500"
                              : strength === PasswordStrength.Moderate
                                ? "bg-yellow-100/10 text-yellow-500"
                                : strength === PasswordStrength.Strong
                                  ? "bg-green-100/10 text-green-500"
                                  : "bg-blue-100/10 text-blue-500"
                        }`}
                      >
                        {getStrengthLabel(strength)}
                      </span>
                    </div>

                    <div className="bg-background/80 mb-4 h-2.5 w-full overflow-hidden rounded-full">
                      <div
                        className={`h-full rounded transition-all duration-500 ease-in-out ${
                          strength === PasswordStrength.VeryWeak
                            ? "w-1/5 bg-gradient-to-r from-red-500 to-red-600"
                            : strength === PasswordStrength.Weak
                              ? "w-2/5 bg-gradient-to-r from-orange-400 to-orange-600"
                              : strength === PasswordStrength.Moderate
                                ? "w-3/5 bg-gradient-to-r from-yellow-400 to-yellow-500"
                                : strength === PasswordStrength.Strong
                                  ? "w-4/5 bg-gradient-to-r from-green-400 to-green-600"
                                  : strength === PasswordStrength.VeryStrong
                                    ? "w-full bg-gradient-to-r from-blue-400 to-blue-600"
                                    : "w-0"
                        }`}
                        aria-valuenow={analysis.score}
                        aria-valuemax={100}
                        aria-valuemin={0}
                        role="progressbar"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      <div className="bg-background/80 border-primary/10 hover:border-primary/30 rounded-md border p-2 backdrop-blur-sm transition-colors">
                        <div className="text-muted-foreground text-xs">
                          Length
                        </div>
                        <div className="font-semibold">{analysis.length}</div>
                      </div>
                      <div className="bg-background/80 border-primary/10 hover:border-primary/30 rounded-md border p-2 backdrop-blur-sm transition-colors">
                        <div className="text-muted-foreground text-xs">
                          Entropy
                        </div>
                        <div className="font-semibold">
                          {analysis.entropy} bits
                        </div>
                      </div>
                      <div className="bg-background/80 rounded-md border border-blue-500/10 p-2 backdrop-blur-sm transition-colors hover:border-blue-500/30">
                        <div className="text-xs text-blue-500">Lowercase</div>
                        <div className="font-semibold">
                          {analysis.lowercase}
                        </div>
                      </div>
                      <div className="bg-background/80 rounded-md border border-red-500/10 p-2 backdrop-blur-sm transition-colors hover:border-red-500/30">
                        <div className="text-xs text-red-500">Uppercase</div>
                        <div className="font-semibold">
                          {analysis.uppercase}
                        </div>
                      </div>
                      <div className="bg-background/80 rounded-md border border-green-500/10 p-2 backdrop-blur-sm transition-colors hover:border-green-500/30">
                        <div className="text-xs text-green-500">Numbers</div>
                        <div className="font-semibold">{analysis.numbers}</div>
                      </div>
                      <div className="bg-background/80 rounded-md border border-purple-500/10 p-2 backdrop-blur-sm transition-colors hover:border-purple-500/30">
                        <div className="text-xs text-purple-500">Special</div>
                        <div className="font-semibold">{analysis.special}</div>
                      </div>
                    </div>

                    <Separator className="bg-primary/10 my-4" />

                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Estimated crack time:
                      </h4>
                      <ul className="space-y-1.5">
                        {estimateCrackTime(analysis.entropy).map((row, i) => (
                          <li
                            key={i}
                            className="bg-background/50 flex items-center justify-between rounded-md p-2 text-xs"
                          >
                            <span className="text-muted-foreground">
                              {row.scenario}
                            </span>
                            <span className="font-mono font-medium">
                              {row.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="auto-clear"
                    checked={autoClear}
                    onCheckedChange={(checked) =>
                      setAutoClear(checked === true)
                    }
                  />
                  <Label htmlFor="auto-clear" className="text-sm">
                    Auto-clear password after check
                  </Label>
                </div>
                {error && (
                  <div
                    className="bg-destructive/10 border-destructive/30 text-destructive flex items-start gap-2 rounded-md border px-3 py-2 text-sm"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {rateLimit && (
                  <div className="flex items-start gap-2 rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-sm text-orange-500">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>
                      You are checking too quickly. Please wait and try again.
                    </span>
                  </div>
                )}

                {result !== null && (
                  <div className="mt-4">
                    {result > 0 ? (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-red-500/20 p-2">
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1 font-semibold text-red-500">
                              This password has been found in{" "}
                              {result.toLocaleString()} breaches!
                            </h4>
                            <p className="text-muted-foreground mb-3 text-sm">
                              It is unsafe to use this password. This password
                              has been exposed in data breaches and should not
                              be used for any accounts.
                            </p>
                            <Button
                              type="button"
                              onClick={handleGenerate}
                              className="group relative w-full overflow-hidden"
                            >
                              <span className="via-primary absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Generate New Password
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-500">
                            This password was NOT found in any known breaches.
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            However, always use unique passwords for different
                            accounts.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="relative z-10 flex flex-col items-start gap-2 pt-2 pb-6">
                <Button
                  type="submit"
                  disabled={loading || !password}
                  className="group relative w-full overflow-hidden py-6 text-base"
                  size="lg"
                >
                  <span className="via-primary absolute inset-0 h-full w-full bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Check Breach
                      </>
                    )}
                  </span>
                </Button>
              </CardFooter>
            </form>
          </Card>

          {result !== null && (
            <Card className="bg-card/50 relative mt-6 overflow-hidden border-0 shadow-lg backdrop-blur-sm">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5"></div>
              <CardHeader className="relative z-10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-br from-blue-500/80 to-violet-500/80 p-1.5">
                    {result > 0 ? (
                      <ShieldAlert className="h-4 w-4 text-white" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-base">
                    {result > 0 ? "Password Compromised" : "Password Secure"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <p className="text-muted-foreground mb-3 text-sm">
                  {result > 0
                    ? `Your password was found in ${result.toLocaleString()} data breaches. It should be changed immediately on any site where you use it.`
                    : "Your password appears to be secure and hasn't been found in any known data breaches."}
                </p>
                <div className="bg-background/50 border-primary/10 rounded-md border p-2 text-xs backdrop-blur-sm">
                  <p className="mb-1 font-medium">Security Tips:</p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>Use a unique password for each account</li>
                    <li>Include uppercase, lowercase, numbers, and symbols</li>
                    <li>Aim for at least 12 characters in length</li>
                    <li>Consider using a password manager</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recent Checks Tab */}
        <TabsContent value="history" className="mt-6">
          <Card className="bg-card/50 relative overflow-hidden border-0 shadow-lg backdrop-blur-sm">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="mb-1 flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-blue-500/80 to-purple-500/80 p-1.5">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Recent Checks</CardTitle>
              </div>
              <CardDescription>
                Only the hash of your password is stored locally for privacy.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {history.length > 0 ? (
                <div className="border-primary/10 bg-background/50 overflow-hidden rounded-md border backdrop-blur-sm">
                  {history.map((h, i) => (
                    <div
                      key={h.hash}
                      className="border-primary/10 hover:bg-primary/5 flex items-center justify-between border-b px-3 py-2.5 text-xs transition-colors last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        {h.count > 0 ? (
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        )}
                        <span className="font-mono" title={h.hash}>
                          ...{h.hash.slice(-8)}
                        </span>
                      </div>
                      <span
                        className={
                          h.count > 0
                            ? "font-medium text-red-500"
                            : "font-medium text-green-500"
                        }
                      >
                        {h.count > 0
                          ? `${h.count.toLocaleString()} breaches`
                          : "No breach"}
                      </span>
                      <span className="text-muted-foreground hidden sm:inline">
                        {new Date(h.checked).toLocaleString()}
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        aria-label="Remove from history"
                        onClick={() => {
                          const newHistory = history.filter(
                            (_, idx) => idx !== i
                          )
                          setHistory(newHistory)
                          saveHistory(newHistory)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-muted/20 mb-3 rounded-full p-3">
                    <Search className="text-muted-foreground h-6 w-6" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    No check history yet
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Check a password to see your history here
                  </p>
                </div>
              )}
            </CardContent>
            {history.length > 0 && (
              <CardFooter className="relative z-10 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    setHistory([])
                    saveHistory([])
                  }}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Clear History
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6">
          <Card className="bg-card/50 relative overflow-hidden border-0 shadow-lg backdrop-blur-sm">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="mb-1 flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-amber-500/80 to-yellow-500/80 p-1.5">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">FAQ & Learn More</CardTitle>
              </div>
              <CardDescription>
                Important information about password breaches and security.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <div
                    key={i}
                    className="border-primary/10 bg-background/50 hover:border-primary/20 rounded-md border p-3 backdrop-blur-sm transition-colors"
                  >
                    <div className="mb-1 text-sm font-medium">{item.q}</div>
                    <div className="text-muted-foreground text-sm">
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 relative mt-6 overflow-hidden border-0 shadow-lg backdrop-blur-sm">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5"></div>
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-br from-blue-500/80 to-green-500/80 p-1.5">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-base">
                  Password Security Best Practices
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <div className="space-y-4">
                <div className="bg-background/50 border-primary/10 rounded-md border p-3 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium">
                    Use a Password Manager
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Password managers help you create and store unique, strong
                    passwords for all your accounts. They encrypt your passwords
                    and can automatically fill them in, making it easy to use
                    different complex passwords for each site.
                  </p>
                </div>

                <div className="bg-background/50 border-primary/10 rounded-md border p-3 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium">
                    Enable Two-Factor Authentication (2FA)
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security by enabling 2FA wherever
                    possible. Even if your password is compromised, attackers
                    would still need the second factor (like a code from your
                    phone) to access your account.
                  </p>
                </div>

                <div className="bg-background/50 border-primary/10 rounded-md border p-3 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium">
                    Regularly Check for Breaches
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Make it a habit to periodically check if your passwords have
                    been part of data breaches. Services like HaveIBeenPwned can
                    alert you when your email appears in new breaches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
