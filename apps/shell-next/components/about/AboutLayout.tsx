import Script from 'next/script';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {children}
        </div>
      </div>
    </>
  );
}

