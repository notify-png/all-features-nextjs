"use client";

import { motion } from "framer-motion";
import { Target, Image, Music, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const LipSyncWhyChooseSection = () => {
  const t = useTranslations("LipSync");
  const features = [
    { icon: Target, title: t("why1Title"), description: t("why1Desc") },
    { icon: Image, title: t("why2Title"), description: t("why2Desc") },
    { icon: Music, title: t("why3Title"), description: t("why3Desc") },
    { icon: Zap, title: t("why4Title"), description: t("why4Desc") },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t("whyTitle")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-foreground/20 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <feature.icon className="w-6 h-6 text-foreground" />
                </motion.div>
                <div>
                  <h3 className="card-title text-foreground mb-2">{feature.title}</h3>
                  <p className="body-text text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LipSyncWhyChooseSection;
