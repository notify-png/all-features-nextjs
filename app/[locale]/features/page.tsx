import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import FeaturesPageContent from "@/components/pages/FeaturesPageContent";
import { routing, LOCALES } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return buildPageMetadata("/features", {
    title: t("Meta.featuresIndexTitle"),
    description: t("Meta.featuresIndexDescription"),
    openGraph: {
      title: t("Meta.featuresIndexTitle"),
      description: t("Meta.featuresIndexDescription"),
      url: "https://www.tunee.ai/features",
    },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tunee AI Features",
  description:
    "All-in-one AI platform for music and virtual artist video creation.",
  url: "https://www.tunee.ai/features",
  publisher: {
    "@type": "Organization",
    name: "Tunee",
    url: "https://www.tunee.ai",
  },
};

export default async function LocalizedFeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturesPageContent />
    </>
  );
}
