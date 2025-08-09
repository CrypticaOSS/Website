"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  SlideSettings20Regular, 
  Info20Regular,
  GlobeStar20Regular,
  ColorBackground20Regular,
  Database20Regular
} from "@fluentui/react-icons";

export default function SettingsDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <SlideSettings20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("settings")} {t("guide")}</h2>
      </div>
      
      <p className="mb-6">{t("settings-intro") || "Cryptica offers various customization options to tailor the application to your preferences and needs. This guide explains all available settings and how to configure them for the best experience."}</p>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{t("local-settings") || "Local Settings Storage"}</h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">{t("local-settings-desc") || "Your settings are stored locally on your device by default. If you enable database synchronization, your settings will be synchronized across your devices."}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("appearance-settings") || "Appearance Settings"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <h4 className="text-lg font-medium mb-3">{t("theme-settings") || "Theme Settings"}</h4>
        <p className="mb-3">{t("theme-desc") || "Customize the visual appearance of Cryptica to suit your preferences."}</p>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <ColorBackground20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <h5 className="font-medium">{t("theme-mode") || "Theme Mode"}</h5>
              <p className="text-sm text-muted-foreground">{t("theme-mode-desc") || "Choose between Light, Dark, or System theme. The System option automatically matches your device's theme settings."}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <ColorBackground20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <h5 className="font-medium">{t("custom-characters") || "Custom Characters"}</h5>
              <p className="text-sm text-muted-foreground">{t("custom-characters-desc") || "Customize which characters are used in password generation for each character category (uppercase, lowercase, numbers, and special characters)."}</p>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("language-settings") || "Language Settings"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <div className="flex items-start">
          <GlobeStar20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
          <div>
            <h4 className="text-lg font-medium mb-2">{t("language-selection") || "Language Selection"}</h4>
            <p className="mb-3">{t("language-desc") || "Cryptica supports multiple languages to make the application accessible to users worldwide."}</p>
            
            <h5 className="font-medium mb-2">{t("available-languages") || "Available Languages"}:</h5>
            <ul className="list-disc space-y-2 pl-5">
              <li>English (en)</li>
              <li>French (fr)</li>
              <li>{t("more-coming") || "More languages coming soon"}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("security-settings") || "Security Settings"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("security-settings-desc") || "Configure security-related settings to enhance your protection."}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">{t("clipboard-timeout") || "Clipboard Timeout"}</h4>
            <p className="text-sm text-muted-foreground mb-2">{t("clipboard-desc") || "Set the amount of time after which copied passwords are automatically cleared from your clipboard."}</p>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs">{t("clipboard-recommendation") || "Recommended: 30-60 seconds for balance between security and convenience."}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">{t("openai-settings") || "OpenAI API Settings"}</h4>
            <p className="text-sm text-muted-foreground">{t("openai-desc") || "Configure your OpenAI API key to use the AI-assisted password generation feature. The API key is stored securely and only used for password generation requests."}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("database-settings") || "Database Synchronization Settings"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <div className="flex items-start">
          <Database20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
          <div>
            <h4 className="text-lg font-medium mb-2">{t("sync-configuration") || "Synchronization Configuration"}</h4>
            <p className="mb-3">{t("sync-config-desc") || "Set up synchronization to keep your data consistent across multiple devices."}</p>
            
            <h5 className="font-medium mb-2">{t("supported-providers") || "Supported Providers"}:</h5>
            <ul className="list-disc space-y-2 pl-5 mb-4">
              <li><strong>Supabase</strong>: {t("supabase-desc") || "PostgreSQL-based backend as a service."}</li>
              <li><strong>Firebase</strong>: {t("firebase-desc") || "Google's mobile and web application development platform."}</li>
              <li><strong>{t("custom-api") || "Custom API"}</strong>: {t("custom-api-desc") || "Connect to your own API implementation for complete control."}</li>
            </ul>
            
            <h5 className="font-medium mb-2">{t("config-options") || "Configuration Options"}:</h5>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>{t("database-url") || "Database URL"}</strong>: {t("url-desc") || "The endpoint URL for your chosen database provider."}</li>
              <li><strong>{t("api-key") || "API Key"}</strong>: {t("api-key-desc") || "Authentication key for accessing your database (if required)."}</li>
              <li><strong>{t("sync-toggle") || "Synchronization Toggle"}</strong>: {t("toggle-desc") || "Enable or disable synchronization as needed."}</li>
              <li><strong>{t("test-connection") || "Test Connection"}</strong>: {t("test-desc") || "Verify your database connection is working properly."}</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md mt-4">
          <p className="text-sm font-medium mb-1">{t("sync-security-note") || "Security Note"}:</p>
          <p className="text-sm">{t("sync-security-desc") || "All synchronized data is encrypted before being sent to your database. Your encryption keys remain on your device and are never transmitted."}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("advanced-settings") || "Advanced Settings"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("advanced-desc") || "Additional settings for advanced users."}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">{t("import-export") || "Import/Export Settings"}</h4>
            <p className="text-sm text-muted-foreground">{t("import-export-desc") || "Export your settings to a JSON file for backup or to import them on another device."}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">{t("reset-settings") || "Reset Settings"}</h4>
            <p className="text-sm text-muted-foreground">{t("reset-desc") || "Reset all settings to their default values. This action cannot be undone."}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("troubleshooting") || "Troubleshooting Settings Issues"}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("troubleshooting-desc") || "If you encounter issues with your settings, try these solutions:"}</p>
        
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>{t("refresh-page") || "Refresh the Page"}</strong>: {t("refresh-desc") || "Sometimes a simple page refresh can resolve temporary issues."}</li>
          <li><strong>{t("clear-browser-cache") || "Clear Browser Cache"}</strong>: {t("cache-desc") || "Clearing your browser cache can help resolve persistent issues with settings not saving or loading correctly."}</li>
          <li><strong>{t("check-database") || "Check Database Connection"}</strong>: {t("check-db-desc") || "If using synchronization, ensure your database connection is valid and test it using the Test Connection button."}</li>
          <li><strong>{t("browser-storage") || "Check Browser Storage"}</strong>: {t("storage-check-desc") || "Ensure your browser allows local storage and doesn't have privacy settings that clear it automatically."}</li>
        </ol>
      </div>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("back-to-docs") || "Back to Documentation"}
        </Link>
      </div>
    </>
  );
}
