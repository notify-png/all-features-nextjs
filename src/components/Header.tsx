"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/lib/constants";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/routing";
import tuneeLogo from "@/assets/tunee-logo.png";

const LOCALE_PREFIXES = new Set<string>(
  LOCALES.filter((l) => l !== DEFAULT_LOCALE),
);

const localizePath = (href: string, locale: string) => {
  if (!href.startsWith("/") || locale === DEFAULT_LOCALE) return href;
  return `/${locale}${href === "/" ? "" : href}`;
};

const stripLocale = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && LOCALE_PREFIXES.has(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const canonicalPath = stripLocale(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      style={{ height: "72px" }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="https://www.tunee.ai"
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={tuneeLogo.src ?? (tuneeLogo as unknown as string)}
                alt="Tunee"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="font-barlow font-semibold text-xl tracking-tight text-foreground">
              Tunee
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const label = t(item.labelKey);
              const isActive = !item.external && canonicalPath === item.href;

              if (item.external) {
                return (
                  <a
                    key={item.labelKey}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-4 py-2 text-sm font-poppins font-medium transition-colors rounded-full text-foreground/80 hover:text-foreground"
                  >
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.labelKey}
                  href={localizePath(item.href, locale)}
                  className={`relative px-4 py-2 text-sm font-poppins font-medium transition-colors rounded-full ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-foreground/10 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side placeholder */}
          <div className="hidden lg:flex items-center gap-3" />

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="section-container py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => {
                const label = t(item.labelKey);
                return (
                  <motion.div
                    key={item.labelKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors font-poppins font-medium"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={localizePath(item.href, locale)}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors font-poppins font-medium"
                      >
                        {label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
