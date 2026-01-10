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

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-8 bg-accent rounded-full"></span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Multi-Framework Demo
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-4xl leading-relaxed">
            {locale === 'en'
              ? "This project is built with Next.js, but utilizes modern micro-frontend architecture to render React, Angular, Svelte and Vue components under one roof. This page demonstrates the power of Web Components and seamless cross-framework integration."
              : "Bu proje Next.js ile geliştirilmiştir ancak modern mikro-frontend mimarisi sayesinde React, Angular, Svelte ve Vue bileşenlerini aynı çatı altında sunmaktadır. Bu sayfa, Web Components teknolojisinin gücünü ve frameworkler arası entegrasyonu sergiler."
            }
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
