import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn about our privacy practices and how we protect your data.',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}