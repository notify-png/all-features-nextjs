import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/i18n/locales";

const localeSet = new Set<string>(SUPPORTED_LOCALES);

export const getLocaleFromPathname = (pathname: string): SupportedLocale | null => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const first = decodeURIComponent(segments[0]);
  return localeSet.has(first) ? (first as SupportedLocale) : null;
};

export const localizePath = (href: string, locale: SupportedLocale | null) => {
  if (!locale) return href;
  if (!href.startsWith("/")) return href;
  const segments = href.split("/").filter(Boolean);
  if (segments.length > 0 && localeSet.has(decodeURIComponent(segments[0]))) {
    return href;
  }
  return `/${locale}${href === "/" ? "" : href}`;
};
