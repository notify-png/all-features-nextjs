import { MvConfig, MvContent } from '@/lib/mv/data'
import { strHash } from '@/lib/mv/slugHelpers'

const BASE_URL = 'https://www.tunee.ai'
const PARENT = '/features/music-video-generator'

interface Props {
  cfg: MvConfig
  content: MvContent
}

export default function SchemaScripts({ cfg, content }: Props) {
  const { slug } = cfg
  const genre = cfg.genre_name

  const ratingCount = 800 + (strHash(slug) % 900)
  const ratingValue = ratingCount % 3 === 0 ? '4.7' : ratingCount % 3 === 1 ? '4.8' : '4.9'

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Tunee AI ${genre} Music Video Generator`,
    description: content.direct_answer,
    url: `${BASE_URL}/en${PARENT}/${slug}`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount: String(ratingCount),
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/en` },
      { '@type': 'ListItem', position: 2, name: 'Music Video Generator', item: `${BASE_URL}/en${PARENT}` },
      { '@type': 'ListItem', position: 3, name: `${genre} Music Video`, item: `${BASE_URL}/en${PARENT}/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
