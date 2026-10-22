import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Eye, FileText, Mail, MapPin, Phone, Sprout, Target } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'

function Reveal({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={style}>{children}</div>
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default function Home() {
  const {
    officialName, incorporatedOn, incorporationYear, organisationType, governingLaw,
    cin, section8LicenceNumber, registeredRecordLocation, legalClarification,
    missionStatement, visionStatement, initiatives, milestones, impactMetrics,
    stories, approvedPhotos, documents, contact, founders, gallerySlots, donation,
  } = foundationContent

  return (
    <>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-card">
          <span className="eyebrow">GAUSEVARATHA SWAYAM SEVAK FOUNDATION</span>
          <h1 id="hero-title">
            <span>Happy Cows,</span>
            <strong>Healthy Tomorrow</strong>
          </h1>
          <p>Compassionate care today, for a kinder world tomorrow.</p>
          <Link to="/#initiatives" className="btn btn-primary">OUR WORK </Link>
        </div>
      </section>

      <section className="section founders-section" aria-label="Our founders">
        <Reveal className="container">
          <SectionHeading eyebrow="Our founders" title="The people who started the journey" description="Founder names and designations can be edited in the central foundation content file before publishing." />
          <div className="founder-grid">{founders.map((founder, index) => <Reveal key={founder.image} className="founder-card" style={{ transitionDelay: `${index * 80}ms` }}><img src={founder.image} alt={founder.imageAlt} loading="lazy" /><div><h3>{founder.name || `Founder name ${index + 1}`}</h3><p>{founder.role}</p></div></Reveal>)}</div>
        </Reveal>
      </section>

      <section id="about" className="section intro-section" aria-labelledby="about-title">
        <Reveal className="container about-layout">
          <div className="about-aside">
            <span className="section-index">01 / ABOUT</span>
            <span className="about-year">{incorporationYear}</span>
            <span className="about-year-label">Year of incorporation</span>
          </div>
          <div className="about-copy">
            <span className="eyebrow">About the foundation</span>
            <h2 id="about-title">A charitable foundation, formally established.</h2>
            <p><strong>{officialName}</strong> was incorporated on {incorporatedOn} as a {organisationType} under the {governingLaw}. Its registered-record location is {registeredRecordLocation}.</p>
            <p className="legal-note">The incorporation date confirms legal formation only; it is not a statement of when charitable activities began.</p>
            <Link to="/#transparency" className="text-link text-link-dark">Read the verified legal details <ArrowUpRight size={17} /></Link>
          </div>
        </Reveal>
      </section>

      <section id="mission" className="section purpose-section" aria-labelledby="purpose-title">
        <Reveal className="container">
          <SectionHeading eyebrow="Purpose" title="The principles behind our work" description="These statements are editable and will be published once reviewed and approved by the Foundation." />
          <div className="purpose-grid">
            <Reveal className="purpose-card" style={{ transitionDelay: '60ms' }}>
              <Target aria-hidden="true" />
              <span className="card-kicker">01 / MISSION</span>
              <h3 id="purpose-title">Our mission</h3>
              <p>{missionStatement || 'Foundation-approved mission statement to be added.'}</p>
            </Reveal>
            <Reveal className="purpose-card" style={{ transitionDelay: '140ms' }}>
              <Eye aria-hidden="true" />
              <span className="card-kicker">02 / VISION</span>
              <h3>Our vision</h3>
              <p>{visionStatement || 'Foundation-approved vision statement to be added.'}</p>
            </Reveal>
          </div>
        </Reveal>
      </section>

      <section id="initiatives" className="section initiatives-section" aria-labelledby="initiatives-title">
        <Reveal className="container">
          <SectionHeading eyebrow="Our work" title="Our initiatives" description="Only activities confirmed by the Foundation belong here." />
          {initiatives.length > 0 ? (
            <div className="initiative-grid">
              {initiatives.map((item, index) => (
                <Reveal key={item.title} className="initiative-card" style={{ transitionDelay: `${index * 90}ms` }}>
                  {item.image && <img src={item.image} alt={item.imageAlt || ''} loading="lazy" />}
                  <div className="initiative-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.href && <a className="text-link text-link-dark" href={item.href}>Learn more <ArrowUpRight size={16} /></a>}
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="empty-note">Initiative details will be added here after the Foundation confirms the programmes and descriptions for publication.</p>
          )}
        </Reveal>
      </section>

      <section id="impact" className="section impact-section" aria-labelledby="impact-title">
        <Reveal className="container">
          <SectionHeading eyebrow="Accountability" title="Impact, carefully reported" description="We will share dated, documented outcomes when the Foundation has approved them for publication." />
          {impactMetrics.length > 0 && (
            <div className="metric-grid">
              {impactMetrics.map((metric, index) => (
                <Reveal key={metric.label} className="metric" style={{ transitionDelay: `${index * 70}ms` }}>
                  <strong>{metric.value}</strong><span>{metric.label}</span><small>As of {metric.asOf}</small>
                </Reveal>
              ))}
            </div>
          )}
          <div className="timeline-wrap">
            <h3 id="impact-title">Foundation timeline</h3>
            {milestones.length > 0 ? (
              <ol className="timeline">
                {milestones.map((item, index) => (
                  <li key={`${item.date}-${item.title}`}>
                    <Reveal className="timeline-item" style={{ transitionDelay: `${index * 90}ms` }}>
                      <time>{item.date}</time><div><h4>{item.title}</h4><p>{item.description}</p></div>
                      {item.image && <img src={item.image} alt={item.imageAlt || ''} loading="lazy" />}
                    </Reveal>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="timeline-empty"><CalendarDays aria-hidden="true" /> No approved milestones or project dates have been supplied for publication.</p>
            )}
          </div>
        </Reveal>
      </section>

      <section id="gallery" className="section stories-section" aria-labelledby="stories-title">
        <Reveal className="container">
          <SectionHeading eyebrow="Stories & gallery" title="The work, in its own words" description="Photographs and project stories should be published only with the Foundation’s approval and appropriate consent." />
          <div className="stories-content">
            {stories.length > 0 ? (
              <div className="story-grid">
                {stories.map((story, index) => (
                  <Reveal key={story.title} className="story-card" style={{ transitionDelay: `${index * 90}ms` }}>
                    {story.image && <img src={story.image} alt={story.imageAlt || ''} loading="lazy" />}
                    <div><span className="card-kicker">{story.date}</span><h3 id="stories-title">{story.title}</h3><p>{story.summary}</p></div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="gallery-slot-grid">{gallerySlots.map(slot => <div className="gallery-slot" key={slot.fileName}><div className="gallery-slot-art"><span>+</span></div><strong>{slot.fileName}</strong><p>Add this image to <code>public/images/</code>, then update the slot in <code>foundationContent.js</code>.</p><small>Alt text: {slot.alt}</small></div>)}</div>
            )}
            {approvedPhotos.length > 0 && (
              <div className="photo-grid" aria-label="Approved photographs">
                {approvedPhotos.map(photo => <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />)}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="section donation-section" aria-labelledby="donation-title"><Reveal className="container donation-inner"><div><span className="eyebrow">Support the Foundation</span><h2 id="donation-title">Your support can help this journey grow.</h2><p>{donation.note}</p></div><Link to={donation.enabled && donation.paymentUrl ? donation.paymentUrl : '/donate'} className="btn btn-primary">Support Us <ArrowUpRight size={17} /></Link></Reveal></section>

      <section id="transparency" className="section transparency-section" aria-labelledby="transparency-title">
        <Reveal className="container transparency-layout">
          <div>
            <span className="eyebrow">Transparency</span>
            <h2 id="transparency-title">The details that can be verified.</h2>
            <p>These company details are provided for identification. No tax-exemption status is implied.</p>
          </div>
          <dl className="legal-details">
            <div><dt>Legal name</dt><dd>{officialName}</dd></div>
            <div><dt>Organisation type</dt><dd>{organisationType}, {governingLaw}</dd></div>
            <div><dt>Incorporated</dt><dd>{incorporatedOn}</dd></div>
            <div><dt>Corporate identity number</dt><dd>{cin}</dd></div>
            <div><dt>Section 8 licence number</dt><dd>{section8LicenceNumber}</dd></div>
            <div><dt>Registered-record location</dt><dd>{registeredRecordLocation}</dd></div>
          </dl>
          <p className="transparency-note"><FileText aria-hidden="true" /> {legalClarification}</p>
          {documents.length > 0 && (
            <ul className="document-links">
              {documents.map(document => <li key={document.label}><a href={document.href}>{document.label}<ArrowUpRight size={15} /></a></li>)}
            </ul>
          )}
        </Reveal>
      </section>

      <section id="get-involved" className="section involved-section" aria-labelledby="involved-title">
        <Reveal className="container involved-inner">
          <span className="eyebrow">Get involved</span>
          <h2 id="involved-title">Start with a conversation.</h2>
          <p>Volunteer opportunities, partnerships and donation arrangements have not been confirmed for publication. Contact details will be added when verified by the Foundation.</p>
          <Link to="/#contact" className="btn btn-light">View contact information <ArrowUpRight size={17} /></Link>
        </Reveal>
      </section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title">
        <Reveal className="container contact-layout">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 id="contact-title">Reach the Foundation.</h2>
            <p>Use the registered-record location for identification only. A public visiting address has not been confirmed.</p>
          </div>
          <address className="contact-details">
            <div><MapPin aria-hidden="true" /><span><strong>Registered-record location</strong>{registeredRecordLocation}</span></div>
            {contact.email && <div><Mail aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></div>}
            {contact.phone && <div><Phone aria-hidden="true" /><a href={`tel:${contact.phone}`}>{contact.phone}</a></div>}
            {!contact.email && !contact.phone && <p className="empty-contact">Verified public email and phone details are required before a contact form or direct contact button can be published.</p>}
          </address>
        </Reveal>
      </section>

      <section className="policy-strip" aria-label="Policies and legal information">
        <div className="container policy-inner">
          <span>Section 8 company · Incorporated {incorporationYear}</span>
          <div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of use</Link></div>
        </div>
      </section>
    </>
  )
}
