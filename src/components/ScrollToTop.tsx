import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const [show, setShow] = useState(false)
    const { pathname } = useLocation()
    useEffect(() => {
        const check = () => setShow(document.documentElement.scrollHeight > window.innerHeight * 2.2 && window.scrollY > 600)
        check()
        window.addEventListener('scroll', check, { passive: true })
        window.addEventListener('resize', check)
        return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
    }, [pathname])
    return (
        <button type="button" aria-label="Back to top" tabIndex={show ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed right-6 bottom-[5.1rem] z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400 bg-brand-900 text-gold-300 shadow-lift transition duration-300 hover:bg-gold-400 hover:text-brand-950 sm:bottom-6 sm:h-12 sm:w-12 ${show ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
    )
}