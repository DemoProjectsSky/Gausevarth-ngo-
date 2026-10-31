import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Copy, Download, Flame, Heart, ScanLine, ShieldCheck, Smartphone, Snowflake, Stethoscope, Wheat } from 'lucide-react'
import { BANK, upiLink } from '../content/bank'
import { CtaBand, Marquee, Page, PageHero, ShapePhoto, Split } from '../components/Shared'

/* QR image (public/images/ ke andar) - donate page wali hi image */
const QR_IMAGE = encodeURI('/images/gausevath ngo qr.jpeg')
import './gs-pages.css'

const campaigns = [
  { key: 'fodder', icon: Wheat, tag: 'Always open', title: 'Fodder Drive', purpose: 'Fodder',
    text: 'Fill the feeding troughs. Green and dry fodder for the whole herd, all year.',
    image: '/images/gausevarth gallery19.png', alt: 'Basket of dry fodder', color: '#f6a935' },
  { key: 'summer', icon: Flame, tag: 'Summer', title: 'Cool Water Summer', purpose: 'Clean water',
    text: 'Keep clean drinking water and shade ready through the hottest Rajasthan months.',
    image: '/images/gausevarth gallery17.jpg', alt: 'Bowl of milk and leaves', color: '#e8704f' },
  { key: 'winter', icon: Snowflake, tag: 'Winter', title: 'Winter Warmth', purpose: 'Shelter',
    text: 'Dry bedding and warm, covered shelter so calves and old cows stay safe in the cold nights.',
    image: '/images/gausevarth gallery20.jpg', alt: 'A calf resting', color: '#ffd166' },
  { key: 'healing', icon: Stethoscope, tag: 'Always open', title: 'Healing Hands', purpose: 'Medical care',
    text: 'Treatment, medicines and recovery time for cows that are sick, injured or abandoned.',
    image: '/images/gausevarth gallery3.png ', alt: 'A white cow resting', color: '#f2b98a' },
]

const steps = [
  { n: '1', title: 'Pick a campaign', text: 'Choose the cause you would like your gift to go towards.' },
  { n: '2', title: 'Scan the QR', text: 'Open GPay, PhonePe, Paytm or any UPI app and scan the code.' },
  { n: '3', title: 'Enter any amount', text: 'Pay what you wish. The gift goes straight to the cows.' },
]

export default function Campaigns() {
  const [purpose, setPurpose] = useState(campaigns[0].purpose)
  const [copied, setCopied] = useState(false)
  const link = upiLink(undefined, `Gau Sevarth - ${purpose}`)

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(BANK.upi)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked */ }
  }

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
                <ShapePhoto src={c.image} alt={c.alt} shape="landscape" color={c.color} />
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
            <span className="gs-kicker" data-anim="up">Give by QR</span>
            <h2 id="give-title" data-anim="up" style={{ '--d': '80ms' }}>Your gift, your choice.</h2>
            <p data-anim="up" style={{ '--d': '160ms' }}>Scan the QR code with any UPI app and give any amount you like. On a phone, the button opens your UPI app directly. Choose a campaign so we know what your gift is for.</p>
            <ol className="gp-steps">
              {steps.map((s, i) => (
                <li key={s.n} data-anim="up" style={{ '--d': `${240 + i * 100}ms` }}>
                  <span>{s.n}</span>
                  <div><b>{s.title}</b><small>{s.text}</small></div>
                </li>
              ))}
            </ol>
          </div>

          <div className="gp-picker gp-qrbox" data-anim="right">
            <h3><ScanLine size={20} /> Scan &amp; donate</h3>
            <div className="gp-chips" role="group" aria-label="Campaign">
              {campaigns.map(c => (
                <button key={c.key} type="button" className={purpose === c.purpose ? 'on' : ''} aria-pressed={purpose === c.purpose} onClick={() => setPurpose(c.purpose)}>
                  <c.icon size={16} /> {c.purpose}
                </button>
              ))}
            </div>
            <div className="gp-qr-frame">
              <img src={QR_IMAGE} alt="UCO Bank UPI QR code of Gausevaratha Swayam Sevak Charitable Foundation" />
            </div>
            <div className="gp-upi-row">
              <span>UPI ID</span>
              <code>{BANK.upi}</code>
              <button type="button" onClick={copyUpi} aria-label="Copy UPI ID">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
            </div>
            <div className="gp-qr-actions">
            <a
  className="gp-pay"
  href="upi://pay?pa=gauseva3183@ucobank&pn=Gausevarth%20NGO&cu=INR"
>
  <Smartphone size={20} />
  <span>Pay with UPI app</span>
</a>
              <a className="gp-pay gp-pay-line" href={QR_IMAGE} download="gausevarth-donate-qr.jpeg"><Download size={18} /><span>Download QR</span></a>
            </div>
            <Link to="/donate" className="gp-alt">Prefer bank transfer? See account details <ArrowUpRight size={15} /></Link>
            <small className="gp-fine"><ShieldCheck size={16} /><span>After scanning, check that your app shows <b>{BANK.name}</b> before you pay. Donations are voluntary. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.</span></small>
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
