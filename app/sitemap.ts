import type { MetadataRoute } from "next";
import { buildLanguageAlternates, SITE_URL } from "@/lib/seo/metadata";
import { FEATURE_SITEMAP_PATHS } from "@/lib/seo/feature-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return FEATURE_SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/features" ? 0.8 : 0.7,
    alternates: {
      languages: buildLanguageAlternates(path),
    },
  }));
}
