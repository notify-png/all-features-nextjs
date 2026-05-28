import { MvConfig, MvContent } from '@/lib/mv/data'

// djb2 hash — deterministic equivalent to Python hash for simple string picking
export function strHash(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) >>> 0
  }
  return h
}

export function getH1(cfg: MvConfig): string {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug

  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    const platform = g.replace('For ', '').replace('for ', '')
    return `Make AI Music Videos for ${platform}`
  }

  if (cat.includes('Occasion') || cat.includes('Viral')) {
    return `Make a ${g} Music Video from Your Song`
  }

  if (cat.includes('Workflow')) {
    const wf = g
      .replace('AI ', '')
      .replace(' Generator', '')
      .replace(' Editor', '')
      .replace(' Maker', '')
      .trim()
    return `Turn Your ${wf} into a Music Video`
  }

  if (cat.includes('For Who')) {
    const target = g.replace('for ', '').replace('For ', '').trim()
    return `AI Music Videos for ${target}`
  }

  if (cat.includes('Visual Style')) {
    return `Create ${g} Music Videos with AI`
  }

  if (cat.includes('MV Type')) {
    return `Create ${g} with AI`
  }

  // Genre default
  return `Create ${g} Music Videos with AI`
}

export function getLead(cfg: MvConfig, content: MvContent): string {
  const g = cfg.genre_name
  const cat = cfg.category || ''
  const slug = cfg.slug
  const vk = cfg.visual_keywords || []
  const v0 = vk[0] || 'visuals'

  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    const platform = g.replace('For ', '').replace('for ', '')
    return `Upload your track, pick a style, and Tunee generates a perfectly formatted ${platform} music video — ready to upload in minutes.`
  }

  if (cat.includes('Occasion') || cat.includes('Viral')) {
    return `Upload your song, describe the moment, and Tunee turns it into a cinematic ${g.toLowerCase()} music video — no camera, no crew, no editing skills needed.`
  }

  if (cat.includes('Workflow')) {
    const wf = g
      .replace('AI ', '')
      .replace(' Generator', '')
      .replace(' Editor', '')
      .replace(' Maker', '')
      .trim()
      .toLowerCase()
    return `Upload your audio, run the ${wf} workflow, and Tunee produces a polished music video in minutes — no editing experience required.`
  }

  if (cat.includes('For Who')) {
    const target = g.replace('for ', '').replace('For ', '').trim().toLowerCase()
    return `Tunee gives ${target} a fast, professional way to create music videos from any track — upload, prompt, export in minutes.`
  }

  if (cat.includes('Visual Style')) {
    return `Upload your audio and Tunee generates ${g.toLowerCase()}-style music videos with ${v0} — no design tools, no rendering software needed.`
  }

  // Genre / MV Type default
  const firstSentence = content.direct_answer.split('.')[0]
  return firstSentence + '.'
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

export function getMediumPrompts(cfg: MvConfig): MediumPrompt[] {
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
        label: 'The Hero Moment',
        text: `Slow-motion close-up of ${v0} as the opening notes play. ${cap(m0)} warmth, soft depth of field. Camera drifts forward to reveal the full ${occasion} scene. First chorus: cut to ${v1}, emotion visible in every detail. No dialogue — pure feeling.`,
      },
      {
        label: 'Memory Montage',
        text: `Quick-cut montage of ${occasion} details — ${v0}, ${v1}, ${v2} — each cut on the beat. ${cap(m1)} color grade throughout. Bridge slows to a single held frame, then the final chorus opens wide with ${m0} energy. Ends on a quiet freeze as the last note fades.`,
      },
      {
        label: 'Candid Documentary Style',
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
        label: 'Signature Visual Identity',
        text: `A look built for ${target}: ${v0} as the recurring motif, ${m0} color science consistent throughout. Tight close-ups alternate with wides. Every frame is a potential still for press or social.`,
      },
      {
        label: 'Content Series Starter',
        text: `Episode one of a visual series for ${target}. Opens with ${v0} animation, into the main section. ${cap(m0)} transitions to ${m2} by the outro — leaving room for escalation. Same grammar repeated: ${v1} texture, ${m1} palette.`,
      },
      {
        label: 'Release Day Video',
        text: `Launch energy: ${v0} builds from static to kinetic over 30 seconds. Three-act arc — intro (${m0}), build (${m1}), payoff (${m2}). Track title appears top-frame at 0 s, minimal lower-third. ${v2} throughout.`,
      },
    ]
  }

  // Workflow
  if (cat.includes('Workflow')) {
    const wf = g
      .replace('AI ', '')
      .replace(' Generator', '')
      .replace(' Editor', '')
      .replace(' Maker', '')
      .trim()
    return [
      {
        label: `${wf} — Scene by Scene`,
        text: `Text-to-scene: each lyric phrase generates a ${v0} visual match. ${cap(m0)} transitions between stanzas — dissolve on the verse, hard cut on the chorus. Final frame mirrors the opening. Font: clean sans-serif, 60% opacity, bottom third.`,
      },
      {
        label: `${wf} — Abstract Audio-Visual`,
        text: `No literal imagery — pure ${v0} and ${v1} responding to audio energy. Low frequencies shift ${m0} colour; highs trigger ${v2} particle bursts. The arc mirrors emotion: ${m1} in the verse, explosive ${m2} at the drop, calm in the outro.`,
      },
      {
        label: `${wf} — Three-Chapter Narrative`,
        text: `Three chapters synced to song structure. Ch.1 (${m0}): ${v0} wide shot, slow motion. Ch.2 (${m1}): medium close-ups of ${v1}, energy rising. Ch.3 (${m2}): full-frame ${v2}, maximum intensity. Title card at 0 s, clean credit at the end.`,
      },
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
      label: 'Opening Scene',
      text: `${demo}. Wide establishing shot, slow push-in. ${cap(m0)} lighting — golden edges, deep contrast centre. ${cap(v0)} fills the background. Beat drop triggers a hard cut to a new angle.`,
    },
    {
      label: 'Performance Section',
      text: perf[h % 3],
    },
    {
      label: 'Abstract Outro',
      text: abstract[(h + 1) % 3],
    },
  ]
}

export interface PersonaBlock {
  label: string
  desc: string
}

export function getPersonaBlocks(cfg: MvConfig, content: MvContent): PersonaBlock[] {
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
    labels = ['Solo Artists', 'Content Creators', 'Production Teams', 'Marketing Departments']
  } else {
    labels = ['Musicians & Artists', 'Content Creators', 'Labels & Managers', 'Brands & Advertisers']
  }

  const descs = [p.musicians, p.creators, p.labels, p.brands]
  return labels.map((label, i) => ({ label, desc: descs[i] }))
}

export function getWhoUsesTitle(cfg: MvConfig): string {
  const cat = cfg.category || ''
  const slug = cfg.slug
  const g = cfg.genre_name

  if (cat.includes('Occasion') || cat.includes('Viral')) return 'Who makes this kind of video'
  if (cat.includes('Platform') || slug.startsWith('music-video-for-')) {
    return `Who creates ${g.replace('For ', '').replace('for ', '')} content with Tunee`
  }
  if (cat.includes('For Who')) return 'Who is this made for'
  if (cat.includes('Workflow')) return 'Who uses this workflow'
  return 'Who creates with Tunee'
}

export interface UseCase {
  tag: string
  title: string
  desc: string
}

export function getUseCases(cfg: MvConfig): UseCase[] {
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
    const wf = g.replace('AI ', '').replace(' Generator', '').replace(' Editor', '').replace(' Maker', '').trim().toLowerCase()
    return [
      { tag: 'Fast turnaround', title: 'Quick demo', desc: `Go from rough idea to shareable video using the ${wf} workflow in under 5 minutes. Show your sound before the full release.` },
      { tag: 'Full catalog', title: 'Album rollout', desc: `Produce one video per track in the same visual style. Schedule the whole rollout — Tunee handles each one consistently.` },
      { tag: 'Professional pitch', title: 'Collab pitch', desc: `Create a visual to send to collaborators, labels, or sync agents. A moving demo lands harder than a SoundCloud link.` },
    ]
  }

  // Genre / Visual Style / MV Type
  return [
    { tag: 'Zero lead time', title: 'Release day', desc: `Upload your single, describe the ${glo} aesthetic, and have a visual ready before the drop. Under 2 minutes to first draft.` },
    { tag: 'Post more, spend less', title: 'Content calendar', desc: `Turn every track into a ${glo} visual — build a consistent catalog without a production budget or a creative team.` },
    { tag: 'All platforms at once', title: 'Social formats', desc: `Export 9:16 for TikTok and Reels, 16:9 for YouTube, 1:1 for Instagram — one generation, every format covered automatically.` },
  ]
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
