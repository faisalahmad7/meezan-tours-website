import { Bed, Bus, FileText, HeartHandshake, Shirt, Users } from 'lucide-react'
import Picture from './Picture'
import SectionHeading from './SectionHeading'

const Tag = ({ children }: { children: string }) => (
  <span className="inline-block rounded-full bg-gold-300/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-900">{children}</span>
)

const items = [
  { icon: FileText, title: 'Travel and documentation', text: 'Flights, visa assistance, document guidance and a pre-departure briefing before you travel.' },
  { icon: Bed, title: 'Comfortable stays, thoughtfully arranged', text: 'Makkah and Madinah hotels matched to your package category, with distance from the Haram given where provided.' },
  { icon: Bus, title: 'Transport', text: 'Airport and group transport, and ziyarat transport, as listed for your package.' },
  { icon: Users, title: 'Pilgrim guidance', text: 'Experienced group guides who coordinate the group and assist elderly pilgrims.' },
  { icon: Shirt, title: 'Comfort in every detail', text: 'Practical laundry arrangements to help pilgrims travel comfortably and focus on their worship.', tag: 'Varies by package' },
  { icon: HeartHandshake, title: 'Every Haji matters. Every step matters.', text: 'From the youngest pilgrim to the eldest, our team checks in and supports every member of the group.' },
]

export default function ServicesShowcase() {
  return (
    <section className="section bg-sand-100">
      <div className="container">
        <SectionHeading eyebrow="Our services" title="Every detail arranged. Every pilgrim valued." intro="Meezan does far more than book flights and hotels. Inclusions differ by package, so each card notes where that applies." center />

        <div data-reveal className="mb-6 grid overflow-hidden rounded-xl2 border border-gold-500/40 bg-white shadow-soft md:grid-cols-[0.8fr_1.2fr]">
          <Picture slug="buffet" alt="Freshly prepared rice, vegetable and curry dishes at a Meezan hotel buffet" ratio="4/5" sizes="(min-width:768px) 40vw, 100vw" className="md:h-full md:!aspect-auto" focus="50% 50%" />
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <Tag>Varies by package</Tag>
            <h3 className="mt-4 text-display-md">A taste of home, during your sacred journey.</h3>
            <p className="mt-4 text-ink-500">Thoughtfully arranged Indian-style meals to bring comfort and familiarity throughout your journey. Pilgrims often mention the food in their feedback. Buffet-style dining and meal arrangements are confirmed package by package.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} data-reveal className="rounded-xl2 border border-sand-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-gold-400"><it.icon className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-4 text-xl font-semibold leading-snug">{it.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{it.text}</p>
              {it.tag && <div className="mt-3"><Tag>{it.tag}</Tag></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
