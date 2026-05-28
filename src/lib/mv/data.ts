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

export interface MvContent {
  direct_answer: string
  meta_description: string
  prompts: string[]
  personas: { musicians: string; creators: string; labels: string; brands: string }
  faqs: { q: string; a: string }[]
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
  // 1. Try locale-specific translated file
  if (locale !== 'en') {
    const localePath = path.join(SEO_DIR, 'content', 'mv', locale, `${slug}.json`)
    if (fs.existsSync(localePath)) {
      return JSON.parse(fs.readFileSync(localePath, 'utf-8'))
    }
  }
  // 2. Fall back to English
  const filePath = path.join(SEO_DIR, 'content', 'mv', `${slug}.json`)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function getImageCache(): Record<string, PexelsPhoto[]> {
  const filePath = path.join(SEO_DIR, 'image_cache.json')
  if (!fs.existsSync(filePath)) return {}
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
