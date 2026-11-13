import data from '@/content/hero.json'

export interface HeroSlide {
  slug: string
  alt: string
  /** CSS object-position for the crop. */
  focus?: string
}

/** MAIN hero frame (portrait arch). Slide 1 is ALWAYS the Kaaba. Stored in src/content/hero.json. */
export const heroMain: HeroSlide[] = data.main
/** SECONDARY hero frame: genuine Meezan group photographs. */
export const heroSide: HeroSlide[] = data.side
