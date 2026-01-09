import { generateLocaleStaticParams } from '@/lib/i18n';
import { getProfile } from '@/lib/data/getProfile';
import { getExperiences } from '@/lib/data/getExperiences';
import { getSkills } from '@/lib/data/getSkills';
import LabAboutClient from './LabAboutClient';
import Script from 'next/script';

interface PageProps {
  params: {
    locale: string;
  };
}

export const generateStaticParams = generateLocaleStaticParams;

export default async function LabAboutPage({ params }: PageProps) {
  const { locale } = params;
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  // Fetch data using data layer functions
  const [profile, experiences, skillCategories] = await Promise.all([
    getProfile(validLocale),
    getExperiences(validLocale),
    getSkills(validLocale),
  ]);

  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-red-600">Error loading profile data</p>
      </div>
    );
  }

  // Inject Supabase config for microfrontends
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <>
      {/* Inject Supabase config into window for microfrontends */}
      <Script
        id="supabase-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.__SUPABASE_URL__ = "${supabaseUrl}";
            window.__SUPABASE_ANON_KEY__ = "${supabaseAnonKey}";
          `,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Multi-Framework Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Same UI rendered with different frameworks as Web Components
          </p>
        </div>

        <LabAboutClient
          locale={locale}
          profile={profile}
          experiences={experiences}
          skills={skillCategories}
        />
      </div>
    </>
  );
}
