import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'

interface Props {
  eyebrow: string
  title: string
  intro: ReactNode
  crumbs: { name: string; path: string }[]
  actions?: ReactNode
}

/** Compact dark hero used on inner pages. Contains the page's single <h1>. */
export default function PageHero({ eyebrow, title, intro, crumbs, actions }: Props) {
  return (
    <section className="pattern-dark on-dark relative overflow-hidden text-white">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="container py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <div data-hero className="mt-6 max-w-3xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="font-display text-display-lg text-white">{title}</h1>
          <p className="mt-5 text-lg text-white/80">{intro}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
