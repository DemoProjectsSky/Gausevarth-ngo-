import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, Building2, Check, Copy, Gift, HandHeart, Heart, Megaphone, MessageCircle, Sprout, Wheat,
} from 'lucide-react'
import { CtaBand, Marquee, Page, PageHero, ShapePhoto, Spark, Split } from '../components/Shared'
import './gs-pages.css'

const ways = [
  { icon: Heart, title: 'Donate', color: '#e8704f', text: 'Give any amount by UPI or bank transfer. Every rupee goes towards the daily care of the cows.', to: '/donate', cta: 'Donate now' },
  { icon: Wheat, title: 'Sponsor fodder', color: '#f6a935', text: 'Choose a campaign such as a fodder drive or winter shelter and give towards it.', to: '/campaigns', cta: 'See campaigns' },
  { icon: HandHeart, title: 'Volunteer', color: '#ffd166', text: 'Have time and a caring heart? Get in touch to help with feeding, cleaning or events.', to: '/contact', cta: 'Get in touch' },
  { icon: Megaphone, title: 'Spread the word', color: '#f2b98a', text: 'Share our page with family and friends. Awareness is a gift that costs nothing.', to: '#share', cta: 'Share now' },
  { icon: Building2, title: 'Partner with us', color: '#d9823b', text: 'Businesses, schools and community groups can partner on drives and festival giving.', to: '/contact', cta: 'Talk to us' },
  { icon: Gift, title: 'Give in kind', color: '#ffd166', text: 'Fodder, medicines or supplies can also help. Contact us first so we can plan the delivery.', to: '/contact', cta: 'Ask how' },
]

const faqs = [
  { q: 'Is my donation voluntary?', a: 'Yes. Every donation is voluntary and goes towards the care of the cows. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.' },
  { q: 'How can I be sure I am paying the right account?', a: 'Before you pay, check that your UPI or banking app shows the name GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION. Our verified details are on the donate page.' },
  { q: 'Can I visit the gaushala?', a: 'We are in Bap, Jodhpur, Rajasthan. Please contact us before you visit so someone can welcome you.' },
  { q: 'I cannot donate money. How else can I help?', a: 'Volunteer your time, share our page, or give fodder and supplies. All of it helps.' },
]

export default function GetInvolved() {
  const [copied, setCopied] = useState(false)
  const url = typeof window === 'undefined' ? '' : window.location.origin
  const text = 'Help the cows at Gau Sevarth. Seva, Sanrakshan aur Jeev Daya.'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked */ }
  }

  return (
    <Page theme="brown">
      <PageHero
        kicker="Get involved"
        title="Get Involved"
        lead="You do not have to be rich to help a cow. Time, voice and a little kindness all count. Find the way that fits you."
      >
        <a href="#ways" className="gs-btn gs-btn-sun" data-magnet><Sprout size={17} /> See ways to help</a>
        <Link to="/donate" className="gs-btn gs-btn-ghost" data-magnet>Donate</Link>
      </PageHero>

      <Marquee className="gs-m-sun" items={['Give', 'Volunteer', 'Share', 'Care']} />

      <section id="ways" className="gp-section gp-ways" aria-labelledby="ways-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Six ways to help</span>
          <h2 id="ways-title"><Split text="Pick your seva." /></h2>
        </header>
        <div className="gp-cards gp-cards-3">
          {ways.map((w, i) => {
            const inner = <>{w.cta} <ArrowUpRight size={17} /></>
            return (
              <article key={w.title} className="gp-way" data-anim="up" style={{ '--d': `${(i % 3) * 110}ms`, '--card': w.color }}>
                <span className="gp-way-ico"><w.icon size={28} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                {w.to.startsWith('#')
                  ? <a href={w.to} className="gp-card-btn">{inner}</a>
                  : <Link to={w.to} className="gp-card-btn">{inner}</Link>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="gp-section gp-collage" aria-labelledby="faces-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Why it matters</span>
          <h2 id="faces-title"><Split text="Faces of the herd." /></h2>
        </header>
        <div className="gp-collage-grid">
          <div className="c c1" data-anim="rotate"><ShapePhoto src="/images/gallery-01.jpg" alt="A white cow with a bell" shape="flower" color="#f6a935" /></div>
          <div className="c c2" data-anim="rotate" style={{ '--d': '120ms' }}><ShapePhoto src="/images/gallery-02.jpg" alt="A calf in the grass" shape="blob" color="#e8704f" /></div>
          <div className="c c3" data-anim="rotate" style={{ '--d': '240ms' }}><ShapePhoto src="/images/gallery-03.jpg" alt="A brown cow resting" shape="torn" color="#ffd166" /></div>
          <div className="c c4" data-anim="rotate" style={{ '--d': '360ms' }}><ShapePhoto src="/images/gallery-06.jpg" alt="A calf with a white mark" shape="blobb" color="#f2b98a" /></div>
          <Spark className="c-spark s1" /><Spark className="c-spark s2" />
        </div>
      </section>

      <section id="share" className="gp-section gp-share" aria-labelledby="share-title">
        <div className="gp-share-card" data-anim="zoom">
          <MessageCircle size={36} />
          <h2 id="share-title">Tell one friend.</h2>
          <p>A single message can bring a new helper to the herd. Share our page in one tap.</p>
          <div className="gp-share-row">
            <a className="gs-btn gs-btn-sun" href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp</a>
            <a className="gs-btn gs-btn-ghost" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
            <button type="button" className="gs-btn gs-btn-ghost" onClick={copy}>{copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Link copied' : 'Copy link'}</button>
          </div>
        </div>
      </section>

      <section className="gp-section gp-faq" aria-labelledby="faq-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Good to know</span>
          <h2 id="faq-title"><Split text="Common questions." /></h2>
        </header>
        <div className="gp-faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} data-anim="up" style={{ '--d': `${i * 90}ms` }}>
              <summary>{f.q}<i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready when you are."
        text="Start with a small step. The cows will feel the difference."
        primary={{ to: '/donate', label: 'Donate now' }}
        secondary={{ to: '/contact', label: 'Contact us' }}
      />
    </Page>
  )
}
