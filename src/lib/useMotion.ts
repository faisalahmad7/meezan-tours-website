import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * GSAP is loaded lazily (separate chunk) after hydration and skipped entirely when the user
 * prefers reduced motion. Markup: [data-hero] children fade up, [data-reveal] reveals on scroll,
 * [data-parallax] drifts slightly on larger screens.
 */
export function useMotion() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    let ctx: { revert: () => void } | undefined
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.from('[data-hero] > *', { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.12 })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
          gsap.from(el, {
            opacity: 0,
            y: 32,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
        if (window.innerWidth >= 768) {
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
            gsap.to(el, {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: true },
            })
          })
        }
      })
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [pathname])
}
