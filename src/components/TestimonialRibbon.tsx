import { Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { Testimonial } from '@/data/types'
import { getTestimonials } from '@/services/content'
import Modal from './Modal'
const initials = (n: string) =>
  n.replace(/^(Dr\.?|Haji|Hajjan|Mr\.?|Mrs\.?|Ms\.?)\s+/i, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
function Card({ t, onOpen, dup }: { t: Testimonial; onOpen: (t: Testimonial) => void; dup?: boolean }) {
  return (
    <li className="ribbon-card relative mr-5 w-[19rem] shrink-0 sm:mr-6 sm:w-[24rem]">
      <button
        type="button"
        draggable={false}
        onClick={() => onOpen(t)}
        tabIndex={dup ? -1 : undefined}
        aria-label={`Read ${t.name}'s full review`}
        className="ribbon-btn group block h-full w-full text-left"
      >
        {/* bookmark tab carries the trip */}
        <span className="ribbon-tab on-dark absolute -top-px left-6 z-10 bg-brand-900 px-3 pb-4 pt-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.14em] text-gold-300">
          {t.trip.split(',')[0]}
        </span>
        <figure className="flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 pt-16 shadow-soft transition-colors duration-300 group-hover:border-gold-500/70 sm:p-7 sm:pt-16">
          <blockquote lang={t.lang} className="line-clamp-6 flex-1 text-[0.95rem] leading-relaxed text-ink-700">{t.quote}</blockquote>
          <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-700 opacity-80 transition group-hover:opacity-100">Tap to read in full</span>
          <figcaption className="mt-3 flex items-center gap-3 border-t border-sand-200 pt-4">
            <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-300/60 font-display text-sm font-semibold text-brand-900">{initials(t.name)}</span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold text-ink-900">{t.name}</span>
              <span className="block truncate text-xs text-ink-500">{t.place}</span>
            </span>
          </figcaption>
        </figure>
      </button>
    </li>
  )
}
const DRAG_THRESHOLD = 6
/**
 * One ribbon row. It drifts on its own and NEVER stops: hovering, tapping or opening a review does not pause it.
 * You can also grab it (mouse, or finger held and dragged) and move it wherever you like; it carries on from there.
 * Vertical swipes still scroll the page. Reduced-motion users get a plain swipeable row (see revisions.css).
 */
function RibbonRow({ items, dir, speed, onOpen }: { items: Testimonial[]; dir: 1 | -1; speed: number; onOpen: (t: Testimonial) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const s = useRef({ pos: 0, half: 0, down: false, id: -1, startX: 0, startPos: 0, moved: 0, captured: false })
  useEffect(() => {
    const el = track.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const st = s.current
    const measure = () => { st.half = el.scrollWidth / 2 }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      if (!st.down) st.pos += dir * speed * dt
      if (st.half > 0) st.pos = ((st.pos % st.half) + st.half) % st.half
      el.style.transform = `translate3d(${-st.pos}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro?.disconnect() }
  }, [dir, speed])
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const st = s.current
    st.down = true
    st.id = e.pointerId
    st.startX = e.clientX
    st.startPos = st.pos
    st.moved = 0
    st.captured = false
  }
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (!st.down || e.pointerId !== st.id) return
    const dx = e.clientX - st.startX
    st.moved = Math.max(st.moved, Math.abs(dx))
    if (!st.captured && st.moved > DRAG_THRESHOLD) {
      st.captured = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (st.captured) st.pos = st.startPos - dx
  }
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    st.down = false
    if (st.captured && e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }
  // a drag must not count as a tap on a card
  const onClickCapture = (e: React.MouseEvent) => {
    if (s.current.moved > DRAG_THRESHOLD) { e.preventDefault(); e.stopPropagation(); s.current.moved = 0 }
  }
  return (
    <div
      className="ribbon-mask ribbon-grab overflow-hidden py-5"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onClickCapture={onClickCapture}
    >
      <div ref={track} className="ribbon-js flex w-max">
        <ul className="flex shrink-0">{items.map((t) => <Card key={t.id} t={t} onOpen={onOpen} />)}</ul>
        <ul className="flex shrink-0" aria-hidden="true">{items.map((t) => <Card key={t.id} t={t} onOpen={onOpen} dup />)}</ul>
      </div>
    </div>
  )
}
/**
 * "In their own words": two ribbons of pilgrim quotes drifting in opposite directions, never stopping.
 * Drag either one around with a mouse or a finger. Hovering a card makes it grow; clicking or tapping opens the
 * full review in a larger card.
 */
export default function TestimonialRibbon() {
  const all = getTestimonials()
  const [open, setOpen] = useState<Testimonial | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)].filter((r) => r.length > 0)
  return (
    <>
      <div className="ribbon-wrap space-y-2" role="region" aria-label="Pilgrim testimonials. Drag to move.">
        {rows.map((items, r) => (
          <RibbonRow key={r} items={items} dir={r % 2 ? -1 : 1} speed={r % 2 ? 34 : 40} onOpen={setOpen} />
        ))}
      </div>
      <Modal open={!!open} onClose={close} label={open ? `Review by ${open.name}` : 'Review'} width="max-w-2xl">
        {open && (
          <figure>
            <p className="eyebrow">{open.trip}</p>
            <blockquote lang={open.lang} className="mt-4 font-display text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">&ldquo;{open.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-gold-500/40 pt-5">
              <span aria-hidden="true" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-300/60 font-display font-semibold text-brand-900">{initials(open.name)}</span>
              <span><span className="block font-display text-lg font-semibold text-ink-900">{open.name}</span><span className="block text-sm text-ink-500">{open.place}</span></span>
            </figcaption>
            {open.youtubeId && (
              <a href={`https://www.youtube.com/watch?v=${open.youtubeId}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6"><Play className="h-4 w-4 fill-current" aria-hidden="true" />Watch their video on YouTube</a>
            )}
          </figure>
        )}
      </Modal>
    </>
  )
}
