interface SkillItem {
  name: string;
  level: string;
}

interface Skill {
  id?: string;
  category: string;
  content: {
    tr?: SkillItem[];
    en?: SkillItem[];
  } | null;
  order_index: number;
}

interface SkillsSectionProps {
  skills: Skill[];
  locale: 'en' | 'tr';
}

const levelLabels = {
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
  tr: {
    beginner: 'Başlangıç',
    intermediate: 'Orta',
    advanced: 'İleri',
  },
};

const levelColors: Record<string, string> = {
  beginner: 'bg-blue-100 text-blue-800 border-blue-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-green-100 text-green-800 border-green-200',
};

export default function SkillsSection({ skills, locale }: SkillsSectionProps) {
  if (skills.length === 0) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 text-center">No skills found</p>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Sort categories and skills within each category
  const sortedCategories = Object.keys(groupedSkills).sort();
  sortedCategories.forEach((category) => {
    groupedSkills[category].sort((a, b) => a.order_index - b.order_index);
  });

  // Helper function to get localized skill items
  const getLocalizedSkills = (skill: Skill): SkillItem[] => {
    if (!skill.content || typeof skill.content !== 'object') {
      return [];
    }

    // Try locale first, fallback to en
    const localizedItems = skill.content[locale] || skill.content.en;
    return Array.isArray(localizedItems) ? localizedItems : [];
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Skills' : 'Yetenekler'}
      </h2>

      <div className="space-y-8">
        {sortedCategories.map((category) => {
          const categorySkills = groupedSkills[category];
          const allSkillItems: Array<{ skill: Skill; item: SkillItem }> = [];

          // Extract localized skill items from all skills in this category
          categorySkills.forEach((skill) => {
            const items = getLocalizedSkills(skill);
            items.forEach((item) => {
              allSkillItems.push({ skill, item });
            });
          });

          return (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {category}
              </h3>
              {allSkillItems.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  {locale === 'en' ? 'No skills in this category' : 'Bu kategoride yetenek bulunmuyor'}
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {allSkillItems.map(({ skill, item }, index) => {
                    const levelKey = item.level?.toLowerCase() || '';
                    const levelLabel = levelLabels[locale][levelKey as keyof typeof levelLabels[typeof locale]] || item.level;
                    const levelColor = levelColors[levelKey] || 'bg-gray-100 text-gray-800 border-gray-200';

                    return (
                      <div
                        key={`${skill.id || skill.category}-${item.name}-${index}`}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        {item.level && (
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${levelColor}`}
                          >
                            {levelLabel}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
