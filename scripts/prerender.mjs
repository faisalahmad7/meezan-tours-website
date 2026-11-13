/**
 * Post-build step: renders every route to static HTML (dist/<route>/index.html),
 * writes dist/404.html, sitemap.xml and robots.txt. Run automatically by `npm run build`.
 */
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://www.meezantours.com'

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, prerenderRoutes, auditBlog, getBlogPosts } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

const inject = (url) => {
  const { html, headHtml } = render(url)
  return template.replace('<!--app-head-->', headHtml).replace('<!--app-html-->', html)
}

for (const { path: route } of prerenderRoutes) {
  const out = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html')
  await mkdir(path.dirname(path.join(dist, out)), { recursive: true })
  await writeFile(path.join(dist, out), inject(route))
  console.log('prerendered', route)
}

// Unknown URL -> NotFound page (hosts serve 404.html with a 404 status)
await writeFile(path.join(dist, '404.html'), inject('/page-not-found'))

const today = new Date().toISOString().slice(0, 10)
const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const urls = prerenderRoutes
  .filter((r) => r.sitemap !== false)
  .map((r) => {
    const imgs = (r.images ?? []).map((src) => `<image:image><image:loc>${SITE}${src}</image:loc></image:image>`).join('')
    return `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${r.lastmod ?? today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority>${imgs}</url>`
  })
  .join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
)

// RSS feed for the blog (advertised with <link rel="alternate"> on blog pages)
const posts = getBlogPosts()
const rfc822 = (iso) => new Date(`${iso}T09:00:00+05:30`).toUTCString()
const ogSize = async (p) => (await stat(path.join(dist, p.ogImage)).catch(() => ({ size: 0 }))).size
const sizes = await Promise.all(posts.map(ogSize))
const items = posts
  .map(
    (p, i) => `    <item>
      <title>${xmlEsc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <description>${xmlEsc(p.description)}</description>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <enclosure url="${SITE}${p.ogImage}" type="image/jpeg" length="${sizes[i]}" />
    </item>`,
  )
  .join('\n')
await writeFile(
  path.join(dist, 'blog', 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Meezan Journal: Hajj and Umrah guides</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical Hajj and Umrah guides from Meezan Tours &amp; Travels, Pune.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`,
)

const issues = auditBlog()
if (issues.length) console.warn('blog audit:\n  - ' + issues.join('\n  - '))
else console.log('blog audit: ok (' + posts.length + ' posts)')
await writeFile(path.join(dist, 'robots.txt'), [
    'User-agent: *\nAllow: /\nDisallow: /admin',
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'].map((b) => `User-agent: ${b}\nAllow: /`),
    `Sitemap: ${SITE}/sitemap.xml`,
  ].join('\n\n') + '\n')
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('done: sitemap.xml, robots.txt, 404.html, blog/feed.xml written')
