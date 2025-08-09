import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Generator',
    description: 'learn how to use our password generator.',
}

export default function GeneratorLayout({ children }: { children: React.ReactNode }) {
    return children;
}