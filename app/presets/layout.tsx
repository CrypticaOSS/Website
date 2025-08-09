import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Presets',
    description: 'View your saved presets and configurations',
}

export default function PresetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}