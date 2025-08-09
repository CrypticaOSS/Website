import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Progressive Web App (PWA)',
    description: 'Learn how to create a Progressive Web App (PWA) with Cryptica.',
}

export default function PWALayout({ children }: { children: React.ReactNode }) {
    return children;
}