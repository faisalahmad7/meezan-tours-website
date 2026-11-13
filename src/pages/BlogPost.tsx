import { BadgeCheck, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArticleBlocks from '@/components/blog/ArticleBlocks'
import ArticleCard from '@/components/blog/ArticleCard'
import { BlogCrumbs } from '@/components/blog/BlogMasthead'
import Inline from '@/components/blog/Inline'
import ReadingProgress from '@/components/blog/ReadingProgress'
import ShareBar from '@/components/blog/ShareBar'
import { TocDisclosure, TocRail } from '@/components/blog/Toc'
import CtaBand from '@/components/CtaBand'
import Picture from '@/components/Picture'
import Seo from '@/components/Seo'
import { SITE } from '@/data/site'
import type { BlogArticle, BlogPostMeta } from '@/data/blog/types'
import { BLOG_FONTS } from '@/lib/blogFonts'
import { blogPostingSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import {
  BLOG, articleWordCount, categoryPath, formatDate, getArticleSync, getAuthor, getCategory, getPost,
  getRelatedPosts, loadArticle, plainText, postPath, tocOf,
} from '@/services/blog'
import NotFound from './NotFound'

/** Keyed by slug so moving between articles starts from a clean state. */
export default function BlogPostRoute() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />
  return <BlogPost key={slug} post={post} />
}

function useArticle(slug: string) {
  // Prerendered pages: the body is already registered (server) or preloaded before hydration (browser).
  const [article, setArticle] = useState<BlogArticle | undefined>(() => getArticleSync(slug))
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    if (article) return
    let alive = true
    loadArticle(slug)
      .then((a) => {
        if (!alive) return
        if (a) setArticle(a)
        else setFailed(true)
      })
      .catch(() => { if (alive) setFailed(true) })
    return () => { alive = false }
  }, [slug, article])
  return { article, failed }
}

function BlogPost({ post }: { post: BlogPostMeta }) {
  const { article, failed } = useArticle(post.slug)
  const cat = getCategory(post.category)!
  const author = getAuthor(post.authorId)
  const path = postPath(post.slug)
  const related = getRelatedPosts(post)
  const toc = article
    ? [...tocOf(article), ...(article.faqs.length ? [{ id: 'faq', text: 'Questions pilgrims ask' }] : []), { id: 'sources', text: 'Sources and official links' }]
    : []

  const jsonLd: object[] = [
    blogPostingSchema(post, { section: cat.name, wordCount: article ? articleWordCount(article) : 0, sources: article?.sources ?? [] }),
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.name, path: categoryPath(cat.id) }, { name: post.title, path }]),
  ]
  if (article?.faqs.length) jsonLd.push(faqSchema(article.faqs.map((f) => ({ q: f.q, a: plainText(f.a) }))))

  return (
    <>
      <Seo
        key={article ? 'full' : 'meta'}
        path={path}
        title={post.seoTitle}
        description={post.description}
        image={post.ogImage}
        imageAlt={post.image.alt}
        type="article"
        article={{ publishedTime: post.publishedAt, modifiedTime: post.updatedAt, section: cat.name, tags: post.tags }}
        preloadFonts={BLOG_FONTS}
        feed={{ title: BLOG.name, href: '/blog/feed.xml' }}
        jsonLd={jsonLd}
      />
      <ReadingProgress targetId="article-body" />

      <article>
        <header className="pattern-dark on-dark relative overflow-hidden pb-28 text-white sm:pb-40">
          {/* Wrapper div on purpose: hero-tweaks.css styles `header > .container` (the site header). */}
          <div>
          <div className="container py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <BlogCrumbs items={[{ name: 'Blog', path: '/blog' }, { name: cat.name, path: categoryPath(cat.id) }, { name: post.title }]} />
              <div data-hero className="mt-8 max-w-[46rem] lg:ml-[18.5rem] xl:ml-[20rem]">
                <p><Link to={categoryPath(cat.id)} className="inline-flex items-center rounded-full border border-gold-400/60 px-3 py-1 text-sm font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-brand-950">{cat.name}</Link></p>
                <h1 className="mt-5 font-display text-[clamp(2.1rem,5.2vw,3.5rem)] font-semibold leading-[1.08] text-white">{post.title}</h1>
                <p className="mt-5 font-serif-read text-xl leading-relaxed text-white/85 sm:text-[1.4rem]">{post.excerpt}</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-sm sm:flex sm:flex-wrap">
                  <div className="col-span-2 sm:col-span-1"><dt className="text-white/55">Written by</dt><dd className="mt-0.5 font-semibold text-white"><Link to={author.url} className="underline decoration-gold-400/60 decoration-dotted underline-offset-4 hover:text-gold-300">{author.name}</Link></dd></div>
                  <div><dt className="text-white/55">Published</dt><dd className="mt-0.5 text-white"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></dd></div>
                  <div><dt className="text-white/55">Last reviewed</dt><dd className="mt-0.5 text-white"><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></dd></div>
                  <div><dt className="text-white/55">Reading time</dt><dd className="mt-0.5 text-white">{post.readingMinutes} minutes</dd></div>
                </dl>
              </div>
            </div>
          </div>
          </div>
        </header>

        <div className="container">
          <figure className="relative z-10 mx-auto -mt-20 max-w-6xl sm:-mt-32">
            <Picture slug={post.image.slug} alt={post.image.alt} ratio="16/9" focus={post.image.focus} priority sizes="(min-width:1280px) 72rem, 100vw" className="rounded-xl2 shadow-lift gold-hairline" />
            {post.image.caption && <figcaption className="mt-3 text-sm text-ink-500 lg:ml-[18.5rem] xl:ml-[20rem]">{post.image.caption}</figcaption>}
          </figure>

          <div className="mx-auto max-w-6xl py-12 sm:py-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-16">
            <aside className="no-print hidden lg:block">
              <div className="sticky top-32 space-y-10">
                {toc.length > 0 && <TocRail items={toc} />}
                <ShareBar path={path} title={post.title} layout="rail" />
              </div>
            </aside>

            <div id="article-body" className="min-w-0 max-w-[44rem]">
              {article ? (
                <ArticleContent post={post} article={article} toc={toc} />
              ) : failed ? (
                <p className="rounded-xl2 border border-sand-300 bg-white p-6">This guide could not be loaded. Please check your connection and <a className="font-semibold text-brand-700 underline" href={path}>reload the page</a>.</p>
              ) : (
                <ArticleSkeleton />
              )}

              <div className="mt-14 border-t border-sand-300 pt-8 lg:hidden">
                <ShareBar path={path} title={post.title} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="section pattern-light no-print" aria-labelledby="related-title">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="text-display-md">Keep reading</h2>
            <Link to="/blog" className="text-sm font-semibold text-brand-700 underline decoration-gold-500 underline-offset-4 hover:text-brand-900">All guides</Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ArticleCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <CtaBand title={post.cta?.title} text={post.cta?.text} />
    </>
  )
}

function ArticleContent({ post, article, toc }: { post: BlogPostMeta; article: BlogArticle; toc: { id: string; text: string }[] }) {
  const author = getAuthor(post.authorId)
  return (
    <>
      <div className="lg:hidden">{toc.length > 3 && <TocDisclosure items={toc} />}</div>

      <section aria-label="In short" className="summary-box mt-8 lg:mt-0">
        <p className="summary-label">In short</p>
        <p className="summary-text"><Inline text={article.summary} /></p>
      </section>

      <div className="prose-journal mt-10">
        <ArticleBlocks blocks={article.blocks} scope={post.slug} />
      </div>

      {article.faqs.length > 0 && (
        <section id="faq" aria-labelledby="faq-title" className="mt-16 scroll-mt-32">
          <h2 id="faq-title" className="font-display text-[clamp(1.55rem,2.6vw,2rem)] font-semibold text-ink-900">Questions pilgrims ask</h2>
          <div className="mt-6 divide-y divide-sand-300 border-y border-sand-300">
            {article.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-xl font-semibold text-ink-900">{f.q}</h3>
                <p className="mt-2 font-serif-read text-[1.1rem] leading-relaxed text-ink-700 prose-links"><Inline text={f.a} /></p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="sources" aria-labelledby="sources-title" className="mt-16 scroll-mt-32">
        <h2 id="sources-title" className="font-display text-2xl font-semibold text-ink-900">Sources and official links</h2>
        <p className="mt-3 text-[0.95rem] text-ink-500">
          Visa, permit and health rules are set by the Saudi and Indian authorities and can change at short notice. We last checked this guide on <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>. Confirm current rules with these sources, or ask our team, before you travel.
        </p>
        <ol className="mt-5 space-y-3 text-[0.95rem]">
          {article.sources.map((s) => (
            <li key={s.url} className="flex gap-3">
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              <span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-800 underline decoration-gold-500/70 underline-offset-4 hover:text-brand-950">{s.label}<span className="sr-only"> (opens in a new tab)</span></a>
                <span className="text-ink-500">, {s.publisher}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <aside aria-label="About the author" className="mt-14 flex gap-5 rounded-xl2 border border-gold-500/40 bg-white p-6 sm:p-7">
        <img src="/images/brand/meezan-badge-280.png" width={56} height={56} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-full ring-1 ring-gold-500/50" />
        <div>
          <p className="font-display text-lg font-semibold text-ink-900">{author.name}</p>
          <p className="text-sm text-ink-500">{author.role}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">{author.bio}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link to="/about" className="font-semibold text-brand-700 underline decoration-gold-500 underline-offset-4">About Meezan</Link>
            <a href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink-500 hover:text-brand-800">
              <BadgeCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />Licence {SITE.licence.number}
            </a>
          </p>
        </div>
      </aside>
    </>
  )
}

function ArticleSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-4">
      <div className="h-32 rounded-xl2 bg-sand-200" />
      {Array.from({ length: 8 }, (_, i) => <div key={i} className={`h-4 rounded bg-sand-200 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />)}
      <span className="sr-only">Loading the guide</span>
    </div>
  )
}
