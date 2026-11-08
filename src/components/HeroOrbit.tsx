import { Bus as BusIcon, Plane as PlaneIcon } from 'lucide-react'
import type { HeroSlide } from '@/data/hero'
import HeroSlides from './HeroSlides'

/**
 * Hero stage: the main photograph sits in the middle and the pilgrim route runs once around it as a closed oval loop.
 *   Mumbai -> Jeddah (flight), Jeddah -> Makkah (coach), Makkah -> Madinah (coach), Madinah -> Jeddah (coach),
 *   Jeddah -> Mumbai (flight).
 * Jeddah therefore appears twice on the ring, once on the way out and once on the way back.
 * One vehicle at a time travels each leg, in order, on a shared 12 second loop (SVG animateMotion, so there is no
 * script and nothing can drift out of line). The route is illustrative and not to scale. Styles: .ho-* in index.css.
 */
const W = 480
const H = 580
const CX = W / 2
const CY = H / 2
const RX = 198
const RY = 262
const f = (n: number) => n.toFixed(2)
/** Point on the ring (an oval hugging the tall photograph), angle in degrees clockwise from twelve o'clock. */
const pt = (deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180
  return [CX + RX * Math.sin(a), CY - RY * Math.cos(a)]
}
/** Clockwise arc along the ring from one angle to another. */
const arc = (from: number, to: number) => {
  const [x1, y1] = pt(from)
  const [x2, y2] = pt(to)
  const span = (to - from + 360) % 360
  return `M${f(x1)} ${f(y1)}A${RX} ${RY} 0 ${span > 180 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`
}

const STOPS = { M: 300, J1: 20, K: 60, D: 95, J2: 125 } as const
const LEGS = [
  { id: 'l1', kind: 'flight', d: arc(STOPS.M, STOPS.J1), t: [0, 2.4] },
  { id: 'l2', kind: 'coach', d: arc(STOPS.J1, STOPS.K), t: [2.6, 4.0] },
  { id: 'l3', kind: 'coach', d: arc(STOPS.K, STOPS.D), t: [4.2, 5.4] },
  { id: 'l4', kind: 'coach', d: arc(STOPS.D, STOPS.J2), t: [5.6, 6.8] },
  { id: 'l5', kind: 'flight', d: arc(STOPS.J2, STOPS.M), t: [7.0, 10.0] },
] as const
const LOOP = 12
const NODES = [
  { name: 'MUMBAI', a: STOPS.M },
  { name: 'JEDDAH', a: STOPS.J1 },
  { name: 'MAKKAH', a: STOPS.K },
  { name: 'MADINAH', a: STOPS.D },
  { name: 'JEDDAH', a: STOPS.J2 },
]
const PLANE = 'M12 0 L4 -2 L-1 -10 L-4 -10 L-2 -2 L-8 -2 L-10 -5 L-12 -5 L-11 0 L-12 5 L-10 5 L-8 2 L-2 2 L-4 10 L-1 10 L4 2 Z'

function Vehicle({ leg }: { leg: (typeof LEGS)[number] }) {
  const [s, e] = leg.t
  const ks = s / LOOP
  const ke = e / LOOP
  const fade = 0.012
  return (
    <g className="ho-vehicle" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={`0;${f(ks)};${f(ks + fade)};${f(ke - fade)};${f(ke)};1`} dur={`${LOOP}s`} repeatCount="indefinite" />
      <animateMotion path={leg.d} dur={`${LOOP}s`} repeatCount="indefinite" rotate={leg.kind === 'flight' ? 'auto' : '0'} calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${f(ks)};${f(ke)};1`} />
      <circle r="13" fill="#082a21" stroke="#e8c767" strokeWidth="1.4" />
      {leg.kind === 'flight' ? (
        <path d={PLANE} transform="scale(.62)" fill="#fff1c2" stroke="#e8c767" strokeWidth="1" strokeLinejoin="round" />
      ) : (
        <g fill="none" stroke="#fff1c2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-7" y="-6" width="14" height="10.5" rx="1.9" />
          <path d="M-7 -1.5h14M-4 4.5v2M4 4.5v2" />
        </g>
      )}
    </g>
  )
}

interface Props {
  main: HeroSlide[]
  side: HeroSlide[]
}

export default function HeroOrbit({ main, side }: Props) {
  return (
    <div>
      <div className="relative mx-auto w-full" style={{ aspectRatio: `${W}/${H}` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Pilgrim route around the Meezan journey: flight from Mumbai to Jeddah, coach from Jeddah to Makkah, Makkah to Madinah and Madinah back to Jeddah, then the flight from Jeddah to Mumbai."
          className="ho absolute inset-0 z-0 h-full w-full overflow-visible"
        >
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#e8c767" strokeOpacity=".16" strokeWidth="12" />
          <ellipse cx={CX} cy={CY} rx={RX + 15} ry={RY + 15} fill="none" stroke="#e8c767" strokeOpacity=".2" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
          <g fill="none" strokeLinecap="round">
            {LEGS.map((l) =>
              l.kind === 'flight' ? (
                <path key={l.id} d={l.d} stroke="#f0d588" strokeWidth="2.6" strokeDasharray="7 7" className="ho-flow" />
              ) : (
                <path key={l.id} d={l.d} stroke="#fbf8f0" strokeOpacity=".9" strokeWidth="2.4" strokeDasharray="2.5 7" className="ho-flow" />
              ),
            )}
          </g>
          {LEGS.map((l) => <Vehicle key={l.id} leg={l} />)}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-10 w-[70%] -translate-x-1/2 -translate-y-1/2">
          <div className="arch gold-frame overflow-hidden">
            <HeroSlides slides={main} ratio="3/4" sizes="(min-width:1024px) 34vw, 72vw" priority className="h-full" />
          </div>
        </div>
        {/* labels sit above the photograph so no stop is ever hidden behind it */}
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 z-[15] h-full w-full overflow-visible">
          {NODES.map((n, i) => {
            const [x, y] = pt(n.a)
            const w = n.name.length * 8.6 + 20
            return (
              <g key={i} transform={`translate(${f(x)} ${f(y)})`}>
                <rect x={-w / 2} y="-11.5" width={w} height="23" rx="11.5" fill="#082a21" stroke="#e8c767" strokeWidth="1.4" />
                <text y="4.2" textAnchor="middle" fill="#fff7dc" fontSize="11.5" fontWeight="700" letterSpacing=".9" fontFamily="ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif">{n.name}</text>
              </g>
            )
          })}
        </svg>
        <div className="absolute bottom-[9%] left-[0%] z-20 w-[32%]">
          <HeroSlides slides={side} ratio="4/3" sizes="(min-width:1024px) 14vw, 36vw" delayMs={3200} intervalMs={5200} className="rounded-xl2 border-2 border-gold-400/80 shadow-lift" />
        </div>
      </div>
      <p className="mt-1 hidden items-center sm:flex justify-center gap-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
        <span className="inline-flex items-center gap-1.5"><PlaneIcon className="h-4 w-4 text-gold-400" aria-hidden="true" />Flight</span>
        <span className="inline-flex items-center gap-1.5"><BusIcon className="h-4 w-4 text-gold-400" aria-hidden="true" />Coach</span>
      </p>
    </div>
  )
}
