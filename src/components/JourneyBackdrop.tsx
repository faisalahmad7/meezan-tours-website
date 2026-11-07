import { useEffect, useRef, useState } from 'react'

/**
 * Full-section backdrop for "From your first intention to your safe return".
 * Layers (back to front): an eight-pointed-star lattice, two large interlocking circles (the vesica piscis,
 * a classic geometry of union and trust) with a glowing lens between them, and a gold thread that runs the
 * whole width of the section. The circles draw themselves once when scrolled into view.
 */
export default function JourneyBackdrop({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [armed, setArmed] = useState(false)
  const [on, setOn] = useState(false)
  useEffect(() => {
    setArmed(true)
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const ring = (cx: number, r: number, dl: number, o: number, w = 1.4) => (
    <circle cx={cx} cy="470" r={r} pathLength="1" fill="none" stroke="#b8923a" strokeOpacity={o} strokeWidth={w} className="jb-draw" style={{ ['--dl' as string]: `${dl}s` }} />
  )
  return (
    <svg ref={ref} viewBox="0 0 1440 940" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className={`jb ${armed ? 'armed' : ''} ${on ? 'on' : ''} pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id="jb-star" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M22 22H58V58H22Z M40 14L66 40L40 66L14 40Z" fill="none" stroke="#0f5132" strokeOpacity=".13" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="0" cy="0" r="2" fill="#b8923a" fillOpacity=".3" /><circle cx="80" cy="0" r="2" fill="#b8923a" fillOpacity=".3" /><circle cx="0" cy="80" r="2" fill="#b8923a" fillOpacity=".3" /><circle cx="80" cy="80" r="2" fill="#b8923a" fillOpacity=".3" />
        </pattern>
        <linearGradient id="jb-fade" x1="0" x2="1"><stop offset="0" stopColor="#fff" /><stop offset=".3" stopColor="#fff" stopOpacity=".35" /><stop offset=".7" stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <mask id="jb-mask"><rect width="1440" height="940" fill="url(#jb-fade)" /></mask>
        <radialGradient id="jb-lens"><stop offset="0" stopColor="#e8c767" stopOpacity=".55" /><stop offset=".6" stopColor="#e8c767" stopOpacity=".14" /><stop offset="1" stopColor="#e8c767" stopOpacity="0" /></radialGradient>
        <linearGradient id="jb-line" x1="0" x2="1"><stop offset="0" stopColor="#b8923a" stopOpacity="0" /><stop offset=".25" stopColor="#b8923a" stopOpacity=".7" /><stop offset=".75" stopColor="#b8923a" stopOpacity=".7" /><stop offset="1" stopColor="#b8923a" stopOpacity="0" /></linearGradient>
      </defs>

      <rect width="1440" height="940" fill="url(#jb-star)" mask="url(#jb-mask)" />

      {/* interlocking circles */}
      <ellipse cx="720" cy="470" rx="150" ry="300" fill="url(#jb-lens)" className="jb-glow" />
      {ring(560, 330, 0, 0.34)}{ring(880, 330, 0.6, 0.34)}
      {ring(560, 316, 0.3, 0.16, 1)}{ring(880, 316, 0.9, 0.16, 1)}
      {ring(560, 346, 0.5, 0.12, 1)}{ring(880, 346, 1.1, 0.12, 1)}

      {/* eight-pointed star where the circles meet */}
      <g className="jb-glow" fill="none" stroke="#b8923a" strokeOpacity=".7" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M698 448H742V492H698Z M720 438L752 470L720 502L688 470Z" />
        <circle cx="720" cy="470" r="3" fill="#b8923a" stroke="none" />
      </g>

      {/* thread running the full width: intention at one end, safe return at the other */}
      <path d="M-20 800 C 240 640, 460 900, 720 780 S 1200 650, 1460 790" fill="none" stroke="url(#jb-line)" strokeWidth="1.6" strokeLinecap="round" className="jb-thread" />
      <path d="M-20 820 C 240 660, 460 920, 720 800 S 1200 670, 1460 810" fill="none" stroke="url(#jb-line)" strokeOpacity=".5" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
