import {Phone} from 'lucide-react'
import { SITE, whatsappLink } from '@/data/site'
import Button from './Button'
import { WhatsAppIcon } from './BrandIcons'

/** Compact call-to-action card that overlaps the top edge of the footer, so the two read as one closing block. */
export default function CtaBand({ title = 'Your intention begins the journey.', text = 'Let Meezan help you take the next step. Speak to our team about dates, packages and documents.' }: { title?: string; text?: string }) {
  return (
    <section aria-label="Contact us" className="relative z-10 -mb-14 pt-4 sm:-mb-16 sm:pt-8">
      <div className="container">
        <div data-reveal className="pattern-dark on-dark relative overflow-hidden rounded-xl2 border border-gold-500/60 p-7 text-white shadow-lift sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-10">
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold-400/30" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full border border-gold-400/20" />
          <div className="relative max-w-xl text-center lg:text-left">
            <h2 className="text-display-md text-white">{title}</h2>
            <p className="mt-2 text-base text-white/80 sm:text-lg">{text}</p>
          </div>
          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-0 lg:shrink-0">
            <Button href={whatsappLink('Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.')} variant="whatsapp"><WhatsAppIcon className="h-5 w-5" aria-hidden="true" />WhatsApp us</Button>
            <Button href={`tel:${SITE.phones[0].tel}`} variant="ghost-light"><Phone className="h-5 w-5" aria-hidden="true" />{SITE.phones[0].display}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
