import { imageManifest } from './data/imageManifest'
import { categoryPath, getCategories, getPosts, getPostsByCategory, isCategoryIndexable, postPath } from './services/blog'

export interface RouteDef {
  path: string
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
  /** ISO date for <lastmod>; defaults to the build date. */
  lastmod?: string
  /** false = prerendered but left out of sitemap.xml (e.g. noindex pages). */
  sitemap?: boolean
  /** Absolute-path images listed in the image sitemap. */
  images?: string[]
}

const latest = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), '')
const largest = (slug: string) => {
  const m = imageManifest[slug]
  return m ? `/images/gallery/${slug}-${m.widths[m.widths.length - 1]}.webp` : undefined
}

const posts = getPosts()

/** Blog home, category pages and every article, generated from the blog data. */
const blogRoutes: RouteDef[] = [
  { path: '/blog', priority: 0.7, changefreq: 'weekly', lastmod: latest(posts.map((p) => p.updatedAt)) },
  ...getCategories().map((c): RouteDef => ({
    path: categoryPath(c.id),
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: latest(getPostsByCategory(c.id).map((p) => p.updatedAt)) || undefined,
    sitemap: isCategoryIndexable(c.id),
  })),
  ...posts.map((p): RouteDef => ({
    path: postPath(p.slug),
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: p.updatedAt,
    images: [largest(p.image.slug)].filter((x): x is string => !!x),
  })),
]

/** Every prerendered route. Used for prerendering and for sitemap.xml. */
export const prerenderRoutes: RouteDef[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/hajj', priority: 0.9, changefreq: 'monthly' },
  { path: '/umrah', priority: 0.9, changefreq: 'monthly' },
  { path: '/packages', priority: 0.9, changefreq: 'weekly' },
  { path: '/ziyarat', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'yearly' },
  { path: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { path: '/faq', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changefreq: 'yearly' },
  { path: '/terms', priority: 0.2, changefreq: 'yearly' },
  ...blogRoutes,
]
