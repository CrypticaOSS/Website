"use client"

import { useState } from "react"
import Link from "next/link"
import { usePresets } from "@/hooks/use-presets"
import { useSettings } from "@/hooks/use-settings"
import {
  Add16Regular,
  ArrowClockwise20Regular,
  ArrowDownload16Regular,
  ArrowDownload20Regular,
  BrainCircuit20Regular,
  Checkmark20Regular,
  CheckmarkCircle20Regular,
  Copy20Regular,
  Dismiss16Regular,
  Eye20Regular,
  EyeOff20Regular,
  Info16Regular,
  LightbulbFilament48Regular,
  LockClosed20Regular,
  Settings20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons"
import { Close, DialogClose } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import OpenAI from "openai"
import { toast } from "sonner"

import { addActivity } from "@/lib/browser-storage"
import {
  generatePassword,
  generatePasswordByStrength,
  generatePasswordUsingPreset,
  getRandomPrompt,
  getStrengthInfo,
  PasswordPreset,
} from "@/lib/password"
import PasswordAnalysis from "@/components/password-analysis"
import PasswordStats from "@/components/password-stats"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function GeneratePage() {
  const { settings, setSettings } = useSettings()

  const t = useTranslations()
  const lang = t("lang")
  const [generatedPassword, setGeneratedPassword] = useState(
    generatePasswordByStrength(2, settings.customChars)
  )
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)
  const [passwordStats, setPasswordStats] = useState(
    getStrengthInfo(generatedPassword)
  )

  // Simple generator state
  const [strengthLevel, setStrengthLevel] = useState(2) // 0-4

  // Advanced generator state
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecial, setIncludeSpecial] = useState(true)

  const [numberOfPasswords, setNumberOfPasswords] = useState(1)
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([])

  // AI generator state
  const [apiKey, setApiKey] = useState("")
  const [promptText, setPromptText] = useState("")
  const [aiPasswords, setAiPasswords] = useState<string[]>([])
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)

  const [csvSeparator, setCsvSeparator] = useState("colon")

  // Get color based on score
  function getStrengthColor(score: number) {
    if (score === 0) return "bg-gray-200"
    if (score < 30) return "bg-red-500"
    if (score < 50) return "bg-orange-500"
    if (score < 70) return "bg-yellow-500"
    if (score < 90) return "bg-green-500"
    return "bg-emerald-500"
  }

  function getStrengthLabel(score: number) {
    if (score === 0) return t("unknown")
    if (score < 30) return t("very-weak")
    if (score < 50) return t("weak")
    if (score < 70) return t("moderate")
    if (score < 90) return t("strong")
    return t("very-strong")
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast(t("copied-title"), {
      description: t("copied-to-clipboard"),
    })
  }

  function copyAllPasswords() {
    const allPasswords = generatedPasswords.join("\n")
    navigator.clipboard.writeText(allPasswords)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast(t("copied-all-title"), {
      description: t("copied-all", { amount: generatedPasswords.length }),
    })
  }

  function copyPasswordAtIndex(index: number) {
    if (generatedPasswords[index]) {
      navigator.clipboard.writeText(generatedPasswords[index])
      toast(t("copied-title"), {
        description: t("copy-password-index", { index: index + 1 }),
      })
    }
  }

  function generateSimplePassword() {
    const pwr = generatePasswordByStrength(strengthLevel, settings.customChars)
    setGeneratedPassword(pwr)
    setPasswordStats(getStrengthInfo(pwr))
    addActivity({ date: new Date(), content: pwr })
    toast(t("generated-title"), {
      description: t("generated-desc", { length: pwr.length }),
    })
  }

  // Get time to crack estimate
  function getTimeToCrack(entropy: number) {
    // Assuming 10 billion guesses per second (modern hardware)
    const guessesPerSecond = 10000000000
    const seconds = Math.pow(2, entropy) / guessesPerSecond

    if (seconds < 60) return t("instantly")
    if (seconds < 3600) return `${Math.round(seconds / 60)} ${t("minutes")}`
    if (seconds < 86400) return `${Math.round(seconds / 3600)} ${t("hours")}`
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} ${t("days")}`
    if (seconds < 31536000 * 100)
      return `${Math.round(seconds / 31536000)} ${t("years")}`
    if (seconds < 31536000 * 1000)
      return `${Math.round(seconds / 31536000 / 100)} ${t("centuries")}`
    return t("millions-of-years")
  }

  function optionsChecked() {
    return (
      includeLowercase || includeUppercase || includeNumbers || includeSpecial
    )
  }

  function generateAdvancedPassword() {
    if (!optionsChecked()) return

    if (numberOfPasswords > 1) {
      const passwords = []
      for (let i = 0; i < numberOfPasswords; i++) {
        const pwr = selectedPreset
          ? generatePasswordUsingPreset(selectedPreset, settings.customChars)
          : generatePassword(
              includeLowercase,
              includeUppercase,
              includeNumbers,
              includeSpecial,
              passwordLength,
              settings.customChars
            )
        passwords.push(pwr)
        addActivity({ date: new Date(), content: pwr })
      }
      setGeneratedPasswords(passwords)
      setGeneratedPassword(passwords[0] || "")
      setPasswordStats(getStrengthInfo(passwords[0] || ""))
    } else {
      const pwr = selectedPreset
        ? generatePasswordUsingPreset(selectedPreset, settings.customChars)
        : generatePassword(
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSpecial,
            passwordLength,
            settings.customChars
          )
      setGeneratedPassword(pwr)
      setPasswordStats(getStrengthInfo(pwr))
      addActivity({ date: new Date(), content: pwr })
      toast(t("generated-title"), {
        description: t("generated-desc", { length: pwr.length }),
      })
    }
  }

  function getRandomLength() {
    const min = settings.passwordLengthOne
    const max = settings.passwordLengthTwo
    setPasswordLength(Math.floor(Math.random() * (max - min)) + min)
  }

  const [showAI, setShowAI] = useState(
    !(
      settings.openaiKey == null ||
      settings.openaiKey == undefined ||
      settings.openaiKey == ""
    )
  )

  async function generateAiPassword() {
    setIsGeneratingAi(true)
    const openai = new OpenAI({
      apiKey: settings.openaiKey,
      dangerouslyAllowBrowser: true,
    })
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'GOAL: Generate ONLY 3 complex passwords according to the user prompt.\nOUTPUT: Use the following format (JSON array):\n{"passwords": ["", "", ""]}',
          },
          {
            role: "user",
            content: promptText,
          },
        ],
      })
      const res = completion.choices[0].message.content
      const obj = JSON.parse(res ?? "{}")
      if (!Array.isArray(obj.passwords)) {
        setAiPasswords(["An error has occurred, please try again"])
        return
      }
      setAiPasswords(obj.passwords)
      setGeneratedPassword(obj.passwords[0])
      setPasswordStats(getStrengthInfo(obj.passwords[0]))
      addActivity({
        date: new Date(),
        content: obj.passwords[0],
      })
    } catch (err) {
      setAiPasswords([(err as Error).message])
    }
    setIsGeneratingAi(false)
  }
  const [selectedPreset, setSelectedPreset] = useState<PasswordPreset | null>()
  const { presets } = usePresets()
  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <LockClosed20Regular primaryFill="#0088FF" className="text-white" />

        <p className="ml-2 font-bold">{t("generate")}</p>
      </div>
      <Tabs defaultValue="simple" className="w-full max-w-5xl mx-auto">
        <div className="mx-auto w-full max-w-2xl mb-8">
          <TabsList className="w-full">
            <TabsTrigger value="simple" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-primary/20 to-purple-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <CheckmarkCircle20Regular className="h-5 w-5" />
                <p className="font-medium">{t("simple")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-primary/20 to-red-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Settings20Regular className="h-5 w-5" />
                <p className="font-medium">{t("advanced")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="ai" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-primary/20 to-violet-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <BrainCircuit20Regular className="h-5 w-5" />
                <p className="font-medium">{t("ai")}</p>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="simple"
        >
          <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-blue-500 to-primary rounded-full p-1.5">
                  <LockClosed20Regular className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("simple")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("simple-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="w-full max-w-250 space-y-6 sm:min-w-150 xl:min-w-200">
              {/* Generated Password Display */}
              <div className="space-y-2">
                <Label htmlFor="generated-password" className="text-sm font-medium">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="generated-password"
                    type={showPassword ? "text" : "password"}
                    value={generatedPassword}
                    readOnly
                    className="pr-20 font-mono text-base h-12 bg-background"
                  />
                  <div className="absolute top-0 right-0 flex h-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-full"
                    >
                      {showPassword ? (
                        <EyeOff20Regular className="h-5 w-5" />
                      ) : (
                        <Eye20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="h-full"
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Strength Level Slider */}
              <div className="space-y-4 py-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">{t("strength")}</Label>
                  <span className="font-medium px-3 py-1 rounded-full text-xs" 
                    style={{
                      backgroundColor: 
                        strengthLevel === 0 ? 'rgb(239, 68, 68, 0.2)' : 
                        strengthLevel === 1 ? 'rgb(249, 115, 22, 0.2)' : 
                        strengthLevel === 2 ? 'rgb(234, 179, 8, 0.2)' : 
                        strengthLevel === 3 ? 'rgb(34, 197, 94, 0.2)' : 
                        'rgb(16, 185, 129, 0.2)',
                      color: 
                        strengthLevel === 0 ? 'rgb(239, 68, 68)' : 
                        strengthLevel === 1 ? 'rgb(249, 115, 22)' : 
                        strengthLevel === 2 ? 'rgb(234, 179, 8)' : 
                        strengthLevel === 3 ? 'rgb(34, 197, 94)' : 
                        'rgb(16, 185, 129)'
                    }}
                  >
                    {
                      [
                        t("very-weak"),
                        t("weak"),
                        t("moderate"),
                        t("strong"),
                        t("very-strong"),
                      ][strengthLevel]
                    }
                  </span>
                </div>
                <Slider
                  value={[strengthLevel]}
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={(value) => setStrengthLevel(value[0])}
                  className="py-4"
                />
                <div className="grid grid-cols-5 text-center text-xs text-muted-foreground">
                  <div>{t("very-weak")}</div>
                  <div>{t("weak")}</div>
                  <div>{t("moderate")}</div>
                  <div>{t("strong")}</div>
                  <div>{t("very-strong")}</div>
                </div>
              </div>

              {/* Password Preview */}
              {showPassword && (
                <PasswordAnalysis generatedPassword={generatedPassword} />
              )}

              {/* Password Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                  <div className="text-muted-foreground text-sm mb-1">
                    {t("length")}
                  </div>
                  <div className="text-xl font-bold flex items-center gap-2">
                    <span className="text-primary">{passwordStats.length}</span> {t("characters")}
                  </div>
                </div>
                <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                  <div className="text-muted-foreground text-sm mb-1">
                    {t("strength")}
                  </div>
                  <div className="text-xl font-bold">
                    {getStrengthLabel(passwordStats.entropy)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6 relative z-10">
              <Button
                onClick={generateSimplePassword}
                className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <ArrowClockwise20Regular className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("generate-new-password")}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          className="flex justify-center border-none"
          value="advanced"
        >
          <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-xl"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-orange-500 to-primary rounded-full p-1.5">
                  <Settings20Regular className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("advanced")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("advanced-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Password Display */}
              <div className="space-y-2">
                <Label htmlFor="advanced-password" className="text-sm font-medium">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="advanced-password"
                    type={showPassword ? "text" : "password"}
                    value={generatedPassword}
                    readOnly
                    className="pr-20 font-mono text-base h-12 bg-background"
                  />
                  <div className="absolute top-0 right-0 flex h-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-full"
                    >
                      {showPassword ? (
                        <EyeOff20Regular className="h-5 w-5" />
                      ) : (
                        <Eye20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="h-full"
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Password Preview */}
              {showPassword && (
                <PasswordAnalysis generatedPassword={generatedPassword} />
              )}

              {/* Password Length */}
              {!selectedPreset && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>{t("length")}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span
                            onClick={getRandomLength}
                            className="decoration-foreground/50 cursor-pointer font-medium underline decoration-dotted underline-offset-2"
                          >
                            {passwordLength} {" " + t("characters")}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{t("random-length")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Slider
                    value={[passwordLength]}
                    min={4}
                    max={64}
                    step={1}
                    onValueChange={(value) => setPasswordLength(value[0])}
                    className="py-4"
                  />
                  <div className="grid grid-cols-3 text-xs">
                    <div>4</div>
                    <div className="text-center">32</div>
                    <div className="text-right">64</div>
                  </div>
                </div>
              )}

              {/* Character Types */}
              {!selectedPreset ? (
                <div className="space-y-4">
                  <h3 className="font-medium">{t("character-types")}</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-blue-600">abc</span>
                        <Label htmlFor="include-lowercase">
                          {t("lowercases")}
                        </Label>
                      </div>
                      <Switch
                        id="include-lowercase"
                        checked={includeLowercase}
                        onCheckedChange={setIncludeLowercase}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-red-600">ABC</span>
                        <Label htmlFor="include-uppercase">
                          {t("uppercases")}
                        </Label>
                      </div>
                      <Switch
                        id="include-uppercase"
                        checked={includeUppercase}
                        onCheckedChange={setIncludeUppercase}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-green-600">123</span>
                        <Label htmlFor="include-numbers">{t("nbrs")}</Label>
                      </div>
                      <Switch
                        id="include-numbers"
                        checked={includeNumbers}
                        onCheckedChange={setIncludeNumbers}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-600">!@#</span>
                        <Label htmlFor="include-special">
                          {t("specialchars")}
                        </Label>
                      </div>
                      <Switch
                        id="include-special"
                        checked={includeSpecial}
                        onCheckedChange={setIncludeSpecial}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-primary bg-primary/20 text-primary my-2 flex items-center space-x-2 rounded-md border p-2">
                  <Info16Regular />
                  <p>{t("preset-selected-msg")}</p>
                </div>
              )}
              <div className="flex">
                <Dialog>
                  <DialogTrigger className="hidden sm:block">
                    <Button variant="link" className="space-x-2">
                      <Add16Regular />
                      <span>{t("use-preset")}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("select-preset")}</DialogTitle>
                    </DialogHeader>
                    {presets && presets.length === 0 ? (
                      <div className="flex w-full flex-col items-center justify-center text-center">
                        <p className="icon text-7xl">{"\uFD81"}</p>
                        <h4 className="text-xl font-bold">
                          {t("no-activity")}
                        </h4>
                        <p>{t("no-presets-desc")}</p>
                        <Link href="/presets">
                          <Button className="m-2 h-auto" variant="outline">
                            {t("create-preset")}
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <ScrollArea className="h-[350px]">
                        <div className="w-full">
                          {presets &&
                            presets.map((el, i) => (
                              <Close key={i} className="w-full">
                                <Button
                                  onClick={() => setSelectedPreset(el)}
                                  className="w-full font-semibold"
                                  variant="ghost"
                                >
                                  {el.name}
                                </Button>
                              </Close>
                            ))}
                        </div>
                      </ScrollArea>
                    )}
                  </DialogContent>
                </Dialog>
                <Drawer>
                  <DrawerTrigger className="block sm:hidden">
                    <Button variant="link" className="space-x-2">
                      <Add16Regular />
                      <span>{t("use-preset")}</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{t("select-preset")}</DrawerTitle>
                    </DrawerHeader>
                    {presets && presets.length === 0 ? (
                      <div className="my-10 flex w-full flex-col items-center justify-center text-center">
                        <p className="icon text-7xl">{"\uFD81"}</p>
                        <h4 className="text-xl font-bold">
                          {t("no-activity")}
                        </h4>
                        <p>{t("no-presets-desc")}</p>
                        <Link href="/presets">
                          <Button className="m-2 h-auto" variant="outline">
                            {t("create-preset")}
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <ScrollArea className="h-[350px]">
                        <div className="w-full">
                          {presets.map((el, i) => (
                            <Close key={i} className="w-full">
                              <Button
                                onClick={() => setSelectedPreset(el)}
                                className="w-full font-semibold"
                                variant="ghost"
                              >
                                {el.name}
                              </Button>
                            </Close>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </DrawerContent>
                </Drawer>
                {selectedPreset && (
                  <Button
                    onClick={() => setSelectedPreset(null)}
                    variant="link"
                    className="space-x-2 decoration-red-500"
                  >
                    <Dismiss16Regular color="#ef4444" />
                    <span className="text-red-600">{t("remove-preset")}</span>
                  </Button>
                )}
              </div>

              {/* Number of Passwords */}
              <div className="space-y-2">
                <Label htmlFor="number-of-passwords-advanced">
                  {t("amount")}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="number-of-passwords-advanced"
                    type="number"
                    min="1"
                    max="50"
                    value={numberOfPasswords}
                    onChange={(e) =>
                      setNumberOfPasswords(
                        Math.max(
                          1,
                          Math.min(50, Number.parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-24"
                  />
                  <span className="text-muted-foreground text-sm">
                    {t("multipasswords-desc")}
                  </span>
                </div>
              </div>

              {/* Password Stats */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">{t("strength")}</h3>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                    <div className="text-muted-foreground text-sm mb-1">
                      {t("length")}
                    </div>
                    <div className="text-xl font-bold flex items-center gap-2">
                      <span className="text-primary">{passwordStats.length}</span> {t("characters")}
                    </div>
                  </div>
                  <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                    <div className="text-muted-foreground text-sm mb-1">
                      {t("strength")}
                    </div>
                    <div className="text-xl font-bold">
                      {getStrengthLabel(passwordStats.entropy)}
                    </div>
                  </div>
                </div>
                
                <PasswordStats passwordAnalysis={passwordStats} />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm font-medium">
                      {t("entropy", { entropy: passwordStats.entropy })}
                    </Label>
                    <span className="font-medium px-3 py-1 rounded-full text-xs" 
                      style={{
                        backgroundColor: 
                          passwordStats.entropy < 30 ? 'rgb(239, 68, 68, 0.2)' : 
                          passwordStats.entropy < 50 ? 'rgb(249, 115, 22, 0.2)' : 
                          passwordStats.entropy < 70 ? 'rgb(234, 179, 8, 0.2)' : 
                          passwordStats.entropy < 90 ? 'rgb(34, 197, 94, 0.2)' : 
                          'rgb(16, 185, 129, 0.2)',
                        color: 
                          passwordStats.entropy < 30 ? 'rgb(239, 68, 68)' : 
                          passwordStats.entropy < 50 ? 'rgb(249, 115, 22)' : 
                          passwordStats.entropy < 70 ? 'rgb(234, 179, 8)' : 
                          passwordStats.entropy < 90 ? 'rgb(34, 197, 94)' : 
                          'rgb(16, 185, 129)'
                      }}
                    >
                      {getStrengthLabel(passwordStats.entropy)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(passwordStats.entropy, 128) / 1.28}
                    bg={getStrengthColor(passwordStats.entropy)}
                  />
                  <p className="text-muted-foreground text-sm">
                    {t("estimated-time", {
                      time: getTimeToCrack(passwordStats.entropy),
                    })}
                  </p>
                </div>
              </div>

              {/* Multiple Passwords Display */}
              {numberOfPasswords > 1 && generatedPasswords.length > 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-lg font-medium">{t("results")}</Label>
                      <div className="bg-primary/10 rounded-full px-2 py-0.5 text-xs text-primary font-medium">
                        {generatedPasswords.length}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DialogTrigger>
                                <Button variant="outline" size="sm" className="h-10 w-10">
                                  <ArrowDownload20Regular className="h-5 w-5" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>{t("export-csv")}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("export-csv")}</DialogTitle>
                            <DialogDescription>
                              {t("export-csv-desc")}
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-sm font-medium mt-4">{t("separator")}</p>
                          <RadioGroup
                            defaultValue={csvSeparator}
                            onValueChange={(v) => setCsvSeparator(v)}
                            className="mt-2 space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="colon" id="colon" />
                              <Label htmlFor="colon">&quot;,&quot;</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="semicolon"
                                id="semicolon"
                              />
                              <Label htmlFor="semicolon">&quot;;&quot;</Label>
                            </div>
                          </RadioGroup>
                          <Link
                            className="flex items-center justify-center mt-6"
                            download="passwords.csv"
                            href={
                              "data:text/plain;charset=utf-8," +
                              encodeURIComponent(
                                generatedPasswords.join(
                                  csvSeparator === "colon" ? "," : ";"
                                )
                              )
                            }
                          >
                            <Button
                              variant="outline"
                              className="h-12 px-6 font-medium flex items-center gap-2"
                            >
                              <ArrowDownload16Regular className="h-5 w-5" />
                              <span>{t("export")}</span>
                            </Button>
                          </Link>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 px-4 font-medium"
                        onClick={copyAllPasswords}
                      >
                        {t("copy-all")}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto rounded-xl border bg-card/30 backdrop-blur-sm">
                    <table className="w-full">
                      <tbody>
                        {generatedPasswords.map((password, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="px-4 py-3 text-sm font-medium">
                              #{index + 1}
                            </td>
                            <td className="max-w-[300px] truncate px-4 py-3 font-mono text-sm">
                              {showPassword
                                ? password
                                : "•".repeat(password.length)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyPasswordAtIndex(index)}
                                className="h-8 w-8"
                              >
                                <Copy20Regular className="h-4 w-4" />
                                <span className="sr-only">
                                  {t("copy-password-index", {
                                    index: index + 1,
                                  })}
                                </span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 pb-6 relative z-10">
              <Button
                onClick={generateAdvancedPassword}
                className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 via-primary to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <ArrowClockwise20Regular className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("generate-new-password")}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="ai"
        >
          {settings.openaiKey == null ||
          settings.openaiKey == undefined ||
          (settings.openaiKey == "" && !showAI) ? (
            <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-card/50 backdrop-blur-sm max-w-md mx-auto shadow-lg border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 rounded-xl"></div>
              <div className="bg-gradient-to-br from-purple-500 to-primary rounded-full p-4 relative z-10">
                <LightbulbFilament48Regular className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-center text-3xl font-bold relative z-10">
                {t("welcome-ai")}
              </h2>
              <p className="text-center text-muted-foreground max-w-sm relative z-10">{t("welcome-ai-desc")}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 py-6 px-8 text-base font-medium relative overflow-hidden group z-10">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative z-10">{t("set-api-key")}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("set-api-key")}</DialogTitle>
                    <DialogDescription>
                      {t("get-api-key-msg")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <Label htmlFor="api-key" className="text-sm font-medium">{t("api-key")}</Label>
                      <Input
                        type="password"
                        id="api-key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full h-12 bg-background"
                        defaultValue={settings.openaiKey ?? ""}
                      />
                    </div>
                  </div>
                  <DialogClose>
                    <Button
                      onClick={() => {
                        settings.openaiKey = apiKey
                        setShowAI(
                          !(
                            settings.openaiKey == null ||
                            settings.openaiKey == undefined ||
                            settings.openaiKey == ""
                          )
                        )
                        setSettings(settings)
                      }}
                      className="w-full py-6 text-base font-medium relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="relative z-10">{t("save")}</span>
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 rounded-xl"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gradient-to-br from-purple-500 to-primary rounded-full p-1.5">
                    <BrainCircuit20Regular className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{t("ai")}</CardTitle>
                </div>
                <CardDescription className="text-base">{t("generate-ai-desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipContent>{t("ai-prompt-tooltip")}</TooltipContent>
                      <TooltipTrigger>
                        <Label
                          onClick={() => setPromptText(getRandomPrompt(lang))}
                          htmlFor="prompt-text"
                          className="text-sm font-medium decoration-foreground/50 cursor-pointer underline decoration-dotted underline-offset-2"
                        >
                          {t("enter-prompt")}
                        </Label>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="flex gap-2">
                    <Input
                      id="prompt-text"
                      placeholder={t("ai-prompt-placeholder")}
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="flex-1 h-12 bg-background z-10"
                    />
                    <Button
                      onClick={generateAiPassword}
                      disabled={isGeneratingAi || !promptText.trim()}
                      className="flex-shrink-0 h-12 px-6 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {isGeneratingAi ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent relative z-10" />
                          <span className="relative z-10">{t("ai-loading")}</span>
                        </>
                      ) : (
                        <>
                          <Sparkle20Regular className="mr-2 h-5 w-5 relative z-10" />
                          <span className="relative z-10">{t("generate")}</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t("ai-prompt-desc")}
                  </p>
                </div>

                {/* Generated Password Display */}
                {aiPasswords.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{t("ai-suggestions")}</h3>
                      <div className="bg-primary/10 rounded-full px-2 py-0.5 text-xs text-primary font-medium">
                        {aiPasswords.length}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {aiPasswords.map((password, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden bg-secondary/30 backdrop-blur-sm dark:bg-primary-foreground/5 flex items-center justify-between rounded-xl p-4 transition-all hover:bg-secondary/50 dark:hover:bg-primary-foreground/10 border border-transparent hover:border-primary/20"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity"></div>
                          <div className="space-y-1 relative z-10">
                            <div className="font-mono text-lg">
                              {showPassword
                                ? password
                                : "•".repeat(password.length)}
                            </div>
                            <div className="text-muted-foreground text-sm flex items-center gap-1">
                              <div className="bg-primary/10 rounded-full p-0.5">
                                <Sparkle20Regular className="h-3.5 w-3.5 text-primary" />
                              </div>
                              {t("suggestion-index", {
                                index: index + 1,
                              })}
                            </div>
                          </div>
                          <div className="flex gap-2 relative z-10">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-10 px-4 font-medium relative overflow-hidden group"
                              onClick={() => {
                                setGeneratedPassword(password)
                                setPasswordStats(getStrengthInfo(password))
                              }}
                            >
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              <span className="relative z-10">{t("select")}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-10 w-10 relative group"
                              onClick={() => {
                                navigator.clipboard.writeText(password)
                                toast(t("copied"))
                              }}
                            >
                              <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                              <Copy20Regular className="h-5 w-5 relative z-10" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Password Analysis */}
                {aiPasswords.length > 0 && (
                  <div className="space-y-6 mt-8">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{t("selected-password-analysis")}</h3>
                    </div>
                    
                    {/* Generated Password Display */}
                    <div className="space-y-2">
                      <Label htmlFor="ai-password" className="text-sm font-medium">{t("password")}</Label>
                      <div className="relative">
                        <Input
                          id="ai-password"
                          type={showPassword ? "text" : "password"}
                          value={generatedPassword}
                          readOnly
                          className="pr-20 font-mono text-base h-12 bg-background"
                        />
                        <div className="absolute top-0 right-0 flex h-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="h-full"
                          >
                            {showPassword ? (
                              <EyeOff20Regular className="h-5 w-5" />
                            ) : (
                              <Eye20Regular className="h-5 w-5" />
                            )}
                            <span className="sr-only">
                              Toggle password visibility
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyToClipboard}
                            className="h-full"
                          >
                            {copied ? (
                              <Checkmark20Regular className="h-5 w-5 text-green-500" />
                            ) : (
                              <Copy20Regular className="h-5 w-5" />
                            )}
                            <span className="sr-only">Copy to clipboard</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Password Preview */}
                    {showPassword && (
                      <PasswordAnalysis generatedPassword={generatedPassword} />
                    )}

                    {/* Password Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                        <div className="text-muted-foreground text-sm mb-1">
                          {t("length")}
                        </div>
                        <div className="text-xl font-bold flex items-center gap-2">
                          <span className="text-primary">{passwordStats.length}</span> {t("characters")}
                        </div>
                      </div>
                      <div className="bg-secondary/50 backdrop-blur-sm dark:bg-primary-foreground/10 rounded-xl p-4 transition-all hover:bg-secondary/80 dark:hover:bg-primary-foreground/20">
                        <div className="text-muted-foreground text-sm mb-1">
                          {t("strength")}
                        </div>
                        <div className="text-xl font-bold">
                          {getStrengthLabel(passwordStats.entropy)}
                        </div>
                      </div>
                    </div>

                    <PasswordStats passwordAnalysis={passwordStats} />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm font-medium">
                          {t("entropy", { entropy: passwordStats.entropy })}
                        </Label>
                        <span className="font-medium px-3 py-1 rounded-full text-xs" 
                          style={{
                            backgroundColor: 
                              passwordStats.entropy < 30 ? 'rgb(239, 68, 68, 0.2)' : 
                              passwordStats.entropy < 50 ? 'rgb(249, 115, 22, 0.2)' : 
                              passwordStats.entropy < 70 ? 'rgb(234, 179, 8, 0.2)' : 
                              passwordStats.entropy < 90 ? 'rgb(34, 197, 94, 0.2)' : 
                              'rgb(16, 185, 129, 0.2)',
                            color: 
                              passwordStats.entropy < 30 ? 'rgb(239, 68, 68)' : 
                              passwordStats.entropy < 50 ? 'rgb(249, 115, 22)' : 
                              passwordStats.entropy < 70 ? 'rgb(234, 179, 8)' : 
                              passwordStats.entropy < 90 ? 'rgb(34, 197, 94)' : 
                              'rgb(16, 185, 129)'
                          }}
                        >
                          {getStrengthLabel(passwordStats.entropy)}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(passwordStats.entropy, 128) / 1.28}
                        bg={getStrengthColor(passwordStats.entropy)}
                      />
                      <p className="text-muted-foreground text-sm">
                        {t("estimated-time", {
                          time: getTimeToCrack(passwordStats.entropy),
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2 pb-6 relative z-10">
                <Button
                  onClick={generateAiPassword}
                  disabled={isGeneratingAi || !promptText.trim()}
                  className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                  size="lg"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {isGeneratingAi ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent relative z-10" />
                      <span className="relative z-10">{t("ai-loading")}</span>
                    </>
                  ) : (
                    <>
                      <Sparkle20Regular className="h-5 w-5 relative z-10" />
                      <span className="relative z-10">{t("generate-with-ai")}</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
