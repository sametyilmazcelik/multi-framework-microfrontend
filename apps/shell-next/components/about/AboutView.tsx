import FrameworkBadge from '@/components/about/FrameworkBadge';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import SkillsSection from '@/components/about/SkillsSection';

type Framework = 'React' | 'Angular' | 'Svelte' | 'Vue';

interface AboutViewProps {
  framework: Framework;
  locale: string;
  profile: any;
  experiences: any[];
  experiencesError?: string | null;
  skills: any[];
  skillsError?: string | null;
}


export default function AboutView({
  framework,
  locale,
  profile,
  experiences,
  experiencesError,
  skills,
  skillsError,
}: AboutViewProps) {
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  return (
    <>
      <FrameworkBadge framework={framework} locale={validLocale} />
      <AboutHero profile={profile} locale={locale} />
      <AboutStats locale={validLocale} />
      
      {experiencesError ? (
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 mb-2">Error loading experience data</p>
            <pre className="text-xs text-red-700 overflow-auto">
              {JSON.stringify(experiencesError, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <ExperienceTimeline 
          experiences={experiences || []} 
          locale={validLocale} 
        />
      )}

      {skillsError ? (
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 mb-2">Error loading skills data</p>
            <pre className="text-xs text-red-700 overflow-auto">
              {JSON.stringify(skillsError, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <SkillsSection 
          skills={skills || []} 
          locale={validLocale} 
        />
      )}
    </>
  );
}

