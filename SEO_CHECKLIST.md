# SEO_CHECKLIST.md

## Implemented in code (verify after build)
- [x] Unique title + description per route; canonical `https://www.meezantours.com/...`
- [x] Open Graph + Twitter tags, 1200x630 `og-image.jpg`
- [x] JSON-LD: TravelAgency, WebSite, BreadcrumbList, Service. No ratings/prices/coordinates.
- [x] `sitemap.xml`, `robots.txt`, `404.html` generated at build
- [x] Real `<a href>` navigation, one H1 per page, alt text on all images, `tel:` links
- [ ] FAQPage schema intentionally **not** added (Google limits FAQ rich results to government/health sites).

## To do after deploy
- [ ] 301 `meezantours.com` to `https://www.meezantours.com` (host setting), single hop
- [ ] Submit sitemap, request indexing for all 10 URLs, re-inspect the homepage (stale 2024 title)
- [ ] Add the real Search Console verification (the old `YOUR_CODE` tag was dropped)
- [ ] Check the old footer guide URLs (e.g. "How to Perform Umrah") and 301 any that were indexed
- [ ] Claim/verify the Google Business Profile; keep NAP identical to `src/data/site.ts`
- [ ] Run Lighthouse mobile
