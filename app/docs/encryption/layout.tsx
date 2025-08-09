import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Encryption',
    description: 'Learn how to use our encryption tools.',
}

export default function EncryptionLayout({ children }: { children: React.ReactNode }) {
    return children;
}