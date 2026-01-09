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
  return (
    <>
      <div className="min-h-screen flex flex-col bg-background grain gradient-mesh custom-scrollbar">
        <Navbar locale={params.locale} />
        <main className="relative z-10 flex-grow">{children}</main>
        <Footer locale={params.locale} />
      </div>
    </>
  );
}

