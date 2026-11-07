import { Link } from 'react-router-dom'
import type { GalleryImage } from '@/data/types'
import Picture from './Picture'

/**
 * Home-page gallery: an asymmetric mosaic with one arch-topped hero tile (echoing the hero),
 * gold "mat" frames, numbered captions that rise on hover, and a slowly turning seal at the centre.
 */
const LAYOUT = [
  'col-span-2 row-span-2 md:col-span-4 lg:rounded-t-[999px] rounded-t-[7rem]',
  'col-span-2 md:col-span-5',
  'col-span-1 md:col-span-3',
  'col-span-1 md:col-span-3',
  'col-span-2 md:col-span-5',
]
const SIZES = ['(min-width:768px) 34vw, 100vw', '(min-width:768px) 42vw, 100vw', '(min-width:768px) 26vw, 50vw', '(min-width:768px) 26vw, 50vw', '(min-width:768px) 42vw, 100vw']

function Seal() {
  return (
    <div className="pointer-events-none absolute left-[33.333%] top-1/2 z-10 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-900 shadow-lift ring-4 ring-sand-100 md:flex" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="gal-seal absolute inset-0 h-full w-full">
        <defs><path id="seal-path" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
        <text fill="#e8c767" fontSize="9.6" letterSpacing="2.6" fontWeight="600"><textPath href="#seal-path">REAL PILGRIMS · REAL MOMENTS ·</textPath></text>
      </svg>
      <span className="font-display text-xl text-gold-300">&#10022;</span>
    </div>
  )
}

export default function GalleryMosaic({ items }: { items: GalleryImage[] }) {
  return (
    <div className="relative">
      <ul className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-12 md:gap-4 lg:auto-rows-[13rem]">
        {items.slice(0, 5).map((g, i) => (
          <li key={g.id} className={`group relative ${LAYOUT[i]} overflow-hidden rounded-xl2 shadow-soft`}>
            <Link to="/gallery" aria-label={`${g.title}. Open the gallery`} className="block h-full">
              <Picture slug={g.slug} alt={g.alt} sizes={SIZES[i]} className="h-full" imgClassName="transition duration-700 ease-out group-hover:scale-[1.06]" focus={i === 0 ? '50% 62%' : undefined} />
              <span aria-hidden="true" className="absolute inset-2 rounded-[inherit] border border-white/45 opacity-70 transition duration-500 group-hover:inset-3 group-hover:border-gold-300 group-hover:opacity-100" />
              <span className="on-dark absolute inset-x-0 bottom-0 flex translate-y-2 items-end gap-3 bg-gradient-to-t from-brand-950/90 via-brand-950/50 to-transparent px-5 pb-5 pt-14 opacity-95 transition duration-500 group-hover:translate-y-0">
                <span className="font-display text-2xl leading-none text-gold-300">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 text-sm font-medium leading-snug text-white">{g.title}<span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-300/90">{g.category}</span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Seal />
    </div>
  )
}
