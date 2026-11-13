import { useEffect, useState } from 'react'

type BlogPages = typeof import('@/pages/blog')
type PageName = 'BlogIndex' | 'BlogCategory' | 'BlogPost'

let pages: BlogPages | undefined

/** Build time: entry-server registers the blog pages so they render synchronously. */
export const registerBlogPages = (p: BlogPages) => {
  pages = p
}

/** Browser: fetch the blog chunk (once). */
export const loadBlogPages = () =>
  pages ? Promise.resolve(pages) : import('@/pages/blog').then((m) => (pages = m))

/** Called before hydration on /blog URLs: loads the chunk and anything the page needs first. */
export const prepareBlog = (pathname: string) => loadBlogPages().then((m) => m.preloadForPath(pathname))

/**
 * Route element for blog pages. When the chunk is already loaded (prerender, or preloaded before
 * hydration) it renders immediately; after a client-side click from elsewhere it loads first.
 */
export function BlogRoute({ page }: { page: PageName }) {
  const [p, setP] = useState(pages)
  useEffect(() => {
    if (!p) loadBlogPages().then(setP)
  }, [p])
  if (!p) return <div className="min-h-[70vh]" aria-busy="true" />
  const Page = p[page]
  return <Page />
}
