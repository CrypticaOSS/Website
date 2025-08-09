"use client"

import { useState } from "react"
import { useSettings } from "@/hooks/use-settings"
import {
  Checkmark20Regular,
  Copy20Regular,
  Eye20Regular,
  EyeOff20Regular,
  Key20Regular,
  NumberSymbol20Regular,
  Password20Regular,
  Translate20Regular,
} from "@fluentui/react-icons"
import CryptoJS from "crypto-js"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { generatePasswordByStrength } from "@/lib/password"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function EncryptionPage() {
  const t = useTranslations() // default namespace (optional)
  const { settings, setSettings } = useSettings()

  if (settings.hashAlgo == null || settings.hashAlgo == undefined) {
    settings.hashAlgo = "md5"
    setSettings(settings)
  }

  function onSelectChanged(val: string) {
    setAlgo(val)
  }

  const [copied, setCopied] = useState(false)
  const [algo, setAlgo] = useState(settings.encryptAlgo)
  const [hashAlgo, setHashAlgo] = useState(settings.hashAlgo ?? "md5")
  const [keyVis, setKeyVis] = useState(false)

  // Encrypt state
  const [textToEncrypt, setTextToEncrypt] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const [encryptedText, setEncryptedText] = useState("")

  // Decrypt state
  const [textToDecrypt, setTextToDecrypt] = useState("")
  const [decryptionKey, setDecryptionKey] = useState("")
  const [decryptedText, setDecryptedText] = useState("")

  // Hash state
  const [textToHash, setTextToHash] = useState("")
  const [hashedText, setHashedText] = useState("")

  function encrypt() {
    if (!textToEncrypt || !encryptionKey) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    try {
      switch (algo) {
        case "aes":
          setEncryptedText(
            CryptoJS.AES.encrypt(textToEncrypt, encryptionKey).toString()
          )
          break
        case "3des":
          setEncryptedText(
            CryptoJS.TripleDES.encrypt(textToEncrypt, encryptionKey).toString()
          )
          break
        case "rabbit":
          setEncryptedText(
            CryptoJS.Rabbit.encrypt(textToEncrypt, encryptionKey).toString()
          )
          break
        case "rc4":
          setEncryptedText(
            CryptoJS.RC4Drop.encrypt(textToEncrypt, encryptionKey).toString()
          )
          break
        default:
          break
      }
      toast(t("text-encrypted-title"), {
        description: t("text-encrypted-desc"),
      })
    } catch {
      toast(t("text-encrypted-error"), {
        description: t("text-encrypted-error"),
      })
    }
  }

  function decrypt() {
    if (!textToDecrypt || !decryptionKey) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    try {
      // Decrypt the text using the selected algorithm and key
      let decryptedText = ""
      switch (algo) {
        case "aes":
          decryptedText = hex2a(
            CryptoJS.AES.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "3des":
          decryptedText = hex2a(
            CryptoJS.TripleDES.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "3des":
          decryptedText = hex2a(
            CryptoJS.TripleDES.decrypt(textToDecrypt, decryptionKey).toString()
          )

          break
        case "rabbit":
          decryptedText = hex2a(
            CryptoJS.Rabbit.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        case "rc4":
          decryptedText = hex2a(
            CryptoJS.RC4Drop.decrypt(textToDecrypt, decryptionKey).toString()
          )
          break
        default:
          break
      }
      setDecryptedText(decryptedText)
      if (decryptedText == "") {
        throw new Error("")
      }
      toast(t("text-decrypted-title"), {
        description: t("text-decrypted-desc"),
      })
    } catch {
      toast(t("text-decrypted-error"))
    }
  }

  function hex2a(hex: string): string {
    let str = ""
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  function hashClick() {
    if (!textToHash) {
      toast(t("missing-information"), {
        description: t("missing-information-desc"),
      })
      return
    }
    switch (hashAlgo) {
      case "md5":
        setHashedText(CryptoJS.MD5(textToHash).toString())
        break
      case "sha-1":
        setHashedText(CryptoJS.SHA1(textToHash).toString())
        break
      case "sha-256":
        setHashedText(CryptoJS.SHA256(textToHash).toString())
        break
      case "sha-512":
        setHashedText(CryptoJS.SHA512(textToHash).toString())
        break
      case "sha-3":
        setHashedText(CryptoJS.SHA3(textToHash).toString())
        break
      default:
        break
    }
  }

  // Copy to clipboard function
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast(t("copied"))
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <Translate20Regular primaryFill="#0088FF" className="text-white" />

        <p className="ml-2 font-bold">{t("encryption")}</p>
      </div>
      <Tabs defaultValue="encrypt" className="w-full max-w-5xl mx-auto">
        <div className="mx-auto w-full max-w-2xl mb-8">
          <TabsList className="w-full">
            <TabsTrigger value="encrypt" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-primary/20 to-purple-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Password20Regular className="h-5 w-5" />
                <p className="font-medium">{t("encrypt")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="decrypt" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-primary/20 to-emerald-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Translate20Regular className="h-5 w-5" />
                <p className="font-medium">{t("decrypt")}</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="hashing" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-primary/20 to-orange-500/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity rounded-full blur-sm"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <NumberSymbol20Regular className="h-5 w-5" />
                <p className="font-medium">{t("hashing")}</p>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="encrypt"
        >
          <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-blue-500 to-primary rounded-full p-1.5">
                  <Password20Regular className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("encrypt")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("encrypt-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="text-to-encrypt" className="text-sm font-medium">{t("text-to-encrypt")}</Label>
                <Textarea
                  id="text-to-encrypt"
                  placeholder={t("encrypt-text-placeholder")}
                  value={textToEncrypt}
                  onChange={(e) => setTextToEncrypt(e.target.value)}
                  className="min-h-[120px] bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="encryption-key" className="text-sm font-medium">{t("key")}</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      id="encryption-key"
                      type={keyVis ? "text" : "password"}
                      placeholder={t("key-placeholder")}
                      value={encryptionKey}
                      onChange={(e) => setEncryptionKey(e.target.value)}
                      className="h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30 pr-12"
                    />
                    <Button
                      className="absolute right-0 top-0 h-full px-3"
                      variant="ghost"
                      onClick={() => setKeyVis(!keyVis)}
                    >
                      {keyVis ? <EyeOff20Regular className="h-5 w-5" /> : <Eye20Regular className="h-5 w-5" />}
                    </Button>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-12 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/80 border-primary/10 hover:border-primary/30"
                          id="GenKeyBtn"
                          onClick={() =>
                            setEncryptionKey(
                              generatePasswordByStrength(2, {
                                lowerCases: "abcdefghijklmnopqrstuvwxyz",
                                upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                numbers: "01234567889",
                                special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                              })
                            )
                          }
                        >
                          <Key20Regular className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("generate-key")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm" className="text-sm font-medium">{t("encryption-algo")}</Label>
                <Select
                  defaultValue={settings.encryptAlgo}
                  onValueChange={onSelectChanged}
                >
                  <SelectTrigger className="h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30">
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
              {encryptedText && (
                <div className="space-y-2 pt-4 border-t border-primary/10">
                  <Label htmlFor="encrypted-result" className="text-sm font-medium flex items-center gap-2">
                    {t("encrypted-text")}
                    <span className="bg-blue-500/10 text-blue-500 text-xs px-2 py-0.5 rounded-full">
                      {algo.toUpperCase()}
                    </span>
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="encrypted-result"
                      value={encryptedText}
                      readOnly
                      className="min-h-[120px] pr-12 bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3"
                      onClick={() => copyToClipboard(encryptedText)}
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">{t("copy-to-clipboard")}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 pb-6 relative z-10">
              <Button 
                onClick={encrypt} 
                className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Password20Regular className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("encrypt")}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          className="justify-center border-none data-[state=active]:flex"
          value="decrypt"
        >
          <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-xl"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-green-500 to-primary rounded-full p-1.5">
                  <Translate20Regular className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("decrypt")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("decrypt-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="text-to-decrypt" className="text-sm font-medium">{t("encrypted-text")}</Label>
                <Textarea
                  id="text-to-decrypt"
                  placeholder={t("encrypt-text-placeholder")}
                  value={textToDecrypt}
                  onChange={(e) => setTextToDecrypt(e.target.value)}
                  className="min-h-[120px] bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decryption-key" className="text-sm font-medium">{t("key")}</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      id="decryption-key"
                      type={keyVis ? "text" : "password"}
                      placeholder={t("key-placeholder")}
                      value={decryptionKey}
                      onChange={(e) => setDecryptionKey(e.target.value)}
                      className="h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30 pr-12"
                    />
                    <Button
                      className="absolute right-0 top-0 h-full px-3"
                      variant="ghost"
                      onClick={() => setKeyVis(!keyVis)}
                    >
                      {keyVis ? <EyeOff20Regular className="h-5 w-5" /> : <Eye20Regular className="h-5 w-5" />}
                    </Button>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-12 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/80 border-primary/10 hover:border-primary/30"
                          id="GenKeyBtn"
                          onClick={() =>
                            setDecryptionKey(
                              generatePasswordByStrength(2, {
                                lowerCases: "abcdefghijklmnopqrstuvwxyz",
                                upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                numbers: "01234567889",
                                special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
                              })
                            )
                          }
                        >
                          <Key20Regular className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("generate-key")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm" className="text-sm font-medium">{t("decryption-algo")}</Label>
                <Select
                  defaultValue={settings.encryptAlgo}
                  onValueChange={onSelectChanged}
                >
                  <SelectTrigger className="h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30">
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
              {decryptedText && (
                <div className="space-y-2 pt-4 border-t border-primary/10">
                  <Label htmlFor="decrypted-result" className="text-sm font-medium flex items-center gap-2">
                    {t("decrypted-text")}
                    <span className="bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full">
                      {algo.toUpperCase()}
                    </span>
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="decrypted-result"
                      value={decryptedText}
                      readOnly
                      className="min-h-[120px] pr-12 bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3"
                      onClick={() => copyToClipboard(decryptedText)}
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">{t("copy-to-clipboard")}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 pb-6 relative z-10">
              <Button 
                onClick={decrypt} 
                className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 via-primary to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Translate20Regular className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("decrypt")}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          value="hashing"
          className="justify-center border-none data-[state=active]:flex"
        >
          <Card className="w-full shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 rounded-xl"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-amber-500 to-primary rounded-full p-1.5">
                  <NumberSymbol20Regular className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl">{t("hashing")}</CardTitle>
              </div>
              <CardDescription className="text-base">{t("hash-desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="text-to-hash" className="text-sm font-medium">{t("text-hash")}</Label>
                <Textarea
                  id="text-to-hash"
                  placeholder={t("hash-text-placeholder")}
                  value={textToHash}
                  onChange={(e) => setTextToHash(e.target.value)}
                  className="min-h-[120px] bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hash-algorithm" className="text-sm font-medium">{t("hashing-algo")}</Label>
                <Select
                  onValueChange={(v: string) => setHashAlgo(v)}
                  defaultValue={hashAlgo}
                >
                  <SelectTrigger className="h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30">
                    <SelectValue placeholder={t("hashing-algo")} />
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
              {hashedText && (
                <div className="space-y-2 pt-4 border-t border-primary/10">
                  <Label htmlFor="hashed-result" className="text-sm font-medium flex items-center gap-2">
                    {t("hashed-text")}
                    <span className="bg-amber-500/10 text-amber-500 text-xs px-2 py-0.5 rounded-full">
                      {hashAlgo.toUpperCase()}
                    </span>
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="hashed-result"
                      value={hashedText}
                      readOnly
                      className="min-h-[120px] pr-12 bg-background/80 backdrop-blur-sm resize-none border-primary/10 focus:border-primary/30 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3"
                      onClick={() => copyToClipboard(hashedText)}
                    >
                      {copied ? (
                        <Checkmark20Regular className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy20Regular className="h-5 w-5" />
                      )}
                      <span className="sr-only">{t("copy-to-clipboard")}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 pb-6 relative z-10">
              <Button 
                onClick={hashClick} 
                className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 via-primary to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <NumberSymbol20Regular className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("hash")}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
