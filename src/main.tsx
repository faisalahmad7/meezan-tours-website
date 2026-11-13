import '@fontsource-variable/playfair-display'
import '@fontsource/amiri/arabic-400.css'
import '@fontsource-variable/newsreader/wght.css' // blog reading face; its files load only where it is used
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './hero-tweaks.css' // hero + navbar tweaks: delete this one line to undo
import './blog.css'
import { prepareBlog } from './lib/blogRoute'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
// Prerendered pages already contain markup, so hydrate; the dev server starts empty.
const start = () => (root.hasChildNodes() ? hydrateRoot(root, app) : createRoot(root).render(app))

// Blog pages (and each article body) are separate chunks. On /blog URLs, load them before
// hydrating so the first client render matches the prerendered HTML exactly.
if (/^\/blog(\/|$)/.test(window.location.pathname)) prepareBlog(window.location.pathname).catch(() => undefined).finally(start)
else start()
