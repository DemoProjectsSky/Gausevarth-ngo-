import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2, Eye, FileText, HeartHandshake, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'

const valueIcons = [ShieldCheck, HeartHandshake, CheckCircle2, UsersRound]

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`about-reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function ApprovalNote({ children }) {
  return <p className="approval-note"><Sparkles aria-hidden="true" />{children}</p>
}

export default function AboutUs() {
  const { officialName, incorporatedOn, organisationType, governingLaw, cin, section8LicenceNumber,
    registeredRecordLocation, legalClarification, story, missionStatement, visionStatement,
    values, objectives, milestones, documents, leadership, founders, approvedPhotos } = foundationContent

  return (
    <div className="about-page">
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About Us</span>
      </nav>

      <header className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <span className="eyebrow">About the Foundation</span>
            <h1>About Our Foundation</h1>
            <p className="about-hero-subtitle">Working Together for a Better Tomorrow</p>
            <p>{officialName} is a Section 8 company incorporated under the Companies Act, 2013. This page shares the Foundation&apos;s verified identity and provides a considered home for approved stories, objectives and work.</p>
          </div>
          <figure className="about-hero-card">
            <div className="about-hero-image"><img src="/images/gausevarth.logo.jpeg" alt={`${officialName} official logo`} /></div>
            <figcaption>Official foundation identity</figcaption>
          </figure>
        </div>
      </header>

      <div>
        <section className="section about-story" aria-labelledby="story-title">
          <div className="container about-story-grid">
            <div className="section-label"><span>01</span><span>OUR STORY</span></div>
            <Reveal className="about-copy-block">
              <h2 id="story-title">A foundation with room to grow, responsibly.</h2>
              {story ? <p>{story}</p> : <p>The Foundation&apos;s background, reason for establishment and purpose are ready to be added here once the official narrative is supplied and approved.</p>}
              <ApprovalNote>Story copy requires Foundation approval before publication.</ApprovalNote>
            </Reveal>
          </div>
        </section>

        <section className="section about-purpose" aria-labelledby="purpose-title">
          <div className="container">
            <div className="section-heading about-heading"><span className="eyebrow">Our direction</span><h2 id="purpose-title">Mission &amp; vision</h2><p>Clear statements help people understand the Foundation&apos;s direction. The following fields are intentionally held for approval.</p></div>
            <div className="about-purpose-grid">
              <Reveal className="about-purpose-card"><div className="about-icon"><ShieldCheck aria-hidden="true" /></div><span className="card-kicker">01 / MISSION · DRAFT</span><h3>Our mission</h3><p>{missionStatement || 'The Foundation-approved mission statement will appear here.'}</p><ApprovalNote>Pending approval</ApprovalNote></Reveal>
              <Reveal className="about-purpose-card"><div className="about-icon"><Eye aria-hidden="true" /></div><span className="card-kicker">02 / VISION · DRAFT</span><h3>Our vision</h3><p>{visionStatement || 'The Foundation-approved vision statement will appear here.'}</p><ApprovalNote>Pending approval</ApprovalNote></Reveal>
            </div>
          </div>
        </section>

        <section className="section about-values" aria-labelledby="values-title">
          <div className="container"><div className="section-heading about-heading"><span className="eyebrow">How we show up</span><h2 id="values-title">Our values</h2><p>Configurable principles for the Foundation&apos;s approved voice and conduct.</p></div>
            <div className="values-grid">{values.map((value, index) => { const Icon = valueIcons[index % valueIcons.length]; return <Reveal className="value-card" key={value.title}><Icon aria-hidden="true" /><h3>{value.title}</h3><p>{value.description}</p></Reveal> })}</div>
          </div>
        </section>

        <section className="section about-objectives" aria-labelledby="objectives-title">
          <div className="container about-two-col"><div><span className="eyebrow">Verified work</span><h2 id="objectives-title">Our objectives</h2><p>Only approved charitable objectives and verified current activities will be published here.</p></div>
            <div className="approval-panel">{objectives.length ? <ul>{objectives.map(objective => <li key={objective}>{objective}</li>)}</ul> : <><FileText aria-hidden="true" /><h3>Awaiting approved objectives</h3><p>No charitable objectives or current activities have been supplied for publication.</p></>}</div>
          </div>
        </section>

        <section className="section about-journey" aria-labelledby="journey-title">
          <div className="container"><div className="section-heading about-heading"><span className="eyebrow">Our journey</span><h2 id="journey-title">A record of verified milestones</h2></div>
            <ol className="about-timeline">{milestones.map(item => <li key={`${item.date}-${item.title}`}><time>{item.date}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}<li className="timeline-pending"><time>Next chapter</time><div><h3>Future milestones</h3><p>Additional entries will be added after the Foundation verifies and approves them.</p></div></li></ol>
          </div>
        </section>

        <section className="section about-legal" aria-labelledby="legal-title">
          <div className="container about-two-col"><div><span className="eyebrow">Transparency</span><h2 id="legal-title">Legal information</h2><p>{legalClarification}</p></div><dl className="about-legal-list"><div><dt>Official name</dt><dd>{officialName}</dd></div><div><dt>Company type</dt><dd>{organisationType} under the {governingLaw}</dd></div><div><dt>Incorporation date</dt><dd>{incorporatedOn}</dd></div><div><dt>CIN</dt><dd>{cin}</dd></div><div><dt>Section 8 licence number</dt><dd>{section8LicenceNumber}</dd></div><div><dt>Registered-record location</dt><dd>{registeredRecordLocation}</dd></div></dl></div>
        </section>

        <section className="section about-readiness" aria-labelledby="readiness-title">
          <div className="container readiness-grid"><div><span className="eyebrow">Open and accountable</span><h2 id="readiness-title">Transparency, when verified.</h2><p>Approved legal documents, reports and applicable policies can be linked here as they become available. A Form 10A acknowledgement alone is not presented as proof of tax exemption.</p></div><div className="readiness-items"><div><FileText aria-hidden="true" /><span>Legal documents &amp; reports<small>{documents.length ? 'Approved documents available' : 'Awaiting approved documents'}</small></span></div><div><UsersRound aria-hidden="true" /><span>Leadership<small>{leadership.length ? 'Approved profiles available' : 'Profiles shown after approval'}</small></span></div></div></div>
        </section>

        <section className="section about-leadership" aria-labelledby="leadership-title"><div className="container"><div className="section-heading about-heading"><span className="eyebrow">Leadership</span><h2 id="leadership-title">People behind the Foundation.</h2><p>Founder images are shown here; replace the editable names and roles before publishing.</p></div>{founders.length ? <div className="leadership-grid">{founders.map((person, index) => <article className="leader-card" key={person.image}><img src={person.image} alt={person.imageAlt} loading="lazy" /><h3>{person.name || `Founder name ${index + 1}`}</h3><p>{person.role}</p><small>Update this profile in <code>src/content/foundationContent.js</code>.</small></article>)}</div> : leadership.length ? <div className="leadership-grid">{leadership.map(person => <article className="leader-card" key={person.name}>{person.photo && <img src={person.photo} alt={person.photoAlt || `${person.name} profile`} />}<h3>{person.name}</h3><p>{person.designation}</p><small>{person.bio}</small></article>)}</div> : <div className="leadership-empty"><UsersRound aria-hidden="true" /><span>Approved leadership profiles are not yet available for publication.</span></div>}</div></section>

        <section className="section about-gallery" aria-labelledby="gallery-title"><div className="container"><div className="section-heading about-heading"><span className="eyebrow">Gallery</span><h2 id="gallery-title">The work, in its own words.</h2><p>Authentic, approved images will be added with descriptive alt text and appropriate consent.</p></div>{approvedPhotos.length ? <div className="about-photo-grid">{approvedPhotos.map(photo => <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />)}</div> : <div className="gallery-ready"><img src="/images/gausevarth.logo.jpeg" alt={`${officialName} logo`} /><p>Approved project photographs are not yet available for publication.</p></div>}</div></section>

        <section className="about-cta" aria-labelledby="cta-title"><div className="container about-cta-inner"><div><span className="eyebrow">Stay connected</span><h2 id="cta-title">Be Part of Our Journey</h2><p>Explore the Foundation&apos;s verified information or get in touch through the existing contact page.</p></div><div className="btn-row"><Link to="/our-work" className="btn btn-light">Explore Our Work <ArrowUpRight size={17} /></Link><Link to="/contact" className="btn btn-outline-light">Contact Us <ArrowUpRight size={17} /></Link></div></div></section>
      </div>
    </div>
  )
}
