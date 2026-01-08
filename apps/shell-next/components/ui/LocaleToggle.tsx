'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function LocaleToggle() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Determine current locale from pathname to be safe (fallback to 'tr')
    const currentLocale = pathname.startsWith('/en') ? 'en' : 'tr';

    const switchLocale = useCallback(
        (newLocale: string) => {
            if (newLocale === currentLocale) return;

            // Replace the locale segment in the pathname
            const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

            // Handle edge case where pathname might be just "/" (though middleware usually handles this)
            // or if we are at root without locale prefix (shouldn't happen with valid setup)
            const finalPathname = newPathname === pathname
                ? `/${newLocale}${pathname === '/' ? '' : pathname}`
                : newPathname;

            // Preserve search params
            const params = searchParams.toString();
            const fullPath = params ? `${finalPathname}?${params}` : finalPathname;

            router.push(fullPath);
        },
        [pathname, currentLocale, searchParams, router]
    );

    return (
        <div className="flex items-center bg-secondary/50 rounded-full p-1 border border-border/50">
            <button
                onClick={() => switchLocale('tr')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${currentLocale === 'tr'
                        ? 'bg-accent text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                aria-label="Switch to Turkish"
            >
                TR
            </button>
            <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${currentLocale === 'en'
                        ? 'bg-accent text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
}
