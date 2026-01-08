import Card from '@/components/ui/Card';

interface Experience {
  id?: string;
  company: string;
  role: {
    tr: string;
    en: string;
  };
  location: {
    tr: string;
    en: string;
  };
  period: {
    start: string;
    end: string | {
      tr: string;
      en: string;
    };
  };
  bullets: {
    tr: string[];
    en: string[];
  };
  tech: string[];
  order_index: number;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
  locale: 'en' | 'tr';
}

export default function ExperienceTimeline({ experiences, locale }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-neutral-600 text-center">No experience found</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
        {locale === 'en' ? 'Experience' : 'Deneyim'}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp, index) => {
          const role = exp.role[locale] || exp.role.en;
          const location = exp.location[locale] || exp.location.en;
          
          let periodEnd: string;
          if (typeof exp.period.end === 'string') {
            periodEnd = exp.period.end;
          } else if (exp.period.end && typeof exp.period.end === 'object') {
            periodEnd = exp.period.end[locale] || exp.period.end.en;
          } else {
            periodEnd = locale === 'en' ? 'Present' : 'Mevcut Durum';
          }
          
          const periodText = `${exp.period.start} – ${periodEnd}`;
          const bullets = exp.bullets?.[locale] || exp.bullets?.en || [];

          return (
            <Card key={exp.id || index} className="hover:scale-[1.02] transition-transform duration-200">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{exp.company}</h3>
                  <p className="text-lg text-neutral-700 font-medium">{role}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {periodText}
                    </span>
                  </div>
                </div>

                {bullets.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-neutral-700 flex items-start gap-2">
                        <span className="text-emerald-600 mt-1.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.tech && exp.tech.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
