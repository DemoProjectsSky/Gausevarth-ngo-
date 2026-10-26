import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Check, Copy, Download, Heart, Landmark, ScanLine, ShieldCheck, Smartphone,
} from 'lucide-react'
import './gs-donate.css'

/* QR image ka path (public/images/ ke andar) */
const QR_IMAGE = encodeURI('/images/gausevath ngo qr.jpeg')

const BANK = {
  name: 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION',
  bank: 'UCO Bank',
  account: '08810210003183',
  ifsc: 'UCBA0000881',
  upi: 'gauseva3183@ucobank',
}

// Mobile pe seedha UPI app kholne ke liye
const UPI_LINK = `upi://pay?pa=${BANK.upi}&pn=${encodeURIComponent(BANK.name)}&cu=INR`

// Header mein upar tairte hue dil
const HEARTS = [
  { l: '6%', s: 18, d: 0, t: 9 },
  { l: '18%', s: 26, d: 3, t: 11 },
  { l: '34%', s: 16, d: 6, t: 8 },
  { l: '52%', s: 22, d: 1.5, t: 10 },
  { l: '68%', s: 30, d: 4.5, t: 12 },
  { l: '82%', s: 18, d: 7, t: 9 },
  { l: '92%', s: 24, d: 2.5, t: 11 },
]

function CopyRow({ label, value, mono = true, delay = 0 }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked; ignore */ }
  }
  return (
    <div className="gd-row gd-rise" style={{ '--d': `${delay}ms` }}>
      <div>
        <span className="gd-row-label">{label}</span>
        <b className={mono ? 'gd-mono' : ''}>{value}</b>
      </div>
      <button type="button" onClick={copy} aria-label={`Copy ${label}`} className={copied ? 'done' : ''}>
        {copied ? <Check size={17} /> : <Copy size={17} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}

export default function Donate() {
  return (
    <div className="gs gd-page">
      {/* ───── HEADER ───── */}
      <section className="gd-hero" aria-labelledby="gd-title">
        <div className="gd-blobs" aria-hidden="true">
          <i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" />
        </div>
        <div className="gd-hearts" aria-hidden="true">
          {HEARTS.map((h, i) => (
            <span key={i} className="gd-heart" style={{ '--l': h.l, '--d': `${h.d}s`, '--t': `${h.t}s` }}>
              <Heart size={h.s} fill="currentColor" />
            </span>
          ))}
        </div>

        <div className="gd-wrap">
          <Link to="/" className="gd-back gd-rise" style={{ '--d': '0ms' }}><ArrowLeft size={18} /> Back to home</Link>

          <header className="gd-head">
            <span className="gd-kicker gd-rise" style={{ '--d': '100ms' }}>Support the Foundation</span>
            <h1 id="gd-title">
              <span className="gd-line"><span style={{ '--d': '200ms' }}>Feed a cow.</span></span>
              <span className="gd-line"><span className="gd-glow" style={{ '--d': '380ms' }}>Warm a heart.</span></span>
            </h1>
            <p className="gd-rise" style={{ '--d': '560ms' }}>
              Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) and donate any amount.
              You can also send it directly to our bank account.
            </p>
          </header>
        </div>
      </section>

      {/* ───── CARDS ───── */}
      <div className="gd-wrap gd-body">
        <div className="gd-grid">
          {/* QR */}
          <section className="gd-qr-card gd-rise" style={{ '--d': '300ms' }} aria-labelledby="qr-title">
            <h2 id="qr-title"><ScanLine size={22} /> Scan &amp; donate</h2>
            <div className="gd-qr-frame">
              <img src={QR_IMAGE} alt="UCO Bank UPI QR code of Gausevaratha Swayam Sevak Charitable Foundation" />
              <i className="gd-corner tl" /><i className="gd-corner tr" /><i className="gd-corner bl" /><i className="gd-corner br" />
              <span className="gd-scan" aria-hidden="true" />
            </div>
            <div className="gd-qr-actions">
              <a className="gd-btn gd-btn-solid" href={UPI_LINK}><Smartphone size={18} /> Pay with UPI app</a>
              <a className="gd-btn gd-btn-line" href={QR_IMAGE} download="gausevarth-donate-qr.jpeg"><Download size={18} /> Download QR</a>
            </div>
            <small>"Pay with UPI app" button phone par kaam karta hai. Computer par QR scan karo.</small>
          </section>

          {/* Bank details */}
          <section className="gd-bank-card gd-rise" style={{ '--d': '450ms' }} aria-labelledby="bank-title">
            <h2 id="bank-title"><Landmark size={22} /> Bank account details</h2>
            <CopyRow label="Account name" value={BANK.name} mono={false} delay={650} />
            <CopyRow label="Bank" value={BANK.bank} mono={false} delay={760} />
            <CopyRow label="Account number" value={BANK.account} delay={870} />
            <CopyRow label="IFSC code" value={BANK.ifsc} delay={980} />
            <CopyRow label="UPI ID" value={BANK.upi} delay={1090} />
          </section>
        </div>

        <ol className="gd-steps">
          <li className="gd-rise" style={{ '--d': '700ms' }}><span>1</span><div><b>Scan the QR</b><small>Koi bhi UPI app kholo aur QR scan karo.</small></div></li>
          <li className="gd-rise" style={{ '--d': '850ms' }}><span>2</span><div><b>Enter amount</b><small>Jitna chaho utna daalo, aur pay karo.</small></div></li>
          <li className="gd-rise" style={{ '--d': '1000ms' }}><span>3</span><div><b>Done</b><small>Aapka daan gaayon ki seva mein lagega.</small></div></li>
        </ol>

        <p className="gd-fine gd-rise" style={{ '--d': '1100ms' }}>
          <ShieldCheck size={18} />
          <span>
            Payment karne se pehle QR scan ke baad app mein naam
            <b> {BANK.name} </b>
            zaroor check kar lo. Donations are voluntary. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.
          </span>
        </p>

        <p className="gd-thanks gd-rise" style={{ '--d': '1200ms' }}><Heart size={16} fill="currentColor" /> Thank you for caring.</p>
      </div>
    </div>
  )
}