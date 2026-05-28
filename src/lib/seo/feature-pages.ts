import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

const featuresIndex = buildPageMetadata("/features", {
  title: "AI Features | Music & Video Creation Tools",
  description:
    "Explore all Tunee AI features: music generation, music video creation, lip sync, AI dancing, motion control, and more. The all-in-one platform for AI creative content.",
  openGraph: {
    title: "AI Features | Music & Video Creation Tools – Tunee",
    description:
      "Explore all Tunee AI features: music generation, music video creation, lip sync, AI dancing, motion control, and more.",
    url: "https://www.tunee.ai/features",
  },
});

const musicVideoGenerator = buildPageMetadata("/features/music-video-generator", {
  title: "Best AI Music Video Generator | Create Music Videos with AI",
  description:
    "Transform your music into stunning AI-generated music videos with Tunee. Upload audio, choose your style, and generate professional music videos in minutes.",
  openGraph: {
    title: "Best AI Music Video Generator – Tunee",
    description:
      "Transform your music into stunning AI-generated music videos. Professional results in minutes.",
    url: "https://www.tunee.ai/features/music-video-generator",
  },
});

const lipSync = buildPageMetadata("/features/lip-sync", {
  title: "Best AI Lip Sync Video Generator | Tunee",
  description:
    "Transform any portrait into a singing character with Tunee's AI lip sync technology. Create perfectly synchronized mouth movements for your music — no filming required.",
  openGraph: {
    title: "Best AI Lip Sync Video Generator – Tunee",
    description:
      "Transform any portrait into a singing character with AI lip sync. No filming required.",
    url: "https://www.tunee.ai/features/lip-sync",
  },
});

const aiDancing = buildPageMetadata("/features/ai-dancing", {
  title: "Best AI Dancing Video Generator | AI Dance from Photo",
  description:
    "Transform any image into a dynamic AI dancing video with Tunee. Upload a photo, choose a dance style, and watch your virtual artist come to life in seconds.",
  openGraph: {
    title: "Best AI Dancing Video Generator – Tunee",
    description:
      "Transform any image into a dynamic dancing video with AI. Upload a photo, choose a dance style.",
    url: "https://www.tunee.ai/features/ai-dancing",
  },
});

const motionControl = buildPageMetadata("/features/motion-control", {
  title: "Best AI Motion Control Video Generator | Tunee",
  description:
    "Create precise AI motion-controlled videos with Tunee. Direct your virtual artist's movements, expressions, and camera angles for professional-quality results.",
  openGraph: {
    title: "Best AI Motion Control Video Generator – Tunee",
    description:
      "Precise AI motion control for professional video creation. Direct movements, expressions, and camera angles.",
    url: "https://www.tunee.ai/features/motion-control",
  },
});

const aiSinger = buildPageMetadata("/features/ai-singer", {
  title: "Best AI Singer Generator | Create Your AI Virtual Artist",
  description:
    "Create your own AI singer with unique voice, style, and personality. Generate original songs, covers, and performances in minutes — no recording studio required.",
  openGraph: {
    title: "Best AI Singer Generator – Create Your Virtual Artist | Tunee",
    description:
      "Create your AI singer with unique voice and personality. Generate songs in minutes — no studio required.",
    url: "https://www.tunee.ai/features/ai-singer",
  },
});

export const FEATURE_PAGE_METADATA: Record<string, Metadata> = {
  features: featuresIndex,
  "music-video-generator": musicVideoGenerator,
  "lip-sync": lipSync,
  "ai-dancing": aiDancing,
  "motion-control": motionControl,
  "ai-singer": aiSinger,
};

export const featuresIndexMetadata = featuresIndex;

export const FEATURE_SITEMAP_PATHS = [
  "/features",
  "/features/music-video-generator",
  "/features/lip-sync",
  "/features/ai-dancing",
  "/features/ai-singer",
  "/features/motion-control",
] as const;
