/**
 * Server configuration for the admin API (read from environment variables).
 *
 * Production (Vercel), set in Project Settings > Environment Variables:
 *   ADMIN_PASSWORD   the admin login password (12+ characters)
 *   SESSION_SECRET   a long random string used to sign the login cookie (32+ characters)
 *   GITHUB_TOKEN     fine-grained token with "Contents: Read and write" on this repository only
 *   GITHUB_REPO      owner/name, e.g. faisalahmad7/meezan-tours-website
 *   GITHUB_BRANCH    the branch Vercel deploys to production (default: main)
 *
 * Local development (npm run dev): put the same variables in .env.local. Without GITHUB_TOKEN the
 * admin writes straight to the files in src/content, which is what you want on your own machine.
 */
export interface Config {
  mode: 'github' | 'files' | 'unconfigured'
  password?: string
  secret?: string
  github?: { token: string; repo: string; branch: string }
  /** Problems that stop the admin from working, shown on the login screen. */
  problems: string[]
}

const onVercel = () => !!process.env.VERCEL

export function getConfig(): Config {
  const env = process.env
  const problems: string[] = []
  const password = env.ADMIN_PASSWORD
  const secret = env.SESSION_SECRET
  if (!password || password.length < 8) problems.push('ADMIN_PASSWORD is not set (8+ characters).')
  if (!secret || secret.length < 32) problems.push('SESSION_SECRET is not set (32+ random characters).')

  if (env.GITHUB_TOKEN) {
    const repo = env.GITHUB_REPO || ''
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) problems.push('GITHUB_REPO must look like owner/repository.')
    return { mode: problems.length ? 'unconfigured' : 'github', password, secret, github: { token: env.GITHUB_TOKEN, repo, branch: env.GITHUB_BRANCH || 'main' }, problems }
  }
  // Writing to local files only makes sense on a developer's machine, never on a server.
  if (onVercel()) problems.push('GITHUB_TOKEN is not set, so changes cannot be published.')
  return { mode: problems.length ? 'unconfigured' : 'files', password, secret, problems }
}
