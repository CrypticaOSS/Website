import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Strength',
    description: 'View your password strength and security recommendations',
}

export default function StrengthLayout({ children }: { children: React.ReactNode }) {
  return children;
}