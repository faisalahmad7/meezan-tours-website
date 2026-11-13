import { getConfig } from './config.js'
import { readSession } from './auth.js'

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...headers },
  })

export const fail = (status: number, message: string, details?: unknown) => json({ error: message, details }, status)

export class HttpError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message)
  }
}

/**
 * Wraps a handler: checks the request comes from the admin page itself (same origin, custom header),
 * that the admin is logged in, and turns thrown HttpErrors into JSON responses.
 */
export function adminRoute(handler: (req: Request) => Promise<Response>, opts: { auth?: boolean } = {}) {
  return async (req: Request): Promise<Response> => {
    try {
      if (req.method !== 'GET') {
        const origin = req.headers.get('origin')
        const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
        if (!origin || new URL(origin).host !== host) throw new HttpError(403, 'Requests must come from the admin page.')
        if (req.headers.get('x-meezan-admin') !== '1') throw new HttpError(403, 'Missing admin request header.')
      }
      if (opts.auth !== false) {
        const cfg = getConfig()
        if (cfg.mode === 'unconfigured') throw new HttpError(503, 'The admin is not configured yet.', cfg.problems)
        if (!readSession(req, cfg)) throw new HttpError(401, 'Please log in again.')
      }
      return await handler(req)
    } catch (e) {
      if (e instanceof HttpError) return fail(e.status, e.message, e.details)
      console.error(e)
      return fail(500, e instanceof Error ? e.message : 'Unexpected error')
    }
  }
}

export async function readJson<T>(req: Request, maxBytes = 6_000_000): Promise<T> {
  const text = await req.text()
  if (text.length > maxBytes) throw new HttpError(413, 'That request is too large.')
  try {
    return JSON.parse(text) as T
  } catch {
    throw new HttpError(400, 'The request body is not valid JSON.')
  }
}
