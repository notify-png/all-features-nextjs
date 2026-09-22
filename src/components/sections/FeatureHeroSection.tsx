"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import MvAgentPromptMock from "@/components/sections/mv-generator/MvAgentPromptMock";

import lipSyncImage from "@/assets/mv-features/lip-sync.webp";
import visionFilmImage from "@/assets/mv-features/vision-film.webp";
import characterDesignImage from "@/assets/mv-features/character-design.webp";
import lyricStoryImage from "@/assets/mv-features/lyric-story.webp";
import mvCloneImage from "@/assets/mv-features/mv-clone.webp";
import animePvImage from "@/assets/mv-features/anime-pv.webp";
import toonImage from "@/assets/mv-features/3d-toon.webp";
import motionControlImage from "@/assets/mv-features/motion-control.webp";

type HeroFeature = {
  image: StaticImageData;
  labelKey:
    | "mvFeatureLipSync"
    | "mvFeatureVisionFilm"
    | "mvFeatureCharacterDesign"
    | "mvFeatureLyricStory"
    | "mvFeatureClone"
    | "mvFeatureAnimePv"
    | "mvFeature3dToon"
    | "mvFeatureMotionControl";
  isNew?: boolean;
};

const heroFeatures: HeroFeature[] = [
  { image: lipSyncImage, labelKey: "mvFeatureLipSync" },
  { image: visionFilmImage, labelKey: "mvFeatureVisionFilm" },
  { image: characterDesignImage, labelKey: "mvFeatureCharacterDesign", isNew: true },
  { image: lyricStoryImage, labelKey: "mvFeatureLyricStory" },
  { image: mvCloneImage, labelKey: "mvFeatureClone", isNew: true },
  { image: animePvImage, labelKey: "mvFeatureAnimePv" },
  { image: toonImage, labelKey: "mvFeature3dToon", isNew: true },
  { image: motionControlImage, labelKey: "mvFeatureMotionControl" },
];

const FeatureHeroSection = () => {
  const locale = useLocale();
  const tHero = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  const tMvg = useTranslations("MVG");
  const titleLine1 = tHero("mvgLine1");
  const titleLine2 = tHero("mvgLine2");
  const longestTitleLine = Math.max(
    Array.from(titleLine1).length,
    Array.from(titleLine2).length,
  );
  const titleLengthClass =
    longestTitleLine >= 29
      ? "music-video-hero-title--long"
      : longestTitleLine >= 25
        ? "music-video-hero-title--medium"
        : "";
  const [isPaused, setIsPaused] = useState(false);
  const [isInlineCtaVisible, setIsInlineCtaVisible] = useState(false);
  const [isStickyCtaStopVisible, setIsStickyCtaStopVisible] = useState(false);
  const [hasObservedInlineCtas, setHasObservedInlineCtas] = useState(false);

  useEffect(() => {
    const inlineCtas = Array.from(
      document.querySelectorAll<HTMLElement>("[data-inline-cta]"),
    );
    if (!inlineCtas.length) {
      setHasObservedInlineCtas(true);
      return;
    }

    const visibleInlineCtas = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleInlineCtas.add(entry.target);
          } else {
            visibleInlineCtas.delete(entry.target);
          }
        });
        setIsInlineCtaVisible(visibleInlineCtas.size > 0);
        setHasObservedInlineCtas(true);
      },
      { threshold: 0.35 },
    );

    const stickyCtaStop = document.querySelector<HTMLElement>(
      "[data-sticky-cta-stop]",
    );
    const stopObserver = stickyCtaStop
      ? new IntersectionObserver(
          ([entry]) => setIsStickyCtaStopVisible(entry.isIntersecting),
          { threshold: 0 },
        )
      : null;

    inlineCtas.forEach((cta) => observer.observe(cta));
    if (stickyCtaStop && stopObserver) stopObserver.observe(stickyCtaStop);

    return () => {
      observer.disconnect();
      stopObserver?.disconnect();
    };
  }, []);

  const shouldHideStickyCta =
    !hasObservedInlineCtas || isInlineCtaVisible || isStickyCtaStopVisible;

  const renderFeatureCard = (feature: HeroFeature, keyPrefix: string) => {
    const label = tMvg(feature.labelKey);
    return (
      <div
        key={`${keyPrefix}-${feature.labelKey}`}
        className="group relative aspect-[2/1] w-[220px] flex-shrink-0 overflow-hidden rounded-2xl bg-muted md:w-[270px]"
      >
        <Image
          src={feature.image}
          alt={label}
          width={feature.image.width}
          height={feature.image.height}
          unoptimized
          sizes="(min-width: 768px) 270px, 220px"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 font-display text-lg font-bold uppercase tracking-wide text-white drop-shadow-md md:bottom-4 md:left-5 md:text-2xl">
          {label}
        </span>
        {feature.isNew && (
          <span className="absolute right-3 top-3 rounded-md bg-primary/85 px-2 py-0.5 font-poppins text-[10px] font-medium text-white/90 backdrop-blur-sm">
            {tMvg("mvFeatureNew")}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-white">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 95% 65% at 50% 30%, rgba(146, 114, 255, 0.20) 0%, rgba(146, 114, 255, 0.07) 35%, transparent 60%),
              radial-gradient(ellipse 85% 60% at 55% 25%, rgba(114, 177, 255, 0.20) 0%, rgba(114, 177, 255, 0.05) 40%, transparent 60%),
              radial-gradient(ellipse 65% 50% at 48% 32%, rgba(146, 114, 255, 0.18) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 section-container pb-2 pt-24 md:pt-24 lg:pt-28">
        <div className="text-center max-w-6xl mx-auto">
          {/* Title */}
          <h1
            className={`hero-title music-video-hero-title ${titleLengthClass} music-video-hero-title--${locale} text-foreground mb-5`}
          >
            <span className="block whitespace-nowrap">{titleLine1}</span>
            <span className="gradient-text block whitespace-nowrap">
              {titleLine2}
            </span>
          </h1>

        </div>
      </div>

      {/* Interactive agent prompt mock */}
      <div className="relative z-30 mb-4">
        <MvAgentPromptMock />
      </div>

      {/* Supporting copy stays visible but yields the visual focus to the prompt. */}
      <p className="body-text relative z-10 mx-auto mb-7 max-w-2xl px-6 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        {tHero("mvgSubtitle")}
      </p>

      {/* Scrolling Demo Gallery */}
      <div className="relative z-10 mb-3">
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div
            className="flex gap-3 md:gap-5"
            style={{
              width: "max-content",
              animation: "scroll-left-demo 35s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {heroFeatures.map((feature) => renderFeatureCard(feature, "first"))}
            {heroFeatures.map((feature) => renderFeatureCard(feature, "second"))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 section-container py-3">
        <div className="text-center">
          <div
            data-inline-cta
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="h-16 px-16 text-xl font-poppins font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-2xl"
                asChild
              >
                <a href="https://www.tunee.ai/sign-up">{tCommon("generateNow")}</a>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>

      {!shouldHideStickyCta && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pointer-events-none"
        >
          <Button
            size="lg"
            className="pointer-events-auto w-[calc(100%-7rem)] max-w-sm rounded-full px-8 gap-2 font-poppins font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl md:w-auto"
            asChild
          >
            <a href="https://www.tunee.ai/sign-up">{tCommon("generateNow")}</a>
          </Button>
        </motion.div>
      )}

      <style>{`
        @keyframes scroll-left-demo {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default FeatureHeroSection;
