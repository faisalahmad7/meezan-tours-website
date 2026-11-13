import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  name: string
  /** Omit for the current page. */
  path?: string
}

/** Breadcrumb trail for blog pages. "Home" is always first; an item without a path is the current page. */
export function BlogCrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const base = tone === 'dark' ? 'text-white/70' : 'text-ink-500'
  const hover = tone === 'dark' ? 'hover:text-white' : 'hover:text-brand-800'
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li><Link to="/" className={hover}>Home</Link></li>
        {items.map((it, i) => (
          <li key={it.name} className={`flex min-w-0 items-center gap-1.5 ${!it.path && i > 1 ? 'max-sm:hidden' : ''}`}>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {it.path ? (
              <Link to={it.path} className={hover}>{it.name}</Link>
            ) : (
              <span aria-current="page" className={`${tone === 'dark' ? 'text-white' : 'text-ink-900'} line-clamp-1`}>{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Large, faint eight-point star (two squares), echoing the seal on the home page. Decorative. */
export function StarMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="83" y="83" width="234" height="234" />
        <rect x="83" y="83" width="234" height="234" transform="rotate(45 200 200)" />
        <circle cx="200" cy="200" r="92" />
        <circle cx="200" cy="200" r="190" strokeDasharray="2 10" />
      </g>
    </svg>
  )
}

interface Props {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  intro: ReactNode
  /** Right-hand column on large screens (search, topics). */
  aside?: ReactNode
}

/** Dark emerald masthead for the blog home and category pages. Holds the page's only H1. */
export default function BlogMasthead({ crumbs, eyebrow, title, intro, aside }: Props) {
  return (
    <section className="pattern-dark on-dark relative overflow-hidden text-white">
      <StarMark className="absolute -right-24 -top-16 hidden h-[34rem] w-[34rem] text-gold-400/15 lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="container relative py-14 sm:py-20">
        <BlogCrumbs items={crumbs} />
        <div className={`mt-6 grid gap-10 ${aside ? 'lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16' : ''}`}>
          <div data-hero className="max-w-2xl">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="font-display text-display-lg text-white">{title}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">{intro}</p>
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
