"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LipSyncHowItWorksSection = () => {
  const t = useTranslations("LipSync");
  const steps = [
    { number: "01", title: t("howStep1Title"), description: t("howStep1Desc") },
    { number: "02", title: t("howStep2Title"), description: t("howStep2Desc") },
    { number: "03", title: t("howStep3Title"), description: t("howStep3Desc") },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {t("howTitlePrefix")}{" "}
            <span className="font-serif italic">{t("howTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("howSubtitle")}</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-border" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <div className="relative z-10 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-12 h-12 rounded-full bg-foreground text-primary-foreground flex items-center justify-center font-mono font-semibold text-sm shadow-lg cursor-pointer"
                  >
                    {step.number}
                  </motion.div>
                </div>

                <h3 className="text-xl font-display font-semibold mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="rounded-full px-8 gap-2 group bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="https://www.tunee.ai" target="_blank">
                {t("howCta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LipSyncHowItWorksSection;
