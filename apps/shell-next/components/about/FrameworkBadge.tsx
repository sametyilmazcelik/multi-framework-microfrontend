import { frameworkConfig } from './FrameworkIcons';

interface FrameworkBadgeProps {
  framework: 'React' | 'Vue' | 'Svelte' | 'Angular';
  locale: 'en' | 'tr';
}

const frameworkMap: Record<string, 'react' | 'angular' | 'svelte' | 'vue'> = {
  React: 'react',
  Angular: 'angular',
  Svelte: 'svelte',
  Vue: 'vue',
};

const badgeTexts = {
  en: {
    React: 'This page is implemented with React',
    Vue: 'This page is implemented with Vue',
    Svelte: 'This page is implemented with Svelte',
    Angular: 'This page is implemented with Angular',
  },
  tr: {
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
    <div className="mb-6">
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder}`}>
        <span className="w-3 h-3">{config.icon}</span>
        {text}
      </span>
    </div>
  );
}
