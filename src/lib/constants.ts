export const SITE_URL = "https://www.tunee.ai";
export const SITE_NAME = "Tunee";
export const SITE_DESCRIPTION =
  "Tunee is a next-generation AI creative agent for music and virtual artist video creation.";

export const NAV_ITEMS = [
  { labelKey: "home", href: "https://www.tunee.ai", external: true },
  { labelKey: "aboutUs", href: "https://www.tunee.ai/about-us", external: true },
  {
    labelKey: "customerStories",
    href: "https://www.tunee.ai/customer-stories",
    external: true,
  },
  { labelKey: "features", href: "/features", external: false },
] as const;

export const ROUTE_LABELS: Record<string, string> = {
  features: "Features",
  "music-video-generator": "Music Video Generator",
  "lip-sync": "Lip Sync",
  "ai-dancing": "AI Dancing",
  "ai-singer": "AI Singer",
  "motion-control": "Motion Control",
};

export const EXTERNAL_FEATURE_LINKS: Record<string, string> = {
  "music-video-generator":
    "https://www.tunee.ai/features/music-video-generator",
};

export const INTERNAL_ROUTES = ["features"];

export const FOOTER_RESOURCE_ITEMS = [
  { labelKey: "resourceAboutUs", href: "https://www.tunee.ai/about-us" },
  { labelKey: "resourceCustomerStories", href: "https://www.tunee.ai/customer-stories" },
  { labelKey: "resourceCreatorProgram", href: "https://www.tunee.ai/creator-program" },
  { labelKey: "resourceAffiliateProgram", href: "https://www.tunee.ai/affiliate" },
  { labelKey: "resourceEvents", href: "https://www.tunee.ai/events" },
] as const;

export const FOOTER_FEATURE_ITEMS = [
  { labelKey: "featureAiMusicAgent", href: "https://www.tunee.ai/music-agent" },
  {
    labelKey: "featureMusicVideo",
    href: "https://www.tunee.ai/features/music-video-generator",
  },
  { labelKey: "featureAiSinger", href: "https://www.tunee.ai/virtual-artist" },
  { labelKey: "featureLipSync", href: "https://www.tunee.ai/features/lip-sync" },
  { labelKey: "featureAiDancing", href: "https://www.tunee.ai/features/ai-dancing" },
  {
    labelKey: "featureMotionControl",
    href: "https://www.tunee.ai/features/motion-control",
  },
] as const;

export const FOOTER_POLICY_ITEMS = [
  { labelKey: "policyTerms", href: "https://www.tunee.ai/terms-of-service" },
  { labelKey: "policyPrivacy", href: "https://www.tunee.ai/privacy-policy" },
] as const;

export const FOOTER_OTHER_ITEMS = [
  { labelKey: "otherFeedback", href: "https://forum.tunee.ai" },
  { labelKey: "otherFAQ", href: "https://www.tunee.ai/faq" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@tunee_aiagent", label: "YouTube" },
  { href: "https://x.com/tunee_ai", label: "X" },
  {
    href: "https://www.instagram.com/tunee_aiagent/",
    label: "Instagram",
  },
  { href: "https://www.tiktok.com/@tunee_ai", label: "TikTok" },
  { href: "https://discord.com/invite/zxCyCmUWC3", label: "Discord" },
];
