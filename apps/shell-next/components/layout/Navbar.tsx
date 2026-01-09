'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import ThemeToggle from './ThemeToggle';
import LocaleToggle from '../ui/LocaleToggle';

interface NavLink {
  href: string;
  label: { en: string; tr: string };
}

const navLinks: NavLink[] = [
  { href: '/', label: { en: 'Home', tr: 'Ana Sayfa' } },
  { href: '/projects', label: { en: 'Projects', tr: 'Projeler' } },
  { href: '/resume', label: { en: 'Resume', tr: 'Özgeçmiş' } },
  { href: '/stack', label: { en: 'Stack', tr: 'Stack' } },
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
    if (href === '/lab/about') {
      return pathname?.includes('/lab');
    }
    return pathname?.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-text-primary hover:text-accent transition-colors duration-200"
          >
            <Image
              src="/assets/logo.png"
              alt="Samet Yılmazçelik"
              width={160}
              height={40}
              className="h-10 w-auto object-contain rounded-lg"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`relative text-sm font-medium transition-all duration-200 group ${isActive(link.href)
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {link.label[isEn ? 'en' : 'tr']}
                {/* Active indicator */}
                <span
                  className={`absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent transition-all duration-200 ${isActive(link.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Social Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/sametyilmazcelik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="GitHub"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/samet-yilmazcelik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <SiLinkedin size={20} />
            </a>
            <ThemeToggle />
            <LocaleToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border/50 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium transition-colors ${isActive(link.href)
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {link.label[isEn ? 'en' : 'tr']}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <LocaleToggle />
              <a
                href="https://github.com/sametyilmazcelik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <SiGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/samet-yilmazcelik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="LinkedIn"
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

