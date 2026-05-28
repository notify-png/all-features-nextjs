"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Move, Layers, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const aiModels = [
  "MotionGen Pro",
  "Kling Motion",
  "Seedance 2.0",
  "DynamicAI",
  "FlowMaster",
  "KineticVision",
];

const MotionControlHeroSection = () => {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  const showcaseItems = [
    {
      icon: Move,
      title: t("motionControlShowcase1Title"),
      description: t("motionControlShowcase1Desc"),
    },
    {
      icon: Layers,
      title: t("motionControlShowcase2Title"),
      description: t("motionControlShowcase2Desc"),
    },
    {
      icon: Wand2,
      title: t("motionControlShowcase3Title"),
      description: t("motionControlShowcase3Desc"),
    },
  ];
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
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="hero-title text-foreground mb-6"
          >
            {t("motionControlLine1")}
            <br />
            <span className="gradient-text">{t("motionControlLine2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="body-text text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t("motionControlSubtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
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
                  {t("motionControlCta")}
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
              <span className="text-muted-foreground text-sm font-light">
                {tCommon("poweredBy")}
              </span>
            </div>
            <div className="relative overflow-hidden mx-auto max-w-3xl">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

              {/* Scrolling models */}
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

      {/* Showcase Cards */}
      <div className="relative z-10 pb-20">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title text-center mb-12"
          >
            {t("motionControlShowcaseTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-xl hover:border-foreground/20 transition-all duration-500"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <item.icon className="w-8 h-8 text-foreground" />
                </motion.div>
                <h3 className="card-title text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="body-text text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotionControlHeroSection;
