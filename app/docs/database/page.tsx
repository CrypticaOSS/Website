"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Database20Regular, 
  Info20Regular,
  ArrowRight20Regular,
  ShieldLock20Regular
} from "@fluentui/react-icons";

export default function DatabaseDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <Database20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("database-sync")}</h2>
      </div>
      
      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300">{t("important-note")}</h3>
            <p className="text-amber-700 dark:text-amber-400 mt-1">{t("database-security-warning")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("available-providers")}</h3>
      <p className="mb-6">{t("provider-description")}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link 
          href="/docs/database/supabase"
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div>
            <h4 className="text-lg font-medium mb-1">Supabase</h4>
            <p className="text-sm text-muted-foreground">{t("supabase-desc")}</p>
          </div>
          <ArrowRight20Regular className="h-5 w-5 text-muted-foreground" />
        </Link>
        
        <Link 
          href="/docs/database/firebase"
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div>
            <h4 className="text-lg font-medium mb-1">Firebase</h4>
            <p className="text-sm text-muted-foreground">{t("firebase-desc")}</p>
          </div>
          <ArrowRight20Regular className="h-5 w-5 text-muted-foreground" />
        </Link>
        
        <Link 
          href="/docs/database/custom"
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div>
            <h4 className="text-lg font-medium mb-1">{t("custom-api")}</h4>
            <p className="text-sm text-muted-foreground">{t("custom-api-desc")}</p>
          </div>
          <ArrowRight20Regular className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("security-encryption")}</h3>
      <div className="p-4 border rounded-lg mb-8">
        <div className="flex items-start mb-4">
          <ShieldLock20Regular className="h-5 w-5 mr-2 mt-0.5" />
          <div>
            <h4 className="text-lg font-medium">{t("end-to-end")}</h4>
            <p className="mt-1">{t("encryption-explanation")}</p>
          </div>
        </div>
        
        <div className="pl-7">
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("encryption-point-1")}</li>
            <li>{t("encryption-point-2")}</li>
            <li>{t("encryption-point-3")}</li>
          </ul>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("getting-started")}</h3>
      <p className="mb-6">{t("getting-started-desc")}</p>
      
      <ol className="list-decimal space-y-3 pl-5 mb-8">
        <li>{t("step-1")}</li>
        <li>{t("step-2")}</li>
        <li>{t("step-3")}</li>
        <li>{t("step-4")}</li>
      </ol>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("back-to-docs")}
        </Link>
      </div>
    </>
  );
}
