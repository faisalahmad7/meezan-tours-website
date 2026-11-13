import '@fontsource-variable/playfair-display'
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource/amiri/arabic-400.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../blog.css'
import AdminApp from './AdminApp'

// The admin is a separate page (admin.html): it never loads the public site's bundle.
createRoot(document.getElementById('admin-root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>,
)
