'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

interface NavLink {
  href: string;
  label: { en: string; tr: string };
}

const navLinks: NavLink[] = [
  { href: '/', label: { en: 'Home', tr: 'Ana Sayfa' } },
  { href: '/projects', label: { en: 'Projects', tr: 'Projeler' } },
  { href: '/resume', label: { en: 'Resume', tr: 'Özgeçmiş' } },
  { href: '/contact', label: { en: 'Contact', tr: 'İletişim' } },
  { href: '/lab/about', label: { en: 'Lab', tr: 'Lab' } },
];

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = locale === 'en';

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname?.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-xl font-bold text-neutral-900 dark:text-white">
            Samet Yılmazçelik
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {link.label[isEn ? 'en' : 'tr']}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/sametyc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/samet-yilmazcelik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <SiLinkedin size={20} />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-neutral-200 dark:border-neutral-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {link.label[isEn ? 'en' : 'tr']}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/sametyc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400"
              >
                <SiGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/samet-yilmazcelik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400"
              >
                <SiLinkedin size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

