import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import type { Config } from './config.js'

const COOKIE = 'meezan_admin'
const MAX_AGE = 60 * 60 * 12 // 12 hours

const b64url = (b: Buffer | string) => Buffer.from(b).toString('base64url')
const sign = (payload: string, secret: string) => createHmac('sha256', secret).update(payload).digest('base64url')
const sameBytes = (a: Buffer, b: Buffer) => a.length === b.length && timingSafeEqual(a, b)

/** Constant-time password check (hashing first makes both sides the same length). */
export function passwordMatches(input: string, cfg: Config) {
  if (!cfg.password) return false
  const h = (s: string) => createHash('sha256').update(s).digest()
  return sameBytes(h(input), h(cfg.password))
}

const secure = (req: Request) => {
  const host = new URL(req.url).hostname
  return host !== 'localhost' && host !== '127.0.0.1'
}

export function sessionCookie(req: Request, cfg: Config) {
  const payload = b64url(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + MAX_AGE }))
  const value = `${payload}.${sign(payload, cfg.secret!)}`
  return `${COOKIE}=${value}; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${secure(req) ? '; Secure' : ''}`
}

export const clearCookie = (req: Request) =>
  `${COOKIE}=; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=0${secure(req) ? '; Secure' : ''}`

/** Returns the session expiry (unix seconds) if the cookie is present, correctly signed and unexpired. */
export function readSession(req: Request, cfg: Config): number | null {
  if (!cfg.secret) return null
  const raw = (req.headers.get('cookie') ?? '').split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`))
  if (!raw) return null
  const [payload, sig] = raw.slice(COOKIE.length + 1).split('.')
  if (!payload || !sig || !sameBytes(Buffer.from(sig), Buffer.from(sign(payload, cfg.secret)))) return null
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp: number }
    return exp > Date.now() / 1000 ? exp : null
  } catch {
    return null
  }
}
