import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let raf = 0
    const check = () => { raf = 0; setShow(window.scrollY > 900) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${show ? 'show' : ''}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
