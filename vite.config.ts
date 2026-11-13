import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * The admin dashboard exists ONLY on authorised computers: this plugin serves /admin (admin.html)
 * and runs the admin API (admin-server/) inside the local dev server. Nothing of it is built or
 * deployed, so the public website has no /admin and no API. Settings come from .env.local, which
 * lives only on the authorised laptops (see docs/ADMIN.md).
 */
function adminDev(): Plugin {
  return {
    name: 'meezan-admin-dev',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '/'
        const isAdmin = /^\/admin(\/|\?|\.html|$)/.test(url) || url.startsWith('/api/admin/')
        // The admin answers only to this computer, even if the dev server is opened to the network.
        const ip = req.socket.remoteAddress ?? ''
        if (isAdmin && !['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip)) {
          res.statusCode = 403
          return res.end('The Meezan admin can only be opened on this computer.')
        }
        if (/^\/admin(\/|\?|$)/.test(url)) {
          req.url = '/admin.html'
          return next()
        }
        const m = /^\/api\/admin\/([a-z-]+)(\?.*)?$/.exec(url)
        if (!m) return next()
        try {
          const mod = await server.ssrLoadModule(`/admin-server/admin/${m[1]}.ts`)
          const handler = mod[req.method ?? 'GET'] as ((r: Request) => Promise<Response>) | undefined
          if (!handler) {
            res.statusCode = 405
            return res.end()
          }
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
          const body = chunks.length ? Buffer.concat(chunks) : undefined
          const response = await handler(new Request(`http://${req.headers.host}${url}`, { method: req.method, headers, body }))
          res.statusCode = response.status
          response.headers.forEach((v, k) => { if (k !== 'set-cookie') res.setHeader(k, v) })
          const cookies = response.headers.getSetCookie()
          if (cookies.length) res.setHeader('Set-Cookie', cookies)
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (e) {
          server.ssrFixStacktrace(e as Error)
          next(e)
        }
      })
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), adminDev()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  // Bundled into the SSR build so Node never has to resolve their entry points.
  ssr: { noExternal: ['react-router-dom', 'react-router', '@remix-run/router', 'lucide-react'] },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      // Only the public site is built. The admin (admin.html) is never part of a build or deployment.
      ...(isSsrBuild ? {} : { input: { main: fileURLToPath(new URL('./index.html', import.meta.url)) } }),
      // The SSR build imports blog chunks eagerly on purpose (see entry-server.tsx); this notice is expected there.
      onwarn(w, warn) {
        if (w.message.includes('dynamic import will not move module into another chunk')) return
        warn(w)
      },
    },
  },
}))
