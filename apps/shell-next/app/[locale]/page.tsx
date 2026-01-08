import { supabase } from '@repo/supabase-client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .single();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const title = profile?.title?.[locale] || profile?.title?.en || '';
  const summary = profile?.summary?.[locale] || profile?.summary?.en || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
            Samet Yılmazçelik
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-300 mb-8 font-medium">
            {title}
          </p>
          <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            {summary}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/projects`} variant="primary">
              {isEn ? 'View Projects' : 'Projeleri Gör'}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline">
              {isEn ? 'Get in Touch' : 'İletişime Geç'}
            </Button>
            <Button href="/cv.pdf" target="_blank" variant="secondary">
              {isEn ? 'Download CV' : 'CV İndir'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
            <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2">
              9+
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              {isEn ? 'Years Experience' : 'Yıl Deneyim'}
            </div>
          </Card>

          <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
            <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2">
              20+
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              {isEn ? 'Projects' : 'Proje'}
            </div>
          </Card>

          <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
            <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 dark:text-emerald-400">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              {isEn ? 'Istanbul, Turkey' : 'İstanbul, Türkiye'}
            </div>
          </Card>
        </div>

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8">
              {isEn ? 'Featured Projects' : 'Öne Çıkan Projeler'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => {
                const name = project.name?.[locale] || project.name?.en || project.name || 'Untitled';
                const description = project.description?.[locale] || project.description?.en || project.description || '';
                
                return (
                  <Card key={project.id} className="hover:scale-[1.02] transition-transform duration-200">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                        {description}
                      </p>
                    )}
                    {project.tech && Array.isArray(project.tech) && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Button href={`/${locale}/projects`} variant="outline">
                {isEn ? 'View All Projects' : 'Tüm Projeleri Gör'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

