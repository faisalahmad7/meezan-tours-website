export interface HeroSlide {
  slug: string
  alt: string
  /** CSS object-position for the crop. */
  focus?: string
}

/**
 * MAIN hero frame (portrait arch). Slide 1 is ALWAYS the Kaaba.
 * To add Madinah / Green Dome / Clock Tower photos: export them as portrait WebP (900 px wide or more),
 * register them in imageManifest.ts, then add them here. No layout change is needed.
 */
export const heroMain: HeroSlide[] = [
  { slug: 'kaaba-clock', alt: 'The Kaaba in Masjid al-Haram with pilgrims in tawaf and the Makkah clock tower behind', focus: '50% 68%' },
  { slug: 'kaaba-quran', alt: 'The Kaaba at dusk with a pilgrim holding a Quran and prayer beads', focus: '50% 55%' },
]

/** SECONDARY hero frame: genuine Meezan group photographs (landscape, shown uncropped enough to keep faces). */
export const heroSide: HeroSlide[] = [
  { slug: 'group-jabal', alt: 'Meezan pilgrims in ihram with the Meezan banner in front of a rocky hill', focus: '50% 55%' },
  { slug: 'group-banner-hill', alt: 'Meezan pilgrims holding the green Meezan Tours & Travels banner', focus: '50% 55%' },
  { slug: 'group-plaza', alt: 'Meezan group with the Meezan banner in a paved plaza', focus: '50% 55%' },
  { slug: 'group-mosque', alt: 'Meezan pilgrims with their banner in front of a white-domed mosque', focus: '50% 45%' },
]
