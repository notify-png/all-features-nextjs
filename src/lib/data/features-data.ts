import {
  Music,
  Video,
  Mic2,
  Sparkles,
  Camera,
  Layers,
  Headphones,
  Waves,
  Settings2,
  MicVocal,
} from "lucide-react";
import { publicAssetUrl } from "../../../lib/publicAssetUrl";

export const MUSIC_MODELS = [
  {
    name: "MiniMax",
    href: "https://www.tunee.ai",
    icon: Music,
    description: "Rich tonal expression with multi-genre AI music generation",
  },
  {
    name: "Mureka",
    href: "https://www.tunee.ai",
    icon: Music,
    description: "Melody-focused AI engine with deep emotional composition",
  },
  {
    name: "Ace-Step",
    href: "https://www.tunee.ai",
    icon: Music,
    description: "Precise control over tempo, rhythm and arrangement",
  },
  {
    name: "TemPolor",
    href: "https://www.tunee.ai",
    icon: Music,
    description: "Fast, high-quality AI music across multiple styles",
  },
];

export const ALL_FEATURES = [
  {
    name: "Music Generation",
    href: "https://www.tunee.ai",
    icon: Headphones,
    description: "Complete songs with AI vocals, lyrics and instrumentals",
  },
  {
    name: "Instrumental Generation",
    href: "https://www.tunee.ai",
    icon: Waves,
    description: "Pure instrumental tracks for beats and cinematic scoring",
  },
  {
    name: "Stem Separation",
    href: "https://www.tunee.ai",
    icon: Layers,
    description: "Isolate vocals, drums, bass and instruments from any track",
  },
  {
    name: "Mastering",
    href: "https://www.tunee.ai",
    icon: Settings2,
    description: "AI mastering for loudness, EQ and release-ready quality",
  },
  {
    name: "Voice Cloning",
    href: "https://www.tunee.ai",
    icon: MicVocal,
    description: "Clone any voice and apply it to your AI-generated songs",
  },
  {
    name: "Cover",
    href: "https://www.tunee.ai",
    icon: Mic2,
    description: "Coming Soon",
  },
  {
    name: "Music Video",
    href: "/features/music-video-generator",
    icon: Video,
    description: "Transform music into stunning AI-generated music videos",
  },
  {
    name: "Lip Sync",
    href: "/features/lip-sync",
    icon: Mic2,
    description: "Create realistic lip-sync videos with AI virtual artists",
  },
  {
    name: "AI Dancing",
    href: "/features/ai-dancing",
    icon: Sparkles,
    description: "Generate dynamic dancing videos powered by AI",
  },
  {
    name: "Motion Control",
    href: "/features/motion-control",
    icon: Camera,
    description: "Precise AI motion control for dynamic video creation",
  },
];

export const MODEL_PAGES = [
  [
    {
      name: "Nano Banana Pro",
      type: "Image",
      desc: "Advanced reasoning, photorealistic quality",
      img: publicAssetUrl("/assets/models/nano-banana-pro.jpg"),
    },
    {
      name: "Kling O1",
      type: "Music Video",
      desc: "Director-level consistency, max 10s per shot",
      img: publicAssetUrl("/assets/models/kling-o1.jpg"),
    },
    {
      name: "Kling Motion 2.6",
      type: "Motion Control",
      desc: "Precise control, native audio generation",
      img: publicAssetUrl("/assets/models/kling-motion.jpg"),
    },
    {
      name: "Kling Avatar 2.0",
      type: "Lipsync",
      desc: "Expressive talking head, emotion control",
      img: publicAssetUrl("/assets/models/kling-avatar.jpg"),
    },
    {
      name: "Seedance 1.5 Pro",
      type: "Shorts",
      desc: "Audio-visual sync, multilingual dialogue",
      img: publicAssetUrl("/assets/models/seedance.jpg"),
    },
  ],
  [
    {
      name: "Seedream 4.5",
      type: "Image",
      desc: "Fast generation, strong character consistency",
      img: publicAssetUrl("/assets/models/seedream.jpg"),
    },
    {
      name: "Kling Shorts 2.6",
      type: "Shorts",
      desc: "Short-form video with cinematic quality",
      img: publicAssetUrl("/assets/models/kling-shorts.jpg"),
    },
    {
      name: "InfiniteTalk",
      type: "Lipsync",
      desc: "Natural lip sync, unlimited duration",
      img: publicAssetUrl("/assets/models/infinitetalk.jpg"),
    },
  ],
  [
    {
      name: "Tempolor v4.5",
      type: "Music",
      desc: "Proprietary model, standout vocals",
      img: publicAssetUrl("/assets/models/tempolor.jpg"),
    },
    {
      name: "Mureka V8",
      type: "Music",
      desc: "Publishable quality with enhanced musicality",
      img: publicAssetUrl("/assets/models/mureka-o2.jpg"),
    },
    {
      name: "ACE-Step 1.5",
      type: "Music",
      desc: "Multilingual flagship, precise style control",
      img: publicAssetUrl("/assets/models/ace-step.jpg"),
    },
    {
      name: "MiniMax 2.5",
      type: "Music",
      desc: "Expressive vocals with richer arrangements",
      img: publicAssetUrl("/assets/models/minimax.jpg"),
    },
    {
      name: "HeartMuLa 3B",
      type: "Music",
      desc: "High-fidelity music, fine-grained control",
      img: publicAssetUrl("/assets/models/heartmula.jpg"),
    },
  ],
];

export const ALL_MODELS = MODEL_PAGES.flat();

export const FEATURES_FAQ = [
  {
    value: "item-1",
    question: "What is Tunee?",
    answer:
      "Tunee is a next-generation AI creative agent that helps you create original music and virtual artist content. Simply chat with Tunee to generate songs, music videos, lip-sync performances, and more.",
  },
  {
    value: "item-2",
    question: "How does the AI Music Generation work?",
    answer:
      "Our AI models (MiniMax, Mureka, Ace-Step, TemPolor) analyze your prompts to generate original music tracks. You can create full songs with vocals or instrumental tracks, and even get certificate licenses for commercial use.",
  },
  {
    value: "item-3",
    question: "What can I do with Virtual Artist Creation?",
    answer:
      "Create stunning music videos, realistic lip-sync performances, AI dancing videos, and precise motion-controlled content. Your virtual artists can perform any song with professional-quality results.",
  },
  {
    value: "item-4",
    question: "Is Tunee free to use?",
    answer:
      "Yes, you can start creating with Tunee for free. We offer premium plans with additional features, higher quality exports, and more generation credits for professional creators.",
  },
  {
    value: "item-5",
    question: "Can I use Tunee content commercially?",
    answer:
      "Yes! With our Certificate License feature, you can obtain commercial rights for your AI-generated music. All virtual artist content you create is also available for commercial use.",
  },
];

export const AI_DANCING_MODELS = [
  "Seedance 1.5 Pro",
  "Kling Dance",
  "Motion Master AI",
  "Dance Sync Pro",
  "Rhythm Vision",
  "MotionGen 2.0",
  "ChoreographAI",
];

export const AI_SINGER_TECH_LABELS = [
  "Voice Synthesis",
  "Neural Audio",
  "Real-time Generation",
  "Multi-language Support",
  "Emotion AI",
];

export const FEATURES_STATS = [
  { icon: "💬", label: "Just Chat & Create" },
  { icon: "⚡", label: "All-in-One Platform" },
  { icon: "✨", label: "Limitless Creativity" },
];
