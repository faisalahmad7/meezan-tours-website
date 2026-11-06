/**
 * Content access layer. Components import from here, never from /data directly.
 * To connect a backend (e.g. Supabase) later, replace these functions with fetchers
 * and keep the return types - no component changes are needed.
 * Functions are synchronous today so pages can be prerendered at build time.
 */
import { generalFaqs } from '@/data/faqs'
import { galleryImages, galleryVideos, HOME_GALLERY_IDS } from '@/data/gallery'
import { packages } from '@/data/packages'
import { testimonials } from '@/data/testimonials'
import type { PackageKind } from '@/data/types'

export const getPackages = (kind?: PackageKind) =>
  kind ? packages.filter((p) => p.kind === kind) : packages
export const getGalleryImages = () => galleryImages
export const getGalleryVideos = () => galleryVideos
export const getHomeGallery = () =>
  HOME_GALLERY_IDS.map((id) => galleryImages.find((g) => g.id === id)!).filter(Boolean)
export const getTestimonials = (kind?: PackageKind) =>
  kind ? testimonials.filter((t) => t.trip.toLowerCase().includes(kind)) : testimonials
export const getFaqs = () => generalFaqs
