import { useEffect, useRef, type ReactNode } from 'react'

const DESIGN_WIDTH = 2560 // the width your 75% screenshot is laid out at

export default function HeroFit({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const apply = () => {
      const w = window.innerWidth
      const s = w >= 1024 ? Math.min(1.6, Math.max(0.5, w / DESIGN_WIDTH)) : 1
      el.style.setProperty('zoom', String(s))
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  return <div ref={ref}>{children}</div>
}