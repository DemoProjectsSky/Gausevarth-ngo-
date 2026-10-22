import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Placeholder from './pages/placeholder'

function ScrollTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

const pages = [
  ['about', 'About Us'], ['our-work', 'Our Initiatives'], ['campaigns', 'Campaigns'],
  ['gallery', 'Gallery'], ['get-involved', 'Get Involved'], ['contact', 'Contact'],
  ['donate', 'Donate'], ['privacy', 'Privacy Policy'], ['terms', 'Terms & Conditions'],
]

// NOTE: if main.jsx already wraps <App/> in <BrowserRouter>, remove BrowserRouter here.
export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          {pages.map(([p, t]) => (
            <Route key={p} path={`/${p}`} element={<Placeholder title={t} />} />
          ))}
          <Route path="*" element={<Placeholder title="Page Not Found" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
