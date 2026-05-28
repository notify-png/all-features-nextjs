"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
          >
            Your Music,
            <br />
            <span className="gradient-text">Brought to Life</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transform your tracks into stunning music videos with AI-powered virtual artists.
            No camera, no crew, no limits—just pure creative freedom.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-base font-display gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Start Creating
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-display gap-2 rounded-full border-border/50 hover:bg-muted/50 transition-all duration-300"
            >
              See Examples
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { name: "Music Video", active: true },
              { name: "Viral Content", active: false },
              { name: "Lip Sync", active: false },
              { name: "Photo Shoot", active: false },
            ].map((feature) => (
              <div
                key={feature.name}
                className={`px-5 py-2.5 rounded-full text-sm font-display transition-all duration-300 ${
                  feature.active
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted cursor-pointer"
                }`}
              >
                {feature.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;