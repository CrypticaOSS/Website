import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Password Strength',
    description: 'Learn how to check the strength of your passwords.',
}

export default function PasswordStrengthLayout({ children }: { children: React.ReactNode }) {
    return children;
}