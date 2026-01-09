import { supabase } from '@repo/supabase-client';
import { getLocaleValue } from '@/lib/i18n';

export interface Experience {
    id: string;
    company: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
    tech: string[];
    order_index: number;
}

export async function getExperiences(locale: 'tr' | 'en' = 'en'): Promise<Experience[]> {
    const { data, error } = await supabase!
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }

    if (!data) return [];

    return data.map((exp: any) => ({
        id: exp.id,
        company: exp.company || '',
        role: getLocaleValue(exp.role, locale),
        location: getLocaleValue(exp.location, locale),
        period: getPeriodString(exp.period, locale),
        bullets: getBulletsArray(exp.bullets, locale),
        tech: exp.tech || [],
        order_index: exp.order_index || 0,
    }));
}

function getPeriodString(period: any, locale: 'tr' | 'en'): string {
    if (!period) return '';
    if (typeof period === 'string') return period;

    const start = period.start || '';
    const end = getLocaleValue(period.end, locale) || period.end || '';

    if (start && end) {
        return `${start} - ${end}`;
    }
    return start || end || '';
}

function getBulletsArray(bullets: any, locale: 'tr' | 'en'): string[] {
    if (!bullets) return [];
    if (Array.isArray(bullets)) {
        // If it's already an array of strings
        if (bullets.length > 0 && typeof bullets[0] === 'string') {
            return bullets;
        }
        // If it's an array but needs locale extraction
        return bullets;
    }
    // If it's a JSONB object with locale keys
    if (typeof bullets === 'object') {
        const localeValue = bullets[locale] || bullets.en || bullets.tr;
        if (Array.isArray(localeValue)) {
            return localeValue;
        }
    }
    return [];
}
