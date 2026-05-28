"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import tuneeLogoWhite from "@/assets/tunee-logo-white-large.png";
import {
  FOOTER_RESOURCE_ITEMS,
  FOOTER_FEATURE_ITEMS,
  FOOTER_POLICY_ITEMS,
  FOOTER_OTHER_ITEMS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/routing";

const LOCALE_PREFIXES = new Set<string>(
  LOCALES.filter((l) => l !== DEFAULT_LOCALE),
);

const localizePath = (href: string, locale: string) => {
  if (!href.startsWith("/") || locale === DEFAULT_LOCALE) return href;
  if (LOCALE_PREFIXES.has(locale)) {
    return `/${locale}${href === "/" ? "" : href}`;
  }
  return href;
};

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

const SocialIconMap: Record<string, React.ComponentType> = {
  YouTube: YoutubeIcon,
  X: XIcon,
  Instagram: InstagramIcon,
  TikTok: TiktokIcon,
  Discord: DiscordIcon,
};

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");

  return (
    <footer>
      <div
        className="bg-[hsl(var(--footer-dark))] flex flex-col"
        style={{ height: "620px" }}
      >
        <div className="section-container flex-1 flex flex-col justify-center">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block">
              <img
                src={
                  tuneeLogoWhite.src ??
                  (tuneeLogoWhite as unknown as string)
                }
                alt="Tunee"
                className="h-[120px] md:h-[160px] lg:h-[200px] w-auto mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Links Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 flex-1">
              {/* Resource */}
              <div>
                <h3 className="font-barlow font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">
                  {t("sectionResource")}
                </h3>
                <ul className="space-y-2">
                  {FOOTER_RESOURCE_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-white/70 transition-colors font-poppins"
                      >
                        {t(item.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-barlow font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">
                  {t("sectionFeatures")}
                </h3>
                <ul className="space-y-2">
                  {FOOTER_FEATURE_ITEMS.map((item) => {
                    const isExternal = item.href.startsWith("http");
                    return (
                      <li key={item.labelKey}>
                        {isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm hover:text-white/70 transition-colors font-poppins"
                          >
                            {t(item.labelKey)}
                          </a>
                        ) : (
                          <Link
                            href={localizePath(item.href, locale)}
                            className="text-white text-sm hover:text-white/70 transition-colors font-poppins"
                          >
                            {t(item.labelKey)}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Policy */}
              <div>
                <h3 className="font-barlow font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">
                  {t("sectionPolicy")}
                </h3>
                <ul className="space-y-2">
                  {FOOTER_POLICY_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-white/70 transition-colors font-poppins"
                      >
                        {t(item.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other */}
              <div>
                <h3 className="font-barlow font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider">
                  {t("sectionOther")}
                </h3>
                <ul className="space-y-2">
                  {FOOTER_OTHER_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-white/70 transition-colors font-poppins"
                      >
                        {t(item.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social + Copyright */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SocialIconMap[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {Icon && <Icon />}
                    </a>
                  );
                })}
              </div>
              <p className="text-white/40 text-sm font-poppins">
                {t("copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
