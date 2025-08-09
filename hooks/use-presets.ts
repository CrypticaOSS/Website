import { PasswordPreset } from "@/lib/password"
import { useLocalStorage } from "./use-localStorage"
import { useSettings } from "./use-settings"
import { useStorage } from "./use-storage"

export function usePresets() {
  const { settings } = useSettings()
  const [presets, setPresets] = useStorage<PasswordPreset[]>(
    "passliss-presets",
    [],
    settings.dbConnection
  )

  return {
    presets,
    setPresets,
  }
}
