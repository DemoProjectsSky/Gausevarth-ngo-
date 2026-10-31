import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Heart, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'

const officialName = 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION'
const { contact } = foundationContent

export default function Footer() {
  const ref = useRef(null)

  // The giant wordmark "fills up" as the footer scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / Math.min(r.height, vh)))
      el.style.setProperty('--fp', p.toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <footer className="gs-footer" ref={ref}>
      <div className="gs-footer-glow" aria-hidden="true" />
      <div className="gs-footer-wrap">
        <div className="gs-footer-top">
          <div className="gs-footer-brand">
            <img src="/images/gausevarth.logo.jpeg" alt="" width="84" height="84" />
            <div>
              <strong>{officialName}</strong>
              <span>Seva, Sanrakshan aur Jeev Daya</span>
            </div>
          </div>
          <Link to="/donate" className="gs-footer-give"><Heart size={18} fill="currentColor" /> Donate now</Link>
        </div>

        <div className="gs-footer-cols">
          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/our-work">What We Do</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/get-involved">Get Involved</Link></li>
            </ul>
          </div>
          <div>
            <h3>Information</h3>
            <ul>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about#legal-title">Transparency</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>
          <div className="gs-footer-contact">
            <h3>Contact us</h3>
            <ul>
              <li><a href={`tel:+91${contact.phone}`}><Phone size={16} /> +91 {contact.phone}</a></li>
              <li><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a></li>
              <li><a href={`mailto:${contact.email}`}><Mail size={16} /> {contact.email}</a></li>
              <li><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Bap, Jodhpur, Rajasthan 342307')}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Bap, Jodhpur, Rajasthan - 342307</a></li>
            </ul>
            <p className="gs-footer-small">Section 8 company under the Companies Act, 2013.</p>
          </div>
        </div>

        <div className="gs-wordmark" aria-hidden="true">
          <svg className="line" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <text x="500" y="178" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs">GAU SEVARTH</text>
          </svg>
          <svg className="fill" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gs-wm" x1="0" x2="1">
                <stop offset="0" stopColor="#ffcf5c" />
                <stop offset="1" stopColor="#d9823b" />
              </linearGradient>
            </defs>
            <text x="500" y="178" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" fill="url(#gs-wm)">GAU SEVARTH</text>
          </svg>
        </div>

        <div className="gs-footer-bottom">
          <span>© {new Date().getFullYear()} {officialName}</span>
          <button className="gs-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}