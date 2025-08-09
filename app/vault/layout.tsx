import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vault',
    description: 'Securely store and manage your passwords.',
}

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return children;
}