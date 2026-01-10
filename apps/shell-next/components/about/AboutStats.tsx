import Card from '@/components/ui/Card';

interface AboutStatsProps {
  stats: {
    experience: number;
    projects: number;
  };
  locale: string;
}

export default function AboutStats({ stats, locale }: AboutStatsProps) {
  const isEn = locale === 'en';

  const labels = {
    experience: isEn ? 'Years Experience' : 'Yıl Deneyim',
    projects: isEn ? 'Projects' : 'Proje',
    location: isEn ? 'Istanbul, Turkey' : 'İstanbul, Türkiye',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <Card className="text-center hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30">
        <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2 tracking-tight">
          9+
        </div>
        <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
          {labels.experience}
        </div>
      </Card>

      <Card className="text-center hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30">
        <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2 tracking-tight">
          20+
        </div>
        <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
          {labels.projects}
        </div>
      </Card>

      <Card className="text-center hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30">
        <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
          {labels.location}
        </div>
      </Card>
    </div>
  );
}
