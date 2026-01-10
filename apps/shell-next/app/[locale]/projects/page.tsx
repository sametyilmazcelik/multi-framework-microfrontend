import { generateLocaleStaticParams } from '@/lib/i18n';
import { getProjects } from '@/lib/data/getProjects';
import ProjectsClient from '@/components/projects/ProjectsClient';
import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: {
    locale: string;
  };
}

export const generateStaticParams = generateLocaleStaticParams;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  const isEn = locale === 'en';

  const title = isEn
    ? 'Projects - Samet Yılmazçelik | Portfolio'
    : 'Projeler - Samet Yılmazçelik | Portfolyo';

  const description = isEn
    ? 'Explore the web development projects of Samet Yılmazçelik. Featuring React, Next.js, and Microfrontend applications.'
    : 'Samet Yılmazçelik\'in web geliştirme projelerini keşfedin. React, Next.js ve Mikro-frontend uygulamaları içerir.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://sametyilmazcelik.com/${locale}/projects`,
      languages: {
        'en-US': 'https://sametyilmazcelik.com/en/projects',
        'tr-TR': 'https://sametyilmazcelik.com/tr/projects',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://sametyilmazcelik.com/${locale}/projects`,
      siteName: 'Samet Yılmazçelik - Portfolio',
      locale: isEn ? 'en_US' : 'tr_TR',
      type: 'website',
    },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';
  const validLocale = (locale === 'tr' || locale === 'en') ? locale : 'en';

  // Fetch projects from Supabase
  const projects = await getProjects(validLocale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEn ? 'Projects' : 'Projeler',
    description: isEn
      ? 'A collection of projects by Samet Yılmazçelik'
      : 'Samet Yılmazçelik tarafından geliştirilen projeler',
    url: `https://sametyilmazcelik.com/${locale}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects?.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.name || 'Untitled Project',
          description: project.description || '',
          applicationCategory: 'WebApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      })) || []
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <JsonLd data={structuredData} />
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
