import { ArrowDown, ArrowUp, ChevronDown, Loader2, Plus, Trash2, TriangleAlert, X } from 'lucide-react'
import { useEffect, useId, useState, type ReactNode } from 'react'

/* ------------------------------------------------------------------ layout */

export function PageHeader({ title, intro, actions }: { title: string; intro?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-900">{title}</h1>
        {intro && <p className="mt-2 text-[0.95rem] text-ink-500">{intro}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({ title, intro, children, className = '', aside }: { title?: string; intro?: ReactNode; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <section className={`rounded-2xl border border-sand-200 bg-white p-5 sm:p-6 ${className}`}>
      {(title || aside) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>}
            {intro && <p className="mt-1 text-sm text-ink-500">{intro}</p>}
          </div>
          {aside}
        </div>
      )}
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ buttons */

type BtnVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
const BTN: Record<BtnVariant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 disabled:bg-brand-700/50',
  secondary: 'border border-sand-300 bg-white text-ink-900 hover:border-brand-600 hover:text-brand-800',
  danger: 'border border-accent-500/30 bg-white text-accent-700 hover:bg-accent-500 hover:text-white',
  ghost: 'text-ink-700 hover:bg-sand-100',
}
export function Btn({ children, variant = 'secondary', busy, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; busy?: boolean }) {
  return (
    <button type="button" {...rest} disabled={rest.disabled || busy} className={`inline-flex min-h-[2.5rem] items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${BTN[variant]} ${className}`}>
      {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function IconBtn({ label, onClick, children, disabled, tone = 'default' }: { label: string; onClick: () => void; children: ReactNode; disabled?: boolean; tone?: 'default' | 'danger' }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition disabled:opacity-30 ${tone === 'danger' ? 'hover:bg-accent-500/10 hover:text-accent-700' : 'hover:bg-sand-100 hover:text-ink-900'}`}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ fields */

const INPUT = 'w-full rounded-lg border border-sand-300 bg-white px-3 py-2 text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15'

interface FieldProps { label: string; hint?: ReactNode; max?: number; value?: string; children: (id: string) => ReactNode; className?: string }
export function Field({ label, hint, max, value, children, className = '' }: FieldProps) {
  const id = useId()
  const over = max !== undefined && (value?.length ?? 0) > max
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink-900">{label}</label>
        {max !== undefined && <span className={`text-xs tabular-nums ${over ? 'font-bold text-accent-600' : 'text-ink-400'}`}>{value?.length ?? 0}/{max}</span>}
      </div>
      {children(id)}
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{hint}</p>}
    </div>
  )
}

export function Text({ label, value, onChange, hint, max, placeholder, type = 'text', className }: { label: string; value: string | undefined; onChange: (v: string) => void; hint?: ReactNode; max?: number; placeholder?: string; type?: string; className?: string }) {
  return (
    <Field label={label} hint={hint} max={max} value={value} className={className}>
      {(id) => <input id={id} type={type} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={INPUT} />}
    </Field>
  )
}

export function NumberInput({ label, value, onChange, hint, min, max, step, className }: { label: string; value: number | null | undefined; onChange: (v: number | undefined) => void; hint?: ReactNode; min?: number; max?: number; step?: number; className?: string }) {
  return (
    <Field label={label} hint={hint} className={className}>
      {(id) => <input id={id} type="number" inputMode="decimal" value={value ?? ''} min={min} max={max} step={step} onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))} className={INPUT} />}
    </Field>
  )
}

export function Area({ label, value, onChange, hint, max, rows = 3, className, mono }: { label: string; value: string | undefined; onChange: (v: string) => void; hint?: ReactNode; max?: number; rows?: number; className?: string; mono?: boolean }) {
  return (
    <Field label={label} hint={hint} max={max} value={value} className={className}>
      {(id) => <textarea id={id} rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={`${INPUT} leading-relaxed ${mono ? 'font-mono text-sm' : ''}`} />}
    </Field>
  )
}

export function Select<T extends string>({ label, value, onChange, options, hint, className }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; hint?: ReactNode; className?: string }) {
  return (
    <Field label={label} hint={hint} className={className}>
      {(id) => (
        <div className="relative">
          <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={`${INPUT} appearance-none pr-9`}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        </div>
      )}
    </Field>
  )
}

export function Check({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-sand-300 accent-brand-700" />
      <span>
        <span className="text-sm font-semibold text-ink-900">{label}</span>
        {hint && <span className="block text-xs text-ink-500">{hint}</span>}
      </span>
    </label>
  )
}

/** One-item-per-line editor for short lists (highlights, tags, list items). */
export function Lines({ label, value, onChange, hint, rows = 4 }: { label: string; value: string[] | undefined; onChange: (v: string[]) => void; hint?: ReactNode; rows?: number }) {
  const [text, setText] = useState((value ?? []).join('\n'))
  useEffect(() => {
    if ((value ?? []).join('\n') !== text.split('\n').map((s) => s.trim()).filter(Boolean).join('\n')) setText((value ?? []).join('\n'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return (
    <Field label={label} hint={hint ?? 'One per line.'}>
      {(id) => (
        <textarea id={id} rows={rows} value={text} onChange={(e) => { setText(e.target.value); onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)) }} className={`${INPUT} leading-relaxed`} />
      )}
    </Field>
  )
}

/* ------------------------------------------------------------------ list editor */

export function ListEditor<T>({ items, onChange, render, create, itemTitle, addLabel = 'Add', max, collapsible = true }: {
  items: T[]
  onChange: (items: T[]) => void
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode
  create: () => T
  itemTitle: (item: T, index: number) => ReactNode
  addLabel?: string
  max?: number
  collapsible?: boolean
}) {
  const [open, setOpen] = useState<number | null>(collapsible ? null : -1)
  const move = (i: number, d: number) => {
    const next = [...items]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
    if (open === i) setOpen(i + d)
  }
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const expanded = !collapsible || open === i
        return (
          <div key={i} className={`rounded-xl border bg-white ${expanded ? 'border-brand-600/40 shadow-soft' : 'border-sand-200'}`}>
            <div className="flex items-center gap-1 py-1.5 pl-3 pr-1.5">
              <button type="button" onClick={() => collapsible && setOpen(expanded ? null : i)} className="flex min-h-[2.25rem] min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold text-ink-900" aria-expanded={expanded}>
                {collapsible && <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />}
                <span className="min-w-0 truncate">{itemTitle(item, i)}</span>
              </button>
              <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></IconBtn>
              <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="h-4 w-4" /></IconBtn>
              <IconBtn label="Remove" tone="danger" onClick={() => { if (confirm('Remove this item?')) onChange(items.filter((_, j) => j !== i)) }}><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
            {expanded && <div className="space-y-4 border-t border-sand-200 p-4">{render(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))), i)}</div>}
          </div>
        )
      })}
      {(max === undefined || items.length < max) && (
        <Btn onClick={() => { onChange([...items, create()]); setOpen(items.length) }} className="w-full border-dashed"><Plus className="h-4 w-4" aria-hidden="true" />{addLabel}</Btn>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ feedback */

export function Errors({ title = 'Not saved. Please fix these:', errors, onClose }: { title?: string; errors: string[]; onClose?: () => void }) {
  if (!errors.length) return null
  return (
    <div role="alert" className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-4 text-sm text-ink-900">
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold text-accent-700"><TriangleAlert className="h-4 w-4" aria-hidden="true" />{title}</p>
        {onClose && <IconBtn label="Dismiss" onClick={onClose}><X className="h-4 w-4" /></IconBtn>}
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5">{errors.slice(0, 12).map((e) => <li key={e}>{e}</li>)}</ul>
      {errors.length > 12 && <p className="mt-2 text-ink-500">And {errors.length - 12} more.</p>}
    </div>
  )
}

/** Sticky bar at the bottom of an editing page: unsaved state, save button, outcome. */
export function SaveBar({ dirty, saving, onSave, onDiscard, note }: { dirty: boolean; saving: boolean; onSave: () => void; onDiscard?: () => void; note?: string }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-sand-200 bg-ivory/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500" aria-live="polite">{saving ? 'Saving…' : dirty ? 'You have unsaved changes.' : note ?? 'All changes saved.'}</p>
        <div className="flex gap-2">
          {onDiscard && dirty && <Btn variant="ghost" onClick={onDiscard} disabled={saving}>Discard changes</Btn>}
          <Btn variant="primary" onClick={onSave} busy={saving} disabled={!dirty}>Save and publish</Btn>
        </div>
      </div>
    </div>
  )
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return <p className="flex items-center gap-2 py-10 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{label}…</p>
}

/** Toast messages (one at a time). */
let pushToast: ((t: { text: string; tone: 'ok' | 'error' }) => void) | null = null
export const toast = (text: string, tone: 'ok' | 'error' = 'ok') => pushToast?.({ text, tone })
export function Toaster() {
  const [t, setT] = useState<{ text: string; tone: 'ok' | 'error'; key: number } | null>(null)
  useEffect(() => {
    pushToast = (x) => setT({ ...x, key: Date.now() })
    return () => { pushToast = null }
  }, [])
  useEffect(() => {
    if (!t) return
    const id = setTimeout(() => setT(null), 5000)
    return () => clearTimeout(id)
  }, [t])
  if (!t) return null
  return (
    <div role="status" className={`fixed bottom-5 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lift ${t.tone === 'ok' ? 'bg-brand-900' : 'bg-accent-600'}`}>
      {t.text}
    </div>
  )
}

/** Warn before leaving a page with unsaved changes. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])
}

export const today = () => new Date().toISOString().slice(0, 10)
export const slugifyText = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70)
