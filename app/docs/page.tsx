"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  BookInformation20Regular,
  Info20Regular,
  BookCompass20Regular,
  Password20Regular,
  Shield20Regular,
  History20Regular,
  SlideSettings20Regular,
  LockClosed20Regular,
  DataHistogram20Regular,
  Database20Regular
} from "@fluentui/react-icons";

export default function DocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <BookInformation20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("docs-title")}</h2>
      </div>
      
      <p className="mb-6">{t("docs-intro")}</p>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{t("docs-getting-started")}</h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">{t("docs-new-user-note")}</p>
            <Link href="/docs/getting-started" className="text-blue-600 dark:text-blue-300 hover:underline mt-2 inline-block">
              {t("docs-getting-started-cta")}
            </Link>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("docs-available")}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link 
          href="/docs/getting-started"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <BookCompass20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-getting-started")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-getting-started-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/generator"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Password20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-password-generator")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-generator-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/encryption"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <LockClosed20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-encryption-tools")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-encryption-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/strength"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <DataHistogram20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-password-strength")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-strength-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/activity"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <History20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-activity-tracking")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-activity-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/settings"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <SlideSettings20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("docs-settings-custom")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("docs-settings-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/database"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Database20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("database-sync")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("database-sync-desc")}</p>
        </Link>
        
        <Link 
          href="/docs/security"
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Shield20Regular className="h-5 w-5 mr-2 text-primary" />
            <h4 className="text-lg font-medium">{t("security")}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{t("security-desc")}</p>
        </Link>
      </div>
      
      <div className="mt-10 border-t pt-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{t("docs-last-updated")} August 2025</p>
        <Link 
          href="https://github.com/CrypticaOSS/Website"
          className="text-sm text-muted-foreground hover:text-primary flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mr-1">{t("docs-contribute")}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </Link>
      </div>
    </>
  );
}
