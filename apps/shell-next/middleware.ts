import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    if (pathname === '/') {
       // specific redirect for root to default locale
       return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }
    
    // For other paths, we might want to preserve the path but add locale, 
    // but for now, let's focus on the root issue or assume generic handling.
    // Ideally: return NextResponse.redirect(new URL(`/${defaultLocale}/${pathname}`, request.url));
    // But since the user only complained about the home page opening the wrong thing, 
    // and standard next.js routing handles explicit routes, let's sticking to the root redirect essential.
    
    // However, if we visit /about without locale, it should probably also redirect.
    // Let's stick to the simplest fix for the reported issue: Redirecting / to /tr
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
