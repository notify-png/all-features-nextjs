"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import type { SupportedLocale } from "@/lib/i18n/locales";
import { I18N_DICTIONARY } from "@/lib/i18n/dictionary";

type I18nContextValue = {
  locale: SupportedLocale;
  t: (source: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: (source) => source,
});

const normalizeText = (value: string) =>
  value
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export const I18nProvider = ({
  locale,
  children,
}: {
  locale: SupportedLocale;
  children: ReactNode;
}) => {
  const t = useCallback(
    (source: string) => {
      if (locale === "en") return source;
      const dict = I18N_DICTIONARY[locale];
      return dict?.[source] ?? dict?.[normalizeText(source)] ?? source;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
