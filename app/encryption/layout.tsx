import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Encryption',
    description: 'Encrypt your passwords and sensitive data.',
}

export default function EncryptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}