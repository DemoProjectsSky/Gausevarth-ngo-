
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'

import { foundationContent } from '../content/foundationContent'
import { CtaBand, Marquee, Page, PageHero, Split } from '../components/Shared'
import './gs-pages.css'

export default function Contact() {
  const {
    registeredRecordLocation,
    officialName,
    cin,
    section8LicenceNumber,
  } = foundationContent

  const place = registeredRecordLocation.replace(' - ', ', ')

  const { phone: phoneNumber, whatsapp: whatsappNumber, email: emailAddress } = foundationContent.contact

  // Contact form state
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')

  // Send form data to the Nodemailer API
  const onSubmit = async (e) => {
    e.preventDefault()

    if (sending) return

    setSending(true)
    setSent(false)
    setFormError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          reason,
          message: msg,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to send your message.'
        )
      }

      setSent(true)
      setName('')
      setMobile('')
      setEmail('')
      setReason('')
      setMsg('')
    } catch (error) {
      setFormError(
        error.message ||
          'Unable to send your message. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  const cards = [
    {
      key: 'visit',
      icon: MapPin,
      label: 'Visit',
      value: place,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place
      )}`,
      hint: 'Visit us',
      color: '#f6a935',
    },
    {
      key: 'call',
      icon: Phone,
      label: 'Call',
      value: `+91 ${phoneNumber}`,
      href: `tel:+91${phoneNumber}`,
      hint: 'Call us',
      color: '#e8704f',
    },
    {
      key: 'mail',
      icon: Mail,
      label: 'Email',
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      hint: 'Email us',
      color: '#ffd166',
    },
    {
      key: 'wa',
      icon: MessageCircle,
      label: 'WhatsApp',
      value: `+91 ${phoneNumber}`,
      href: `https://wa.me/${whatsappNumber}`,
      hint: 'WhatsApp us',
      color: '#d9823b',
    },
  ]

  return (
    <Page theme="brown">
      <PageHero
        kicker="Contact"
        title="Contact Us"
        lead="Questions, ideas or want to visit the gaushala? Reach out, and someone from the Foundation will be glad to help."
      >
        <a
          href="#find"
          className="gs-btn gs-btn-sun"
          data-magnet
        >
          <MapPin size={17} />
          Contact Details
        </a>

        <Link
          to="/donate"
          className="gs-btn gs-btn-ghost"
          data-magnet
        >
          <Heart size={16} fill="currentColor" />
          Donate
        </Link>
      </PageHero>

      <Marquee
        className="gs-m-sun"
        items={['Namaste', 'Say hello', 'Contact us', 'Bap, Jodhpur']}
      />

      <section
        id="find"
        className="gp-section gp-contact"
        aria-labelledby="find-title"
      >
        <header className="gp-head">
          <span className="gs-kicker" data-anim="up">
            Reach us
          </span>

          <h2 id="find-title">
            <Split text="Four ways to reach us." />
          </h2>
        </header>

        {/* Contact information cards */}
        <div className="gp-cards gp-cards-4">
          {cards.map((c, i) => {
            const hasValue = Boolean(c.value)
            const Tag = hasValue && c.href ? 'a' : 'div'

            return (
              <Tag
                key={c.key}
                className={`gp-info ${hasValue ? '' : 'is-soon'}`}
                {...(
                  Tag === 'a'
                    ? {
                        href: c.href,
                        ...(c.key === 'wa' || c.key === 'visit'
                          ? {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            }
                          : {}),
                      }
                    : {}
                )}
                data-anim="pop"
                style={{
                  '--d': `${i * 100}ms`,
                  '--card': c.color,
                }}
              >
                <span className="gp-way-ico">
                  <c.icon size={26} />
                </span>

                <small>{c.label}</small>

                <b className={`gp-info-value gp-info-${c.key}`}>
                  {hasValue ? c.value : c.hint}
                </b>
              </Tag>
            )
          })}
        </div>

        {/* Full-width NGO Contact Form */}
        <div className="gp-contact-grid gp-contact-grid-no-map">
          <form
            className="gp-form"
            onSubmit={onSubmit}
            data-anim="up"
          >
            <h3>Get in Touch</h3>

            <p>
              Have a question or want to support our Gau Seva
              mission? Send us a message.
            </p>

            {/* Full Name */}
            <label>
              <span>Full Name *</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setSent(false)
                  setFormError('')
                }}
              />
            </label>

            {/* Mobile Number */}
            <label>
              <span>Mobile Number *</span>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your 10-digit mobile number"
                required
                autoComplete="tel-national"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number."
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  setMobile(
                    e.target.value.replace(/\D/g, '').slice(0, 10)
                  )
                  setSent(false)
                  setFormError('')
                }}
              />
            </label>

            {/* Optional Email Address */}
            <label>
              <span>Email Address (Optional)</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSent(false)
                  setFormError('')
                }}
              />
            </label>

            {/* Reason for Contact */}
            <label>
              <span>Reason for Contact *</span>
              <select
                name="reason"
                required
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  setSent(false)
                  setFormError('')
                }}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Donation">Donation</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Cow Rescue">Cow Rescue</option>
                <option value="Gau Seva">Gau Seva</option>
                <option value="Partnership">Partnership</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </label>

            {/* Message */}
            <label>
              <span>Your Message *</span>
              <textarea
                name="message"
                placeholder="Write your question or request here..."
                required
                rows={5}
                maxLength={3000}
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value)
                  setSent(false)
                  setFormError('')
                }}
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="gs-btn gs-btn-sun"
              disabled={sending}
            >
              <Send size={17} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>

            {/* Success Message */}
            {sent && (
              <small className="gp-fine" role="status">
                Your message has been sent successfully!
              </small>
            )}

            {/* Error Message */}
            {formError && (
              <small className="gp-fine" role="alert">
                {formError}
              </small>
            )}

            <small className="gp-fine">
              Your contact information will be used to respond
              to your inquiry.
            </small>
          </form>
        </div>
      </section>

      {/* Verified Foundation Details */}
      <section
        className="gp-section gp-verify"
        aria-labelledby="verify-title"
      >
        <div className="gp-verify-card" data-anim="up">
          <ShieldCheck size={34} />

          <div>
            <h2 id="verify-title">Verified details</h2>

            <dl>
              <div>
                <dt>Legal name</dt>
                <dd>{officialName}</dd>
              </div>

              <div>
                <dt>Registered location</dt>
                <dd>{registeredRecordLocation}</dd>
              </div>

              <div>
                <dt>CIN</dt>
                <dd>{cin}</dd>
              </div>

              <div>
                <dt>Section 8 licence</dt>
                <dd>{section8LicenceNumber}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <CtaBand
        title="Want to help right away?"
        text="Scan a QR code and your gift reaches the cows today."
        primary={{ to: '/donate', label: 'Donate now' }}
        secondary={{ to: '/get-involved', label: 'More ways to help' }}
      />
    </Page>
  )
}
