import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Droplets, Heart, Mail, MapPin, Phone,
  Play, Stethoscope, Wheat, Warehouse,
} from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import './gs-update.css'
import './gs-donate.css'

const LOGO = '/images/gausevarth.logo.jpeg'
const DONATE_QR = '/images/donate-qr.png'

/* ==========================================================
   ABOUT VIDEO — yahan apni video set karo
   • Apni file:  src: '/videos/about.mp4'   (public/videos/about.mp4 mein rakho)
   • YouTube:    youtubeId: 'XXXXXXXXXXX'   (link ka v= ke baad wala part)
   • poster:     '/images/about-poster.jpg' (khali chhodoge to cow photo ka crop dikhega)
   Dono khali hain to "Video coming soon" dikhega.
   ========================================================== */
const ABOUT_VIDEO = {
  src: '',
  youtubeId: '',
  poster: '',
  title: 'Our story',
}

/* ---------- small helpers ---------- */

// Splits a headline into words -> letters so every letter can animate in on its own.
function Split({ text, as: Tag = 'span', className = '', start = 0 }) {
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

// A cropped / zoomed window into the one cow photograph, so every section shows a different "image".
// cx, cy = centre of the window (0-1 of the photo); f = window width as a fraction of the photo;
// ar = approximate width/height of the frame it is shown in.
const PHOTO_RATIO = 1890 / 832
const pct = v => Math.min(100, Math.max(0, v * 100))
function Crop({ cx = .5, cy = .5, f = .3, ar = 1, className = '', label = '' }) {
  const w = Math.min(f, ar / PHOTO_RATIO)
  const h = Math.min(1, (w * PHOTO_RATIO) / ar)
  const style = {
    '--bs': `${100 / w}%`,
    '--bx': `${w >= 1 ? 0 : pct((cx - w / 2) / (1 - w))}%`,
    '--by': `${h >= 1 ? 0 : pct((cy - h / 2) / (1 - h))}%`,
  }
  return (
    <div className={`gs-crop ${className}`} style={style} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : 'true'}>
      <i />
    </div>
  )
}

function Marquee({ items, reverse = false, className = '' }) {
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

// Number that counts up when it scrolls into view.
function CountUp({ to, from, duration = 1400 }) {
  const target = Number(to)
  const ok = Number.isFinite(target)
  const start = Number.isFinite(from) ? from : Math.max(0, target - 24)
  const ref = useRef(null)
  const [val, setVal] = useState(ok ? target : 0)

  useEffect(() => {
    if (!ok) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return undefined
    setVal(start)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = now => {
        const k = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - k, 3)
        setVal(Math.round(start + (target - start) * eased))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    if (ref.current) io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [ok, start, target, duration])

  return <span ref={ref}>{ok ? val : to}</span>
}

/* ---------- About video ---------- */

function VideoStory({ video }) {
  const [playing, setPlaying] = useState(false)
  const ready = Boolean(video.src || video.youtubeId)

  return (
    <div className="gs-vframe" data-tilt>
      <div className={`gs-vscreen ${playing ? '' : 'is-idle'}`}>
        {playing ? (
          video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video src={video.src} poster={video.poster || undefined} controls autoPlay playsInline />
          )
        ) : (
          <>
            {video.poster
              ? <img className="gs-vposter" src={video.poster} alt="" />
              : <Crop cx={.5} cy={.45} f={.55} ar={1.6} />}
            <button
              type="button"
              className="gs-play"
              onClick={() => ready && setPlaying(true)}
              aria-label={ready ? `Play video: ${video.title}` : 'Video coming soon'}
              aria-disabled={!ready}
            >
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id="gs-watch" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text><textPath href="#gs-watch" textLength="478" lengthAdjust="spacing">WATCH · OUR · STORY · WATCH · OUR · STORY ·</textPath></text>
              </svg>
              <Play size={34} fill="currentColor" />
            </button>
            <span className="gs-vtag">{video.title}</span>
            {!ready && <span className="gs-vsoon">Video coming soon</span>}
          </>
        )}
      </div>
    </div>
  )
}

const pillars = [
  {
    no: '01', key: 'seva', word: 'Seva', hindi: 'Service',
    text: 'Fresh fodder, clean water and a shaded place to rest. Daily care is the quiet work that everything else stands on.',
    crop: { cx: .2, cy: .4, f: .4, ar: 1.2 },
  },
  {
    no: '02', key: 'sanrakshan', word: 'Sanrakshan', hindi: 'Protection',
    text: 'A safe shelter and proper treatment for cows that are weak, injured or left without anyone to look after them.',
    crop: { cx: .68, cy: .25, f: .32, ar: 1.2 },
  },
  {
    no: '03', key: 'jeev', word: 'Jeev Daya', hindi: 'Compassion',
    text: 'Every living being deserves kindness. We care for calves and cows with the patience and dignity we would want for family.',
    crop: { cx: .9, cy: .7, f: .3, ar: 1.2 },
  },
]

const herd = [
  { cls: 'tall', ar: .62, cx: .15, cy: .4, f: .26, cap: 'She was here first' },
  { cls: 'wide', ar: 1.6, cx: .34, cy: .42, f: .3, cap: 'Little one, big eyes' },
  { cls: 'round', ar: 1, cx: .67, cy: .2, f: .2, cap: 'Our gentle giant' },
  { cls: 'square', ar: 1, cx: .93, cy: .45, f: .26, cap: 'Curious as ever' },
  { cls: 'arch', ar: .7, cx: .73, cy: .57, f: .17, cap: 'Fresh milk, fresh blessings' },
  { cls: 'wide', ar: 1.6, cx: .9, cy: .82, f: .26, cap: 'Nap time' },
  { cls: 'tall', ar: .62, cx: .09, cy: .85, f: .22, cap: 'Fodder for the day' },
]

const uses = [
  { icon: Wheat, title: 'Fodder', text: 'Green and dry feed, every day of the year.' },
  { icon: Droplets, title: 'Clean water', text: 'Fresh drinking water through the Rajasthan summers.' },
  { icon: Stethoscope, title: 'Medical care', text: 'Treatment and medicines for sick and injured cows.' },
  { icon: Warehouse, title: 'Shelter', text: 'Shade, rest and protection from heat and cold.' },
]

/* ---------- donate card (QR preview -> /donate page) ---------- */

function DonateQrCard() {
  return (
    <div className="gs-give-card gs-give-qr" data-anim="right">
      <p className="gs-give-label">Donate by QR code</p>
      <img
  src="/images/gausevath ngo qr.jpeg"
  alt="Gausevarth NGO Donation UPI QR Code"
  loading="lazy"
/>
      <p>Scan with any UPI app, or open the donate page for the QR and full bank details.</p>
      <Link to="/donate" className="gs-give-btn">
        <Heart size={18} fill="currentColor" />
        <span>Donate now</span>
      </Link>
      <small className="gs-give-fine">Donations are voluntary. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.</small>
    </div>
  )
}

/* ---------- page ---------- */

export default function Home() {
  const root = useRef(null)
  const {
    officialName, incorporatedOn, incorporationYear, organisationType, governingLaw,
    cin, section8LicenceNumber, registeredRecordLocation, legalClarification,
    founders, contact, missionStatement, aboutVideo,
  } = foundationContent

  const video = { ...ABOUT_VIDEO, ...(aboutVideo || {}) }
  const place = registeredRecordLocation.replace(' - ', ', ')

  // reveal-on-scroll + scroll-linked variables
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const targets = [...el.querySelectorAll('[data-anim]')]
    let io
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in'))
    } else {
      // clip-path animated elements start fully clipped, so watch their parent instead
      const watch = new Map()
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const t = watch.get(e.target)
          t.classList.add('in')
          io.unobserve(e.target)
        })
      }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' })
      targets.forEach(t => {
        const node = t.dataset.anim === 'clip' ? t.parentElement : t
        watch.set(node, t)
        io.observe(node)
      })
    }

    const progs = [...el.querySelectorAll('[data-prog]')]
    const stickies = [...el.querySelectorAll('[data-sticky]')]
    const pillarEls = [...el.querySelectorAll('.gs-pillar')]
    const bar = el.querySelector('.gs-progress i')
    let raf = 0
    const clamp = v => Math.min(1, Math.max(0, v))

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      progs.forEach(s => {
        const r = s.getBoundingClientRect()
        s.style.setProperty('--p', clamp((vh - r.top) / (vh + r.height)).toFixed(4))
      })
      stickies.forEach(s => {
        const r = s.getBoundingClientRect()
        const sp = clamp(-r.top / Math.max(1, r.height - vh))
        s.style.setProperty('--sp', sp.toFixed(4))
        const track = s.querySelector('[data-track]')
        if (track && !reduce) {
          const max = Math.max(0, track.scrollWidth - window.innerWidth)
          track.style.transform = `translate3d(${(-sp * max).toFixed(1)}px,0,0)`
        }
      })
      // stacking cards: earlier cards shrink + dim as the next one slides over them
      if (!reduce) {
        pillarEls.forEach((p, i) => {
          const next = pillarEls[i + 1]
          if (!next) return
          const top = parseFloat(getComputedStyle(p).top) || 0
          const d = clamp((next.getBoundingClientRect().top - top) / Math.max(1, p.offsetHeight))
          p.style.setProperty('--s', (0.94 + 0.06 * d).toFixed(4))
          p.style.setProperty('--b', (0.8 + 0.2 * d).toFixed(3))
        })
      }
      if (bar) {
        const h = document.documentElement
        bar.style.transform = `scaleX(${clamp(window.scrollY / Math.max(1, h.scrollHeight - vh)).toFixed(4)})`
      }
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
  }, [])

  // pointer effects (desktop only): hero parallax, 3D tilt on the video, magnetic buttons
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    const undo = []
    const on = (node, type, fn) => { node.addEventListener(type, fn); undo.push(() => node.removeEventListener(type, fn)) }

    const hero = el.querySelector('.gs-hero')
    if (hero) {
      let raf = 0
      on(hero, 'pointermove', e => {
        if (raf) return
        const { clientX, clientY } = e
        raf = requestAnimationFrame(() => {
          raf = 0
          const r = hero.getBoundingClientRect()
          hero.style.setProperty('--hx', ((clientX - r.left) / r.width - .5).toFixed(3))
          hero.style.setProperty('--hy', ((clientY - r.top) / r.height - .5).toFixed(3))
        })
      })
      on(hero, 'pointerleave', () => { hero.style.setProperty('--hx', '0'); hero.style.setProperty('--hy', '0') })
      undo.push(() => cancelAnimationFrame(raf))
    }

    el.querySelectorAll('[data-tilt]').forEach(t => {
      on(t, 'pointermove', e => {
        const r = t.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - .5
        const y = (e.clientY - r.top) / r.height - .5
        t.style.setProperty('--rx', `${(-y * 9).toFixed(2)}deg`)
        t.style.setProperty('--ry', `${(x * 11).toFixed(2)}deg`)
      })
      on(t, 'pointerleave', () => { t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg') })
    })

    el.querySelectorAll('[data-magnet]').forEach(b => {
      on(b, 'pointermove', e => {
        const r = b.getBoundingClientRect()
        b.style.setProperty('--mx', `${((e.clientX - (r.left + r.width / 2)) * .22).toFixed(1)}px`)
        b.style.setProperty('--my', `${((e.clientY - (r.top + r.height / 2)) * .3).toFixed(1)}px`)
      })
      on(b, 'pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px') })
    })

    return () => undo.forEach(fn => fn())
  }, [])

  return (
    <div ref={root} className="gs">
      <div className="gs-progress" aria-hidden="true"><i /></div>

      {/* 1 ─ HERO · chocolate + marigold */}
      <section id="top" className="gs-hero" data-prog aria-labelledby="hero-title">
        <div className="gs-hero-bg" aria-hidden="true" />
        <div className="gs-hero-shade" aria-hidden="true" />
        <div className="gs-hero-inner">
          <h1 id="hero-title" className="gs-hero-title">
            <Split text="Happy cows," />
            <Split text="healthy" className="gs-outline" start={12} />
            <Split text="tomorrow." start={20} />
          </h1>
          <p className="gs-hero-lead" data-anim="up" style={{ '--d': '700ms' }}>
            Compassionate care today, for a kinder world tomorrow. Every cow here has a name, a place to rest and someone who cares.
          </p>
          <div className="gs-hero-cta" data-anim="up" style={{ '--d': '850ms' }}>
            <Link to="/donate" className="gs-btn gs-btn-sun" data-magnet><Heart size={17} fill="currentColor" /> Donate now</Link>
            <a href="#herd" className="gs-btn gs-btn-ghost" data-magnet>Meet the herd </a>
          </div>
        </div>

        <div className="gs-seal" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs><path id="gs-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
            <text><textPath href="#gs-circle" startOffset="0">SEVA · SANRAKSHAN · JEEV DAYA · SEVA · SANRAKSHAN · JEEV DAYA ·</textPath></text>
          </svg>
          <img src={LOGO} alt="" />
        </div>
      </section>

      <Marquee className="gs-m-sun" items={['Seva', 'Sanrakshan', 'Jeev Daya', 'Gau Sevarth']} />

      {/* 2 ─ ABOUT · deep teal + mint + saffron + coral, with video */}
      <section id="about" className="gs-story" data-prog aria-labelledby="about-title">
        <div className="gs-story-blobs" aria-hidden="true">
          <i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" />
        </div>

        <header className="gs-story-head">
          <span className="gs-kicker" data-anim="up">About us</span>
          <h2 id="about-title">
            <Split text="Where every cow" />
            <Split text="is family." className="gs-hl" start={13} />
          </h2>
        </header>

        <div className="gs-story-grid">
          <div className="gs-story-media" data-anim="up" style={{ '--d': '100ms' }}>
            <div className="gs-vstack">
              <i className="l1" aria-hidden="true" />
              <i className="l2" aria-hidden="true" />
              <VideoStory video={video} />
            </div>
            <ul className="gs-facts">
              <li data-anim="zoom" style={{ '--d': '300ms' }}><b><CountUp to={incorporationYear} /></b><span>Incorporated</span></li>
              <li data-anim="zoom" style={{ '--d': '420ms' }}><b>{organisationType}</b><span>Type</span></li>
              <li data-anim="zoom" style={{ '--d': '540ms' }}><b>{place}</b><span>Based in</span></li>
            </ul>
          </div>

          <div className="gs-story-card" data-anim="right" style={{ '--d': '200ms' }}>
            <span className="gs-kicker">Our story</span>
            <p>
              <strong>{officialName}</strong> is a {organisationType} under the {governingLaw}, incorporated on {incorporatedOn} and based in {place}.
            </p>
            <p>{missionStatement}</p>
            <blockquote>Seva, Sanrakshan aur Jeev Daya<small>Service, protection and compassion for every living being.</small></blockquote>
            <Link to="/about" className="gs-link">Read our story <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* 3 ─ PILLARS · stacking cards, each its own palette */}
      <section id="initiatives" className="gs-pillars" aria-labelledby="pillars-title">
        <header className="gs-pillars-head">
          <span className="gs-kicker" data-anim="up">What we stand for</span>
          <h2 id="pillars-title"><Split text="Three words, one promise." /></h2>
        </header>
        <div className="gs-stack">
          {pillars.map((p, i) => (
            <article key={p.key} className={`gs-pillar gs-pillar-${p.key}`} style={{ '--i': i }}>
              <div className="gs-pillar-no">{p.no}</div>
              <div className="gs-pillar-body">
                <small>{p.hindi}</small>
                <h3>{p.word}</h3>
                <p>{p.text}</p>
              </div>
              <Crop {...p.crop} className="gs-pillar-img" label="" />
            </article>
          ))}
        </div>
      </section>

      {/* 4 ─ HERD · horizontal scroll on midnight + lilac */}
      <section id="gallery" className="gs-herd" data-sticky aria-labelledby="herd-title">
        <div id="herd" className="gs-herd-pin">
          <div className="gs-herd-track" data-track>
            <div className="gs-herd-intro">
              <span className="gs-kicker">The gallery</span>
              <h2 id="herd-title">Meet the <em>herd</em></h2>
              <p>Keep scrolling, they love company.</p>
              <div className="gs-herd-arrow" aria-hidden="true">→</div>
            </div>
            {herd.map((h, i) => (
              <figure key={i} className={`gs-shot gs-shot-${h.cls}`} style={{ '--r': `${[-3, 2, -2, 3, -1, 2, -3][i]}deg` }}>
                <Crop cx={h.cx} cy={h.cy} f={h.f} ar={h.ar} label={h.cap} />
                <figcaption>{h.cap}</figcaption>
              </figure>
            ))}
            <div className="gs-herd-end"><span>Want to see more?</span><Link to="/donate" className="gs-btn gs-btn-lilac" data-magnet>Support them <Heart size={16} fill="currentColor" /></Link></div>
          </div>
          <div className="gs-herd-meter" aria-hidden="true"><i /></div>
        </div>
      </section>

      {/* 5 ─ FOUNDERS · sky + navy + coral */}
      <section id="founders" className="gs-founders" aria-labelledby="founders-title">
        <div className="gs-founders-copy">
          <span className="gs-kicker" data-anim="up">Our founders</span>
          <h2 id="founders-title" data-anim="up" style={{ '--d': '80ms' }}>The people behind the <em>seva</em>.</h2>
          <p data-anim="up" style={{ '--d': '160ms' }}>It began with two people and one simple belief: no cow should go without care.</p>
        </div>
        <div className="gs-polaroids">
          {founders.map((f, i) => (
            <figure key={f.image} className={`gs-polaroid gs-polaroid-${i + 1}`} data-anim="rotate" style={{ '--d': `${i * 160}ms` }}>
              <div><img src={f.image} alt={f.imageAlt} loading="lazy" /></div>
              <figcaption><b>{f.name || 'Founder'}</b><span>{f.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Marquee reverse className="gs-m-ink" items={['Feed a cow', 'Save a life', 'Spread kindness', 'Give with love']} />

      {/* 6 ─ DONATE · vermilion + cream (QR card -> /donate) */}
      <section id="donate" className="gs-donate" data-prog aria-labelledby="donate-title">
        <div className="gs-donate-glow" aria-hidden="true" />
        <div className="gs-donate-copy">
          <span className="gs-kicker" data-anim="up">Support the Foundation</span>
          <h2 id="donate-title"><Split text="Feed a cow." /><Split text="Warm a heart." start={11} className="gs-ital" /></h2>
          <p data-anim="up" style={{ '--d': '300ms' }}>Whatever you can give goes towards the daily care of the cows. Scan the QR code, pay any amount, and we will take it from there.</p>
          <ul className="gs-uses">
            {uses.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-anim="up" style={{ '--d': `${400 + i * 110}ms` }}>
                <span><Icon size={22} /></span>
                <div><b>{title}</b><small>{text}</small></div>
              </li>
            ))}
          </ul>
        </div>
        <DonateQrCard />
      </section>

      {/* 7 ─ FIND US / VERIFY · sand + cobalt */}
      <section id="contact" className="gs-find" aria-labelledby="find-title">
        <div className="gs-find-card" data-anim="left">
          <span className="gs-kicker">Find us</span>
          <h2 id="find-title">Come say hello.</h2>
          <address>
            <div><MapPin size={20} /><span><b>Registered location</b>{registeredRecordLocation}</span></div>
            {contact.email && <div><Mail size={20} /><a href={`mailto:${contact.email}`}>{contact.email}</a></div>}
            {contact.phone && <div><Phone size={20} /><a href={`tel:${contact.phone}`}>{contact.phone}</a></div>}
            {!contact.email && !contact.phone && <p>Public email and phone details will be added once verified by the Foundation.</p>}
          </address>
        </div>
        <div id="transparency" className="gs-find-legal" data-anim="right">
          <span className="gs-kicker">Transparency</span>
          <h3>Details you can verify</h3>
          <dl>
            <div><dt>Legal name</dt><dd>{officialName}</dd></div>
            <div><dt>Type</dt><dd>{organisationType}, {governingLaw}</dd></div>
            <div><dt>Incorporated</dt><dd>{incorporatedOn}</dd></div>
            <div><dt>CIN</dt><dd>{cin}</dd></div>
            <div><dt>Section 8 licence</dt><dd>{section8LicenceNumber}</dd></div>
          </dl>
          <p>{legalClarification}</p>
        </div>
      </section>
    </div>
  )
}