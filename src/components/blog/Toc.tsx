import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

type Item = { id: string; text: string }

/** Highlights the section currently being read. Runs only in the browser. */
function useActiveHeading(idList: string) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = idList.split('|').map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [idList])
  return active
}

/** Desktop: sticky list in the left rail. */
export function TocRail({ items }: { items: Item[] }) {
  const active = useActiveHeading(items.map((i) => i.id).join('|'))
  return (
    <nav aria-label="In this guide" className="toc-rail">
      <p className="mb-3 font-display text-lg font-semibold text-ink-900">In this guide</p>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>{i.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Phones and tablets: a collapsible list at the top of the article. */
export function TocDisclosure({ items }: { items: Item[] }) {
  return (
    <details className="toc-disclosure group">
      <summary>
        <span>In this guide <span className="font-normal text-ink-500">({items.length} sections)</span></span>
        <ChevronDown className="h-5 w-5 text-brand-700 transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <ol>
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`}>{i.text}</a></li>
        ))}
      </ol>
    </details>
  )
}
