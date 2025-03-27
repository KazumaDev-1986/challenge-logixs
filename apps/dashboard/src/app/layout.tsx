import './global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Challenge Logixs',
  description: 'Dashboard application for Challenge Logixs',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
