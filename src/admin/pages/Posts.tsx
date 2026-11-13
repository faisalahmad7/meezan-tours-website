import { ExternalLink, PenLine, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, ApiError } from '../api'
import type { BlogPostMeta } from '@/data/blog/types'
import { Thumb } from '../ImagePicker'
import { Btn, PageHeader, Spinner, toast } from '../ui'
import { savedMessage, useAdmin } from '../useDoc'

export default function Posts() {
  const { session, refreshStatus } = useAdmin()
  const [posts, setPosts] = useState<BlogPostMeta[] | null>(null)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const load = () => api<{ posts: BlogPostMeta[] }>('posts').then((r) => setPosts(r.posts)).catch(() => setPosts([]))
  useEffect(() => { void load() }, [])

  const shown = useMemo(() => (posts ?? [])
    .filter((p) => filter === 'all' || (filter === 'draft' ? p.status === 'draft' : p.status !== 'draft'))
    .filter((p) => !q || `${p.title} ${p.slug} ${p.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())), [posts, q, filter])

  const remove = async (p: BlogPostMeta) => {
    if (!confirm(`Delete "${p.title}"? This removes it from the website. It can still be recovered from the GitHub history.`)) return
    try {
      await api(`posts?slug=${p.slug}`, { method: 'DELETE' })
      toast(savedMessage(session.mode))
      refreshStatus()
      void load()
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Could not delete.', 'error')
    }
  }

  return (
    <>
      <PageHeader title="Blog posts" intro="The guides in the Meezan Journal (/blog). Drafts are saved but not shown on the website." actions={<Link to="/blog/new" className="inline-flex min-h-[2.5rem] items-center gap-2 rounded-lg bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800"><Plus className="h-4 w-4" aria-hidden="true" />New post</Link>} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts" aria-label="Search posts" className="w-full rounded-lg border border-sand-300 bg-white py-2 pl-9 pr-3 text-sm" />
        </div>
        <div className="flex rounded-lg border border-sand-300 bg-white p-0.5 text-sm" role="group" aria-label="Filter">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-md px-3 py-1.5 font-semibold capitalize ${filter === f ? 'bg-brand-900 text-white' : 'text-ink-700 hover:bg-sand-100'}`}>{f}</button>
          ))}
        </div>
      </div>
      {!posts ? <Spinner /> : (
        <ul className="divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {shown.map((p) => (
            <li key={p.slug} className="flex items-center gap-4 p-3 sm:p-4">
              <Thumb slug={p.image.slug} focus={p.image.focus} className="hidden h-14 w-20 shrink-0 sm:block" />
              <div className="min-w-0 flex-1">
                <Link to={`/blog/edit/${p.slug}`} className="line-clamp-1 font-semibold text-ink-900 hover:text-brand-800">{p.title}</Link>
                <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink-500">
                  {p.status === 'draft' ? <span className="font-bold text-gold-600">Draft</span> : <span className="font-semibold text-brand-700">Published</span>}
                  {p.featured && <span>Featured</span>}
                  <span>/blog/{p.slug}</span>
                  <span>Reviewed {p.updatedAt}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {p.status !== 'draft' && <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} on the website`} title="View on website" className="rounded-md p-2 text-ink-500 hover:bg-sand-100 hover:text-ink-900"><ExternalLink className="h-4 w-4" /></a>}
                <Link to={`/blog/edit/${p.slug}`} aria-label={`Edit ${p.title}`} title="Edit" className="rounded-md p-2 text-ink-500 hover:bg-sand-100 hover:text-ink-900"><PenLine className="h-4 w-4" /></Link>
                <Btn variant="ghost" onClick={() => remove(p)} aria-label={`Delete ${p.title}`} title="Delete" className="!min-h-0 !px-2 !py-2 text-ink-500 hover:!bg-accent-500/10 hover:!text-accent-700"><Trash2 className="h-4 w-4" /></Btn>
              </div>
            </li>
          ))}
          {!shown.length && <li className="p-6 text-sm text-ink-500">No posts match.</li>}
        </ul>
      )}
    </>
  )
}
