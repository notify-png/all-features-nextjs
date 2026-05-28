import { defineRouting } from "next-intl/routing";

export const LOCALES = [
  "en",
  "ja",
  "es",
  "pt",
  "fr",
  "de",
  "it",
  "ko",
  "ru",
  "zh-CN",
  "zh-HK",
] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const routing = defineRouting({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export const isAppLocale = (value: string): value is AppLocale =>
  (LOCALES as readonly string[]).includes(value);
