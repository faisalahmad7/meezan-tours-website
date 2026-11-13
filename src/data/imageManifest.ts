import data from '@/content/image-manifest.json'

/**
 * Sizes and placeholder colour of every photo in public/images/gallery (one entry per slug).
 * Photos uploaded in /admin are added to src/content/image-manifest.json automatically.
 */
export interface ImageMeta { w: number; h: number; widths: number[]; color: string }
export const imageManifest = data as Record<string, ImageMeta>
