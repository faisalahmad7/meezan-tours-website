/**
 * Pure text helpers for blog content (no content imports), shared by the site, the build audit
 * and the admin dashboard.
 */
import type { BlogArticle, Block } from '@/data/blog/types'

export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‘’`]/g, "'")

/** Strip the inline markup: "**a** [b](/c)" -> "a b". */
export const plainText = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

const blockText = (b: Block): string => {
  switch (b.type) {
    case 'p': case 'h2': case 'h3': return b.text
    case 'ul': case 'ol': return b.items.join(' ')
    case 'callout': return [b.title, b.text, ...(b.items ?? [])].filter(Boolean).join(' ')
    case 'steps': return b.items.map((i) => `${i.title} ${i.text}`).join(' ')
    case 'checklist': return [b.title, ...b.items].filter(Boolean).join(' ')
    case 'table': return [b.caption, ...b.head, ...b.rows.flat()].filter(Boolean).join(' ')
    case 'facts': return b.items.map((i) => `${i.label} ${i.value}`).join(' ')
    case 'arabic': return [b.transliteration, b.translation].filter(Boolean).join(' ')
    case 'cta': return `${b.title} ${b.text}`
    case 'image': return b.image.caption ?? ''
  }
}

export function articleWordCount(a: BlogArticle) {
  const text = [a.summary, ...a.blocks.map(blockText), ...a.faqs.map((f) => `${f.q} ${f.a}`)].map(plainText).join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

export const readingMinutesFor = (words: number) => Math.max(1, Math.round(words / 220))

export const slugify = (s: string) =>
  norm(plainText(s)).replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** H2 headings become the table of contents; ids are stable slugs of the heading text. */
export const tocOf = (a: BlogArticle) =>
  a.blocks.flatMap((b) => (b.type === 'h2' ? [{ id: b.id ?? slugify(b.text), text: plainText(b.text) }] : []))
