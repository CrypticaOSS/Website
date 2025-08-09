"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { Settings, useSettings } from "@/hooks/use-settings"
import { Locale } from "@/i18n/config"
import { setUserLocale } from "@/services/locale"
import { testDatabaseConnection, formatDatabaseUrl } from "@/lib/db-connection"
import {
  Eye16Regular,
  EyeOff16Regular,
  Save16Regular,
  Settings20Regular,
  PaintBrush20Regular,
  Password20Regular,
  ShieldKeyhole20Regular,
  BrainCircuit20Regular,
  Info16Regular,
  Database20Regular,
  QuestionCircle20Regular
} from "@fluentui/react-icons"
import clsx from "clsx"
import { ExternalLink, Github } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { version } from "@/lib/version"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const t = useTranslations() // default namespace (optional)
  const { setTheme, theme } = useTheme()
  const { settings, setSettings } = useSettings()
  const [keyVis, setKeyVis] = useState(false)
  const [isPending, startTransition] = useTransition()

  function languageChanged(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  function isSettings(object: Settings): object is Settings {
    return (
      typeof object === "object" &&
      typeof object.passwordLengthOne === "number" &&
      typeof object.passwordLengthTwo === "number" &&
      typeof object.encryptAlgo === "string"
    )
  }

  function Import(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null || event.target.files.length === 0) {
      alert("No file selected")
      return
    }
    const file = event.target.files[0] // get the selected file
    const reader = new FileReader() // create a FileReader object
    reader.onload = function (event) {
      const text: string = event.target?.result as string // get the file content as text
      const json: Settings = JSON.parse(text) // parse the text as JSON
      if (!isSettings(json)) {
        alert("Invalid file")
        return
      }
      localStorage.setItem("settings", JSON.stringify(json)) // store the JSON in localstorage
    }
    reader.readAsText(file) // read the file as text
  }

  function switchClick() {
    settings.hidePassword =
      document.getElementById("hide_pwr")?.ariaChecked != "true"
    setSettings(settings)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center space-x-2">
        <Settings20Regular primaryFill="#0088FF" className="text-white" />
        <h1 className="ml-2 text-2xl font-bold">{t("settings")}</h1>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="appearance" className="flex items-center gap-2 flex-shrink-0">
            <PaintBrush20Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("appearance")}</span>
          </TabsTrigger>
          <TabsTrigger value="passwords" className="flex items-center gap-2 flex-shrink-0">
            <Password20Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("passwords")}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 flex-shrink-0">
            <ShieldKeyhole20Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("security")}</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2 flex-shrink-0">
            <BrainCircuit20Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("ai")}</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2 flex-shrink-0">
            <Info16Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("about")}</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2 flex-shrink-0">
            <Database20Regular className="h-4 w-4" />
            <span className="hidden sm:inline">{t("data")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("general")}</h2>
              <p className="text-muted-foreground">{t("general-desc")}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold" htmlFor="theme">
                  {t("theme")}
                </Label>
                <div className="flex flex-wrap gap-4">
                  <div
                    onClick={() => setTheme("light")}
                    className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-card p-2 pr-4 transition-all hover:bg-accent/10 ${theme === "light" ? "border-accent" : "border-transparent"}`}
                  >
                    <Image
                      src="/themes/light.svg"
                      height={50}
                      width={50}
                      alt="Light theme image"
                      className="object-cover"
                    />
                    <p className="font-medium">{t("light")}</p>
                  </div>
                  <div
                    onClick={() => setTheme("dark")}
                    className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-card p-2 pr-4 transition-all hover:bg-accent/10 ${theme === "dark" ? "border-accent" : "border-transparent"}`}
                  >
                    <Image
                      src="/themes/dark.svg"
                      height={50}
                      width={50}
                      alt="Dark theme image"
                      className="object-cover"
                    />
                    <p className="font-medium">{t("dark")}</p>
                  </div>
                  <div
                    onClick={() => setTheme("system")}
                    className={`flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-card p-2 pr-4 transition-all hover:bg-accent/10 ${theme === "system" ? "border-accent" : "border-transparent"}`}
                  >
                    <Image
                      src="/themes/system.svg"
                      height={50}
                      width={50}
                      alt="System theme image"
                      className="object-cover"
                    />
                    <p className="font-medium">{t("system")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-base font-semibold">
                  {t("language")}
                </Label>
                <Select
                  defaultValue={t("lang")}
                  onValueChange={languageChanged}
                >
                  <SelectTrigger
                    className={clsx(
                      "h-auto w-full max-w-xs px-3 py-2 sm:justify-self-end",
                      isPending && "pointer-events-none opacity-60"
                    )}
                  >
                    <SelectValue placeholder={t("language")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultChecked={true} value="en">
                      English (United States)
                    </SelectItem>
                    <SelectItem value="fr">French (France)</SelectItem>
                    {/**<SelectItem value="de">German (Germany)</SelectItem>
                    <SelectItem value="it">Italian (Italy)</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Passwords Tab */}
        <TabsContent value="passwords" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("password-config")}</h2>
              <p className="text-muted-foreground">{t("password-default")}</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="LowerChk"
                    onCheckedChange={() => {
                      if (settings.defaultPasswordConfig == null) {
                        settings.defaultPasswordConfig = {
                          upperCases: true,
                          lowerCases: true,
                          numbers: true,
                          special: false,
                        }
                      }
                      settings.defaultPasswordConfig.lowerCases =
                        !settings.defaultPasswordConfig.lowerCases
                      setSettings(settings)
                    }}
                    defaultChecked={
                      settings.defaultPasswordConfig
                        ? settings.defaultPasswordConfig.lowerCases
                        : true
                    }
                  />
                  <Label htmlFor="LowerChk">{t("lowercases")}</Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    onCheckedChange={() => {
                      if (settings.defaultPasswordConfig == null) {
                        settings.defaultPasswordConfig = {
                          upperCases: true,
                          lowerCases: true,
                          numbers: true,
                          special: false,
                        }
                      }
                      settings.defaultPasswordConfig.upperCases =
                        !settings.defaultPasswordConfig.upperCases
                      setSettings(settings)
                    }}
                    defaultChecked={
                      settings.defaultPasswordConfig
                        ? settings.defaultPasswordConfig.upperCases
                        : true
                    }
                    id="UpperChk"
                  />
                  <Label htmlFor="UpperChk">{t("uppercases")}</Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    onCheckedChange={() => {
                      if (settings.defaultPasswordConfig == null) {
                        settings.defaultPasswordConfig = {
                          upperCases: true,
                          lowerCases: true,
                          numbers: true,
                          special: false,
                        }
                      }
                      settings.defaultPasswordConfig.numbers =
                        !settings.defaultPasswordConfig.numbers
                      setSettings(settings)
                    }}
                    defaultChecked={
                      settings.defaultPasswordConfig
                        ? settings.defaultPasswordConfig.numbers
                        : true
                    }
                    id="NbrChk"
                  />
                  <Label htmlFor="NbrChk">{t("nbrs")}</Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="SpecialChk"
                    onCheckedChange={() => {
                      if (settings.defaultPasswordConfig == null) {
                        settings.defaultPasswordConfig = {
                          upperCases: true,
                          lowerCases: true,
                          numbers: true,
                          special: false,
                        }
                      }
                      settings.defaultPasswordConfig.special =
                        !settings.defaultPasswordConfig.special
                      setSettings(settings)
                    }}
                    defaultChecked={
                      settings.defaultPasswordConfig
                        ? settings.defaultPasswordConfig.special
                        : false
                    }
                  />
                  <Label htmlFor="SpecialChk">{t("specialchars")}</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("password-settings")}</h2>
              <p className="text-muted-foreground">{t("password-settings-desc")}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t("default-random-length")}</h3>
                <div className="flex items-center gap-2">
                  <p>{t("between")}</p>
                  <Input
                    defaultValue={settings.passwordLengthOne}
                    type="number"
                    className="h-auto w-20 px-3 py-2"
                    id="Num1Txt"
                    onChange={() => {
                      settings.passwordLengthOne = parseInt(
                        (document.getElementById("Num1Txt") as HTMLInputElement)
                          .value
                      )
                      setSettings(settings)
                    }}
                  />
                  <p>{t("and")}</p>
                  <Input
                    defaultValue={settings.passwordLengthTwo}
                    type="number"
                    className="h-auto w-20 px-3 py-2"
                    id="Num2Txt"
                    onChange={() => {
                      settings.passwordLengthTwo = parseInt(
                        (document.getElementById("Num2Txt") as HTMLInputElement)
                          .value
                      )
                      setSettings(settings)
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">{t("custom-chars")}</h3>

                <div className="space-y-2">
                  <Label htmlFor="UpperTextArea">{t("uppercases")}</Label>
                  <Input
                    defaultValue={settings.customChars.upperCases}
                    className="h-auto px-3 py-2"
                    id="UpperTextArea"
                    onChange={() => {
                      settings.customChars.upperCases = (
                        document.getElementById("UpperTextArea") as HTMLInputElement
                      ).value
                      setSettings(settings)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="LowerTextArea">{t("lowercases")}</Label>
                  <Input
                    defaultValue={settings.customChars.lowerCases}
                    className="h-auto px-3 py-2"
                    id="LowerTextArea"
                    onChange={() => {
                      settings.customChars.lowerCases = (
                        document.getElementById("LowerTextArea") as HTMLInputElement
                      ).value
                      setSettings(settings)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="NumbersTextArea">{t("nbrs")}</Label>
                  <Input
                    defaultValue={settings.customChars.numbers}
                    className="h-auto px-3 py-2"
                    id="NumbersTextArea"
                    onChange={() => {
                      settings.customChars.numbers = (
                        document.getElementById(
                          "NumbersTextArea"
                        ) as HTMLInputElement
                      ).value
                      setSettings(settings)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="SpecialTextArea">{t("specialchars")}</Label>
                  <Input
                    defaultValue={settings.customChars.special}
                    className="h-auto px-3 py-2"
                    id="SpecialTextArea"
                    onChange={() => {
                      settings.customChars.special = (
                        document.getElementById(
                          "SpecialTextArea"
                        ) as HTMLInputElement
                      ).value
                      setSettings(settings)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("security")}</h2>
              <p className="text-muted-foreground">{t("security-desc")}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="hide_pwr" className="text-base">{t("hide-password")}</Label>
                <Switch
                  onClick={switchClick}
                  defaultChecked={
                    settings.hidePassword != null &&
                      settings.hidePassword != undefined
                      ? settings.hidePassword
                      : false
                  }
                  className="sm:justify-self-end"
                  id="hide_pwr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashing" className="text-base"> {t("default-hashing-algo")}</Label>
                <Select
                  defaultValue={settings.hashAlgo}
                  onValueChange={(val) => {
                    settings.hashAlgo = val
                    setSettings(settings)
                  }}
                >
                  <SelectTrigger
                    id="hashing"
                    className="h-auto w-full max-w-xs px-3 py-2"
                  >
                    <SelectValue placeholder={t("algorithm")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultChecked={true} value="md5">
                      MD5
                    </SelectItem>
                    <SelectItem value="sha-1">SHA-1</SelectItem>
                    <SelectItem value="sha-256">SHA-256</SelectItem>
                    <SelectItem value="sha-512">SHA-512</SelectItem>
                    <SelectItem value="sha-3">SHA-3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption" className="text-base">
                  {t("default-encryption-algo")}
                </Label>
                <Select
                  defaultValue={settings.encryptAlgo}
                  onValueChange={(val) => {
                    settings.encryptAlgo = val
                    setSettings(settings)
                  }}
                >
                  <SelectTrigger
                    id="encryption"
                    className="h-auto w-full max-w-xs px-3 py-2"
                  >
                    <SelectValue placeholder={t("algorithm")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultChecked={true} value="aes">
                      AES
                    </SelectItem>
                    <SelectItem value="3des">3DES</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="rc4">RC4Drop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* AI Tab */}
        <TabsContent value="ai" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("ai")}</h2>
              <p className="text-muted-foreground">{t("ai-desc")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1">
                <Input
                  type={keyVis ? "text" : "password"}
                  id="api-key"
                  className="h-auto w-full px-3 py-2"
                  defaultValue={settings.openaiKey ?? ""}
                  placeholder="OpenAI API Key"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    settings.openaiKey = (
                      document.getElementById("api-key") as HTMLInputElement
                    ).value
                    setSettings(settings)
                  }}
                  className="h-auto px-4 py-2"
                >
                  <Save16Regular className="mr-2" />
                  <span>{t("save")}</span>
                </Button>
                <Button
                  className="h-auto px-4 py-2"
                  onClick={() => setKeyVis(!keyVis)}
                  variant="outline"
                >
                  {keyVis ? <Eye16Regular className="mr-2" /> : <EyeOff16Regular className="mr-2" />}
                  <span>{keyVis ? t("hide") : t("show")}</span>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("about")}</h2>
              <p className="text-muted-foreground">{t("about-desc")}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">{t("version")}</h3>
                <p className="text-muted-foreground">Cryptica v{version}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">{t("repository")}</h3>
                <a
                  href="https://github.com/CrypticaOSS/Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  <Github className="mr-2 size-5" />
                  {t("view-repository")}
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">{t("licenses")}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>NextJS - MIT License - © 2025 Vercel, Inc.</p>
                  <p>RadixUI - MIT License - © 2022 WorkOS</p>
                  <p>shadcn/ui - MIT License - © 2023 shadcn</p>
                  <p>Fluent System Icons - MIT License - © 2020 Microsoft Corporation</p>
                  <p>Cryptica - MIT License - © {new Date().getFullYear()} ByteBrush Studios</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-4 focus-visible:outline-none">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{t("data")}</h2>
              <p className="text-muted-foreground">{t("manage-data")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "text-center",
                })}
                href={
                  "data:text/plain;charset=UTF-8," +
                  encodeURIComponent(
                    typeof window !== "undefined"
                      ? (localStorage.getItem("settings") ?? "")
                      : "{msg: 'an error occurred'}"
                  )
                }
                download={"settings.json"}
              >
                {t("export-settings")}
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  (
                    document.getElementById(
                      "FileSelector"
                    ) as HTMLInputElement
                  ).click()
                }
              >
                {t("import-settings")}
              </Button>

              <Input
                type="file"
                id="FileSelector"
                accept="application/json"
                className="hidden"
                onChange={Import}
              ></Input>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="px-4 py-2 font-bold"
                    variant="destructive"
                    size="lg"
                  >
                    {t("reset-settings")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("reset-settings")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("reset-settings-msg")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        setTheme("system")
                        localStorage.setItem(
                          "settings",
                          JSON.stringify({
                            // default object
                            passwordLengthOne: 12,
                            passwordLengthTwo: 19,
                            encryptAlgo: "aes",
                            customChars: {
                              lowerCases: "abcdefghijklmnopqrstuvwxyz",
                              upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                              numbers: "01234567889",
                              special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                            },
                          })
                        )
                      }}
                    >
                      {t("continue")}
                    </AlertDialogAction>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{t("database")}</h2>
                <p className="text-muted-foreground">{t("database-desc")}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <QuestionCircle20Regular className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{t("database-help-title")}</DialogTitle>
                    <DialogDescription>
                      {t("database-help-desc")}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 my-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{t("database-help-step1-title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("database-help-step1-desc")}</p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold">{t("database-help-step2-title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("database-help-step2-desc")}</p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold">{t("database-help-step3-title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("database-help-step3-desc")}</p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold">{t("database-help-step4-title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("database-help-step4-desc")}</p>
                    </div>

                    <div className="mt-6 p-3 border rounded-md bg-muted/50">
                      <h4 className="font-medium">{t("database-help-security")}</h4>
                      <p className="text-sm text-muted-foreground">{t("database-help-security-desc")}</p>
                    </div>
                  </div>

                  <DialogFooter className="flex justify-between items-center">
                    <Link
                      href="/docs/database"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <span>{t("learn-more")}</span>
                    </Link>
                    <DialogClose asChild>
                      <Button variant="outline">{t("ok")}</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="db-enabled" className="text-base">
                  {t("database-enable")}
                </Label>
                <Switch
                  id="db-enabled"
                  checked={settings.dbConnection?.enabled || false}
                  onCheckedChange={(checked) => {
                    const updatedSettings = {
                      ...settings,
                      dbConnection: {
                        ...(settings.dbConnection || { url: "", type: "supabase" }),
                        enabled: checked
                      }
                    };
                    setSettings(updatedSettings);
                  }}
                  className="sm:justify-self-end"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-type" className="text-base">
                    {t("database-type")}
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={settings.dbConnection?.type || "supabase"}
                      onValueChange={(val) => {
                        const dbType = val as 'supabase' | 'firebase' | 'custom';
                        setSettings({
                          ...settings,
                          dbConnection: {
                            ...(settings.dbConnection || { url: "", enabled: false }),
                            type: dbType
                          }
                        });
                      }}
                    >
                      <SelectTrigger
                        id="db-type"
                        className="h-auto w-full max-w-xs px-3 py-2"
                      >
                        <SelectValue placeholder={t("database-type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supabase">Supabase</SelectItem>
                        <SelectItem value="firebase">Firebase</SelectItem>
                        <SelectItem value="custom">{t("database-custom")}</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Provider-specific help tooltip */}
                    {settings.dbConnection?.type === "supabase" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-auto px-3 py-2">
                            <QuestionCircle20Regular className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                          <DialogHeader>
                            <DialogTitle>Supabase Setup Guide</DialogTitle>
                            <DialogDescription>
                              How to set up Cryptica with Supabase as your database provider
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 my-4">
                            <ol className="list-decimal list-inside space-y-3">
                              <li className="text-sm">
                                <strong>Create a Supabase account</strong> at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">supabase.com</a>
                              </li>
                              <li className="text-sm">
                                <strong>Create a new project</strong> and note your project URL
                              </li>
                              <li className="text-sm">
                                <strong>Go to Project Settings → API</strong> to find your API URL and key
                              </li>
                              <li className="text-sm">
                                <strong>Create a table</strong> named &quot;items&quot; with columns:
                                <ul className="list-disc list-inside pl-4 pt-1">
                                  <li>key (text, primary)</li>
                                  <li>value (jsonb)</li>
                                  <li>created_at (timestamp)</li>
                                  <li>updated_at (timestamp)</li>
                                </ul>
                              </li>
                              <li className="text-sm">
                                <strong>Set Row Level Security policies</strong> to secure your data
                              </li>
                            </ol>
                          </div>
                          <DialogFooter className="flex justify-between items-center">
                            <Link
                              href="/docs/database/supabase"
                              className="text-sm text-primary hover:underline"
                            >
                              {t("learn-more")}
                            </Link>
                            <DialogClose asChild>
                              <Button variant="outline">{t("ok")}</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {settings.dbConnection?.type === "firebase" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-auto px-3 py-2">
                            <QuestionCircle20Regular className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                          <DialogHeader>
                            <DialogTitle>Firebase Setup Guide</DialogTitle>
                            <DialogDescription>
                              How to set up Cryptica with Firebase as your database provider
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 my-4">
                            <ol className="list-decimal list-inside space-y-3">
                              <li className="text-sm">
                                <strong>Create a Firebase account</strong> at <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">firebase.google.com</a>
                              </li>
                              <li className="text-sm">
                                <strong>Create a new project</strong> from the Firebase console
                              </li>
                              <li className="text-sm">
                                <strong>Add Firestore Database</strong> to your project
                              </li>
                              <li className="text-sm">
                                <strong>Go to Project Settings → Service accounts</strong> to generate an API key
                              </li>
                              <li className="text-sm">
                                <strong>Set up security rules</strong> in the Firestore Rules section
                              </li>
                            </ol>
                          </div>
                          <DialogFooter className="flex justify-between items-center">
                            <Link
                              href="/docs/database/firebase"
                              className="text-sm text-primary hover:underline"
                            >
                              {t("learn-more")}
                            </Link>
                            <DialogClose asChild>
                              <Button variant="outline">{t("ok")}</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {settings.dbConnection?.type === "custom" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-auto px-3 py-2">
                            <QuestionCircle20Regular className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                          <DialogHeader>
                            <DialogTitle>Custom API Requirements</DialogTitle>
                            <DialogDescription>
                              Requirements for using a custom API with Cryptica
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 my-4">
                            <p className="text-sm">Your custom API endpoint must implement the following routes:</p>

                            <div className="space-y-2">
                              <h3 className="text-sm font-semibold">GET /items/:key</h3>
                              <p className="text-xs text-muted-foreground">Retrieves a stored value by key</p>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-sm font-semibold">PUT /items/:key</h3>
                              <p className="text-xs text-muted-foreground">Stores or updates a value with the given key</p>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-sm font-semibold">DELETE /items/:key</h3>
                              <p className="text-xs text-muted-foreground">Deletes a value with the given key</p>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm">Authentication should be handled via Bearer token in the Authorization header.</p>
                            </div>
                          </div>
                          <DialogFooter className="flex justify-between items-center">
                            <Link
                              href="/docs/database/custom"
                              className="text-sm text-primary hover:underline"
                            >
                              {t("learn-more")}
                            </Link>
                            <DialogClose asChild>
                              <Button variant="outline">{t("ok")}</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-url" className="text-base">
                    {t("database-url")}
                  </Label>
                  <Input
                    id="db-url"
                    type="url"
                    className="h-auto w-full px-3 py-2"
                    placeholder="https://your-database-url.com/api"
                    autoComplete="off"
                    value={settings.dbConnection?.url || ""}
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        dbConnection: {
                          ...(settings.dbConnection || { type: "supabase", enabled: false }),
                          url: e.target.value
                        }
                      });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-api-key" className="text-base">
                    {t("database-api-key")}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="db-api-key"
                      type={keyVis ? "text" : "password"}
                      className="h-auto w-full px-3 py-2"
                      value={settings.dbConnection?.apiKey || ""}
                      autoComplete="off"
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          dbConnection: {
                            ...(settings.dbConnection || { type: "supabase", url: "", enabled: false }),
                            apiKey: e.target.value
                          }
                        });
                      }}
                    />
                    <Button
                      className="h-auto px-4 py-2"
                      onClick={() => setKeyVis(!keyVis)}
                      variant="outline"
                    >
                      {keyVis ? <Eye16Regular className="mr-2" /> : <EyeOff16Regular className="mr-2" />}
                      <span>{keyVis ? t("hide") : t("show")}</span>
                    </Button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    className="px-4 py-2"
                    disabled={!settings.dbConnection?.url}
                    onClick={async () => {
                      try {
                        if (!settings.dbConnection?.url) {
                          alert(t("database-status-error"));
                          return;
                        }

                        // Show loading state
                        const btn = document.activeElement as HTMLButtonElement;
                        const originalText = btn.innerText;
                        btn.disabled = true;
                        btn.innerText = t("database-testing");

                        // Test the database connection
                        const result = await testDatabaseConnection(settings.dbConnection);

                        // Restore button state
                        btn.disabled = false;
                        btn.innerText = originalText;

                        if (result.success) {
                          // Connection successful
                          alert(result.message);

                          // If connection is successful, normalize and format the URL
                          if (settings.dbConnection) {
                            const formattedUrl = formatDatabaseUrl(settings.dbConnection);

                            // Update the settings if the URL changed
                            if (formattedUrl !== settings.dbConnection.url) {
                              setSettings({
                                ...settings,
                                dbConnection: {
                                  ...settings.dbConnection,
                                  url: formattedUrl
                                }
                              });
                            }
                          }
                        } else {
                          // Connection failed
                          alert(`${t("database-status-error")}: ${result.message}`);
                        }
                      } catch (error) {
                        alert(t("database-status-error") + ": " +
                          (error instanceof Error ? error.message : "Unknown error"));
                        console.error("Connection test error:", error);
                      }
                    }}
                  >
                    {t("database-test")}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="default"
                        className="px-4 py-2"
                        disabled={!settings.dbConnection?.url}
                      >
                        <Save16Regular className="mr-2" />
                        {t("database-save")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t("database-sync-confirm")}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("database-sync-confirm-message")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              if (!settings.dbConnection?.url) {
                                alert(t("database-status-error"));
                                return;
                              }

                              // Show loading state using a toast or indicator instead of button text
                              // since the button is now in a dialog that will close

                              // Test the database connection first
                              const result = await testDatabaseConnection(settings.dbConnection);

                              if (result.success) {
                                // Connection successful, format URL and enable the connection
                                const formattedUrl = formatDatabaseUrl(settings.dbConnection);

                                setSettings({
                                  ...settings,
                                  dbConnection: {
                                    ...settings.dbConnection,
                                    url: formattedUrl,
                                    enabled: true
                                  }
                                });

                                // Wait a moment for dialog to close
                                setTimeout(() => {
                                  alert(t("database-status-success"));
                                }, 500);
                              } else {
                                // Connection failed
                                // Wait a moment for dialog to close
                                setTimeout(() => {
                                  alert(`${t("database-status-error")}: ${result.message}`);
                                }, 500);
                              }
                            } catch (error) {
                              // Wait a moment for dialog to close
                              setTimeout(() => {
                                alert(t("database-status-error") + ": " +
                                  (error instanceof Error ? error.message : "Unknown error"));
                              }, 500);
                              console.error("Save connection error:", error);
                            }
                          }}
                        >
                          {t("continue")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
