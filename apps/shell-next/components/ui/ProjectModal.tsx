'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        name: string;
        description: string;
        tech: string[];
    } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto card animate-fade-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg glass hover:bg-surface-elevated transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="pr-12">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">
                        {project.name}
                    </h2>

                    <p className="text-base text-text-secondary leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {project.tech && project.tech.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-text-primary mb-3">
                                Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 text-sm font-mono rounded glass text-text-secondary border border-border hover:border-accent transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
