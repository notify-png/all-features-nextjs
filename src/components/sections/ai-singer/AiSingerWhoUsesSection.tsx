"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

const AiSingerWhoUsesSection = () => {
  const [activeTab, setActiveTab] = useState("musicians");
  const t = useTranslations("AiSinger");

  const tabs = [
    {
      id: "musicians",
      label: t("whoTab1"),
      title: t("who1Title"),
      description: t("who1Desc"),
    },
    {
      id: "producers",
      label: t("whoTab2"),
      title: t("who2Title"),
      description: t("who2Desc"),
    },
    {
      id: "labels",
      label: t("whoTab3"),
      title: t("who3Title"),
      description: t("who3Desc"),
    },
    {
      id: "vtubers",
      label: t("whoTab4"),
      title: t("who4Title"),
      description: t("who4Desc"),
    },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t("whoTitle")}</h2>
          <p className="section-subtitle">{t("whoSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex md:flex-col gap-2 md:w-48 shrink-0 md:min-h-[280px] md:justify-between">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`px-6 py-3 rounded-xl font-poppins font-medium text-left transition-all duration-300 flex-1 flex items-center ${
                  activeTab === tab.id
                    ? "bg-foreground text-primary-foreground shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-card border border-border rounded-xl p-8 min-h-[280px] flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={activeContent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col flex-1"
                >
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                    {activeContent.title}
                  </h3>
                  <p className="body-text leading-relaxed mb-6 flex-1">
                    {activeContent.description}
                  </p>
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <a href="https://www.tunee.ai/create">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                          {t("whoCta")}
                        </Button>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiSingerWhoUsesSection;
