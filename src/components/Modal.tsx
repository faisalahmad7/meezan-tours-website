import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  /** Tailwind max-width class for the card. */
  width?: string
}

/** Accessible dialog: Esc and backdrop click close it, page scroll is locked, focus moves in and returns. */
export default function Modal({ open, onClose, label, children, width = 'max-w-2xl' }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <div className="modal-backdrop absolute inset-0 bg-brand-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={label} className={`modal-card relative max-h-[88vh] w-full ${width} overflow-y-auto rounded-t-3xl border border-gold-500/60 bg-ivory p-6 shadow-lift sm:rounded-3xl sm:p-9`}>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/60 bg-white text-brand-800 transition hover:bg-brand-900 hover:text-white sm:right-4 sm:top-4">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  )
}
