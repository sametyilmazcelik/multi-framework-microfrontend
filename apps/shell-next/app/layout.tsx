import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';


export const metadata: Metadata = {
  title: 'Samet Yılmazçelik - Senior Frontend Developer',
  description: 'Professional portfolio website showcasing modern frontend development skills',
  metadataBase: new URL('https://sametyilmazcelik.com'),
  verification: {
    google: 'W9UefXpHP6NixgC4c3HgXx4ZJOTRQc-bw3bGa3ofubs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
        <Script id="supabase-config" strategy="beforeInteractive">
          {`
            window.__SUPABASE_URL__ = "${supabaseUrl}";
            window.__SUPABASE_ANON_KEY__ = "${supabaseAnonKey}";
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}



