"use client";

import { useTranslations } from "next-intl";
import type { MvCategoryId } from "@/lib/mv/categories";

interface Props {
  categoryIds: MvCategoryId[];
}

/**
 * 2nd section on /features/music-video-generator.
 *
 * A slim strip of 6 anchor chips that jump to the matching category block
 * in <MvExploreSection /> below. Lightweight on purpose — just hands the
 * user a fast index of "what kinds of MV does Tunee make?" right after
 * the hero, without crowding the page with another big section.
 */
const MvQuickJumpStrip = ({ categoryIds }: Props) => {
  const t = useTranslations("MvExplore");

  return (
    <section
      aria-label={t("quickJumpLabel")}
      className="border-y border-border bg-secondary/40"
    >
      <div className="section-container py-5">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground mr-1 sm:mr-2">
            {t("quickJumpLabel")}
          </span>
          {categoryIds.map((id) => (
            <a
              key={id}
              href={`#explore-${id}`}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-background border border-border text-foreground/85 hover:border-foreground/40 hover:bg-foreground hover:text-background transition-colors"
            >
              {t(`${id}Label`)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MvQuickJumpStrip;
