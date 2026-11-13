import data from '@/content/testimonials.json'
import type { Testimonial } from './types'

/**
 * Edited in /admin > Testimonials (stored in src/content/testimonials.json).
 * youtubeId = the video id of each pilgrim's YouTube testimonial. CONFIRM written consent from each pilgrim.
 */
export const testimonials = data as Testimonial[]
