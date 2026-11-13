/**
 * Server-side validation for everything the admin can save. Small hand-written checks (no extra
 * dependency): each validator pushes readable messages such as "packages[1].name: required".
 */
type V = (v: unknown, at: string, e: string[]) => void

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

export const str = (o: { max?: number; min?: number; pattern?: RegExp; hint?: string } = {}): V => (v, at, e) => {
  if (typeof v !== 'string') return void e.push(`${at}: must be text`)
  if ((o.min ?? 1) > 0 && !v.trim()) return void e.push(`${at}: required`)
  if (o.max && v.length > o.max) e.push(`${at}: too long (max ${o.max} characters)`)
  if (o.pattern && v && !o.pattern.test(v)) e.push(`${at}: ${o.hint ?? 'invalid format'}`)
}
const optStr = (o: Parameters<typeof str>[0] = {}): V => (v, at, e) => { if (v !== undefined && v !== '') str({ ...o, min: 0 })(v, at, e) }
const num = (o: { min?: number; max?: number; int?: boolean } = {}): V => (v, at, e) => {
  if (typeof v !== 'number' || !Number.isFinite(v)) return void e.push(`${at}: must be a number`)
  if (o.int && !Number.isInteger(v)) e.push(`${at}: must be a whole number`)
  if (o.min !== undefined && v < o.min) e.push(`${at}: must be at least ${o.min}`)
  if (o.max !== undefined && v > o.max) e.push(`${at}: must be at most ${o.max}`)
}
const opt = (inner: V): V => (v, at, e) => { if (v !== undefined && v !== null) inner(v, at, e) }
const bool: V = (v, at, e) => { if (typeof v !== 'boolean') e.push(`${at}: must be true or false`) }
const oneOf = (...vals: string[]): V => (v, at, e) => { if (!vals.includes(v as string)) e.push(`${at}: must be one of ${vals.join(', ')}`) }
const arr = (item: V, o: { min?: number; max?: number } = {}): V => (v, at, e) => {
  if (!Array.isArray(v)) return void e.push(`${at}: must be a list`)
  if (o.min !== undefined && v.length < o.min) e.push(`${at}: needs at least ${o.min} item(s)`)
  if (o.max !== undefined && v.length > o.max) e.push(`${at}: at most ${o.max} items`)
  v.forEach((x, i) => item(x, `${at}[${i}]`, e))
}
const obj = (shape: Record<string, V>): V => (v, at, e) => {
  if (!isObj(v)) return void e.push(`${at}: must be an object`)
  for (const [k, check] of Object.entries(shape)) check(v[k], at ? `${at}.${k}` : k, e)
}

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const slug = str({ max: 80, pattern: SLUG, hint: 'use lowercase letters, numbers and hyphens only' })
const date = str({ pattern: /^\d{4}-\d{2}-\d{2}$/, hint: 'use the date format YYYY-MM-DD' })
const safeUrl = str({ max: 600, pattern: /^(https:\/\/|http:\/\/|\/(?!\/))/, hint: 'must start with https:// or /' })
const extUrl = str({ max: 600, pattern: /^https?:\/\//, hint: 'must start with https://' })
const focus = optStr({ pattern: /^\d{1,3}% \d{1,3}%$/, hint: 'use the form "50% 40%"' })
const imageSlug = str({ max: 80, pattern: SLUG, hint: 'pick a photo from the library' })

/* ---------------------------------------------------------------- documents */

const faq = obj({ q: str({ max: 300 }), a: str({ max: 3000 }) })

export const validators: Record<string, V> = {
  site: obj({
    name: str({ max: 120 }), shortName: str({ max: 60 }), url: extUrl, tagline: str({ max: 160 }), description: str({ max: 400 }),
    licence: obj({ number: str({ max: 80 }), role: str({ max: 120 }), authority: str({ max: 200 }), certificateUrl: extUrl }),
    stats: arr(obj({ value: str({ max: 20 }), label: str({ max: 60 }) }), { max: 6 }),
    phones: arr(obj({ label: str({ max: 40 }), display: str({ max: 40 }), tel: str({ pattern: /^\+\d{8,15}$/, hint: 'use the form +919876543210' }) }), { min: 1, max: 6 }),
    whatsapp: obj({ number: str({ pattern: /^\d{8,15}$/, hint: 'digits only, with country code, e.g. 919876543210' }), display: str({ max: 40 }) }),
    email: str({ max: 120, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, hint: 'must be an email address' }),
    address: obj({ line1: str({ max: 120 }), line2: str({ max: 120 }), city: str({ max: 60 }), region: str({ max: 60 }), postalCode: str({ max: 12 }), country: str({ max: 2, pattern: /^[A-Z]{2}$/, hint: 'two-letter country code' }) }),
    hours: arr(obj({ days: str({ max: 60 }), time: str({ max: 60 }), open: optStr({ pattern: /^\d{2}:\d{2}$/, hint: 'HH:MM' }), close: optStr({ pattern: /^\d{2}:\d{2}$/, hint: 'HH:MM' }) }), { max: 7 }),
    social: arr(obj({ label: str({ max: 40 }), url: extUrl }), { max: 10 }),
    mapEmbed: extUrl, mapLink: extUrl,
    googleReviews: obj({ rating: opt(num({ min: 0, max: 5 })), reviewCount: opt(num({ min: 0, int: true })) }),
  }),

  packages: arr(obj({
    id: slug, kind: oneOf('hajj', 'umrah'), name: str({ max: 140 }), duration: str({ max: 60 }), destinations: str({ max: 120 }),
    dates: optStr({ max: 120 }), departureDate: opt(date), highlights: arr(str({ max: 120 }), { max: 8 }),
    priceInr: opt(num({ min: 0, int: true })), previousPriceInr: opt(num({ min: 0, int: true })), priceNote: optStr({ max: 80 }), taxNote: optStr({ max: 160 }),
    badge: optStr({ max: 30 }), rating: opt(num({ min: 0, max: 5 })), reviewCount: opt(num({ min: 0, int: true })),
    image: obj({ slug: imageSlug, focus }),
    details: opt(obj({
      hotel: optStr({ max: 160 }), distanceFromHaram: optStr({ max: 160 }), flight: optStr({ max: 160 }), transport: optStr({ max: 160 }), meals: optStr({ max: 160 }),
      inclusions: opt(arr(str({ max: 200 }), { max: 40 })), exclusions: opt(arr(str({ max: 200 }), { max: 40 })),
    })),
  }), { max: 40 }),

  faqs: obj({
    general: arr(faq, { max: 40 }),
    sections: arr(obj({ id: slug, title: str({ max: 60 }), blurb: str({ max: 160 }), icon: oneOf('hajj', 'umrah', 'ziyarat', 'documents', 'luggage', 'zamzam', 'kit', 'stay', 'health', 'about'), items: arr(faq, { max: 40 }) }), { max: 20 }),
  }),

  testimonials: arr(obj({
    id: str({ max: 40, pattern: /^[\w-]+$/ }), youtubeId: str({ max: 20, pattern: /^[\w-]{6,20}$/, hint: 'the id from the YouTube link, e.g. dViE7skgB7Y' }),
    name: str({ max: 80 }), place: str({ max: 80 }), trip: str({ max: 120 }), lang: opt(oneOf('en', 'hi')), quote: str({ max: 3000 }),
  }), { max: 60 }),

  gallery: obj({
    images: arr(obj({ id: str({ max: 40, pattern: /^[\w-]+$/ }), slug: imageSlug, title: str({ max: 120 }), alt: str({ max: 300 }), category: oneOf('Hajj', 'Kaaba', 'Journey', 'Groups', 'Ziyarat', 'Stay & Food', 'Events') }), { max: 300 }),
    videos: arr(obj({ id: str({ max: 40 }), title: str({ max: 120 }), src: safeUrl, poster: optStr({ max: 300 }) }), { max: 50 }),
    homeIds: arr(str({ max: 40 }), { max: 12 }),
  }),

  hero: obj({
    main: arr(obj({ slug: imageSlug, alt: str({ max: 300 }), focus }), { min: 1, max: 8 }),
    side: arr(obj({ slug: imageSlug, alt: str({ max: 300 }), focus }), { min: 1, max: 8 }),
  }),

  'blog-categories': obj({
    categories: arr(obj({ id: slug, name: str({ max: 60 }), short: str({ max: 120 }), description: str({ max: 200 }), seoTitle: str({ max: 70 }) }), { min: 1, max: 20 }),
    authors: arr(obj({ id: slug, name: str({ max: 80 }), role: str({ max: 120 }), bio: str({ max: 800 }), url: safeUrl }), { min: 1, max: 20 }),
    minPostsToIndexCategory: num({ min: 1, max: 20, int: true }),
  }),

  'reading-path': arr(obj({ stage: str({ max: 60 }), text: str({ max: 160 }), slugs: arr(slug, { min: 1, max: 4 }) }), { max: 8 }),
}

/* ---------------------------------------------------------------- blog posts */

const blogImage = obj({ slug: imageSlug, alt: str({ max: 300 }), caption: optStr({ max: 300 }), focus })
const text = (max: number) => str({ max })
const items = (max = 40) => arr(text(1000), { min: 1, max })

const block: V = (v, at, e) => {
  if (!isObj(v)) return void e.push(`${at}: must be an object`)
  const shapes: Record<string, V> = {
    p: obj({ text: text(4000) }),
    h2: obj({ text: text(140), id: optStr({ pattern: SLUG }) }),
    h3: obj({ text: text(140) }),
    ul: obj({ items: items() }),
    ol: obj({ items: items() }),
    callout: obj({ tone: oneOf('tip', 'note', 'important', 'verify'), title: optStr({ max: 120 }), text: optStr({ max: 2000 }), items: opt(items(20)) }),
    steps: obj({ items: arr(obj({ title: text(120), text: text(1500) }), { min: 1, max: 20 }) }),
    checklist: obj({ id: slug, title: optStr({ max: 120 }), items: items(60) }),
    table: obj({ caption: optStr({ max: 160 }), head: arr(str({ max: 80, min: 0 }), { min: 2, max: 8 }), rows: arr(arr(str({ max: 400, min: 0 }), { max: 8 }), { min: 1, max: 40 }) }),
    image: obj({ image: blogImage }),
    facts: obj({ title: optStr({ max: 120 }), items: arr(obj({ label: text(80), value: text(160) }), { min: 1, max: 8 }) }),
    arabic: obj({ arabic: text(1000), transliteration: optStr({ max: 1000 }), translation: text(1000), cite: optStr({ max: 200 }) }),
    cta: obj({ title: text(120), text: text(400), link: opt(obj({ label: text(60), to: safeUrl })) }),
  }
  const check = shapes[v.type as string]
  if (!check) return void e.push(`${at}.type: unknown block type "${String(v.type)}"`)
  check(v, at, e)
}

export const postMeta = obj({
  slug, title: str({ max: 140 }), seoTitle: str({ max: 70 }), description: str({ max: 170 }), excerpt: str({ max: 400 }),
  category: slug, tags: arr(str({ max: 40 }), { max: 15 }), publishedAt: date, updatedAt: date,
  readingMinutes: num({ min: 1, max: 120, int: true }), authorId: slug, image: blogImage,
  ogImage: str({ max: 200, pattern: /^\/(images\/[\w/.-]+|og-image)\.(jpg|jpeg|png|webp)$/, hint: 'must be an image path under /images/ or /og-image.jpg' }),
  featured: opt(bool), status: opt(oneOf('published', 'draft')),
  cta: opt(obj({ title: str({ max: 120 }), text: str({ max: 300 }) })),
})

export const article = obj({
  slug, summary: str({ max: 800 }), blocks: arr(block, { min: 1, max: 300 }),
  faqs: arr(obj({ q: str({ max: 300 }), a: str({ max: 2000 }) }), { max: 20 }),
  sources: arr(obj({ label: str({ max: 200 }), publisher: str({ max: 120 }), url: extUrl }), { max: 30 }),
})

/** Inline markup links ([label](href)) must point to the site (/...) or to http(s)/mailto/tel. */
function checkInlineLinks(value: unknown, at: string, e: string[]) {
  if (typeof value === 'string') {
    for (const m of value.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)) {
      if (!/^(\/(?!\/)|https?:\/\/|mailto:|tel:)/.test(m[1])) e.push(`${at}: link "${m[1]}" must start with /, https://, mailto: or tel:`)
    }
  } else if (Array.isArray(value)) value.forEach((v, i) => checkInlineLinks(v, `${at}[${i}]`, e))
  else if (isObj(value)) for (const [k, v] of Object.entries(value)) checkInlineLinks(v, at ? `${at}.${k}` : k, e)
}

export function validate(check: V, value: unknown, at = ''): string[] {
  const e: string[] = []
  check(value, at, e)
  checkInlineLinks(value, at, e)
  return e
}
