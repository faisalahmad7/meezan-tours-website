import { ArrowLeft, ExternalLink, Eye, PenLine } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArticleBlocks from '@/components/blog/ArticleBlocks'
import Inline from '@/components/blog/Inline'
import type { BlogArticle, BlogAuthor, BlogCategory, BlogFaq, BlogPostMeta, BlogSource } from '@/data/blog/types'
import { articleWordCount, readingMinutesFor } from '@/lib/blogText'
import { api, ApiError } from '../api'
import { ImagePicker, useLibrary } from '../ImagePicker'
import { makeSocialCard } from '../imageTools'
import { Area, Btn, Check, Errors, Lines, ListEditor, Panel, SaveBar, Select, Spinner, Text, slugifyText, toast, today, useUnsavedWarning } from '../ui'
import { savedMessage, useAdmin } from '../useDoc'
import BlockEditor, { MARKUP_HINT } from './BlockEditor'

interface Cats { categories: BlogCategory[]; authors: BlogAuthor[] }

const blankMeta = (cats: Cats): BlogPostMeta => ({
  slug: '', title: '', seoTitle: '', description: '', excerpt: '',
  category: cats.categories[0]?.id ?? '', tags: [], publishedAt: today(), updatedAt: today(), readingMinutes: 1,
  authorId: cats.authors[0]?.id ?? '', image: { slug: '', alt: '' }, ogImage: '/og-image.jpg', status: 'draft',
})
const blankArticle = (): BlogArticle => ({ slug: '', summary: '', blocks: [{ type: 'p', text: '' }], faqs: [], sources: [] })

export default function PostEditor() {
  const { slug: editing } = useParams()
  const navigate = useNavigate()
  const { session, refreshStatus } = useAdmin()
  const { lib } = useLibrary()
  const [cats, setCats] = useState<Cats | null>(null)
  const [meta, setMeta] = useState<BlogPostMeta | null>(null)
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [original, setOriginal] = useState('')
  const [loadError, setLoadError] = useState('')
  const [slugTouched, setSlugTouched] = useState(!!editing)
  const [view, setView] = useState<'write' | 'preview'>('write')
  const [errors, setErrors] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const c = (await api<{ data: Cats }>('content?doc=blog-categories')).data
        const r = editing ? await api<{ meta: BlogPostMeta; article: BlogArticle }>(`posts?slug=${editing}`) : { meta: blankMeta(c), article: blankArticle() }
        if (!alive) return
        setCats(c)
        setMeta(r.meta)
        setArticle(r.article)
        setOriginal(JSON.stringify([r.meta, r.article]))
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Could not load the post.')
      }
    })()
    return () => { alive = false }
  }, [editing])

  const dirty = !!meta && JSON.stringify([meta, article]) !== original
  useUnsavedWarning(dirty)
  const minutes = useMemo(() => (article ? readingMinutesFor(articleWordCount(article)) : 1), [article])

  if (loadError) return <Errors title="Could not open this post" errors={[loadError]} />
  if (!meta || !article || !cats) return <Spinner />

  const m = (p: Partial<BlogPostMeta>) => setMeta({ ...meta, ...p })
  const a = (p: Partial<BlogArticle>) => setArticle({ ...article, ...p })
  const setTitle = (title: string) => m({ title, ...(slugTouched ? {} : { slug: slugifyText(title) }) })

  const save = async () => {
    setSaving(true)
    setErrors([])
    const before = original ? (JSON.parse(original)[0] as BlogPostMeta) : null
    const next: BlogPostMeta = { ...meta, readingMinutes: minutes, seoTitle: meta.seoTitle || meta.title }
    // A fresh social card is drawn when the post is new or its title or photo changed.
    let ogImage: string | undefined
    const needsCard = !before?.slug || before.title !== next.title || before.image.slug !== next.image.slug || before.image.focus !== next.image.focus || before.slug !== next.slug || next.ogImage === '/og-image.jpg'
    if (needsCard && next.image.slug) {
      try {
        ogImage = await makeSocialCard(next.title, next.image.slug, lib?.[next.image.slug], next.image.focus)
      } catch {
        toast('The social image could not be drawn (the photo may not be live yet). Save again later to create it.', 'error')
      }
    }
    try {
      const r = await api<{ meta: BlogPostMeta }>('posts', { method: 'PUT', body: { meta: next, article: { ...article, slug: next.slug }, previousSlug: editing, ogImage } })
      const saved = r.meta
      setMeta(saved)
      setArticle({ ...article, slug: saved.slug })
      setOriginal(JSON.stringify([saved, { ...article, slug: saved.slug }]))
      toast(savedMessage(session.mode))
      refreshStatus()
      if (editing !== saved.slug) navigate(`/blog/edit/${saved.slug}`, { replace: true })
    } catch (e) {
      setErrors(e instanceof ApiError ? (e.details.length ? e.details : [e.message]) : ['Could not save.'])
      toast('Not saved. See the messages on the page.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const seoTitle = meta.seoTitle || meta.title

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"><ArrowLeft className="h-4 w-4" aria-hidden="true" />All posts</Link>
        <div className="flex items-center gap-2">
          {editing && meta.status !== 'draft' && <a href={`/blog/${editing}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-sand-100"><ExternalLink className="h-4 w-4" aria-hidden="true" />View live</a>}
          <div className="flex rounded-lg border border-sand-300 bg-white p-0.5 text-sm" role="group" aria-label="Mode">
            <button type="button" onClick={() => setView('write')} aria-pressed={view === 'write'} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold ${view === 'write' ? 'bg-brand-900 text-white' : 'text-ink-700'}`}><PenLine className="h-4 w-4" aria-hidden="true" />Write</button>
            <button type="button" onClick={() => setView('preview')} aria-pressed={view === 'preview'} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold ${view === 'preview' ? 'bg-brand-900 text-white' : 'text-ink-700'}`}><Eye className="h-4 w-4" aria-hidden="true" />Preview</button>
          </div>
        </div>
      </div>

      <div className="mb-6"><Errors errors={errors} onClose={() => setErrors([])} /></div>

      {view === 'preview' ? (
        <div className="rounded-2xl border border-sand-200 bg-ivory p-5 sm:p-10">
          <p className="text-sm font-semibold text-brand-700">{cats.categories.find((c) => c.id === meta.category)?.name}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink-900">{meta.title || 'Untitled post'}</h1>
          <p className="mt-4 font-serif-read text-xl text-ink-700">{meta.excerpt}</p>
          <div className="mx-auto mt-8 max-w-[44rem] [&_a]:pointer-events-none">
            <section className="summary-box"><p className="summary-label">In short</p><p className="summary-text"><Inline text={article.summary} /></p></section>
            <div className="prose-journal mt-10"><ArticleBlocks blocks={article.blocks} scope={`preview-${meta.slug}`} /></div>
          </div>
          <p className="mt-8 text-center text-xs text-ink-500">Preview of the article body. Photos uploaded today appear here once they are live.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] [&>*]:min-w-0">
          <div className="space-y-6">
            <Panel>
              <div className="space-y-4">
                <Text label="Title (the page heading)" value={meta.title} onChange={setTitle} max={110} />
                <Area label="Standfirst (shown under the title and on cards)" value={meta.excerpt} onChange={(v) => m({ excerpt: v })} rows={2} max={260} />
                <Area label="In short (a direct 40 to 70 word answer at the top)" value={article.summary} onChange={(v) => a({ summary: v })} rows={4} max={800} hint={`Answer the main question plainly; search and AI answer engines quote this. ${MARKUP_HINT}`} />
              </div>
            </Panel>
            <Panel title="Article" intro={`${article.blocks.length} blocks, about ${minutes} minute${minutes > 1 ? 's' : ''} to read.`}>
              <BlockEditor blocks={article.blocks} onChange={(blocks) => a({ blocks })} />
            </Panel>
            <Panel title="Questions pilgrims ask" intro="Shown at the end of the article and marked up for Google. Use real questions with clear answers.">
              <ListEditor<BlogFaq> items={article.faqs} onChange={(faqs) => a({ faqs })} create={() => ({ q: '', a: '' })} itemTitle={(f) => f.q || 'New question'} addLabel="Add question" max={20} render={(f, up) => (
                <>
                  <Text label="Question" value={f.q} onChange={(v) => up({ q: v })} max={300} />
                  <Area label="Answer" value={f.a} onChange={(v) => up({ a: v })} rows={3} hint={MARKUP_HINT} />
                </>
              )} />
            </Panel>
            <Panel title="Sources and official links" intro="Cite the official page for every rule that can change (visas, permits, health, dates).">
              <ListEditor<BlogSource> items={article.sources} onChange={(sources) => a({ sources })} create={() => ({ label: '', publisher: '', url: 'https://' })} itemTitle={(s) => s.label || 'New source'} addLabel="Add source" max={30} render={(s, up) => (
                <>
                  <Text label="Title of the page" value={s.label} onChange={(v) => up({ label: v })} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Text label="Publisher" value={s.publisher} onChange={(v) => up({ publisher: v })} placeholder="e.g. Saudi Ministry of Health" />
                    <Text label="Link" value={s.url} onChange={(v) => up({ url: v })} type="url" />
                  </div>
                </>
              )} />
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel title="Publishing">
              <div className="space-y-4">
                <Select<'published' | 'draft'> label="Status" value={meta.status ?? 'published'} onChange={(v) => m({ status: v })} options={[{ value: 'draft', label: 'Draft (not on the website)' }, { value: 'published', label: 'Published' }]} />
                <Check label="Featured" checked={!!meta.featured} onChange={(v) => m({ featured: v || undefined })} hint="The first featured post leads the blog home page." />
                <Text label="Web address" value={meta.slug} onChange={(v) => { setSlugTouched(true); m({ slug: slugifyText(v) }) }} hint={<>meezantours.com/blog/<strong>{meta.slug || '…'}</strong>{editing && editing !== meta.slug && ' — changing it breaks old links to this post.'}</>} />
                <Select label="Category" value={meta.category} onChange={(v) => m({ category: v })} options={cats.categories.map((c) => ({ value: c.id, label: c.name }))} />
                <Select label="Written by" value={meta.authorId} onChange={(v) => m({ authorId: v })} options={cats.authors.map((x) => ({ value: x.id, label: x.name }))} />
                <div className="grid grid-cols-2 gap-3">
                  <Text label="Published" type="date" value={meta.publishedAt} onChange={(v) => m({ publishedAt: v })} />
                  <Text label="Last reviewed" type="date" value={meta.updatedAt} onChange={(v) => m({ updatedAt: v })} />
                </div>
                <Btn onClick={() => m({ updatedAt: today() })} className="w-full">I re-checked the facts today</Btn>
                <Lines label="Tags" value={meta.tags} onChange={(v) => m({ tags: v })} rows={3} hint="One per line, e.g. umrah, visa. Used for search and related posts." />
              </div>
            </Panel>
            <Panel title="Main photo">
              <div className="space-y-4">
                <ImagePicker value={meta.image.slug} onChange={(slug) => m({ image: { ...meta.image, slug } })} />
                <Area label="Alt text" value={meta.image.alt} onChange={(v) => m({ image: { ...meta.image, alt: v } })} rows={2} max={300} />
                <Text label="Caption" value={meta.image.caption} onChange={(v) => m({ image: { ...meta.image, caption: v || undefined } })} max={300} />
                <Text label="Crop focus (optional)" value={meta.image.focus} onChange={(v) => m({ image: { ...meta.image, focus: v || undefined } })} placeholder="50% 40%" hint="Which part of the photo stays visible when cropped: horizontal% vertical%." />
                <p className="text-xs text-ink-500">The social media image is created from this photo and the title when you save.</p>
              </div>
            </Panel>
            <Panel title="Search engines">
              <div className="space-y-4">
                <Text label="SEO title" value={meta.seoTitle} onChange={(v) => m({ seoTitle: v })} max={60} hint="Leave empty to use the title. End with | Meezan Tours." />
                <Area label="Meta description" value={meta.description} onChange={(v) => m({ description: v })} rows={3} max={160} />
                <div className="rounded-lg border border-sand-200 bg-white p-3" aria-label="Google result preview">
                  <p className="text-xs text-ink-500">www.meezantours.com › blog › {meta.slug || '…'}</p>
                  <p className="mt-1 line-clamp-1 text-[1.05rem] text-[#1a0dab]">{seoTitle || 'Page title'}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-700">{meta.description || 'Meta description'}</p>
                </div>
              </div>
            </Panel>
            <Panel title="Closing message" intro="Shown above the footer. Leave empty for the standard message.">
              <div className="space-y-4">
                <Text label="Heading" value={meta.cta?.title} onChange={(v) => m({ cta: v || meta.cta?.text ? { title: v, text: meta.cta?.text ?? '' } : undefined })} max={120} />
                <Area label="Text" value={meta.cta?.text} onChange={(v) => m({ cta: v || meta.cta?.title ? { title: meta.cta?.title ?? '', text: v } : undefined })} rows={2} max={300} />
              </div>
            </Panel>
          </div>
        </div>
      )}

      <SaveBar dirty={dirty || !editing} saving={saving} onSave={save} note={meta.status === 'draft' ? 'Saved as a draft (not on the website).' : undefined} onDiscard={editing ? () => { const [mm, aa] = JSON.parse(original); setMeta(mm); setArticle(aa); setErrors([]) } : undefined} />
    </>
  )
}
