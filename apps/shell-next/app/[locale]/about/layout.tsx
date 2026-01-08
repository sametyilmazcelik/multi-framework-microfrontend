import Script from 'next/script';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
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
      {children}
    </>
  );
}


