import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with us for any inquiries or support',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}