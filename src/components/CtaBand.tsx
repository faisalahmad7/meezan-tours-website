import { MessageCircle, Phone } from 'lucide-react'
import { SITE, whatsappLink } from '@/data/site'
import Button from './Button'

export default function CtaBand({ title = 'Your intention begins the journey.', text = 'Let Meezan help you take the next step. Speak to our team about dates, packages and documents.' }: { title?: string; text?: string }) {
  return (
    <section className="pattern-dark on-dark text-white">
      <div className="container section text-center">
        <div data-reveal className="mx-auto max-w-2xl">
          <h2 className="text-display-md text-white">{title}</h2>
          <p className="mt-4 text-lg text-white/80">{text}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={whatsappLink('Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.')} variant="whatsapp"><MessageCircle className="h-5 w-5" aria-hidden="true" />WhatsApp us</Button>
            <Button href={`tel:${SITE.phones[0].tel}`} variant="ghost-light"><Phone className="h-5 w-5" aria-hidden="true" />{SITE.phones[0].display}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
