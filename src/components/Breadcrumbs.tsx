import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-white">Home</Link></li>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-white">{it.name}</span>
            ) : (
              <Link to={it.path} className="hover:text-white">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
