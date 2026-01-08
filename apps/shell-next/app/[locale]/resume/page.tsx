import { supabase } from '@repo/supabase-client';
import Card from '@/components/ui/Card';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import SkillsSection from '@/components/about/SkillsSection';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .single();

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true });

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('order_index', { ascending: true });

  const { data: education } = await supabase
    .from('education')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {isEn ? 'Resume' : 'Özgeçmiş'}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {isEn ? 'My professional experience and skills' : 'Profesyonel deneyimim ve yeteneklerim'}
        </p>
      </div>

      {profile && (
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            {profile.name}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
            {profile.title?.[validLocale] || profile.title?.en || ''}
          </p>
          <p className="text-base text-neutral-700 dark:text-neutral-300">
            {profile.summary?.[validLocale] || profile.summary?.en || ''}
          </p>
        </Card>
      )}

      {experiences && experiences.length > 0 && (
        <ExperienceTimeline experiences={experiences} locale={validLocale} />
      )}

      {skills && skills.length > 0 && (
        <SkillsSection skills={skills} locale={validLocale} />
      )}

      {education && education.length > 0 && (
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8">
            {isEn ? 'Education' : 'Eğitim'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((edu: any) => {
              const degree = edu.degree?.[validLocale] || edu.degree?.en || edu.degree || '';
              const institution = edu.institution?.[validLocale] || edu.institution?.en || edu.institution || '';
              
              return (
                <Card key={edu.id} className="hover:scale-[1.02] transition-transform duration-200">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {degree}
                  </h3>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-2">
                    {institution}
                  </p>
                  {edu.period && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {edu.period}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

