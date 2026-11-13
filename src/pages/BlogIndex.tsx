import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ArticleCard from '@/components/blog/ArticleCard'
import BlogMasthead from '@/components/blog/BlogMasthead'
import CategoryNav from '@/components/blog/CategoryNav'
import ReadingPath from '@/components/blog/ReadingPath'
import CtaBand from '@/components/CtaBand'
import Seo from '@/components/Seo'
import { BLOG_FONTS } from '@/lib/blogFonts'
import { blogSchema, breadcrumbSchema } from '@/lib/schema'
import { BLOG, getFeaturedPosts, getPosts, searchPosts } from '@/services/blog'

const TOPICS = ['Ihram', 'Packing', 'Visa', 'Ramadan', 'Elderly parents', 'Rawdah']

/** Reads/writes ?q= without a router navigation, so typing never re-renders the route or scrolls. */
function useQueryParam() {
  const [q, setQ] = useState('')
  useEffect(() => {
    // Read after hydration: the prerendered HTML is always the unfiltered page.
    const initial = new URLSearchParams(window.location.search).get('q')
    if (initial) setQ(initial)
  }, [])
  const update = (v: string) => {
    setQ(v)
    const url = new URL(window.location.href)
    if (v.trim()) url.searchParams.set('q', v)
    else url.searchParams.delete('q')
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
  }
  return [q, update] as const
}

export default function BlogIndex() {
  const [q, setQ] = useQueryParam()
  const posts = getPosts()
  const lead = getFeaturedPosts()[0] ?? posts[0]
  const rest = posts.filter((p) => p.slug !== lead.slug)
  const searching = q.trim().length > 0
  const results = useMemo(() => (searching ? searchPosts(q) : []), [q, searching])

  const searchBox = (
    <div className="rounded-xl2 border border-gold-500/40 bg-brand-950/40 p-5 backdrop-blur-sm sm:p-6">
      <form role="search" action="/blog" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="blog-search" className="font-display text-xl font-semibold text-white">Search the guides</label>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            id="blog-search"
            name="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try ihram, visa or Zamzam"
            autoComplete="off"
            enterKeyHint="search"
            className="h-14 w-full rounded-full border-0 bg-white pl-12 pr-12 text-base text-ink-900 shadow-lift placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400 [&::-webkit-search-cancel-button]:hidden"
          />
          {searching && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 hover:bg-sand-100">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-white/70">Popular topics</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <li key={t}>
            <button type="button" onClick={() => setQ(t)} className="inline-flex min-h-[2.5rem] items-center rounded-full border border-white/25 px-3.5 text-sm text-white/90 transition hover:border-gold-400 hover:text-gold-300">{t}</button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Seo
        path={BLOG.path}
        title={BLOG.title}
        description={BLOG.description}
        image="/images/blog/og/blog.jpg"
        imageAlt="Meezan pilgrims in ihram at Masjid al-Haram, Makkah"
        preloadFonts={BLOG_FONTS}
        feed={{ title: 'Meezan Journal', href: '/blog/feed.xml' }}
        jsonLd={[
          blogSchema(BLOG.name, BLOG.description, posts),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
        ]}
      />
      <BlogMasthead
        crumbs={[{ name: 'Blog' }]}
        eyebrow={BLOG.name}
        title="Hajj and Umrah guides from a team that travels with pilgrims"
        intro="Practical, carefully checked advice for pilgrims from India and their families: the rites, the paperwork, what to pack and what to expect in Makkah and Madinah."
        aside={searchBox}
      />

      <p className="sr-only" role="status">{searching ? (results.length ? results.length + ' matching guides' : 'No matching guides') : ''}</p>
      <div>
        {searching ? (
          <section className="section" aria-labelledby="results-title">
            <div className="container">
              <h2 id="results-title" className="text-display-md">
                {results.length ? `${results.length} ${results.length === 1 ? 'guide' : 'guides'} for “${q.trim()}”` : `No guides match “${q.trim()}”`}
              </h2>
              {results.length > 0 ? (
                <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => <ArticleCard key={p.slug} post={p} />)}
                </div>
              ) : (
                <div className="mt-6 max-w-xl text-ink-700">
                  <p>Try a shorter word, such as “ihram” or “visa”, or browse a topic below. If your question is not covered yet, our team will answer it on WhatsApp.</p>
                  <div className="mt-6"><CategoryNav /></div>
                </div>
              )}
              <button type="button" onClick={() => setQ('')} className="btn btn-outline mt-12">Show all guides</button>
            </div>
          </section>
        ) : (
          <>
            <section className="section pb-10 sm:pb-12" aria-labelledby="featured-title">
              <div className="container">
                <h2 id="featured-title" className="sr-only">Featured guide</h2>
                <ArticleCard post={lead} variant="lead" as="h3" priority />
              </div>
            </section>

            <section className="pb-16 sm:pb-20 lg:pb-24" aria-labelledby="latest-title">
              <div className="container">
                <div className="flex flex-col gap-5 border-t border-sand-300 pt-10 lg:flex-row lg:items-center lg:justify-between">
                  <h2 id="latest-title" className="text-display-md">Latest guides</h2>
                  <CategoryNav />
                </div>
                <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => <ArticleCard key={p.slug} post={p} />)}
                </div>
              </div>
            </section>

            <ReadingPath />
          </>
        )}
      </div>

      <CtaBand title="Have a question the guides don't answer?" text="Our team in Pune answers Hajj and Umrah questions every day. Ask about dates, documents or packages." />
    </>
  )
}
