"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const WhoUsesSection = () => {
  const [activeTab, setActiveTab] = useState("musicians");
  const t = useTranslations("MVG");

  const tabs = [
    { id: "musicians", label: t("whoTab1"), title: t("who1Title"), description: t("who1Desc") },
    { id: "creators", label: t("whoTab2"), title: t("who2Title"), description: t("who2Desc") },
    { id: "labels", label: t("whoTab3"), title: t("who3Title"), description: t("who3Desc") },
    { id: "brands", label: t("whoTab4"), title: t("who4Title"), description: t("who4Desc") },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t("whoTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-subtitle"
        >
          {t("whoSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto lg:items-stretch">
            <div className="flex flex-row lg:flex-col justify-between gap-2 lg:w-48 flex-shrink-0">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left flex items-center ${
                    activeTab === tab.id
                      ? "bg-foreground text-primary-foreground shadow-lg"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            <div className="flex-1 bg-card border border-border rounded-xl p-8 min-h-[280px] flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col flex-1"
                >
                  <h3 className="text-2xl font-display font-semibold mb-4">
                    {activeContent.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 font-light flex-1">
                    {activeContent.description}
                  </p>
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8" asChild>
                        <a href="https://www.tunee.ai">{t("whoCta")}</a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoUsesSection;
