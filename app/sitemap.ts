import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { FEATURE_SITEMAP_PAGES } from "@/lib/seo/feature-pages";
import { getAvailableContentLocales, getIndexableConfigs } from "@/lib/mv/data";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";

const localizedUrl = (locale: string, path: string) =>
  locale === DEFAULT_LOCALE ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;

const languageAlternates = (path: string, locales: readonly string[]) => ({
  "x-default": localizedUrl(DEFAULT_LOCALE, path),
  ...Object.fromEntries(locales.map(locale => [locale, localizedUrl(locale, path)])),
});

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Existing feature pages ──
  const featureEntries: MetadataRoute.Sitemap = FEATURE_SITEMAP_PAGES
    .filter(page => page.published && page.indexable)
    .flatMap(page => LOCALES.map(locale => ({
      url: localizedUrl(locale, page.path),
      ...(page.updatedAt ? { lastModified: page.updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: page.path === "/features" ? 0.8 : 0.7,
      alternates: { languages: languageAlternates(page.path, LOCALES) },
    })));

  // ── MV landing pages: one entry per locale per slug ──
  const mvEntries: MetadataRoute.Sitemap = []

  for (const config of getIndexableConfigs()) {
    const path = `/features/music-video-generator/${config.slug}`
    const locales = getAvailableContentLocales(config.slug, LOCALES)
    const alts = languageAlternates(path, locales)

    for (const locale of locales) {
      mvEntries.push({
        url: localizedUrl(locale, path),
        ...(config.updatedAt ? { lastModified: config.updatedAt } : {}),
        changeFrequency: "monthly",
        priority: locale === DEFAULT_LOCALE ? 0.7 : 0.6,
        alternates: { languages: alts },
      })
    }
  }

  return [...featureEntries, ...mvEntries]
}
