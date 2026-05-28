"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Import demo videos (Next.js webpack asset/resource returns url string)
import _demo1 from "@/assets/ai-singer-demo-1.mp4";
import _demo2 from "@/assets/ai-singer-demo-2.mp4";
import _demo3 from "@/assets/ai-singer-demo-3.mp4";
import _demo4 from "@/assets/ai-singer-demo-4.mp4";
import _demo5 from "@/assets/ai-singer-demo-5.mp4";
import _demo6 from "@/assets/ai-singer-demo-6.mp4";
import _demo7 from "@/assets/ai-singer-demo-7.mp4";
import _demo8 from "@/assets/ai-singer-demo-8.mp4";
import _demo9 from "@/assets/ai-singer-demo-9.mp4";

const demoVideos = [
  { id: 1, src: _demo1 as unknown as string },
  { id: 2, src: _demo2 as unknown as string },
  { id: 3, src: _demo3 as unknown as string },
  { id: 4, src: _demo4 as unknown as string },
  { id: 5, src: _demo5 as unknown as string },
  { id: 6, src: _demo6 as unknown as string },
  { id: 7, src: _demo7 as unknown as string },
  { id: 8, src: _demo8 as unknown as string },
  { id: 9, src: _demo9 as unknown as string },
];

const AiSingerShowcaseSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="pt-0 pb-16 -mt-16 bg-transparent overflow-hidden">

      {/* Scrolling Gallery */}
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div
          className="flex gap-4 md:gap-6"
          style={{
            width: "max-content",
            animation: `scroll-left 40s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* First set of videos */}
          {demoVideos.map((video) => (
            <div
              key={`first-${video.id}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-card group cursor-pointer"
            >
              <video
                src={video.src}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loop
                muted
                playsInline
                autoPlay
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {demoVideos.map((video) => (
            <div
              key={`second-${video.id}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-card group cursor-pointer"
            >
              <video
                src={video.src}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loop
                muted
                playsInline
                autoPlay
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default AiSingerShowcaseSection;