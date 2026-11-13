import { Link, useParams } from 'react-router-dom'
import ArticleCard from '@/components/blog/ArticleCard'
import BlogMasthead from '@/components/blog/BlogMasthead'
import CategoryNav from '@/components/blog/CategoryNav'
import CtaBand from '@/components/CtaBand'
import Seo from '@/components/Seo'
import { BLOG_FONTS } from '@/lib/blogFonts'
import { breadcrumbSchema, collectionSchema } from '@/lib/schema'
import { BLOG, categoryPath, getCategories, getCategory, getPostsByCategory, isCategoryIndexable } from '@/services/blog'
import NotFound from './NotFound'

export default function BlogCategory() {
  const { category = '' } = useParams()
  const cat = getCategory(category)
  if (!cat) return <NotFound />
  const posts = getPostsByCategory(cat.id)
  const path = categoryPath(cat.id)
  const others = getCategories().filter((c) => c.id !== cat.id)

  return (
    <>
      <Seo
        path={path}
        title={cat.seoTitle}
        description={cat.description}
        image={posts[0]?.ogImage}
        imageAlt={posts[0]?.image.alt}
        noindex={!isCategoryIndexable(cat.id)}
        preloadFonts={BLOG_FONTS}
        feed={{ title: BLOG.name, href: '/blog/feed.xml' }}
        jsonLd={[
          collectionSchema(cat.name, cat.description, path, posts),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.name, path }]),
        ]}
      />
      <BlogMasthead
        crumbs={[{ name: 'Blog', path: '/blog' }, { name: cat.name }]}
        eyebrow={BLOG.name}
        title={cat.name}
        intro={cat.description}
      />

      <section className="section">
        <div className="container">
          <CategoryNav active={cat.id} />
          <h2 className="sr-only">{posts.length} guides in {cat.name}</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => <ArticleCard key={p.slug} post={p} priority={i === 0} />)}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20" aria-labelledby="more-topics">
        <div className="container">
          <div className="border-t border-sand-300 pt-10">
            <h2 id="more-topics" className="font-display text-2xl font-semibold">More topics</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {others.map((c) => (
                <li key={c.id} className="group relative rounded-xl2 border border-sand-200 bg-white p-6 transition hover:border-gold-500/70">
                  <h3 className="font-display text-xl font-semibold"><Link to={categoryPath(c.id)} className="card-link">{c.name}</Link></h3>
                  <p className="mt-2 text-sm text-ink-500">{c.short}</p>
                  <p className="mt-4 text-sm font-semibold text-brand-700">{getPostsByCategory(c.id).length} guides</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
