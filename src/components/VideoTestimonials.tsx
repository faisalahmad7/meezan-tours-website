import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useRef } from 'react'
import { SITE } from '@/data/site'
import type { PackageKind } from '@/data/types'
import { getTestimonials } from '@/services/content'

const thumb = (id: string, q: string) => `https://i.ytimg.com/vi/${id}/${q}.jpg`

/** Swipeable carousel of YouTube testimonial cards. Each whole card links to the real video. */
export default function VideoTestimonials({ kind }: { kind?: PackageKind }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  const channel = SITE.social.find((s) => s.label === 'YouTube')
  return (
    <div>
      <div
        ref={track}
        tabIndex={0}
        aria-label="Video testimonials. Scroll sideways to see more."
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:gap-6 md:px-8 lg:mx-0 lg:px-0"
      >
        {getTestimonials(kind).map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${v.name}'s video testimonial on YouTube (opens in a new tab)`}
            className="group flex shrink-0 basis-[84%] snap-start flex-col overflow-hidden rounded-xl2 border border-white/15 bg-brand-950/60 transition duration-300 hover:-translate-y-1 hover:border-gold-400/60 sm:basis-[46%] lg:basis-[31.5%]"
          >
            <span className="relative block aspect-video overflow-hidden bg-brand-950">
              <img
                src={thumb(v.youtubeId, 'maxresdefault')}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = thumb(v.youtubeId, 'hqdefault') }}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-950/80 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-gold-300"><Play className="h-3 w-3 fill-current" aria-hidden="true" />Video testimonial</span>
              <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400 bg-brand-950/70 text-gold-400 backdrop-blur transition group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-brand-950"><Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" /></span>
            </span>
            <span className="flex flex-1 flex-col p-5">
              <span className="font-display text-xl font-semibold text-white">{v.name}</span>
              <span className="mt-0.5 text-sm text-gold-300">{v.place} &middot; {v.trip}</span>
              <span lang={v.lang} className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">{v.quote}</span>
              <span className="mt-4 text-sm font-semibold text-white group-hover:text-gold-300">Watch on YouTube &rarr;</span>
            </span>
          </a>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous videos" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-gold-400 hover:text-gold-300"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next videos" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-gold-400 hover:text-gold-300"><ChevronRight className="h-5 w-5" /></button>
        </div>
        {channel && <a href={channel.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gold-300 underline decoration-dotted underline-offset-4 hover:text-white">More videos on our YouTube channel</a>}
      </div>
    </div>
  )
}
