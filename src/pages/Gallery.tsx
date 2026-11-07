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
  const count = (c: string) => (c === 'All' ? all.length : all.filter((g) => g.category === c).length)
  return (
    <>
      <Seo path="/gallery" title="Hajj & Umrah Photo Gallery | Meezan Tours Pune" description="Photographs from Meezan Tours & Travels Hajj and Umrah journeys: group departures, flights, hotels, meals and moments in Makkah and Madinah." jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }])]} />
      <PageHero eyebrow="Gallery" title="Moments from our pilgrims' journeys" crumbs={[{ name: 'Gallery', path: '/gallery' }]} intro="Real photographs from Meezan group departures." />
      <section className="section">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div role="group" aria-label="Filter photos" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`group inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition ${cat === c ? 'border-brand-900 bg-brand-900 text-white' : 'border-sand-300 bg-white text-ink-700 hover:border-gold-500'}`}>
                  {c}<span className={`rounded-full px-2 py-0.5 text-[0.65rem] ${cat === c ? 'bg-gold-400 text-brand-950' : 'bg-sand-100 text-ink-500'}`}>{count(c)}</span>
                </button>
              ))}
            </div>
            <p className="flex items-center gap-3 text-sm text-ink-500" aria-live="polite"><span className="h-px w-10 bg-gold-500" aria-hidden="true" />{items.length} photograph{items.length === 1 ? '' : 's'}</p>
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
