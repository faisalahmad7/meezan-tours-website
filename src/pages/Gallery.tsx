import { useState } from 'react'
import CtaBand from '@/components/CtaBand'
import Lightbox from '@/components/Lightbox'
import PageHero from '@/components/PageHero'
import Picture from '@/components/Picture'
import Seo from '@/components/Seo'
import { galleryCategories } from '@/data/gallery'
import { imageManifest } from '@/data/imageManifest'
import { breadcrumbSchema } from '@/lib/schema'
import { getGalleryImages, getGalleryVideos } from '@/services/content'

export default function Gallery() {
  const [cat, setCat] = useState<string>('All')
  const [open, setOpen] = useState<number | null>(null)
  const all = getGalleryImages()
  const items = cat === 'All' ? all : all.filter((g) => g.category === cat)
  const videos = getGalleryVideos()
  return (
    <>
      <Seo path="/gallery" title="Hajj & Umrah Photo Gallery | Meezan Tours Pune" description="Photographs from Meezan Tours & Travels Hajj and Umrah journeys: group departures, flights, hotels, meals and moments in Makkah and Madinah." jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }])]} />
      <PageHero eyebrow="Gallery" title="Moments from our pilgrims' journeys" crumbs={[{ name: 'Gallery', path: '/gallery' }]} intro="Real photographs from Meezan group departures." />
      <section className="section">
        <div className="container">
          <div className="sticky top-[4.25rem] z-30 -mx-5 mb-10 border-y border-gold-500/40 bg-ivory/95 backdrop-blur md:mx-0 lg:top-24">
            <div role="group" aria-label="Filter photos" className="no-scrollbar flex gap-1 overflow-x-auto px-5 md:justify-center md:px-0">
              {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                  className={`group relative shrink-0 px-5 py-4 font-display text-xl font-semibold transition sm:text-2xl lg:px-7 lg:text-[1.75rem] ${cat === c ? 'text-brand-900' : 'text-ink-500 hover:text-brand-700'}`}>
                  {c}
                  <span aria-hidden="true" className={`absolute inset-x-4 bottom-0 h-[3px] origin-center rounded-full bg-gold-500 transition duration-300 ${cat === c ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                  <span aria-hidden="true" className={`absolute -bottom-[5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gold-500 transition ${cat === c ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* masonry: every photo keeps its own proportions */}
          <ul className="columns-1 gap-4 min-[520px]:columns-2 lg:columns-3">
            {items.map((g, i) => {
              const m = imageManifest[g.slug]
              return (
                <li key={g.id} className="mb-4 break-inside-avoid">
                  <button type="button" onClick={() => setOpen(i)} className="gal-card group relative block w-full overflow-hidden rounded-xl2 text-left shadow-soft" aria-label={`Open photo: ${g.title}`}>
                    <Picture slug={g.slug} alt={g.alt} ratio={m ? `${m.w}/${m.h}` : '4/3'} sizes="(min-width:1024px) 33vw, (min-width:520px) 50vw, 100vw" imgClassName="transition duration-700 ease-out group-hover:scale-[1.05]" />
                    <span aria-hidden="true" className="gal-corners" />
                    <span className="on-dark absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-brand-950/90 via-brand-950/55 to-transparent px-4 pb-4 pt-12 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">{g.category}</span>
                      <span className="mt-0.5 block font-display text-lg leading-snug text-white">{g.title}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {videos.length === 0 && <p className="mt-10 text-sm text-ink-500">Videos from our journeys will appear here.</p>}
        </div>
      </section>
      {open !== null && items[open] && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
      <CtaBand />
    </>
  )
}