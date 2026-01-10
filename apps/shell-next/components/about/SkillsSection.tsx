import Card from '@/components/ui/Card';

interface SkillItem {
  name: string;
  level?: string;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
  locale: string;
}

export default function SkillsSection({ skills, locale }: SkillsSectionProps) {
  // skills prop is already processed by getSkills into categories
  const categories = skills || [];

  return (
    <div className="mt-16 pt-8 border-t border-border/30">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></span>
        {locale === 'en' ? 'Skills' : 'Yetenekler'}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((catGroup) => {
          const categoryName = catGroup.category;
          const items = catGroup.skills || [];

          return (
            <Card key={categoryName} className="hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
              <h3 className="text-lg font-bold text-text-primary mb-6 pb-2 border-b border-border/10 flex items-center justify-between">
                {categoryName}
                <span className="text-xs font-normal text-text-muted px-2 py-0.5 rounded bg-surface-elevated/50">
                  {items.length}
                </span>
              </h3>

              {items.length === 0 ? (
                <p className="text-sm text-text-muted italic">
                  {locale === 'en' ? 'No skills in this category' : 'Bu kategoride yetenek bulunmuyor'}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => {
                    const levelKey = item.level?.toLowerCase() || '';

                    return (
                      <div
                        key={`${categoryName}-${item.name}-${index}`}
                        className="group relative inline-flex items-center gap-2 px-3 py-1.5 bg-surface-elevated/30 border border-border/30 rounded-lg hover:bg-surface-elevated hover:border-accent/40 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">{item.name}</span>
                        {/* 
                         Optional: Level indicator dot 
                        */}
                        <span className={`w-1.5 h-1.5 rounded-full ${levelKey === 'advanced' || levelKey === 'ileri' ? 'bg-emerald-400' : levelKey === 'intermediate' || levelKey === 'orta' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
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
