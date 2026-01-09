import { supabase } from '@repo/supabase-client';
import { getLocaleValue } from '@/lib/i18n';

export interface Education {
    id: string;
    institution: string;
    degree: string;
    period: string;
    order_index?: number;
}

export async function getEducation(locale: 'tr' | 'en' = 'en'): Promise<Education[]> {
    const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching education:', error);
        return [];
    }

    if (!data) return [];

    return data.map((edu: any) => ({
        id: edu.id,
        institution: getLocaleValue(edu.institution, locale),
        degree: getLocaleValue(edu.degree, locale),
        period: getPeriodValue(edu.period, edu.year, edu.status, locale),
        order_index: edu.order_index,
    }));
}

function getPeriodValue(period: any, year: any, status: any, locale: 'tr' | 'en'): string {
    if (period) {
        return getLocaleValue(period, locale);
    }
    if (year) {
        return typeof year === 'string' ? year : String(year);
    }
    if (status) {
        return getLocaleValue(status, locale);
    }
    return '';
}
