export type PackageKind = 'hajj' | 'umrah'

export interface TravelPackage {
  id: string
  kind: PackageKind
  name: string
  duration: string
  destinations: string
  /** Free text so it can carry "Departure 12 Nov 2026 - Return 27 Nov 2026" or "Dates on request". */
  dates?: string
  highlights: string[]
  /** Price in INR. Leave undefined to show "Price on request". */
  priceInr?: number
  /** Original (struck-through) price, shown with the saving. */
  previousPriceInr?: number
  priceNote?: string
  taxNote?: string
  badge?: string
  /** Key into imageManifest and the crop focus point. */
  image: { slug: string; focus?: string }
  /** ISO date (YYYY-MM-DD). After it passes, the card shows "departure passed". */
  departureDate?: string
  /** Rating and review count exactly as shown on the original site. Owner must confirm. */
  rating?: number
  reviewCount?: number
  /** Expandable details. Only fields with verified data are filled. */
  details?: {
    hotel?: string
    distanceFromHaram?: string
    flight?: string
    transport?: string
    meals?: string
    inclusions?: string[]
    exclusions?: string[]
  }
}

export interface GalleryImage {
  id: string
  /** key into imageManifest */
  slug: string
  title: string
  alt: string
  category: 'Hajj' | 'Kaaba' | 'Journey' | 'Groups' | 'Ziyarat' | 'Stay & Food' | 'Events'
}

export interface GalleryVideo {
  id: string
  title: string
  src: string
  poster?: string
}

export interface Testimonial {
  id: string
  name: string
  place: string
  trip: string
  quote: string
  /** YouTube video id of the pilgrim's video testimonial. */
  youtubeId: string
  lang?: 'en' | 'hi'
}

export interface Faq {
  q: string
  a: string
}
