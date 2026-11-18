import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { foundationContent } from './content/foundationContent'
import RouteSeo from './seo/RouteSeo'
import ScrollProgress from './components/ScrollProgress'
import ErrorBoundary from './components/ErrorBoundary'
import BackToTop from './components/BackToTop'
import MobileDonateBar from './components/MobileDonateBar'
import { prefetchAllWhenIdle } from './prefetch'
import Home from './pages/Home'

// Secondary pages load only when visited (route-level code splitting).
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Initiatives = lazy(() => import('./pages/Initiatives'))
const Campaigns = lazy(() => import('./pages/Campaigns'))
const Gallery = lazy(() => import('./pages/Gallery'))
const GetInvolved = lazy(() => import('./pages/GetInvolved'))
const Contact = lazy(() => import('./pages/Contact'))
const Donate = lazy(() => import('./pages/donate'))
const Privacy = lazy(() => import('./pages/Legal').then(m => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then(m => ({ default: m.Terms })))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div role="status" aria-live="polite" className="page-skeleton">
      <span className="sr-only">Loading page…</span>
      <i /><i /><i />
    </div>
  )
}

function ScrollTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    // Jump to top instantly on page change; smooth scrolling here feels laggy.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Move keyboard / screen-reader focus to the new page content.
    const main = document.getElementById('main')
    if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }) }
  }, [pathname, hash])

  return null
}

function AnimatedRoutes() {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-fade">
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </div>
  )
}

export default function App() {
  useEffect(() => { prefetchAllWhenIdle() }, [])

  return (
    <BrowserRouter>
      <ScrollTop />
      <RouteSeo />
      <ScrollProgress />
      <Navbar />
      <a
        className="whatsapp-fab"
        href={`https://wa.me/${foundationContent.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Gau Sevarth on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-fab-icon" size={34} aria-hidden="true" />
      </a>
      <main id="main">
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
      <MobileDonateBar />
    </BrowserRouter>
  )
}
