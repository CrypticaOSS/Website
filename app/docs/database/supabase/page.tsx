"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Database20Regular, 
  Info20Regular,
  Code20Regular
} from "@fluentui/react-icons";

export default function SupabaseDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <Database20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">Supabase {t("setup")}</h2>
      </div>
      
      <p className="mb-6">{t("supabase-intro")}</p>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="text-blue-700 dark:text-blue-400">{t("supabase-note")}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("setup-steps")}</h3>
      
      <div className="space-y-8 mb-10">
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 1: {t("create-supabase-project")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("supabase-step-1")}</li>
            <li>{t("supabase-step-2")}</li>
            <li>{t("supabase-step-3")}</li>
          </ol>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 2: {t("create-table")}</h4>
          <p className="mb-3">{t("supabase-create-table")}</p>
          
          <div className="bg-muted p-4 rounded-md mb-4 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">SQL</span>
              <Code20Regular className="h-4 w-4" />
            </div>
            <pre className="text-sm">
              <code>{`CREATE TABLE items (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own items"
  ON items
  FOR ALL
  USING (auth.uid() = (value->>'userId')::uuid);`}</code>
            </pre>
          </div>
          
          <p>{t("supabase-sql-explanation")}</p>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 3: {t("get-connection-info")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("supabase-connection-1")}</li>
            <li>{t("supabase-connection-2")}</li>
            <li>{t("supabase-connection-3")}</li>
          </ol>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("connection-string")}</span>
              <Code20Regular className="h-4 w-4" />
            </div>
            <pre className="text-sm overflow-auto">
              <code>{`https://[YOUR_PROJECT_ID].supabase.co`}</code>
            </pre>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 4: {t("configure-cryptica")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("cryptica-config-1")}</li>
            <li>{t("cryptica-config-2")}</li>
            <li>{t("cryptica-config-3")}</li>
            <li>{t("cryptica-config-4")}</li>
          </ol>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("troubleshooting")}</h3>
      <div className="space-y-4 mb-8">
        <div>
          <h4 className="font-medium mb-1">{t("connection-failed")}</h4>
          <p className="text-sm text-muted-foreground">{t("supabase-troubleshoot-1")}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">{t("access-denied")}</h4>
          <p className="text-sm text-muted-foreground">{t("supabase-troubleshoot-2")}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">{t("other-issues")}</h4>
          <p className="text-sm text-muted-foreground">{t("supabase-troubleshoot-3")}</p>
        </div>
      </div>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs/database" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("back-to-database")}
        </Link>
      </div>
    </>
  );
}
