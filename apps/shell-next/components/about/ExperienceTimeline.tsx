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
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 text-center">No experience found</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Experience' : 'Deneyim'}
      </h2>

      <div className="space-y-10">
        {experiences.map((exp, index) => {
          const role = exp.role[locale] || exp.role.en;
          const location = exp.location[locale] || exp.location.en;
          
          // Handle period.end - can be string or localized object
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
            <div key={exp.id || index} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                <p className="text-lg text-gray-700 mt-1">{role}</p>
                <p className="text-sm text-gray-500 mt-1">{location}</p>
                <p className="text-sm text-gray-500 mt-1">{periodText}</p>
              </div>

              {bullets.length > 0 && (
                <ul className="ml-4 space-y-2 mt-4">
                  {bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="text-gray-700 flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
