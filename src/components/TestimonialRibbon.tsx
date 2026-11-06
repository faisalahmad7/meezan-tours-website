import type { Testimonial } from '@/data/types'
import { getTestimonials } from '@/services/content'

const initials = (n: string) =>
  n.replace(/^(Dr\.?|Haji|Hajjan|Mr\.?|Mrs\.?|Ms\.?)\s+/i, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

function Card({ t }: { t: Testimonial }) {
  return (
    <li className="ribbon-card relative mr-5 w-[19rem] shrink-0 sm:mr-6 sm:w-[24rem]">
      {/* bookmark tab carries the trip */}
      <span className="ribbon-tab on-dark absolute -top-px left-6 z-10 bg-brand-900 px-3 pb-4 pt-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.14em] text-gold-300">
        {t.trip.split(',')[0]}
      </span>
      <figure className="flex h-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 pt-16 shadow-soft sm:p-7 sm:pt-16">
        <blockquote lang={t.lang} className="line-clamp-6 flex-1 text-[0.95rem] leading-relaxed text-ink-700">{t.quote}</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-sand-200 pt-4">
          <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-300/60 font-display text-sm font-semibold text-brand-900">{initials(t.name)}</span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold text-ink-900">{t.name}</span>
            <span className="block truncate text-xs text-ink-500">{t.place}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  )
}

const Row = ({ items, dup }: { items: Testimonial[]; dup?: boolean }) => (
  <ul className={`flex shrink-0 ${dup ? 'ticker-dup' : ''}`} aria-hidden={dup || undefined}>
    {items.map((t) => <Card key={t.id} t={t} />)}
  </ul>
)

/**
 * "In their own words": two slow ribbons of pilgrim quotes drifting in opposite directions.
 * Hover or focus pauses them; reduced-motion users get a plain swipeable row instead.
 */
export default function TestimonialRibbon() {
  const all = getTestimonials()
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)].filter((r) => r.length > 0)
  return (
    <div className="ribbon-wrap space-y-6" role="region" aria-label="Pilgrim testimonials">
      {rows.map((items, r) => (
        <div key={r} className="ribbon-mask overflow-hidden pt-1">
          <div className={`ribbon-track ${r % 2 ? 'ribbon-rev' : ''}`} style={{ ['--dur' as string]: `${(r % 2 ? 90 : 75) * Math.max(1, items.length / 4)}s` }}>
            <Row items={items} />
            <Row items={items} dup />
          </div>
        </div>
      ))}
    </div>
  )
}
