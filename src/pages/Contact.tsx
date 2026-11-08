import {Clock, Mail, MapPin, Phone} from 'lucide-react'
import Button from '@/components/Button'
import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/PageHero'
import Seo from '@/components/Seo'
import { SITE, addressLine, whatsappLink } from '@/data/site'
import { breadcrumbSchema } from '@/lib/schema'
import { WhatsAppIcon } from '@/components/BrandIcons'

export default function Contact() {
  return (
    <>
      <Seo path="/contact" title="Contact Meezan Tours & Travels | Nana Peth, Pune" description="Visit or contact Meezan Tours & Travels at Kulsum Complex, Nana Peth, Pune 411002. Call, WhatsApp or email for Hajj and Umrah enquiries." jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]} />
      <PageHero eyebrow="Contact" title="Begin your sacred journey" crumbs={[{ name: 'Contact', path: '/contact' }]} intro="Based in Pune, welcoming pilgrims from across India. Speak to our team of 18+ years' experience about Hajj, Umrah and Ziyarat." actions={<Button href={whatsappLink('Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.')} variant="whatsapp"><WhatsAppIcon className="h-5 w-5" aria-hidden="true" />WhatsApp us</Button>} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="card space-y-5 p-6 sm:p-8">
              <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">Call us</h2>{SITE.phones.map((p) => <p key={p.tel}><a className="text-ink-700 hover:text-brand-700" href={`tel:${p.tel}`}>{p.display}</a> <span className="text-xs text-ink-400">({p.label})</span></p>)}</div></div>
              <div className="flex gap-4"><WhatsAppIcon className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">WhatsApp</h2><a className="text-ink-700 hover:text-brand-700" href={whatsappLink('Assalamu Alaikum')} target="_blank" rel="noopener noreferrer">{SITE.whatsapp.display}</a></div></div>
              <div className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">Email</h2><a className="break-all text-ink-700 hover:text-brand-700" href={`mailto:${SITE.email}`}>{SITE.email}</a></div></div>
              <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">Office</h2><address className="not-italic text-ink-700">{SITE.name}<br /><a className="underline decoration-gold-500 decoration-dotted underline-offset-4 hover:text-brand-700" href={SITE.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${SITE.name} on Google Maps: ${addressLine()}`}>{addressLine()}</a></address></div></div>
              <div className="flex gap-4"><WhatsAppIcon className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">Follow us</h2><p className="flex flex-wrap gap-x-4">{SITE.social.map((s) => <a key={s.url} className="text-ink-700 hover:text-brand-700" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</p></div></div>
              <div className="flex gap-4"><Clock className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" /><div><h2 className="font-display text-lg">Opening hours</h2>{SITE.hours.map((h) => <p key={h.days} className="text-ink-700">{h.days}: {h.time}</p>)}</div></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container">
          <div className="overflow-hidden rounded-xl2 border border-sand-200 shadow-soft">
            <iframe title="Meezan Tours & Travels office location map" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-80 w-full border-0 sm:h-96" />
          </div>
          <p className="mt-3 text-sm"><a className="font-semibold text-brand-700 underline" href={SITE.mapLink} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
        </div>
      </section>
    </>
  )
}
