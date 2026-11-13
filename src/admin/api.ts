/** Small client for the admin API (/api/admin/*). */
export class ApiError extends Error {
  constructor(public status: number, message: string, public details: string[] = []) {
    super(message)
  }
}

/** Fired when the session has expired, so the app can show the login screen again. */
export const SESSION_EXPIRED = 'meezan-admin:session-expired'

export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api/admin/${path}`, {
    method: init.method ?? 'GET',
    credentials: 'same-origin',
    headers: { 'X-Meezan-Admin': '1', ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 401 && path !== 'session') window.dispatchEvent(new Event(SESSION_EXPIRED))
    const details = Array.isArray(data.details) ? data.details : []
    throw new ApiError(res.status, data.error ?? `Request failed (${res.status})`, details)
  }
  return data as T
}

export interface SessionInfo {
  configured: boolean
  mode: 'github' | 'files' | 'unconfigured'
  problems: string[]
  loggedIn: boolean
  expires: number | null
}

export interface PublishInfo {
  mode: 'github' | 'files'
  repo?: string
  branch?: string
  latest: { sha: string; message: string; date: string; deploy: 'pending' | 'success' | 'failure' | 'unknown'; deployUrl?: string } | null
}

export interface ImageMeta { w: number; h: number; widths: number[]; color: string }
