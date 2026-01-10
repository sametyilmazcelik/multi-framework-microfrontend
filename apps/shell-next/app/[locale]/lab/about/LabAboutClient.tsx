'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AboutView from '@/components/about/AboutView';
import FrameworkToggle from '@/components/about/FrameworkToggle';
import FrameworkHost from '@/components/about/FrameworkHost';
import FrameworkBadge from '@/components/about/FrameworkBadge';
import ArchitectureInfo from '@/components/about/ArchitectureInfo';
import type { Profile } from '@/lib/data/getProfile';
import type { Experience } from '@/lib/data/getExperiences';
import type { SkillCategory } from '@/lib/data/getSkills';

type Framework = 'next' | 'react' | 'angular' | 'svelte' | 'vue';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const isValidFramework = (fw: string | null): fw is Framework => {
    return fw === 'next' || fw === 'react' || fw === 'angular' || fw === 'svelte' || fw === 'vue';
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
    const activeFramework: Framework = isValidFramework(fw) ? fw : 'next';

    return (
        <>
            <FrameworkToggle />
            {activeFramework === 'next' ? (
                <ArchitectureInfo locale={locale} />
            ) : activeFramework === 'react' ? (
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
                <>
                    <FrameworkBadge
                        framework={capitalize(activeFramework) as any}
                        locale={locale as any}
                    />
                    <FrameworkHost framework={activeFramework} locale={locale} />
                </>
            )}
        </>
    );
}

export default function LabAboutClient(props: LabAboutClientProps) {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-accent/10 border-b-accent/50 rounded-full animate-spin [animation-duration:1.5s]"></div>
                </div>
                <div className="text-text-secondary font-medium tracking-wide animate-pulse">
                    {props.locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}
                </div>
            </div>
        }>
            <LabAboutContent {...props} />
        </Suspense>
    );
}
