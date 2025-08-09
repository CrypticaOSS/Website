import { useLocalStorage } from "./use-localStorage"
import { useSettings } from "./use-settings"
import { useStorage } from "./use-storage"

export interface VaultEntry {
  id: string
  service: string
  username?: string
  password: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export function useVault() {
  const { settings } = useSettings()
  const [vault, setVault] = useStorage<VaultEntry[]>(
    "vault", 
    [], 
    settings.dbConnection
  )

  function addEntry(entry: Omit<VaultEntry, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString()
    const newEntry: VaultEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    setVault((prev) => [...prev, newEntry])
  }

  function updateEntry(id: string, updates: Partial<Omit<VaultEntry, "id" | "createdAt">>) {
    setVault((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, ...updates, updatedAt: new Date().toISOString() } : entry
      )
    )
  }

  function deleteEntry(id: string) {
    setVault((prev) => prev.filter((entry) => entry.id !== id))
  }

  return { vault, addEntry, updateEntry, deleteEntry }
}
