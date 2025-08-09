import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security',
    description: 'Learn how to secure your account and data.',
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
    return children;
}