import { Check, Info, Lightbulb, Printer, RotateCcw, ShieldCheck, TriangleAlert } from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import Picture from '@/components/Picture'
import { WhatsAppIcon } from '@/components/BrandIcons'
import { whatsappLink } from '@/data/site'
import type { Block, CalloutTone } from '@/data/blog/types'
import { slugify } from '@/lib/blogText'
import Inline from './Inline'

const TONES: Record<CalloutTone, { label: string; Icon: ComponentType<{ className?: string }>; cls: string }> = {
  tip: { label: 'Tip', Icon: Lightbulb, cls: 'callout-tip' },
  note: { label: 'Good to know', Icon: Info, cls: 'callout-note' },
  important: { label: 'Important', Icon: TriangleAlert, cls: 'callout-important' },
  verify: { label: 'Check the latest rules', Icon: ShieldCheck, cls: 'callout-verify' },
}

function Callout({ tone, title, text, items }: Extract<Block, { type: 'callout' }>) {
  const t = TONES[tone]
  return (
    <aside className={`callout ${t.cls}`} aria-label={title ?? t.label}>
      <p className="callout-title"><t.Icon className="h-[1.1rem] w-[1.1rem] shrink-0" aria-hidden="true" />{title ?? t.label}</p>
      {text && <p><Inline text={text} /></p>}
      {items && <ul>{items.map((it) => <li key={it}><Inline text={it} /></li>)}</ul>}
    </aside>
  )
}

/** A true sequence (the rites, a process): numbered waypoints joined by the gold route line. */
function Steps({ items }: Extract<Block, { type: 'steps' }>) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.title}>
          <span className="steps-num" aria-hidden="true">{i + 1}</span>
          <div>
            <h3 className="steps-title"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
            <p><Inline text={s.text} /></p>
          </div>
        </li>
      ))}
    </ol>
  )
}

const noLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

/** Tick-as-you-go list. Ticks are kept in this browser only (localStorage), never sent anywhere. */
function Checklist({ id, title, items, scope }: Extract<Block, { type: 'checklist' }> & { scope: string }) {
  const key = `meezan-checklist:${scope}:${id}`
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false))
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null')
      if (Array.isArray(saved)) setDone(items.map((_, i) => saved[i] === true))
    } catch {
      /* storage unavailable: the list still works for this visit */
    }
  }, [key, items])
  const save = (next: boolean[]) => {
    setDone(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* ignore */ }
  }
  const count = done.filter(Boolean).length
  return (
    <section className="checklist" aria-labelledby={`${id}-title`}>
      <div className="checklist-head">
        <h3 id={`${id}-title`} className="checklist-title">{title ?? 'Checklist'}</h3>
        <p className="checklist-count" aria-live="polite">{count} of {items.length} ticked</p>
      </div>
      <ul>
        {items.map((it, i) => (
          <li key={it}>
            <button type="button" role="checkbox" aria-checked={done[i]} onClick={() => save(done.map((d, j) => (j === i ? !d : d)))} className="checklist-item">
              <span className="checklist-box" aria-hidden="true">{done[i] && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
              <span><Inline text={noLinks(it)} /></span>
            </button>
          </li>
        ))}
      </ul>
      <div className="checklist-actions no-print">
        <button type="button" onClick={() => window.print()}><Printer className="h-4 w-4" aria-hidden="true" />Print</button>
        {count > 0 && <button type="button" onClick={() => save(items.map(() => false))}><RotateCcw className="h-4 w-4" aria-hidden="true" />Clear ticks</button>}
      </div>
    </section>
  )
}

function DataTable({ caption, head, rows }: Extract<Block, { type: 'table' }>) {
  return (
    <div className="table-wrap" role="region" aria-label={caption ?? 'Comparison table'} tabIndex={0}>
      <table>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row"><Inline text={c} /></th> : <td key={i}><Inline text={c} /></td>))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Facts({ title, items }: Extract<Block, { type: 'facts' }>) {
  return (
    <section className="facts" aria-label={title ?? 'Key facts'}>
      {title && <p className="facts-title">{title}</p>}
      <dl>
        {items.map((f) => (
          <div key={f.label}><dt>{f.label}</dt><dd><Inline text={f.value} /></dd></div>
        ))}
      </dl>
    </section>
  )
}

function Arabic({ arabic, transliteration, translation, cite }: Extract<Block, { type: 'arabic' }>) {
  return (
    <figure className="arabic-block">
      <p lang="ar" dir="rtl" className="arabic-text">{arabic}</p>
      {transliteration && <p className="arabic-translit">{transliteration}</p>}
      <blockquote><p>{translation}</p></blockquote>
      {cite && <figcaption>{cite}</figcaption>}
    </figure>
  )
}

function InlineCta({ title, text, link }: Extract<Block, { type: 'cta' }>) {
  return (
    <aside className="inline-cta not-prose no-print" aria-label={title}>
      <div>
        <p className="inline-cta-title">{title}</p>
        <p className="inline-cta-text">{text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-whatsapp" href={whatsappLink(`Assalamu Alaikum, I read "${title}" on your website and would like to know more.`)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />Ask on WhatsApp
        </a>
        {link && <Link className="btn btn-outline" to={link.to}>{link.label}</Link>}
      </div>
    </aside>
  )
}

/** Renders an article's blocks. `scope` (the post slug) namespaces checklist storage. */
export default function ArticleBlocks({ blocks, scope }: { blocks: Block[]; scope: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p': return <p key={i}><Inline text={b.text} /></p>
          case 'h2': return <h2 key={i} id={b.id ?? slugify(b.text)}><Inline text={b.text} /></h2>
          case 'h3': return <h3 key={i}><Inline text={b.text} /></h3>
          case 'ul': return <ul key={i}>{b.items.map((it) => <li key={it}><Inline text={it} /></li>)}</ul>
          case 'ol': return <ol key={i}>{b.items.map((it) => <li key={it}><Inline text={it} /></li>)}</ol>
          case 'callout': return <Callout key={i} {...b} />
          case 'steps': return <Steps key={i} {...b} />
          case 'checklist': return <Checklist key={i} {...b} scope={scope} />
          case 'table': return <DataTable key={i} {...b} />
          case 'facts': return <Facts key={i} {...b} />
          case 'arabic': return <Arabic key={i} {...b} />
          case 'cta': return <InlineCta key={i} {...b} />
          case 'image':
            return (
              <figure key={i} className="article-figure">
                <Picture slug={b.image.slug} alt={b.image.alt} ratio="3/2" focus={b.image.focus} sizes="(min-width:1024px) 42rem, 100vw" className="rounded-xl2" />
                {b.image.caption && <figcaption>{b.image.caption}</figcaption>}
              </figure>
            )
        }
      })}
    </>
  )
}
