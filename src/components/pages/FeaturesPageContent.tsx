"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Headphones,
  Waves,
  Layers,
  Settings2,
  MicVocal,
  Mic2,
  Video,
  Sparkles,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_MODELS } from "@/lib/data/features-data";
import { DEFAULT_LOCALE } from "@/i18n/routing";

const localizePath = (href: string, locale: string) =>
  locale === DEFAULT_LOCALE || !href.startsWith("/")
    ? href
    : `/${locale}${href === "/" ? "" : href}`;

type FeatureItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  description?: string;
};

const cardColors = [
  "from-[#0d1b2a] to-[#1b2838]",
  "from-[#1b2838] to-[#2a3f54]",
  "from-[#162447] to-[#1f4068]",
  "from-[#1a1a2e] to-[#16213e]",
  "from-[#2c2c54] to-[#474787]",
  "from-[#1e1e3f] to-[#2d2d5e]",
  "from-[#0f3460] to-[#1a1a2e]",
  "from-[#3c1642] to-[#1a1a2e]",
  "from-[#1a1a2e] to-[#0f3460]",
  "from-[#16213e] to-[#2c2c54]",
];

const CarouselCard = ({
  feature,
  color,
  isActive,
  learnMoreLabel,
}: {
  feature: FeatureItem;
  color: string;
  isActive: boolean;
  learnMoreLabel: string;
}) => {
  const Icon = feature.icon;
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${color} ${
        isActive
          ? "shadow-[0_8px_40px_rgba(77,70,254,0.25)]"
          : "shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
      }`}
      style={{ aspectRatio: "3 / 4" }}
    >
      <div className="absolute top-0 right-0 w-2/3 h-2/3 opacity-[0.06]">
        <Icon className="w-full h-full text-white" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-white/70" />
          <h3 className="font-barlow font-bold text-white text-lg leading-tight">
            {feature.name}
          </h3>
        </div>
        <p className="font-poppins text-white/50 text-xs leading-relaxed line-clamp-2">
          {feature.description}
        </p>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-1 text-white/70 text-xs font-poppins"
          >
            {learnMoreLabel} <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const FeatureCarousel = () => {
  const t = useTranslations("FeaturesIndex");
  const locale = useLocale();
  const allFeatures: FeatureItem[] = [
    { name: t("feature1Name"), href: "https://www.tunee.ai", icon: Headphones, description: t("feature1Desc") },
    { name: t("feature2Name"), href: "https://www.tunee.ai", icon: Waves, description: t("feature2Desc") },
    { name: t("feature3Name"), href: "https://www.tunee.ai", icon: Layers, description: t("feature3Desc") },
    { name: t("feature4Name"), href: "https://www.tunee.ai", icon: Settings2, description: t("feature4Desc") },
    { name: t("feature5Name"), href: "https://www.tunee.ai", icon: MicVocal, description: t("feature5Desc") },
    { name: t("feature6Name"), href: "https://www.tunee.ai", icon: Mic2, description: t("feature6Desc") },
    { name: t("feature7Name"), href: "/features/music-video-generator", icon: Video, description: t("feature7Desc") },
    { name: t("feature8Name"), href: "/features/lip-sync", icon: Mic2, description: t("feature8Desc") },
    { name: t("feature9Name"), href: "/features/ai-dancing", icon: Sparkles, description: t("feature9Desc") },
    { name: t("feature10Name"), href: "/features/motion-control", icon: Camera, description: t("feature10Desc") },
  ];

  const [activeIndex, setActiveIndex] = useState(Math.floor(allFeatures.length / 2));
  const learnMoreLabel = t("learnMore");

  const goLeft = () =>
    setActiveIndex((prev) => (prev - 1 + allFeatures.length) % allFeatures.length);
  const goRight = () =>
    setActiveIndex((prev) => (prev + 1) % allFeatures.length);

  const getCardStyle = (index: number) => {
    const total = allFeatures.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const isVisible = absDiff <= 3;

    if (!isVisible) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 100}px) scale(0.6)`,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    const scale = 1 - absDiff * 0.1;
    const translateX = diff * 220;
    const translateZ = -absDiff * 80;
    const opacity = 1 - absDiff * 0.2;
    const zIndex = 10 - absDiff;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents: "auto" as const,
    };
  };

  return (
    <div className="relative">
      <div
        className="relative flex items-center justify-center"
        style={{ height: "380px", perspective: "1200px" }}
      >
        {allFeatures.map((feature, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;
          const isExternal = feature.href.startsWith("http");

          return (
            <motion.div
              key={feature.name}
              className="absolute cursor-pointer"
              style={{ width: "280px", ...style }}
              animate={{
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (index !== activeIndex) {
                  setActiveIndex(index);
                }
              }}
            >
              {isActive && isExternal ? (
                <a href={feature.href} target="_blank" rel="noopener noreferrer" className="block">
                  <CarouselCard feature={feature} color={cardColors[index % cardColors.length]} isActive={isActive} learnMoreLabel={learnMoreLabel} />
                </a>
              ) : isActive && !isExternal ? (
                <Link href={localizePath(feature.href, locale)} className="block">
                  <CarouselCard feature={feature} color={cardColors[index % cardColors.length]} isActive={isActive} learnMoreLabel={learnMoreLabel} />
                </Link>
              ) : (
                <CarouselCard feature={feature} color={cardColors[index % cardColors.length]} isActive={isActive} learnMoreLabel={learnMoreLabel} />
              )}
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={goLeft}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      >
        <ArrowRight className="w-5 h-5 text-foreground rotate-180" />
      </button>
      <button
        onClick={goRight}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      >
        <ArrowRight className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-6">
        {allFeatures.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-primary w-6"
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturedModelsCarousel = () => {
  const t = useTranslations("FeaturesIndex");
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(ALL_MODELS.length / 2)
  );

  const goLeft = () =>
    setActiveIndex(
      (prev) => (prev - 1 + ALL_MODELS.length) % ALL_MODELS.length
    );
  const goRight = () =>
    setActiveIndex((prev) => (prev + 1) % ALL_MODELS.length);

  const getCardStyle = (index: number) => {
    const total = ALL_MODELS.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    if (absDiff > 3) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 100}px) scale(0.6)`,
        zIndex: 0,
      };
    }

    const scale = 1 - absDiff * 0.1;
    const translateX = diff * 200;
    const translateZ = -absDiff * 80;
    const opacity = 1 - absDiff * 0.2;
    const zIndex = 10 - absDiff;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="relative z-10 w-full mt-16">
      <h3 className="text-sm font-poppins font-medium text-foreground/50 uppercase tracking-wider mb-6 text-center">
        {t("featuredModels")}
      </h3>

      <div className="relative">
        <div
          className="relative flex items-center justify-center"
          style={{ height: "340px", perspective: "1200px" }}
        >
          {ALL_MODELS.map((model, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={model.name}
                className="absolute cursor-pointer"
                style={{ width: "240px" }}
                animate={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`relative w-full rounded-2xl overflow-hidden ${
                    isActive
                      ? "shadow-[0_8px_40px_rgba(77,70,254,0.25)]"
                      : "shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  }`}
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <img
                    src={model.img}
                    alt={model.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-poppins font-medium text-white/80 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {model.type}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-barlow font-semibold text-base">
                      {model.name}
                    </h4>
                    <p className="text-white/70 text-xs font-poppins mt-1 leading-snug">
                      {model.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={goLeft}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-foreground rotate-180" />
        </button>
        <button
          onClick={goRight}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          {ALL_MODELS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary w-6"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FeaturesPageContent() {
  const t = useTranslations("FeaturesIndex");
  const faqs = [
    { value: "item-1", question: t("faq1Q"), answer: t("faq1A") },
    { value: "item-2", question: t("faq2Q"), answer: t("faq2A") },
    { value: "item-3", question: t("faq3Q"), answer: t("faq3A") },
    { value: "item-4", question: t("faq4Q"), answer: t("faq4A") },
    { value: "item-5", question: t("faq5Q"), answer: t("faq5A") },
  ];
  const stats = [
    { icon: "💬", label: t("stat1Label") },
    { icon: "⚡", label: t("stat2Label") },
    { icon: "✨", label: t("stat3Label") },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main>
        {/* Hero Section */}
        <div
          className="relative flex flex-col items-center overflow-hidden bg-white"
          style={{ paddingTop: "120px", paddingBottom: "60px" }}
        >
          <div className="text-center relative z-10 px-6 flex flex-col items-center">
            <h1
              className="font-barlow font-bold tracking-tight mb-4"
              style={{ color: "#191919", fontSize: "64px", lineHeight: "1.1" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl font-poppins text-muted-foreground mb-8">
              {t("heroSubtitle")}
            </p>
            <Button
              className="rounded-full px-10 py-6 text-lg font-barlow font-semibold"
              style={{
                background: "linear-gradient(135deg, #4D46FE, #9272FF)",
                color: "#fff",
              }}
            >
              {t("heroCta")}
            </Button>
          </div>

          <FeaturedModelsCarousel />
        </div>

        <div className="section-padding">
          <div className="section-container">
            {/* All Features Carousel */}
            <motion.section
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <div className="mb-12 text-center">
                <h3 className="text-sm font-poppins font-medium text-foreground/50 uppercase tracking-wider">
                  {t("allFeatures")}
                </h3>
              </div>
              <FeatureCarousel />
            </motion.section>

            {/* Stats Section */}
            <section className="mb-24 py-16">
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl lg:text-4xl font-barlow font-bold text-foreground leading-snug">
                  <span className="text-primary">{t("statsCount")}</span> {t("statsText")}
                </p>

                <div className="flex items-center justify-center gap-8 md:gap-12 mt-10">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-muted-foreground font-poppins text-sm md:text-base"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-barlow font-bold text-foreground">
                  {t("faqTitlePrefix")}{" "}
                  <span className="text-primary">{t("faqTitleAccent")}</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {faqs.map((item) => (
                    <AccordionItem
                      key={item.value}
                      value={item.value}
                      className="border border-border rounded-2xl px-6 data-[state=open]:bg-secondary/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left py-5 text-[20px] font-barlow font-semibold hover:no-underline text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed font-poppins">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
