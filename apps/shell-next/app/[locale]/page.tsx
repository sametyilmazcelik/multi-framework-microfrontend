import { supabase } from '@repo/supabase-client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Image from 'next/image';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';

  // ✅ Null-safe narrowing (TS build "possibly null" hatasını kesin çözer)
  const client = supabase;

  if (!client) {
    // CI env eksikse bile build patlamasın diye fallback içerik
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-text-primary mb-4">
          {isEn ? 'Welcome' : 'Hoş geldin'}
        </h1>
        <p className="text-text-secondary">
          {isEn
            ? 'Configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
            : 'Konfigürasyon eksik. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY ayarlanmalı.'}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`/${locale}/projects`} variant="primary">
            {isEn ? 'View Projects' : 'Projeleri Gör'}
          </Button>
          <Button href={`/${locale}/contact`} variant="secondary">
            {isEn ? 'Get in Touch' : 'İletişime Geç'}
          </Button>
        </div>
      </div>
    );
  }

  const { data: profile } = await client
    .from('profile')
    .select('*')
    .single();

  const { data: projects } = await client
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const title = profile?.title?.[locale] || profile?.title?.en || '';
  const summary = profile?.summary?.[locale] || profile?.summary?.en || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left Column - Profile */}
        <div className="lg:col-span-4 space-y-8">
          {/* Profile Image with Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-glow-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl glass border border-border shadow-2xl group">
              {/* Background Image */}
              <Image
                src="/assets/profile.jpg"
                alt="Samet Yılmazçelik"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
                <div className="relative z-10">
                  <h2 className="text-white text-3xl font-bold mb-1">Samet Yılmazçelik</h2>
                  <p className="text-accent font-medium text-lg">{title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <span className="block text-4xl font-bold text-text-primary mb-1">9+</span>
              <span className="text-sm text-text-muted">{isEn ? 'Years Exp.' : 'Yıl Deneyim'}</span>
            </div>
            <div className="card text-center">
              <span className="block text-4xl font-bold text-text-primary mb-1">20+</span>
              <span className="text-sm text-text-muted">{isEn ? 'Projects' : 'Proje'}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* Main Heading */}
          <section>
            <h1 className="text-text-primary mb-6 tracking-tight leading-tight">
              {isEn ? 'Crafting digital experiences with ' : 'Dijital deneyimler yaratıyorum '}
              <span className="text-gradient">{isEn ? 'precision' : 'hassasiyet'}</span>
              {isEn ? ' and ' : ' ve '}
              <span className="text-gradient-vertical">{isEn ? 'passion' : 'tutku'}</span>
              {isEn ? '.' : ' ile.'}
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-text-secondary leading-relaxed">{summary}</p>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="card-hover group">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {isEn ? 'Clean Architecture' : 'Temiz Mimari'}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isEn
                  ? 'Code should be as beautiful as the UI it renders. Maintainable, testable, and documented.'
                  : 'Kod, oluşturduğu arayüz kadar güzel olmalı. Sürdürülebilir, test edilebilir ve dokümante.'}
              </p>
            </div>

            <div className="card-hover group">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {isEn ? 'Performance First' : 'Performans Odaklı'}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isEn
                  ? 'Every millisecond counts. Optimized bundles and efficient rendering for instant experiences.'
                  : 'Her milisaniye önemli. Optimize edilmiş paketler ve verimli render ile anlık deneyimler.'}
              </p>
            </div>
          </section>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button href={`/${locale}/projects`} variant="primary">
              {isEn ? 'View Projects' : 'Projeleri Gör'}
            </Button>
            <Button href={`/${locale}/contact`} variant="secondary">
              {isEn ? 'Get in Touch' : 'İletişime Geç'}
            </Button>
            <Button href="/cv.pdf" target="_blank" variant="outline">
              {isEn ? 'Download CV' : 'CV İndir'}
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            <h2 className="text-text-primary">{isEn ? 'Featured Projects' : 'Öne Çıkan Projeler'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => {
              const name = project.name?.[locale] || project.name?.en || project.name || 'Untitled';
              const description =
                project.description?.[locale] || project.description?.en || project.description || '';

              return (
                <div key={project.id} className="card-glow">
                  <h3 className="text-xl font-bold text-text-primary mb-2">{name}</h3>

                  {description && (
                    <p className="text-sm text-text-secondary mb-4 line-clamp-3">{description}</p>
                  )}

                  {project.tech && Array.isArray(project.tech) && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono glass text-text-secondary border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
  );
}
