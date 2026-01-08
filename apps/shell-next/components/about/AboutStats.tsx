import Card from '@/components/ui/Card';

interface AboutStatsProps {
  locale: 'en' | 'tr';
}

const statsLabels = {
  en: {
    experience: 'Years Experience',
    projects: 'Projects',
    location: 'Istanbul, Turkey',
  },
  tr: {
    experience: 'Yıl Deneyim',
    projects: 'Proje',
    location: 'İstanbul, Türkiye',
  },
};

export default function AboutStats({ locale }: AboutStatsProps) {
  const labels = statsLabels[locale];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
        <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
          9+
        </div>
        <div className="text-sm text-neutral-600 font-medium">
          {labels.experience}
        </div>
      </Card>

      <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
        <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
          20+
        </div>
        <div className="text-sm text-neutral-600 font-medium">
          {labels.projects}
        </div>
      </Card>

      <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
        <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div className="text-sm text-neutral-600 font-medium">
          {labels.location}
        </div>
      </Card>
    </div>
  );
}

