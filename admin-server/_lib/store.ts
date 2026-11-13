import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Config } from './config.js'
import { HttpError } from './http.js'

export interface FileChange {
  /** Repository-relative path, e.g. src/content/site.json */
  path: string
  /** New content. Omit to delete the file. */
  content?: string
  encoding?: 'utf-8' | 'base64'
}

export interface PublishState {
  sha: string
  message: string
  date: string
  /** Deployment state reported by Vercel on the commit, when available. */
  deploy: 'pending' | 'success' | 'failure' | 'unknown'
  deployUrl?: string
}

export interface Store {
  mode: 'github' | 'files'
  read(file: string): Promise<string | null>
  commit(changes: FileChange[], message: string): Promise<{ sha?: string }>
  status(): Promise<PublishState | null>
}

/** Only content, gallery photos and blog social images may ever be read or written through the admin. */
const ALLOWED = [/^src\/content\/[\w./-]+\.json$/, /^public\/images\/gallery\/[a-z0-9-]+-\d+\.webp$/, /^public\/images\/blog\/og\/[a-z0-9-]+\.jpg$/]
export function assertAllowed(file: string) {
  if (file.includes('..') || !ALLOWED.some((r) => r.test(file))) throw new HttpError(400, `Path not allowed: ${file}`)
}

/* ---------------------------------------------------------------- local files (development) */

function filesStore(): Store {
  const root = process.cwd()
  return {
    mode: 'files',
    async read(file) {
      assertAllowed(file)
      try {
        return await readFile(path.join(root, file), 'utf8')
      } catch {
        return null
      }
    },
    async commit(changes) {
      for (const c of changes) {
        assertAllowed(c.path)
        const p = path.join(root, c.path)
        if (c.content === undefined) await rm(p, { force: true })
        else {
          await mkdir(path.dirname(p), { recursive: true })
          await writeFile(p, Buffer.from(c.content, c.encoding === 'base64' ? 'base64' : 'utf8'))
        }
      }
      return {}
    },
    async status() {
      return null
    },
  }
}

/* ---------------------------------------------------------------- GitHub (production) */

function githubStore(gh: NonNullable<Config['github']>): Store {
  const base = `https://api.github.com/repos/${gh.repo}`
  const call = async <T>(url: string, init: RequestInit = {}, accept = 'application/vnd.github+json'): Promise<T> => {
    const res = await fetch(url.startsWith('http') ? url : base + url, {
      ...init,
      headers: { Authorization: `Bearer ${gh.token}`, Accept: accept, 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'meezan-admin', ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      if (res.status === 401) throw new HttpError(502, 'GitHub refused the token: it is wrong or has expired. Put a valid GITHUB_TOKEN in .env.local and restart the admin.')
      if (res.status === 403 && /not accessible by personal access token|permission/i.test(text))
        throw new HttpError(502, `The GitHub token is not allowed to save to ${gh.repo}. Edit the token at github.com/settings/personal-access-tokens: give it access to this repository and set "Contents" to "Read and write". No restart is needed.`)
      throw new HttpError(res.status === 404 ? 404 : 502, `GitHub ${res.status}: ${text.slice(0, 200)}`)
    }
    return (accept.includes('raw') ? await res.text() : await res.json()) as T
  }

  async function commitOnce(changes: FileChange[], message: string) {
    const ref = await call<{ object: { sha: string } }>(`/git/ref/heads/${gh.branch}`)
    const head = ref.object.sha
    const commit = await call<{ tree: { sha: string } }>(`/git/commits/${head}`)
    const tree = await Promise.all(
      changes.map(async (c) => {
        if (c.content === undefined) return { path: c.path, mode: '100644', type: 'blob', sha: null }
        const blob = await call<{ sha: string }>('/git/blobs', { method: 'POST', body: JSON.stringify({ content: c.content, encoding: c.encoding === 'base64' ? 'base64' : 'utf-8' }) })
        return { path: c.path, mode: '100644', type: 'blob', sha: blob.sha }
      }),
    )
    const newTree = await call<{ sha: string }>('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: commit.tree.sha, tree }) })
    const newCommit = await call<{ sha: string }>('/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }) })
    await call(`/git/refs/heads/${gh.branch}`, { method: 'PATCH', body: JSON.stringify({ sha: newCommit.sha, force: false }) })
    return newCommit.sha
  }

  return {
    mode: 'github',
    async read(file) {
      assertAllowed(file)
      try {
        return await call<string>(`/contents/${file}?ref=${encodeURIComponent(gh.branch)}`, {}, 'application/vnd.github.raw+json')
      } catch (e) {
        if (e instanceof HttpError && e.status === 404) return null
        throw e
      }
    },
    async commit(changes, message) {
      changes.forEach((c) => assertAllowed(c.path))
      try {
        return { sha: await commitOnce(changes, message) }
      } catch (e) {
        // Someone else pushed between our read and our update: rebuild the commit on the new head once.
        if (e instanceof HttpError && e.status === 502 && /422/.test(e.message)) return { sha: await commitOnce(changes, message) }
        throw e
      }
    },
    async status() {
      const c = await call<{ sha: string; commit: { message: string; committer: { date: string } } }>(`/commits/${gh.branch}`)
      const s = await call<{ statuses: { context: string; state: string; target_url?: string }[] }>(`/commits/${c.sha}/status`)
      const v = s.statuses.find((x) => /vercel/i.test(x.context))
      const deploy = !v ? 'unknown' : v.state === 'success' ? 'success' : v.state === 'pending' ? 'pending' : 'failure'
      return { sha: c.sha, message: c.commit.message.split('\n')[0], date: c.commit.committer.date, deploy, deployUrl: v?.target_url }
    },
  }
}

export function getStore(cfg: Config): Store {
  if (cfg.mode === 'github' && cfg.github) return githubStore(cfg.github)
  if (cfg.mode === 'files') return filesStore()
  throw new HttpError(503, 'The admin is not configured yet.', cfg.problems)
}

export const toJson = (data: unknown) => JSON.stringify(data, null, 2) + '\n'

export async function readJsonFile<T>(store: Store, file: string): Promise<T> {
  const raw = await store.read(file)
  if (raw === null) throw new HttpError(404, `Not found: ${file}`)
  return JSON.parse(raw) as T
}
