import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { BlogRoute } from './lib/blogRoute'
import About from './pages/About'
import Contact from './pages/Contact'
import FaqPage from './pages/Faq'
import Gallery from './pages/Gallery'
import Hajj from './pages/Hajj'
import Home from './pages/Home'
import { Privacy, Terms } from './pages/Legal'
import NotFound from './pages/NotFound'
import Packages from './pages/Packages'
import Umrah from './pages/Umrah'
import Ziyarat from './pages/Ziyarat'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hajj" element={<Hajj />} />
        <Route path="umrah" element={<Umrah />} />
        <Route path="packages" element={<Packages />} />
        <Route path="ziyarat" element={<Ziyarat />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        {/* Blog pages live in their own chunk; linked from the footer only. */}
        <Route path="blog" element={<BlogRoute page="BlogIndex" />} />
        <Route path="blog/category/:category" element={<BlogRoute page="BlogCategory" />} />
        <Route path="blog/:slug" element={<BlogRoute page="BlogPost" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
