import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Workload & Schedule Monitor',
  description: 'Track department and individual workload across projects',
};

import { SidebarProvider } from '@/components/SidebarContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
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
      </body>
    </html>
  );
}
