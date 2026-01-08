'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type Framework = 'react' | 'angular' | 'svelte' | 'vue';

const frameworks: Framework[] = ['react', 'angular', 'svelte', 'vue'];

export default function FrameworkToggle() {
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
    <div className="mb-8 flex gap-2">
      {frameworks.map((fw) => {
        const isActive = currentFramework === fw;
        return (
          <button
            key={fw}
            onClick={() => handleClick(fw)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {fw.charAt(0).toUpperCase() + fw.slice(1)}
          </button>
        );
      })}
    </div>
  );
}


