"use client";

import { motion } from "framer-motion";
import { Check, Monitor, Square, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

const AiDancingExportFormatsSection = () => {
  const t = useTranslations("AiDancing");
  const formats = [
    { icon: Monitor, label: t("exportResolutionsLabel"), value: "720p • 1080p • 4K", description: t("exportResolutionsDesc") },
    { icon: Square, label: t("exportRatiosLabel"), value: "16:9 • 1:1 • 9:16", description: t("exportRatiosDesc") },
    { icon: Smartphone, label: t("exportFormatsLabel"), value: "MP4 • GIF • WebM", description: t("exportFormatsDesc") },
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
            {t("exportTitlePrefix")}{" "}
            <span className="font-serif italic">{t("exportTitleAccent")}</span>{" "}
            {t("exportTitleSuffix")}
          </h2>
          <p className="section-subtitle">{t("exportSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {formats.map((format, index) => (
            <motion.div
              key={format.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-xl hover:border-foreground/20 transition-all duration-500"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-5"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <format.icon className="w-5 h-5 text-foreground" />
              </motion.div>
              <div className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                {format.label}
              </div>
              <div className="text-lg font-mono font-semibold mb-2">{format.value}</div>
              <div className="text-sm text-muted-foreground font-light">{format.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-muted-foreground">{t("exportRoyaltyFree")}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AiDancingExportFormatsSection;
