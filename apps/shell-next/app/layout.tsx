import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samet Yılmazçelik - Senior Frontend Developer',
  description: 'Professional portfolio website showcasing modern frontend development skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}


