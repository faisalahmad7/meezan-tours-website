import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Block, CalloutTone } from '@/data/blog/types'
import { ImagePicker } from '../ImagePicker'
import { Area, Btn, IconBtn, Lines, ListEditor, Select, Text, slugifyText } from '../ui'

export const MARKUP_HINT = 'Formatting: **bold**, [link text](/blog/post-address) for pages on this site, [link text](https://…) for other websites.'

const TYPES: { type: Block['type']; label: string; make: () => Block }[] = [
  { type: 'p', label: 'Paragraph', make: () => ({ type: 'p', text: '' }) },
  { type: 'h2', label: 'Section heading', make: () => ({ type: 'h2', text: '' }) },
  { type: 'h3', label: 'Sub-heading', make: () => ({ type: 'h3', text: '' }) },
  { type: 'ul', label: 'Bullet list', make: () => ({ type: 'ul', items: [] }) },
  { type: 'ol', label: 'Numbered list', make: () => ({ type: 'ol', items: [] }) },
  { type: 'callout', label: 'Highlight box', make: () => ({ type: 'callout', tone: 'tip', text: '' }) },
  { type: 'steps', label: 'Steps', make: () => ({ type: 'steps', items: [{ title: '', text: '' }] }) },
  { type: 'checklist', label: 'Checklist', make: () => ({ type: 'checklist', id: `list-${Date.now().toString(36)}`, title: '', items: [] }) },
  { type: 'table', label: 'Table', make: () => ({ type: 'table', caption: '', head: ['', ''], rows: [['', '']] }) },
  { type: 'image', label: 'Photo', make: () => ({ type: 'image', image: { slug: '', alt: '' } }) },
  { type: 'facts', label: 'Key facts', make: () => ({ type: 'facts', title: '', items: [{ label: '', value: '' }] }) },
  { type: 'arabic', label: 'Arabic text (dua or verse)', make: () => ({ type: 'arabic', arabic: '', translation: '' }) },
  { type: 'cta', label: 'Enquiry box', make: () => ({ type: 'cta', title: '', text: '', link: { label: 'See packages', to: '/packages' } }) },
]
const labelOf = (t: Block['type']) => TYPES.find((x) => x.type === t)?.label ?? t

function summaryOf(b: Block): string {
  switch (b.type) {
    case 'p': case 'h2': case 'h3': return b.text
    case 'ul': case 'ol': case 'checklist': return b.items[0] ?? ''
    case 'callout': return b.title ?? b.text ?? ''
    case 'steps': return b.items.map((i) => i.title).join(', ')
    case 'table': return b.caption ?? b.head.join(', ')
    case 'image': return b.image.slug
    case 'facts': return b.title ?? b.items.map((i) => i.label).join(', ')
    case 'arabic': return b.translation
    case 'cta': return b.title
  }
}

function TableFields({ b, set }: { b: Extract<Block, { type: 'table' }>; set: (p: Partial<Block>) => void }) {
  const cols = b.head.length
  const cell = 'w-full min-w-[8rem] rounded-md border border-sand-300 px-2 py-1.5 text-sm'
  return (
    <div className="space-y-3">
      <Text label="Caption (shown above the table)" value={b.caption} onChange={(v) => set({ caption: v })} max={160} />
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>{b.head.map((h, i) => <th key={i}><input aria-label={`Column ${i + 1} heading`} value={h} onChange={(e) => set({ head: b.head.map((x, j) => (j === i ? e.target.value : x)) })} className={`${cell} bg-brand-50 font-semibold`} placeholder={`Heading ${i + 1}`} /></th>)}</tr>
          </thead>
          <tbody>
            {b.rows.map((r, ri) => (
              <tr key={ri}>
                {Array.from({ length: cols }, (_, ci) => (
                  <td key={ci}><input aria-label={`Row ${ri + 1}, column ${ci + 1}`} value={r[ci] ?? ''} onChange={(e) => set({ rows: b.rows.map((row, rj) => (rj === ri ? Array.from({ length: cols }, (_, k) => (k === ci ? e.target.value : row[k] ?? '')) : row)) })} className={cell} /></td>
                ))}
                <td><IconBtn label="Remove row" tone="danger" onClick={() => set({ rows: b.rows.filter((_, j) => j !== ri) })} disabled={b.rows.length < 2}><Trash2 className="h-4 w-4" /></IconBtn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2">
        <Btn onClick={() => set({ rows: [...b.rows, Array(cols).fill('')] })}>Add row</Btn>
        <Btn onClick={() => set({ head: [...b.head, ''], rows: b.rows.map((r) => [...r, '']) })} disabled={cols >= 8}>Add column</Btn>
        <Btn onClick={() => set({ head: b.head.slice(0, -1), rows: b.rows.map((r) => r.slice(0, cols - 1)) })} disabled={cols <= 2}>Remove last column</Btn>
      </div>
      <p className="text-xs text-ink-500">The first column is treated as the row label.</p>
    </div>
  )
}

function Fields({ b, set }: { b: Block; set: (p: Partial<Block>) => void }) {
  // `set` merges into the current block; TypeScript cannot narrow the patch per type, so cast at the edges.
  const s = set as (p: Record<string, unknown>) => void
  switch (b.type) {
    case 'p':
      return <Area label="Text" value={b.text} onChange={(v) => s({ text: v })} rows={5} hint={MARKUP_HINT} max={4000} />
    case 'h2':
      return <Text label="Section heading" value={b.text} onChange={(v) => s({ text: v })} max={140} hint="Each section heading appears in the article's table of contents." />
    case 'h3':
      return <Text label="Sub-heading" value={b.text} onChange={(v) => s({ text: v })} max={140} />
    case 'ul': case 'ol':
      return <Lines label="Items" value={b.items} onChange={(v) => s({ items: v })} rows={6} hint={`One item per line. ${MARKUP_HINT}`} />
    case 'callout':
      return (
        <>
          <Select<CalloutTone> label="Style" value={b.tone} onChange={(v) => s({ tone: v })} options={[{ value: 'tip', label: 'Tip (gold)' }, { value: 'note', label: 'Good to know (green)' }, { value: 'important', label: 'Important (red)' }, { value: 'verify', label: 'Check the latest rules (dashed)' }]} />
          <Text label="Title (optional)" value={b.title} onChange={(v) => s({ title: v || undefined })} max={120} />
          <Area label="Text" value={b.text} onChange={(v) => s({ text: v || undefined })} rows={3} hint={MARKUP_HINT} />
          <Lines label="List (optional)" value={b.items} onChange={(v) => s({ items: v.length ? v : undefined })} rows={3} />
        </>
      )
    case 'steps':
      return <ListEditor items={b.items} onChange={(items) => s({ items })} create={() => ({ title: '', text: '' })} itemTitle={(it, i) => `Step ${i + 1}: ${it.title || 'untitled'}`} addLabel="Add step" render={(it, up) => (
        <>
          <Text label="Step title" value={it.title} onChange={(v) => up({ title: v })} max={120} />
          <Area label="Explanation" value={it.text} onChange={(v) => up({ text: v })} hint={MARKUP_HINT} />
        </>
      )} />
    case 'checklist':
      return (
        <>
          <Text label="Checklist title" value={b.title} onChange={(v) => s({ title: v })} max={120} />
          <Lines label="Items" value={b.items} onChange={(v) => s({ items: v })} rows={8} hint="One item per line. Readers can tick items off and print the list." />
          <Text label="Checklist id" value={b.id} onChange={(v) => s({ id: slugifyText(v) })} hint="Used to remember ticks in the reader's browser. Change only if you start a new list." />
        </>
      )
    case 'table':
      return <TableFields b={b} set={set} />
    case 'image':
      return (
        <>
          <ImagePicker value={b.image.slug} onChange={(slug) => s({ image: { ...b.image, slug } })} />
          <Area label="Description for screen readers and Google (alt text)" value={b.image.alt} onChange={(v) => s({ image: { ...b.image, alt: v } })} rows={2} max={300} hint="Describe what is in the photo, e.g. 'Meezan pilgrims in ihram at Masjid al-Haram'." />
          <Text label="Caption (optional)" value={b.image.caption} onChange={(v) => s({ image: { ...b.image, caption: v || undefined } })} max={300} />
        </>
      )
    case 'facts':
      return (
        <>
          <Text label="Title (optional)" value={b.title} onChange={(v) => s({ title: v || undefined })} max={120} />
          <ListEditor items={b.items} onChange={(items) => s({ items })} create={() => ({ label: '', value: '' })} itemTitle={(it) => `${it.label || 'Label'}: ${it.value || 'value'}`} addLabel="Add fact" max={8} render={(it, up) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Text label="Label" value={it.label} onChange={(v) => up({ label: v })} max={80} />
              <Text label="Value" value={it.value} onChange={(v) => up({ value: v })} max={160} />
            </div>
          )} />
        </>
      )
    case 'arabic':
      return (
        <>
          <Area label="Arabic" value={b.arabic} onChange={(v) => s({ arabic: v })} rows={2} hint="Check the Arabic carefully against a trusted source." />
          <Text label="Transliteration (optional)" value={b.transliteration} onChange={(v) => s({ transliteration: v || undefined })} />
          <Area label="Translation" value={b.translation} onChange={(v) => s({ translation: v })} rows={2} />
          <Text label="Reference (optional)" value={b.cite} onChange={(v) => s({ cite: v || undefined })} placeholder="e.g. Quran 2:201" />
        </>
      )
    case 'cta':
      return (
        <>
          <Text label="Title" value={b.title} onChange={(v) => s({ title: v })} max={120} />
          <Area label="Text" value={b.text} onChange={(v) => s({ text: v })} rows={2} max={400} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Text label="Button label" value={b.link?.label} onChange={(v) => s({ link: { to: b.link?.to ?? '/packages', label: v } })} />
            <Text label="Button goes to" value={b.link?.to} onChange={(v) => s({ link: { label: b.link?.label ?? 'See packages', to: v } })} hint="e.g. /packages, /umrah, /hajj, /contact" />
          </div>
          <p className="text-xs text-ink-500">A WhatsApp button is always added automatically.</p>
        </>
      )
  }
}

/** Ordered list of content blocks with type-specific fields. */
export default function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) {
  const [open, setOpen] = useState<number | null>(null)
  const [addType, setAddType] = useState<Block['type']>('p')
  const insert = (at: number, b: Block) => {
    const next = [...blocks]
    next.splice(at, 0, b)
    onChange(next)
    setOpen(at)
  }
  const move = (i: number, d: number) => {
    const next = [...blocks]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
    setOpen(open === i ? i + d : open)
  }
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const expanded = open === i
        const heading = b.type === 'h2'
        return (
          <div key={i} className={`rounded-xl border bg-white ${expanded ? 'border-brand-600/50 shadow-soft' : heading ? 'border-gold-500/50' : 'border-sand-200'}`}>
            <div className="flex items-center gap-1 py-1.5 pl-3 pr-1.5">
              <button type="button" onClick={() => setOpen(expanded ? null : i)} aria-expanded={expanded} className="flex min-h-[2.25rem] min-w-0 flex-1 items-center gap-2 text-left">
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide ${heading ? 'bg-gold-400 text-brand-950' : 'bg-sand-100 text-ink-500'}`}>{labelOf(b.type)}</span>
                <span className={`truncate text-sm ${heading ? 'font-display font-semibold text-ink-900' : 'text-ink-700'}`}>{summaryOf(b) || <em className="text-ink-400">empty</em>}</span>
              </button>
              <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></IconBtn>
              <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}><ArrowDown className="h-4 w-4" /></IconBtn>
              <IconBtn label="Duplicate" onClick={() => insert(i + 1, JSON.parse(JSON.stringify(b)))}><Copy className="h-4 w-4" /></IconBtn>
              <IconBtn label="Delete" tone="danger" onClick={() => { if (confirm(`Delete this ${labelOf(b.type).toLowerCase()}?`)) { onChange(blocks.filter((_, j) => j !== i)); setOpen(null) } }}><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
            {expanded && (
              <div className="space-y-4 border-t border-sand-200 p-4">
                <Fields b={b} set={(p) => onChange(blocks.map((x, j) => (j === i ? ({ ...x, ...p } as Block) : x)))} />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-dashed border-sand-200 pt-3 text-sm">
                  <span className="text-ink-500">Insert below:</span>
                  {(['p', 'h2', 'ul', 'callout', 'image'] as const).map((t) => (
                    <button key={t} type="button" onClick={() => insert(i + 1, TYPES.find((x) => x.type === t)!.make())} className="rounded-md px-2 py-1 font-semibold text-brand-700 hover:bg-sand-100">{labelOf(t)}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
      <div className="flex flex-wrap items-end gap-2 rounded-xl border border-dashed border-sand-300 p-3">
        <Select label="Add a block at the end" value={addType} onChange={setAddType} options={TYPES.map((t) => ({ value: t.type, label: t.label }))} className="min-w-[14rem] flex-1" />
        <Btn onClick={() => insert(blocks.length, TYPES.find((t) => t.type === addType)!.make())}><Plus className="h-4 w-4" aria-hidden="true" />Add</Btn>
      </div>
    </div>
  )
}
