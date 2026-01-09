'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user language
    const language = navigator.language || 'tr';
    const locale = language.startsWith('en') ? 'en' : 'tr';

    // Redirect to detected locale
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Redirecting...</p>
      </div>
    </div>
  );
}
