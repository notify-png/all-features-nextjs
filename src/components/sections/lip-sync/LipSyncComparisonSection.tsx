"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useTranslations } from "next-intl";

const LipSyncComparisonSection = () => {
  const t = useTranslations("LipSync");
  const tCommon = useTranslations("Common");

  const traditionalItems = [
    t("compareTrad1"), t("compareTrad2"), t("compareTrad3"), t("compareTrad4"), t("compareTrad5"),
  ];
  const tuneeItems = [
    t("compareAi1"), t("compareAi2"), t("compareAi3"), t("compareAi4"), t("compareAi5"),
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {t("compareTitlePrefix")}{" "}
            <span className="font-serif italic">{t("compareTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("compareSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-secondary/30 border border-border"
          >
            <h3 className="text-xl font-display font-semibold mb-6 tracking-tight">
              {t("compareTradTitle")}
            </h3>
            <ul className="space-y-4">
              {traditionalItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border-2 border-foreground shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-display font-semibold tracking-tight">
                {t("compareAiTitle")}
              </h3>
              <span className="px-2 py-0.5 text-xs font-mono font-medium bg-foreground text-primary-foreground rounded-full">
                {tCommon("recommended")}
              </span>
            </div>
            <ul className="space-y-4">
              {tuneeItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LipSyncComparisonSection;
