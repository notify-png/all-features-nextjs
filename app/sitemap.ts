import type { MetadataRoute } from "next";
import { buildLanguageAlternates, SITE_URL } from "@/lib/seo/metadata";
import { FEATURE_SITEMAP_PATHS } from "@/lib/seo/feature-pages";
import { getAllSlugs } from "@/lib/mv/data";

const MV_LOCALES = ['en', 'es', 'ja', 'ko', 'ru', 'fr', 'de', 'pt', 'it', 'zh-HK', 'zh-CN']

function mvLanguageAlternates(slug: string): Record<string, string> {
  const base = `/features/music-video-generator/${slug}`
  const langs: Record<string, string> = {
    'x-default': `${SITE_URL}${base}`,
    'en': `${SITE_URL}${base}`,
  }
  for (const loc of MV_LOCALES) {
    if (loc !== 'en') {
      langs[loc] = `${SITE_URL}/${loc}/features/music-video-generator/${slug}`
    }
  }
  return langs
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Existing feature pages ──
  const featureEntries: MetadataRoute.Sitemap = FEATURE_SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/features" ? 0.8 : 0.7,
    alternates: {
      languages: buildLanguageAlternates(path),
    },
  }));

  // ── MV landing pages: one entry per locale per slug ──
  const slugs = getAllSlugs()
  const mvEntries: MetadataRoute.Sitemap = []

  for (const slug of slugs) {
    const alts = mvLanguageAlternates(slug)

    // English (canonical, no prefix)
    mvEntries.push({
      url: `${SITE_URL}/features/music-video-generator/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: alts },
    })

    // Non-English locales
    for (const loc of MV_LOCALES) {
      if (loc === 'en') continue
      mvEntries.push({
        url: `${SITE_URL}/${loc}/features/music-video-generator/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alts },
      })
    }
  }

  return [...featureEntries, ...mvEntries]
}
