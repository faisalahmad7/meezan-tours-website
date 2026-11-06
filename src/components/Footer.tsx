import { AtSign, Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '@/data/navigation'
import { COPYRIGHT_YEAR, SITE, addressLine, whatsappLink } from '@/data/site'
import { Logo } from './Header'

const icons: Record<string, typeof Youtube> = { YouTube: Youtube, Facebook, Instagram, Threads: AtSign }
const link = 'text-white/80 transition hover:text-white'

/** One cell of the "ticket strip": icon, small label, then the details. */
const Cell = ({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: ReactNode }) => (
  <div className="flex gap-3 p-5 sm:p-6">
    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
    <div className="min-w-0 text-sm leading-relaxed text-white/85">
      <h2 className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-300">{label}</h2>
      {children}
    </div>
  </div>
)

export default function Footer() {
  const nav = [...FOOTER_LINKS.explore, ...FOOTER_LINKS.pilgrimage]
  return (
    <footer className="pattern-dark on-dark border-t-4 border-gold-500/70 pt-24 text-white sm:pt-28">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="inline-block self-start rounded-xl bg-white px-4 py-2"><Logo className="h-11 w-auto" /></div>
            <p className="max-w-md text-sm text-white/75">Pune-based Hajj and Umrah operator with 18+ years of experience, serving pilgrims across India. Flights, visas, accommodation and guided support, so you can focus on worship.</p>
          </div>
          {SITE.social.length > 0 && (
            <ul className="flex gap-3">{SITE.social.map((s) => { const Icon = icons[s.label] ?? AtSign; return <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition hover:bg-gold-400 hover:text-brand-950"><Icon className="h-4 w-4" /></a></li> })}</ul>
          )}
        </div>

        {/* ticket strip: perforated dividers, like a boarding pass */}
        <div className="mt-8 grid overflow-hidden rounded-xl2 border border-gold-500/40 bg-brand-950/40 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.1fr_1fr] [&>*]:border-gold-500/30 max-sm:[&>*+*]:border-t max-sm:[&>*+*]:border-dashed sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(n+3)]:border-dashed sm:[&>*:nth-child(even)]:border-l sm:[&>*:nth-child(even)]:border-dashed lg:[&>*]:border-t-0 lg:[&>*+*]:border-l lg:[&>*+*]:border-dashed">
          <Cell icon={MapPin} label="Visit us"><address className="not-italic">{addressLine()}</address></Cell>
          <Cell icon={Phone} label="Call">
            <ul>{SITE.phones.map((p) => <li key={p.tel}><a className={link} href={`tel:${p.tel}`}>{p.display}</a></li>)}</ul>
          </Cell>
          <Cell icon={MessageCircle} label="Message">
            <a className={`${link} block`} href={whatsappLink('Assalamu Alaikum')} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsapp.display}</a>
            <a className={`${link} mt-1 flex items-center gap-1.5 break-all`} href={`mailto:${SITE.email}`}><Mail className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />{SITE.email}</a>
          </Cell>
          <Cell icon={Clock} label="Hours">Mon - Sat, <span className="whitespace-nowrap">10:00 AM - 7:00 PM</span><br />Sunday closed</Cell>
        </div>

        <nav aria-label="Footer" className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm">
          {nav.map((l, i) => <span key={l.to} className="inline-flex items-center gap-2">{i > 0 && <span className="text-gold-400/60" aria-hidden="true">&#10022;</span>}<Link className={link} to={l.to}>{l.label}</Link></span>)}
        </nav>
      </div>

      <div className="mt-8 border-t border-white/10">
        <div className="container flex flex-col gap-3 py-5 text-xs text-white/60 xl:flex-row xl:items-center xl:justify-between">
          <p>&copy; {COPYRIGHT_YEAR} {SITE.name}. All rights reserved.</p>
          <p>{SITE.licence.role}, {SITE.licence.authority}. Licence <a className="underline decoration-dotted underline-offset-2 hover:text-white" href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer">{SITE.licence.number}</a>.</p>
          <ul className="flex gap-5 whitespace-nowrap">{FOOTER_LINKS.legal.map((l) => <li key={l.to}><Link className="hover:text-white" to={l.to}>{l.label}</Link></li>)}</ul>
        </div>
      </div>
    </footer>
  )
}
