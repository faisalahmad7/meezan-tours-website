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

        <div data-reveal className="mb-6 grid gap-3 overflow-hidden rounded-xl2 border border-gold-500/40 bg-white p-3 shadow-soft sm:gap-4 sm:p-4 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <div className="px-3 pb-1 pt-4 sm:px-5 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:pt-5">
            <Tag>Varies by package</Tag>
            <h3 className="mt-4 text-display-md">A taste of home, during your sacred journey.</h3>
            <p className="mt-3 max-w-2xl text-ink-500">Thoughtfully arranged Indian-style meals to bring comfort and familiarity throughout your journey. Pilgrims often mention the food in their feedback. Buffet-style dining and meal arrangements are confirmed package by package.</p>
          </div>
          <Picture slug="buffet" alt="Freshly prepared rice, vegetable and curry dishes at a Meezan hotel buffet" ratio="4/3" sizes="(min-width:1024px) 40vw, 100vw" className="rounded-xl lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[30rem] lg:!aspect-auto lg:h-full" focus="50% 55%" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <Picture slug="buffet-hotel" alt="Chafing dishes of saffron rice, vegetables and curries laid out at a hotel buffet" ratio="1/1" sizes="(min-width:1024px) 24vw, 46vw" className="rounded-xl lg:min-h-[15rem] lg:!aspect-auto lg:h-full" focus="35% 60%" />
            <Picture slug="salad-bar" alt="Fresh red cabbage, cucumber, carrot and orange salad served at a Meezan group meal" ratio="1/1" sizes="(min-width:1024px) 24vw, 46vw" className="rounded-xl lg:min-h-[15rem] lg:!aspect-auto lg:h-full" focus="45% 60%" />
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
