"use client"

import Link from "next/link"
import {
  DeleteDismiss20Regular,
  History20Regular,
  Info20Regular,
} from "@fluentui/react-icons"
import { useTranslations } from "next-intl"

export default function ActivityDocsPage() {
  const t = useTranslations()

  return (
    <>
      <div className="mb-8 flex items-center">
        <History20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">
          {t("activity-tracking")} {t("guide")}
        </h2>
      </div>

      <p className="mb-6">
        {t("activity-intro") ||
          "Cryptica's Activity Tracking feature helps you keep a record of your password generation and encryption activities. This guide explains how this feature works and how to make the most of it."}
      </p>

      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start">
          <Info20Regular className="mt-0.5 mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              {t("privacy-first") || "Privacy-First Approach"}
            </h3>
            <p className="mt-1 text-blue-700 dark:text-blue-400">
              {t("activity-privacy-desc") ||
                "All activity data is stored locally on your device by default. If you enable database synchronization, the data is encrypted before being stored remotely."}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("what-is-tracked") || "What Information is Tracked"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("tracked-info-desc") ||
            "Cryptica keeps track of the following activities:"}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>{t("password-generation") || "Password Generation"}</strong>
            :{" "}
            {t("password-gen-tracking") ||
              "When you generate a password, including timestamp and strength information (but not the actual password)."}
          </li>
          <li>
            <strong>
              {t("encryption-operations") || "Encryption Operations"}
            </strong>
            :{" "}
            {t("encryption-tracking") ||
              "When you encrypt or decrypt data, including timestamp and operation type (but not the content or keys)."}
          </li>
          <li>
            <strong>{t("preset-creation") || "Preset Creation"}</strong>:{" "}
            {t("preset-tracking") ||
              "When you create or modify password generation presets."}
          </li>
        </ul>

        <div className="bg-muted mt-4 rounded-md p-3">
          <p className="mb-1 text-sm font-medium">
            {t("privacy-note") || "Privacy Note"}:
          </p>
          <p className="text-sm">
            {t("activity-privacy-note") ||
              "For your security, Cryptica never stores actual passwords, encrypted content, or encryption keys in the activity log."}
          </p>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("viewing-activity") || "Viewing Your Activity"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <h4 className="mb-3 text-lg font-medium">
          {t("activity-timeline") || "Activity Timeline"}
        </h4>
        <p className="mb-3">
          {t("timeline-desc") ||
            "The Activity page displays your actions in a chronological timeline, making it easy to track when you performed specific operations."}
        </p>

        <h5 className="mb-2 font-medium">
          {t("timeline-features") || "Timeline Features"}:
        </h5>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            {t("timeline-feature-1") ||
              "Chronological ordering with newest activities at the top"}
          </li>
          <li>
            {t("timeline-feature-2") ||
              "Date grouping to organize activities by day"}
          </li>
          <li>
            {t("timeline-feature-3") ||
              "Visual indicators for different types of activities"}
          </li>
          <li>
            {t("timeline-feature-4") ||
              "Activity details including time and relevant metadata"}
          </li>
        </ul>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("managing-activity") || "Managing Your Activity Data"}
      </h3>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("filtering-activity") || "Filtering Activity"}
          </h4>
          <p className="mb-3">
            {t("filtering-desc") ||
              "You can filter your activity log to focus on specific types of activities or date ranges."}
          </p>

          <h5 className="mb-2 font-medium">
            {t("available-filters") || "Available Filters"}:
          </h5>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>{t("activity-type") || "Activity Type"}</strong>:{" "}
              {t("type-filter-desc") ||
                "Filter by the type of activity (generation, encryption, presets)."}
            </li>
            <li>
              <strong>{t("date-range") || "Date Range"}</strong>:{" "}
              {t("date-filter-desc") ||
                "View activities within a specific time period."}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-5">
          <h4 className="mb-3 text-lg font-medium">
            {t("clearing-activity") || "Clearing Activity Data"}
          </h4>
          <p className="mb-3">
            {t("clearing-desc") ||
              "If you want to remove your activity history, you can clear the data from the Activity page."}
          </p>

          <div className="flex items-start rounded-md bg-red-50 p-3 dark:bg-red-950">
            <DeleteDismiss20Regular className="mt-0.5 mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                {t("warning") || "Warning"}:
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {t("clearing-warning") ||
                  "Clearing activity data is permanent and cannot be undone. If synchronization is enabled, data will be removed from both local storage and the remote database."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("syncing-activity") || "Synchronizing Activity Data"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("syncing-desc") ||
            "If you've enabled database synchronization in Settings, your activity data will be synchronized across your devices."}
        </p>

        <h5 className="mb-2 font-medium">
          {t("how-syncing-works") || "How Synchronization Works"}:
        </h5>
        <ol className="mb-4 list-decimal space-y-2 pl-5">
          <li>
            {t("sync-step-1") ||
              "Activity data is encrypted locally before being sent to your configured database."}
          </li>
          <li>
            {t("sync-step-2") ||
              "When you access Cryptica from a new device, the encrypted data is retrieved and decrypted locally."}
          </li>
          <li>
            {t("sync-step-3") ||
              "Changes made on one device are automatically synchronized to others when connected."}
          </li>
        </ol>

        <p className="text-muted-foreground text-sm">
          {t("sync-note") ||
            "Note: To set up synchronization, visit the Settings page and configure your database connection."}
        </p>
      </div>

      <h3 className="mb-4 text-xl font-semibold">
        {t("using-activity-data") || "Using Activity Data Effectively"}
      </h3>

      <div className="mb-8 rounded-lg border p-5">
        <p className="mb-3">
          {t("effective-use-desc") ||
            "Your activity history can be a valuable tool for security and password management:"}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>{t("password-rotation") || "Password Rotation"}</strong>:{" "}
            {t("rotation-desc") ||
              "Track when you last generated passwords for specific services to know when it's time to update them."}
          </li>
          <li>
            <strong>{t("audit-trail") || "Audit Trail"}</strong>:{" "}
            {t("audit-desc") ||
              "Maintain a record of your security-related activities for reference."}
          </li>
          <li>
            <strong>{t("usage-patterns") || "Usage Patterns"}</strong>:{" "}
            {t("patterns-desc") ||
              "Identify patterns in your security habits and find opportunities for improvement."}
          </li>
        </ul>
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
