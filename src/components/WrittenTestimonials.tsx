import { Quote } from 'lucide-react'
import { useState } from 'react'
import type { Testimonial } from '@/data/types'
import type { PackageKind } from '@/data/types'
import { getTestimonials } from '@/services/content'

function Card({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false)
  const long = t.quote.length > 280
  return (
    <figure data-reveal className="mb-6 break-inside-avoid rounded-xl2 border border-sand-200 bg-white p-6 shadow-soft sm:p-7">
      <Quote className="h-9 w-9 text-gold-500" aria-hidden="true" />
      <blockquote lang={t.lang} className={`mt-3 whitespace-pre-line text-[0.97rem] leading-relaxed text-ink-700 ${long && !open ? 'line-clamp-6' : ''}`}>{t.quote}</blockquote>
      {long && <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="mt-3 text-sm font-semibold text-brand-700 underline underline-offset-4">{open ? 'Show less' : 'Read full review'}</button>}
      <figcaption className="mt-5 border-t border-sand-200 pt-4">
        <p className="font-display text-lg font-semibold text-ink-900">{t.name}</p>
        <p className="text-sm text-ink-500">{t.place} &middot; {t.trip}</p>
      </figcaption>
    </figure>
  )
}

export default function WrittenTestimonials({ kind }: { kind?: PackageKind }) {
  return <div className="columns-1 gap-6 md:columns-2 lg:columns-3">{getTestimonials(kind).map((t) => <Card key={t.id} t={t} />)}</div>
}
