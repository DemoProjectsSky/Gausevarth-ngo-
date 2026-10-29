import { useEffect } from 'react'

/* Reveal-on-scroll for every [data-anim] inside the page, plus a
   --p (0..1) scroll variable on every [data-prog] element (parallax). */
export function useReveal(ref, deps = []) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = [...el.querySelectorAll('[data-anim]')]
    let io
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in'))
    } else {
      const watch = new Map()
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          watch.get(e.target)?.classList.add('in')
          io.unobserve(e.target)
        })
      }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' })
      targets.forEach(t => {
        const node = t.dataset.anim === 'clip' ? t.parentElement : t
        watch.set(node, t)
        io.observe(node)
      })
    }

    const progs = [...el.querySelectorAll('[data-prog]')]
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      progs.forEach(s => {
        const r = s.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
        s.style.setProperty('--p', p.toFixed(4))
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
