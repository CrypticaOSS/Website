import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Generate',
    description: 'Create strong, unique passwords and manage your password generation settings',
}

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return children;
}