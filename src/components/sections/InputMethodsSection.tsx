"use client";

import { motion } from "framer-motion";
import { Link2, Upload, Image, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

const InputMethodsSection = () => {
  const t = useTranslations("MVG");
  const methods = [
    { icon: Link2, title: t("input1Title"), description: t("input1Desc") },
    { icon: Upload, title: t("input2Title"), description: t("input2Desc") },
    { icon: Image, title: t("input3Title"), description: t("input3Desc") },
    { icon: MessageSquare, title: t("input4Title"), description: t("input4Desc") },
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
            {t("inputTitlePrefix")}{" "}
            <span className="font-serif italic">{t("inputTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("inputSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-5">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <method.icon className="w-5 h-5 text-foreground" />
                </motion.div>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 tracking-tight">
                {method.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InputMethodsSection;
