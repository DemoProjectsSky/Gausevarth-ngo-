import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Flame, Heart, Smartphone, Snowflake, Stethoscope, Wheat } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { BANK, upiLink } from '../content/bank'
import { CtaBand, Marquee, Page, PageHero, ShapePhoto, Split } from '../components/Shared'
import './gs-pages.css'

const campaigns = [
  { key: 'fodder', icon: Wheat, tag: 'Always open', title: 'Fodder Drive', purpose: 'Fodder',
    text: 'Fill the feeding troughs. Green and dry fodder for the whole herd, all year.',
    image: '/images/gallery-07.jpg', alt: 'Basket of dry fodder', color: '#f6a935' },
  { key: 'summer', icon: Flame, tag: 'Summer', title: 'Cool Water Summer', purpose: 'Clean water',
    text: 'Keep clean drinking water and shade ready through the hottest Rajasthan months.',
    image: '/images/gallery-05.jpg', alt: 'Bowl of milk and leaves', color: '#e8704f' },
  { key: 'winter', icon: Snowflake, tag: 'Winter', title: 'Winter Warmth', purpose: 'Shelter',
    text: 'Dry bedding and warm, covered shelter so calves and old cows stay safe in the cold nights.',
    image: '/images/gallery-06.jpg', alt: 'A calf resting', color: '#ffd166' },
  { key: 'healing', icon: Stethoscope, tag: 'Always open', title: 'Healing Hands', purpose: 'Medical care',
    text: 'Treatment, medicines and recovery time for cows that are sick, injured or abandoned.',
    image: '/images/gallery-01.jpg', alt: 'A white cow resting', color: '#f2b98a' },
]

const steps = [
  { n: '1', title: 'Pick a campaign', text: 'Choose what you would like your gift to go towards.' },
  { n: '2', title: 'Choose an amount', text: 'Any amount helps. Use a suggested one or enter your own.' },
  { n: '3', title: 'Pay by UPI', text: 'Pay from any UPI app, or scan the QR on the donate page.' },
]

export default function Campaigns() {
  const { donation } = foundationContent
  const [purpose, setPurpose] = useState(campaigns[0].purpose)
  const [amount, setAmount] = useState(donation.amounts[1])
  const [custom, setCustom] = useState('')

  const value = custom ? Number(custom) : amount
  const valid = Number.isFinite(value) && value >= 1
  const link = upiLink(valid ? value : undefined, `Gau Sevarth - ${purpose}`)

  return (
    <Page theme="brown">
      <PageHero
        kicker="Campaigns"
        title="Campaigns"
        lead="Choose a cause close to your heart. Every campaign goes straight to the daily care of the cows."
      >
        <a href="#give" className="gs-btn gs-btn-sun" data-magnet><Heart size={17} fill="currentColor" /> Give now</a>
        <Link to="/our-work" className="gs-btn gs-btn-ghost" data-magnet>What we do</Link>
      </PageHero>

      <Marquee className="gs-m-sun" items={['Fodder Drive', 'Cool Water Summer', 'Winter Warmth', 'Healing Hands']} />

      <section className="gp-section gp-camps" aria-labelledby="camps-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Open campaigns</span>
          <h2 id="camps-title"><Split text="Pick what you care about." /></h2>
        </header>
        <div className="gp-cards">
          {campaigns.map((c, i) => (
            <article key={c.key} className="gp-card" data-anim="up" style={{ '--d': `${i * 110}ms`, '--card': c.color }}>
              <div className="gp-card-img">
                <ShapePhoto src={c.image} alt={c.alt} shape={['torn', 'blob', 'wave', 'flower'][i]} color={c.color} />
                <span className="gp-card-tag"><c.icon size={15} /> {c.tag}</span>
              </div>
              <div className="gp-card-body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <button type="button" className="gp-card-btn" onClick={() => { setPurpose(c.purpose); document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Support this <ArrowUpRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="give" className="gp-section gp-give" data-prog aria-labelledby="give-title">
        <div className="gp-give-glow" aria-hidden="true" />
        <div className="gp-give-grid">
          <div className="gp-give-copy">
            <span className="gs-kicker" data-anim="up">Quick give</span>
            <h2 id="give-title" data-anim="up" style={{ '--d': '80ms' }}>Your gift, your choice.</h2>
            <p data-anim="up" style={{ '--d': '160ms' }}>Select a purpose and an amount. The button opens your UPI app with the details filled in (works on phones). On a computer, use the QR code on the donate page.</p>
            <ol className="gp-steps">
              {steps.map((s, i) => (
                <li key={s.n} data-anim="up" style={{ '--d': `${240 + i * 100}ms` }}>
                  <span>{s.n}</span>
                  <div><b>{s.title}</b><small>{s.text}</small></div>
                </li>
              ))}
            </ol>
          </div>

          <div className="gp-picker" data-anim="right">
            <h3>I want to support</h3>
            <div className="gp-chips" role="group" aria-label="Purpose">
              {campaigns.map(c => (
                <button key={c.key} type="button" className={purpose === c.purpose ? 'on' : ''} aria-pressed={purpose === c.purpose} onClick={() => setPurpose(c.purpose)}>
                  <c.icon size={16} /> {c.purpose}
                </button>
              ))}
            </div>
            <h3>With an amount of</h3>
            <div className="gp-chips gp-amounts" role="group" aria-label="Amount">
              {donation.amounts.map(a => (
                <button key={a} type="button" className={!custom && amount === a ? 'on' : ''} aria-pressed={!custom && amount === a} onClick={() => { setAmount(a); setCustom('') }}>
                  ₹{a.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
            <label className="gp-custom">
              <span>Or enter your own</span>
              <div><b>₹</b><input type="number" inputMode="numeric" min="1" placeholder="Any amount" value={custom} onChange={e => setCustom(e.target.value)} /></div>
            </label>

            <a className={`gp-pay ${valid ? '' : 'is-off'}`} href={valid ? link : undefined} aria-disabled={!valid}>
              <Smartphone size={20} />
              <span>{valid ? `Pay ₹${value.toLocaleString('en-IN')} by UPI` : 'Enter a valid amount'}</span>
            </a>
            <Link to="/donate" className="gp-alt">Prefer the QR code or bank transfer? <ArrowUpRight size={15} /></Link>
            <small className="gp-fine">Paying to {BANK.name} ({BANK.upi}). Please check the name in your UPI app before you pay. Donations are voluntary. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.</small>
          </div>
        </div>
      </section>

      <CtaBand
        title="Can't give right now? Share the love."
        text="Telling one friend about the cows can do as much good as a donation."
        primary={{ to: '/get-involved', label: 'Ways to help' }}
        secondary={{ to: '/gallery', label: 'See the herd' }}
      />
    </Page>
  )
}
