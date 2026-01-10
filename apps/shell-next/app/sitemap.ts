import { MetadataRoute } from 'next';

const baseUrl = 'https://sametyilmazcelik.com';
const locales = ['en', 'tr'];
const paths = [
    '', // home
    '/about',
    '/contact',
    '/demos',
    '/lab',
    '/projects',
    '/resume',
    '/stack',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Generate entries for each path and locale
    paths.forEach((path) => {
        locales.forEach((locale) => {
            // Handle root path specially if needed, but here we assume standard /{locale}/{path} structure
            const url = `${baseUrl}/${locale}${path}`;

            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: path === '' ? 'weekly' : 'monthly',
                priority: path === '' ? 1.0 : 0.8,
            });
        });
    });

    // Add a root entry if you redirect / to /en or /tr, but usually sitemap should point to canonicals.
    // Ideally, we list all locale variants.

    return sitemapEntries;
}
