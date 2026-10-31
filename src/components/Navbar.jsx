import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/our-work', label: 'What We Do' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)
  const onKeyDown = event => {
    if (event.key === 'Escape') closeMenu()
  }

  return (
    <header className={`navbar ${location.pathname === '/' ? 'home-navbar' : ''} ${compact ? 'is-compact' : ''}`} onKeyDown={onKeyDown}>
      <a href="#main" className="skip">Skip to content</a>
     
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION home" onClick={closeMenu}>
          <img src="/images/gausevarth.logo.jpeg" alt="" width="100" height="100" />
          <span>GAUSEVARATHA SWAYAM SEVAK<br />CHARITABLE FOUNDATION</span>
        </Link>

        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        <nav id="main-navigation" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="nav-link"
              aria-current={location.pathname === link.to ? 'page' : undefined}
              onClick={closeMenu}
            >{link.label}</Link>
          ))}
          <Link to="/donate" className="btn btn-primary nav-donate" onClick={closeMenu}><Heart size={15} fill="currentColor" /> Donate Now</Link>
        </nav>
      </div>
    </header>
  )
}
