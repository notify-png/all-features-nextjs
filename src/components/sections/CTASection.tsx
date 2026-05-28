"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CTASection = () => {
  const t = useTranslations("CTA");
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 font-barlow uppercase text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed font-poppins font-light">
            {t("bodyPrefix")}{" "}
            <span className="font-mono font-medium text-foreground">
              {t("bodyCount")}
            </span>{" "}
            {t("bodySuffix")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                asChild
              >
                <Link href="https://www.tunee.ai" target="_blank">
                  {t("primary")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link href="https://www.tunee.ai/pricing" target="_blank">
                  {t("secondary")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
