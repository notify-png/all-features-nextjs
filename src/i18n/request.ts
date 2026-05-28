import { getRequestConfig } from "next-intl/server";
import { routing, DEFAULT_LOCALE } from "@/i18n/routing";

// Deep merge: english messages serve as fallback so any locale missing a key
// renders the english source string instead of throwing or showing the raw key.
type MessageNode = string | { [key: string]: MessageNode };

function deepMerge<T extends Record<string, MessageNode>>(base: T, override: T): T {
  const merged: Record<string, MessageNode> = { ...base };
  for (const key of Object.keys(override)) {
    const a = base?.[key];
    const b = override[key];
    if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
      merged[key] = deepMerge(
        a as Record<string, MessageNode>,
        b as Record<string, MessageNode>,
      );
    } else {
      merged[key] = b;
    }
  }
  return merged as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : DEFAULT_LOCALE;

  const enMessages = (await import(`@/messages/en.json`)).default;
  const localeMessages =
    locale === DEFAULT_LOCALE
      ? enMessages
      : (await import(`@/messages/${locale}.json`)).default;

  // Merge en as base, then overlay the requested locale's translations.
  const messages = deepMerge(enMessages, localeMessages);

  return {
    locale,
    messages,
    // Don't throw on missing keys — they'll fall back via deepMerge to english.
    onError: () => {},
    getMessageFallback: ({ key }) => key,
  };
});
