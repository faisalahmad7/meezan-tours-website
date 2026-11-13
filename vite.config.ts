import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  // Bundled into the SSR build so Node never has to resolve their entry points.
  ssr: { noExternal: ['react-router-dom', 'react-router', '@remix-run/router', 'lucide-react'] },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      // The SSR build imports blog chunks eagerly on purpose (see entry-server.tsx); this notice is expected there.
      onwarn(w, warn) {
        if (w.message.includes('dynamic import will not move module into another chunk')) return
        warn(w)
      },
    },
  },
})
