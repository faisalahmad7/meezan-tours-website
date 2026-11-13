/** The editable documents: id -> file in the repository, plus a short label used in commit messages. */
export const DOCS: Record<string, { file: string; label: string; readOnly?: boolean }> = {
  site: { file: 'src/content/site.json', label: 'business details' },
  packages: { file: 'src/content/packages.json', label: 'packages' },
  faqs: { file: 'src/content/faqs.json', label: 'FAQs' },
  testimonials: { file: 'src/content/testimonials.json', label: 'testimonials' },
  gallery: { file: 'src/content/gallery.json', label: 'gallery' },
  hero: { file: 'src/content/hero.json', label: 'home page hero photos' },
  'blog-categories': { file: 'src/content/blog/categories.json', label: 'blog categories and authors' },
  'reading-path': { file: 'src/content/blog/reading-path.json', label: 'blog reading route' },
  'image-manifest': { file: 'src/content/image-manifest.json', label: 'photo library', readOnly: true },
}

export const POSTS_FILE = 'src/content/blog/posts.json'
export const articleFile = (slug: string) => `src/content/blog/articles/${slug}.json`
export const MANIFEST_FILE = 'src/content/image-manifest.json'
