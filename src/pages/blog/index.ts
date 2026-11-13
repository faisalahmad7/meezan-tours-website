/**
 * The blog's page bundle. It is a separate JavaScript chunk, so visitors to the rest of the site
 * never download blog code. Prerendering registers it up front (entry-server.tsx); in the browser
 * it is loaded before hydration on /blog URLs (main.tsx via lib/blogRoute.tsx).
 */
import { loadArticle } from '@/services/blog'

export { default as BlogIndex } from '../BlogIndex'
export { default as BlogCategory } from '../BlogCategory'
export { default as BlogPost } from '../BlogPost'

/** Loads whatever an initial /blog URL needs (the article body) so hydration matches the HTML. */
export async function preloadForPath(pathname: string) {
  const m = /^\/blog\/(?!category\/)([^/]+)\/?$/.exec(pathname)
  if (m) await loadArticle(m[1]).catch(() => undefined)
}
