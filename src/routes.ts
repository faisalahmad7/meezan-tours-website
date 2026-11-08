export interface RouteDef {
  path: string
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
}

/** Every indexable route. Used for prerendering and for sitemap.xml. */
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
]
