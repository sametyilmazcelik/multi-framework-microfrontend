interface AboutStatsProps {
  locale: 'en' | 'tr';
}

const statsLabels = {
  en: {
    experience: '9+ Years Experience',
    projects: '20+ Projects',
    location: 'Istanbul, Turkey',
  },
  tr: {
    experience: '9+ Yıl Deneyim',
    projects: '20+ Proje',
    location: 'İstanbul, Türkiye',
  },
};

export default function AboutStats({ locale }: AboutStatsProps) {
  const labels = statsLabels[locale];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
      <div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          9+
        </div>
        <div className="text-sm text-gray-600">
          {labels.experience}
        </div>
      </div>

      <div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          20+
        </div>
        <div className="text-sm text-gray-600">
          {labels.projects}
        </div>
      </div>

      <div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          📍
        </div>
        <div className="text-sm text-gray-600">
          {labels.location}
        </div>
      </div>
    </div>
  );
}

