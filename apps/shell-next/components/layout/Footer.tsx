import { SiGithub, SiLinkedin } from 'react-icons/si';

export default function Footer({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {currentYear} Samet Yılmazçelik. {isEn ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </footer>
  );
}

