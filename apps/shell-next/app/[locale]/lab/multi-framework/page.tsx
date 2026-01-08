export default function MultiFrameworkPage({ params }: { params: { locale: string } }) {
    const isEn = params.locale === 'en';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-xs font-mono font-medium text-accent">
                        {isEn ? 'Multi-Framework Architecture' : 'Çoklu Framework Mimarisi'}
                    </span>
                </div>

                <h1 className="text-text-primary mb-6">
                    {isEn ? 'Microfrontend Lab' : 'Microfrontend Laboratuvarı'}
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                    {isEn
                        ? 'Demonstrating microfrontend architecture with Next.js, Angular, Svelte, and Vue working together seamlessly'
                        : 'Next.js, Angular, Svelte ve Vue ile sorunsuz çalışan microfrontend mimarisi gösterimi'}
                </p>
            </div>

            <div className="card-hover text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-text-secondary text-lg">
                    {isEn ? 'Multi-framework demo coming soon...' : 'Çoklu framework demosu yakında...'}
                </p>
                <p className="text-text-muted text-sm mt-2">
                    {isEn
                        ? 'This section will showcase microfrontends built with different frameworks, all integrated into this Next.js shell'
                        : 'Bu bölüm farklı frameworklerle oluşturulmuş microfrontendleri gösterecek, hepsi bu Next.js kabuğuna entegre'}
                </p>
            </div>
        </div>
    );
}
