interface FrameworkBadgeProps {
  framework: 'React' | 'Vue' | 'Svelte' | 'Angular';
  locale: 'en' | 'tr';
}

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

  return (
    <div className="mb-8">
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
        {text}
      </span>
    </div>
  );
}
