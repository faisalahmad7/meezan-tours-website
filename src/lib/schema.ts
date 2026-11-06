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
