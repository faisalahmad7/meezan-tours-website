import data from '@/content/blog/posts.json'
import type { BlogPostMeta } from './types'

/**
 * Post index (metadata only), stored in src/content/blog/posts.json and edited in /admin > Blog.
 * Each post's body lives in src/content/blog/articles/<slug>.json. Posts with status "draft" are
 * never shown on the site.
 */
export const blogPosts = data as BlogPostMeta[]
