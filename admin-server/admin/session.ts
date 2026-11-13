import { clearCookie, passwordMatches, readSession, sessionCookie } from '../_lib/auth.js'
import { getConfig } from '../_lib/config.js'
import { adminRoute, HttpError, json, readJson } from '../_lib/http.js'

/** Login state, plus whether the admin is configured (shown on the login screen). */
export const GET = adminRoute(async (req) => {
  const cfg = getConfig()
  const exp = cfg.mode === 'unconfigured' ? null : readSession(req, cfg)
  return json({ configured: cfg.mode !== 'unconfigured', mode: cfg.mode, problems: cfg.problems, loggedIn: !!exp, expires: exp })
}, { auth: false })

/** Log in with the admin password. */
export const POST = adminRoute(async (req) => {
  const cfg = getConfig()
  if (cfg.mode === 'unconfigured') throw new HttpError(503, 'The admin is not configured yet.', cfg.problems)
  const { password } = await readJson<{ password?: string }>(req, 10_000)
  if (typeof password !== 'string' || !passwordMatches(password, cfg)) {
    await new Promise((r) => setTimeout(r, 800)) // slow down guessing
    throw new HttpError(401, 'That password is not correct.')
  }
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(req, cfg) })
}, { auth: false })

/** Log out. */
export const DELETE = adminRoute(async (req) => json({ ok: true }, 200, { 'Set-Cookie': clearCookie(req) }), { auth: false })
