import { MvConfig, MvContent } from '@/lib/mv/data'
import { getT } from '@/lib/mv/i18n'

const BASE_URL = 'https://www.tunee.ai'
const PARENT = '/features/music-video-generator'

interface Props {
  cfg: MvConfig
  content: MvContent
  locale: string
}

function pageUrl(locale: string, slug: string): string {
  return locale === 'en'
    ? `${BASE_URL}${PARENT}/${slug}`
    : `${BASE_URL}/${locale}${PARENT}/${slug}`
}

function parentUrl(locale: string): string {
  return locale === 'en'
    ? `${BASE_URL}${PARENT}`
    : `${BASE_URL}/${locale}${PARENT}`
}

function homeUrl(locale: string): string {
  return locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`
}

export default function SchemaScripts({ cfg, content, locale }: Props) {
  const { slug } = cfg
  const genre = cfg.genre_name

  // 和页面上可见的那条面包屑同源（page.tsx 也是 getT(locale)），所以两者
  // 逐字一致。不要改用 next-intl：Common.musicVideoGenerator 的措辞和这里
  // 不一样（ru 是「Генератор музыкальных видео」vs 可见的「…клипов」）。
  const t = getT(locale)

  // SoftwareApplication — always points to canonical (English) URL.
  // aggregateRating intentionally omitted — synthetic values risk a rich-results manual action.
  //
  // name 保持英文：这个站 100 个 slug 里有 28 个的 genre_name 不是曲风名
  // （"With Subtitles"、"Free MV Generator"、"DJs"、"Apple Music"…），
  // 套任何本地化模板都会出事——es/pt 的「de X」在它们上面语义就是错的
  // （"Generador de videos musicales de With Subtitles"）。先修根因再谈本地化。
  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Tunee AI ${genre} Music Video Generator`,
    description: content.direct_answer,
    url: `${BASE_URL}${PARENT}/${slug}`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to make a ${genre} music video with AI`,
    description: `Create a ${genre} music video using Tunee's AI generator in 3 steps.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload your track',
        text: 'Upload your MP3, WAV, AAC, or AIFF file (up to 20 MB). Tunee detects BPM, key and energy automatically.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Describe your vision',
        text: `Choose One-Click MV for instant results, or Freestyle to define your ${genre} visual style and aspect ratio.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Export your video',
        text: 'Review the AI-generated storyboard, approve, and export up to 4K MP4 in 16:9, 9:16, or 1:1.',
      },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: homeUrl(locale) },
      { '@type': 'ListItem', position: 2, name: t.breadcrumbMvGen, item: parentUrl(locale) },
      { '@type': 'ListItem', position: 3, name: t.breadcrumbGenre(genre), item: pageUrl(locale, slug) },
    ],
  }

  const hasFaqs = Array.isArray(content.faqs) && content.faqs.length > 0
  const faqPage = hasFaqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
      {faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
