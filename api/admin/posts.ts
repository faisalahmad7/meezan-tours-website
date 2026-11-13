import { getConfig } from '../_lib/config.js'
import { articleFile, DOCS, POSTS_FILE } from '../_lib/docs.js'
import { adminRoute, HttpError, json, readJson } from '../_lib/http.js'
import { getStore, readJsonFile, toJson, type FileChange } from '../_lib/store.js'
import { article as articleCheck, postMeta, SLUG, validate } from '../_lib/validate.js'

interface Meta { slug: string; title: string; category: string; authorId: string; ogImage: string; [k: string]: unknown }
interface Path { stage: string; text: string; slugs: string[] }

const OG = (slug: string) => `public/images/blog/og/${slug}.jpg`

/** GET: all posts (drafts included). GET ?slug=x: one post with its article body. */
export const GET = adminRoute(async (req) => {
  const store = getStore(getConfig())
  const slug = new URL(req.url).searchParams.get('slug')
  const posts = await readJsonFile<Meta[]>(store, POSTS_FILE)
  if (!slug) return json({ posts })
  const meta = posts.find((p) => p.slug === slug)
  if (!meta) throw new HttpError(404, 'That post does not exist.')
  const article = await readJsonFile(store, articleFile(slug))
  return json({ meta, article })
})

/**
 * Create or update a post. Body: { meta, article, previousSlug?, ogImage? (base64 JPEG) }.
 * Changing the slug renames the article file and updates the reading route, in one commit.
 */
export const PUT = adminRoute(async (req) => {
  const body = await readJson<{ meta: Meta; article: { slug: string }; previousSlug?: string; ogImage?: string }>(req)
  const { meta, article } = body
  const errors = [...validate(postMeta, meta, 'meta'), ...validate(articleCheck, article, 'article')]
  if (!errors.length && meta.slug !== article.slug) errors.push('The article body belongs to a different post.')
  const store = getStore(getConfig())
  const [posts, cats, path] = await Promise.all([
    readJsonFile<Meta[]>(store, POSTS_FILE),
    readJsonFile<{ categories: { id: string }[]; authors: { id: string }[] }>(store, DOCS['blog-categories'].file),
    readJsonFile<Path[]>(store, DOCS['reading-path'].file),
  ])
  const prev = body.previousSlug && SLUG.test(body.previousSlug) ? body.previousSlug : undefined
  if (!errors.length) {
    if (!cats.categories.some((c) => c.id === meta.category)) errors.push(`meta.category: unknown category "${meta.category}"`)
    if (!cats.authors.some((a) => a.id === meta.authorId)) errors.push(`meta.authorId: unknown author "${meta.authorId}"`)
    if (meta.slug !== prev && posts.some((p) => p.slug === meta.slug)) errors.push(`meta.slug: another post already uses the address "${meta.slug}"`)
    if (prev && !posts.some((p) => p.slug === prev)) errors.push('The post you were editing no longer exists. Reload the list.')
  }
  if (body.ogImage !== undefined && (typeof body.ogImage !== 'string' || body.ogImage.length > 1_500_000)) errors.push('The social image is too large.')
  if (errors.length) throw new HttpError(422, 'Please fix the highlighted problems.', errors)

  const changes: FileChange[] = []
  if (body.ogImage) {
    meta.ogImage = `/images/blog/og/${meta.slug}.jpg`
    changes.push({ path: OG(meta.slug), content: body.ogImage, encoding: 'base64' })
  }
  const nextPosts = prev ? posts.map((p) => (p.slug === prev ? meta : p)) : [meta, ...posts]
  changes.push({ path: POSTS_FILE, content: toJson(nextPosts) }, { path: articleFile(meta.slug), content: toJson(article) })
  if (prev && prev !== meta.slug) {
    changes.push({ path: articleFile(prev) })
    const renamed = path.map((s) => ({ ...s, slugs: s.slugs.map((x) => (x === prev ? meta.slug : x)) }))
    if (JSON.stringify(renamed) !== JSON.stringify(path)) changes.push({ path: DOCS['reading-path'].file, content: toJson(renamed) })
  }
  const verb = prev ? (prev !== meta.slug ? `rename ${prev} to` : 'update') : 'add'
  const result = await store.commit(changes, `content: ${verb} blog post ${meta.slug} (admin)`)
  return json({ ok: true, meta, ...result })
})

/** Delete a post, its article body, and any mention of it in the reading route. */
export const DELETE = adminRoute(async (req) => {
  const slug = new URL(req.url).searchParams.get('slug') ?? ''
  if (!SLUG.test(slug)) throw new HttpError(400, 'Invalid post address.')
  const store = getStore(getConfig())
  const [posts, path] = await Promise.all([readJsonFile<Meta[]>(store, POSTS_FILE), readJsonFile<Path[]>(store, DOCS['reading-path'].file)])
  if (!posts.some((p) => p.slug === slug)) throw new HttpError(404, 'That post does not exist.')
  const changes: FileChange[] = [
    { path: POSTS_FILE, content: toJson(posts.filter((p) => p.slug !== slug)) },
    { path: articleFile(slug) },
  ]
  const cleaned = path.map((s) => ({ ...s, slugs: s.slugs.filter((x) => x !== slug) })).filter((s) => s.slugs.length)
  if (JSON.stringify(cleaned) !== JSON.stringify(path)) changes.push({ path: DOCS['reading-path'].file, content: toJson(cleaned) })
  const result = await store.commit(changes, `content: delete blog post ${slug} (admin)`)
  return json({ ok: true, ...result })
})
