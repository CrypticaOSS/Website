import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activity',
    description: 'View your recent activity and generated passwords',
}

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return children;
}