import data from '@/content/gallery.json'
import type { GalleryImage, GalleryVideo } from './types'

/**
 * Gallery photos are edited in /admin > Gallery (stored in src/content/gallery.json).
 * Only genuine Meezan photographs are used.
 */
export const galleryImages = data.images as GalleryImage[]
export const galleryVideos = data.videos as GalleryVideo[]
export const galleryCategories = ['All', 'Hajj', 'Kaaba', 'Journey', 'Groups', 'Ziyarat', 'Stay & Food', 'Events'] as const
export const HOME_GALLERY_IDS: string[] = data.homeIds
