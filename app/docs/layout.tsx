import { useTranslations } from "next-intl";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Read our documentation to learn more about our features and how to use them.',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">{t("documentation")}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <nav className="sticky top-20 space-y-2">
            <h2 className="font-semibold mb-4 text-lg">{t("categories")}</h2>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-primary hover:underline">
                  {t("overview")}
                </a>
              </li>
              <li>
                <a href="/docs/activity" className="text-primary hover:underline">
                  {t("activity")}
                </a>
              </li>
              <li>
                <a href="/docs/database" className="text-primary hover:underline">
                  {t("database-sync")}
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a href="/docs/database/custom" className="text-primary hover:underline">
                      Custom
                    </a>
                  </li>
                  <li>
                    <a href="/docs/database/firebase" className="text-primary hover:underline">
                      Firebase
                    </a>
                  </li>
                  <li>
                    <a href="/docs/database/supabase" className="text-primary hover:underline">
                      Supabase
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/docs/encryption" className="text-primary hover:underline">
                  {t("encryption")}
                </a>
              </li>
              <li>
                <a href="/docs/generator" className="text-primary hover:underline">
                  {t("password-generator")}
                </a>
              </li>
              <li>
                <a href="/docs/getting-started" className="text-primary hover:underline">
                  {t("getting-started")}
                </a>
              </li>
              <li>
                <a href="/docs/pwa" className="text-primary hover:underline">
                  PWA
                </a>
              </li>
              <li>
                <a href="/docs/security" className="text-primary hover:underline">
                  {t("security")}
                </a>
              </li>
              <li>
                <a href="/docs/settings" className="text-primary hover:underline">
                  {t("settings")}
                </a>
              </li>
              <li>
                <a href="/docs/strength" className="text-primary hover:underline">
                  {t("strength")}
                </a>
              </li>
              <li>
                <a href="/docs/self-hosting" className="text-primary hover:underline">
                  Self-Hosting
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="md:w-3/4">
          <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
