import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart } from 'lucide-react'

/* Sticky "Donate now" bar for phones. Appears after the visitor scrolls a little,
   and is hidden on the donate page itself. */
export default function MobileDonateBar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const visible = scrolled && pathname !== '/donate'

  useEffect(() => {
    let raf = 0
    const check = () => { raf = 0; setScrolled(window.scrollY > 480) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-donate-bar', visible)
    return () => document.body.classList.remove('has-donate-bar')
  }, [visible])

  return (
    <div className={`donate-bar ${visible ? 'show' : ''}`} aria-hidden={!visible}>
      <span>Feed a cow today</span>
      <Link to="/donate" className="btn btn-primary" tabIndex={visible ? 0 : -1}>
        <Heart size={16} fill="currentColor" aria-hidden="true" /> Donate Now
      </Link>
    </div>
  )
}
