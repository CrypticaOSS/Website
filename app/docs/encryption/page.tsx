"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Key20Regular, 
  Info20Regular,
  Shield20Regular,
  LockClosed20Regular
} from "@fluentui/react-icons";

export default function EncryptionDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <LockClosed20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("docs-encryption-tools")} {t("docs-guide")}</h2>
      </div>
      
      <p className="mb-6">{t("docs-encryption-intro")}</p>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{t("docs-client-side-encryption")}</h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">{t("docs-client-side-encryption-desc")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("docs-encryption-methods")}</h3>
      
      <div className="space-y-6 mb-8">
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("docs-aes-encryption")}</h4>
          <p className="mb-3">{t("docs-aes-encryption-desc")}</p>
          
          <h5 className="font-medium mb-2">{t("docs-how-to-use")}:</h5>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("docs-encryption-step-1")}</li>
            <li>{t("docs-encryption-step-2")}</li>
            <li>{t("docs-encryption-step-3")}</li>
            <li>{t("docs-encryption-step-4")}</li>
          </ol>
          
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium mb-1">{t("important-note")}:</p>
            <p className="text-sm">{t("docs-encryption-note")}</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-5">
          <h4 className="text-lg font-medium mb-3">{t("docs-decryption")}</h4>
          <p className="mb-3">{t("docs-decryption-desc")}</p>
          
          <h5 className="font-medium mb-2">{t("docs-how-to-use")}:</h5>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li>{t("docs-decryption-step-1")}</li>
            <li>{t("docs-decryption-step-2")}</li>
            <li>{t("docs-decryption-step-3")}</li>
            <li>{t("docs-decryption-step-4")}</li>
          </ol>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("docs-best-practices")}</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
          <div>
            <h4 className="font-medium">{t("docs-strong-passwords")}</h4>
            <p className="text-sm text-muted-foreground">{t("docs-strong-passwords-desc")}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
          <div>
            <h4 className="font-medium">{t("docs-secure-sharing")}</h4>
            <p className="text-sm text-muted-foreground">{t("docs-secure-sharing-desc")}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Shield20Regular className="h-5 w-5 mr-2 mt-0.5 text-primary" />
          <div>
            <h4 className="font-medium">{t("docs-store-separately")}</h4>
            <p className="text-sm text-muted-foreground">{t("docs-store-separately-desc")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("docs-technical-details")}</h3>
      
      <div className="border rounded-lg p-5 mb-8">
        <p className="mb-3">{t("docs-technical-details-desc")}</p>
        
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("docs-tech-detail-1")}</li>
          <li>{t("docs-tech-detail-2")}</li>
          <li>{t("docs-tech-detail-3")}</li>
          <li>{t("docs-tech-detail-4")}</li>
        </ul>
      </div>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("docs-back")}
        </Link>
      </div>
    </>
  );
}
