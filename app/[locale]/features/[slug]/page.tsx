import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing, LOCALES } from "@/i18n/routing";
import FeatureHeroSection from "@/components/sections/FeatureHeroSection";
import MvQuickJumpStrip from "@/components/sections/mv-generator/MvQuickJumpStrip";
import MvExploreSection from "@/components/sections/mv-generator/MvExploreSection";
import { getMvCategories, MV_CATEGORY_ORDER } from "@/lib/mv/categories";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import InputMethodsSection from "@/components/sections/InputMethodsSection";
import WhoUsesSection from "@/components/sections/WhoUsesSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ExportFormatsSection from "@/components/sections/ExportFormatsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import LipSyncHeroSection from "@/components/sections/lip-sync/LipSyncHeroSection";
import LipSyncWhyChooseSection from "@/components/sections/lip-sync/LipSyncWhyChooseSection";
import LipSyncHowItWorksSection from "@/components/sections/lip-sync/LipSyncHowItWorksSection";
import LipSyncUseCasesSection from "@/components/sections/lip-sync/LipSyncUseCasesSection";
import LipSyncWhoUsesSection from "@/components/sections/lip-sync/LipSyncWhoUsesSection";
import LipSyncComparisonSection from "@/components/sections/lip-sync/LipSyncComparisonSection";
import LipSyncFAQSection from "@/components/sections/lip-sync/LipSyncFAQSection";
import AiDancingHeroSection from "@/components/sections/ai-dancing/AiDancingHeroSection";
import AiDancingWhyChooseSection from "@/components/sections/ai-dancing/AiDancingWhyChooseSection";
import AiDancingHowItWorksSection from "@/components/sections/ai-dancing/AiDancingHowItWorksSection";
import AiDancingInputMethodsSection from "@/components/sections/ai-dancing/AiDancingInputMethodsSection";
import AiDancingWhoUsesSection from "@/components/sections/ai-dancing/AiDancingWhoUsesSection";
import AiDancingComparisonSection from "@/components/sections/ai-dancing/AiDancingComparisonSection";
import AiDancingExportFormatsSection from "@/components/sections/ai-dancing/AiDancingExportFormatsSection";
import AiDancingFAQSection from "@/components/sections/ai-dancing/AiDancingFAQSection";
import AiDancingCTASection from "@/components/sections/ai-dancing/AiDancingCTASection";
import MotionControlHeroSection from "@/components/sections/motion-control/MotionControlHeroSection";
import MotionControlWhyChooseSection from "@/components/sections/motion-control/MotionControlWhyChooseSection";
import MotionControlHowItWorksSection from "@/components/sections/motion-control/MotionControlHowItWorksSection";
import MotionControlUseCasesSection from "@/components/sections/motion-control/MotionControlUseCasesSection";
import MotionControlWhoUsesSection from "@/components/sections/motion-control/MotionControlWhoUsesSection";
import MotionControlComparisonSection from "@/components/sections/motion-control/MotionControlComparisonSection";
import MotionControlFAQSection from "@/components/sections/motion-control/MotionControlFAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AiSingerHeroContent from "@/components/pages/AiSingerHeroContent";
import AiSingerShowcaseSection from "@/components/sections/ai-singer/AiSingerShowcaseSection";
import AiSingerWhyChooseSection from "@/components/sections/ai-singer/AiSingerWhyChooseSection";
import AiSingerHowItWorksSection from "@/components/sections/ai-singer/AiSingerHowItWorksSection";
import AiSingerInputMethodsSection from "@/components/sections/ai-singer/AiSingerInputMethodsSection";
import AiSingerWhoUsesSection from "@/components/sections/ai-singer/AiSingerWhoUsesSection";
import AiSingerComparisonSection from "@/components/sections/ai-singer/AiSingerComparisonSection";
import AiSingerExportFormatsSection from "@/components/sections/ai-singer/AiSingerExportFormatsSection";
import AiSingerFAQSection from "@/components/sections/ai-singer/AiSingerFAQSection";
import AiSingerCTASection from "@/components/sections/ai-singer/AiSingerCTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Params = {
  locale: string;
  slug: string;
};

const SUPPORTED_SLUGS = [
  "music-video-generator",
  "lip-sync",
  "ai-dancing",
  "motion-control",
  "ai-singer",
] as const;

type Slug = (typeof SUPPORTED_SLUGS)[number];

const isSupportedSlug = (value: string): value is Slug => {
  return SUPPORTED_SLUGS.includes(value as Slug);
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const slug of SUPPORTED_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

const META_KEY_BY_SLUG: Record<Slug, { title: string; description: string }> = {
  "music-video-generator": {
    title: "Meta.musicVideoGeneratorTitle",
    description: "Meta.musicVideoGeneratorDescription",
  },
  "lip-sync": {
    title: "Meta.lipSyncTitle",
    description: "Meta.lipSyncDescription",
  },
  "ai-dancing": {
    title: "Meta.aiDancingTitle",
    description: "Meta.aiDancingDescription",
  },
  "motion-control": {
    title: "Meta.motionControlTitle",
    description: "Meta.motionControlDescription",
  },
  "ai-singer": {
    title: "Meta.aiSingerTitle",
    description: "Meta.aiSingerDescription",
  },
};

const PATH_BY_SLUG: Record<Slug, string> = {
  "music-video-generator": "/features/music-video-generator",
  "lip-sync": "/features/lip-sync",
  "ai-dancing": "/features/ai-dancing",
  "motion-control": "/features/motion-control",
  "ai-singer": "/features/ai-singer",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedSlug(slug)) return {};
  const t = await getTranslations({ locale });
  const keys = META_KEY_BY_SLUG[slug];
  return buildPageMetadata(PATH_BY_SLUG[slug], {
    title: t(keys.title),
    description: t(keys.description),
    openGraph: {
      title: t(keys.title),
      description: t(keys.description),
      url: `https://www.tunee.ai${PATH_BY_SLUG[slug]}`,
    },
  });
}

const JSON_LD_BY_SLUG: Record<Slug, Record<string, unknown>> = {
  "music-video-generator": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tunee AI Music Video Generator",
    applicationCategory: "MultimediaApplication",
    description:
      "Transform your music into stunning AI-generated music videos. Upload audio, choose a style, generate professional videos in minutes.",
    url: "https://www.tunee.ai/features/music-video-generator",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Tunee", url: "https://www.tunee.ai" },
  },
  "lip-sync": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tunee AI Lip Sync Generator",
    applicationCategory: "MultimediaApplication",
    description:
      "AI lip sync technology that transforms any portrait into a singing character with perfectly synchronized mouth movements.",
    url: "https://www.tunee.ai/features/lip-sync",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Tunee", url: "https://www.tunee.ai" },
  },
  "ai-dancing": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tunee AI Dancing Generator",
    applicationCategory: "MultimediaApplication",
    description:
      "Transform any image into a dynamic AI dancing video. Upload a photo, choose a dance style, watch your virtual artist come to life.",
    url: "https://www.tunee.ai/features/ai-dancing",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Tunee", url: "https://www.tunee.ai" },
  },
  "motion-control": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tunee AI Motion Control",
    applicationCategory: "MultimediaApplication",
    description:
      "Precise AI motion control for video generation. Direct your virtual artist's movements, expressions, and camera angles.",
    url: "https://www.tunee.ai/features/motion-control",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Tunee", url: "https://www.tunee.ai" },
  },
  "ai-singer": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tunee AI Singer Generator",
    applicationCategory: "MultimediaApplication",
    description:
      "Create your own AI singer with unique voice, style, and personality. Generate original songs, covers, and performances in minutes.",
    url: "https://www.tunee.ai/features/ai-singer",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Tunee", url: "https://www.tunee.ai" },
  },
};

const FeatureBySlug = ({ slug, locale }: { slug: Slug; locale: string }) => {
  if (slug === "music-video-generator") {
    const mvCategories = getMvCategories(locale);
    return (
      <>
        <FeatureHeroSection />
        <MvQuickJumpStrip categoryIds={MV_CATEGORY_ORDER} />
        <WhyChooseSection />
        <MvExploreSection categories={mvCategories} locale={locale} />
        <HowItWorksSection />
        <InputMethodsSection />
        <WhoUsesSection />
        <ComparisonSection />
        <ExportFormatsSection />
        <FAQSection />
        <CTASection />
      </>
    );
  }

  if (slug === "lip-sync") {
    return (
      <>
        <LipSyncHeroSection />
        <LipSyncWhyChooseSection />
        <LipSyncHowItWorksSection />
        <LipSyncUseCasesSection />
        <LipSyncWhoUsesSection />
        <LipSyncComparisonSection />
        <LipSyncFAQSection />
        <CTASection />
      </>
    );
  }

  if (slug === "ai-dancing") {
    return (
      <>
        <AiDancingHeroSection />
        <AiDancingWhyChooseSection />
        <AiDancingHowItWorksSection />
        <AiDancingInputMethodsSection />
        <AiDancingWhoUsesSection />
        <AiDancingComparisonSection />
        <AiDancingExportFormatsSection />
        <AiDancingFAQSection />
        <AiDancingCTASection />
      </>
    );
  }

  if (slug === "ai-singer") {
    return (
      <>
        <Breadcrumb />
        <AiSingerHeroContent />
        <AiSingerShowcaseSection />
        <AiSingerWhyChooseSection />
        <AiSingerHowItWorksSection />
        <AiSingerInputMethodsSection />
        <AiSingerWhoUsesSection />
        <AiSingerComparisonSection />
        <AiSingerExportFormatsSection />
        <AiSingerFAQSection />
        <AiSingerCTASection />
      </>
    );
  }

  return (
    <>
      <MotionControlHeroSection />
      <MotionControlWhyChooseSection />
      <MotionControlHowItWorksSection />
      <MotionControlUseCasesSection />
      <MotionControlWhoUsesSection />
      <MotionControlComparisonSection />
      <MotionControlFAQSection />
      <CTASection />
    </>
  );
};

export default async function LocalizedFeaturePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  if (
    !(routing.locales as readonly string[]).includes(locale) ||
    !isSupportedSlug(slug)
  ) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BY_SLUG[slug]) }}
      />
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <FeatureBySlug slug={slug} locale={locale} />
        </main>
        <Footer />
      </div>
    </>
  );
}
