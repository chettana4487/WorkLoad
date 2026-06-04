'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from '@/components/SidebarContext';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMaintenanceRoute = pathname === '/maintenance';

  if (isMaintenanceRoute) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <TopHeader />
          <main className="page-container animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
