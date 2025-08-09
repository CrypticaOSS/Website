import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Getting Started',
    description: 'Learn how to get started with Cryptica.',
}

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
    return children;
}