"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const AiSingerHowItWorksSection = () => {
  const t = useTranslations("AiSinger");
  const steps = [
    {
      number: "01",
      title: t("howStep1Title"),
      description: t("howStep1Desc"),
    },
    {
      number: "02",
      title: t("howStep2Title"),
      description: t("howStep2Desc"),
    },
    {
      number: "03",
      title: t("howStep3Title"),
      description: t("howStep3Desc"),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {t("howTitlePrefix")}{" "}
            <span className="font-serif italic">{t("howTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("howSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Number */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-12 h-12 bg-foreground text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <span className="font-mono font-semibold text-sm">
                    {step.number}
                  </span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-border" />
                )}
              </div>

              {/* Content */}
              <h3 className="card-title text-foreground mb-3">{step.title}</h3>
              <p className="body-text leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <a href="https://www.tunee.ai/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-base font-poppins font-medium h-auto gap-2 group">
                {t("howCta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiSingerHowItWorksSection;
