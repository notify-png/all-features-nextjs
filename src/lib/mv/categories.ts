// Server-only — reads all 100 MV slug configs and groups them by the new
// benefit-driven category structure used on /features/music-video-generator.
//
// Old (taxonomic, 7 cats) → New (benefit/scenario-driven, 6 cats):
//   Workflow            → "tools"      "Start your way"        (8)
//   Genre               → "sound"      "Made for your sound"   (35)
//   Visual Style + MV Type → "look"    "Pick the look"         (25)
//   Platform            → "platforms"  "Ship to every feed"    (8)
//   Occasion / Viral    → "moments"    "For every moment"      (14)
//   For Who             → "craft"      "Built for your craft"  (10)
import { getAllSlugs, getConfig } from "@/lib/mv/data";

export type MvCategoryId = "tools" | "sound" | "look" | "platforms" | "moments" | "craft";

const OLD_TO_NEW: Record<string, MvCategoryId> = {
  Workflow: "tools",
  Genre: "sound",
  "Visual Style": "look",
  "MV Type": "look",
  Platform: "platforms",
  "Occasion / Viral": "moments",
  "For Who": "craft",
};

// Display order — used by the Quick Jump strip (left→right) so the chip
// order mirrors the row layout in MvExploreSection (top→down).
// Row 1: moments + platforms · Row 2: sound · Row 3: look · Row 4: tools + craft
export const MV_CATEGORY_ORDER: MvCategoryId[] = [
  "moments",
  "platforms",
  "sound",
  "look",
  "tools",
  "craft",
];

export interface MvSlugInfo {
  slug: string;
  name: string; // genre_name (kept English — per user convention)
  accent: string; // hex color for the dot in front of the chip
}

export interface MvCategoryData {
  id: MvCategoryId;
  slugs: MvSlugInfo[];
}

let _cached: MvCategoryData[] | null = null;

export function getMvCategories(): MvCategoryData[] {
  if (_cached) return _cached;

  const slugs = getAllSlugs();
  const grouped: Record<MvCategoryId, MvSlugInfo[]> = {
    tools: [], sound: [], look: [], platforms: [], moments: [], craft: [],
  };

  for (const slug of slugs) {
    const cfg = getConfig(slug);
    const newCat = OLD_TO_NEW[cfg.category];
    if (!newCat) continue;
    grouped[newCat].push({
      slug,
      name: cfg.genre_name,
      accent: cfg.color_accent,
    });
  }

  // Alphabetical inside each category for predictable layout / scan-ability
  for (const id of MV_CATEGORY_ORDER) {
    grouped[id].sort((a, b) => a.name.localeCompare(b.name));
  }

  _cached = MV_CATEGORY_ORDER.map((id) => ({ id, slugs: grouped[id] }));
  return _cached;
}
