import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type helpers for JSONB locale fields
export type LocaleField<T = string> = {
    tr?: T;
    en?: T;
} | string;

export function getLocaleValue(field: LocaleField | null | undefined, locale: 'tr' | 'en'): string {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[locale] || field.en || field.tr || '';
}
