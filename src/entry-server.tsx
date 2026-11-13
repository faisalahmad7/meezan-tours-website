import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { getServerHead, headToHtml, resetServerHead } from './lib/head'
import type { BlogArticle } from './data/blog/types'
import { registerBlogPages } from './lib/blogRoute'
import * as blogPages from './pages/blog'
import { registerArticles } from './services/blog'

// Prerender with every blog article body available synchronously.
registerArticles(import.meta.glob<{ default: BlogArticle }>('./data/blog/articles/*.ts', { eager: true }))
registerBlogPages(blogPages)

export { prerenderRoutes } from './routes'
export { auditBlog, getPosts as getBlogPosts } from './services/blog'

export function render(url: string) {
  resetServerHead()
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const head = getServerHead()
  return { html, headHtml: head ? headToHtml(head) : '' }
}
