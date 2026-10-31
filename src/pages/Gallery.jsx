import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, ImagePlus, Maximize2, X } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { galleryImages } from '../content/galleryImages'
import { CtaBand, Marquee, Page, PageHero, Split } from '../components/Shared'
import './gs-pages.css'
import './gs-pages-premium.css'

const INK = import.meta.env.DEV

/* one rectangular / square photo slot. Missing files stay hidden on the live site. */
function Tile({ p, onOpen, index, onMissing }) {
  const [ok, setOk] = useState(true)
  if (!ok && !INK) return null
  return (
    <figure className={`gp-shot gp-shot-${p.shape}`} style={{ '--d': `${(index % 6) * 70}ms` }}>
      {ok ? (
        <button type="button" onClick={() => onOpen(index)} aria-label={`Open photo: ${p.cap}`}>
          <img src={p.src} alt={p.alt || p.cap} onError={() => { setOk(false); onMissing?.(p.src) }} />
          <span className="gp-shot-zoom"><Maximize2 size={18} /></span>
        </button>
      ) : (
        <div className="gp-shot-empty"><ImagePlus size={28} /><b>Add photo</b><small>{p.src.replace('/images/', 'public/images/')}</small></div>
      )}
      {ok && <figcaption>{p.cap}</figcaption>}
    </figure>
  )
}

export default function Gallery() {
  const { approvedPhotos } = foundationContent
  const photos = useMemo(() => [
    ...galleryImages,
    ...approvedPhotos.map(p => ({ cat: 'More', shape: 'landscape', ...p })),
  ], [approvedPhotos])
  const [missing, setMissing] = useState([])
  const cats = useMemo(() => ['All', ...new Set(photos.map(p => p.cat))], [photos])

  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(-1)
  const shown = useMemo(() => photos.filter(p => (cat === 'All' || p.cat === cat) && !missing.includes(p.src)), [photos, cat, missing])
  const closeBtn = useRef(null)

  const step = useCallback(d => setOpen(i => (i < 0 ? i : (i + d + shown.length) % shown.length)), [shown.length])

  useEffect(() => {
    if (open < 0) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeBtn.current?.focus()
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, step])

  const current = open >= 0 ? shown[open] : null

  return (
    <Page theme="night">
      <PageHero
        kicker="Gallery"
        title="Gallery"
        lead="A look at the cows and calves we care for, and the simple things that fill their day: fresh fodder, clean water and a little love."
      >
        <a href="#photos" className="gs-btn gs-btn-lilac" data-magnet>Browse photos</a>
        <Link to="/donate" className="gs-btn gs-btn-ghost" data-magnet><Heart size={16} fill="currentColor" /> Support them</Link>
      </PageHero>

      <Marquee className="gs-m-sun" items={['Cows', 'Calves', 'Fodder', 'Fresh milk']} />

      <section id="photos" className="gp-section gp-gallery" aria-labelledby="photos-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Photo gallery</span>
          <h2 id="photos-title"><Split text="Moments from the gaushala." /></h2>
        </header>

        <div className="gp-filter" role="group" aria-label="Filter photos" data-anim="up">
          {cats.map(c => (
            <button key={c} type="button" className={cat === c ? 'on' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="gp-masonry">
          {shown.map((p, i) => (
            <Tile key={p.src} p={p} index={i} onOpen={setOpen} onMissing={src => setMissing(m => (INK ? m : [...m, src]))} />
          ))}
        </div>
        <p className="gp-note" data-anim="blur">New photos from the gaushala are added here regularly.</p>
      </section>

      {current && (
        <div className="gp-lightbox" role="dialog" aria-modal="true" aria-label={current.cap} onClick={() => setOpen(-1)}>
          <button ref={closeBtn} type="button" className="lb-close" aria-label="Close" onClick={() => setOpen(-1)}><X size={24} /></button>
          <button type="button" className="lb-nav lb-prev" aria-label="Previous photo" onClick={e => { e.stopPropagation(); step(-1) }}><ChevronLeft size={28} /></button>
          <figure onClick={e => e.stopPropagation()} key={current.src}>
            <img src={current.src} alt={current.alt || current.cap} />
            <figcaption>{current.cap} <small>{open + 1} / {shown.length}</small></figcaption>
          </figure>
          <button type="button" className="lb-nav lb-next" aria-label="Next photo" onClick={e => { e.stopPropagation(); step(1) }}><ChevronRight size={28} /></button>
        </div>
      )}

      <CtaBand
        title="Every smile here is yours too."
        text="Your support puts fodder in the trough and a roof over their heads."
        primary={{ to: '/donate', label: 'Donate now' }}
        secondary={{ to: '/our-work', label: 'How we care' }}
      />
    </Page>
  )
}