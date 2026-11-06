/**
 * Post-build step: renders every route to static HTML (dist/<route>/index.html),
 * writes dist/404.html, sitemap.xml and robots.txt. Run automatically by `npm run build`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://www.meezantours.com'

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, prerenderRoutes } = await import(
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
const urls = prerenderRoutes
  .map(
    (r) =>
      `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`,
  )
  .join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('done: sitemap.xml, robots.txt, 404.html written')
