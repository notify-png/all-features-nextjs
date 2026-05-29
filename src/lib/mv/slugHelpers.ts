import { MvConfig, MvContent } from '@/lib/mv/data'
import type { UIStrings } from './i18n'

// djb2 hash — deterministic equivalent to Python hash for simple string picking
export function strHash(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) >>> 0
  }
  return h
}

export function getH1(cfg: MvConfig, t: UIStrings): string {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug

  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    const platform = g.replace('For ', '').replace('for ', '')
    return t.h1Platform(platform)
  }

  if (cat.includes('Occasion') || cat.includes('Viral')) {
    return t.h1Occasion(g)
  }

  if (cat.includes('Workflow')) {
    // Use the full genre_name (e.g. "Free MV Generator", "AI MV Editor", "Photo to MV")
    // rather than the stripped wf — keeps SEO keyword intact and avoids "Turn Your MV into a Music Video"
    return t.h1Workflow(g)
  }

  if (cat.includes('For Who')) {
    const target = g.replace('for ', '').replace('For ', '').trim()
    return t.h1ForWho(target)
  }

  if (cat.includes('Visual Style')) {
    return t.h1Default(g)
  }

  if (cat.includes('MV Type')) {
    return t.h1MVType(g)
  }

  // Genre default
  return t.h1Default(g)
}

export function getLead(cfg: MvConfig, content: MvContent, t: UIStrings): string {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug
  const vk = cfg.visual_keywords || []
  const v0 = vk[0] || 'visuals'

  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    const platform = g.replace('For ', '').replace('for ', '')
    return t.leadPlatform(platform)
  }

  if (cat.includes('Occasion') || cat.includes('Viral')) {
    return t.leadOccasion(g)
  }

  if (cat.includes('Workflow')) {
    // Workflow lead is a fixed SaaS-LP style hook positioning Tunee as the AI music video producer
    return t.leadWorkflow()
  }

  if (cat.includes('For Who')) {
    const target = g.replace('for ', '').replace('For ', '').trim()
    return t.leadForWho(target)
  }

  if (cat.includes('Visual Style')) {
    return t.leadDefault(g, v0)
  }

  // Genre / MV Type default
  return t.leadDefault(g, v0)
}

export function getSiblings(slug: string, allSlugs: string[], n = 3): string[] {
  const others = allSlugs.filter(s => s !== slug)
  const h = strHash(slug)
  const seen = new Set<string>()
  const picks: string[] = []

  for (let i = 0; i < n + 10; i++) {
    const c = others[(h + i * 7) % others.length]
    if (!seen.has(c)) {
      seen.add(c)
      picks.push(c)
    }
    if (picks.length === n) break
  }
  return picks
}

export interface MediumPrompt {
  label: string
  text: string
}

export function getMediumPrompts(cfg: MvConfig, t: UIStrings): MediumPrompt[] {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug
  const vk = cfg.visual_keywords || []
  const mw = cfg.mood_words || []
  const demo = cfg.demo_prompt || ''

  const v0 = vk[0] || 'abstract visuals'
  const v1 = vk[1] || v0
  const v2 = vk[2] || v0
  const m0 = mw[0] || 'cinematic'
  const m1 = mw[1] || m0
  const m2 = mw[2] || m0
  const h = strHash(slug)

  // Occasion / Viral
  if (cat.includes('Occasion') || cat.includes('Viral')) {
    const occasion = g.toLowerCase()
    return [
      {
        label: t.mpLabelHeroMoment,
        text: `Slow-motion close-up of ${v0} as the opening notes play. ${cap(m0)} warmth, soft depth of field. Camera drifts forward to reveal the full ${occasion} scene. First chorus: cut to ${v1}, emotion visible in every detail. No dialogue — pure feeling.`,
      },
      {
        label: t.mpLabelMontage,
        text: `Quick-cut montage of ${occasion} details — ${v0}, ${v1}, ${v2} — each cut on the beat. ${cap(m1)} color grade throughout. Bridge slows to a single held frame, then the final chorus opens wide with ${m0} energy. Ends on a quiet freeze as the last note fades.`,
      },
      {
        label: t.mpLabelDocumentary,
        text: `Fly-on-the-wall: unscripted ${occasion} moments in natural light. ${v0} captured candidly, intercutting with close-ups of ${v1}. ${cap(m2)} tone — warm, real, not staged. Wide establishing shot bookends the piece.`,
      },
    ]
  }

  // Platform-specific
  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    const platform = g.replace('For ', '').replace('for ', '')
    const isVert = ['tiktok', 'reels', 'shorts', 'snapchat'].some(x => slug.includes(x))
    const ratio = isVert ? '9:16 vertical' : '16:9 landscape'
    return [
      {
        label: `Platform Hook — ${platform}`,
        text: `${cap(ratio)} frame. Hook in the first 3 seconds: tight close-up of ${v0}, hard cut to the artist on the beat drop. ${cap(m0)} grade, high contrast. Text overlay at the chorus — clean sans-serif, bottom third. Runtime: 30–45 s.`,
      },
      {
        label: `Trending ${platform} Aesthetic`,
        text: `${cap(m1)} visual style built for ${platform} — ${v1} in the background, transitions locked to every 4-beat phrase. Fast cuts on the hook, one slow-motion beat mid-song for emotional impact. Designed to hold watch-time past 50%.`,
      },
      {
        label: `Performance Cut for ${platform}`,
        text: `Artist-forward ${ratio} — ${v0} surrounding the performer, camera movement synced to rhythm. ${cap(m2)} lighting, no overlays — pure energy. Optimised for full-screen mobile, shareable to Stories and Reels.`,
      },
    ]
  }

  // For Who
  if (cat.includes('For Who')) {
    const target = g.replace('for ', '').replace('For ', '')
    return [
      {
        label: t.mpLabelSignature,
        text: `A look built for ${target}: ${v0} as the recurring motif, ${m0} color science consistent throughout. Tight close-ups alternate with wides. Every frame is a potential still for press or social.`,
      },
      {
        label: t.mpLabelContentSeries,
        text: `Episode one of a visual series for ${target}. Opens with ${v0} animation, into the main section. ${cap(m0)} transitions to ${m2} by the outro — leaving room for escalation. Same grammar repeated: ${v1} texture, ${m1} palette.`,
      },
      {
        label: t.mpLabelReleaseDay,
        text: `Launch energy: ${v0} builds from static to kinetic over 30 seconds. Three-act arc — intro (${m0}), build (${m1}), payoff (${m2}). Track title appears top-frame at 0 s, minimal lower-third. ${v2} throughout.`,
      },
    ]
  }

  // Workflow — labels & body fully localised; positions Tunee as the AI music video producer
  if (cat.includes('Workflow')) {
    return [
      { label: t.mpLabelSceneByScene, text: t.mpTextSceneByScene(v0, m0) },
      { label: t.mpLabelAbstractAudioReactive, text: t.mpTextAbstractAudioReactive(v0, v1, v2, m0, m1, m2) },
      { label: t.mpLabelThreeChapter, text: t.mpTextThreeChapter(v0, v1, v2, m0, m1, m2) },
    ]
  }

  // Genre / Visual Style / MV Type (default)
  const perf = [
    `Artist silhouette lit from behind by ${v0}, smoke curling upward. Camera dollies left in the verse, cuts to close-up at the chorus. ${cap(m0)} mood, rich shadow. Background: shifting ${v1} layers.`,
    `Live energy: artist surrounded by ${v1}. ${cap(m0)} atmosphere. Jump-cut on every beat — fast in the hook, slow in the bridge. End frame: single spotlight, ${v0} fading to black.`,
    `Split-screen: performance left, abstract ${v1} right. Both react to the same beat. ${cap(m1)} palette. Merge into full-frame at the final chorus.`,
  ]
  const abstract = [
    `Zero-gravity: ${v0} drifts and collides in ${m2} slow motion. Each snare triggers a burst of ${v2}. Final bar: everything collapses into a beam of light.`,
    `Macro world — extreme close-up on ${v0}, pulling back to reveal full ${v2} landscape. ${cap(m0)} colour science. End on a wide static shot as the last note rings out.`,
    `Time-lapse: ${v1} evolves raw→refined over the track. Visual pace mirrors energy. ${cap(m2)} tones warm to ${m0} by the outro. One continuous morph — no cuts.`,
  ]

  return [
    {
      label: t.mpLabelScene,
      text: `${demo}. Wide establishing shot, slow push-in. ${cap(m0)} lighting — golden edges, deep contrast centre. ${cap(v0)} fills the background. Beat drop triggers a hard cut to a new angle.`,
    },
    {
      label: t.mpLabelPerformance,
      text: perf[h % 3],
    },
    {
      label: t.mpLabelAbstract,
      text: abstract[(h + 1) % 3],
    },
  ]
}

export interface PersonaBlock {
  label: string
  desc: string
}

export function getPersonaBlocks(cfg: MvConfig, content: MvContent, t: UIStrings): PersonaBlock[] {
  const cat = cfg.category || ''
  const slug = cfg.slug
  const g = cfg.genre_name
  const p = content.personas

  const isOcc = cat.includes('Occasion') || cat.includes('Viral')
  const isPlat = cat.includes('Platform') || slug.startsWith('music-video-for-')
  const isWho = cat.includes('For Who')
  const isWf = cat.includes('Workflow')

  let labels: string[]

  if (isOcc) {
    if (slug.includes('valentines')) {
      labels = ['Couples & Partners', 'Friends Making Gifts', 'Wedding & Event Planners', 'Brands & Florists']
    } else if (slug.includes('wedding') || slug.includes('couple')) {
      labels = ['Couples & Newlyweds', 'Wedding Videographers', 'Wedding Planners', 'Wedding Brands']
    } else if (slug.includes('birthday')) {
      labels = ['Friends & Family', 'Party Planners', 'Celebration Creators', 'Event Businesses']
    } else if (slug.includes('christmas') || slug.includes('new-year')) {
      labels = ['Families & Friends', 'Lifestyle Creators', 'Event Organizers', 'Holiday Brands']
    } else if (slug.includes('graduation')) {
      labels = ['Graduates & Their Families', 'Schools & Universities', 'Event Planners', 'Education Brands']
    } else if (slug.includes('memorial')) {
      labels = ['Families & Loved Ones', 'Memorial Service Providers', 'Tribute Creators', 'Non-profits']
    } else if (slug.includes('baby')) {
      labels = ['New Parents', 'Family Photographers', 'Baby Brands', 'Grandparents & Relatives']
    } else if (slug.includes('pet')) {
      labels = ['Pet Owners & Animal Lovers', 'Pet Content Creators', 'Vet Clinics & Pet Shops', 'Animal Shelters']
    } else if (slug.includes('travel')) {
      labels = ['Travelers & Adventurers', 'Travel Creators', 'Travel Agencies', 'Tourism Brands']
    } else if (slug.includes('fitness')) {
      labels = ['Fitness Enthusiasts', 'Personal Trainers', 'Gym & Studio Owners', 'Fitness Brands']
    } else if (slug.includes('halloween')) {
      labels = ['Party Hosts & Fans', 'Horror Content Creators', 'Event Planners', 'Entertainment Brands']
    } else {
      labels = ['Individuals & Families', 'Memory Keepers', 'Event Planners', 'Celebration Brands']
    }
  } else if (isPlat) {
    const platform = g.replace('For ', '').replace('for ', '')
    labels = ['Independent Artists', `${platform} Content Creators`, 'Labels & Management', 'Marketing Teams']
  } else if (isWho) {
    const target = g.replace('for ', '').replace('For ', '')
    labels = [target, 'Music Producers & Collaborators', 'Managers & Labels', 'Brands Partnering with Music']
  } else if (isWf) {
    labels = [t.personaLabelSolo, t.personaLabelCreators, t.personaLabelProduction, t.personaLabelMarketing]
  } else {
    labels = [t.personaLabelMusicians, t.personaLabelCreators, t.personaLabelLabels, t.personaLabelBrands]
  }

  const descs = [p.musicians, p.creators, p.labels, p.brands]
  return labels.map((label, i) => ({ label, desc: descs[i] }))
}

export function getWhoUsesTitle(cfg: MvConfig, t: UIStrings): string {
  const cat = cfg.category || ''
  const slug = cfg.slug
  const g = cfg.genre_name

  if (cat.includes('Occasion') || cat.includes('Viral')) return t.whoUsesOccasion
  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    return t.whoUsesPlatform(g.replace('For ', '').replace('for ', ''))
  }
  if (cat.includes('For Who')) return t.whoUsesForWho
  if (cat.includes('Workflow')) return t.whoUsesWorkflow
  return t.whoUsesTitle
}

export interface UseCase {
  tag: string
  title: string
  desc: string
}

export function getUseCases(cfg: MvConfig, t: UIStrings): UseCase[] {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug

  const isOcc = cat.includes('Occasion') || cat.includes('Viral')
  const isPlat =
    (cat.includes('Platform') || slug.startsWith('music-video-for-')) &&
    !['indie', 'bands', 'rappers', 'djs', 'labels', 'brands', 'musicians', 'worship', 'kids', 'podcasters', 'game'].some(x => slug.includes(x))
  const isWho = cat.includes('For Who')
  const isWf = cat.includes('Workflow')

  const glo = g.toLowerCase()
  const gClean = g.replace('For ', '').replace('for ', '').trim()

  if (isOcc) {
    return [
      { tag: 'Personal keepsake', title: 'The memory video', desc: `Upload the song that defined your ${glo} moment. Describe what happened — Tunee turns it into a cinematic narrative you'll keep forever.` },
      { tag: 'Meaningful present', title: 'A gift for someone', desc: `Create a personalized music video as a gift. Combine their favorite track with visuals that tell their story — no film crew needed.` },
      { tag: 'Social & shareable', title: 'Share the moment', desc: `Post a ${glo} music video before or after the event — as an announcement, thank-you, or highlight that moves.` },
    ]
  }

  if (isPlat) {
    return [
      { tag: 'Release day ready', title: 'Promote a new release', desc: `Turn your single into a ${gClean}-ready visual in minutes. Upload, prompt, export — formatted perfectly for the platform.` },
      { tag: 'Content at scale', title: 'Grow your presence', desc: `Consistent music video content without a production budget. More posts, more reach, same quality every time.` },
      { tag: 'Recognizable identity', title: 'Build a visual brand', desc: `Give your music a signature look on ${gClean}. Fans recognize your style before they see your name.` },
    ]
  }

  if (isWho) {
    return [
      { tag: 'Release-day visual', title: 'Single release', desc: `Upload your new track and have a professional-looking ${glo} music video ready for the drop date. No editor, no waiting.` },
      { tag: 'Catalog coverage', title: 'Content series', desc: `Turn every track into a visual. Build a consistent aesthetic across your catalog without a creative team on payroll.` },
      { tag: 'Industry-ready demo', title: 'Pitch & promo', desc: `Create a visual to pitch your track to labels, sync agents, or brand partners. Show your sound before they hear it.` },
    ]
  }

  if (isWf) {
    // Workflow uses fixed translated SaaS-LP copy — no wf injection
    return [
      { tag: t.ucTagWf1, title: t.ucTitleWf1, desc: t.ucDescWf1 },
      { tag: t.ucTagWf2, title: t.ucTitleWf2, desc: t.ucDescWf2 },
      { tag: t.ucTagWf3, title: t.ucTitleWf3, desc: t.ucDescWf3 },
    ]
  }

  // Genre / Visual Style / MV Type
  return [
    { tag: t.ucTag1, title: t.ucTitle1, desc: t.ucDesc1(glo) },
    { tag: t.ucTag2, title: t.ucTitle2, desc: t.ucDesc2(glo) },
    { tag: t.ucTag3, title: t.ucTitle3, desc: t.ucDesc3(glo) },
  ]
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Category-aware badge text shown in the GenProcess card top pill.
// Workflow → fixed translated badge (e.g. "AI Music Video · Workflow").
// MV Type genre_name already contains "Video"/"音樂影片" → just show genre_name to avoid "Lyric Video Music Video".
// Everything else (Genre / Platform / Occasion / For Who / Visual Style): "{g} {Music Video}".
export function getGpBadge(cfg: MvConfig, t: UIStrings): string {
  const cat = cfg.category || ''
  const g = cfg.genre_name

  if (cat.includes('Workflow')) return t.gpBadgeWorkflow
  if (cat.includes('MV Type')) return g
  return `${g} ${t.gpBadgeMvSuffix}`
}
