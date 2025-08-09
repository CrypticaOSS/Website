import { useCallback, useEffect, useState } from "react"

import { formatDatabaseUrl } from "@/lib/db-connection"

export interface DbConnectionConfig {
  url: string
  apiKey?: string
  enabled: boolean
  type: "supabase" | "firebase" | "custom"
}

export function useStorage<T>(
  key: string,
  initialValue: T,
  dbConfig?: DbConnectionConfig
) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // If not in browser or db not configured, return initial value
    if (typeof window === "undefined" || !dbConfig?.enabled) {
      return initialValue
    }

    try {
      // Try to fetch from localStorage first
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Error reading from storage:", error)
      return initialValue
    }
  })

  // Fetch from database if enabled
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (dbConfig?.enabled) {
      fetchFromDatabase()
    } else {
      // Fall back to localStorage
      try {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
          const value = JSON.parse(item)
          setStoredValue(value)
        } else {
          // If the key doesn't exist, initialize with default value
          window.localStorage.setItem(key, JSON.stringify(initialValue))
          setStoredValue(initialValue)
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error)
      }
    }
  }, [key, dbConfig?.enabled, dbConfig?.url])

  // Function to fetch data from database
  const fetchFromDatabase = async () => {
    if (!dbConfig?.enabled || !dbConfig?.url) return

    try {
      const formattedUrl = formatDatabaseUrl(dbConfig)

      // Handle different database providers
      switch (dbConfig.type) {
        case "supabase": {
          const headers: HeadersInit = {
            "Content-Type": "application/json",
            apikey: dbConfig.apiKey || "",
            Authorization: `Bearer ${dbConfig.apiKey || ""}`,
            Prefer: "return=representation",
          }

          const response = await fetch(
            `${formattedUrl}/items?key=eq.${encodeURIComponent(key)}`,
            {
              method: "GET",
              headers,
            }
          )

          if (response.ok) {
            const data = await response.json()
            if (data && data.length > 0 && data[0].value) {
              setStoredValue(data[0].value)
            } else {
              // If no data in DB, initialize with local value
              await saveToDatabase(storedValue)
            }
          } else {
            console.error("Supabase fetch error:", response.statusText)
          }
          break
        }

        case "firebase": {
          const url = new URL(
            `${formattedUrl}/items/${encodeURIComponent(key)}.json`
          )
          if (dbConfig.apiKey) {
            url.searchParams.append("auth", dbConfig.apiKey)
          }

          const response = await fetch(url.toString(), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })

          if (response.ok) {
            const data = await response.json()
            if (data !== null) {
              setStoredValue(data)
            } else {
              // If no data in DB, initialize with local value
              await saveToDatabase(storedValue)
            }
          } else {
            console.error("Firebase fetch error:", response.statusText)
          }
          break
        }

        case "custom":
        default: {
          const headers: HeadersInit = {
            "Content-Type": "application/json",
          }

          if (dbConfig.apiKey) {
            headers["Authorization"] = `Bearer ${dbConfig.apiKey}`
          }

          const response = await fetch(
            `${formattedUrl}/items/${encodeURIComponent(key)}`,
            {
              method: "GET",
              headers,
            }
          )

          if (response.ok) {
            const data = await response.json()
            setStoredValue(data)
          } else {
            // If no data in DB, initialize with local value
            await saveToDatabase(storedValue)
          }
          break
        }
      }
    } catch (error) {
      console.error("Error fetching from database:", error)
      // Fall back to localStorage if DB fails
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        setStoredValue(JSON.parse(item))
      }
    }
  }

  // Function to save to database
  const saveToDatabase = async (valueToStore: T) => {
    if (!dbConfig?.enabled || !dbConfig?.url) return

    try {
      const formattedUrl = formatDatabaseUrl(dbConfig)

      // Handle different database providers
      switch (dbConfig.type) {
        case "supabase": {
          const headers: HeadersInit = {
            "Content-Type": "application/json",
            apikey: dbConfig.apiKey || "",
            Authorization: `Bearer ${dbConfig.apiKey || ""}`,
            Prefer: "resolution=merge-duplicates",
          }

          // Use Record<string, any> so we can add created_at dynamically
          const payload: Record<string, any> = {
            key: key,
            value: valueToStore,
            updated_at: new Date().toISOString(),
          }

          // First check if item exists
          const checkResponse = await fetch(
            `${formattedUrl}/items?key=eq.${encodeURIComponent(key)}`,
            {
              method: "GET",
              headers,
            }
          )

          if (checkResponse.ok) {
            const existingData = await checkResponse.json()

            if (existingData && existingData.length > 0) {
              // Update existing item
              await fetch(
                `${formattedUrl}/items?key=eq.${encodeURIComponent(key)}`,
                {
                  method: "PATCH",
                  headers,
                  body: JSON.stringify(payload),
                }
              )
            } else {
              // Insert new item
              payload["created_at"] = new Date().toISOString()
              await fetch(`${formattedUrl}/items`, {
                method: "POST",
                headers,
                body: JSON.stringify(payload),
              })
            }
          }
          break
        }

        case "firebase": {
          const url = new URL(
            `${formattedUrl}/items/${encodeURIComponent(key)}.json`
          )
          if (dbConfig.apiKey) {
            url.searchParams.append("auth", dbConfig.apiKey)
          }

          await fetch(url.toString(), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valueToStore),
          })
          break
        }

        case "custom":
        default: {
          const headers: HeadersInit = {
            "Content-Type": "application/json",
          }

          if (dbConfig.apiKey) {
            headers["Authorization"] = `Bearer ${dbConfig.apiKey}`
          }

          await fetch(`${formattedUrl}/items/${encodeURIComponent(key)}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(valueToStore),
          })
          break
        }
      }
    } catch (error) {
      console.error("Error saving to database:", error)
    }
  }

  // Function to set value in both localStorage and database if enabled
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== "undefined") {
          // Always keep localStorage in sync
          window.localStorage.setItem(key, JSON.stringify(valueToStore))

          // If database is enabled, also save there
          if (dbConfig?.enabled) {
            saveToDatabase(valueToStore)
          }
        }
      } catch (error) {
        console.error("Error writing to storage:", error)
      }
    },
    [key, storedValue, dbConfig?.enabled, dbConfig?.url]
  )

  return [storedValue, setValue] as const
}
