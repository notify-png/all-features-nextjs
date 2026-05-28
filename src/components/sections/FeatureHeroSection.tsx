"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Volume2, VolumeX, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DEFAULT_LOCALE } from "@/i18n/routing";

const aiModels = [
  "Nano Banana Pro",
  "Seedream 4.5",
  "InfiniteTalk",
  "Kling Avatar 2.0",
  "Kling O1",
  "Kling 2.6",
  "Seedance 1.5 Pro",
];

import demoAnimeMv from "@/assets/demo-anime-mv.mp4";
import demoTheWeekend from "@/assets/demo-the-weekend.mp4";
import demoScifiMv from "@/assets/demo-scifi-mv.mp4";
import demoGirlGroup from "@/assets/demo-girl-group.mp4";
import demoBlankSpace2 from "@/assets/demo-blank-space-2.mp4";

import coverGirlGroupImg from "@/assets/covers/girl-group.jpg";
import coverTheWeekendImg from "@/assets/covers/the-weekend.jpg";
import coverScifiImg from "@/assets/covers/scifi.jpg";
import coverAnimeImg from "@/assets/covers/anime.jpg";
import coverBlankSpaceImg from "@/assets/covers/blank-space.jpg";

const demoVideos = [
  {
    id: 1,
    src: demoGirlGroup as unknown as string,
    poster: coverGirlGroupImg.src,
  },
  {
    id: 2,
    src: demoTheWeekend as unknown as string,
    poster: coverTheWeekendImg.src,
  },
  { id: 3, src: demoScifiMv as unknown as string, poster: coverScifiImg.src },
  { id: 4, src: demoAnimeMv as unknown as string, poster: coverAnimeImg.src },
  {
    id: 5,
    src: demoBlankSpace2 as unknown as string,
    poster: coverBlankSpaceImg.src,
  },
];

const localizePath = (href: string, locale: string) =>
  locale === DEFAULT_LOCALE || !href.startsWith("/")
    ? href
    : `/${locale}${href === "/" ? "" : href}`;

const FeatureHeroSection = () => {
  const locale = useLocale();
  const tHero = useTranslations("Hero");
  const tNav = useTranslations("Nav");
  const tBc = useTranslations("Breadcrumb");
  const tCommon = useTranslations("Common");
  const tCommonPB = useTranslations("Common");
  const [isPaused, setIsPaused] = useState(false);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  const handleVideoLoaded = useCallback((key: string) => {
    setLoadedVideos((prev) => new Set(prev).add(key));
  }, []);

  const handleToggleMute = useCallback(
    (videoEl: HTMLVideoElement, key: string) => {
      if (unmutedId === key) {
        videoEl.muted = true;
        setUnmutedId(null);
      } else {
        document
          .querySelectorAll<HTMLVideoElement>("[data-demo-video]")
          .forEach((v) => {
            v.muted = true;
          });
        videoEl.muted = false;
        setUnmutedId(key);
      }
    },
    [unmutedId],
  );

  const handlePlay = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    const container = e.currentTarget.closest("[data-card]");
    const videoEl = container?.querySelector("video");
    if (videoEl) {
      videoEl.play();
      setPlayingVideos((prev) => new Set(prev).add(key));
    }
  }, []);

  const renderCard = (video: (typeof demoVideos)[0], keyPrefix: string) => {
    const key = `${keyPrefix}-${video.id}`;
    const isUnmuted = unmutedId === key;
    const isLoaded = loadedVideos.has(key);
    const isPlaying = playingVideos.has(key);

    return (
      <div
        key={key}
        data-card
        className="flex-shrink-0 w-[280px] md:w-[320px] aspect-video rounded-2xl overflow-hidden bg-muted group cursor-pointer relative"
        onClick={(e) => {
          if (!isPlaying) return;
          const videoEl = e.currentTarget.querySelector("video");
          if (videoEl) handleToggleMute(videoEl, key);
        }}
      >
        {/* Poster cover shown until user clicks play */}
        {(!isLoaded || !isPlaying) && (
          <div className="absolute inset-0 z-[2]">
            <img
              src={video.poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Play button */}
            {isLoaded && (
              <button
                onClick={(e) => handlePlay(e, key)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all duration-300">
                  <Play size={24} fill="white" />
                </div>
              </button>
            )}
          </div>
        )}
        <video
          data-demo-video
          src={video.src}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => handleVideoLoaded(key)}
        />
        {/* Mute indicator on hover */}
        {isPlaying && (
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]">
            {isUnmuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
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

      {/* Breadcrumb */}
      <div className="relative z-10 section-container pt-24 pb-2">
        <nav>
          <ol className="flex items-center gap-2 text-sm font-poppins">
            <li>
              <a
                href="https://www.tunee.ai"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {tBc("home")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <Link
                href={localizePath("/features", locale)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {tNav("features")}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <span className="font-medium text-foreground">
                {tCommon("musicVideoGenerator")}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 section-container pt-6 md:pt-10 lg:pt-12 pb-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="hero-title text-foreground mb-4"
          >
            {tHero("mvgLine1")}
            <br />
            <span className="gradient-text">{tHero("mvgLine2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="body-text text-lg md:text-xl max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            {tHero("mvgSubtitle")}
          </motion.p>
        </div>
      </div>

      {/* Scrolling Demo Gallery */}
      <div className="relative z-10 mb-6">
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
            className="flex gap-4 md:gap-6"
            style={{
              width: "max-content",
              animation: "scroll-left-demo 35s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {demoVideos.map((video) => renderCard(video, "first"))}
            {demoVideos.map((video) => renderCard(video, "second"))}
          </div>
        </div>
      </div>

      {/* CTA + Powered by */}
      <div className="relative z-10 section-container py-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
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
                className="h-16 px-16 text-xl font-display rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-2xl"
                asChild
              >
                <a href="https://www.tunee.ai">{tCommon("generateNow")}</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative overflow-hidden py-4"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-muted-foreground text-sm font-light">
                {tCommonPB("poweredBy")}
              </span>
            </div>
            <div className="relative overflow-hidden mx-auto max-w-3xl">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
              <div
                className="flex animate-scroll-left-slow"
                style={{ width: "max-content" }}
              >
                {[...aiModels, ...aiModels, ...aiModels].map((model, index) => (
                  <div
                    key={`${model}-${index}`}
                    className="flex items-center gap-3 px-5"
                  >
                    <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
                      {model}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
