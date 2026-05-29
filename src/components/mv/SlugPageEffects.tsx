"use client";

import { useEffect } from "react";

interface Props {
  /** Locale-aware "Copied!" label flashed on the prompt copy button. */
  copiedLabel: string;
}

/**
 * Client-side effects for the MV slug landing page. Replaces what used to
 * be an inline <script> at the bottom of the page.
 *
 * Why this exists: the slug page was hidden on first load when arrived at
 * via Next.js client-side navigation (e.g. clicking a chip on the parent
 * /features/music-video-generator page). Inline <script> tags rendered by
 * server components only execute on a fresh page load — they're treated as
 * inert DOM nodes during route transitions, so the IntersectionObserver
 * that adds `.in` to `.rv` elements never ran and every animated section
 * stayed at opacity:0. Refresh worked because that's a full page load.
 *
 * Running this inside useEffect makes it re-run on every navigation, so
 * the reveal + copy handlers are always wired up.
 */
export default function SlugPageEffects({ copiedLabel }: Props) {
  useEffect(() => {
    // ── Scroll reveal ─────────────────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    // Failsafe: anything still hidden after 800ms gets revealed unconditionally
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => el.classList.add("in"));
    }, 800);

    // ── Copy-to-clipboard for [data-copy] buttons ─────────────
    const onClick = (e: Event) => {
      const target = e.target as Element | null;
      const btn = target?.closest<HTMLElement>("[data-copy]");
      if (!btn) return;
      const text = btn.dataset.copy ?? "";
      const orig = btn.innerHTML;
      const flash = () => {
        btn.innerHTML = copiedLabel;
        btn.classList.add("done");
        window.setTimeout(() => {
          btn.innerHTML = orig;
          btn.classList.remove("done");
        }, 2000);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(flash)
          .catch(() => legacyCopy(text, flash));
      } else {
        legacyCopy(text, flash);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      document.removeEventListener("click", onClick);
    };
  }, [copiedLabel]);

  return null;
}

function legacyCopy(text: string, cb: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    cb();
  } catch {
    /* noop */
  }
  document.body.removeChild(ta);
}
