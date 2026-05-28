"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const AiSingerWhyChooseSection = () => {
  const t = useTranslations("AiSinger");
  const features = [
    {
      icon: Sparkles,
      title: t("whyCard1Title"),
      description: t("whyCard1Desc"),
    },
    {
      icon: Mic,
      title: t("whyCard2Title"),
      description: t("whyCard2Desc"),
    },
    {
      icon: Zap,
      title: t("whyCard3Title"),
      description: t("whyCard3Desc"),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          {t("whyTitle")}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="card-title text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="body-text leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiSingerWhyChooseSection;
