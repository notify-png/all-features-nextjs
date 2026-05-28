import { MvConfig, PexelsPhoto } from '@/lib/mv/data'

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
  'music-video-for-kids':           'children,colorful,playful',
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

export function flickrUrl(
  cfg: MvConfig,
  w: number,
  h: number,
  idx: number = 0,
  imageCache: Record<string, PexelsPhoto[]> = {}
): string {
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
