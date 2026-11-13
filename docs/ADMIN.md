# Admin dashboard (/admin)

A private dashboard for managing the website's content: blog posts, blog categories, packages, FAQs, testimonials, gallery, home page photos, the photo library and business details. It is not linked from the website and is hidden from search engines (`noindex`, and `robots.txt` disallows `/admin`).

## How it works

```
Browser (/admin)  ->  /api/admin/* (Vercel functions)  ->  GitHub commit  ->  Vercel rebuilds the site
```

- Content lives in JSON files in `src/content/` (one file per kind of content; one file per blog article).
- Saving in the admin commits the changed files to the production branch on GitHub. Vercel deploys that commit, and the prerendered pages are rebuilt, so the live site keeps its full SEO. A change is usually live in one or two minutes; the sidebar shows the deploy status.
- Every change is a normal Git commit (`content: … (admin)`), so the full history is kept and anything can be undone with `git revert`.
- Photos are resized in the browser to WebP at 480, 960 and 1600 px and committed to `public/images/gallery/`, with an entry in `src/content/image-manifest.json`.
- Blog posts get their 1200×630 social image drawn in the browser on save (same design as `scripts/blog-og.py`).
- Posts with status **Draft** are stored but never rendered, listed or put in the sitemap.

There is no database and no extra hosting cost.

## Setting it up on Vercel (one time)

1. **Create a GitHub token**: github.com → Settings → Developer settings → Fine-grained tokens → Generate.
   - Repository access: *Only select repositories* → `meezan-tours-website`.
   - Permissions → Repository → **Contents: Read and write** (nothing else).
   - Set an expiry date and note it; renew the token before it expires.
2. **In Vercel** → the `meezan-tours-website` project → Settings → Environment Variables (Production), add:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | a long password (12+ characters) |
| `SESSION_SECRET` | a random string: run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GITHUB_TOKEN` | the token from step 1 |
| `GITHUB_REPO` | `faisalahmad7/meezan-tours-website` |
| `GITHUB_BRANCH` | `main` |

3. Redeploy (Deployments → … → Redeploy). Open `https://<your-domain>/admin` and log in.

If a setting is missing, the admin shows exactly which one instead of the login form.

## Using it on your own computer

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD and SESSION_SECRET; leave GITHUB_TOKEN empty
npm run dev                  # then open http://localhost:5173/admin
```

Without `GITHUB_TOKEN` the admin writes straight into `src/content/` and `public/images/` on your machine ("Local mode" in the sidebar). Review with `git diff`, then commit and push as usual.

## Security

- Password login; the session is an HMAC-signed, HttpOnly, `SameSite=Strict` cookie scoped to `/api/admin`, valid 12 hours. Failed logins are slowed down.
- Every write must come from the admin page itself (same-origin check plus a custom header), so other websites cannot trigger changes.
- Everything is validated on the server before it is saved (types, lengths, web addresses, phone formats, slugs, and that links in text only point to the site, `https://`, `mailto:` or `tel:`). Categories in use cannot be deleted; renamed posts update the reading route.
- The API can only write to `src/content/*.json`, `public/images/gallery/*.webp` and `public/images/blog/og/*.jpg`.
- The GitHub token never leaves the server. Use a fine-grained token limited to this one repository.

## Files

| Path | What it is |
| --- | --- |
| `admin.html`, `src/admin/` | The dashboard (a separate page; the public site never loads its code) |
| `api/admin/*.ts` | Serverless functions: `session`, `content`, `posts`, `upload`, `status` |
| `api/_lib/` | Config, auth, validation and the content store (GitHub in production, local files in development) |
| `src/content/` | The content itself (JSON) |

## Limits to know

- One admin password, shared. Named user accounts can be added later.
- If two people edit the same section at the same moment, the last save wins.
- Removing a photo from the library is not offered yet (photos may be used in several places); remove unused files through Git.
- Vercel's Hobby plan builds one deployment at a time; several quick saves are deployed in order.
