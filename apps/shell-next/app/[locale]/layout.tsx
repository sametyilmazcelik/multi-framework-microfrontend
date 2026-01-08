import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
      <div className="min-h-screen flex flex-col bg-background grain gradient-mesh custom-scrollbar">
        <Navbar locale={params.locale} />
        <main className="relative z-10 flex-grow">{children}</main>
        <Footer locale={params.locale} />
      </div>
    </>
  );
}

