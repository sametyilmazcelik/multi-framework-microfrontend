'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AboutView from '@/components/about/AboutView';
import FrameworkToggle from '@/components/about/FrameworkToggle';
import FrameworkHost from '@/components/about/FrameworkHost';
import type { Profile } from '@/lib/data/getProfile';
import type { Experience } from '@/lib/data/getExperiences';
import type { SkillCategory } from '@/lib/data/getSkills';

type Framework = 'react' | 'angular' | 'svelte' | 'vue';

const isValidFramework = (fw: string | null): fw is Framework => {
    return fw === 'react' || fw === 'angular' || fw === 'svelte' || fw === 'vue';
};

interface LabAboutClientProps {
    locale: string;
    profile: Profile;
    experiences: Experience[];
    skills: SkillCategory[];
}

function LabAboutContent({ locale, profile, experiences, skills }: LabAboutClientProps) {
    const searchParams = useSearchParams();
    const fw = searchParams.get('fw');
    const activeFramework: Framework = isValidFramework(fw) ? fw : 'react';

    return (
        <>
            <FrameworkToggle />
            {activeFramework === 'react' ? (
                <AboutView
                    framework="React"
                    locale={locale}
                    profile={profile}
                    experiences={experiences}
                    skills={skills}
                    experiencesError={null}
                    skillsError={null}
                />
            ) : (
                <FrameworkHost framework={activeFramework} locale={locale} />
            )}
        </>
    );
}

export default function LabAboutClient(props: LabAboutClientProps) {
    return (
        <Suspense fallback={<div className="p-4">Loading...</div>}>
            <LabAboutContent {...props} />
        </Suspense>
    );
}
