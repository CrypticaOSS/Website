"use client"

import Link from "next/link"
import {
  Info20Regular,
  LockClosed20Regular,
  Shield20Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

export default function EncryptionDocsPage() {
  const t = useTranslations()

  return (
    <>
      <div className="mb-8 flex items-center">
        <LockClosed20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {t("docs-encryption-tools")} {t("docs-guide")}
        </h2>
      </div>

      <p className="mb-6">{t("docs-encryption-intro")}</p>

      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start">
          <Info20Regular className="mt-0.5 mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              {t("docs-client-side-encryption")}
            </h3>
            <p className="mt-1 text-blue-700 dark:text-blue-400">
              {t("docs-client-side-encryption-desc")}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("docs-encryption-methods")}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("docs-aes-encryption")}
          </h4>
          <p className="mb-3">{t("docs-aes-encryption-desc")}</p>

          <h5 className="mb-2 font-medium">{t("docs-how-to-use")}:</h5>
          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("docs-encryption-step-1")}</li>
            <li>{t("docs-encryption-step-2")}</li>
            <li>{t("docs-encryption-step-3")}</li>
            <li>{t("docs-encryption-step-4")}</li>
          </ol>

          <div className="bg-muted rounded-md p-3">
            <p className="mb-1 text-sm font-medium">{t("important-note")}:</p>
            <p className="text-sm">{t("docs-encryption-note")}</p>
          </div>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">{t("docs-decryption")}</h4>
          <p className="mb-3">{t("docs-decryption-desc")}</p>

          <h5 className="mb-2 font-medium">{t("docs-how-to-use")}:</h5>
          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("docs-decryption-step-1")}</li>
            <li>{t("docs-decryption-step-2")}</li>
            <li>{t("docs-decryption-step-3")}</li>
            <li>{t("docs-decryption-step-4")}</li>
          </ol>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">{t("docs-best-practices")}</h3>

      <div className="mb-8 space-y-4">
        <div className="flex items-start">
          <Shield20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">{t("docs-strong-passwords")}</h4>
            <p className="text-muted-foreground text-sm">
              {t("docs-strong-passwords-desc")}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Shield20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">{t("docs-secure-sharing")}</h4>
            <p className="text-muted-foreground text-sm">
              {t("docs-secure-sharing-desc")}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Shield20Regular className="text-primary mt-0.5 mr-2 h-5 w-5" />
          <div>
            <h4 className="font-medium">{t("docs-store-separately")}</h4>
            <p className="text-muted-foreground text-sm">
              {t("docs-store-separately-desc")}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("docs-technical-details")}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">{t("docs-technical-details-desc")}</p>

        <ul className="list-disc space-y-2 pl-5">
          <li>{t("docs-tech-detail-1")}</li>
          <li>{t("docs-tech-detail-2")}</li>
          <li>{t("docs-tech-detail-3")}</li>
          <li>{t("docs-tech-detail-4")}</li>
        </ul>
      </div>

      <div className="mt-10 border-t pt-4">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-primary text-sm"
        >
          ← {t("docs-back")}
        </Link>
      </div>
    </>
  )
}
