import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { GalleryImage } from '@/data/types'
import { imageManifest } from '@/data/imageManifest'

interface Props {
  items: GalleryImage[]
  index: number
  onClose: () => void
  onChange: (i: number) => void
}

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const m = imageManifest[item.slug]
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const w = m.widths.includes(1600) ? 1600 : m.widths[m.widths.length - 1]
  return (
    <div role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-50 flex flex-col bg-black/90 p-3 sm:p-6" onClick={onClose}>
      <div className="flex items-center justify-between text-white">
        <p className="text-sm">{index + 1} / {items.length}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><X className="h-5 w-5" /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"><ChevronLeft className="h-6 w-6" /></button>
        <img src={`/images/gallery/${item.slug}-${w}.webp`} alt={item.alt} className="max-h-full max-w-full rounded-lg object-contain" />
        <button type="button" onClick={next} aria-label="Next photo" className="absolute right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"><ChevronRight className="h-6 w-6" /></button>
      </div>
      <p className="pt-3 text-center text-sm text-white/90">{item.title}</p>
    </div>
  )
}
