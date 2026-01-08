'use client';

import { useState } from 'react';
import ProjectModal from '@/components/ui/ProjectModal';

interface Project {
    id?: string;
    name: string;
    description: string;
    tech: string[];
}

interface ProjectsClientProps {
    projects: Project[];
    locale: string;
}

export default function ProjectsClient({ projects, locale }: ProjectsClientProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isEn = locale === 'en';

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <button
                        key={project.id || idx}
                        onClick={() => handleProjectClick(project)}
                        className="card-glow group text-left w-full hover:scale-[1.02] transition-transform"
                    >
                        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                            {project.name}
                        </h3>
                        {project.description && (
                            <p className="text-sm text-text-secondary mb-4 line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>
                        )}
                        {project.tech && Array.isArray(project.tech) && project.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.slice(0, 3).map((t: string, tidx: number) => (
                                    <span
                                        key={tidx}
                                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono glass text-text-secondary border border-border"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono text-text-muted">
                                        +{project.tech.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </>
    );
}
