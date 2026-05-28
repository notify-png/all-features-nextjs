import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/routing";

export const SITE_URL = "https://www.tunee.ai";

/**
 * Canonical path without locale prefix, e.g. `/features/lip-sync`.
 *
 * Returns an alternates.languages map suitable for next.js Metadata:
 * - default locale (en) lives at the unprefixed path (`/features`)
 * - every other locale lives at `/{locale}/features`
 * - `x-default` mirrors the default locale URL
 */
export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}${path}`,
  };

  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      languages[locale] = `${SITE_URL}${path}`;
    } else {
      languages[locale] = `${SITE_URL}/${locale}${path}`;
    }
  }

  return languages;
}

type PageSeo = Pick<Metadata, "title" | "description" | "openGraph">;

export function buildPageMetadata(path: string, seo: PageSeo): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const openGraphUrl =
    typeof seo.openGraph === "object" && seo.openGraph !== null && "url" in seo.openGraph
      ? seo.openGraph.url
      : canonical;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      ...seo.openGraph,
      url: openGraphUrl ?? canonical,
    },
  };
}
