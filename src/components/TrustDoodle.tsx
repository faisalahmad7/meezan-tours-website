import { useEffect, useRef, useState } from 'react'

/**
 * Line-art of two pilgrims in ihram walking hand in hand, with a crescent and stars above and a dotted
 * path beneath. It draws itself once when scrolled into view; the joined hands keep a soft golden pulse.
 * Decorative background for "From your first intention to your safe return".
 */
export default function TrustDoodle({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [armed, setArmed] = useState(false)
  const [on, setOn] = useState(false)
  useEffect(() => {
    setArmed(true)
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const d = (path: string, delay: number, extra = '') => (
    <path d={path} pathLength="1" className={`doodle-s doodle-d ${extra}`} style={{ ['--dl' as string]: `${delay}s` }} />
  )
  return (
    <svg ref={ref} viewBox="0 0 640 420" aria-hidden="true" focusable="false" className={`doodle ${armed ? 'armed' : ''} ${on ? 'on' : ''} text-brand-700 ${className}`} stroke="currentColor" strokeWidth="2.6">
      {/* path of the journey */}
      <path d="M20 372 C 140 392, 230 352, 320 372 S 520 392, 620 360" className="doodle-s" strokeDasharray="2 10" strokeOpacity=".7" />

      {/* crescent + stars */}
      <g className="text-gold-600" stroke="currentColor">
        {d('M318 36 C 292 40, 280 70, 298 92 C 280 90, 262 70, 268 48 C 274 28, 300 22, 318 36 Z', 2.2)}
        <g className="doodle-star"><path d="M356 52 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5 z" className="doodle-s" strokeWidth="2" /></g>
        <g className="doodle-star" style={{ animationDelay: '1.6s' }}><path d="M230 96 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" className="doodle-s" strokeWidth="1.8" /></g>
      </g>

      {/* pilgrim on the left (taller): head, robe, shoulder cloth, outer arm */}
      {d('M236 152 a28 28 0 1 1 0.1 0 z', 0)}
      {d('M218 181 C 196 198, 192 290, 186 372 L 268 372 C 262 290, 262 214, 250 181', 0.5)}
      {d('M218 183 C 234 206, 250 224, 266 232', 0.9)}
      {d('M214 204 C 198 246, 190 262, 192 284', 1.2)}
      {/* pilgrim on the right (a little shorter) */}
      {d('M404 176 a26 26 0 1 1 0.1 0 z', 0.3)}
      {d('M386 203 C 368 226, 366 304, 362 372 L 442 372 C 436 306, 436 232, 422 203', 0.8)}
      {d('M422 205 C 410 232, 390 246, 372 250', 1.2)}
      {d('M428 232 C 440 266, 446 284, 444 302', 1.5)}
      {/* joined hands */}
      {d('M266 232 C 296 252, 330 258, 372 250', 1.8, 'text-gold-600')}
      <circle cx="320" cy="254" r="22" className="doodle-heart text-gold-500" fill="currentColor" stroke="none" fillOpacity=".35" />
      <path d="M320 262 c-9 -7 -14 -12 -14 -18 a7 7 0 0 1 14 -2 a7 7 0 0 1 14 2 c0 6 -5 11 -14 18 z" className="doodle-s text-gold-600" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
