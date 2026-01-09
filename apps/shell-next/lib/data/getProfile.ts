import { supabase } from '@repo/supabase-client';
import { getLocaleValue } from '@/lib/i18n';

export interface Profile {
    name: string;
    title: string;
    summary: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    location?: string;
}

export async function getProfile(locale: 'tr' | 'en' = 'en'): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    if (!data) return null;

    return {
        name: data.name || '',
        title: getLocaleValue(data.title, locale),
        summary: getLocaleValue(data.summary, locale),
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        github: data.github,
        location: getLocaleValue(data.location, locale),
    };
}
