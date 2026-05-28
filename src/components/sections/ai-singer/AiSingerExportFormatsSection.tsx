"use client";

import { motion } from "framer-motion";
import { Headphones, FileText, SlidersHorizontal, Check } from "lucide-react";
import { useTranslations } from "next-intl";

const AiSingerExportFormatsSection = () => {
  const t = useTranslations("AiSinger");
  const formats = [
    {
      icon: Headphones,
      title: t("exportQualityLabel"),
      specs: "44.1kHz · 48kHz · 96kHz",
      description: t("exportQualityDesc"),
    },
    {
      icon: FileText,
      title: t("exportFormatsLabel"),
      specs: "WAV · MP3 · FLAC · AIFF",
      description: t("exportFormatsDesc"),
    },
    {
      icon: SlidersHorizontal,
      title: t("exportStemsLabel"),
      specs: "6-Source Separation",
      description: t("exportStemsDesc"),
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
            {t("exportTitlePrefix")}{" "}
            <span className="font-serif italic">{t("exportTitleAccent")}</span>{" "}
            {t("exportTitleSuffix")}
          </h2>
          <p className="section-subtitle">{t("exportSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {formats.map((format, index) => (
            <motion.div
              key={format.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-foreground/20 transition-all duration-500 cursor-pointer"
            >
              <motion.div
                className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-5"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <format.icon className="w-5 h-5 text-foreground" />
              </motion.div>
              <h3 className="font-poppins font-medium text-sm text-muted-foreground tracking-wider uppercase mb-3">
                {format.title}
              </h3>
              <p className="font-mono font-semibold text-foreground text-lg mb-2">
                {format.specs}
              </p>
              <p className="body-text text-sm">
                {format.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <span className="body-text">{t("exportRoyaltyFree")}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AiSingerExportFormatsSection;
