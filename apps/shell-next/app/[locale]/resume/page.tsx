import { getProfile } from '@/lib/data/getProfile';
import { getExperiences } from '@/lib/data/getExperiences';
import { getProjects } from '@/lib/data/getProjects';
import { getSkills } from '@/lib/data/getSkills';
import { getEducation } from '@/lib/data/getEducation';
import Image from 'next/image';
import PrintButton from '@/components/ui/PrintButton';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  // Fetch all data from Supabase
  const [profile, experiences, skillCategories, education, projects] = await Promise.all([
    getProfile(validLocale),
    getExperiences(validLocale),
    getSkills(validLocale),
    getEducation(validLocale),
    getProjects(validLocale),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 resume-container">
      {/* Header */}
      <div className="mb-16 resume-header">
        <div className="flex items-center gap-2 mb-6 justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1 h-8 bg-accent rounded-full"></span>
            <h1 className="text-text-primary">
              {isEn ? 'Resume' : 'Özgeçmiş'}
            </h1>
          </div>
          <PrintButton label={isEn ? 'Download PDF' : 'PDF İndir'} />
        </div>
        <p className="text-xl text-text-secondary max-w-2xl">
          {isEn ? 'Professional experience and technical expertise' : 'Profesyonel deneyim ve teknik uzmanlık'}
        </p>
      </div>

      {/* Profile Summary */}
      {profile && (
        <div className="card mb-16 flex flex-col md:flex-row items-center md:items-start gap-8 resume-profile">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-accent/20 shadow-lg profile-image-container">
              <Image
                src="/assets/profile.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {profile.name}
            </h2>
            {profile.title && (
              <p className="text-lg text-accent mb-4">
                {profile.title}
              </p>
            )}
            {profile.summary && (
              <p className="text-base text-text-secondary leading-relaxed">
                {profile.summary}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experiences */}
      {experiences && experiences.length > 0 && (
        <div className="mb-16 resume-experience">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            {isEn ? 'Experience' : 'Deneyim'}
          </h2>
          <div className="relative pl-8 border-l-2 border-border space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative">
                <div className={`absolute -left-[37px] h-4 w-4 rounded-full border-4 border-background ${idx === 0 ? 'bg-accent' : 'bg-border'
                  }`}></div>
                <div className="card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{exp.role}</h3>
                    {exp.period && (
                      <span className="text-xs text-text-muted font-mono">{exp.period}</span>
                    )}
                  </div>
                  {exp.company && <p className="text-sm text-accent mb-2">{exp.company}</p>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mb-3">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="px-2 py-0.5 text-xs font-mono rounded glass text-text-muted border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories && skillCategories.length > 0 && (
        <div className="mb-16 resume-skills">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            {isEn ? 'Skills' : 'Yetenekler'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.category} className="card-hover">
                <h3 className="text-lg font-semibold text-text-primary mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sidx) => (
                    <span
                      key={sidx}
                      className="px-3 py-1 text-xs font-mono rounded glass text-text-secondary border border-border hover:border-accent transition-colors"
                      title={skill.level}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-16 resume-projects">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            {isEn ? 'Projects' : 'Projeler'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="card-hover">
                {project.name && (
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {project.name}
                  </h3>
                )}
                {project.description && (
                  <p className="text-sm text-text-secondary mb-3 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                )}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, tidx) => (
                      <span
                        key={tidx}
                        className="px-2 py-0.5 text-xs font-mono rounded glass text-text-muted border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="resume-education">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            {isEn ? 'Education' : 'Eğitim'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.id} className="card-hover">
                {edu.degree && (
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {edu.degree}
                  </h3>
                )}
                {edu.institution && (
                  <p className="text-lg text-accent mb-2">
                    {edu.institution}
                  </p>
                )}
                {edu.period && (
                  <p className="text-sm text-text-muted font-mono">
                    {edu.period}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
