import Card from '@/components/ui/Card';

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
  advanced: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function SkillsSection({ skills, locale }: SkillsSectionProps) {
  if (skills.length === 0) {
    return (
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-neutral-600 text-center">No skills found</p>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const sortedCategories = Object.keys(groupedSkills).sort();
  sortedCategories.forEach((category) => {
    groupedSkills[category].sort((a, b) => a.order_index - b.order_index);
  });

  const getLocalizedSkills = (skill: Skill): SkillItem[] => {
    if (!skill.content || typeof skill.content !== 'object') {
      return [];
    }
    const localizedItems = skill.content[locale] || skill.content.en;
    return Array.isArray(localizedItems) ? localizedItems : [];
  };

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
        {locale === 'en' ? 'Skills' : 'Yetenekler'}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map((category) => {
          const categorySkills = groupedSkills[category];
          const allSkillItems: Array<{ skill: Skill; item: SkillItem }> = [];

          categorySkills.forEach((skill) => {
            const items = getLocalizedSkills(skill);
            items.forEach((item) => {
              allSkillItems.push({ skill, item });
            });
          });

          return (
            <Card key={category} className="hover:scale-[1.02] transition-transform duration-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                {category}
              </h3>
              {allSkillItems.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">
                  {locale === 'en' ? 'No skills in this category' : 'Bu kategoride yetenek bulunmuyor'}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {allSkillItems.map(({ skill, item }, index) => {
                    const levelKey = item.level?.toLowerCase() || '';
                    const levelLabel = levelLabels[locale][levelKey as keyof typeof levelLabels[typeof locale]] || item.level;
                    const levelColor = levelColors[levelKey] || 'bg-neutral-100 text-neutral-800 border-neutral-200';

                    return (
                      <div
                        key={`${skill.id || skill.category}-${item.name}-${index}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <span className="text-sm font-medium text-neutral-900">{item.name}</span>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}
