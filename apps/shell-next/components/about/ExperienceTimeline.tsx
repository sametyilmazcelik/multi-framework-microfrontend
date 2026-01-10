import Card from '@/components/ui/Card';

interface Experience {
  id?: string;
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
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
      <div className="mt-12 pt-8 border-t border-border/30">
        <p className="text-text-muted text-center">No experience found</p>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-8 border-t border-border/30">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></span>
        {locale === 'en' ? 'Experience' : 'Deneyim'}
      </h2>

      <div className="relative border-l border-border/30 ml-3 md:ml-6 space-y-12 pb-12">
        {experiences.map((exp, index) => {
          // Data is already localized by getExperiences
          const role = exp.role;
          const location = exp.location;
          const periodText = exp.period;
          const bullets = exp.bullets || [];

          return (
            <div key={exp.id || index} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] md:-left-[5px] top-6 w-3 h-3 rounded-full bg-accent ring-4 ring-background shadow-glow group-hover:scale-125 transition-transform duration-300"></div>

              <Card className="hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1 tracking-tight">{exp.company}</h3>
                      <p className="text-lg text-accent font-medium">{role}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted bg-surface-elevated/50 px-3 py-1.5 rounded-lg self-start md:self-auto border border-border/50">
                      <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {periodText}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-muted flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {location}
                  </p>

                  <div className="h-px bg-border/30 my-4" />

                  {bullets.length > 0 && (
                    <ul className="space-y-3">
                      {bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-text-secondary flex items-start gap-3 text-base leading-relaxed">
                          <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent/80 flex-shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.tech && exp.tech.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap gap-2">
                      {exp.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-surface-elevated/50 text-text-muted border border-border/50 hover:text-text-primary hover:border-accent/40 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
