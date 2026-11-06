import { Plus } from 'lucide-react'
import type { Faq as FaqType } from '@/data/types'

/** Native <details> accordion: accessible, no JavaScript. */
export default function Faq({ items }: { items: FaqType[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-sand-200 rounded-xl2 border border-sand-200 bg-white shadow-soft">
      {items.map((f) => (
        <details key={f.q} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-brand-600 transition group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-3 text-ink-500">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
