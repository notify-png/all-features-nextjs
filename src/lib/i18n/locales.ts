export const SUPPORTED_LOCALES = [
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

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (value: string): value is SupportedLocale => {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
};
