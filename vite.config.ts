import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Local development only: serves /admin (admin.html) and runs the serverless functions in api/admin
 * inside the Vite dev server, the same way Vercel runs them in production. Variables come from
 * .env.local (see .env.example).
 */
function adminDev(): Plugin {
  return {
    name: 'meezan-admin-dev',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '/'
        if (/^\/admin(\/|\?|$)/.test(url)) {
          req.url = '/admin.html'
          return next()
        }
        const m = /^\/api\/admin\/([a-z-]+)(\?.*)?$/.exec(url)
        if (!m) return next()
        try {
          const mod = await server.ssrLoadModule(`/api/admin/${m[1]}.ts`)
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
      // Two pages: the public site (prerendered) and the admin dashboard (never prerendered).
      ...(isSsrBuild ? {} : { input: { main: fileURLToPath(new URL('./index.html', import.meta.url)), admin: fileURLToPath(new URL('./admin.html', import.meta.url)) } }),
      // The SSR build imports blog chunks eagerly on purpose (see entry-server.tsx); this notice is expected there.
      onwarn(w, warn) {
        if (w.message.includes('dynamic import will not move module into another chunk')) return
        warn(w)
      },
    },
  },
}))
