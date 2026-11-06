import { Quote } from 'lucide-react'
import { getTestimonials } from '@/services/content'

export default function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {getTestimonials().map((t) => (
        <figure key={t.id} data-reveal className="card flex flex-col p-6 sm:p-7">
          <Quote className="h-8 w-8 text-gold-500" aria-hidden="true" />
          <blockquote lang={t.lang} className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 border-t border-sand-200 pt-4">
            <p className="font-display text-lg text-ink-900">{t.name}</p>
            <p className="text-sm text-ink-500">{t.place} &middot; {t.trip}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
