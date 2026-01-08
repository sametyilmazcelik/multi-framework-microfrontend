import { supabase } from '@repo/supabase-client';
import Card from '@/components/ui/Card';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {isEn ? 'Projects' : 'Projeler'}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {isEn 
            ? 'A collection of projects I\'ve worked on' 
            : 'Üzerinde çalıştığım projelerin bir koleksiyonu'}
        </p>
      </div>

      {projects && projects.length > 0 ? (
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
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-4">
                    {description}
                  </p>
                )}
                {project.tech && Array.isArray(project.tech) && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600"
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
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            {isEn ? 'No projects found' : 'Proje bulunamadı'}
          </p>
        </div>
      )}
    </div>
  );
}

