

"use client";

import { checkPasswordBreach } from "@/lib/breaches";
import { getPasswordStrength, getStrengthInfo, PasswordStrength } from "@/lib/password";

// Crack time estimation utility
function estimateCrackTime(entropy: number): { time: string, scenario: string }[] {
  // Entropy in bits, guesses = 2^entropy
  const guesses = Math.pow(2, entropy);
  // Guesses per second for different attack scenarios
  const scenarios = [
    { label: "Offline fast attack (10B/sec)", rate: 1e10 },
    { label: "Offline slow attack (100K/sec)", rate: 1e5 },
    { label: "Online attack (100/sec)", rate: 100 },
    { label: "Online throttled (1/sec)", rate: 1 },
  ];
  return scenarios.map(s => {
    const seconds = guesses / s.rate;
    let time;
    if (seconds < 60) time = `${seconds.toFixed(2)} seconds`;
    else if (seconds < 3600) time = `${(seconds/60).toFixed(2)} minutes`;
    else if (seconds < 86400) time = `${(seconds/3600).toFixed(2)} hours`;
    else if (seconds < 31536000) time = `${(seconds/86400).toFixed(2)} days`;
    else if (seconds < 31536000*100) time = `${(seconds/31536000).toFixed(2)} years`;
    else time = `centuries+`;
    return { time, scenario: s.label };
  });
}
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy20Regular, Dismiss20Regular, Info20Regular, ArrowSync20Regular } from "@fluentui/react-icons";



// Helper for local history (hash only, not plain text)
function sha1HexSync(str: string): string {
  // Use a simple sync hash for localStorage key (not cryptographically secure, but fine for local history)
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash.toString(16);
}


type BreachHistoryItem = { hash: string; count: number; checked: string };
const HISTORY_KEY = "breach-history-v1";

function loadHistory(): BreachHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(history: BreachHistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

const FAQ = [
  {
    q: "What is a password breach?",
    a: "A password breach means your password was found in a public database of leaked credentials, often from hacked websites. If your password is breached, it is unsafe to use!"
  },
  {
    q: "What should I do if my password is breached?",
    a: "Immediately change your password everywhere you used it. Use a unique, strong password for each account."
  },
  {
    q: "How does this tool work?",
    a: "We use the HaveIBeenPwned API, which checks your password using a privacy-preserving method (k-Anonymity). Your full password is never sent to any server."
  },
  {
    q: "What is a strong password?",
    a: "A strong password is long, random, and uses a mix of letters, numbers, and symbols. Avoid using the same password for multiple sites."
  },
  {
    q: "What is the dark web?",
    a: "The dark web is a part of the internet not indexed by search engines, where stolen data (including passwords) is often traded."
  },
];

export default function BreachesTool() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoClear, setAutoClear] = useState(true);
  const [history, setHistory] = useState<BreachHistoryItem[]>([]);
  const [showCopied, setShowCopied] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Password analysis
  const strength = getPasswordStrength(password);
  const analysis = getStrengthInfo(password);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setRateLimit(false);
    try {
      const count = await checkPasswordBreach(password);
      setResult(count);
      // Save to history (hash only)
      const hash = sha1HexSync(password);
      const now = new Date().toISOString();
      const newEntry = { hash, count, checked: now };
      const newHistory = [newEntry, ...history.filter(h => h.hash !== hash)].slice(0, 10);
      setHistory(newHistory);
      saveHistory(newHistory);
      if (autoClear) setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error && err.message?.includes("rate limit")) setRateLimit(true);
      setError("Failed to check password. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1500);
  }

  function handleGenerate() {
    // For demo: generate a strong password (could use your generator UI)
    const chars = {
      lowerCases: "abcdefghijklmnopqrstuvwxyz",
      upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };
    const newPwd = Array.from({length: 16}, () => chars.lowerCases + chars.upperCases + chars.numbers + chars.special)
      .map(set => set[Math.floor(Math.random() * set.length)]).join("");
    setPassword(newPwd);
    if (inputRef.current) inputRef.current.focus();
  }

  function getStrengthLabel(s: PasswordStrength) {
    switch (s) {
      case PasswordStrength.VeryWeak: return "Very Weak";
      case PasswordStrength.Weak: return "Weak";
      case PasswordStrength.Moderate: return "Moderate";
      case PasswordStrength.Strong: return "Strong";
      case PasswordStrength.VeryStrong: return "Very Strong";
      default: return "";
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[60vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Breach Checker</CardTitle>
          <CardDescription>
            Check if your password has been found in public data breaches using HaveIBeenPwned.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleCheck} autoComplete="off" aria-label="Password breach check form">
          <CardContent className="flex flex-col gap-4">
            <Label htmlFor="breach-password">Password</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="breach-password"
                ref={inputRef}
                type="password"
                placeholder="Enter password to check..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                aria-label="Password to check"
              />
              <Button type="button" variant="outline" size="icon" aria-label="Copy password" onClick={handleCopy} disabled={!password}>
                <Copy20Regular />
              </Button>
              <Button type="button" variant="outline" size="icon" aria-label="Generate password" onClick={handleGenerate}>
                <ArrowSync20Regular />
              </Button>
            </div>
            {showCopied && <div className="text-xs text-muted-foreground">Copied to clipboard! (Be careful with clipboard safety.)</div>}
            <div className="flex items-center gap-2 mt-2" aria-label="Password strength meter">
              <div className="flex-1 h-2 rounded bg-muted overflow-hidden">
                <div
                  className={`h-2 rounded transition-all ${
                    strength === PasswordStrength.VeryWeak ? "bg-red-500 w-1/5" :
                    strength === PasswordStrength.Weak ? "bg-orange-400 w-2/5" :
                    strength === PasswordStrength.Moderate ? "bg-yellow-400 w-3/5" :
                    strength === PasswordStrength.Strong ? "bg-green-500 w-4/5" :
                    strength === PasswordStrength.VeryStrong ? "bg-blue-500 w-full" : "bg-muted w-0"
                  }`}
                  aria-valuenow={analysis.score}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  role="progressbar"
                />
              </div>
              <span className="text-xs font-medium min-w-[70px]">{getStrengthLabel(strength)}</span>
            </div>
            {/* Crack time estimator */}
            {password && (
              <div className="mt-2 text-xs text-muted-foreground">
                <div className="font-semibold mb-1">Estimated crack time:</div>
                <ul className="list-disc ml-4">
                  {estimateCrackTime(analysis.entropy).map((row, i) => (
                    <li key={i}><span className="font-mono text-foreground">{row.time}</span> <span className="text-muted-foreground">({row.scenario})</span></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Length: <span className="font-semibold text-foreground">{analysis.length}</span></div>
              <div>Entropy: <span className="font-semibold text-foreground">{analysis.entropy} bits</span></div>
              <div>Lowercase: <span className="font-semibold text-foreground">{analysis.lowercase}</span></div>
              <div>Uppercase: <span className="font-semibold text-foreground">{analysis.uppercase}</span></div>
              <div>Numbers: <span className="font-semibold text-foreground">{analysis.numbers}</span></div>
              <div>Special: <span className="font-semibold text-foreground">{analysis.special}</span></div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input id="auto-clear" type="checkbox" checked={autoClear} onChange={e => setAutoClear(e.target.checked)} />
              <Label htmlFor="auto-clear" className="text-xs">Auto-clear password after check</Label>
            </div>
            {error && <div className="text-destructive text-sm mt-1" role="alert">{error}</div>}
            {rateLimit && <div className="text-orange-500 text-xs">You are checking too quickly. Please wait and try again.</div>}
            {result !== null && (
              <div className="mt-2">
                {result > 0 ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-destructive font-semibold">
                      This password has been found in {result.toLocaleString()} breaches!
                    </span>
                    <span className="text-xs text-muted-foreground">It is unsafe to use this password. Generate a new one below.</span>
                    <Button type="button" variant="destructive" onClick={handleGenerate} className="w-full">Generate New Password</Button>
                  </div>
                ) : (
                  <span className="text-green-600 font-semibold">
                    This password was NOT found in any known breaches.
                  </span>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button type="submit" disabled={loading || !password} className="w-full mt-2">
              {loading ? "Checking..." : "Check Breach"}
            </Button>
            <Button type="button" variant="ghost" size="sm" className="mt-1 flex items-center gap-1" onClick={() => setShowFAQ(v => !v)} aria-expanded={showFAQ} aria-controls="faq-section">
              <Info20Regular /> Learn more about breaches
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* History */}
      {history.length > 0 && (
        <Card className="w-full max-w-md mt-6">
          <CardHeader>
            <CardTitle className="text-base">Recent Checks</CardTitle>
            <CardDescription>Only the hash of your password is stored locally for privacy.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {history.map((h, i) => (
              <div key={h.hash} className="flex items-center justify-between text-xs border-b last:border-b-0 py-2">
                <span className="truncate max-w-[120px]" title={h.hash}>...{h.hash.slice(-8)}</span>
                <span>{h.count > 0 ? `${h.count} breaches` : "No breach"}</span>
                <span className="text-muted-foreground">{new Date(h.checked).toLocaleString()}</span>
                <Button type="button" size="icon" variant="ghost" aria-label="Remove from history" onClick={() => {
                  const newHistory = history.filter((_, idx) => idx !== i);
                  setHistory(newHistory);
                  saveHistory(newHistory);
                }}><Dismiss20Regular /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {/* FAQ / Learn More */}
      {showFAQ && (
        <Card className="w-full max-w-md mt-6" id="faq-section">
          <CardHeader>
            <CardTitle className="text-base">FAQ & Learn More</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {FAQ.map((item, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{item.q}</div>
                <div className="text-sm text-muted-foreground">{item.a}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
