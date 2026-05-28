"use client";

import { motion } from "framer-motion";
import { Film, Gamepad2, Megaphone, Tv } from "lucide-react";
import { useTranslations } from "next-intl";

const MotionControlUseCasesSection = () => {
  const t = useTranslations("MotionControl");
  const useCases = [
    { icon: Film, title: t("use1Title"), description: t("use1Desc") },
    { icon: Tv, title: t("use2Title"), description: t("use2Desc") },
    { icon: Gamepad2, title: t("use3Title"), description: t("use3Desc") },
    { icon: Megaphone, title: t("use4Title"), description: t("use4Desc") },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {t("useTitlePrefix")}{" "}
            <span className="font-serif italic">{t("useTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("useSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="mb-5">
                <motion.div
                  className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <useCase.icon className="w-7 h-7 text-foreground" />
                </motion.div>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 tracking-tight">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotionControlUseCasesSection;
