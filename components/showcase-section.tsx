"use client"

import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import Image from 'next/image';

interface ShowcaseProps {
  title: string;
  subtitle?: string;
}

export default function ShowcaseSection({ title, subtitle }: ShowcaseProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('ui');

  const tabs = [
    { id: 'ui', label: t('ui-tab', { default: 'UI' }) },
    { id: 'themes', label: t('themes-tab', { default: 'Themes' }) },
    { id: 'mobile', label: t('mobile-tab', { default: 'Mobile' }) },
  ];

  // These would be actual screenshots of your application
  const uiScreenshots = [
    {
      src: "/previews/ui/generator.png",
      alt: t('showcase-generator-alt', { default: 'Password Generator' }),
      caption: t('showcase-generator-caption', { default: 'Generate secure passwords with ease' }),
    },
    {
      src: "/previews/ui/strength.png",
      alt: t('showcase-strength-alt', { default: 'Password Strength Checker' }),
      caption: t('showcase-strength-caption', { default: 'Check password security instantly' }),
    },
    {
      src: "/previews/ui/encryption.png",
      alt: t('showcase-encryption-alt', { default: 'Encryption Tool' }),
      caption: t('showcase-encryption-caption', { default: 'Encrypt your sensitive data' }),
    },
  ];

  const themeScreenshots = [
    {
      src: "/themes/dark.svg",
      alt: t('showcase-dark-alt', { default: 'Dark Theme' }),
      caption: t('showcase-dark-caption', { default: 'Sleek dark theme' }),
    },
    {
      src: "/themes/light.svg",
      alt: t('showcase-light-alt', { default: 'Light Theme' }),
      caption: t('showcase-light-caption', { default: 'Clean light theme' }),
    },
    {
      src: "/themes/aurora.svg",
      alt: t('showcase-aurora-alt', { default: 'Aurora Theme' }),
      caption: t('showcase-aurora-caption', { default: 'Vibrant aurora theme' }),
    }
  ];

  const mobileScreenshots = [
    {
      src: "/previews/mobile/preview.png",
      alt: t('showcase-mobile-view-alt', { default: 'Mobile View' }),
      caption: t('showcase-mobile-view-caption', { default: 'Fully responsive design' }),
    },
    {
      src: "/previews/mobile/features.png",
      alt: t('showcase-mobile-features-alt', { default: 'Mobile Features' }),
      caption: t('showcase-mobile-features-caption', { default: 'All features available on mobile' }),
    },
  ];

  const getActiveScreenshots = () => {
    switch (activeTab) {
      case 'themes': return themeScreenshots;
      case 'mobile': return mobileScreenshots;
      default: return uiScreenshots;
    }
  };

  return (
    <div className="w-full py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border bg-card p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Screenshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getActiveScreenshots().map((item, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-video overflow-hidden flex items-center justify-center bg-muted/10 p-4">
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={300}
                className="rounded object-contain max-h-full w-auto"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{item.alt}</h3>
              <p className="text-sm text-muted-foreground">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
