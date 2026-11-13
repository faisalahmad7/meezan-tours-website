import { BookOpen, Images, MessageSquareQuote, Package, PenLine, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type PublishInfo } from '../api'
import { PageHeader, Panel } from '../ui'
import { useAdmin } from '../useDoc'

interface Counts { posts: number; drafts: number; packages: number; testimonials: number; photos: number; recent: { slug: string; title: string; updatedAt: string; status?: string }[] }

export default function Dashboard({ status }: { status: PublishInfo | null }) {
  const { session } = useAdmin()
  const [c, setC] = useState<Counts | null>(null)
  useEffect(() => {
    Promise.all([
      api<{ posts: { slug: string; title: string; updatedAt: string; status?: string }[] }>('posts'),
      api<{ data: unknown[] }>('content?doc=packages'),
      api<{ data: unknown[] }>('content?doc=testimonials'),
      api<{ data: { images: unknown[] } }>('content?doc=gallery'),
    ]).then(([p, pk, t, g]) => setC({
      posts: p.posts.filter((x) => x.status !== 'draft').length,
      drafts: p.posts.filter((x) => x.status === 'draft').length,
      packages: pk.data.length, testimonials: t.data.length, photos: g.data.images.length,
      recent: [...p.posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5),
    })).catch(() => undefined)
  }, [])

  const stats = [
    { to: '/blog', label: 'Published guides', value: c?.posts, Icon: BookOpen, note: c?.drafts ? `${c.drafts} draft${c.drafts > 1 ? 's' : ''}` : undefined },
    { to: '/packages', label: 'Packages', value: c?.packages, Icon: Package },
    { to: '/testimonials', label: 'Testimonials', value: c?.testimonials, Icon: MessageSquareQuote },
    { to: '/gallery', label: 'Gallery photos', value: c?.photos, Icon: Images },
  ]

  return (
    <>
      <PageHeader title="Assalamu alaikum" intro="Manage the Meezan website from here. Every change you save is checked, stored with its full history, and published to the live site automatically." />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className="block rounded-2xl border border-sand-200 bg-white p-5 transition hover:border-gold-500/70 hover:shadow-soft">
              <s.Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
              <p className="mt-3 font-display text-3xl font-semibold text-ink-900">{s.value ?? '–'}</p>
              <p className="text-sm text-ink-500">{s.label}{s.note && <span className="ml-2 rounded-full bg-sand-100 px-2 py-0.5 text-xs">{s.note}</span>}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Recently updated guides" aside={<Link to="/blog/new" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"><Plus className="h-4 w-4" aria-hidden="true" />New post</Link>}>
          <ul className="divide-y divide-sand-200">
            {(c?.recent ?? []).map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">{p.title}</p>
                  <p className="text-xs text-ink-500">Reviewed {p.updatedAt}{p.status === 'draft' && ' · Draft'}</p>
                </div>
                <Link to={`/blog/edit/${p.slug}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-sand-100"><PenLine className="h-4 w-4" aria-hidden="true" />Edit</Link>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="How publishing works">
          <ul className="space-y-3 text-sm text-ink-700">
            {session.mode === 'github' ? (
              <>
                <li>When you press <strong>Save and publish</strong>, your change is saved to the website's GitHub repository.</li>
                <li>Vercel then rebuilds the site. It is usually live within one or two minutes.{status?.latest && <> Last change: <em>{status.latest.message}</em>.</>}</li>
                <li>Every change is kept in the history, so a mistake can always be undone.</li>
              </>
            ) : (
              <>
                <li>You are in <strong>local mode</strong>: changes are written straight into the project files on this computer.</li>
                <li>Review them with <code>git diff</code>, then commit and push to publish.</li>
              </>
            )}
            <li>Blog posts saved as <strong>Draft</strong> are stored but never shown on the site.</li>
          </ul>
        </Panel>
      </div>
    </>
  )
}
