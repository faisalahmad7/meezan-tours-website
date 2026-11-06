import { useEffect, useState } from 'react'
import type { HeroSlide } from '@/data/hero'
import Picture from './Picture'

interface Props {
  slides: HeroSlide[]
  className?: string
  ratio: string
  sizes: string
  /** Eager-load the first slide (use for the main hero frame only). */
  priority?: boolean
  intervalMs?: number
  /** Start offset so two frames never change at the same moment. */
  delayMs?: number
}

/** Crossfading slideshow with a slow Ken Burns drift. Pure CSS motion; the timer only toggles a class. */
export default function HeroSlides({ slides, className = '', ratio, sizes, priority, intervalMs = 6500, delayMs = 0 }: Props) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: number | undefined
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (!document.hidden) setI((n) => (n + 1) % slides.length)
      }, intervalMs)
    }, delayMs)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [slides.length, intervalMs, delayMs])

  return (
    <div className={`relative overflow-hidden bg-brand-950 ${className}`} style={{ aspectRatio: ratio }}>
      {slides.map((s, n) => (
        <div key={s.slug} aria-hidden={n !== i} className={`kb absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${n === i ? 'opacity-100' : 'opacity-0'}`}>
          <Picture slug={s.slug} alt={s.alt} sizes={sizes} priority={priority && n === 0} focus={s.focus} className="absolute inset-0 h-full" />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent" />
    </div>
  )
}
