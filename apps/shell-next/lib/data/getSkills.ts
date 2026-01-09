import { supabase } from '@repo/supabase-client';

export interface Skill {
    name: string;
    level?: string;
}

export interface SkillCategory {
    category: string;
    skills: Skill[];
}

export async function getSkills(locale: 'tr' | 'en' = 'en'): Promise<SkillCategory[]> {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching skills:', error);
        return [];
    }

    if (!data) return [];

    // Group skills by category
    const grouped: Record<string, Skill[]> = {};

    data.forEach((skillRow: any) => {
        const category = skillRow.category || 'Other';

        if (!grouped[category]) {
            grouped[category] = [];
        }

        // Parse content JSONB - can be either:
        // 1. Direct array: [{name: string, level: string}]
        // 2. Locale-keyed object: {en: [{name, level}], tr: [{name, level}]}
        if (skillRow.content) {
            let items: any[] = [];

            if (Array.isArray(skillRow.content)) {
                // Direct array format
                items = skillRow.content;
            } else if (typeof skillRow.content === 'object') {
                // Locale-keyed format
                items = skillRow.content[locale] || skillRow.content.en || skillRow.content.tr || [];
            }

            if (Array.isArray(items)) {
                items.forEach((item: any) => {
                    if (item && typeof item === 'object' && item.name) {
                        grouped[category].push({
                            name: item.name,
                            level: item.level,
                        });
                    } else if (typeof item === 'string') {
                        grouped[category].push({
                            name: item,
                        });
                    }
                });
            }
        }
    });

    // Convert to array format
    return Object.entries(grouped).map(([category, skills]) => ({
        category,
        skills,
    }));
}
