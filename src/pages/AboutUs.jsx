import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Check, CheckCircle2, Droplets, Eye, Heart, HeartHandshake, Landmark,
  ShieldCheck, Sparkles, Stethoscope, UsersRound, Warehouse, Wheat,
} from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import './about-page.css'

/* ==========================================================
   PHOTOS — yahan apni images ke address daalo
   Files ko  public/images/  mein rakho.
   Jab tak file nahi milti, us jagah "Add photo" ka box dikhega.
   ========================================================== */
const IMAGES = {
  vision: '/images/about-vision.jpg',      // Our Vision ke saath badi photo
  who: '/images/about-who-1.jpg',          // Who we are — badi photo
  whoSmall: '/images/about-who-2.jpg',     // Who we are — chhoti photo
  herd: [
    '/images/about-herd-1.jpg',
    '/images/about-herd-2.jpg',
    '/images/about-herd-3.jpg',
  ],
}

const HERD_CAPTIONS = ['Quiet mornings', 'Fresh fodder, every day', 'Little ones, big eyes']

const whoItems = [
  {
    title: 'Our Purpose',
    text: 'We exist to give cows daily care: fresh fodder, clean water and a shaded place to rest. This quiet, everyday work is what everything else stands on.',
  },
  {
    title: 'Our Commitment',
    text: 'Cows that are weak, injured or left without anyone to look after them deserve a safe shelter and proper treatment. That is the promise we hold ourselves to.',
  },
  {
    title: 'Dedicated Care',
    text: 'We look after calves and cows with the patience and dignity we would want for family, every day of the year.',
  },
  {
    title: 'Open & Accountable',
    text: 'Our legal details are shared openly. Scroll down to verify our registration, and see clearly what is confirmed and what is still pending.',
  },
]

const missionCards = [
  { icon: Wheat, title: 'Fodder', text: 'Green and dry feed for the herd, every day of the year.' },
  { icon: Droplets, title: 'Clean water', text: 'Fresh drinking water, even through the Rajasthan summers.' },
  { icon: Stethoscope, title: 'Medical care', text: 'Treatment and medicines for sick and injured cows.' },
  { icon: Warehouse, title: 'Shelter', text: 'Shade, rest and protection from heat and cold.' },
]

const valueIcons = [ShieldCheck, HeartHandshake, CheckCircle2, UsersRound]

/* ---------- animated heading: every word rises out of a mask ----------
   parts = [{ t: 'plain words' }, { t: 'accent words', em: true }, ...]   */
function Split({ as: Tag = 'h2', parts, delay = '100ms', ...rest }) {
  let n = 0
  return (
    <Tag {...rest} data-r="words" style={{ '--d': delay }}>
      {parts.map((p, pi) => {
        const nodes = p.t.split(' ').map(word => {
          const i = n++
          return (
            <Fragment key={i}>
              <span className="ab-w"><span style={{ '--i': i }}>{word}</span></span>{' '}
            </Fragment>
          )
        })
        return p.em ? <em key={pi}>{nodes}</em> : <Fragment key={pi}>{nodes}</Fragment>
      })}
    </Tag>
  )
}

/* ---------- little doodles ---------- */

const HeartLoop = props => (
  <svg viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M60 52 C60 30 28 22 24 48 C20 74 52 86 60 100 C68 86 100 74 96 48 C92 22 60 30 60 52 Z" />
    <path d="M60 100 C48 118 30 126 14 138" />
  </svg>
)

const Leaf = props => (
  <svg viewBox="0 0 100 140" aria-hidden="true" {...props}>
    <path d="M50 4 C90 40 96 90 50 136 C4 90 10 40 50 4 Z" fill="currentColor" />
    <path d="M50 20 V128 M50 60 L30 44 M50 84 L72 62 M50 104 L32 90" stroke="rgba(255,255,255,.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

const Balloon = props => (
  <svg viewBox="0 0 90 150" aria-hidden="true" {...props}>
    <path d="M45 8 C30 -6 4 6 9 30 C14 50 36 58 45 70 C54 58 76 50 81 30 C86 6 60 -6 45 8Z" fill="#a4471f" />
    <path d="M24 18 C20 24 20 30 24 36" stroke="rgba(255,255,255,.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M45 70 L45 100" stroke="#5a3220" strokeWidth="2.5" />
    <rect x="26" y="100" width="38" height="34" rx="4" fill="#ffcf5c" />
    <path d="M26 111 H64 M45 100 V134" stroke="#d9823b" strokeWidth="3" />
  </svg>
)

/* ---------- photo in a torn-paper shape ---------- */

function Blob({ src, alt, shape = 1, back, className = '', caption, style }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className={`ab-blob ${className}`} style={{ ...(back ? { '--back': back } : null), ...style }}>
      <i className={`ab-blob-back ab-shape-${shape}`} aria-hidden="true" />
      <div className={`ab-blob-clip ab-shape-${shape}`}>
        {missing ? (
          <div className="ab-blob-missing"><span>Add photo</span><code>{src.split('/').pop()}</code></div>
        ) : (
          <img src={src} alt={alt} loading="lazy" onError={() => setMissing(true)} />
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/* ---------- page ---------- */

export default function AboutUs() {
  const root = useRef(null)
  const {
    officialName, incorporatedOn, organisationType, governingLaw, cin,
    section8LicenceNumber, registeredRecordLocation, legalClarification,
    missionStatement, visionStatement, values, milestones, founders,
  } = foundationContent

  // reveal on scroll + parallax
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const nodes = [...el.querySelectorAll('[data-r]')]
    let io
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('in'))
    } else {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          io.unobserve(e.target)
        })
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
      nodes.forEach(n => io.observe(n))
    }

    const pars = [...el.querySelectorAll('[data-par]')]
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      pars.forEach(p => {
        const r = p.getBoundingClientRect()
        const v = (r.top + r.height / 2 - vh / 2) / vh
        p.style.setProperty('--py', Math.max(-1, Math.min(1, v)).toFixed(3))
      })
    }
    const onScroll = () => { if (!raf && !reduce) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="ab" ref={root}>
      {/* ───────── 1. HERO (solid dark brown band, centered) ───────── */}
      <header className="ab-hero" aria-labelledby="ab-title">
        <Wheat className="ab-hero-deco ab-deco-left" aria-hidden="true" />
        <Leaf className="ab-hero-deco ab-deco-right" />

        <Heart className="ab-ghost" size={46} fill="currentColor" style={{ left: '28%', top: '46%' }} aria-hidden="true" />
        <Sparkles className="ab-ghost" size={40} fill="currentColor" style={{ right: '27%', top: '40%' }} aria-hidden="true" />
        <Droplets className="ab-ghost" size={44} fill="currentColor" style={{ left: '16%', bottom: '14%' }} aria-hidden="true" />
        <Heart className="ab-ghost" size={40} fill="currentColor" style={{ right: '12%', bottom: '12%' }} aria-hidden="true" />

        <div className="ab-wrap ab-hero-center">
          <span className="ab-pill" aria-current="page">About Us</span>
          <h1 id="ab-title">
            <span className="ab-line">
              <span>Seva. Sanrakshan. <span className="ab-accent">Jeev Daya.</span></span>
            </span>
          </h1>
        </div>
      </header>

      {/* ───────── 2. OUR VISION — ivory + antique gold ───────── */}
      <section className="ab-vision ab-paper" aria-labelledby="vision-title">
        <HeartLoop className="ab-doodle ab-d-heart" />
        <Leaf className="ab-doodle ab-d-leaf" />
        <div className="ab-wrap ab-vision-grid">
          <div className="ab-vision-copy">
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><Eye size={24} /></span><b>Our Vision</b></div>
            <Split id="vision-title" className="ab-h2" delay="100ms" parts={[{ t: 'A safe place and a' }, { t: 'kinder tomorrow', em: true }, { t: 'for every cow.' }]} />
            <p data-r="blur" style={{ '--d': '500ms' }}>{visionStatement}</p>
            <p data-r="blur" style={{ '--d': '700ms' }}>
              At Gau Sevarth we believe care begins with the basics: fresh fodder, clean water, a patch of shade and a hand that is never in a hurry.
            </p>
          </div>

          <div className="ab-vision-media" data-r="right" data-par style={{ '--spd': 26 }}>
            <Blob shape={1} src={IMAGES.vision} alt="A cow resting peacefully" back="var(--s-accent2)" />
            <Balloon className="ab-balloon" />
          </div>
        </div>
      </section>

      {/* ───────── 3. WHO WE ARE — deep emerald + champagne ───────── */}
      <section className="ab-who" aria-labelledby="who-title">
        <div className="ab-wrap ab-who-grid">
          <div className="ab-who-media" data-r="left">
            <div data-par style={{ '--spd': 18 }}>
              <Blob className="big" shape={2} src={IMAGES.who} alt="Cows at the Foundation" back="var(--s-accent2)" />
            </div>
            <div data-par style={{ '--spd': 44 }} className="ab-who-small-wrap">
              <Blob className="small" shape={3} src={IMAGES.whoSmall} alt="A calf being cared for" back="var(--s-accent)" caption="Daily care" />
            </div>
          </div>

          <div className="ab-who-copy">
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><Heart size={24} fill="currentColor" /></span><b>Who We Are</b></div>
            <Split id="who-title" className="ab-h2" delay="100ms" parts={[{ t: 'We are Gau Sevarth,' }, { t: 'a family', em: true }, { t: 'for the herd.' }]} />
            <ul className="ab-checks">
              {whoItems.map((item, i) => (
                <li key={item.title} data-r="blur" style={{ '--d': `${400 + i * 170}ms` }}>
                  <span className="ab-check-ico"><Check size={22} strokeWidth={3} /></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 4. OUR MISSION — blush rose + wine ───────── */}
      <section className="ab-mission ab-paper" aria-labelledby="mission-title">
        <Leaf className="ab-doodle ab-m-leaf" />
        <HeartLoop className="ab-doodle ab-m-heart" />
        <div className="ab-wrap">
          <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><HeartHandshake size={24} /></span><b>Our Mission</b></div>
          <Split id="mission-title" className="ab-h2" delay="100ms" parts={[{ t: 'Guided by' }, { t: 'seva,', em: true }, { t: 'every single day.' }]} />
          <p className="ab-mission-text" data-r="blur" style={{ '--d': '500ms' }}>{missionStatement}</p>

          <div className="ab-cards">
            {missionCards.map(({ icon: Icon, title, text }, i) => (
              <article className="ab-card" key={title} data-r="up" style={{ '--d': `${i * 140}ms` }}>
                <span className="ab-card-ico"><Icon size={30} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. VALUES — midnight navy + gold ───────── */}
      <section className="ab-values" aria-labelledby="values-title">
        <div className="ab-wrap">
          <div className="ab-values-head">
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><ShieldCheck size={24} /></span><b>Our Values</b></div>
            <Split id="values-title" className="ab-h2" delay="100ms" parts={[{ t: 'How we' }, { t: 'show up.', em: true }]} />
            <p data-r="blur" style={{ '--d': '500ms' }}>The principles that guide how we speak, act and care.</p>
          </div>
          <div className="ab-stickers">
            {values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <article className="ab-sticker" key={v.title} data-r="pop" style={{ '--d': `${i * 120}ms` }}>
                  <Icon size={30} aria-hidden="true" />
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────── 6. THE HERD — sage mist + forest ───────── */}
      <section className="ab-herd ab-paper" aria-labelledby="herd-title">
        <div className="ab-wrap">
          <div className="ab-herd-head">
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><Heart size={24} fill="currentColor" /></span><b>The Herd</b></div>
            <Split id="herd-title" className="ab-h2" delay="100ms" parts={[{ t: 'Every cow has a' }, { t: 'name', em: true }, { t: 'and a place to rest.' }]} />
            <p data-r="blur" style={{ '--d': '500ms' }}>A few moments from the Foundation&apos;s care.</p>
          </div>

          <div className="ab-collage">
            {IMAGES.herd.map((src, i) => (
              <div key={src} data-r="zoom" data-par style={{ '--d': `${i * 150}ms`, '--spd': [20, 34, 14][i] }}>
                <Blob
                  shape={[4, 5, 1][i]}
                  src={src}
                  alt={HERD_CAPTIONS[i]}
                  caption={HERD_CAPTIONS[i]}
                  back={['var(--s-accent2)', 'var(--s-accent)', 'var(--s-accent3)'][i]}
                  style={{ '--bd': `${-i * 2}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. JOURNEY — deep plum + rose gold ───────── */}
      <section className="ab-journey" aria-labelledby="journey-title">
        <div className="ab-wrap">
          <div className="ab-journey-head">
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><Sparkles size={24} /></span><b>Our Journey</b></div>
            <Split id="journey-title" className="ab-h2" delay="100ms" parts={[{ t: 'A record of' }, { t: 'verified', em: true }, { t: 'milestones.' }]} />
          </div>
          <div className="ab-tl-wrap">
            <span className="ab-tl-line" data-r aria-hidden="true" />
            <ol className="ab-tl">
              {milestones.map((m, i) => (
                <li key={`${m.date}-${m.title}`} data-r="left" style={{ '--d': `${i * 150}ms` }}>
                  <time>{m.date}</time>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </li>
              ))}
              <li className="pending" data-r="left" style={{ '--d': `${milestones.length * 150}ms` }}>
                <time>Next chapter</time>
                <h3>Future milestones</h3>
                <p>Additional entries will be added after the Foundation verifies and approves them.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── 8. FOUNDERS — champagne + copper ───────── */}
      {founders?.length > 0 && (
        <section className="ab-founders ab-paper" aria-labelledby="founders-title">
          <div className="ab-wrap">
            <div className="ab-founders-head">
              <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><UsersRound size={24} /></span><b>Our Founders</b></div>
              <Split id="founders-title" className="ab-h2" delay="100ms" parts={[{ t: 'The people behind the' }, { t: 'seva.', em: true }]} />
              <p data-r="blur" style={{ '--d': '500ms' }}>It began with two people and one simple belief: no cow should go without care.</p>
            </div>
            <div className="ab-founder-row">
              {founders.map((f, i) => (
                <article className="ab-founder" key={f.image} data-r="up" style={{ '--d': `${i * 180}ms` }}>
                  <div className="ab-arch"><img src={f.image} alt={f.imageAlt} loading="lazy" /></div>
                  <h3>{f.name || `Founder ${i + 1}`}</h3>
                  <span>{f.role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── 9. LEGAL — deep teal + aqua ───────── */}
      <section className="ab-legal" aria-labelledby="legal-title">
        <div className="ab-wrap ab-legal-grid">
          <div>
            <div className="ab-tag" data-r="left"><span className="ab-tag-ico"><Landmark size={24} /></span><b>Transparency</b></div>
            <Split id="legal-title" className="ab-h2" delay="100ms" parts={[{ t: 'Details you can' }, { t: 'verify.', em: true }]} />
            <p className="ab-legal-note" data-r="blur" style={{ '--d': '500ms' }}>{legalClarification}</p>
          </div>
          <dl className="ab-legal-list" data-r="right">
            <div><dt>Official name</dt><dd>{officialName}</dd></div>
            <div><dt>Company type</dt><dd>{organisationType} under the {governingLaw}</dd></div>
            <div><dt>Incorporation date</dt><dd>{incorporatedOn}</dd></div>
            <div><dt>CIN</dt><dd>{cin}</dd></div>
            <div><dt>Section 8 licence</dt><dd>{section8LicenceNumber}</dd></div>
            <div><dt>Registered location</dt><dd>{registeredRecordLocation}</dd></div>
          </dl>
        </div>
      </section>

      
    </div>
  )
}   