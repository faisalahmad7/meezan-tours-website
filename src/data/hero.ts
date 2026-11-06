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
  { slug: 'haram-group-portrait', alt: 'Meezan pilgrims in white ihram standing in front of the Kaaba in Makkah', focus: '50% 50%' },
]

/** SECONDARY hero frame: genuine Meezan group photographs (landscape, shown uncropped enough to keep faces). */
export const heroSide: HeroSlide[] = [
  { slug: 'haram-group-wide', alt: 'Meezan pilgrims in ihram standing together at Masjid al-Haram with the Kaaba behind them', focus: '50% 62%' },
  { slug: 'airport-banner-group', alt: 'Meezan pilgrims holding the green Meezan Tours & Travels banner at the airport before departure', focus: '50% 70%' },
  { slug: 'group-jabal', alt: 'Meezan pilgrims in ihram with the Meezan banner in front of a rocky hill', focus: '50% 55%' },
  { slug: 'group-banner-hill', alt: 'Meezan pilgrims holding the green Meezan Tours & Travels banner', focus: '50% 55%' },
]
