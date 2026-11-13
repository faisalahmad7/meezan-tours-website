import { SITE } from '@/data/site'

const ID = `${SITE.url}/#business`

/** TravelAgency (a LocalBusiness subtype). No ratings, reviews, prices or coordinates are asserted. */
export const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': ID,
  name: SITE.name,
  alternateName: 'Meezan Hajj & Umrah Tours',
  url: SITE.url + '/',
  logo: `${SITE.url}/images/brand/meezan-logo-560.png`,
  image: `${SITE.url}/og-image.jpg`,
  description: SITE.description,
  telephone: SITE.phones[0].tel,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  identifier: { '@type': 'PropertyValue', name: `${SITE.licence.role} licence (MOMA Hajj Cell)`, value: SITE.licence.number },
  contactPoint: SITE.phones.map((ph) => ({ '@type': 'ContactPoint', contactType: 'customer service', telephone: ph.tel, areaServed: 'IN', availableLanguage: ['English', 'Hindi', 'Urdu'] })),
  areaServed: [{ '@type': 'AdministrativeArea', name: 'Maharashtra' }, { '@type': 'Country', name: 'India' }],
  knowsAbout: ['Hajj', 'Umrah', 'Ziyarat'],
  hasMap: SITE.mapLink,
  sameAs: SITE.social.map((s) => s.url),
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url + '/',
  publisher: { '@id': ID },
  inLanguage: 'en-IN',
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: SITE.url + (it.path === '/' ? '/' : it.path),
  })),
})

export const serviceSchema = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: SITE.url + path,
  provider: { '@id': ID },
  areaServed: { '@type': 'Country', name: 'India' },
})

/** FAQPage structured data: lets search and AI answer engines quote the answers. */
export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
})

/* ------------------------------------------------------------------ blog */

/** Publisher block repeated inline on blog pages, so each page's JSON-LD stands on its own. */
export const publisherSchema = () => ({
  '@type': 'Organization',
  '@id': ID,
  name: SITE.name,
  url: SITE.url + '/',
  logo: { '@type': 'ImageObject', url: `${SITE.url}/images/brand/meezan-logo-560.png`, width: 560, height: 258 },
  sameAs: SITE.social.map((s) => s.url),
})

const BLOG_ID = `${SITE.url}/blog#blog`

interface PostLike {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  ogImage: string
  image: { slug: string }
}

/** BlogPosting for one article. Dates are ISO dates; images are the 1200x630 card and the 1600px photo. */
export const blogPostingSchema = (
  post: PostLike & { tags: string[] },
  opts: { section: string; wordCount: number; sources: { label: string; url: string }[] },
) => {
  const url = `${SITE.url}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.title,
    description: post.description,
    image: [SITE.url + post.ogImage, `${SITE.url}/images/gallery/${post.image.slug}-1600.webp`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', '@id': ID, name: SITE.name, url: `${SITE.url}/about` },
    publisher: publisherSchema(),
    isPartOf: { '@type': 'Blog', '@id': BLOG_ID, name: 'Meezan Journal' },
    articleSection: opts.section,
    keywords: post.tags.join(', '),
    wordCount: opts.wordCount,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    citation: opts.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
  }
}

/** The blog home: a Blog with its posts listed. */
export const blogSchema = (name: string, description: string, posts: PostLike[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': BLOG_ID,
  name,
  description,
  url: `${SITE.url}/blog`,
  inLanguage: 'en-IN',
  publisher: publisherSchema(),
  isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url + '/' },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    '@id': `${SITE.url}/blog/${p.slug}#article`,
    headline: p.title,
    description: p.description,
    url: `${SITE.url}/blog/${p.slug}`,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    image: SITE.url + p.ogImage,
  })),
})

/** A category page: a CollectionPage whose main entity is the ordered list of its posts. */
export const collectionSchema = (name: string, description: string, path: string, posts: PostLike[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: SITE.url + path,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'Blog', '@id': BLOG_ID, name: 'Meezan Journal' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/blog/${p.slug}`, name: p.title })),
  },
})
