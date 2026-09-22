"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import NextImage, { type StaticImageData } from "next/image";
import {
  ArrowUp,
  Box,
  Check,
  ChevronDown,
  Folder,
  Gem,
  Image as ImageIcon,
  Plus,
  Sparkles,
  Type,
  Video,
  Zap,
} from "lucide-react";
import deepseekLogo from "@/assets/model-logos/deepseek.png";
import geminiLogo from "@/assets/model-logos/gemini.png";
import happyhorseLogo from "@/assets/model-logos/happyhorse.png";
import infiniteTalkLogo from "@/assets/model-logos/infinite-talk.png";
import kimiLogo from "@/assets/model-logos/kimi.png";
import klingLogo from "@/assets/model-logos/kling.png";
import minimaxLogo from "@/assets/model-logos/minimax.png";
import nanoBananaLogo from "@/assets/model-logos/nano-banana.png";
import openaiLogo from "@/assets/model-logos/openai.png";
import qwenLogo from "@/assets/model-logos/qwen.png";
import seedanceLogo from "@/assets/model-logos/seedance.png";
import wanLogo from "@/assets/model-logos/wan.png";

const SIGN_UP_URL = "https://www.tunee.ai/sign-up";

type ModelCategory = "image" | "video" | "text";

type ModelItem = {
  name: string;
  description: string;
  logo?: StaticImageData;
  credits?: string;
  isNew?: boolean;
  isFast?: boolean;
};

const modelGroups: Record<ModelCategory, ModelItem[]> = {
  image: [
    {
      name: "GPT Image 2.5 Flare",
      description: "Lightning-fast generation, perfect for everyday creation",
      logo: openaiLogo,
      credits: "10 credits/image",
      isNew: true,
    },
    {
      name: "GPT Image 2.5 Sunburst",
      description: "Precision editing with maximum detail control",
      logo: openaiLogo,
      credits: "10 credits/image",
      isNew: true,
    },
    {
      name: "GPT Image 2",
      description: "Film-grade visuals, real light, lasting subjects",
      logo: openaiLogo,
      credits: "10 credits/image",
    },
    {
      name: "Nano Banana 2",
      description: "Pro quality, flash speed, consistent subjects",
      logo: nanoBananaLogo,
      credits: "13 credits/image",
    },
    {
      name: "Nano Banana Pro",
      description: "Advanced reasoning, photorealistic quality",
      logo: nanoBananaLogo,
      credits: "12 credits/image",
    },
    {
      name: "Qwen Image 3 Pro",
      description: "Photoreal detail, real light, deep understanding",
      logo: qwenLogo,
      credits: "8 credits/image",
      isNew: true,
    },
    {
      name: "Seedream 5.0 lite",
      description: "Deep reasoning, precise imaging",
      logo: seedanceLogo,
      credits: "6 credits/image",
    },
    {
      name: "Seedream 4.5",
      description: "Fast generation, strong character consistency",
      logo: seedanceLogo,
      credits: "5 credits/image",
    },
  ],
  video: [
    {
      name: "Seedance 2.5",
      description: "Audio-driven storytelling across shots, up to 30s",
      logo: seedanceLogo,
      isNew: true,
    },
    {
      name: "MiniMax H3",
      description: "Flagship model · Native 2K video",
      logo: minimaxLogo,
      isNew: true,
    },
    {
      name: "Wan 3.0",
      description: "Audio-driven storytelling across shots, up to 30s",
      logo: wanLogo,
      isNew: true,
    },
    {
      name: "Seedance 2.0 Mini",
      description: "Fastest, lowest cost — ideal for drafts and batch output",
      logo: seedanceLogo,
      isNew: true,
    },
    {
      name: "Seedance 2.0 Fast",
      description: "Balanced speed and quality — fits most scenarios",
      logo: seedanceLogo,
    },
    {
      name: "Seedance 2.0",
      description: "Full-capability model, best quality — built for final output",
      logo: seedanceLogo,
    },
    {
      name: "HappyHorse 1.1",
      description: "Cinematic motion, native audio, multi-shot stories",
      logo: happyhorseLogo,
    },
    {
      name: "Kling 3.0 Omni",
      description: "Ultra-strong consistency, more responsive and expressive",
      logo: klingLogo,
    },
    {
      name: "InfiniteTalk",
      description: "Static cam / one-take style · Natural lip sync, unlimited duration",
      logo: infiniteTalkLogo,
    },
    {
      name: "Wan 2.7",
      description: "Multi-shot dynamic cam · Precise lip sync and natural expressions",
      logo: wanLogo,
    },
  ],
  text: [
    {
      name: "Fast",
      description: "A stable, low-cost default",
      isFast: true,
    },
    {
      name: "DeepSeek-V4-Flash",
      description: "A stable, low-cost default",
      logo: deepseekLogo,
    },
    {
      name: "DeepSeek-V4-Pro",
      description: "Frontier power for ambitious work",
      logo: deepseekLogo,
    },
    {
      name: "GPT 5.6 Luna",
      description: "Bright thinking for creative work",
      logo: openaiLogo,
    },
    {
      name: "Kimi-K2.6",
      description: "Steady depth across long journeys",
      logo: kimiLogo,
    },
    {
      name: "Gemini 3.6 Flash",
      description: "Instant speed for everyday ideas",
      logo: geminiLogo,
    },
    {
      name: "Qwen3.7-Plus",
      description: "Vast memory for the full picture",
      logo: qwenLogo,
    },
    {
      name: "GPT-5.4",
      description: "Deeper reasoning for tougher problems",
      logo: openaiLogo,
    },
    {
      name: "Gemini-3-Flash-Preview",
      description: "Versatile multimodal, swift and sharp",
      logo: geminiLogo,
    },
  ],
};

const categoryIcons: Record<ModelCategory, typeof ImageIcon> = {
  image: ImageIcon,
  video: Video,
  text: Type,
};

const MvAgentPromptMock = () => {
  const [prompt, setPrompt] = useState("");
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ModelCategory>("text");
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const [isAuto, setIsAuto] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const goToSignUp = () => {
    window.location.assign(SIGN_UP_URL);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToSignUp();
  };

  const selectModel = (model: ModelItem) => {
    setSelectedModel(model);
    setIsAuto(false);
    setIsModelMenuOpen(false);
  };

  const toggleAuto = () => {
    setIsAuto((current) => {
      const next = !current;
      if (next) setSelectedModel(null);
      return next;
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6" data-inline-cta>
      <div className="pointer-events-none absolute inset-x-0 -inset-y-12 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(126,155,255,0.24),rgba(136,104,255,0.16)_42%,transparent_72%)] blur-2xl" />

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative min-w-0 flex-1 rounded-[28px] border border-white/95 bg-white/70 p-2 shadow-[0_18px_45px_rgba(82,71,152,0.18),0_0_0_2px_rgba(255,255,255,0.55)] backdrop-blur-xl"
        >
          <div className="flex min-h-[138px] rounded-[22px] border border-slate-200/80 bg-white/90 p-2 shadow-inner sm:min-h-[150px] sm:p-3">
            <button
              type="button"
              onClick={goToSignUp}
              className="mr-2 flex w-[78px] shrink-0 flex-col items-center justify-center gap-1 rounded-[16px] border border-slate-200/80 bg-gradient-to-b from-[#f7fbff] to-[#f1f3ff] text-[#725bff] transition-transform hover:-translate-y-0.5 sm:mr-3 sm:w-[88px]"
            >
              <Sparkles className="h-6 w-6" />
              <span className="text-xs font-medium sm:text-sm">Music</span>
              <span className="text-[10px] text-[#a38fff] sm:text-xs">Optional</span>
            </button>

            <div className="flex min-w-0 flex-1 flex-col">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Upload or pick the song, then describe the scenes — style, setting, who's on screen"
                aria-label="Describe your music video"
                className="min-h-[62px] w-full flex-1 resize-none border-0 bg-transparent px-1 py-1 font-poppins text-sm leading-relaxed text-foreground outline-none placeholder:text-slate-400 sm:px-2 sm:text-base"
              />

              <div className="flex items-end justify-between gap-2 pt-2">
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={goToSignUp}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-slate-50 sm:px-3 sm:text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden xs:inline">File</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToSignUp}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-slate-50 sm:px-3 sm:text-sm"
                  >
                    <Folder className="h-4 w-4" />
                    <span className="hidden xs:inline">Assets</span>
                  </button>

                  <div ref={menuRef} className="relative">
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded={isModelMenuOpen}
                      onClick={() => setIsModelMenuOpen((open) => !open)}
                      className={`inline-flex h-9 max-w-[158px] items-center gap-1.5 rounded-xl border px-2.5 text-xs font-medium transition-colors sm:max-w-[220px] sm:px-3 sm:text-sm ${
                        isModelMenuOpen
                          ? "border-[#7864ff]/40 bg-[#f5f2ff] text-[#5f49e8]"
                          : "border-slate-200 bg-white text-foreground hover:bg-slate-50"
                      }`}
                    >
                      <Box className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {isAuto ? "Model" : selectedModel?.name || "Model"}
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 shrink-0 transition-transform ${isModelMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isModelMenuOpen && (
                      <div
                        role="dialog"
                        aria-label="Models"
                        className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-[min(400px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_18px_55px_rgba(34,31,64,0.18)] sm:left-0 sm:w-[400px] sm:translate-x-0"
                      >
                        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="text-base font-semibold text-slate-900">Models</span>
                            <button
                              type="button"
                              onClick={goToSignUp}
                              className="inline-flex h-7 items-center gap-1 rounded-full bg-gradient-to-r from-[#d761dc] to-[#ff5e63] px-3 text-[10px] font-semibold text-white shadow-sm"
                            >
                              <Gem className="h-3 w-3" />
                              UNLOCK ALL MODELS
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={toggleAuto}
                            className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-700"
                            aria-pressed={isAuto}
                          >
                            Auto
                            <span
                              className={`relative h-5 w-9 rounded-full transition-colors ${isAuto ? "bg-slate-950" : "bg-slate-300"}`}
                            >
                              <span
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isAuto ? "translate-x-[18px]" : "translate-x-0.5"}`}
                              />
                            </span>
                          </button>
                        </div>

                        <div className="mx-3 grid grid-cols-3 rounded-lg bg-slate-50 p-1">
                          {(["image", "video", "text"] as ModelCategory[]).map((category) => {
                            const Icon = categoryIcons[category];
                            return (
                              <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`flex h-8 items-center justify-center gap-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                                  activeCategory === category
                                    ? "bg-white text-slate-950 shadow-sm"
                                    : "text-slate-600 hover:text-slate-950"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5 sm:hidden" />
                                {category}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-2 max-h-[340px] overflow-y-auto px-2 pb-2">
                          {modelGroups[activeCategory].map((model) => {
                            const isSelected = !isAuto && selectedModel?.name === model.name;
                            return (
                              <button
                                key={model.name}
                                type="button"
                                onClick={() => selectModel(model)}
                                className={`flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                                  isSelected ? "bg-[#f2efff]" : "hover:bg-slate-50"
                                }`}
                              >
                                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden ${model.isFast ? "rounded-full bg-slate-950 text-white" : "rounded-md bg-white"}`}>
                                  {model.logo ? (
                                    <NextImage
                                      src={model.logo}
                                      alt=""
                                      width={28}
                                      height={28}
                                      unoptimized
                                      className="h-7 w-7 object-contain"
                                    />
                                  ) : model.isFast ? (
                                    <Zap className="h-3.5 w-3.5 fill-current" />
                                  ) : (
                                    <Sparkles className="h-3.5 w-3.5" />
                                  )}
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span className="flex items-center gap-1.5">
                                    <span className="truncate text-sm font-medium text-slate-900">
                                      {model.name}
                                    </span>
                                    {model.isNew && (
                                      <span className="rounded bg-[#8a70ff] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white">
                                        NEW
                                      </span>
                                    )}
                                  </span>
                                  <span className="mt-0.5 block truncate text-xs text-slate-500">
                                    {model.description}
                                  </span>
                                  {model.credits && (
                                    <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                                      {model.credits}
                                    </span>
                                  )}
                                </span>

                                {isSelected && (
                                  <Check className="mt-1 h-4 w-4 shrink-0 text-slate-950" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  aria-label="Create music video"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
                    prompt.trim()
                      ? "bg-slate-950 text-white shadow-md hover:-translate-y-0.5 hover:bg-black"
                      : "bg-slate-200 text-white hover:bg-slate-300"
                  }`}
                >
                  <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MvAgentPromptMock;
