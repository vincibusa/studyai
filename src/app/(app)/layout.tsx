'use client';

import { ResponsiveSidebar } from '@/components/layout/responsive-sidebar';
import { AppHeader } from '@/components/layout/app-header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveSidebar>
      <AppHeader />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </ResponsiveSidebar>
  );
}