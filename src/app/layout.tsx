import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import MaintenancePage from './maintenance/page';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Workload & Schedule Monitor',
  description: 'Track department and individual workload across projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  return (
    <html lang="en" className="dark">
      <body className={inter.variable}>
        {isMaintenance ? (
          <MaintenancePage />
        ) : (
          <LayoutWrapper>{children}</LayoutWrapper>
        )}
      </body>
    </html>
  );
}


