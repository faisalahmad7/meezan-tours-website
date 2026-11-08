import { Play } from 'lucide-react'
import { useCallback, useState } from 'react'
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

const Row = ({ items, dup, onOpen }: { items: Testimonial[]; dup?: boolean; onOpen: (t: Testimonial) => void }) => (
  <ul className={`flex shrink-0 ${dup ? 'ticker-dup' : ''}`} aria-hidden={dup || undefined}>
    {items.map((t) => <Card key={t.id} t={t} onOpen={onOpen} dup={dup} />)}
  </ul>
)

/**
 * "In their own words": two ribbons of pilgrim quotes drifting in opposite directions, never stopping.
 * Hovering a card makes it grow slightly (the ribbon keeps moving); clicking opens the full review in a larger card.
 * Reduced-motion users get a plain swipeable row instead.
 */
export default function TestimonialRibbon() {
  const all = getTestimonials()
  const [open, setOpen] = useState<Testimonial | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)].filter((r) => r.length > 0)
  return (
    <>
      <div className="ribbon-wrap space-y-2" role="region" aria-label="Pilgrim testimonials">
        {rows.map((items, r) => (
          <div key={r} className="ribbon-mask overflow-hidden py-5">
            <div className={`ribbon-track ${r % 2 ? 'ribbon-rev' : ''}`} style={{ ['--dur' as string]: `${(r % 2 ? 90 : 75) * Math.max(1, items.length / 4)}s` }}>
              <Row items={items} onOpen={setOpen} />
              <Row items={items} dup onOpen={setOpen} />
            </div>
          </div>
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
