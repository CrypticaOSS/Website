import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { ThemeProvider } from "next-themes"

import { AppSidebar } from "@/components/nav"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Cryptica"
    template: "%s | Cryptica",
  },
  description: "Life’s messy. Your passwords don’t have to be.",
  applicationName: "Cryptica",
  metadataBase: new URL("https://crypticapp.org"),
  openGraph: {
    siteName: "Cryptica",
    description: "Life’s messy. Your passwords don’t have to be.",
    images: ["/images/social.png"],
    creators: ["@crypticaapp", "@codemeapixel"],
    locale: "en-US",
    url: "https://crypticapp.org"
  },
  twitter: {
    title: "Cryptica",
    description: "Life’s messy. Your passwords don’t have to be.",
    images: "/images/social.png",
    creator: "@CodeMeAPixel",
    card: "summary_large_image",
    site: "https://crypticapp.org"
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "Cryptica",
  },
  others: {
    "mobile-web-app-capable": "yes"
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/icons/icon-72x72.png",
    apple: "/images/icons/icon-96x96.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": "-1",
      "max-image-preview": "large",
      "max-video-preview": "-1"
    }
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icon-512x512.png" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000014"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger className="-ml-1" />
                </header>
                <div className="p-5">{children}</div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
