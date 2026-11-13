import { Link } from 'react-router-dom'
import Picture from '@/components/Picture'
import type { BlogPostMeta } from '@/data/blog/types'
import { formatDate, getCategory, postPath, prefetchArticle } from '@/services/blog'

interface Props {
  post: BlogPostMeta
  /** lead: large horizontal feature. standard: image above text. compact: small thumbnail beside the title. */
  variant?: 'lead' | 'standard' | 'compact'
  /** Heading level for the title, so card lists keep a correct outline. */
  as?: 'h2' | 'h3'
  priority?: boolean
}

/**
 * Editorial card: the photo and the text sit directly on the page (no boxed card), and the whole
 * card is one link. Hovering or focusing it starts loading the article chunk.
 */
export default function ArticleCard({ post, variant = 'standard', as: H = 'h3', priority }: Props) {
  const cat = getCategory(post.category)
  const warm = () => prefetchArticle(post.slug)
  const meta = (
    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-ink-500">
      <span>{post.readingMinutes} min read</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    </p>
  )

  if (variant === 'compact') {
    return (
      <article className="group relative grid grid-cols-[6.5rem_1fr] items-start gap-4 sm:grid-cols-[8rem_1fr]">
        <Picture slug={post.image.slug} alt="" ratio="1/1" focus={post.image.focus} sizes="8rem" className="rounded-xl" imgClassName="transition duration-500 group-hover:scale-[1.04]" />
        <div>
          <p className="text-[0.8rem] font-semibold text-brand-700">{cat?.name}</p>
          <H className="mt-1 font-display text-lg font-semibold leading-snug text-ink-900">
            <Link to={postPath(post.slug)} onMouseEnter={warm} onFocus={warm} className="card-link">{post.title}</Link>
          </H>
          <p className="mt-1.5 text-[0.8rem] text-ink-500">{post.readingMinutes} min read</p>
        </div>
      </article>
    )
  }

  if (variant === 'lead') {
    return (
      <article className="group relative grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10">
        <Picture slug={post.image.slug} alt={post.image.alt} ratio="3/2" focus={post.image.focus} priority={priority} sizes="(min-width:1024px) 55vw, 100vw" className="rounded-xl2 gold-hairline" imgClassName="transition duration-700 group-hover:scale-[1.03]" />
        <div>
          <p className="text-sm font-semibold text-brand-700">{cat?.name}</p>
          <H className="mt-2 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.15] text-ink-900">
            <Link to={postPath(post.slug)} onMouseEnter={warm} onFocus={warm} className="card-link">{post.title}</Link>
          </H>
          <p className="mt-4 font-serif-read text-lg leading-relaxed text-ink-700">{post.excerpt}</p>
          {meta}
        </div>
      </article>
    )
  }

  return (
    <article className="group relative flex flex-col">
      <Picture slug={post.image.slug} alt={post.image.alt} ratio="3/2" focus={post.image.focus} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="rounded-xl2" imgClassName="transition duration-700 group-hover:scale-[1.03]" />
      <p className="mt-5 text-[0.8rem] font-semibold text-brand-700">{cat?.name}</p>
      <H className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink-900 sm:text-[1.4rem]">
        <Link to={postPath(post.slug)} onMouseEnter={warm} onFocus={warm} className="card-link">{post.title}</Link>
      </H>
      <p className="mt-2.5 font-serif-read text-[1.05rem] leading-relaxed text-ink-700">{post.excerpt}</p>
      {meta}
    </article>
  )
}
