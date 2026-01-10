'use client';

import { SiNextdotjs, SiReact, SiAngular, SiSvelte, SiVuedotjs } from 'react-icons/si';

interface ArchitectureInfoProps {
    locale: string;
}

export default function ArchitectureInfo({ locale }: ArchitectureInfoProps) {
    const isTr = locale === 'tr';

    const content = {
        title: isTr ? 'Mimari Genel Bakış' : 'Architecture Overview',
        description: isTr
            ? 'Bu proje, Next.js üzerine kurulu bir Shell (kabuk) uygulamasıdır. Mikro-frontend mimarisi sayesinde, farklı teknolojilerle yazılmış bağımsız uygulamaları tek bir çatı altında birleştirir.'
            : 'This project is a Shell application built on Next.js. utilizing micro-frontend architecture to unify independent applications written in different technologies under a single roof.',
        features: [
            {
                icon: <SiNextdotjs className="w-6 h-6" />,
                title: isTr ? 'Next.js Shell' : 'Next.js Shell',
                desc: isTr
                    ? 'Ana uygulama ve yönlendirme (Routing) yönetimi. Server-Side Rendering (SSR) ve SEO optimizasyonu sağlar.'
                    : 'Main application and routing management. Provides Server-Side Rendering (SSR) and SEO optimization.'
            },
            {
                icon: <div className="flex gap-1"><SiReact /><SiAngular /><SiSvelte /><SiVuedotjs /></div>,
                title: isTr ? 'Web Components' : 'Web Components',
                desc: isTr
                    ? 'Angular, Svelte ve Vue uygulamaları, Framework-agnostik Web Component standartlarına dönüştürülerek entegre edilmiştir.'
                    : 'Angular, Svelte, and Vue applications are integrated by converting them into Framework-agnostic Web Component standards.'
            }
        ]
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <div
                className="bg-surface-elevated/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                        <SiNextdotjs className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
                        <p className="text-text-secondary leading-relaxed">
                            {content.description}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                    {content.features.map((feature, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                            <div className="mb-3 text-neutral-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-text-secondary">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
