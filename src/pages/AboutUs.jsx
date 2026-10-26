import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Check, CheckCircle2, Droplets, Eye, Heart, HeartHandshake, Landmark,
  ShieldCheck, Sparkles, Stethoscope, UsersRound, Warehouse, Wheat,
} from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import './about-page.css'

const LOGO = '/images/gausevarth.logo.jpeg'

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
    officialName, incorporatedOn, incorporationYear, organisationType, governingLaw, cin,
    section8LicenceNumber, registeredRecordLocation, legalClarification,
    missionStatement, visionStatement, values, milestones, founders,
  } = foundationContent

  const place = registeredRecordLocation.replace(' - ', ', ')

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
      {/* ───────── 1. HERO ───────── */}
      <header className="ab-hero" aria-labelledby="ab-title">
        <Sparkles className="ab-spark" size={26} style={{ left: '7%', top: '30%', '--d': '0s' }} aria-hidden="true" />
        <Sparkles className="ab-spark" size={18} style={{ left: '46%', top: '16%', '--d': '1.2s' }} aria-hidden="true" />
        <Sparkles className="ab-spark" size={30} style={{ right: '6%', top: '22%', '--d': '2.1s' }} aria-hidden="true" />
        <Sparkles className="ab-spark" size={20} style={{ right: '38%', bottom: '24%', '--d': '.7s' }} aria-hidden="true" />

        <div className="ab-wrap">
          <nav className="ab-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About Us</span>
          </nav>

          <div className="ab-hero-grid">
            <div>
              <span className="ab-kicker">About the Foundation</span>
              <h1 id="ab-title">
                <span className="ab-line"><span style={{ '--d': '150ms' }}>Seva.</span></span>
                <span className="ab-line"><span className="ab-gold" style={{ '--d': '320ms' }}>Sanrakshan.</span></span>
                <span className="ab-line"><span style={{ '--d': '490ms' }}>Jeev Daya.</span></span>
              </h1>
              <p className="ab-hero-lead" data-r style={{ '--d': '700ms' }}>
                {officialName} is a {organisationType} under the {governingLaw}. We care for cows with three simple promises:
                service, protection and compassion.
              </p>
              <ul className="ab-facts">
                <li data-r="zoom" style={{ '--d': '850ms' }}><b>{incorporationYear}</b><span>Incorporated</span></li>
                <li data-r="zoom" style={{ '--d': '960ms' }}><b>{organisationType}</b><span>Type</span></li>
                <li data-r="zoom" style={{ '--d': '1070ms' }}><b>{place}</b><span>Based in</span></li>
              </ul>
            </div>

            <div className="ab-seal" data-r="zoom" style={{ '--d': '300ms' }}>
              <svg className="ab-seal-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id="ab-seal-path" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" /></defs>
                <text><textPath href="#ab-seal-path" textLength="530" lengthAdjust="spacing">GAU SEVARTH · SEVA · SANRAKSHAN · JEEV DAYA · GAU SEVARTH ·</textPath></text>
              </svg>
              <div className="ab-orbit" aria-hidden="true"><i /><i /><i /></div>
              <div className="ab-seal-core"><img src={LOGO} alt={`${officialName} official logo`} /></div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── 2. OUR VISION ───────── */}
      <section className="ab-vision ab-paper" aria-labelledby="vision-title">
        <HeartLoop className="ab-doodle ab-d-heart" />
        <Leaf className="ab-doodle ab-d-leaf" />
        <div className="ab-wrap ab-vision-grid">
          <div className="ab-vision-copy">
            <div className="ab-tag" data-r><span className="ab-tag-ico"><Eye size={24} /></span><b>Our Vision</b></div>
            <h2 className="ab-h2" id="vision-title" data-r style={{ '--d': '100ms' }}>A safe place and a <em>kinder tomorrow</em> for every cow.</h2>
            <p data-r style={{ '--d': '200ms' }}>{visionStatement}</p>
            <p data-r style={{ '--d': '300ms' }}>
              At Gau Sevarth we believe care begins with the basics: fresh fodder, clean water, a patch of shade and a hand that is never in a hurry.
            </p>
          </div>

          <div className="ab-vision-media" data-r="right" data-par style={{ '--spd': 26 }}>
            <Blob shape={1} src={IMAGES.vision} alt="A cow resting peacefully" back="var(--ab-gold-soft)" />
            <Balloon className="ab-balloon" />
          </div>
        </div>
      </section>

      {/* ───────── 3. WHO WE ARE ───────── */}
      <section className="ab-who" aria-labelledby="who-title">
        <div className="ab-wrap ab-who-grid">
          <div className="ab-who-media" data-r="left">
            <div data-par style={{ '--spd': 18 }}>
              <Blob className="big" shape={2} src={IMAGES.who} alt="Cows at the Foundation" back="var(--ab-mint)" />
            </div>
            <div data-par style={{ '--spd': 44 }} className="ab-who-small-wrap">
              <Blob className="small" shape={3} src={IMAGES.whoSmall} alt="A calf being cared for" back="var(--ab-coral)" caption="Daily care" />
            </div>
          </div>

          <div className="ab-who-copy">
            <div className="ab-tag" data-r><span className="ab-tag-ico"><Heart size={24} fill="currentColor" /></span><b>Who We Are</b></div>
            <h2 className="ab-h2" id="who-title" data-r style={{ '--d': '100ms' }}>We are Gau Sevarth, <em>a family</em> for the herd.</h2>
            <ul className="ab-checks">
              {whoItems.map((item, i) => (
                <li key={item.title} data-r style={{ '--d': `${200 + i * 140}ms` }}>
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

      {/* ───────── 4. OUR MISSION ───────── */}
      <section className="ab-mission" aria-labelledby="mission-title">
        <Leaf className="ab-doodle ab-m-leaf" />
        <HeartLoop className="ab-doodle ab-m-heart" />
        <div className="ab-wrap">
          <div className="ab-tag" data-r><span className="ab-tag-ico"><HeartHandshake size={24} /></span><b>Our Mission</b></div>
          <h2 className="ab-h2" id="mission-title" data-r style={{ '--d': '100ms' }}>Guided by <em>seva</em>, every single day.</h2>
          <p className="ab-mission-text" data-r style={{ '--d': '200ms' }}>{missionStatement}</p>

          <div className="ab-cards">
            {missionCards.map(({ icon: Icon, title, text }, i) => (
              <article className="ab-card" key={title} data-r="up" style={{ '--d': `${i * 130}ms` }}>
                <span className="ab-card-ico"><Icon size={30} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. VALUES (stickers) ───────── */}
      <section className="ab-values ab-paper" aria-labelledby="values-title">
        <div className="ab-wrap">
          <div className="ab-values-head">
            <div className="ab-tag" data-r><span className="ab-tag-ico"><ShieldCheck size={24} /></span><b>Our Values</b></div>
            <h2 className="ab-h2" id="values-title" data-r style={{ '--d': '100ms' }}>How we <em>show up</em>.</h2>
            <p data-r style={{ '--d': '200ms' }}>The principles that guide how we speak, act and care.</p>
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

      {/* ───────── 6. THE HERD (collage) ───────── */}
      <section className="ab-herd ab-paper" aria-labelledby="herd-title">
        <div className="ab-wrap">
          <div className="ab-herd-head">
            <div className="ab-tag" data-r><span className="ab-tag-ico"><Heart size={24} fill="currentColor" /></span><b>The Herd</b></div>
            <h2 className="ab-h2" id="herd-title" data-r style={{ '--d': '100ms' }}>Every cow has a <em>name</em> and a place to rest.</h2>
            <p data-r style={{ '--d': '200ms' }}>A few moments from the Foundation&apos;s care.</p>
          </div>

          <div className="ab-collage">
            {IMAGES.herd.map((src, i) => (
              <div key={src} data-r="zoom" data-par style={{ '--d': `${i * 150}ms`, '--spd': [20, 34, 14][i] }}>
                <Blob
                  shape={[4, 5, 1][i]}
                  src={src}
                  alt={HERD_CAPTIONS[i]}
                  caption={HERD_CAPTIONS[i]}
                  back={['var(--ab-lilac)', 'var(--ab-gold-soft)', 'var(--ab-mint)'][i]}
                  style={{ '--bd': `${-i * 2}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. JOURNEY ───────── */}
      <section className="ab-journey" aria-labelledby="journey-title">
        <div className="ab-wrap">
          <div className="ab-journey-head">
            <div className="ab-tag" data-r><span className="ab-tag-ico"><Sparkles size={24} /></span><b>Our Journey</b></div>
            <h2 className="ab-h2" id="journey-title" data-r style={{ '--d': '100ms' }}>A record of <em>verified</em> milestones.</h2>
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

      {/* ───────── 8. FOUNDERS ───────── */}
      {founders?.length > 0 && (
        <section className="ab-founders ab-paper" aria-labelledby="founders-title">
          <div className="ab-wrap">
            <div className="ab-founders-head">
              <div className="ab-tag" data-r><span className="ab-tag-ico"><UsersRound size={24} /></span><b>Our Founders</b></div>
              <h2 className="ab-h2" id="founders-title" data-r style={{ '--d': '100ms' }}>The people behind the <em>seva</em>.</h2>
              <p data-r style={{ '--d': '200ms' }}>It began with two people and one simple belief: no cow should go without care.</p>
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

      {/* ───────── 9. LEGAL ───────── */}
      <section className="ab-legal" aria-labelledby="legal-title">
        <div className="ab-wrap ab-legal-grid">
          <div>
            <div className="ab-tag" data-r><span className="ab-tag-ico"><Landmark size={24} /></span><b>Transparency</b></div>
            <h2 className="ab-h2" id="legal-title" data-r style={{ '--d': '100ms' }}>Details you can <em>verify</em>.</h2>
            <p className="ab-legal-note" data-r style={{ '--d': '200ms' }}>{legalClarification}</p>
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

      {/* ───────── 10. CTA ───────── */}
      <section className="ab-cta" aria-labelledby="cta-title">
        <Heart className="ab-cta-heart h1" size={64} fill="currentColor" aria-hidden="true" />
        <Heart className="ab-cta-heart h2" size={90} fill="currentColor" aria-hidden="true" />
        <div className="ab-wrap">
          <h2 id="cta-title" data-r="zoom">Be part of the <em style={{ fontStyle: 'italic' }}>herd&apos;s</em> story.</h2>
          <p data-r style={{ '--d': '150ms' }}>Every rupee and every kind word goes towards the daily care of the cows.</p>
          <div className="ab-cta-row" data-r style={{ '--d': '300ms' }}>
            <Link to="/donate" className="ab-btn ab-btn-solid"><Heart size={18} fill="currentColor" /> Donate now</Link>
            <Link to="/#gallery" className="ab-btn ab-btn-line">Meet the herd <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}