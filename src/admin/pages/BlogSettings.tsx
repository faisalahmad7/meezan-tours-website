import { useEffect, useState } from 'react'
import type { BlogAuthor, BlogCategory, BlogPostMeta } from '@/data/blog/types'
import { api } from '../api'
import { Area, Errors, ListEditor, NumberInput, PageHeader, Panel, SaveBar, Spinner, Text, slugifyText, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

type Path = { stage: string; text: string; slugs: string[] }

export default function BlogSettings() {
  const d = useDoc<{ categories: BlogCategory[]; authors: BlogAuthor[]; minPostsToIndexCategory: number }>('blog-categories')
  const r = useDoc<Path[]>('reading-path')
  const [posts, setPosts] = useState<BlogPostMeta[]>([])
  useEffect(() => { api<{ posts: BlogPostMeta[] }>('posts').then((x) => setPosts(x.posts)).catch(() => undefined) }, [])
  useUnsavedWarning(d.dirty || r.dirty)
  if (d.loadError || r.loadError) return <Errors title="Could not load" errors={[d.loadError || r.loadError]} />
  if (!d.data || !r.data) return <Spinner />
  const c = d.data
  const count = (id: string) => posts.filter((p) => p.category === id).length

  return (
    <>
      <PageHeader title="Blog categories" intro="Topics, authors and the 'read in this order' route on the blog home page." />
      <div className="mb-6 space-y-3"><Errors errors={d.errors} onClose={() => d.setErrors([])} /><Errors errors={r.errors} onClose={() => r.setErrors([])} /></div>
      <div className="space-y-6">
        <Panel title="Categories" intro="A category can only be removed once no post uses it.">
          <ListEditor<BlogCategory> items={c.categories} onChange={(categories) => d.setData({ ...c, categories })} max={20} addLabel="Add category"
            create={() => ({ id: '', name: '', short: '', description: '', seoTitle: '' })}
            itemTitle={(x) => <>{x.name || 'New category'} <span className="font-normal text-ink-500">· {count(x.id)} posts · /blog/category/{x.id}</span></>}
            render={(x, up) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Name" value={x.name} onChange={(v) => up({ name: v, ...(x.id ? {} : { id: slugifyText(v) }) })} max={60} />
                  <Text label="Web address" value={x.id} onChange={(v) => up({ id: slugifyText(v) })} hint={count(x.id) ? 'In use: posts must be moved before this changes.' : undefined} />
                </div>
                <Text label="Short line (on chips and tiles)" value={x.short} onChange={(v) => up({ short: v })} max={120} />
                <Area label="Introduction (also the meta description)" value={x.description} onChange={(v) => up({ description: v })} rows={3} max={160} />
                <Text label="SEO title" value={x.seoTitle} onChange={(v) => up({ seoTitle: v })} max={60} />
              </>
            )} />
          <NumberInput className="mt-5 max-w-xs" label="Hide small categories from Google below" value={c.minPostsToIndexCategory} onChange={(v) => d.setData({ ...c, minPostsToIndexCategory: v ?? 2 })} min={1} max={20} hint="Category pages with fewer posts are kept out of search results." />
        </Panel>
        <Panel title="Authors">
          <ListEditor<BlogAuthor> items={c.authors} onChange={(authors) => d.setData({ ...c, authors })} max={20} addLabel="Add author"
            create={() => ({ id: '', name: '', role: '', bio: '', url: '/about' })}
            itemTitle={(x) => x.name || 'New author'}
            render={(x, up) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Name" value={x.name} onChange={(v) => up({ name: v, ...(x.id ? {} : { id: slugifyText(v) }) })} />
                  <Text label="Role" value={x.role} onChange={(v) => up({ role: v })} />
                </div>
                <Area label="Short biography" value={x.bio} onChange={(v) => up({ bio: v })} rows={3} max={800} hint="Real credentials only." />
                <Text label="Profile page" value={x.url} onChange={(v) => up({ url: v })} />
              </>
            )} />
        </Panel>
        <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />

        <Panel title="Read in this order" intro="The numbered route on the blog home page. Choose posts by their web address.">
          <ListEditor<Path> items={r.data} onChange={r.setData} max={8} addLabel="Add stage"
            create={() => ({ stage: '', text: '', slugs: [] })}
            itemTitle={(s, i) => `${i + 1}. ${s.stage || 'New stage'}`}
            render={(s, up) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Stage" value={s.stage} onChange={(v) => up({ stage: v })} max={60} />
                  <Text label="One line" value={s.text} onChange={(v) => up({ text: v })} max={160} />
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-ink-900">Posts (up to 4)</legend>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {posts.filter((p) => p.status !== 'draft').map((p) => (
                      <label key={p.slug} className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1 accent-brand-700" checked={s.slugs.includes(p.slug)} onChange={(e) => up({ slugs: e.target.checked ? [...s.slugs, p.slug].slice(0, 4) : s.slugs.filter((x) => x !== p.slug) })} />
                        <span>{p.title}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )} />
          <div className="mt-4 flex justify-end gap-2">
            {r.dirty && <button type="button" onClick={r.discard} className="text-sm font-semibold text-ink-500">Discard</button>}
            <button type="button" onClick={r.save} disabled={!r.dirty || r.saving} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{r.saving ? 'Saving…' : 'Save route'}</button>
          </div>
        </Panel>
      </div>
    </>
  )
}
