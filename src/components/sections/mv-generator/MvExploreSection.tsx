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

/**
 * 3rd section on /features/music-video-generator.
 *
 * Full Explore — one block per benefit-driven category, each with an h3 +
 * subtitle that frames Tunee's strength for that scenario, then every slug
 * in that category as a chip-pill linking to its SEO landing page.
 *
 * Each chip carries a tiny color_accent dot from the slug's cfg, gently
 * bouncing on idle so the grid reads as alive rather than as a wall of text.
 *
 * Category anchors (id="explore-tools" etc.) are the jump targets from
 * <MvQuickJumpStrip />.
 */
const MvExploreSection = ({ categories, locale }: Props) => {
  const t = useTranslations("MvExplore");
  const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <section className="section-padding bg-background">
      <style dangerouslySetInnerHTML={{ __html: DOT_KEYFRAMES }} />
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-3xl mb-12">
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

        {/* Category blocks */}
        <div className="space-y-14">
          {categories.map((cat, catIdx) => {
            const idKey = cat.id as MvCategoryId;
            return (
              <motion.div
                key={cat.id}
                id={`explore-${cat.id}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: Math.min(catIdx, 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
                className="scroll-mt-28"
              >
                <div className="mb-5 max-w-3xl">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 tracking-tight">
                    {t(`${idKey}Label`)}
                    <span className="ml-2 text-sm font-normal text-muted-foreground align-middle">
                      · {cat.slugs.length}
                    </span>
                  </h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                    {t(`${idKey}Sub`)}
                  </p>
                </div>

                {/* Slug chips */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
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
                          // stagger so 35 dots in a row don't bounce in lockstep
                          animationDelay: `${(i % 12) * 0.18}s`,
                        }}
                      />
                      <span>{s.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MvExploreSection;
