"use client";

import { motion } from "framer-motion";
import { Clock3, MessageCircle, PanelsTopLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import whyChooseWorkspaceDemo from "@/assets/why-choose-workspace-demo.mp4";
import whyChooseWorkspacePoster from "@/assets/posters/music-video-workspace.webp";

const WhyChooseSection = () => {
  const t = useTranslations("MVG");
  const features = [
    { icon: MessageCircle, title: t("why1Title"), description: t("why1Desc") },
    { icon: Clock3, title: t("why2Title"), description: t("why2Desc") },
    { icon: PanelsTopLeft, title: t("why3Title"), description: t("why3Desc") },
  ];

  return (
    <section className="relative overflow-hidden bg-background section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,100,255,0.18),rgba(255,255,255,0)_68%)] blur-2xl" />
      </div>

      <div className="section-container relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t("whyTitle")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-70px" }}
          className="mt-12 grid items-stretch gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6"
        >
          <div className="flex h-full flex-col gap-3">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.2 + index * 0.12 }}
                viewport={{ once: true }}
                className="flex flex-1 rounded-2xl border border-primary/20 bg-white/80 p-3.5 shadow-[0_14px_32px_rgba(77,70,254,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-primary/35 hover:bg-white sm:p-4"
              >
                <div className="flex items-start gap-3 self-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <feature.icon className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-display font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="font-poppins text-[13px] font-normal leading-[1.5] text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border-2 border-primary/35 bg-gradient-to-br from-[#aaa8e8] via-[#d8e8e4] to-[#b9c8ef] p-3 shadow-[0_28px_70px_rgba(77,70,254,0.16)] sm:p-4">
            <div className="relative aspect-[8/5] overflow-hidden rounded-[1.35rem] bg-black">
              <video
                src={whyChooseWorkspaceDemo as unknown as string}
                poster={whyChooseWorkspacePoster.src}
                width={1440}
                height={900}
                className="absolute inset-0 h-full w-full bg-black object-contain"
                aria-label={t("whyTitle")}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
