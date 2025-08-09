"use client"

import { useState } from "react"
import { useVault } from "@/hooks/use-vault"
import { useTranslations } from "next-intl"
import {
  Eye,
  EyeOff,
  Folder,
  Key,
  Lock,
  FileText,
  User,
  Globe,
  Plus,
  Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function VaultPage() {
  const t = useTranslations()
  const { vault, addEntry, deleteEntry } = useVault()
  const [showPasswordId, setShowPasswordId] = useState<string | null>(null)
  const [form, setForm] = useState({ service: "", username: "", password: "", notes: "" })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!form.service || !form.password) return
    addEntry(form)
    setForm({ service: "", username: "", password: "", notes: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex items-center space-x-2">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-1.5">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <p className="ml-2 text-xl font-bold">{t("password-vault")}</p>
      </div>

      <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-full p-1.5">
              <Key className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl">{t("add-new-password")}</CardTitle>
          </div>
          <CardDescription className="text-base">{t("vault-desc") || "Store your passwords securely in your browser"}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <form className="grid gap-5" onSubmit={handleAdd} autoComplete="off">
            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium">{t("service")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <Globe className="h-5 w-5" />
                </div>
                <Input
                  id="service"
                  placeholder={t("service") + " (e.g. Gmail)"}
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  autoComplete="off"
                  required
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">{t("username")} <span className="text-xs text-muted-foreground">({t("optional").toLowerCase()})</span></Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="username"
                  placeholder={t("username")}
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  autoComplete="off"
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
              <div className="relative flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Key className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    placeholder={t("password")}
                    type={showPasswordId === "new" ? "text" : "password"}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    autoComplete="new-password"
                    required
                    className="pl-10 pr-12 h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswordId(showPasswordId === "new" ? null : "new")}
                  >
                    {showPasswordId === "new" ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">{t("notes")} <span className="text-xs text-muted-foreground">({t("optional").toLowerCase()})</span></Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <Input
                  id="notes"
                  placeholder={t("notes")}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  autoComplete="off"
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="pt-2 pb-6 relative z-10">
          <Button
            type="submit"
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 py-6 text-base relative overflow-hidden group"
            size="lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <Plus className="h-5 w-5 relative z-10" />
            <span className="relative z-10">{t("add")}</span>
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-1.5">
            <Folder className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">{t("saved-passwords")}</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {vault.length} {vault.length === 1 ? t("password") : t("passwords")}
        </div>
      </div>

      <div className="grid gap-4">
        {vault.length === 0 && (
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-8 text-center border border-primary/10">
            <div className="mx-auto bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary/50" />
            </div>
            <h3 className="text-lg font-medium mb-2">{t("no-passwords-saved")}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("vault-empty-message") || "Add passwords to your vault to keep them secure and easily accessible."}
            </p>
          </div>
        )}

        {vault.map(entry => (
          <Card key={entry.id} className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500/80 to-blue-500/80 h-10 w-10 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>{entry.service}</CardTitle>
                  {entry.username && <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <User className="h-4 w-4" />
                    {entry.username}
                  </div>}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={() => deleteEntry(entry.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <Input
                    type={showPasswordId === entry.id ? "text" : "password"}
                    value={entry.password}
                    readOnly
                    autoComplete="off"
                    className="font-mono bg-background/80 border-primary/10 pr-12 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswordId(showPasswordId === entry.id ? null : entry.id)}
                  >
                    {showPasswordId === entry.id ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              {entry.notes && (
                <div className="mt-4 text-sm bg-background/50 border border-primary/5 rounded-md p-3 flex items-start gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>{entry.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
