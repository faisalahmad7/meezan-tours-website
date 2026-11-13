import { ImagePlus, Search, Upload, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { api, ApiError, type ImageMeta } from './api'
import { preparePhoto, photoUrl, type PreparedPhoto } from './imageTools'
import { Btn, Errors, Spinner, slugifyText, toast } from './ui'
import { savedMessage, useAdmin } from './useDoc'

/* ------------------------------------------------------------------ shared library state */

let cache: Record<string, ImageMeta> | null = null
const listeners = new Set<(m: Record<string, ImageMeta>) => void>()
async function fetchLibrary(force = false) {
  if (cache && !force) return cache
  const r = await api<{ data: Record<string, ImageMeta> }>('content?doc=image-manifest')
  cache = r.data
  listeners.forEach((l) => l(cache!))
  return cache
}

/** The photo library (src/content/image-manifest.json), shared by every editor. */
export function useLibrary() {
  const [lib, setLib] = useState<Record<string, ImageMeta> | null>(cache)
  useEffect(() => {
    listeners.add(setLib)
    void fetchLibrary().then(setLib).catch(() => undefined)
    return () => { listeners.delete(setLib) }
  }, [])
  return { lib, refresh: () => fetchLibrary(true) }
}

/* ------------------------------------------------------------------ thumbnail */

export function Thumb({ slug, className = '', focus }: { slug: string; className?: string; focus?: string }) {
  const { lib } = useLibrary()
  const meta = lib?.[slug]
  return (
    <div className={`overflow-hidden rounded-lg bg-sand-200 ${className}`} style={{ backgroundColor: meta?.color }}>
      {meta && <img src={photoUrl(slug, meta, 480)} alt="" loading="lazy" className="h-full w-full object-cover" style={focus ? { objectPosition: focus } : undefined} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />}
    </div>
  )
}

/* ------------------------------------------------------------------ upload */

export function UploadPhoto({ onUploaded }: { onUploaded?: (slug: string) => void }) {
  const { session, refreshStatus } = useAdmin()
  const input = useRef<HTMLInputElement>(null)
  const [prep, setPrep] = useState<PreparedPhoto | null>(null)
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const choose = async (file: File | undefined) => {
    if (!file) return
    setErrors([])
    setBusy(true)
    try {
      setPrep(await preparePhoto(file))
      setName(slugifyText(file.name.replace(/\.[a-z0-9]+$/i, '')).slice(0, 50))
    } catch (e) {
      setErrors([e instanceof Error ? e.message : 'Could not read that file.'])
    } finally {
      setBusy(false)
    }
  }
  const upload = async () => {
    if (!prep) return
    setBusy(true)
    setErrors([])
    try {
      await api('upload', { method: 'POST', body: { slug: name, w: prep.w, h: prep.h, color: prep.color, files: prep.files } })
      await fetchLibrary(true)
      toast(savedMessage(session.mode))
      refreshStatus()
      onUploaded?.(name)
      setPrep(null)
      setName('')
    } catch (e) {
      setErrors(e instanceof ApiError ? (e.details.length ? e.details : [e.message]) : ['Upload failed.'])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-sand-300 bg-sand-50 p-4">
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { void choose(e.target.files?.[0]); e.target.value = '' }} />
      {!prep ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-500">Upload a JPG, PNG or WebP photo. It is resized to 480, 960 and 1600 px automatically. Use only photos Meezan owns.</p>
          <Btn onClick={() => input.current?.click()} busy={busy}><Upload className="h-4 w-4" aria-hidden="true" />Choose photo</Btn>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
          <img src={prep.preview} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink-900" htmlFor="photo-name">Photo name</label>
            <input id="photo-name" value={name} onChange={(e) => setName(slugifyText(e.target.value))} className="w-full rounded-lg border border-sand-300 px-3 py-2 text-sm" />
            <p className="text-xs text-ink-500">{prep.w} × {prep.h} px, {prep.files.length} sizes. Lowercase words and hyphens, e.g. madinah-group-2026.</p>
            <div className="flex gap-2">
              <Btn variant="primary" onClick={upload} busy={busy} disabled={!name}>Add to library</Btn>
              <Btn variant="ghost" onClick={() => setPrep(null)} disabled={busy}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
      <div className="mt-3"><Errors title="Not uploaded:" errors={errors} /></div>
    </div>
  )
}

/* ------------------------------------------------------------------ picker */

export function ImagePicker({ label = 'Photo', value, onChange, hint }: { label?: string; value: string; onChange: (slug: string) => void; hint?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink-900">{label}</p>
      <div className="flex items-center gap-3">
        {value ? <Thumb slug={value} className="h-16 w-24 shrink-0" /> : <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-sand-100 text-ink-400"><ImagePlus className="h-5 w-5" aria-hidden="true" /></div>}
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-700">{value || 'No photo chosen'}</p>
          <Btn className="mt-1" onClick={() => setOpen(true)}>{value ? 'Change photo' : 'Choose photo'}</Btn>
        </div>
      </div>
      {hint && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
      {open && <PickerDialog value={value} onClose={() => setOpen(false)} onPick={(s) => { onChange(s); setOpen(false) }} />}
    </div>
  )
}

function PickerDialog({ value, onPick, onClose }: { value: string; onPick: (slug: string) => void; onClose: () => void }) {
  const { lib } = useLibrary()
  const [q, setQ] = useState('')
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  const slugs = useMemo(() => Object.keys(lib ?? {}).filter((s) => s.includes(q.toLowerCase().trim())).reverse(), [lib, q])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/50 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Choose a photo" onClick={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col rounded-t-2xl bg-white sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-sand-200 p-4">
          <h2 className="font-display text-lg font-semibold">Photo library</h2>
          <div className="relative ml-auto w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" aria-label="Search photos" className="w-full rounded-lg border border-sand-300 py-2 pl-9 pr-3 text-sm" />
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-2 hover:bg-sand-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="overflow-y-auto p-4">
          <UploadPhoto onUploaded={onPick} />
          {!lib ? <Spinner /> : (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {slugs.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => onPick(s)} className={`group block w-full overflow-hidden rounded-xl border-2 text-left transition ${s === value ? 'border-brand-600' : 'border-transparent hover:border-gold-500'}`}>
                    <Thumb slug={s} className="aspect-[4/3] w-full rounded-none" />
                    <span className="block truncate px-2 py-1.5 text-xs text-ink-700">{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
