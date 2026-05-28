"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

const aiModels = [
  "Seedance 1.5 Pro",
  "Kling Dance",
  "Motion Master AI",
  "Dance Sync Pro",
  "Rhythm Vision",
  "MotionGen 2.0",
  "ChoreographAI",
];

const AiDancingHeroSection = () => {
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
      <div className="relative z-10 section-container py-24 md:py-28 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-title text-foreground mb-6"
          >
            {t("aiDancingLine1")}
            <br />
            <span className="gradient-text">
              {t("aiDancingLine2")}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="body-text text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t("aiDancingSubtitle")}
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
                className="h-14 px-10 text-base font-display rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-2xl"
                asChild
              >
                <Link href="https://www.tunee.ai" target="_blank">
                  {t("aiDancingCta")}
                </Link>
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
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
              
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

    </section>
  );
};

export default AiDancingHeroSection;