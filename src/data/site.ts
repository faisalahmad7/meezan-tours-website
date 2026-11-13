/**
 * Business details. The values live in src/content/site.json, which the admin dashboard edits
 * (/admin > Business details). Every value was taken from the original live website; items the
 * owner has not yet confirmed are listed in HANDOFF.md.
 */
import data from '@/content/site.json'

export interface SiteSettings {
  name: string
  shortName: string
  url: string
  tagline: string
  description: string
  licence: { number: string; role: string; authority: string; certificateUrl: string }
  stats: { value: string; label: string }[]
  phones: { label: string; display: string; tel: string }[]
  whatsapp: { number: string; display: string }
  email: string
  address: { line1: string; line2: string; city: string; region: string; postalCode: string; country: string }
  hours: { days: string; time: string; open?: string; close?: string }[]
  social: { label: string; url: string }[]
  mapEmbed: string
  mapLink: string
  /** Fill ONLY from the live Google profile; null hides the figures. */
  googleReviews: { rating: number | null; reviewCount: number | null }
}

export const SITE = data as SiteSettings

export const COPYRIGHT_YEAR: number = __BUILD_YEAR__

export const addressLine = () =>
  `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`

export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`
