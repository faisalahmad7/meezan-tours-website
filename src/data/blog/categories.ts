import data from '@/content/blog/categories.json'
import type { BlogAuthor, BlogCategory } from './types'

/** Stored in src/content/blog/categories.json; order = order of the filter chips. */
export const blogCategories = data.categories as BlogCategory[]

/** Content is attributed to the company's team unless named authors are added. */
export const blogAuthors = data.authors as BlogAuthor[]

/** Category pages with fewer posts than this are rendered but marked noindex and left out of the sitemap. */
export const MIN_POSTS_TO_INDEX_CATEGORY: number = data.minPostsToIndexCategory
