import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Breaches',
    description: 'Check if your password has been compromised in any data breaches',
}

export default function BreachesLayout({ children }: { children: React.ReactNode }) {
  return children;
}