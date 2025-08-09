"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Database20Regular, 
  Info20Regular,
  Code20Regular,
  LockClosed20Regular
} from "@fluentui/react-icons";

export default function FirebaseDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <Database20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">Firebase {t("setup")}</h2>
      </div>
      
      <p className="mb-6">{t("firebase-intro")}</p>
      
      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300">{t("security-notice")}</h3>
            <p className="text-amber-700 dark:text-amber-400 mt-1">{t("firebase-security-notice")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("setup-steps")}</h3>
      
      <div className="space-y-8 mb-10">
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 1: {t("create-firebase-project")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("firebase-step-1")}</li>
            <li>{t("firebase-step-2")}</li>
            <li>{t("firebase-step-3")}</li>
          </ol>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 2: {t("setup-firestore")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("firestore-step-1")}</li>
            <li>{t("firestore-step-2")}</li>
            <li>{t("firestore-step-3")}</li>
          </ol>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("security-rules")}</span>
              <Code20Regular className="h-4 w-4" />
            </div>
            <pre className="text-sm overflow-auto">
              <code>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{key} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == request.resource.data.value.userId;
    }
  }
}`}</code>
            </pre>
          </div>
          
          <p>{t("firebase-rules-explanation")}</p>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 3: {t("setup-authentication")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("firebase-auth-1")}</li>
            <li>{t("firebase-auth-2")}</li>
            <li>{t("firebase-auth-3")}</li>
          </ol>
          
          <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
            <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-400">{t("firebase-auth-note")}</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 4: {t("get-firebase-config")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("firebase-config-1")}</li>
            <li>{t("firebase-config-2")}</li>
          </ol>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("firebase-config")}</span>
              <Code20Regular className="h-4 w-4" />
            </div>
            <pre className="text-sm overflow-auto">
              <code>{`{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}`}</code>
            </pre>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("step")} 5: {t("configure-cryptica")}</h4>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("cryptica-firebase-1")}</li>
            <li>{t("cryptica-firebase-2")}</li>
            <li>{t("cryptica-firebase-3")}</li>
          </ol>
          
          <div className="flex items-start p-3 bg-muted rounded-md">
            <LockClosed20Regular className="h-5 w-5 mr-2 mt-0.5" />
            <p className="text-sm">{t("data-encryption-reminder")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("troubleshooting")}</h3>
      <div className="space-y-4 mb-8">
        <div>
          <h4 className="font-medium mb-1">{t("connection-failed")}</h4>
          <p className="text-sm text-muted-foreground">{t("firebase-troubleshoot-1")}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">{t("auth-issues")}</h4>
          <p className="text-sm text-muted-foreground">{t("firebase-troubleshoot-2")}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">{t("cors-issues")}</h4>
          <p className="text-sm text-muted-foreground">{t("firebase-troubleshoot-3")}</p>
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
