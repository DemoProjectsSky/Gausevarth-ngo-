import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, Maximize2, X } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { CtaBand, Marquee, Page, PageHero, ShapePhoto, Split } from '../components/Shared'
import './gs-pages.css'
import './gs-pages-premium.css'

const base = [
  { src: '/images/gallery-01.jpg', cat: 'Cows', cap: 'She was here first', alt: 'A white cow with a brass bell resting on fresh grass', ar: 1.06 },
  { src: '/images/gallery-02.jpg', cat: 'Calves', cap: 'Little one, big eyes', alt: 'A calf resting in the grass', ar: 1.37 },
  { src: '/images/gallery-03.jpg', cat: 'Cows', cap: 'Our gentle giant', alt: 'A brown cow with a bell resting', ar: 1.73 },
  { src: '/images/gallery-04.jpg', cat: 'Cows', cap: 'Curious as ever', alt: 'A black and white cow looking at the camera', ar: .98 },
  { src: '/images/gallery-05.jpg', cat: 'Milk & fodder', cap: 'Fresh milk, fresh blessings', alt: 'A clay bowl of milk next to green leaves', ar: 1.45 },
  { src: '/images/gallery-06.jpg', cat: 'Calves', cap: 'Nap time', alt: 'A calf with a white mark on its forehead', ar: 1.16 },
  { src: '/images/gallery-07.jpg', cat: 'Milk & fodder', cap: 'Fodder for the day', alt: 'A woven basket of dry fodder on green grass', ar: 1.44 },
  { src: '/images/gallery-08.jpg', cat: 'Milk & fodder', cap: 'Green and fresh', alt: 'A basket full of fresh green grass', ar: 1.58 },
]

const pickShape = (ar, i) => {
  if (ar > 1.55) return ['wave', 'torn'][i % 2]
  if (ar < 1.15) return ['flower', 'blobb'][i % 2]
  return ['blob', 'torn', 'wave'][i % 3]
}
// rose gold, champagne, orchid, blush  (suits the deep plum gallery)
const tints = ['#e8b4a0', '#f0c36b', '#b98ad0', '#f2d4c4']

export default function Gallery() {
  const { approvedPhotos } = foundationContent
  const photos = useMemo(() => [
    ...base,
    ...approvedPhotos.map(p => ({ cat: 'More', ar: 1.3, ...p })),
  ], [approvedPhotos])
  const cats = useMemo(() => ['All', ...new Set(photos.map(p => p.cat))], [photos])

  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(-1)
  const shown = useMemo(() => photos.filter(p => cat === 'All' || p.cat === cat), [photos, cat])
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
          <h2 id="photos-title"><Split text="Moments from the shed." /></h2>
        </header>

        <div className="gp-filter" role="group" aria-label="Filter photos" data-anim="up">
          {cats.map(c => (
            <button key={c} type="button" className={cat === c ? 'on' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="gp-masonry">
          {shown.map((p, i) => (
            <figure key={p.src} className="gp-shot" style={{ '--r': `${[-1.5, 1, -.5, 1.5][i % 4]}deg`, '--ar': p.ar, '--d': `${(i % 6) * 70}ms` }}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.cap}`}>
                <ShapePhoto src={p.src} alt={p.alt || p.cap} shape={pickShape(p.ar, i)} color={tints[i % 4]} style={{ '--ar': p.ar }} />
                <span className="gp-shot-zoom"><Maximize2 size={18} /></span>
              </button>
              <figcaption>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
        <p className="gp-note" data-anim="blur">More photos and stories from the Foundation will be added here after they are approved.</p>
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