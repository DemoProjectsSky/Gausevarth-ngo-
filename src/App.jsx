import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Heart } from 'lucide-react'
import Navbar from './components/Navbar'
import { Shapes } from './components/Shared'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Donate from './pages/donate'
import Initiatives from './pages/Initiatives'
import Campaigns from './pages/Campaigns'
import Gallery from './pages/Gallery'
import GetInvolved from './pages/GetInvolved'
import Contact from './pages/Contact'
import { Privacy, Terms } from './pages/Legal'
import NotFound from './pages/NotFound'

const TITLES = {
  '/': 'Gau Sevarth | Seva, Sanrakshan aur Jeev Daya',
  '/about': 'About Us | Gau Sevarth',
  '/our-work': 'What We Do | Gau Sevarth',
  '/campaigns': 'Campaigns | Gau Sevarth',
  '/gallery': 'Gallery | Gau Sevarth',
  '/get-involved': 'Get Involved | Gau Sevarth',
  '/contact': 'Contact | Gau Sevarth',
  '/donate': 'Donate | Gau Sevarth',
  '/privacy': 'Privacy Policy | Gau Sevarth',
  '/terms': 'Terms of Use | Gau Sevarth',
}

function ScrollTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Page not found | Gau Sevarth'
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

// Floating "Donate" pill, shown on every page except the donate page itself.
function DonateFab() {
  const { pathname } = useLocation()
  if (pathname === '/donate') return null
  return <Link to="/donate" className="gs-fab" aria-label="Donate now"><Heart size={18} fill="currentColor" /> Donate</Link>
}

function Routed() {
  const { pathname } = useLocation()
  return (
    <main id="main" key={pathname} className="gs-page-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/our-work" element={<Initiatives />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Shapes />
      <Navbar />
      <Routed />
      <DonateFab />
      <Footer />
    </BrowserRouter>
  )
}
