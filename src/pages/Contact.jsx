import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Heart, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { CtaBand, Marquee, Page, PageHero, Split } from '../components/Shared'
import './gs-pages.css'

export default function Contact() {
  const { contact, registeredRecordLocation, officialName, cin, section8LicenceNumber } = foundationContent
  const place = registeredRecordLocation.replace(' - ', ', ')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const wa = contact.whatsapp || (contact.phone || '').replace(/\D/g, '')
  const canSend = Boolean(contact.email || wa)
  const body = `Hello, my name is ${name || '(name)'}.\n\n${msg}`

  const onSubmit = e => {
    e.preventDefault()
    const href = contact.email
      ? `mailto:${contact.email}?subject=${encodeURIComponent('Message from the Gau Sevarth website')}&body=${encodeURIComponent(body)}`
      : `https://wa.me/${wa}?text=${encodeURIComponent(body)}`
    setSent(true)
    window.open(href, contact.email ? '_self' : '_blank', 'noopener')
  }

  const cards = [
    { key: 'visit', icon: MapPin, label: 'Visit', value: place, hint: 'Registered location', color: '#f6a935' },
    {
      key: 'call', icon: Phone, label: 'Call', color: '#e8704f',
      value: contact.phone, href: contact.phone && `tel:${contact.phone}`, hint: 'Phone number coming soon',
    },
    {
  key: 'mail',
  icon: Mail,
  label: 'Email',
  color: '#ffd166',
  value: 'goputrasushil12@gmail.com',
  href: 'mailto:goputrasushil12@gmail.com',
  hint: 'Email us for more information',
},
    {
      key: 'wa', icon: MessageCircle, label: 'WhatsApp', color: '#d9823b',
      value: wa && 'Chat with us', href: wa && `https://wa.me/${wa}`, hint: 'WhatsApp coming soon',
    },
  ]

  return (
    <Page theme="brown">
      <PageHero
        kicker="Contact"
        title="Contact Us"
        lead="Questions, ideas or want to visit the gaushala? Reach out, and someone from the Foundation will be glad to help."
      >
        <a href="#find" className="gs-btn gs-btn-sun" data-magnet><MapPin size={17} /> Find us</a>
        <Link to="/donate" className="gs-btn gs-btn-ghost" data-magnet><Heart size={16} fill="currentColor" /> Donate</Link>
      </PageHero>

      <Marquee className="gs-m-sun" items={['Namaste', 'Say hello', 'Visit us', 'Bap, Jodhpur']} />

      <section id="find" className="gp-section gp-contact" aria-labelledby="find-title">
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">Reach us</span>
          <h2 id="find-title"><Split text="Four ways to say hi." /></h2>
        </header>

        <div className="gp-cards gp-cards-4">
          {cards.map((c, i) => {
            const on = Boolean(c.value)
            const Tag = on && c.href ? 'a' : 'div'
            return (
              <Tag key={c.key} className={`gp-info ${on ? '' : 'is-soon'}`} {...(Tag === 'a' ? { href: c.href } : {})} data-anim="pop" style={{ '--d': `${i * 100}ms`, '--card': c.color }}>
                <span className="gp-way-ico"><c.icon size={26} /></span>
                <small>{c.label}</small>
                <b>{on ? c.value : c.hint}</b>
              </Tag>
            )
          })}
        </div>

        <div className="gp-contact-grid">
          <div className="gp-map" data-anim="left">
            <iframe
              title="Map of Bap, Jodhpur, Rajasthan"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Bap%2C+Jodhpur%2C+Rajasthan+342307&output=embed"
            />
            <a className="gp-map-link" href="https://www.google.com/maps/search/?api=1&query=Bap%2C+Jodhpur%2C+Rajasthan+342307" target="_blank" rel="noopener noreferrer">
              Open in Google Maps <ArrowUpRight size={16} />
            </a>
          </div>

          <form className="gp-form" onSubmit={onSubmit} data-anim="right">
            <h3>Send a message</h3>
            <label><span>Your name</span><input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" disabled={!canSend} /></label>
            <label><span>Message</span><textarea required rows="5" value={msg} onChange={e => setMsg(e.target.value)} disabled={!canSend} /></label>
            <button type="submit" className="gs-btn gs-btn-sun" disabled={!canSend}><Send size={17} /> {contact.email ? 'Send by email' : 'Send on WhatsApp'}</button>
            {!canSend && <small className="gp-fine"><Clock size={14} /> The message form switches on as soon as the Foundation adds a public email or WhatsApp number.</small>}
            {sent && canSend && <small className="gp-fine">Thank you! Your message app has opened with your note ready to send.</small>}
          </form>
        </div>
      </section>

      <section className="gp-section gp-verify" aria-labelledby="verify-title">
        <div className="gp-verify-card" data-anim="up">
          <ShieldCheck size={34} />
          <div>
            <h2 id="verify-title">Verified details</h2>
            <dl>
              <div><dt>Legal name</dt><dd>{officialName}</dd></div>
              <div><dt>Registered location</dt><dd>{registeredRecordLocation}</dd></div>
              <div><dt>CIN</dt><dd>{cin}</dd></div>
              <div><dt>Section 8 licence</dt><dd>{section8LicenceNumber}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to help right away?"
        text="Scan a QR code and your gift reaches the cows today."
        primary={{ to: '/donate', label: 'Donate now' }}
        secondary={{ to: '/get-involved', label: 'More ways to help' }}
      />
    </Page>
  )
}
