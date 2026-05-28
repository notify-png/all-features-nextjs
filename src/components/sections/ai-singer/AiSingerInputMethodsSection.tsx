"use client";

import { motion } from "framer-motion";
import { Music, FileText, Piano, Mic } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const AiSingerInputMethodsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const t = useTranslations("AiSinger");
  const methods = [
    { icon: Music, title: t("input1Title"), description: t("input1Desc") },
    { icon: FileText, title: t("input2Title"), description: t("input2Desc") },
    { icon: Piano, title: t("input3Title"), description: t("input3Desc") },
    { icon: Mic, title: t("input4Title"), description: t("input4Desc") },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
              className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                selectedIndex === index
                  ? 'bg-foreground border border-foreground'
                  : 'bg-card border border-border hover:border-foreground/20 hover:shadow-xl'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                selectedIndex === index ? 'bg-background' : 'bg-secondary'
              }`}>
                <method.icon className={`w-5 h-5 ${selectedIndex === index ? 'text-foreground' : 'text-foreground'}`} />
              </div>
              <h3 className={`card-title mb-2 ${
                selectedIndex === index ? 'text-background' : 'text-foreground'
              }`}>
                {method.title}
              </h3>
              <p className={`text-sm leading-relaxed font-poppins ${
                selectedIndex === index ? 'text-background/70' : 'text-muted-foreground'
              }`}>
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiSingerInputMethodsSection;
