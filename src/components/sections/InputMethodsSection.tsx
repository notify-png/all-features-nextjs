"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Link2, MessageSquare, Music2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";

interface InputMethodsSectionProps {
  embedded?: boolean;
}

const InputMethodsSection = ({ embedded = false }: InputMethodsSectionProps) => {
  const t = useTranslations("MVG");
  const methods = [
    {
      icon: Upload,
      title: t("input2Title"),
      description: t("input2Desc"),
      className: "lg:col-span-7",
      accent: "from-[#ff83bd] to-[#ffae7a]",
      visual: "audio",
    },
    {
      icon: Link2,
      title: t("input1Title"),
      description: t("input1Desc"),
      className: "lg:col-span-5",
      accent: "from-[#6557ff] to-[#a886ff]",
      visual: "link",
    },
    {
      icon: ImageIcon,
      title: t("input3Title"),
      description: t("input3Desc"),
      className: "lg:col-span-5",
      accent: "from-[#65b8ff] to-[#7c6dff]",
      visual: "image",
    },
    {
      icon: MessageSquare,
      title: t("input4Title"),
      description: t("input4Desc"),
      className: "lg:col-span-7",
      accent: "from-[#5cc8a8] to-[#72a3ff]",
      visual: "text",
    },
  ];

  const renderVisual = (visual: string) => {
    if (visual === "link") {
      return (
        <div className="flex h-full min-h-[154px] items-center justify-center p-5">
          <div className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/85 p-3 shadow-xl shadow-primary/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-xl bg-[#f6f5ff] p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Music2 className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-2" aria-hidden="true">
                <div className="h-2 w-2/3 rounded-full bg-foreground/70" />
                <div className="h-1.5 w-5/6 rounded-full bg-foreground/15" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                <Link2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (visual === "audio") {
      return (
        <div className="flex h-full min-h-[154px] items-center justify-center p-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-xl backdrop-blur-sm">
            <Upload className="h-8 w-8 text-[#fa6ba8]" />
          </div>
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-center gap-1" aria-hidden="true">
            {[18, 28, 16, 38, 24, 44, 20, 34, 14, 40, 26, 19].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="w-1.5 rounded-full bg-white/75"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (visual === "image") {
      return (
        <div className="relative h-full min-h-[154px] overflow-hidden p-5">
          <div className="absolute left-10 top-5 h-28 w-24 -rotate-6 rounded-2xl border border-white/70 bg-white/55 shadow-lg" />
          <div className="absolute right-10 top-6 h-28 w-24 rotate-6 rounded-2xl border border-white/70 bg-white/75 p-2 shadow-xl">
            <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-[#ffc8eb] via-[#8f75ff] to-[#30296f]">
              <div className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-white/40 blur-sm" />
              <ImageIcon className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full min-h-[154px] flex-col justify-center gap-3 p-5">
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white/85 px-4 py-3 shadow-lg">
          <div className="space-y-2" aria-hidden="true">
            <div className="h-2 w-44 max-w-full rounded-full bg-foreground/60" />
            <div className="h-1.5 w-32 max-w-[80%] rounded-full bg-foreground/15" />
          </div>
        </div>
        <div className="max-w-[70%] self-end rounded-2xl rounded-br-md bg-primary px-4 py-3 shadow-lg shadow-primary/20">
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={embedded ? "relative overflow-hidden" : "relative overflow-hidden bg-[#f7f7fa] section-padding"}>
      {!embedded && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />}
      <div className={embedded ? "relative" : "section-container relative"}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className={embedded ? "mb-10 text-center" : "mb-16 text-center"}
        >
          <h2 className="section-title">
            {t("inputTitlePrefix")} {" "}
            <span className="font-serif italic">{t("inputTitleAccent")}</span>
          </h2>
          <p className="section-subtitle">{t("inputSubtitle")}</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-12">
          {methods.map((method, index) => (
            <motion.article
              key={method.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              className={`group overflow-hidden rounded-[1.6rem] border border-black/[0.07] bg-white shadow-[0_16px_45px_rgba(24,20,48,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(77,70,254,0.14)] ${method.className}`}
            >
              <div className="grid h-full sm:grid-cols-[1.08fr_0.92fr]">
                <div className="flex flex-col p-6 sm:p-7">
                  <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${method.accent} text-white shadow-lg`}>
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-auto">
                    <div className="mb-3 font-mono text-xs font-medium tracking-[0.16em] text-primary/70">
                      0{index + 1}
                    </div>
                    <h3 className="mb-2 text-2xl font-display font-semibold tracking-tight">
                      {method.title}
                    </h3>
                    <p className="font-poppins text-sm font-normal leading-relaxed text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className={`relative overflow-hidden bg-gradient-to-br ${method.accent} opacity-95`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_48%)]" />
                  <div className="relative h-full">{renderVisual(method.visual)}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InputMethodsSection;
