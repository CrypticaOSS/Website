"use client"

import Link from "next/link"
import { Info20Regular, Phone20Regular } from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

export default function PWADocsPage() {
  const t = useTranslations()

  return (
    <>
      <div className="mb-8 flex items-center">
        <Phone20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {t("pwa-guide") || "Installing Cryptica as an App"}
        </h2>
      </div>

      <p className="mb-6">
        {t("pwa-intro") ||
          "Cryptica is built as a Progressive Web App (PWA), which means you can install it on your device and use it like a native application. This guide explains how to install Cryptica on different devices."}
      </p>

      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start">
          <Info20Regular className="mt-0.5 mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              {t("pwa-benefits") || "Benefits of Installing as an App"}
            </h3>
            <p className="mt-1 text-blue-700 dark:text-blue-400">
              {t("pwa-benefits-desc") ||
                "Installing Cryptica as an app offers several advantages: faster access, offline capabilities, dedicated space on your home screen, and a more app-like experience without browser navigation elements."}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("install-mobile") || "Installing on Mobile Devices"}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-ios") || "iOS (iPhone & iPad)"}
          </h4>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("ios-step-1") ||
                "Open Cryptica in Safari browser (other browsers won't work for PWA installation on iOS)."}
            </li>
            <li>
              {t("ios-step-2") ||
                "Tap the Share button at the bottom of the screen (the square with an arrow pointing up)."}
            </li>
            <li>
              {t("ios-step-3") || "Scroll down and tap 'Add to Home Screen'."}
            </li>
            <li>
              {t("ios-step-4") ||
                "You can rename the app if you wish, then tap 'Add' in the top-right corner."}
            </li>
            <li>
              {t("ios-step-5") ||
                "Cryptica will now appear as an app icon on your home screen."}
            </li>
          </ol>

          <div className="bg-muted rounded-md p-3">
            <p className="mb-1 text-sm font-medium">
              {t("ios-note") || "Note for iOS Users"}:
            </p>
            <p className="text-sm">
              {t("ios-note-desc") ||
                "On iOS, PWAs have some limitations compared to native apps. For example, they can't send push notifications and may have limited storage."}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-android") || "Android"}
          </h4>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>
              {t("android-step-1") ||
                "Open Cryptica in Chrome or another compatible browser."}
            </li>
            <li>
              {t("android-step-2") ||
                "Look for a banner or prompt saying 'Add Cryptica to Home screen' or similar. If you don't see it:"}
            </li>
            <li>
              {t("android-step-3") ||
                "Tap the three-dot menu in the top-right corner."}
            </li>
            <li>
              {t("android-step-4") ||
                "Tap 'Install app' or 'Add to Home screen'."}
            </li>
            <li>
              {t("android-step-5") ||
                "Follow the prompts to complete the installation."}
            </li>
          </ol>

          <p className="text-muted-foreground text-sm">
            {t("android-note") ||
              "On newer Android versions, PWAs are deeply integrated and can appear in your app drawer, recent apps list, and can send notifications."}
          </p>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("install-desktop") || "Installing on Desktop"}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-chrome") || "Chrome (Windows, Mac, Linux)"}
          </h4>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("chrome-step-1") || "Open Cryptica in Chrome."}</li>
            <li>
              {t("chrome-step-2") ||
                "Look for the install icon (a plus sign in a circle) in the address bar, or:"}
            </li>
            <li>
              {t("chrome-step-3") ||
                "Click the three-dot menu in the top-right corner."}
            </li>
            <li>
              {t("chrome-step-4") ||
                "Click 'Install Cryptica...' or 'Install'."}
            </li>
            <li>
              {t("chrome-step-5") ||
                "Click 'Install' in the confirmation dialog."}
            </li>
          </ol>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-edge") || "Microsoft Edge"}
          </h4>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("edge-step-1") || "Open Cryptica in Edge."}</li>
            <li>
              {t("edge-step-2") ||
                "Look for the install icon (a plus sign) in the address bar, or:"}
            </li>
            <li>
              {t("edge-step-3") ||
                "Click the three-dot menu in the top-right corner."}
            </li>
            <li>
              {t("edge-step-4") ||
                "Click 'Apps' and then 'Install this site as an app'."}
            </li>
            <li>
              {t("edge-step-5") ||
                "Click 'Install' in the confirmation dialog."}
            </li>
          </ol>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-firefox") || "Firefox"}
          </h4>

          <p className="mb-3">
            {t("firefox-note") ||
              "Firefox has limited support for installing PWAs as standalone apps. However, you can create a shortcut:"}
          </p>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("firefox-step-1") || "Open Cryptica in Firefox."}</li>
            <li>
              {t("firefox-step-2") ||
                "Click the three-line menu in the top-right corner."}
            </li>
            <li>
              {t("firefox-step-3") ||
                "Click 'More tools' and then 'Create shortcut'."}
            </li>
            <li>
              {t("firefox-step-4") || "Name the shortcut and click 'Create'."}
            </li>
          </ol>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("install-safari") || "Safari (macOS)"}
          </h4>

          <p className="mb-3">
            {t("safari-note") ||
              "Safari on macOS doesn't support installing PWAs as standalone apps. However, you can pin the site to your dock:"}
          </p>

          <ol className="mb-4 list-decimal space-y-2 pl-5">
            <li>{t("safari-step-1") || "Open Cryptica in Safari."}</li>
            <li>
              {t("safari-step-2") ||
                "From the menu bar, select File > Add to Dock."}
            </li>
            <li>
              {t("safari-step-3") ||
                "Alternatively, you can drag the URL from the address bar to the Dock."}
            </li>
          </ol>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("offline-usage") || "Using Cryptica Offline"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("offline-desc") ||
            "Once installed, Cryptica can work offline with these capabilities:"}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>{t("offline-feature-1") || "Password Generation"}</strong>:{" "}
            {t("offline-feature-1-desc") ||
              "Standard and strength-based generation work offline (AI-assisted requires internet)."}
          </li>
          <li>
            <strong>
              {t("offline-feature-2") || "Encryption & Decryption"}
            </strong>
            :{" "}
            {t("offline-feature-2-desc") ||
              "All encryption and decryption operations work offline."}
          </li>
          <li>
            <strong>{t("offline-feature-3") || "Password Analysis"}</strong>:{" "}
            {t("offline-feature-3-desc") ||
              "The strength analyzer functions fully offline."}
          </li>
          <li>
            <strong>{t("offline-feature-4") || "Local Data Access"}</strong>:{" "}
            {t("offline-feature-4-desc") ||
              "Access to your locally stored presets and activity history."}
          </li>
          <li>
            <strong>{t("offline-feature-5") || "Settings Management"}</strong>:{" "}
            {t("offline-feature-5-desc") ||
              "Change settings, themes, and preferences offline."}
          </li>
        </ul>

        <div className="bg-muted mt-4 rounded-md p-3">
          <p className="mb-1 text-sm font-medium">
            {t("offline-limitations") || "Offline Limitations"}:
          </p>
          <p className="text-sm">
            {t("offline-limitations-desc") ||
              "When offline, you won't be able to synchronize data with your database, use AI-assisted password generation, or access any external links in the documentation."}
          </p>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("pwa-updates") || "Updates and Maintenance"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("updates-desc") ||
            "Cryptica automatically checks for updates when you're online:"}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>{t("update-process") || "Update Process"}</strong>:{" "}
            {t("update-process-desc") ||
              "Updates are downloaded in the background and applied the next time you launch the app."}
          </li>
          <li>
            <strong>{t("check-for-updates") || "Manual Check"}</strong>:{" "}
            {t("check-updates-desc") ||
              "To force-check for updates, close and reopen the app while connected to the internet."}
          </li>
          <li>
            <strong>{t("clearing-data") || "Clearing Data"}</strong>:{" "}
            {t("clearing-data-desc") ||
              "If you experience issues, you can clear the app data through your browser's site settings or device settings."}
          </li>
        </ul>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("uninstalling") || "Uninstalling Cryptica"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("uninstall-desc") || "To uninstall Cryptica from your device:"}
        </p>

        <h4 className="mb-2 font-medium">
          {t("uninstall-mobile") || "On Mobile Devices"}:
        </h4>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            <strong>iOS</strong>:{" "}
            {t("uninstall-ios") ||
              "Press and hold the Cryptica icon until it jiggles, then tap the X button."}
          </li>
          <li>
            <strong>Android</strong>:{" "}
            {t("uninstall-android") ||
              "Press and hold the Cryptica icon, then drag it to the 'Uninstall' area, or go to Settings > Apps > Cryptica > Uninstall."}
          </li>
        </ul>

        <h4 className="mb-2 font-medium">
          {t("uninstall-desktop") || "On Desktop"}:
        </h4>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Windows</strong>:{" "}
            {t("uninstall-windows") ||
              "Go to Settings > Apps > Cryptica > Uninstall, or right-click the app icon and select Uninstall."}
          </li>
          <li>
            <strong>macOS</strong>:{" "}
            {t("uninstall-macos") ||
              "Drag the Cryptica app from the Applications folder to the Trash, or right-click and select Move to Trash."}
          </li>
          <li>
            <strong>Chrome OS</strong>:{" "}
            {t("uninstall-chromeos") ||
              "Right-click the Cryptica icon and select 'Uninstall' or 'Remove from Chrome'."}
          </li>
        </ul>

        <div className="bg-muted mt-4 rounded-md p-3">
          <p className="mb-1 text-sm font-medium">
            {t("data-note") || "Note About Your Data"}:
          </p>
          <p className="text-sm">
            {t("data-note-desc") ||
              "Uninstalling the app doesn't automatically delete your local data. To completely remove all data, you should clear site data from your browser settings before uninstalling."}
          </p>
        </div>
      </div>

      <div className="mt-10 border-t pt-4">
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-primary text-sm"
        >
          ← {t("back-to-docs") || "Back to Documentation"}
        </Link>
      </div>
    </>
  )
}
