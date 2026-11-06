import { useState } from 'react'
import CtaBand from '@/components/CtaBand'
import Lightbox from '@/components/Lightbox'
import PageHero from '@/components/PageHero'
import Picture from '@/components/Picture'
import Seo from '@/components/Seo'
import { galleryCategories } from '@/data/gallery'
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
          <div role="group" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-[2.75rem] rounded-full border px-5 text-sm font-semibold transition ${cat === c ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-300 bg-white text-ink-700 hover:border-brand-600'}`}>{c}</button>
            ))}
          </div>
          <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {items.map((g, i) => (
              <li key={g.id}>
                <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-xl2 text-left shadow-soft" aria-label={`Open photo: ${g.title}`}>
                  <Picture slug={g.slug} alt={g.alt} ratio="4/3" sizes="(min-width:1024px) 33vw, (min-width:480px) 50vw, 100vw" imgClassName="transition duration-500 group-hover:scale-105" />
                  <span className="block bg-white px-4 py-3 text-sm font-medium text-ink-900">{g.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {videos.length === 0 && <p className="mt-10 text-sm text-ink-500">Videos from our journeys will appear here.</p>}
        </div>
      </section>
      {open !== null && items[open] && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
      <CtaBand />
    </>
  )
}
