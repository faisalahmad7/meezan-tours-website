import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { whatsappLink } from '@/data/site'
import { useMotion } from '@/lib/useMotion'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'
import { WhatsAppIcon } from './BrandIcons'

export default function Layout() {
  const { pathname, hash } = useLocation()
  useMotion()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-full bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <ScrollToTop />
      <a
        href={whatsappLink('Assalamu Alaikum, I would like to enquire about Hajj / Umrah packages.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Meezan on WhatsApp"
        className="fixed bottom-4 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa59] text-white shadow-lift transition hover:scale-105 sm:hidden"
      >
        <WhatsAppIcon className="h-7 w-7" aria-hidden="true" />
      </a>
    </>
  )
}
