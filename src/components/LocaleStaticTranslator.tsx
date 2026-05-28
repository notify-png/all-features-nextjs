"use client";

import { useEffect } from "react";
import type { SupportedLocale } from "@/lib/i18n/locales";
import { I18N_DICTIONARY } from "@/lib/i18n/dictionary";

const normalizeText = (value: string) =>
  value
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const LocaleStaticTranslator = ({ locale }: { locale: SupportedLocale }) => {
  useEffect(() => {
    if (locale === "en") return;

    const rawDict = I18N_DICTIONARY[locale];
    if (!rawDict) return;

    const normalizedDict = new Map<string, string>();
    Object.entries(rawDict).forEach(([key, value]) => {
      normalizedDict.set(normalizeText(key), value);
    });

    const phraseEntries = Array.from(normalizedDict.entries()).sort(
      (a, b) => b[0].length - a[0].length,
    );

    const translateText = (source: string) => {
      const normalizedSource = normalizeText(source);
      const exact = normalizedDict.get(normalizedSource);
      if (exact) return exact;

      let output = source;
      phraseEntries.forEach(([sourcePhrase, targetPhrase]) => {
        if (!sourcePhrase || sourcePhrase.length < 4) return;
        const pattern = new RegExp(escapeRegex(sourcePhrase), "g");
        output = normalizeText(output).replace(pattern, targetPhrase);
      });
      return output;
    };

    const apply = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.parentElement) return NodeFilter.FILTER_REJECT;
            const tagName = node.parentElement.tagName.toLowerCase();
            if (
              tagName === "script" ||
              tagName === "style" ||
              tagName === "noscript"
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            if (!normalizeText(node.textContent ?? "")) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        },
      );

      const textNodes: Text[] = [];
      let current: Node | null = walker.nextNode();
      while (current) {
        textNodes.push(current as Text);
        current = walker.nextNode();
      }

      textNodes.forEach((textNode) => {
        const original = textNode.textContent ?? "";
        const translated = translateText(original);
        if (translated !== original) {
          textNode.textContent = translated;
        }
      });
    };

    apply();
    const timer = window.setTimeout(apply, 500);
    const observer = new MutationObserver(() => apply());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [locale]);

  return null;
};

export default LocaleStaticTranslator;
