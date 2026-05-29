"use client";

import { useEffect } from "react";

interface Props {
  demoPrompt: string;
}

/**
 * Types out cfg.demo_prompt into the #gpText span inside the GenProcess card.
 *
 * Was previously an inline <script> embedded next to GenProcess. Same client-side-
 * navigation bug as SlugPageEffects — inline scripts don't re-execute when the user
 * arrives via Next.js routing, so the prompt preview stayed blank until refresh.
 */
export default function GpTypewriter({ demoPrompt }: Props) {
  useEffect(() => {
    const el = document.getElementById("gpText");
    if (!el) return;
    let i = 0;
    let timeoutId: number;
    const tick = () => {
      if (i <= demoPrompt.length) {
        el.textContent = demoPrompt.slice(0, i++) + (i < demoPrompt.length ? "|" : "");
        timeoutId = window.setTimeout(tick, 36);
      }
    };
    timeoutId = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timeoutId);
  }, [demoPrompt]);

  return null;
}
