import fs from 'fs'
import path from 'path'
import { MvConfig, PexelsPhoto } from '@/lib/mv/data'
import { publicAssetUrl } from '@/lib/publicAssetUrl'

const PICSUM_SLUGS = new Set([
  '3d-music-video', 'abstract-music-video', 'surreal-music-video',
  'minimalist-music-video', 'pixel-art-music-video', 'music-visualizer',
  'vaporwave-music-video', 'neon-noir-music-video', 'text-to-music-video',
  'anime-music-video', 'animated-music-video', 'comic-book-music-video',
  'ai-storyboard-music-video',
])

const DIRECT: Record<string, string> = {
  'hip-hop-music-video':            'concert,rapper,microphone',
  'rnb-music-video':                'concert,singer,soul',
  'lofi-music-video':               'cafe,headphones,aesthetic',
  'kpop-music-video':               'concert,performer,colorful',
  'jpop-music-video':               'concert,performer,stage',
  'cpop-music-video':               'concert,stage,performance',
  'edm-music-video':                'festival,concert,lights',
  'synthwave-music-video':          'neon,night,lights',
  'cyberpunk-music-video':          'neon,city,night',
  'anime-music-video':              'colorful,art,illustration',
  'afrobeats-music-video':          'dance,colorful,concert',
  'amapiano-music-video':           'dance,concert,colorful',
  'phonk-music-video':              'night,car,city',
  'trap-music-video':               'concert,studio,urban',
  'drill-music-video':              'concert,urban,city',
  'reggaeton-music-video':          'dance,concert,latin',
  'bollywood-music-video':          'dance,colorful,fashion',
  'music-video-for-tiktok':         'phone,social,creator',
  'music-video-for-youtube':        'creator,camera,studio',
  'music-video-for-reels':          'phone,creator,aesthetic',
  'music-video-for-spotify-canvas': 'headphones,music,streaming',
  'music-video-for-apple-music':    'headphones,music,aesthetic',
  'music-video-for-snapchat':       'phone,social,portrait',
  'music-video-for-shorts':         'phone,video,creator',
  'music-video-for-twitter':        'social,creator,content',
  'photo-to-music-video':           'photography,portrait,camera',
  'lyrics-to-music-video':          'writing,notebook,music',
  'song-to-music-video':            'studio,microphone,music',
  'slideshow-music-video':          'photos,memories,portrait',
  'lyric-video':                    'typography,text,design',
  'animated-music-video':           'colorful,art,creative',
  'concert-music-video':            'concert,crowd,stage',
  'narrative-music-video':          'cinema,film,dramatic',
  'performance-music-video':        'stage,performer,spotlight',
  'lip-sync-music-video':           'singer,microphone,closeup',
  'wedding-music-video':            'wedding,bride,ceremony',
  'birthday-music-video':           'birthday,celebration,party',
  'christmas-music-video':          'christmas,snow,winter',
  'halloween-music-video':          'halloween,dark,night',
  'graduation-music-video':         'graduation,celebration,success',
  'valentines-music-video':         'love,romantic,flowers',
  'baby-music-video':               'baby,family,cute',
  'pet-music-video':                'dog,cat,cute',
  'travel-music-video':             'travel,landscape,adventure',
  'fitness-music-video':            'fitness,workout,gym',
  'couple-music-video':             'couple,love,sunset',
  'family-music-video':             'family,outdoor,happy',
  'memorial-music-video':           'nature,peaceful,light',
  'new-year-music-video':           'fireworks,celebration,night',
  'music-video-for-bands':          'band,concert,stage',
  'music-video-for-rappers':        'concert,microphone,urban',
  'music-video-for-djs':            'dj,festival,music',
  'music-video-for-labels':         'studio,recording,music',
  'music-video-for-brands':         'brand,marketing,creative',
  'music-video-for-musicians':      'musician,guitar,concert',
  'music-video-for-worship':        'church,light,choir',
  'music-video-for-kids':           'cartoon,animation,colorful',
  'music-video-for-podcasters':     'podcast,microphone,studio',
  'music-video-for-game-trailers':  'gaming,controller,dramatic',
  'horror-music-video':             'dark,dramatic,moody',
  'fantasy-music-video':            'forest,magic,dramatic',
  'watercolor-music-video':         'watercolor,painting,art',
  'comic-book-music-video':         'comic,illustration,art',
  'retro-music-video':              'vintage,retro,film',
  'cinematic-music-video':          'cinema,film,dramatic',
  'realistic-music-video':          'portrait,photography,music',
  'vertical-music-video':           'mobile,portrait,social',
  'ai-music-video-maker':           'creative,art,music',
  'free-music-video-generator':     'music,creative,art',
  'ai-music-video-editor':          'editing,video,creative',
  'ai-storyboard-music-video':      'storyboard,creative,film',
  'ai-music-video-with-subtitles':  'music,text,video',
}

function simpleHash(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) >>> 0
  }
  return h
}

/**
 * Gallery asset overrides — supports BOTH images and video clips.
 *
 * Per-slug: drop files at `public/mv-gallery/<slug>/{1,2,3}.<ext>` where
 *   image: webp / png / jpg / jpeg / gif
 *   video: mp4  / webm / mov
 * They'll replace the Pexels/LoremFlickr placeholder for that slot. Mix
 * freely (e.g. `1.mp4 + 2.webp + 3.jpg`).
 *
 * Pool fallback (for slot 1 only — the prominent hero/large slot):
 *   `public/mv-gallery/_pool/{1..N}.mp4` (or webm/webp/gif)
 *   Picked deterministically by slug hash so each slug consistently shows
 *   the same MV clip. Keeps thumb slots as static images to limit bandwidth.
 *
 * Probed once per build per slug.
 */
const VIDEO_EXTS = ['mp4', 'webm', 'mov'] as const;
const IMAGE_EXTS = ['webp', 'png', 'jpg', 'jpeg', 'gif'] as const;
const CUSTOM_EXTS = [...VIDEO_EXTS, ...IMAGE_EXTS] as const;

export type AssetType = 'image' | 'video';
export interface GalleryAsset { url: string; type: AssetType }

function detectType(ext: string): AssetType {
  return (VIDEO_EXTS as readonly string[]).includes(ext) ? 'video' : 'image';
}

const _customCache = new Map<string, Map<number, GalleryAsset | null>>();
let _poolCache: { files: string[] } | null = null;

function getCustomGalleryAsset(slug: string, idx: number): GalleryAsset | null {
  let slugMap = _customCache.get(slug);
  if (!slugMap) {
    slugMap = new Map();
    _customCache.set(slug, slugMap);
  }
  if (slugMap.has(idx)) return slugMap.get(idx)!;

  const dir = path.join(process.cwd(), 'public', 'mv-gallery', slug);
  if (!fs.existsSync(dir)) {
    slugMap.set(idx, null);
    return null;
  }
  for (const ext of CUSTOM_EXTS) {
    const abs = path.join(dir, `${idx}.${ext}`);
    if (fs.existsSync(abs)) {
      const asset: GalleryAsset = {
        url: publicAssetUrl(`/mv-gallery/${slug}/${idx}.${ext}`),
        type: detectType(ext),
      };
      slugMap.set(idx, asset);
      return asset;
    }
  }
  slugMap.set(idx, null);
  return null;
}

function getPoolAsset(seed: number): GalleryAsset | null {
  if (!_poolCache) {
    const poolDir = path.join(process.cwd(), 'public', 'mv-gallery', '_pool');
    if (!fs.existsSync(poolDir)) {
      _poolCache = { files: [] };
    } else {
      _poolCache = {
        files: fs.readdirSync(poolDir).filter((f) =>
          (CUSTOM_EXTS as readonly string[]).some((ext) => f.toLowerCase().endsWith(`.${ext}`))
        ).sort(),
      };
    }
  }
  if (_poolCache.files.length === 0) return null;
  const pick = _poolCache.files[seed % _poolCache.files.length];
  const ext = pick.split('.').pop()!.toLowerCase();
  return { url: publicAssetUrl(`/mv-gallery/_pool/${pick}`), type: detectType(ext) };
}

/**
 * Public API: get the gallery asset for a slug at slot idx (1-3).
 * Slot 1 (large/hero) prefers video; slots 2-3 stay images unless overridden.
 */
export function getGalleryAsset(
  cfg: MvConfig,
  w: number,
  h: number,
  idx: number,
  imageCache: Record<string, PexelsPhoto[]> = {}
): GalleryAsset {
  // 1) per-slug override (any extension)
  const custom = getCustomGalleryAsset(cfg.slug, idx);
  if (custom) return custom;
  // 2) pool fallback — only for slot 1 (the prominent hero spot)
  if (idx === 1) {
    const pool = getPoolAsset(simpleHash(cfg.slug));
    if (pool) return pool;
  }
  // 3) existing image pipeline (Pexels → Picsum → LoremFlickr)
  return { url: flickrUrl(cfg, w, h, idx, imageCache), type: 'image' };
}

export function flickrUrl(
  cfg: MvConfig,
  w: number,
  h: number,
  idx: number = 0,
  imageCache: Record<string, PexelsPhoto[]> = {}
): string {
  // (overrides + pool are now handled by getGalleryAsset which calls this
  // function as its image fallback — don't re-check overrides here)
  const slug = cfg.slug
  const vk = cfg.visual_keywords || []
  const seed = simpleHash(slug + String(idx)) % 9999

  // Prefer Pexels cache
  const photos = imageCache[slug] || []
  if (photos.length > 0) {
    const photo = photos[idx % photos.length]
    return (w >= 500 ? photo.hero : photo.thumb) || photo.thumb
  }

  // Use Picsum for abstract/animation slugs
  if (PICSUM_SLUGS.has(slug)) {
    return `https://picsum.photos/seed/${seed + idx * 17}/${w}/${h}`
  }

  // Direct slug → keywords
  const kw = DIRECT[slug] || (vk.length > 0 ? vk[0].toLowerCase().replace(/\s+/g, ',') : 'music,concert,art')

  return `https://loremflickr.com/${w}/${h}/${kw}?lock=${seed + idx * 13}`
}
