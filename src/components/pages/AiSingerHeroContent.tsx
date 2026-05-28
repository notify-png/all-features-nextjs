"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const AiSingerHeroContent = () => {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  const tSinger = useTranslations("AiSinger");
  const AI_SINGER_TECH_LABELS = [
    tSinger("tech1"),
    tSinger("tech2"),
    tSinger("tech3"),
    tSinger("tech4"),
    tSinger("tech5"),
  ];
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <div className="section-container py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-foreground mb-8">
            {t("aiSingerHeadingPart1")}{" "}
            <span className="italic">{t("aiSingerHeadingPart2")}</span>{" "}
            {t("aiSingerHeadingPart3")}
          </h1>

          <p className="body-text text-lg md:text-xl max-w-[700px] mx-auto mb-10 leading-relaxed">
            {t("aiSingerSubtitle")}
          </p>

          <div className="mb-16">
            <a href="https://www.tunee.ai/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-6 text-base font-poppins font-medium h-auto">
                {t("aiSingerCta")}
              </Button>
            </a>
          </div>

          {/* Powered by ticker */}
          <div>
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
                {[
                  ...AI_SINGER_TECH_LABELS,
                  ...AI_SINGER_TECH_LABELS,
                  ...AI_SINGER_TECH_LABELS,
                ].map((label, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="flex items-center gap-4 px-4"
                  >
                    <span className="text-muted-foreground font-poppins text-sm whitespace-nowrap">
                      {label}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiSingerHeroContent;
