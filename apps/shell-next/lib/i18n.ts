// Centralized i18n utilities for locale handling
export const LOCALES = ['tr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

// Helper to extract locale-specific value from localized fields
export function getLocaleValue<T = string>(
    value: T | { tr?: T; en?: T } | null | undefined,
    locale: string
): T | undefined {
    if (value === null || value === undefined) return undefined;

    if (typeof value === 'object' && value !== null && ('tr' in value || 'en' in value)) {
        const localized = value as { tr?: T; en?: T };
        return localized[locale as 'tr' | 'en'] ?? localized.en;
    }

    return value as T;
}

// Generate static params for locale-based routes
export function generateLocaleStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}
