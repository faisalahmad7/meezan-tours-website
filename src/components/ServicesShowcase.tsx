import { Bed, Bus, FileText, HeartHandshake, Shirt, Users, type LucideIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { whatsappLink } from '@/data/site'
import { WhatsAppIcon } from './BrandIcons'
import Modal from './Modal'
import Picture from './Picture'
import ScrollRow from './ScrollRow'
import ServicesDoodles from './ServicesDoodles'
const Tag = ({ children }: { children: string }) => (
  <span className="inline-block rounded-full bg-gold-300/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-900">{children}</span>
)
interface Service { icon: LucideIcon; title: string; text: string; more: string[]; tag?: string }
const items: Service[] = [
  {
    icon: FileText, title: 'Travel and documentation', text: 'Flights, visa assistance, document guidance and a pre-departure briefing before you travel.',
    more: ['Group flights arranged, with departures organised from Mumbai airport', 'Visa assistance and guidance on the documents you need to prepare', 'A pre-departure briefing so you know what to expect and what to carry', 'Our team answers questions on WhatsApp or by phone before you travel'],
  },
  {
    icon: Bed, title: 'Comfortable stays, thoughtfully arranged', text: 'Makkah and Madinah hotels matched to your package category, with distance from the Haram given where provided.',
    more: ['Makkah and Madinah hotels matched to the category of package you choose', 'Distance from the Haram is stated in the package details where it is provided', 'Room sharing and meal plans are confirmed package by package'],
    tag: 'Varies by package',
  },
  {
    icon: Bus, title: 'Transport', text: 'Airport and group transport, and ziyarat transport, as listed for your package.',
    more: ['Airport and group transfers as listed for your package', 'Transport for ziyarat visits in Makkah and Madinah, where included', 'Your itinerary spells out what is included before you book'],
    tag: 'Varies by package',
  },
  {
    icon: Users, title: 'Pilgrim guidance', text: 'Experienced group guides who coordinate the group and assist elderly pilgrims.',
    more: ['Experienced group guides coordinate the group on the ground', 'Help for elderly pilgrims and first-time travellers', 'Guidance through the rites, and the history of each ziyarat site', 'Local support staff available during the trip'],
  },
  {
    icon: Shirt, title: 'Comfort in every detail', text: 'Practical laundry arrangements to help pilgrims travel comfortably and focus on their worship.',
    more: ['Practical laundry arrangements, so you can pack lighter', 'Details such as how often and where are confirmed for your package'],
    tag: 'Varies by package',
  },
  {
    icon: HeartHandshake, title: 'Every Haji matters. Every step matters.', text: 'From the youngest pilgrim to the eldest, our team checks in and supports every member of the group.',
    more: ['A familiar team from booking to return', 'Our team checks in with every member of the group', 'Support continues until the journey is complete'],
  },
]
export default function ServicesShowcase() {
  const [active, setActive] = useState<Service | null>(null)
  const close = useCallback(() => setActive(null), [])
  return (
    <section className="section relative isolate overflow-hidden bg-ivory pt-10 sm:pt-12 lg:pt-14">
      <ServicesDoodles className="-z-10 opacity-[0.2]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_32%_at_50%_9%,#fbf8f0_35%,transparent_100%)]" aria-hidden="true" />
      <div className="container">
        <div data-reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <p className="eyebrow eyebrow-strong mb-4 justify-center">What we arrange for you</p>
          <h2 className="text-display-lg">Every detail arranged. Every pilgrim valued.</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-700">Meezan does far more than book flights and hotels. Here is what goes into every journey. Inclusions differ by package, so each service notes where that applies.</p>
        </div>
        <div data-reveal className="mb-10 grid gap-3 overflow-hidden rounded-xl2 border border-gold-500/50 bg-white p-3 shadow-soft sm:gap-4 sm:p-4 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <div className="px-3 pb-1 pt-4 sm:px-5 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:pt-5">
            <Tag>Varies by package</Tag>
            <h3 className="mt-4 text-display-md">A taste of home, during your sacred journey.</h3>
            <p className="mt-3 max-w-2xl text-ink-500">Thoughtfully arranged Indian-style meals to bring comfort and familiarity throughout your journey. Pilgrims often mention the food in their feedback. Buffet-style dining and meal arrangements are confirmed package by package.</p>
          </div>
          <Picture slug="buffet" alt="Freshly prepared rice, vegetable and curry dishes at a Meezan hotel buffet" ratio="4/3" sizes="(min-width:1024px) 40vw, 100vw" className="rounded-xl lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[30rem] lg:!aspect-auto lg:h-full" imgClassName="food-boost" focus="50% 55%" />
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <Picture slug="buffet-hotel" alt="Chafing dishes of saffron rice, vegetables and curries laid out at a hotel buffet" ratio="1/1" sizes="(min-width:1024px) 16vw, 31vw" className="rounded-xl lg:min-h-[15rem] lg:!aspect-auto lg:h-full" imgClassName="food-boost" focus="35% 60%" />
            <Picture slug="salad-bar" alt="Fresh red cabbage, cucumber, carrot and orange salad served at a Meezan group meal" ratio="1/1" sizes="(min-width:1024px) 16vw, 31vw" className="rounded-xl lg:min-h-[15rem] lg:!aspect-auto lg:h-full" imgClassName="food-boost" focus="45% 60%" />
            <Picture slug="dessert-buffet" alt="Desserts arranged on the buffet table at a Meezan group meal" ratio="1/1" sizes="(min-width:1024px) 16vw, 31vw" className="rounded-xl lg:min-h-[15rem] lg:!aspect-auto lg:h-full" imgClassName="food-boost" />
          </div>
        </div>
        <p className="mb-3 text-center text-sm font-semibold text-brand-700 sm:mb-5"><span className="sm:hidden">Swipe sideways, tap a card for details &rarr;</span><span className="hidden sm:inline">Select a service for more details</span></p>
        <ScrollRow as="ul" className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.title} data-reveal className="flex shrink-0 basis-[78%] snap-start sm:basis-auto">
              <button
                type="button"
                onClick={() => setActive(it)}
                aria-haspopup="dialog"
                className="svc-card group flex w-full flex-col rounded-xl2 border border-sand-200 bg-white p-6 text-left shadow-soft transition duration-300 hover:z-10 hover:scale-[1.04] hover:border-gold-500/70 hover:shadow-lift focus-visible:scale-[1.04]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-gold-400"><it.icon className="h-6 w-6" aria-hidden="true" /></span>
                <h3 className="mt-4 text-xl font-semibold leading-snug">{it.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{it.text}</p>
                <span className="mt-auto flex items-center justify-between gap-2 pt-4">
                  {it.tag ? <Tag>{it.tag}</Tag> : <span />}
                  <span className="text-sm font-semibold text-brand-700 transition group-hover:translate-x-0.5">Details &rarr;</span>
                </span>
              </button>
            </li>
          ))}
        </ScrollRow>
      </div>
      <Modal open={!!active} onClose={close} label={active?.title ?? 'Service'} width="max-w-xl">
        {active && (
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-gold-400"><active.icon className="h-7 w-7" aria-hidden="true" /></span>
            <h3 className="mt-4 pr-10 text-2xl font-semibold leading-snug sm:text-3xl">{active.title}</h3>
            <p className="mt-3 text-ink-700">{active.text}</p>
            <ul className="mt-5 space-y-2.5 border-t border-gold-500/40 pt-5">
              {active.more.map((m) => (
                <li key={m} className="flex gap-3 text-ink-700"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold-500" />{m}</li>
              ))}
            </ul>
            {active.tag && <div className="mt-5"><Tag>{active.tag}</Tag><p className="mt-2 text-sm text-ink-500">Inclusions differ by package. Our team confirms exactly what applies to the package you choose.</p></div>}
            <a href={whatsappLink(`Assalamu Alaikum, I would like to know more about: ${active.title}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6"><WhatsAppIcon className="h-5 w-5" />Ask about this on WhatsApp</a>
          </div>
        )}
      </Modal>
    </section>
  )
}
