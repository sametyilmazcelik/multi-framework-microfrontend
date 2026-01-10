import { frameworkConfig } from './FrameworkIcons';

interface FrameworkBadgeProps {
  framework: 'Next.js' | 'React' | 'Vue' | 'Svelte' | 'Angular';
  locale: 'en' | 'tr';
}

const frameworkMap: Record<string, 'next' | 'react' | 'angular' | 'svelte' | 'vue'> = {
  'Next.js': 'next',
  React: 'react',
  Angular: 'angular',
  Svelte: 'svelte',
  Vue: 'vue',
};

const badgeTexts = {
  en: {
    'Next.js': 'This project is built with Next.js',
    React: 'This page is implemented with React',
    Vue: 'This page is implemented with Vue',
    Svelte: 'This page is implemented with Svelte',
    Angular: 'This page is implemented with Angular',
  },
  tr: {
    'Next.js': 'Bu proje Next.js ile geliştirilmiştir',
    React: 'Bu sayfa React ile geliştirildi',
    Vue: 'Bu sayfa Vue ile geliştirildi',
    Svelte: 'Bu sayfa Svelte ile geliştirildi',
    Angular: 'Bu sayfa Angular ile geliştirildi',
  },
};

export default function FrameworkBadge({ framework, locale }: FrameworkBadgeProps) {
  const text = badgeTexts[locale][framework];
  const fwKey = frameworkMap[framework];
  const config = frameworkConfig[fwKey];

  return (
    <div className="mb-8 flex justify-center">
      <span className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium 
        ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder}
        transition-colors duration-300
      `}>
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        {text}
      </span>
    </div>
  );
}
