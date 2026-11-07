import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '@/data/navigation'
import { SITE, whatsappLink } from '@/data/site'
import { WhatsAppIcon } from './BrandIcons'
import Button from './Button'

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
  { label: 'Home', to: '/' }, { label: 'Hajj', to: '/hajj' }, { label: 'Umrah', to: '/umrah' }, { label: 'Packages', to: '/packages' },
  { label: 'Ziyarat', to: '/ziyarat' }, { label: 'Gallery', to: '/gallery' }, { label: 'About Us', to: '/about' }, { label: 'Contact', to: '/contact' },
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
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/60 bg-white text-brand-800 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      </header>
      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-30 overflow-y-auto bg-ivory pt-[4.25rem] lg:hidden">
        <nav aria-label="Mobile" className="container flex flex-col py-4">
          {MOBILE_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `border-b border-sand-200 px-2 py-4 font-display text-2xl font-semibold ${isActive ? 'text-brand-700' : 'text-ink-900'}`}>{l.label}</NavLink>
          ))}
          <div className="mt-6 grid gap-3 pb-8">
            <Button href={whatsappLink(ENQUIRY)} variant="whatsapp"><WhatsAppIcon className="h-5 w-5" />WhatsApp us</Button>
            <Button href={`tel:${SITE.phones[0].tel}`} variant="outline"><Phone className="h-5 w-5" aria-hidden="true" />Call {SITE.phones[0].display}</Button>
          </div>
        </nav>
      </div>
    </>
  )
}
