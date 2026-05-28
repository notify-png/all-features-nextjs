"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import tuneePortraitImg from "@/assets/lip-sync/tunee-portrait.png";
import _tuneeDemo from "@/assets/lip-sync/tunee-demo.mp4";
const tuneePortrait = tuneePortraitImg.src;
const tuneeDemo = _tuneeDemo as unknown as string;

const aiModels = [
  "TemPolor v4",
  "Kling",
  "Seedance",
  "Dreamina",
  "InfiniteTalk",
  "Avatar 2.0",
];

const LipSyncHeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background - purple/blue gradient bloom */}
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
      <div className="relative z-10">
        <Breadcrumb />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 section-container pb-24 md:pb-28 lg:pb-32 pt-8">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-title text-foreground mb-6"
          >
            {t("lipSyncLine1")}
            <br />
            <span className="gradient-text">
              {t("lipSyncLine2")}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="body-text text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t("lipSyncSubtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="lg" 
                className="h-20 px-16 text-2xl font-display rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-2xl"
                asChild
              >
                <a href="https://www.tunee.ai" target="_blank" rel="noopener noreferrer">{t("lipSyncCta")}</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Model Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative overflow-hidden py-4"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-muted-foreground text-sm font-light">{tCommon("poweredBy")}</span>
            </div>
            <div className="relative overflow-hidden mx-auto max-w-3xl">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-transparent z-10" />
              
              {/* Scrolling models */}
              <div className="flex animate-scroll-left-slow" style={{ width: 'max-content' }}>
                {[...aiModels, ...aiModels, ...aiModels].map((model, index) => (
                  <div
                    key={`${model}-${index}`}
                    className="flex items-center gap-3 px-5"
                  >
                    <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">{model}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Before & After Showcase */}
      <div className="relative z-10 pb-20">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title text-center mb-12"
          >
            {t("lipSyncShowcaseTitle")}
          </motion.h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* AFTER - Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10 bg-card relative group cursor-pointer ring-1 ring-primary/20"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                    setIsMuted(videoRef.current.muted);
                  }
                }}
              >
                <video
                  ref={videoRef}
                  src={tuneeDemo}
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                {/* Mute indicator on hover */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[3]">
                  {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </div>
              </div>
            </motion.div>

            {/* BEFORE - Portrait sticky note overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              whileHover={{ scale: 1.08, rotate: -2, y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -top-8 -left-6 md:-top-10 md:-left-10 z-20 cursor-pointer"
            >
              <div className="relative">
                <div className="text-[10px] font-mono text-muted-foreground mb-1 tracking-widest uppercase text-center">Before</div>
                <div className="relative w-28 h-32 md:w-36 md:h-40 rounded-xl overflow-hidden border-2 border-white shadow-xl bg-white flex items-center justify-center">
                  {/* Top edge shadow like paper curl */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/8 to-transparent z-10 rounded-t-xl" />
                  <img src={tuneePortrait} alt="Before - static portrait" className="w-full h-full object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LipSyncHeroSection;