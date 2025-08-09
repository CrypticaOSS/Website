import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Self-Hosting',
    description: 'Deploy and run Cryptica on your own infrastructure.',
}

export default function SelfHostingLayout({ children }: { children: React.ReactNode }) {
    return children;
}