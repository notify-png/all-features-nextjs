import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, LOCALES } from "@/i18n/routing";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  redirect({ href: "/features", locale });
}
