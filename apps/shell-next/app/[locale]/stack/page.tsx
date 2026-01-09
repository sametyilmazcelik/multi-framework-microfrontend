import { generateLocaleStaticParams } from '@/lib/i18n';
import { getSkills } from '@/lib/data/getSkills';

export const generateStaticParams = generateLocaleStaticParams;

export default async function StackPage({ params }: { params: { locale: string } }) {
    const isEn = params.locale === 'en';
    const validLocale = (params.locale === 'tr' || params.locale === 'en') ? params.locale : 'en';

    // Fetch skills from Supabase
    const skillCategories = await getSkills(validLocale);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                    <span className="w-1 h-8 bg-accent rounded-full"></span>
                    <h1 className="text-text-primary">
                        {isEn ? 'Tech Stack' : 'Teknoloji Yığını'}
                    </h1>
                </div>
                <p className="text-xl text-text-secondary max-w-2xl">
                    {isEn
                        ? 'Technologies, frameworks, and tools I work with to build modern web applications'
                        : 'Modern web uygulamaları oluşturmak için kullandığım teknolojiler, frameworkler ve araçlar'}
                </p>
            </div>

            {skillCategories && skillCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category) => (
                        <div key={category.category} className="card-glow">
                            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-accent rounded-full"></span>
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 text-sm font-mono rounded glass text-text-secondary border border-border hover:border-accent hover:text-accent transition-all"
                                        title={skill.level}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card-hover text-center py-12">
                    <div className="text-6xl mb-4">🛠️</div>
                    <p className="text-text-secondary text-lg">
                        {isEn ? 'No skills data found' : 'Yetenek verisi bulunamadı'}
                    </p>
                    <p className="text-text-muted text-sm mt-2">
                        {isEn ? 'Skills will appear here once added to the database' : 'Yetenekler veritabanına eklendikten sonra burada görünecek'}
                    </p>
                </div>
            )}
        </div>
    );
}
