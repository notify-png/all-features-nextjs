"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const rows = [
  {
    eyebrowKey: "homeMvEyebrow",
    headingLine1Key: "homeMvHeadingLine1",
    headingLine2Key: "homeMvHeadingLine2",
    bodyKey: "homeMvBody",
    ctaKey: "homeMvCta",
    video:
      "https://res-cdn.tunee.ai/web_static_res/agent/videos/public-home-features-visualize.mp4",
    poster:
      "https://res-cdn.tunee.ai/web_static_res/op/877b2e40ef2f40419bae0d03b54d9b43.png",
    mediaFirst: true,
  },
  {
    eyebrowKey: "homeCharacterEyebrow",
    headingLine1Key: "homeCharacterHeadingLine1",
    headingLine2Key: "homeCharacterHeadingLine2",
    bodyKey: "homeCharacterBody",
    ctaKey: "homeCharacterCta",
    video:
      "https://res-cdn.tunee.ai/web_static_res/agent/videos/public-home-features-voice.mp4",
    poster:
      "https://res-cdn.tunee.ai/web_static_res/op/015bd0a2392952b324f65b9e5db9a272.png",
    mediaFirst: false,
  },
] as const;

const HomeFeatureRows = () => {
  const t = useTranslations("MVG");

  return (
    <section className="bg-background px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-[120px]">
      <div className="mx-auto max-w-6xl">
        {rows.map((row, index) => (
          <div
            key={row.eyebrowKey}
            className={`grid grid-cols-1 items-center gap-6 py-8 sm:gap-9 sm:py-9 md:grid-cols-2 md:gap-8 lg:gap-[60px] lg:py-[60px] ${
              index === 0 ? "border-b border-[#e6e6e6] pt-0" : "border-b-0"
            }`}
          >
            <div className={`min-w-0 ${row.mediaFirst ? "order-2 md:order-2" : ""}`}>
              <p className="mb-3 font-poppins text-[0.64rem] font-medium uppercase tracking-[0.18em] text-[#8a8a8a]">
                {t(row.eyebrowKey)}
              </p>
              <h2 className="mb-4 break-words font-display text-[clamp(1.8rem,8vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-[#191919] md:text-[clamp(2.25rem,4.8vw,3.5rem)]">
                {t(row.headingLine1Key)}
                <br />
                {t(row.headingLine2Key)}
              </h2>
              <p className="mb-6 max-w-[440px] font-poppins text-[0.9rem] font-light leading-[1.78] text-[#8a8a8a]">
                {t(row.bodyKey)}
              </p>
              <a
                data-inline-cta
                href="https://www.tunee.ai/sign-up"
                className="inline-flex items-center gap-1.5 font-poppins text-[0.85rem] font-medium text-[#191919] no-underline transition-[gap] duration-200 hover:gap-2.5"
              >
                {t(row.ctaKey)}
                <ChevronRight className="h-4 w-4 stroke-2" />
              </a>
            </div>

            <div
              className={`relative flex min-w-0 aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-[#f4f5f7] sm:aspect-auto sm:h-80 ${
                row.mediaFirst ? "order-1 md:order-1" : ""
              }`}
            >
              <video
                className="h-full w-full object-cover"
                src={row.video}
                poster={row.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-label={t(row.eyebrowKey)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFeatureRows;
