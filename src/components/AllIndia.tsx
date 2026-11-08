import {Plane} from 'lucide-react'
import { whatsappLink } from '@/data/site'
import Button from './Button'
import Picture from './Picture'
import { WhatsAppIcon } from './BrandIcons'
/** Mumbai hub -> Madinah and Makkah. Origin nodes are deliberately unlabelled dots: no outline of India is traced (map borders are legally sensitive in India). */
const ORIGINS: [number, number][] = [[70, 286], [150, 340], [48, 374], [205, 410], [262, 300], [118, 420]]
const MUM: [number, number] = [380, 336]
const MADINAH: [number, number] = [868, 296]
const MAKKAH: [number, number] = [1100, 352]
const up = `M${MUM[0]} ${MUM[1]} C 520 70, 720 60, ${MADINAH[0]} ${MADINAH[1]}`
const mid = `M${MUM[0]} ${MUM[1]} C 560 190, 900 140, ${MAKKAH[0]} ${MAKKAH[1]}`
/**
 * Glowing journey line that sits as a band along the bottom of the section, behind the content and the buttons.
 * On phones it is drawn much larger and cropped to the Mumbai-Madinah-Makkah stretch (the origin dots are off-screen there).
 */
function RouteGlow() {
  return (
    <svg viewBox="0 0 1200 440" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" className="route-glow pointer-events-none absolute bottom-0 left-[-44vw] h-auto w-[168vw] max-w-none sm:inset-x-0 sm:left-0 sm:mx-auto sm:w-full sm:max-w-[1500px]">
      <defs>
        <pattern id="route-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#d9b96a" fillOpacity=".22" /></pattern>
        <radialGradient id="route-halo"><stop offset="0" stopColor="#f0d588" stopOpacity=".6" /><stop offset="1" stopColor="#d9b96a" stopOpacity="0" /></radialGradient>
        <linearGradient id="route-line" x1="0" x2="1"><stop offset="0" stopColor="#d9b96a" stopOpacity=".35" /><stop offset=".5" stopColor="#f0d588" /><stop offset="1" stopColor="#d9b96a" /></linearGradient>
        <filter id="route-blur" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect x="10" y="240" width="300" height="190" rx="30" fill="url(#route-dots)" />
      <rect x="800" y="240" width="380" height="190" rx="30" fill="url(#route-dots)" />
      {ORIGINS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y} Q ${(x + MUM[0]) / 2} ${(y + MUM[1]) / 2 + (y < MUM[1] ? -34 : 34)}, ${MUM[0]} ${MUM[1]}`} fill="none" stroke="#d9b96a" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" className="route-flow" />
          <circle cx={x} cy={y} r="5" fill="#fbf8f0" fillOpacity=".8" />
          <circle cx={x} cy={y} r="12" fill="none" stroke="#fbf8f0" strokeOpacity=".28" />
        </g>
      ))}
      <text x="40" y="262" fill="#fbf8f0" fillOpacity=".75" fontSize="22" letterSpacing="3">YOUR CITY</text>
      {[up, mid].map((d) => (
        <g key={d} fill="none" strokeLinecap="round">
          <path d={d} stroke="#f0d588" strokeOpacity=".75" strokeWidth="10" filter="url(#route-blur)" className="route-pulse" />
          <path d={d} stroke="url(#route-line)" strokeWidth="2.5" strokeDasharray="3 10" className="route-flow" />
        </g>
      ))}
      <g className="route-plane" style={{ offsetPath: `path('${up}')` }}><circle r="20" fill="url(#route-halo)" /><circle r="6" fill="#fff7dc" /></g>
      <g className="route-plane route-plane-b" style={{ offsetPath: `path('${mid}')` }}><circle r="20" fill="url(#route-halo)" /><circle r="6" fill="#fff7dc" /></g>
      {([[MUM, 'Mumbai', 'Airport departure'], [MADINAH, 'Madinah', ''], [MAKKAH, 'Makkah', '']] as const).map(([[x, y], name, sub]) => (
        <g key={name}>
          <circle cx={x} cy={y} r="50" fill="url(#route-halo)" className="route-pulse" />
          <circle cx={x} cy={y} r="10" fill="#f0d588" />
          <circle cx={x} cy={y} r="22" fill="none" stroke="#f0d588" strokeOpacity=".55" />
          <text x={x} y={y + 54} textAnchor="middle" fill="#fbf8f0" fontSize="32" fontWeight="600" fontFamily="'Playfair Display Variable','Playfair Display',Georgia,serif">{name}</text>
          {sub && <text x={x} y={y + 80} textAnchor="middle" fill="#d9b96a" fontSize="21">{sub}</text>}
        </g>
      ))}
    </svg>
  )
}
/**
 * Phone order: heading and paragraph, then the photograph straight under them, then the "One journey" line and the
 * Enquire / Contact buttons (which sit on top of the route graphic). From lg up it is the familiar two-column layout.
 */
export default function AllIndia() {
  return (
    <section className="pattern-dark on-dark relative isolate overflow-hidden pb-24 pt-6 text-white sm:pb-44 sm:pt-8 lg:pb-60">
      <RouteGlow />
      {/* soft fades so the lattice pattern never meets the sections above and below with a visible seam */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#134234] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#134234] to-transparent" />
      <div className="container relative">
        <div className="mx-auto mb-10 h-px max-w-3xl bg-gradient-to-r from-transparent via-gold-400/60 to-transparent sm:mb-14" aria-hidden="true" />
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-0">
          <div data-reveal className="mx-auto max-w-xl text-center lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-end lg:text-left">
            <p className="eyebrow mb-4 !flex flex-col items-center gap-2.5 lg:flex-row lg:justify-start lg:gap-2">Based in Pune. Trusted by pilgrims across India.</p>
            <h2 className="font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.6rem]">From across India, together towards the House of Allah.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-[1.05rem]">Rooted in Pune, Meezan Tours &amp; Travels welcomes pilgrims from every part of India. Wherever your journey begins, our commitment remains the same: thoughtful arrangements, personal attention and support throughout your sacred pilgrimage.</p>
          </div>
          <div data-reveal className="relative pb-10 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center lg:pb-12 lg:pl-4">
            <Picture slug="group-plateau" alt="A large group of Meezan pilgrims posing together near a rocky mountain" ratio="16/10" sizes="(min-width:1024px) 52vw, 100vw" className="rounded-xl2 border border-gold-500/50 shadow-lift" />
            <Picture slug="haram-group-wide-2" alt="Meezan pilgrims in ihram on the Masjid al-Haram plaza with the Kaaba behind them" ratio="4/3" sizes="(min-width:1024px) 24vw, 46vw" className="absolute bottom-0 left-0 w-[42%] rounded-xl2 border-2 border-gold-400/80 shadow-lift lg:-left-6" focus="50% 60%" />
            <div className="on-dark absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-brand-950/75 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300 backdrop-blur sm:right-4 sm:top-4"><Plane className="h-4 w-4" aria-hidden="true" />Mumbai to Makkah &amp; Madinah</div>
          </div>
          <div data-reveal className="mx-auto max-w-xl text-center lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none lg:self-start lg:pt-6 lg:text-left">
            <p className="mx-auto max-w-md border-gold-400/70 py-1 font-display text-lg italic leading-snug text-gold-300 lg:mx-0 lg:border-l-2 lg:pl-5 sm:text-xl">One journey. One group. One commitment to every Haji.</p>
            <p className="sr-only">Group journeys leave from Mumbai airport for Madinah and Makkah and return to Mumbai.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start [&>*]:whitespace-nowrap">
              <Button href={whatsappLink('Assalamu Alaikum, I am enquiring from outside Pune about Hajj / Umrah packages.')} variant="gold"><WhatsAppIcon className="h-5 w-5" aria-hidden="true" />Enquire from your city</Button>
              <Button to="/contact" variant="ghost-light" className="!bg-brand-950/70 backdrop-blur-sm">Contact our Pune office</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
