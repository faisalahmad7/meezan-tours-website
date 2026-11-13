import { Link } from 'react-router-dom'
import { categoryPath, getCategories, getPosts, getPostsByCategory } from '@/services/blog'

/** Category filter. Real links (crawlable, work without JavaScript); the current one is marked. */
export default function CategoryNav({ active }: { active?: string }) {
  const chip = (on: boolean) =>
    `inline-flex min-h-[2.75rem] items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition ${
      on ? 'border-brand-900 bg-brand-900 text-white' : 'border-sand-300 bg-white text-ink-900 hover:border-gold-500 hover:text-brand-800'
    }`
  const count = (n: number) => <span className="text-xs font-medium opacity-70">{n}</span>
  return (
    <nav aria-label="Blog categories">
      <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <li className="shrink-0">
          <Link to="/blog" className={chip(!active)} aria-current={!active ? 'page' : undefined}>All guides {count(getPosts().length)}</Link>
        </li>
        {getCategories().map((c) => (
          <li key={c.id} className="shrink-0">
            <Link to={categoryPath(c.id)} className={chip(active === c.id)} aria-current={active === c.id ? 'page' : undefined}>
              {c.name} {count(getPostsByCategory(c.id).length)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
