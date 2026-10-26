import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import './navbar-float.css'

const links = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/about', label: 'About Us', hash: '' },
  { to: '/#initiatives', label: 'What We Do', hash: '#initiatives' },
  { to: '/#gallery', label: 'Gallery', hash: '#gallery' },
  { to: '/#founders', label: 'Founders', hash: '#founders' },
  { to: '/#contact', label: 'Contact', hash: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)
  const onKeyDown = event => {
    if (event.key === 'Escape') closeMenu()
  }

  // home-navbar = Home wala floating card (logo size, text size, color). Baaki pages par is-sub se sticky.
  return (
    <header className={`navbar home-navbar ${isHome ? '' : 'is-sub'} ${compact ? 'is-compact' : ''}`} onKeyDown={onKeyDown}>
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
              aria-current={(location.pathname === link.to && (!link.hash || location.hash === link.hash)) ? 'page' : undefined}
              onClick={closeMenu}
            >{link.label}</Link>
          ))}
          <Link
            to="/donate"
            className="btn btn-primary nav-donate"
            aria-current={location.pathname === '/donate' ? 'page' : undefined}
            onClick={closeMenu}
          ><Heart size={15} fill="currentColor" /> Donate Now</Link>
        </nav>
      </div>
    </header>
  )
}   