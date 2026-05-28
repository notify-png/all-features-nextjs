import type { Metadata } from "next";
import { Poppins, Barlow_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "@/index.css";
import Providers from "../providers";
import { routing, LOCALES } from "@/i18n/routing";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tunee AI Features | Music & Video Creation",
    template: "%s | Tunee",
  },
  description:
    "Tunee is a next-generation AI creative agent. Create original music, music videos, lip-sync, AI dancing, and more — all from a single platform.",
  metadataBase: new URL("https://www.tunee.ai"),
  openGraph: {
    type: "website",
    siteName: "Tunee",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tunee_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  ja: "ja_JP",
  es: "es_ES",
  pt: "pt_BR",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  ko: "ko_KR",
  ru: "ru_RU",
  "zh-CN": "zh_CN",
  "zh-HK": "zh_HK",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
