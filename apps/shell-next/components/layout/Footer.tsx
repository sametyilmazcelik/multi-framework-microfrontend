import { SiGithub, SiLinkedin } from 'react-icons/si';

export default function Footer({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 glass mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xl font-bold text-text-primary">
              Samet Yılmazçelik
            </p>
            <p className="text-sm text-text-muted">
              {isEn ? 'Senior Frontend Developer' : 'Senior Frontend Developer'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sametyc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <SiGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/samet-yilmazcelik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <SiLinkedin size={24} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-text-muted text-center md:text-right">
            <p>© {currentYear} Samet Yılmazçelik</p>
            <p className="text-xs mt-1">
              {isEn ? 'All rights reserved' : 'Tüm hakları saklıdır'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

