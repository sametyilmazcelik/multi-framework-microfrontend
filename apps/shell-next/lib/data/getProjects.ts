import { supabase } from '@repo/supabase-client';
import { getLocaleValue } from '@/lib/i18n';

export interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    order_index?: number;
    created_at?: string;
}

export async function getProjects(locale: 'tr' | 'en' = 'en'): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    if (!data) return [];

    return data.map((project: any) => ({
        id: project.id,
        name: getLocaleValue(project.name, locale) || project.name || '',
        description: getLocaleValue(project.description, locale),
        tech: project.tech || [],
        order_index: project.order_index,
        created_at: project.created_at,
    }));
}
