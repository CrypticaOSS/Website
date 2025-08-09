import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read our terms of service and user agreements.',
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}