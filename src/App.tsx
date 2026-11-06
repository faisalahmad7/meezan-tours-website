import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
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
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
