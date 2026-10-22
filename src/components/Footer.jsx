import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'

const officialName = 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand light">
            <img src="/images/gausevarth.logo.jpeg" alt="" width="56" height="56" />
            <span>{officialName}</span>
          </div>
          <p>Section 8 company under the Companies Act, 2013.<br />Registered-record location: Bap, Jodhpur, Rajasthan - 342307.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li><li><Link to="/#initiatives">Our Initiatives</Link></li>
            <li><Link to="/#impact">Our Impact</Link></li><li><Link to="/#gallery">Gallery</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>Information</h3>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/donate">Donation Information</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {officialName}</span>
        <button className="to-top" aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>
      </div>
    </footer>
  )
}
