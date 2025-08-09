import { useLocalStorage } from "./use-localStorage"
import { useStorage } from "./use-storage"

export interface Settings {
  passwordLengthOne: number
  passwordLengthTwo: number
  customChars: CustomCharacters
  encryptAlgo: string
  hashAlgo?: string
  hidePassword?: boolean
  defaultPasswordConfig?: DefaultPasswordConfig
  openaiKey?: string
  dbConnection?: {
    url: string
    apiKey?: string
    enabled: boolean
    type: 'supabase' | 'firebase' | 'custom'
  }
}

export interface CustomCharacters {
  lowerCases: string
  upperCases: string
  numbers: string
  special: string
}

export interface DefaultPasswordConfig {
  lowerCases: boolean
  upperCases: boolean
  numbers: boolean
  special: boolean
}

export const defaultSettings = {
  passwordLengthOne: 12,
  passwordLengthTwo: 19,
  encryptAlgo: "aes",
  customChars: {
    lowerCases: "abcdefghijklmnopqrstuvwxyz",
    upperCases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨",
  },
  hidePassword: false,
  openaiKey: "",
}

export function useSettings() {
  // First get settings using localStorage to check if DB is enabled
  const [localSettings] = useLocalStorage<Settings>(
    "settings",
    defaultSettings
  )
  
  // Use useStorage with DB config if available
  const [settings, setSettings] = useStorage<Settings>(
    "settings",
    defaultSettings,
    localSettings.dbConnection
  )

  return {
    settings,
    setSettings,
  }
}
