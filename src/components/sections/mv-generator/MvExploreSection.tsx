"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DEFAULT_LOCALE } from "@/i18n/routing";
import type { MvCategoryData, MvCategoryId } from "@/lib/mv/categories";

interface Props {
  categories: MvCategoryData[];
  locale: string;
}

const DOT_KEYFRAMES = `
@keyframes mv-dot-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2.5px); }
}
.mv-dot-bounce { animation: mv-dot-bounce 2.4s ease-in-out infinite; }
`;

// Visual rows on desktop:
//   1) Moments (14) + Platforms (8)            ← small, paired
//   2) Sound (35)                              ← solo full-width
//   3) Look (25)                               ← solo full-width
//   4) Tools (8) + Craft (10)                  ← small, paired
const ROW_GROUPS: MvCategoryId[][] = [
  ["moments", "platforms"],
  ["sound"],
  ["look"],
  ["tools", "craft"],
];

interface CategoryBlockProps {
  cat: MvCategoryData;
  idx: number;
  localePrefix: string;
  t: (key: string) => string;
}

const CategoryBlock = ({ cat, idx, localePrefix, t }: CategoryBlockProps) => {
  const idKey = cat.id as MvCategoryId;
  return (
    <motion.div
      id={`explore-${cat.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: Math.min(idx, 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-28 text-center"
    >
      <div className="mb-5 max-w-2xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 tracking-tight">
          {t(`${idKey}Label`)}
        </h3>
        <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
          {t(`${idKey}Sub`)}
        </p>
      </div>

      {/* Slug chips — centered, wrap freely */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {cat.slugs.map((s, i) => (
          <Link
            key={s.slug}
            href={`${localePrefix}/features/music-video-generator/${s.slug}`}
            className="group inline-flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full text-[13px] sm:text-sm font-medium bg-card border border-border text-foreground/90 hover:border-foreground/35 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <span
              aria-hidden
              className="mv-dot-bounce inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: s.accent,
                // stagger so dots in a row don't bounce in lockstep
                animationDelay: `${(i % 12) * 0.18}s`,
              }}
            />
            <span>{s.name}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * 3rd section on /features/music-video-generator.
 *
 * Centered Explore — one block per benefit-driven category. Small
 * categories (Tools/Platforms, Moments/Craft) pair up two-per-row on
 * desktop to feel tighter; the big ones (Sound 35 chips, Look 25 chips)
 * keep a full-width solo row so their chip cloud can breathe.
 *
 * Each chip carries the slug's color_accent dot, gently bouncing on idle.
 */
const MvExploreSection = ({ categories, locale }: Props) => {
  const t = useTranslations("MvExplore");
  const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  // Quick lookup: id → category data (preserves order for solo blocks)
  const byId = new Map(categories.map((c) => [c.id, c] as const));
  let globalIdx = 0;

  return (
    <section className="section-padding bg-background">
      <style dangerouslySetInnerHTML={{ __html: DOT_KEYFRAMES }} />
      <div className="section-container">
        {/* Section header — centered */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-3">
            {t("exploreEyebrow")}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="section-title mb-4"
          >
            {t("exploreH2")}
          </motion.h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("exploreSub")}
          </p>
        </div>

        {/* Rows: paired small cats on one row, big ones solo */}
        <div className="space-y-16">
          {ROW_GROUPS.map((rowIds, rowIdx) => {
            const rowCats = rowIds.map((id) => byId.get(id)).filter(Boolean) as MvCategoryData[];
            if (rowCats.length === 0) return null;
            const isPair = rowCats.length === 2;
            return (
              <div
                key={rowIdx}
                className={
                  isPair
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16"
                    : "grid grid-cols-1"
                }
              >
                {rowCats.map((cat) => {
                  const idx = globalIdx++;
                  return (
                    <CategoryBlock
                      key={cat.id}
                      cat={cat}
                      idx={idx}
                      localePrefix={localePrefix}
                      t={t}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MvExploreSection;
