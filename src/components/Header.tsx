import { ChevronDown, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '@/data/navigation'
import { SITE, whatsappLink } from '@/data/site'
import { SOCIAL_BRAND, WhatsAppIcon } from './BrandIcons'
import Button from './Button'
import Picture from './Picture'

const ENQUIRY = 'Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.'

const NAV_BASE = 'relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-bold tracking-[0.02em] transition duration-200'
const linkCls = ({ isActive }: { isActive: boolean }) =>
  `${NAV_BASE} ${isActive ? 'bg-brand-900 text-white shadow-soft after:absolute after:-bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rotate-45 after:bg-gold-500' : 'text-ink-900 hover:bg-sand-100 hover:text-brand-800'}`

export function Logo({ className = 'h-11 w-auto sm:h-12' }: { className?: string }) {
  return (
    <img
      src="/images/brand/meezan-logo-280.png"
      srcSet="/images/brand/meezan-logo-280.png 280w, /images/brand/meezan-logo-560.png 560w"
      sizes="160px"
      width={280}
      height={129}
      alt="Meezan Hajj & Umrah"
      className={className}
    />
  )
}

const MOBILE_LINKS = [
  { label: 'Home', to: '/' }, { label: 'Packages', to: '/packages' }, { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' }, { label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' },
]
const MOBILE_TILES = [
  { label: 'Hajj', to: '/hajj', slug: 'mina-tent' },
  { label: 'Umrah', to: '/umrah', slug: 'group-mosque' },
  { label: 'Ziyarat', to: '/ziyarat', slug: 'group-hilltop' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`sticky top-0 z-40 border-b-2 transition ${scrolled ? 'border-gold-500/70 bg-ivory/95 shadow-soft backdrop-blur' : 'border-gold-500/40 bg-ivory'}`}>
        <div className="container flex h-[4.25rem] items-center justify-between gap-3 lg:h-24">
          <Link to="/" aria-label="Meezan Tours & Travels, home" className="shrink-0"><Logo className="h-12 w-auto sm:h-14 lg:h-[4.6rem]" /></Link>

          <nav aria-label="Main" className="hidden items-center gap-1.5 lg:flex">
            <NavLink to="/" end className={linkCls}>Home</NavLink>
            <div className="group relative">
              <button type="button" aria-haspopup="true" className={`${NAV_BASE} text-ink-900 hover:bg-sand-100 hover:text-brand-800 group-hover:bg-sand-100 group-focus-within:bg-sand-100`}>
                Pilgrimage
                <ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-80 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="overflow-hidden rounded-xl2 border border-gold-500/40 bg-ivory p-2 shadow-lift">
                  {NAV[0].children!.map((c) => (
                    <li key={c.to}>
                      <Link to={c.to} className="block rounded-lg px-4 py-3 hover:bg-sand-100">
                        <span className="block font-display text-lg font-semibold text-ink-900">{c.label}</span>
                        <span className="text-sm text-ink-500">{c.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {NAV.slice(1).map((item) => <NavLink key={item.to} to={item.to} className={linkCls}>{item.label === 'About' ? 'About Us' : item.label}</NavLink>)}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={whatsappLink(ENQUIRY)} variant="primary" className="hidden sm:inline-flex">
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />Enquire on WhatsApp
            </Button>
            <button type="button" className="burger relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/60 bg-white text-brand-800 shadow-soft lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
              <span aria-hidden="true" className="burger-bars"><i /><i /><i /></span>
            </button>
          </div>
        </div>

      </header>
      <div id="mobile-menu" aria-hidden={!open} className={`mm-panel pattern-dark on-dark fixed inset-0 z-30 overflow-y-auto pt-[4.25rem] text-white lg:hidden ${open ? 'open' : ''}`}>
        <nav aria-label="Mobile" className="container flex flex-col py-6">
          <p className="mm-item eyebrow mb-3" style={{ ['--i' as string]: 0 }}>The pilgrimage</p>
          <ul className="grid grid-cols-3 gap-3">
            {MOBILE_TILES.map((t, i) => (
              <li key={t.to} className="mm-item" style={{ ['--i' as string]: i + 1 }}>
                <Link to={t.to} className="group relative block overflow-hidden rounded-2xl border border-gold-400/70 shadow-lift">
                  <Picture slug={t.slug} alt="" ratio="3/4" sizes="30vw" className="w-full" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 text-center font-display text-lg font-bold text-white">{t.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 border-t border-gold-500/40">
            {MOBILE_LINKS.map((l, i) => (
              <li key={l.to} className="mm-item" style={{ ['--i' as string]: i + 4 }}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `flex items-baseline gap-4 border-b border-white/10 py-3.5 font-display text-[1.75rem] font-bold leading-none ${isActive ? 'text-gold-300' : 'text-white'}`}>
                  <span className="w-7 text-sm font-semibold tracking-widest text-gold-400/80">{String(i + 1).padStart(2, '0')}</span>{l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mm-item mt-7 grid gap-3" style={{ ['--i' as string]: 11 }}>
            <Button href={whatsappLink(ENQUIRY)} variant="whatsapp"><WhatsAppIcon className="h-5 w-5" />WhatsApp us</Button>
            <Button href={`tel:${SITE.phones[0].tel}`} variant="ghost-light"><Phone className="h-5 w-5" aria-hidden="true" />Call {SITE.phones[0].display}</Button>
          </div>
          <ul className="mm-item mt-6 flex justify-center gap-3 pb-10" style={{ ['--i' as string]: 12 }}>
            {SITE.social.filter((x) => SOCIAL_BRAND[x.label]).map((x) => {
              const { Icon } = SOCIAL_BRAND[x.label]
              return <li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer" aria-label={x.label} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/60 text-gold-300"><Icon className="h-5 w-5" /></a></li>
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
