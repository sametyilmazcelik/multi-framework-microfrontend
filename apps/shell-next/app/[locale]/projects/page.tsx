import { generateLocaleStaticParams } from '@/lib/i18n';
import { getProjects } from '@/lib/data/getProjects';
import ProjectsClient from '@/components/projects/ProjectsClient';

interface PageProps {
  params: {
    locale: string;
  };
}

export const generateStaticParams = generateLocaleStaticParams;

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  // Fetch projects from Supabase
  const projects = await getProjects(validLocale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-8 bg-accent rounded-full"></span>
          <h1 className="text-text-primary">
            {isEn ? 'Projects' : 'Projeler'}
          </h1>
        </div>
        <p className="text-xl text-text-secondary max-w-2xl">
          {isEn
            ? 'A collection of projects I\'ve worked on, showcasing my expertise in modern web development'
            : 'Üzerinde çalıştığım projelerin bir koleksiyonu, modern web geliştirmedeki uzmanlığımı sergiliyor'}
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <ProjectsClient projects={projects} locale={locale} />
      ) : (
        <div className="card-hover text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-text-secondary text-lg">
            {isEn ? 'No projects found' : 'Proje bulunamadı'}
          </p>
          <p className="text-text-muted text-sm mt-2">
            {isEn ? 'Projects will appear here once added to the database' : 'Projeler veritabanına eklendikten sonra burada görünecek'}
          </p>
        </div>
      )}
    </div>
  );
}
