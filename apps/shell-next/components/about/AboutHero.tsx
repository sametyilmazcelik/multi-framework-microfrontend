interface AboutHeroProps {
  profile: {
    name: string;
    title: {
      tr: string;
      en: string;
    };
    summary: {
      tr: string;
      en: string;
    };
    location: {
      tr: string;
      en: string;
    };
  };
  locale: string;
}

export default function AboutHero({ profile, locale }: AboutHeroProps) {
  const title = profile.title[locale as 'tr' | 'en'] || profile.title.en;
  const summary = profile.summary[locale as 'tr' | 'en'] || profile.summary.en;
  const location = profile.location[locale as 'tr' | 'en'] || profile.location.en;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {profile.name}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {title}
        </p>
      </div>

      <div className="max-w-3xl">
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="pt-2">
        <p className="text-sm text-gray-500">
          {location}
        </p>
      </div>
    </div>
  );
}

