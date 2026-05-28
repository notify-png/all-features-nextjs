"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const AiSingerCTASection = () => {
  const t = useTranslations("AiSinger");
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="section-title text-foreground">{t("ctaTitle")}</h2>
          <p className="body-text text-lg mb-10">{t("ctaBody")}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://www.tunee.ai/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-poppins font-medium h-auto">
                {t("ctaPrimary")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="https://www.tunee.ai/pricing">
              <Button
                variant="outline"
                className="bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full px-8 py-6 text-base font-poppins font-medium h-auto"
              >
                {t("ctaSecondary")}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiSingerCTASection;
