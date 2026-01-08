import { supabase } from '@repo/supabase-client';
import AboutView from '@/components/about/AboutView';
import FrameworkToggle from '@/components/about/FrameworkToggle';
import FrameworkHost from '@/components/about/FrameworkHost';

interface PageProps {
  params: {
    locale: string;
  };
  searchParams: {
    fw?: string;
  };
}

type Framework = 'react' | 'angular' | 'svelte' | 'vue';

const isValidFramework = (fw: string | undefined): fw is Framework => {
  return fw === 'react' || fw === 'angular' || fw === 'svelte' || fw === 'vue';
};

export default async function LabAboutPage({ params, searchParams }: PageProps) {
  const { locale } = params;

  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('*')
    .single();

  const { data: experiencesData, error: experiencesError } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true });

  const { data: skillsData, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('order_index', { ascending: true });

  if (profileError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Error loading profile data</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No profile data found</p>
      </div>
    );
  }

  const activeFramework: Framework = isValidFramework(searchParams.fw) 
    ? searchParams.fw 
    : 'react';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Multi-Framework Demo
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Same UI rendered with different frameworks as Web Components
        </p>
      </div>

      <FrameworkToggle />
      {activeFramework === 'react' ? (
        <AboutView
          framework="React"
          locale={locale}
          profile={profileData}
          experiences={experiencesData || []}
          experiencesError={experiencesError}
          skills={skillsData || []}
          skillsError={skillsError}
        />
      ) : (
        <FrameworkHost framework={activeFramework} locale={locale} />
      )}
    </div>
  );
}

