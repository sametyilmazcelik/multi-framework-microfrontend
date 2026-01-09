'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { frameworkConfig } from './FrameworkIcons';

type Framework = 'react' | 'angular' | 'svelte' | 'vue';

const frameworks: Framework[] = ['react', 'angular', 'svelte', 'vue'];

function FrameworkToggleInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFramework = (searchParams.get('fw') || 'react') as Framework;

  const handleClick = (fw: Framework) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('fw', fw);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex gap-2 flex-wrap">
      {frameworks.map((fw) => {
        const isActive = currentFramework === fw;
        const config = frameworkConfig[fw];
        return (
          <button
            key={fw}
            onClick={() => handleClick(fw)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                ? `${config.activeBg} ${config.activeText}`
                : `${config.inactiveBg} ${config.inactiveText} border ${config.inactiveBorder}`
              }`}
          >
            <span className="w-4 h-4">{config.icon}</span>
            {config.label}
          </button>
        );
      })}
    </div>
  );
}

function FrameworkToggleFallback() {
  return (
    <div className="mb-8 flex gap-2 flex-wrap">
      {frameworks.map((fw) => {
        const config = frameworkConfig[fw];
        const isActive = fw === 'react';
        return (
          <span
            key={fw}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${isActive
                ? `${config.activeBg} ${config.activeText}`
                : `${config.inactiveBg} ${config.inactiveText} border ${config.inactiveBorder}`
              }`}
          >
            <span className="w-4 h-4">{config.icon}</span>
            {config.label}
          </span>
        );
      })}
    </div>
  );
}

export default function FrameworkToggle() {
  return (
    <Suspense fallback={<FrameworkToggleFallback />}>
      <FrameworkToggleInner />
    </Suspense>
  );
}
