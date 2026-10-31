import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, ImagePlus } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

/* ---------- page shell: gives every page the same scroll animations ---------- */
export function Page({ theme, children, className = '' }) {
  const ref = useRef(null)
  useReveal(ref)
  return <div ref={ref} className={`gs gp gp-${theme} ${className}`}>{children}</div>
}

/* ---------- headline that animates in letter by letter ---------- */
export function Split({ text, as: Tag = 'span', className = '', start = 0 }) {
  let n = start
  return (
    <Tag className={`gs-split ${className}`} aria-label={text} data-anim="chars">
      {text.split(' ').map((word, wi) => (
        <span className="gs-word" aria-hidden="true" key={wi}>
          {[...word].map((ch, ci) => <span className="gs-ch" key={ci} style={{ '--i': n++ }}>{ch}</span>)}
          {' '}
        </span>
      ))}
    </Tag>
  )
}

/* ---------- scrolling ribbon of words ---------- */
export function Marquee({ items, reverse = false, className = '' }) {
  const row = items.concat(items)
  return (
    <div className={`gs-marquee ${reverse ? 'is-reverse' : ''} ${className}`} aria-hidden="true">
      <div className="gs-marquee-track">
        {[0, 1].map(k => (
          <div className="gs-marquee-row" key={k}>
            {row.map((t, i) => <span key={i}>{t}<i /></span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- small decorative doodles ---------- */
export const Flower = props => (
  <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
      <ellipse key={a} cx="50" cy="22" rx="10" ry="20" fill="currentColor" transform={`rotate(${a} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="13" fill="#2b140b" opacity=".85" />
  </svg>
)

export const Leaf = props => (
  <svg viewBox="0 0 100 140" aria-hidden="true" {...props}>
    <path d="M50 4 C90 40 96 90 50 136 C4 90 10 40 50 4 Z" fill="currentColor" />
    <path d="M50 20 V128 M50 60 L30 44 M50 84 L72 62 M50 104 L32 90" stroke="rgba(255,255,255,.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

export const Spark = props => (
  <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
    <path d="M50 0 C54 34 66 46 100 50 C66 54 54 66 50 100 C46 66 34 54 0 50 C34 46 46 34 50 0Z" fill="currentColor" />
  </svg>
)

export const Squiggle = props => (
  <svg viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M6 20 C24 0 40 0 56 20 S88 40 104 20 S136 0 152 20 S184 40 194 20" />
  </svg>
)

export const Bell = props => (
  <svg viewBox="0 0 80 100" aria-hidden="true" {...props}>
    <path d="M40 6 C16 6 12 30 12 52 C12 66 6 72 4 80 H76 C74 72 68 66 68 52 C68 30 64 6 40 6Z" fill="currentColor" />
    <circle cx="40" cy="88" r="9" fill="currentColor" />
    <path d="M26 24 C22 32 21 42 22 52" stroke="rgba(255,255,255,.55)" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
)

/* ---------- photo from /public/images/ (falls back to a soft colour block) ---------- */
export function Photo({ src, alt = '', className = '', ...rest }) {
  return <img className={`gp-img ${className}`} src={src} alt={alt} loading="lazy" decoding="async" {...rest} />
}

export const Hoof = props => (
  <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
    <path d="M30 14 C44 10 48 30 46 52 C44 70 26 78 16 66 C8 54 12 20 30 14Z" fill="currentColor" />
    <path d="M70 14 C56 10 52 30 54 52 C56 70 74 78 84 66 C92 54 88 20 70 14Z" fill="currentColor" />
  </svg>
)

/* ---------- creative photo shapes (SVG clip paths, defined once) ---------- */
const N = 220
const poly = fn => Array.from({ length: N }, (_, i) => {
  const t = (i / N) * Math.PI * 2
  const r = fn(t)
  return `${i ? 'L' : 'M'}${(0.5 + r * Math.cos(t)).toFixed(4)} ${(0.5 + r * Math.sin(t)).toFixed(4)}`
}).join('') + 'Z'
const rnd = k => Math.abs(Math.sin(k * 12.9898) * 43758.5453) % 1
function torn() {
  const pts = []
  const steps = 26
  for (let i = 0; i <= steps; i++) pts.push([i / steps, 0.012 + rnd(i + 1) * 0.035])
  for (let i = 1; i <= steps; i++) pts.push([0.985 - rnd(i + 40) * 0.035, i / steps])
  for (let i = 1; i <= steps; i++) pts.push([1 - i / steps, 0.988 - rnd(i + 80) * 0.035])
  for (let i = 1; i < steps; i++) pts.push([0.012 + rnd(i + 120) * 0.035, 1 - i / steps])
  return pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(4)} ${y.toFixed(4)}`).join('') + 'Z'
}
function wave() {
  const pts = [[0.04, 0], [0.96, 0]]
  for (let i = 0; i <= 40; i++) { const y = i / 40; pts.push([0.97 - 0.03 * Math.sin(y * Math.PI * 7), y]) }
  pts.push([0.96, 1], [0.04, 1])
  for (let i = 40; i >= 0; i--) { const y = i / 40; pts.push([0.03 + 0.03 * Math.sin(y * Math.PI * 7), y]) }
  return pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(4)} ${y.toFixed(4)}`).join('') + 'Z'
}
const SHAPES = {
  flower: poly(t => 0.43 + 0.055 * Math.cos(9 * t)),
  blob: poly(t => 0.41 + 0.05 * Math.cos(2 * t + 1) + 0.04 * Math.cos(3 * t) + 0.025 * Math.cos(5 * t + 2)),
  blobb: poly(t => 0.42 + 0.06 * Math.cos(2 * t + 3) + 0.035 * Math.cos(4 * t + 1) + 0.02 * Math.cos(6 * t)),
  seal: poly(t => 0.45 + 0.04 * Math.sign(Math.sin(14 * t)) * 0.7 + 0.02 * Math.sin(14 * t)),
  torn: torn(),
  wave: wave(),
}

export function Shapes() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(SHAPES).map(([k, d]) => (
          <clipPath key={k} id={`gs-clip-${k}`} clipPathUnits="objectBoundingBox"><path d={d} /></clipPath>
        ))}
      </defs>
    </svg>
  )
}

/* Rectangle / square photo frame.  shape = 'portrait' | 'square' | 'landscape' | 'tall'
   Photo kisi bhi size ki ho, frame mein apne aap crop ho jaati hai. */
export function ShapePhoto({ src, alt = '', shape = 'landscape', color = '#f6a935', className = '', style, children }) {
  const [ok, setOk] = useState(true)
  return (
    <figure className={`gp-sp gp-sp-${shape} ${className}`} style={{ '--sc': color, ...style }}>
      <span className="gp-sp-back" aria-hidden="true" />
      <span className="gp-sp-clip">
        {ok ? <Photo src={src} alt={alt} onError={() => setOk(false)} /> : <span className="gp-sp-empty"><ImagePlus size={26} /><small>Add photo</small></span>}
      </span>
      {children}
    </figure>
  )
}

/* ---------- dark-brown hero used by every inner page (centred banner) ---------- */
export function PageHero({ kicker, title, lead, children }) {
  return (
    <section className="gp-hero" data-prog aria-labelledby="gp-title">
      <div className="gp-floaters" aria-hidden="true">
        <Flower className="f f1" />
        <Leaf className="f f2" />
        <Spark className="f f3" />
        <Heart className="f f4" fill="currentColor" />
        <Spark className="f f5" />
        <Leaf className="f f6" />
        <Flower className="f f7" />
        <Hoof className="hf h1" /><Hoof className="hf h2" /><Hoof className="hf h3" /><Hoof className="hf h4" /><Hoof className="hf h5" />
        <Leaf className="side side-r" />
        <Flower className="side side-l" />
      </div>

      <div className="gp-hero-inner">
        <nav className="gp-crumbs" aria-label="Breadcrumb" data-anim="up">
          <Link to="/"><ArrowLeft size={15} /> Home</Link>
          <span>/</span>
          <b>{kicker}</b>
        </nav>
        <h1 id="gp-title"><Split text={title} /></h1>
        <Squiggle className="gp-squig" />
        {lead && <p className="gp-lead" data-anim="up" style={{ '--d': '600ms' }}>{lead}</p>}
        {children && <div className="gp-hero-cta" data-anim="up" style={{ '--d': '760ms' }}>{children}</div>}
      </div>

      <svg className="gp-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C120 90 240 90 360 50 S600 -10 720 30 S960 90 1080 60 S1320 0 1440 40 V90 H0Z" />
      </svg>
    </section>
  )
}

/* ---------- closing call-to-action band ---------- */
export function CtaBand({ title, text, primary, secondary }) {
  return (
    <section className="gp-cta" aria-label="Call to action">
      <Flower className="gp-cta-flower" />
      <div className="gp-cta-inner" data-anim="up">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="gp-cta-row">
          {primary && <Link to={primary.to} className="gs-btn gs-btn-sun" data-magnet><Heart size={17} fill="currentColor" /> {primary.label}</Link>}
          {secondary && <Link to={secondary.to} className="gs-btn gs-btn-ghost">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  )
}
