import { AtSign, Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '@/data/navigation'
import { COPYRIGHT_YEAR, SITE, addressLine, whatsappLink } from '@/data/site'
import { Logo } from './Header'

const icons: Record<string, typeof Youtube> = { YouTube: Youtube, Facebook, Instagram, Threads: AtSign }
const col = 'mb-4 font-display text-lg text-white'
const link = 'text-white/75 transition hover:text-white'

export default function Footer() {
  return (
    <footer className="pattern-dark on-dark border-t-4 border-gold-500/70 text-white">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-16">
        <div>
          <div className="inline-block rounded-xl bg-white px-4 py-2"><Logo className="h-11 w-auto" /></div>
          <p className="mt-5 max-w-xs text-sm text-white/75">
            Pune-based Hajj and Umrah operator with 18+ years of experience, serving pilgrims across India. Flights, visas, accommodation and guided support, so you can focus on worship.
          </p>
          <p className="mt-4 text-xs text-white/60">{SITE.licence.role}, {SITE.licence.authority}. Licence <a className="underline decoration-dotted underline-offset-2 hover:text-white" href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer">{SITE.licence.number}</a>.</p>
        </div>
        <nav aria-label="Explore">
          <h2 className={col}>Explore</h2>
          <ul className="space-y-2.5 text-sm">{FOOTER_LINKS.explore.map((l) => <li key={l.to}><Link className={link} to={l.to}>{l.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Pilgrimage">
          <h2 className={col}>Pilgrimage</h2>
          <ul className="space-y-2.5 text-sm">{FOOTER_LINKS.pilgrimage.map((l) => <li key={l.to}><Link className={link} to={l.to}>{l.label}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 className={col}>Visit or call</h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><address className="not-italic">{addressLine()}</address></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><span>{SITE.phones.map((p, i) => <span key={p.tel}>{i > 0 && ', '}<a className={link} href={`tel:${p.tel}`}>{p.display}</a></span>)}</span></li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><a className={link} href={whatsappLink('Assalamu Alaikum')} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsapp.display}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><a className={link} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><span>Mon - Sat, 10:00 AM - 7:00 PM<br />Sunday closed</span></li>
          </ul>
          {SITE.social.length > 0 && (
            <ul className="mt-5 flex gap-3">{SITE.social.map((s) => { const Icon = icons[s.label] ?? AtSign; return <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition hover:bg-gold-400 hover:text-brand-950"><Icon className="h-4 w-4" /></a></li> })}</ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {COPYRIGHT_YEAR} {SITE.name}. All rights reserved.</p>
          <ul className="flex gap-5">{FOOTER_LINKS.legal.map((l) => <li key={l.to}><Link className="hover:text-white" to={l.to}>{l.label}</Link></li>)}</ul>
        </div>
      </div>
    </footer>
  )
}
