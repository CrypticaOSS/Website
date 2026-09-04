import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Downloads',
    description: 'Download your password vault and other files.',
}

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return children;
}