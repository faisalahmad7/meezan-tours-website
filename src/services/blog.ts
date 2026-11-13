/**
 * Blog content access layer. Blog components read content only through these functions,
 * so the data source can later be swapped for the admin dashboard / CMS without touching the UI.
 *
 * - Post metadata (src/data/blog/posts.ts) is small and bundled with the app: listings, search,
 *   cards, related posts, sitemap and SEO tags all work from it.
 * - Article bodies (src/data/blog/articles/<slug>.ts) are heavy, so each one becomes its own
 *   JavaScript chunk that is loaded only when that article is opened. The prerender step
 *   registers every body up front (see entry-server.tsx), so the static HTML is always complete.
 */
import { blogAuthors, blogCategories, MIN_POSTS_TO_INDEX_CATEGORY } from '@/data/blog/categories'
import { blogPosts } from '@/data/blog/posts'
import type { BlogArticle, BlogCategoryId, BlogPostMeta, Block } from '@/data/blog/types'

export const BLOG = {
  name: 'Meezan Journal',
  path: '/blog',
  title: 'Hajj & Umrah Guides and Travel Advice | Meezan Journal',
  description:
    'Practical Hajj and Umrah guides from Meezan Tours & Travels, Pune: performing Umrah, visas for Indian pilgrims, packing lists, the best time to travel and more.',
} as const

const byNewest = (a: BlogPostMeta, b: BlogPostMeta) =>
  b.publishedAt.localeCompare(a.publishedAt) || blogPosts.indexOf(a) - blogPosts.indexOf(b)

/* ------------------------------------------------------------------ metadata */

export const getPosts = () => [...blogPosts].sort(byNewest)
export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug)
export const getFeaturedPosts = () => getPosts().filter((p) => p.featured)
export const getCategories = () => blogCategories
export const getCategory = (id: string) => blogCategories.find((c) => c.id === id)
export const getPostsByCategory = (id: BlogCategoryId) => getPosts().filter((p) => p.category === id)
export const getAuthor = (id: string) => blogAuthors.find((a) => a.id === id) ?? blogAuthors[0]
export const postPath = (slug: string) => `/blog/${slug}`
export const categoryPath = (id: string) => `/blog/category/${id}`
export const isCategoryIndexable = (id: BlogCategoryId) =>
  getPostsByCategory(id).length >= MIN_POSTS_TO_INDEX_CATEGORY

/** Same category first, then shared tags, then newest. */
export function getRelatedPosts(post: BlogPostMeta, limit = 3) {
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}

/* ------------------------------------------------------------------ search */

/** Spellings pilgrims commonly type, mapped to the spelling used in the articles. */
const ALIASES: Record<string, string> = {
  mecca: 'makkah', makka: 'makkah', mekkah: 'makkah', medina: 'madinah', madina: 'madinah',
  umra: 'umrah', omra: 'umrah', umrha: 'umrah', haj: 'hajj', hadj: 'hajj', ehram: 'ihram',
  sai: "sa'i", saee: "sa'i", saey: "sa'i", tawaaf: 'tawaf', zam: 'zamzam', luggage: 'packing',
  pack: 'packing', ladies: 'women', woman: 'women', kids: 'children', child: 'children',
  parents: 'elderly', old: 'elderly', vaccine: 'vaccination',
}
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‘’`]/g, "'")
const terms = (q: string) =>
  norm(q).split(/[^a-z0-9']+/).filter((t) => t.length > 1).map((t) => ALIASES[t] ?? t)

/**
 * Ranks posts by how many of the typed words they match (all words first), then by where they
 * match: title > tags > summary. A post needs at least one matching word to appear.
 */
export function searchPosts(query: string) {
  const qs = [...new Set(terms(query))]
  if (!qs.length) return []
  return getPosts()
    .map((p) => {
      const cat = getCategory(p.category)?.name ?? ''
      const title = norm(p.title)
      const tags = norm(p.tags.join(' '))
      const body = norm(`${p.excerpt} ${p.description} ${cat}`)
      let matched = 0
      let score = 0
      for (const t of qs) {
        const s = (title.includes(t) ? 5 : 0) + (tags.includes(t) ? 3 : 0) + (body.includes(t) ? 1 : 0)
        if (s) matched++
        score += s
      }
      return { p, matched, score }
    })
    .filter((r) => r.matched > 0)
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .map((r) => r.p)
}

/* ------------------------------------------------------------------ article bodies */

// Browser only: one lazy chunk per article. (The prerender registers all bodies eagerly instead.)
const loaders: Record<string, () => Promise<{ default: BlogArticle }>> = import.meta.env.SSR
  ? {}
  : import.meta.glob<{ default: BlogArticle }>('../data/blog/articles/*.ts')
const cache = new Map<string, BlogArticle>()
const slugOf = (file: string) => file.replace(/^.*\//, '').replace(/\.ts$/, '')

/** Build time: entry-server registers every article so the prerendered HTML is complete. */
export function registerArticles(mods: Record<string, { default: BlogArticle }>) {
  for (const [file, mod] of Object.entries(mods)) cache.set(slugOf(file), mod.default)
}

export const getArticleSync = (slug: string) => cache.get(slug)

export async function loadArticle(slug: string) {
  const hit = cache.get(slug)
  if (hit) return hit
  const loader = loaders[`../data/blog/articles/${slug}.ts`]
  if (!loader) return undefined
  const mod = await loader()
  cache.set(slug, mod.default)
  return mod.default
}

/** Warm the chunk on hover/focus so the article opens instantly. */
export const prefetchArticle = (slug: string) => {
  void loadArticle(slug).catch(() => undefined)
}

/* ------------------------------------------------------------------ text helpers */

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

/** Build-time check used by scripts/prerender.mjs: flags drift between stored and real reading time. */
export function auditBlog() {
  const issues: string[] = []
  for (const p of blogPosts) {
    const a = cache.get(p.slug)
    if (!a) { issues.push(`missing article body for "${p.slug}"`); continue }
    const real = readingMinutesFor(articleWordCount(a))
    if (real !== p.readingMinutes) issues.push(`"${p.slug}" readingMinutes is ${p.readingMinutes}, body suggests ${real}`)
    if (p.seoTitle.length > 65) issues.push(`"${p.slug}" seoTitle is ${p.seoTitle.length} chars`)
    if (p.description.length > 165) issues.push(`"${p.slug}" description is ${p.description.length} chars`)
  }
  return issues
}

/* ------------------------------------------------------------------ dates */

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
/** "2026-11-13" -> "13 November 2026". Done by hand so server and browser output always match. */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
