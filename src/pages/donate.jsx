import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Check, Copy, Download, Heart, Landmark, ScanLine, ShieldCheck, Smartphone,
} from 'lucide-react'
import { BANK, upiLink } from '../content/bank'
import { foundationContent } from '../content/foundationContent'
import ShareButton from '../components/ShareButton'
import './gs-donate.css'

/* QR image ka path (public/images/ ke andar) */
const QR_IMAGE = encodeURI('/images/gausevath ngo qr.jpeg')


const AMOUNTS = foundationContent.donation.amounts
const PURPOSES = foundationContent.donation.purposes

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
  const [amount, setAmount] = useState(AMOUNTS[1] || '')
  const [custom, setCustom] = useState('')
  const [purpose, setPurpose] = useState(PURPOSES[0])

  const chosen = custom !== '' ? Number(custom) : Number(amount)
  const validAmount = Number.isFinite(chosen) && chosen >= 1 && chosen <= 100000
  const payLink = upiLink(validAmount ? chosen : undefined, `Gau seva - ${purpose}`)

  return (
    <div className="gs gd-page">
      {/* ───── HEADER ───── */}
      <section className="gd-hero" aria-labelledby="gd-title">
        <div className="gd-wrap">
          <Link to="/" className="gd-back"><ArrowLeft size={18} /> Back to home</Link>

          <header className="gd-head">
            <span className="gd-kicker">Gau seva donation</span>
            <h1 id="gd-title">
              <span className="gd-line"><span>Your Kindness Can</span></span>
              <span className="gd-line"><span className="gd-glow">Make a Difference.</span></span>
            </h1>
            <p>
              Help provide fodder, clean drinking water, medical care and safe shelter for cows in need.
              Pay with any UPI app or send money directly to our bank account.
            </p>
          </header>
        </div>
      </section>

      {/* ───── CARDS ───── */}
      <div className="gd-wrap gd-body">
        <section className="gd-amount-card" aria-labelledby="amt-title">
          <h2 id="amt-title"><Heart size={20} /> Choose your gift</h2>
          <div className="gd-chips" role="group" aria-label="Donation amount">
            {AMOUNTS.map(a => (
              <button
                key={a}
                type="button"
                className={`gd-chip ${custom === '' && Number(amount) === a ? 'on' : ''}`}
                aria-pressed={custom === '' && Number(amount) === a}
                onClick={() => { setAmount(a); setCustom('') }}
              >
                ₹{a.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <label className="gd-custom" htmlFor="gd-custom-amount">
            <span>Or enter another amount (₹)</span>
            <input
              id="gd-custom-amount"
              type="number"
              inputMode="numeric"
              min="1"
              max="100000"
              step="1"
              placeholder="e.g. 251"
              value={custom}
              onChange={e => setCustom(e.target.value.replace(/[^\d]/g, ''))}
            />
          </label>
          <div className="gd-chips gd-purposes" role="group" aria-label="Purpose of donation">
            {PURPOSES.map(p => (
              <button
                key={p}
                type="button"
                className={`gd-chip small ${purpose === p ? 'on' : ''}`}
                aria-pressed={purpose === p}
                onClick={() => setPurpose(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <a className="gd-btn gd-btn-solid gd-pay" href={payLink}>
            <Smartphone size={18} /> {validAmount ? `Pay ₹${chosen.toLocaleString('en-IN')} with UPI app` : 'Pay with UPI app'}
          </a>
          <small>
            This opens your UPI app on a phone with the amount filled in. You can change it there before paying.
            The purpose is added as a payment note.
          </small>
        </section>

        <div className="gd-grid">
          {/* QR */}
          <section className="gd-qr-card gd-rise" style={{ '--d': '160ms' }} aria-labelledby="qr-title">
            <h2 id="qr-title"><ScanLine size={22} /> Scan &amp; donate</h2>
            <div className="gd-qr-frame">
              <img src={QR_IMAGE} width="320" height="320" decoding="async" alt="UCO Bank UPI QR code of Gausevaratha Swayam Sevak Charitable Foundation" />
              <i className="gd-corner tl" /><i className="gd-corner tr" /><i className="gd-corner bl" /><i className="gd-corner br" />
              <span className="gd-scan" aria-hidden="true" />
            </div>
            <div className="gd-qr-actions">
              <a className="gd-btn gd-btn-solid" href={payLink}><Smartphone size={18} /> Pay with UPI app</a>
              <a className="gd-btn gd-btn-line" href={QR_IMAGE} download="gausevarth-donate-qr.jpeg"><Download size={18} /> Download QR</a>
            </div>
            <small>The "Pay with UPI app" button works on phones. On a computer, scan the QR code with your phone.</small>
          </section>

          {/* Bank details */}
          <section className="gd-bank-card gd-rise" style={{ '--d': '160ms' }} aria-labelledby="bank-title">
            <h2 id="bank-title"><Landmark size={22} /> Bank account details</h2>
            <CopyRow label="Account name" value={BANK.name} mono={false} delay={160} />
            <CopyRow label="Bank" value={BANK.bank} mono={false} delay={160} />
            <CopyRow label="Account number" value={BANK.account} delay={160} />
            <CopyRow label="IFSC code" value={BANK.ifsc} delay={160} />
            <CopyRow label="UPI ID" value={BANK.upi} delay={160} />
          </section>
        </div>

        <ol className="gd-steps">
          <li className="gd-rise" style={{ '--d': '160ms' }}><span>1</span><div><b>Scan the QR</b><small>Open any UPI app and scan the QR code.</small></div></li>
          <li className="gd-rise" style={{ '--d': '160ms' }}><span>2</span><div><b>Enter amount</b><small>Enter any amount you like and pay.</small></div></li>
          <li className="gd-rise" style={{ '--d': '160ms' }}><span>3</span><div><b>Done</b><small>Your gift goes straight to the care of the cows.</small></div></li>
        </ol>

        <p className="gd-fine gd-rise" style={{ '--d': '160ms' }}>
          <ShieldCheck size={18} />
          <span>
            After scanning, please check that your app shows the name
            <b> {BANK.name} </b>
            before you pay. Donations are voluntary. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.
          </span>
        </p>

        <section className="gd-trust" aria-labelledby="trust-title">
          <h2 id="trust-title"><ShieldCheck size={20} /> Before you pay</h2>
          <ul>
            <li>Check that your UPI app shows <b>{BANK.name}</b> before you confirm the payment.</li>
            <li>Registered as a {foundationContent.organisationType} under the {foundationContent.governingLaw}. CIN: <span className="gd-mono">{foundationContent.cin}</span>.</li>
            <li>Registered location: {foundationContent.registeredRecordLocation}.</li>
            <li>Questions about a donation? Call <a href={`tel:+91${foundationContent.contact.phone}`}>{foundationContent.contact.phone}</a> or visit our <Link to="/contact">contact page</Link>.</li>
          </ul>
        </section>

        <div className="gd-share"><ShareButton className="gd-btn gd-btn-line" title="Donate for cow welfare | Gau Sevarth" text="Help provide fodder, clean water, medical care and shelter for cows in need." /></div>

        <p className="gd-thanks gd-rise" style={{ '--d': '160ms' }}><Heart size={16} fill="currentColor" /> Thank you for caring.</p>
      </div>
    </div>
  )
}