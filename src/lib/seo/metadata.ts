import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/routing";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

export const SITE_URL = "https://www.tunee.ai";
// 主站同款品牌图（client/src/assets/images/tunee-share.webp 转 JPG，1200×630）。
// 原 /assets/features/cover.jpg 实际只有 800×512，却声明成 1200×630。
// 走 publicAssetUrl：/assets 由主站之外的网关转发、规则不可见，public 资源按本仓库惯例取部署地址
export const FEATURES_SOCIAL_IMAGE = publicAssetUrl("/og/tunee-share.jpg");

export function normalizeMetaDescription(value: string, maxLength = 155): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;

  const targetLength = maxLength - 1;
  const candidate = compact.slice(0, targetLength + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const trimmed = candidate
    .slice(0, lastSpace > 100 ? lastSpace : targetLength)
    .replace(/[\s,;:—-]+$/g, "");

  return `${trimmed}…`;
}

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

export function buildPageMetadata(
  path: string,
  seo: PageSeo,
  canonicalPath = path,
): Metadata {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const description =
    typeof seo.description === "string"
      ? normalizeMetaDescription(seo.description)
      : seo.description;
  const openGraphDescription =
    typeof seo.openGraph === "object" &&
    seo.openGraph !== null &&
    "description" in seo.openGraph &&
    typeof seo.openGraph.description === "string"
      ? normalizeMetaDescription(seo.openGraph.description)
      : description;
  const openGraphUrl =
    typeof seo.openGraph === "object" && seo.openGraph !== null && "url" in seo.openGraph
      ? seo.openGraph.url
      : canonical;

  return {
    title: seo.title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "Tunee",
      ...seo.openGraph,
      description: openGraphDescription,
      url: openGraphUrl ?? canonical,
      images: [
        {
          url: FEATURES_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "Tunee AI Features",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [FEATURES_SOCIAL_IMAGE],
    },
  };
}
