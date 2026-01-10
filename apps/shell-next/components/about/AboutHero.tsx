import Button from '@/components/ui/Button';

interface AboutHeroProps {
  profile: {
    name: string;
    title: {
      tr: string;
      en: string;
    };
    summary: {
      tr: string;
      en: string;
    };
    location: {
      tr: string;
      en: string;
    };
  };
  locale: string;
}

export default function AboutHero({ profile, locale }: AboutHeroProps) {
  const title = profile.title[locale as 'tr' | 'en'] || profile.title.en;
  const summary = profile.summary[locale as 'tr' | 'en'] || profile.summary.en;
  const location = profile.location[locale as 'tr' | 'en'] || profile.location.en;
  const isEn = locale === 'en';

  return (
    <div className="relative -mx-6 px-6 py-16 md:py-24 rounded-3xl overflow-hidden mb-12 border border-border bg-surface/30 backdrop-blur-md shadow-2xl">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight drop-shadow-sm">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-accent mb-8 font-medium tracking-wide">
          {title}
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            {summary}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            href="https://www.linkedin.com/in/samet-yilmazcelik"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="shadow-lg shadow-accent/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </Button>
          <Button
            href="https://github.com/sametyilmazcelik"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="border-border/50 text-text-primary hover:bg-surface-elevated hover:border-border"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Button>
          <Button
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="bg-surface-elevated/50 border-border/50 text-text-primary hover:bg-surface-elevated"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            {isEn ? 'CV' : 'Özgeçmiş'}
          </Button>
        </div>

        <p className="text-sm text-text-muted flex items-center justify-center gap-2">
          {location}
        </p>
      </div>
    </div>
  );
}

