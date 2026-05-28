"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import tuneeLogo from "@/assets/tunee-logo.png";
import { imgSrc } from "@/lib/utils";
import { DEFAULT_LOCALE } from "@/i18n/routing";

const localizePath = (href: string, locale: string) =>
  locale === DEFAULT_LOCALE || !href.startsWith("/")
    ? href
    : `/${locale}${href === "/" ? "" : href}`;

const techLabels = [
  "Voice Synthesis",
  "Neural Audio",
  "Real-time Generation",
  "Multi-language Support",
  "Emotion AI",
];

const AiSingerHeroSection = () => {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const tNav = useTranslations("Nav");
  const tBc = useTranslations("Breadcrumb");
  const tCommon = useTranslations("Common");

  return (
    <section className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={localizePath("/", locale)} className="flex items-center gap-2">
              <img
                src={imgSrc(tuneeLogo)}
                alt="Tunee"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-foreground font-poppins font-semibold text-lg">
                Tunee
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="https://www.tunee.ai/about"
                className="text-muted-foreground hover:text-foreground transition-colors font-poppins text-sm"
              >
                {tNav("aboutUs")}
              </a>
              <a
                href="https://www.tunee.ai/stories"
                className="text-muted-foreground hover:text-foreground transition-colors font-poppins text-sm"
              >
                {tNav("customerStories")}
              </a>
              <Link
                href={localizePath("/features", locale)}
                className="text-muted-foreground hover:text-foreground transition-colors font-poppins text-sm"
              >
                {tNav("features")}
              </Link>
              <a
                href="https://www.tunee.ai/forum"
                className="text-muted-foreground hover:text-foreground transition-colors font-poppins text-sm"
              >
                Tunee Forum
              </a>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.tunee.ai/login"
                className="text-muted-foreground hover:text-foreground transition-colors font-poppins text-sm"
              >
                Log in
              </a>
              <a href="https://www.tunee.ai/signup">
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 font-poppins font-medium">
                  Sign up
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="section-container pt-20 pb-4">
        <nav className="flex items-center gap-2 text-sm font-poppins">
          <a
            href="https://www.tunee.ai"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {tBc("home")}
          </a>
          <span className="text-muted-foreground">&gt;</span>
          <Link
            href={localizePath("/features", locale)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {tNav("features")}
          </Link>
          <span className="text-muted-foreground">&gt;</span>
          <span className="text-foreground">{tCommon("aiSinger")}</span>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="section-container py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-title text-foreground mb-8"
          >
            {t("aiSingerHeadingPart1")} <span className="italic">{t("aiSingerHeadingPart2")}</span>
            <br />
            {t("aiSingerHeadingPart3")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-text text-lg md:text-xl max-w-[700px] mx-auto mb-10 leading-relaxed"
          >
            {t("aiSingerSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a href="https://www.tunee.ai/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-6 text-base font-poppins font-medium h-auto">
                {t("aiSingerCta")}
              </Button>
            </a>
          </motion.div>

          {/* Powered by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-muted-foreground text-sm font-poppins mb-4">
              {tCommon("poweredBy")}
            </p>
            <div className="relative overflow-hidden mx-auto max-w-3xl">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

              <div
                className="flex animate-scroll-left-slow"
                style={{ width: "max-content" }}
              >
                {[...techLabels, ...techLabels, ...techLabels].map(
                  (label, index) => (
                    <div
                      key={`${label}-${index}`}
                      className="flex items-center gap-4 px-4"
                    >
                      <span className="text-muted-foreground font-poppins text-sm whitespace-nowrap">
                        {label}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiSingerHeroSection;
