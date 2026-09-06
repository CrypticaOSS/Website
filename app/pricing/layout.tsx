import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'Predictable pricing that scales with you. Start for free, then pay only for what you use.',
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
