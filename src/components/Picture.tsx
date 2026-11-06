import { imageManifest } from '@/data/imageManifest'

interface Props {
  slug: string
  alt: string
  /** CSS sizes attribute, e.g. "(min-width: 1024px) 33vw, 100vw" */
  sizes?: string
  /** Above-the-fold image: loads eagerly with high priority. */
  priority?: boolean
  className?: string
  /** Extra classes for the <img>. */
  imgClassName?: string
  /** Fix the box ratio, e.g. "4/3". Image is cropped with object-cover. */
  ratio?: string
  focus?: string
}

/** Responsive WebP image with intrinsic dimensions (no layout shift) and a dominant-colour placeholder. */
export default function Picture({ slug, alt, sizes = '100vw', priority, className = '', imgClassName = '', ratio, focus }: Props) {
  const m = imageManifest[slug]
  if (!m) return null
  const srcSet = m.widths.map((w) => `/images/gallery/${slug}-${w}.webp ${w}w`).join(', ')
  const fallback = `/images/gallery/${slug}-${m.widths.includes(960) ? 960 : m.widths[m.widths.length - 1]}.webp`
  return (
    <div className={`overflow-hidden ${className}`} style={{ backgroundColor: m.color, aspectRatio: ratio }}>
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={m.w}
        height={m.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? ({ fetchpriority: 'high' } as object) : {})}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </div>
  )
}
