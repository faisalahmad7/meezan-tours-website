import { BookOpen, CircleCheck, CircleDashed, CircleX, ExternalLink, FolderTree, Home, Images, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Package, CircleHelp, Store, X } from 'lucide-react'
import { useCallback, useEffect, useState, type ComponentType } from 'react'
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { api, ApiError, SESSION_EXPIRED, type PublishInfo, type SessionInfo } from './api'
import BlogSettings from './pages/BlogSettings'
import Dashboard from './pages/Dashboard'
import Faqs from './pages/Faqs'
import Gallery from './pages/Gallery'
import HomeHero from './pages/HomeHero'
import Library from './pages/Library'
import Packages from './pages/Packages'
import PostEditor from './pages/PostEditor'
import Posts from './pages/Posts'
import SiteSettings from './pages/SiteSettings'
import Testimonials from './pages/Testimonials'
import { Btn, Errors, Spinner, Toaster } from './ui'
import { AdminContext } from './useDoc'

const NAV: { to: string; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/blog', label: 'Blog posts', Icon: BookOpen },
  { to: '/blog-settings', label: 'Blog categories', Icon: FolderTree },
  { to: '/packages', label: 'Packages', Icon: Package },
  { to: '/faqs', label: 'FAQs', Icon: CircleHelp },
  { to: '/testimonials', label: 'Testimonials', Icon: MessageSquareQuote },
  { to: '/gallery', label: 'Gallery', Icon: Images },
  { to: '/home-hero', label: 'Home page photos', Icon: Home },
  { to: '/library', label: 'Photo library', Icon: Images },
  { to: '/business', label: 'Business details', Icon: Store },
]

export default function AdminApp() {
  const [session, setSession] = useState<SessionInfo | null>(null)
  const [error, setError] = useState('')
  const check = useCallback(() => {
    api<SessionInfo>('session').then(setSession).catch((e) => setError(e instanceof Error ? e.message : 'The admin API is not reachable.'))
  }, [])
  useEffect(() => {
    check()
    const expired = () => setSession((s) => (s ? { ...s, loggedIn: false } : s))
    window.addEventListener(SESSION_EXPIRED, expired)
    return () => window.removeEventListener(SESSION_EXPIRED, expired)
  }, [check])

  if (error) return <Centered><Errors title="The admin cannot start" errors={[error]} /></Centered>
  if (!session) return <Centered><Spinner /></Centered>
  if (!session.configured) return <NotConfigured problems={session.problems} />
  if (!session.loggedIn) return <Login onDone={check} />
  return (
    <BrowserRouter basename="/admin">
      <Shell session={session} onLogout={() => setSession({ ...session, loggedIn: false })} />
      <Toaster />
    </BrowserRouter>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <main className="pattern-dark flex min-h-screen items-center justify-center p-4"><div className="w-full max-w-md">{children}</div></main>
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <img src="/images/brand/meezan-badge-280.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full ring-2 ring-gold-500/60" />
      <div className="leading-tight">
        <p className="font-display text-lg font-semibold text-white">Meezan admin</p>
        <p className="text-xs text-gold-300">Content and settings</p>
      </div>
    </div>
  )
}

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('session', { method: 'POST', body: { password } })
      onDone()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not log in.')
      setBusy(false)
    }
  }
  return (
    <Centered>
      <div className="mb-6"><Brand /></div>
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-lift">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Log in</h1>
        <label htmlFor="pw" className="mt-5 block text-sm font-semibold text-ink-900">Admin password</label>
        <input id="pw" type="password" autoComplete="current-password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-lg border border-sand-300 px-3 py-2.5 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15" />
        {error && <p role="alert" className="mt-3 text-sm font-semibold text-accent-700">{error}</p>}
        <Btn type="submit" variant="primary" busy={busy} disabled={!password} className="mt-5 w-full">Log in</Btn>
      </form>
    </Centered>
  )
}

function NotConfigured({ problems }: { problems: string[] }) {
  return (
    <Centered>
      <div className="mb-6"><Brand /></div>
      <div className="rounded-2xl bg-white p-6 shadow-lift">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Admin not set up yet</h1>
        <p className="mt-2 text-sm text-ink-500">Add these settings in Vercel (Project Settings, Environment Variables), then redeploy. On your own computer, put them in <code>.env.local</code>. See docs/ADMIN.md.</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-900">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </Centered>
  )
}

function PublishStatus({ info }: { info: PublishInfo | null }) {
  if (!info) return null
  if (info.mode === 'files') return <p className="flex items-center gap-2 text-xs text-white/70"><CircleDashed className="h-4 w-4 text-gold-300" aria-hidden="true" />Local mode: saving to project files</p>
  const d = info.latest?.deploy
  const map = {
    success: { Icon: CircleCheck, text: 'Live site is up to date', cls: 'text-emerald-300' },
    pending: { Icon: CircleDashed, text: 'Publishing your changes…', cls: 'text-gold-300 animate-pulse' },
    failure: { Icon: CircleX, text: 'Last publish failed: check Vercel', cls: 'text-red-300' },
    unknown: { Icon: CircleDashed, text: 'Publish status unknown', cls: 'text-white/60' },
  }[d ?? 'unknown']
  return (
    <a href={info.latest?.deployUrl ?? '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs ${map.cls}`}>
      <map.Icon className="h-4 w-4" aria-hidden="true" />{map.text}
    </a>
  )
}

function Shell({ session, onLogout }: { session: SessionInfo; onLogout: () => void }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<PublishInfo | null>(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const refreshStatus = useCallback(() => { api<PublishInfo>('status').then(setStatus).catch(() => undefined) }, [])
  useEffect(() => { refreshStatus() }, [refreshStatus])
  // while a deploy is running (or just after a save), check again every 15 seconds
  useEffect(() => {
    if (status?.mode !== 'github' || status.latest?.deploy === 'success' || status.latest?.deploy === 'failure') return
    const id = setInterval(refreshStatus, 15000)
    return () => clearInterval(id)
  }, [status, refreshStatus])

  const logout = async () => {
    await api('session', { method: 'DELETE' }).catch(() => undefined)
    onLogout()
  }

  const sidebar = (
    <div className="pattern-dark flex h-full flex-col gap-6 p-5">
      <Brand />
      <nav aria-label="Admin" className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {NAV.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-gold-400 text-brand-950' : 'text-white/85 hover:bg-white/10 hover:text-white'}`}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />{label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-3 border-t border-white/15 pt-4">
        <PublishStatus info={status} />
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/70 hover:text-white"><ExternalLink className="h-4 w-4" aria-hidden="true" />View website</a>
        <button type="button" onClick={logout} className="flex items-center gap-2 text-xs text-white/70 hover:text-white"><LogOut className="h-4 w-4" aria-hidden="true" />Log out</button>
      </div>
    </div>
  )

  return (
    <AdminContext.Provider value={{ session, refreshStatus }}>
      <div className="min-h-screen bg-ivory lg:grid lg:grid-cols-[16.5rem_1fr]">
        <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>
        <header className="pattern-dark sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:hidden">
          <Brand />
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg p-2 text-white hover:bg-white/10"><Menu className="h-6 w-6" /></button>
        </header>
        {open && (
          <div className="fixed inset-0 z-40 bg-ink-900/50 lg:hidden" onClick={() => setOpen(false)}>
            <div className="h-full w-72 max-w-[85vw]" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="absolute left-[min(18rem,85vw)] top-3 ml-2 rounded-lg bg-white p-2"><X className="h-5 w-5" /></button>
              {sidebar}
            </div>
          </div>
        )}
        <main className="min-w-0 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl [&_.grid>*]:min-w-0">
            <Routes>
              <Route index element={<Dashboard status={status} />} />
              <Route path="blog" element={<Posts />} />
              <Route path="blog/new" element={<PostEditor />} />
              <Route path="blog/edit/:slug" element={<PostEditor />} />
              <Route path="blog-settings" element={<BlogSettings />} />
              <Route path="packages" element={<Packages />} />
              <Route path="faqs" element={<Faqs />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="home-hero" element={<HomeHero />} />
              <Route path="library" element={<Library />} />
              <Route path="business" element={<SiteSettings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </AdminContext.Provider>
  )
}
