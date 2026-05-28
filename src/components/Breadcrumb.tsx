"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  EXTERNAL_FEATURE_LINKS,
  INTERNAL_ROUTES,
} from "@/lib/constants";
import { LOCALES } from "@/i18n/routing";

interface BreadcrumbItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Maps URL segment to translation key in Common namespace.
const SEGMENT_TO_COMMON_KEY: Record<string, string> = {
  "music-video-generator": "musicVideoGenerator",
  "lip-sync": "lipSync",
  "ai-dancing": "aiDancing",
  "motion-control": "motionControl",
  "ai-singer": "aiSinger",
};

const LOCALE_SEGMENTS = new Set<string>(LOCALES);

const Breadcrumb = () => {
  const pathname = usePathname();
  const tBc = useTranslations("Breadcrumb");
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");

  // Strip leading locale segment so it doesn't appear in breadcrumbs.
  const pathnames = pathname
    .split("/")
    .filter((x) => x)
    .filter((seg, idx) => !(idx === 0 && LOCALE_SEGMENTS.has(seg)));

  const breadcrumbItems: BreadcrumbItem[] = pathnames.map((value, index) => {
    const isExternal = !!EXTERNAL_FEATURE_LINKS[value];
    const isInternal = INTERNAL_ROUTES.includes(value);
    const href = isExternal
      ? EXTERNAL_FEATURE_LINKS[value]
      : `/${pathnames.slice(0, index + 1).join("/")}`;

    let label: string;
    if (value === "features") {
      label = tNav("features");
    } else if (SEGMENT_TO_COMMON_KEY[value]) {
      label = tCommon(SEGMENT_TO_COMMON_KEY[value]);
    } else {
      label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    }
    return { label, href, isExternal: isExternal && !isInternal };
  });

  return (
    <nav className="section-container pt-28 pb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm font-poppins">
        <li>
          <a
            href="https://www.tunee.ai"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {tBc("home")}
          </a>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            {item.isExternal ? (
              <a
                href={item.href}
                className={`hover:text-foreground transition-colors ${
                  index === breadcrumbItems.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ) : index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
