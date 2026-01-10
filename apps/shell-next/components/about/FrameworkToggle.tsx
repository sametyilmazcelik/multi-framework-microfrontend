'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { frameworkConfig } from './FrameworkIcons';

type Framework = 'next' | 'react' | 'angular' | 'svelte' | 'vue';

const frameworks: Framework[] = ['next', 'react', 'angular', 'svelte', 'vue'];

function FrameworkToggleInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFramework = (searchParams.get('fw') || 'next') as Framework;

  const handleClick = (fw: Framework) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('fw', fw);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-12 flex justify-center">
      <div className="inline-flex p-1 rounded-xl bg-surface-elevated/50 backdrop-blur-md border border-white/5 shadow-inner">
        {frameworks.map((fw) => {
          const isActive = currentFramework === fw;
          const config = frameworkConfig[fw];

          return (
            <button
              key={fw}
              onClick={() => handleClick(fw)}
              className={`
                relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                flex items-center gap-2.5
                ${isActive
                  ? 'text-white shadow-lg shadow-black/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }
              `}
            >
              {isActive && (
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${config.gradient} opacity-90`} />
              )}

              <span className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                {config.icon}
              </span>
              <span className="relative z-10">
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FrameworkToggleFallback() {
  return (
    <div className="mb-12 flex justify-center">
      <div className="inline-flex p-1 rounded-xl bg-surface-elevated/50 backdrop-blur-md border border-white/5 shadow-inner">
        {frameworks.map((fw) => {
          const config = frameworkConfig[fw];
          const isActive = fw === 'next';
          return (
            <span
              key={fw}
              className={`
                relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                flex items-center gap-2.5
                ${isActive
                  ? 'text-white shadow-lg shadow-black/20'
                  : 'text-neutral-400'
                }
              `}
            >
              {isActive && (
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${config.gradient} opacity-90`} />
              )}
              <span className="relative z-10 w-4 h-4">{config.icon}</span>
              <span className="relative z-10">{config.label}</span>
            </span>
          );
        })}
      </div>
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
