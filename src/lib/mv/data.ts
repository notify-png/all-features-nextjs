import fs from 'fs'
import path from 'path'

const SEO_DIR = path.join(process.cwd(), 'data')

export interface MvConfig {
  slug: string
  parent: string
  category: string
  genre_name: string
  visual_keywords: string[]
  mood_words: string[]
  target_personas: string[]
  color_accent: string
  color_secondary: string
  has_custom_asset: boolean
  demo_prompt: string
}

export interface MvNarrativeSection {
  heading: string
  body: string
}

export interface MvNarrative {
  /** Optional eyebrow line above the h2 (defaults rendered without one). */
  eyebrow?: string
  /** Main heading for the narrative section. */
  h2: string
  /** 2-4 sub-sections of long-form prose, each with its own h3 heading. */
  sections: MvNarrativeSection[]
}

export interface MvContent {
  direct_answer: string
  meta_description: string
  prompts: string[]
  personas: { musicians: string; creators: string; labels: string; brands: string }
  faqs: { q: string; a: string }[]
  /**
   * Optional slug-specific long-form prose injected as the page's content
   * spine (between Hero and Gallery). When absent the section is silently
   * skipped — populate it gradually per slug. For top-priority slugs the
   * per-locale content file gets a culturally-rewritten narrative instead
   * of a translation.
   */
  narrative?: MvNarrative
}

export interface PexelsPhoto {
  hero: string
  thumb: string
  photographer: string
  id: number
}

export function getAllSlugs(): string[] {
  const configsDir = path.join(SEO_DIR, 'configs', 'mv')
  return fs.readdirSync(configsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}

export function getConfig(slug: string): MvConfig {
  const filePath = path.join(SEO_DIR, 'configs', 'mv', `${slug}.json`)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function getContent(slug: string, locale: string = 'en'): MvContent {
  // Always load EN first — it's the source of truth and fills any gaps the
  // locale file leaves unfilled (e.g. narrative not yet translated).
  const enPath = path.join(SEO_DIR, 'content', 'mv', `${slug}.json`)
  const enContent: MvContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'))

  if (locale === 'en') return enContent

  const localePath = path.join(SEO_DIR, 'content', 'mv', locale, `${slug}.json`)
  if (!fs.existsSync(localePath)) return enContent

  const localeContent: MvContent = JSON.parse(fs.readFileSync(localePath, 'utf-8'))

  // Field-level merge: locale wins where present, EN fills holes. Specifically
  // important for `narrative` — when we add per-slug long-form content to EN
  // but haven't translated it yet, every locale page still gets to render
  // something rather than silently skipping the section.
  return {
    ...enContent,
    ...localeContent,
    narrative: localeContent.narrative ?? enContent.narrative,
  }
}

export function getImageCache(): Record<string, PexelsPhoto[]> {
  const filePath = path.join(SEO_DIR, 'image_cache.json')
  if (!fs.existsSync(filePath)) return {}
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
