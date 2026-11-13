# Meezan Journal (blog)

The blog lives at `/blog`. It is linked **only from the footer** (by design, not from the header or menus). Search engines find it through `sitemap.xml`, `blog/feed.xml`, `llms.txt` and internal links between articles.

## URLs

| URL | Page |
| --- | --- |
| `/blog` | Blog home: featured guide, latest guides, category filter, search, "read in this order" route |
| `/blog/category/<id>` | Category page (`umrah-guides`, `preparation`, `planning`, `hajj`) |
| `/blog/<slug>` | Article |
| `/blog/feed.xml` | RSS feed (generated at build) |

Old guide URLs from the previous site are redirected (301) to the matching articles in `vercel.json` and `public/_redirects`.

## Where the content is

Everything is plain, JSON-serialisable data, so the admin dashboard / CMS can later read and write the same shapes.

| File | What it holds |
| --- | --- |
| `src/data/blog/types.ts` | The content model (`BlogPostMeta`, `BlogArticle`, `Block`, `BlogCategory`, `BlogAuthor`) |
| `src/data/blog/posts.ts` | Post index: title, SEO title, description, excerpt, category, tags, dates, image, reading time, CTA |
| `src/data/blog/articles/<slug>.ts` | Article body: "In short" summary, content blocks, FAQs, sources |
| `src/data/blog/categories.ts` | Categories, authors, and the noindex threshold for small categories |
| `src/data/blog/readingPath.ts` | The "read in this order" route on the blog home |
| `src/services/blog.ts` | The only place components read blog content from (swap for API calls later) |

Article body blocks: `p`, `h2`, `h3`, `ul`, `ol`, `callout` (tip / note / important / verify), `steps`, `checklist`, `table`, `image`, `facts`, `arabic`, `cta`. Inline text supports `**bold**`, `[label](/internal)` and `[label](https://external)`; raw HTML is never rendered.

## Adding or editing a post

1. Add an entry to `src/data/blog/posts.ts` (keep `seoTitle` under ~60 characters and `description` under ~160).
2. Create `src/data/blog/articles/<slug>.ts` exporting a `BlogArticle` (copy an existing one).
3. Use photos from `src/data/imageManifest.ts` (real Meezan photos only).
4. Make the social image: `python scripts/blog-og.py` (needs Pillow). It writes `public/images/blog/og/<slug>.jpg`.
5. `npm run build`. The build prints a **blog audit** line: it flags a missing body, a reading time that does not match the text, or an over-long title/description.
6. When an article's facts are re-checked, update `updatedAt` in `posts.ts` (it drives "Last reviewed", `dateModified` and the sitemap `lastmod`).

## How it is built (for developers)

- **Prerendered:** every blog URL is rendered to static HTML at build time (`scripts/prerender.mjs`), with its own title, description, canonical, Open Graph/Twitter tags, `article:*` tags and JSON-LD. Search engines do not need JavaScript to read it.
- **Code-split:** blog pages are one lazy chunk (`src/pages/blog/index.ts`), and each article body is its own chunk. The rest of the site does not download blog code. On `/blog` URLs, `main.tsx` loads the needed chunks before hydrating, so the first render matches the static HTML.
- **Structured data:** `BlogPosting` (with `citation` sources), `BreadcrumbList`, `FAQPage` (only on articles with visible FAQs), `Blog` on the home, `CollectionPage` + `ItemList` on categories. Builders are in `src/lib/schema.ts`.
- **Sitemap:** blog URLs use each post's `updatedAt` as `lastmod` and include the hero image (image sitemap). Categories with fewer posts than `MIN_POSTS_TO_INDEX_CATEGORY` are `noindex` and left out.
- **Fonts:** article text uses Newsreader (already a dependency), preloaded only on blog pages.

## Keeping it accurate

Time-sensitive facts (visa rules, the Umrah season calendar, Nusuk/Rawdah rules, health requirements, Hajj quota and policy) were checked against official Saudi and Indian sources on **13 November 2026** and are cited at the end of each article. Re-check them at least once per Umrah season and after Hajj each year, and whenever the Saudi Ministry of Hajj and Umrah or the Haj Committee of India publishes new rules. No prices, departure dates or hotel names are stated in the articles; those stay on the packages pages.
