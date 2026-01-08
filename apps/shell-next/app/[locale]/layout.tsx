import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import Script from 'next/script';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return (
    <>
      <Script id="supabase-config" strategy="beforeInteractive">
        {`
          window.__SUPABASE_URL__ = ${JSON.stringify(supabaseUrl)};
          window.__SUPABASE_ANON_KEY__ = ${JSON.stringify(supabaseAnon)};
        `}
      </Script>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 grain">
        <Navbar locale={params.locale} />
        <div className="fixed top-20 right-4 z-40">
          <ThemeToggle />
        </div>
        <main className="relative z-10">{children}</main>
        <Footer locale={params.locale} />
      </div>
    </>
  );
}

