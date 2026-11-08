import { ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
interface Props {
  as?: 'div' | 'ul'
  className?: string
  children: ReactNode
  /** Pass your own ref if the parent also needs the scroller (for example, previous/next buttons). */
  scrollerRef?: RefObject<HTMLElement>
  label?: string
  tabIndex?: number
}
/**
 * Horizontal scroller with a mild arrow at the right edge. Phones only (hidden from md up). The arrow shows only while the row really overflows
 * and fades away for good as soon as the visitor scrolls or swipes it.
 */
export default function ScrollRow({ as = 'div', className = '', children, scrollerRef, label, tabIndex }: Props) {
  const own = useRef<HTMLElement>(null)
  const ref = scrollerRef ?? own
  const [hint, setHint] = useState(false)
  const moved = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      if (moved.current) return setHint(false)
      setHint(el.scrollWidth - el.clientWidth > 24 && el.scrollLeft < 12)
    }
    const onScroll = () => {
      if (el.scrollLeft > 24) moved.current = true
      measure()
    }
    measure()
    const t = window.setTimeout(measure, 400)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    return () => {
      window.clearTimeout(t)
      ro?.disconnect()
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [ref])
  const Tag = as as 'div'
  return (
    <div className="relative">
      <Tag ref={ref as RefObject<HTMLDivElement>} className={className} aria-label={label} tabIndex={tabIndex}>
        {children}
      </Tag>
      <span aria-hidden="true" className={`scroll-hint pointer-events-none absolute right-2 top-1/2 z-20 -mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-lift ring-2 ring-gold-500/70 transition-opacity duration-500 md:hidden ${hint ? 'opacity-95' : 'opacity-0'}`}>
        <ChevronRight className="h-5 w-5" />
      </span>
    </div>
  )
}
