# Admin dashboard (authorised laptops only)

The admin manages the website's content: blog posts, blog categories, packages, FAQs, testimonials, gallery, home page photos, the photo library and business details.

**It is not on the internet.** The public website has no `/admin` page and no admin API: none of it is built or deployed. The admin runs only on a laptop that has this project folder **and** its private `.env.local` file. It opens at `http://localhost:5173/admin` on that laptop and cannot be reached from any other device.

Publishing still uses the internet: **Save and publish** commits the change to GitHub, and Vercel rebuilds the live website (usually live within one or two minutes). The sidebar shows the publishing status.

```
Authorised laptop: Open Meezan Admin.bat -> http://localhost:5173/admin
        | Save and publish (internet)
        v
GitHub repository -> Vercel rebuilds the public website
```

## Opening the admin (every time)

Double-click **`Open Meezan Admin.bat`** in the project folder. It fetches the latest version, then opens the admin in the browser. Log in with the admin password. Keep the black window open while you work; close it to stop the admin.

## Setting up a new laptop (once per laptop)

1. Install **Node.js** (LTS) from https://nodejs.org and **Git** from https://git-scm.com.
2. Get the project: open a terminal and run
   `git clone https://github.com/faisalahmad7/meezan-tours-website.git`
3. Create a **GitHub token for this laptop**: https://github.com/settings/personal-access-tokens/new
   - Repository access: *Only select repositories* → `meezan-tours-website`
   - Repository permissions → **Contents: Read and write**
   - Give each laptop its own token, so one can be cancelled without affecting the other.
4. In the project folder, create a file named **`.env.local`** with:

```
ADMIN_PASSWORD=<the admin password>
SESSION_SECRET=<a random string: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
GITHUB_TOKEN=<this laptop's GitHub token>
GITHUB_REPO=faisalahmad7/meezan-tours-website
GITHUB_BRANCH=main
```

5. Double-click `Open Meezan Admin.bat` (the first start installs everything and takes a few minutes).

`.env.local` is never committed to Git. Do not email or share it; anyone with this file can change the website. If a laptop is lost, delete its token at https://github.com/settings/personal-access-tokens.

Without `GITHUB_TOKEN`, the admin only changes the files on that laptop ("Local mode" in the sidebar); publish them with `git commit` and `git push`.

## What happens when you save

- Content lives in JSON files in `src/content/`. Each save is one Git commit (`content: … (admin)`), so the full history is kept and anything can be undone with `git revert`.
- Photos are resized in the browser to WebP at 480, 960 and 1600 px and committed to `public/images/gallery/`, with an entry in `src/content/image-manifest.json`.
- Blog posts get their 1200×630 social image drawn on save (same design as `scripts/blog-og.py`).
- Posts with status **Draft** are stored but never shown on the website.

## Security

- The admin and its API exist only on authorised laptops, served on `localhost`; requests from any other device are refused.
- Password login on top: an HMAC-signed, HttpOnly, `SameSite=Strict` session cookie, valid 12 hours; failed logins are slowed down.
- Writes must come from the admin page itself (same-origin check plus a custom header).
- Everything is validated before saving (types, lengths, web addresses, phone formats, slugs, safe links). Categories in use cannot be deleted; renamed posts update the reading route.
- The admin can only write `src/content/*.json`, `public/images/gallery/*.webp` and `public/images/blog/og/*.jpg`.
- GitHub tokens are fine-grained: this repository only, contents only.

## Files

| Path | What it is |
| --- | --- |
| `Open Meezan Admin.bat` | Double-click launcher (Windows) |
| `admin.html`, `src/admin/` | The dashboard (never built into the website) |
| `admin-server/` | The admin API, run by the local dev server (`vite.config.ts`, plugin `meezan-admin-dev`) |
| `src/content/` | The website content (JSON) |

## Limits to know

- One shared admin password per laptop setup.
- If both laptops edit the same section at the same moment, the last save wins.
- Removing a photo from the library is not offered yet; remove unused files through Git.
