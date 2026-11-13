/**
 * Blog content model.
 *
 * Everything here is plain, JSON-serialisable data so that the future admin dashboard / CMS can
 * read and write the same shapes (see docs/BLOG.md). Presentation lives in src/components/blog.
 *
 * Inline text fields (paragraphs, list items, callouts, answers) accept a tiny, safe markup:
 *   **bold**            -> <strong>
 *   [label](/path)      -> internal link (client-side navigation)
 *   [label](https://..) -> external link (opens in a new tab)
 * No raw HTML is ever rendered.
 */

/** Category ids are defined in src/content/blog/categories.json (editable in the admin). */
export type BlogCategoryId = string

export interface BlogCategory {
  id: BlogCategoryId
  name: string
  /** One-line summary used on chips and cards. */
  short: string
  /** Intro paragraph for the category page (also its meta description source). */
  description: string
  seoTitle: string
}

export interface BlogAuthor {
  id: string
  name: string
  role: string
  bio: string
  /** Page that explains who is behind the content. */
  url: string
}

export interface BlogImage {
  /** Key into src/data/imageManifest.ts (files in public/images/gallery). */
  slug: string
  alt: string
  caption?: string
  /** object-position for crops, e.g. "50% 40%". */
  focus?: string
}

/** Lightweight record: everything listing pages, search, cards, sitemap and SEO need. */
export interface BlogPostMeta {
  slug: string
  /** The visible H1. */
  title: string
  /** <title> tag; keep under ~60 characters. */
  seoTitle: string
  /** Meta description; keep within ~150-160 characters. */
  description: string
  /** Card / listing summary. */
  excerpt: string
  category: BlogCategoryId
  tags: string[]
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string
  updatedAt: string
  /** Minutes at ~220 wpm. The build checks this against the article body and warns on drift. */
  readingMinutes: number
  authorId: string
  image: BlogImage
  /** 1200x630 JPG for social previews, e.g. /images/blog/og/<slug>.jpg */
  ogImage: string
  featured?: boolean
  /** "draft" posts are kept in the content files but never rendered, listed or put in the sitemap. */
  status?: 'published' | 'draft'
  /** Closing call-to-action shown above the footer. */
  cta?: { title: string; text: string }
}

export type CalloutTone = 'tip' | 'note' | 'important' | 'verify'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; tone: CalloutTone; title?: string; text?: string; items?: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'checklist'; id: string; title?: string; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'image'; image: BlogImage }
  | { type: 'facts'; title?: string; items: { label: string; value: string }[] }
  | { type: 'arabic'; arabic: string; transliteration?: string; translation: string; cite?: string }
  | { type: 'cta'; title: string; text: string; link?: { label: string; to: string } }

export interface BlogFaq {
  q: string
  a: string
}

export interface BlogSource {
  label: string
  publisher: string
  url: string
}

/** Heavy record: the article itself. Loaded on demand (one JS chunk per article). */
export interface BlogArticle {
  slug: string
  /** Direct 40-70 word answer shown first ("In short"); written for readers and answer engines. */
  summary: string
  blocks: Block[]
  faqs: BlogFaq[]
  sources: BlogSource[]
}
