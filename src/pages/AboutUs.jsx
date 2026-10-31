import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2, Eye, FileText, HeartHandshake, ShieldCheck, UsersRound } from 'lucide-react'
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

export default function AboutUs() {
  const { officialName, incorporatedOn, organisationType, governingLaw, cin, section8LicenceNumber,
    registeredRecordLocation, legalClarification, story, missionStatement, visionStatement,
    values, objectives, milestones, leadership, founders } = foundationContent

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
            <p>Gau Sevarth is a Section 8 non-profit company in Bap, Jodhpur, Rajasthan, caring for cows with fodder, clean water, medical treatment and shelter. Know who we are, what we do and how you can walk with us.</p>
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
              <h2 id="story-title">Seva for every cow, every day.</h2>
              <p>{story}</p>
              <div className="about-photos">
                <figure className="ap-a"><img src="/images/about-who-1.jpg" alt="Cows resting at the gaushala" /></figure>
                <figure className="ap-b"><img src="/images/about-who-2.jpg" alt="A calf at the gaushala" /></figure>
                <figure className="ap-c"><img src="/images/about-herd-1.jpg" alt="The herd at Gau Sevarth" /></figure>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section about-purpose" aria-labelledby="purpose-title">
          <div className="container">
            <div className="section-heading about-heading"><span className="eyebrow">Our direction</span><h2 id="purpose-title">Mission &amp; vision</h2><p>What we are working towards, and how we go about it.</p></div>
            <div className="about-purpose-grid">
              <Reveal className="about-purpose-card"><div className="about-icon"><ShieldCheck aria-hidden="true" /></div><span className="card-kicker">01 / MISSION</span><h3>Our mission</h3><p>{missionStatement}</p></Reveal>
              <Reveal className="about-purpose-card"><div className="about-icon"><Eye aria-hidden="true" /></div><span className="card-kicker">02 / VISION</span><h3>Our vision</h3><p>{visionStatement}</p></Reveal>
            </div>
          </div>
        </section>

        <section className="section about-values" aria-labelledby="values-title">
          <div className="container"><div className="section-heading about-heading"><span className="eyebrow">How we show up</span><h2 id="values-title">Our values</h2><p>The principles we try to follow in everything we do.</p></div>
            <div className="values-grid">{values.map((value, index) => { const Icon = valueIcons[index % valueIcons.length]; return <Reveal className="value-card" key={value.title}><Icon aria-hidden="true" /><h3>{value.title}</h3><p>{value.description}</p></Reveal> })}</div>
          </div>
        </section>

        <section className="section about-objectives" aria-labelledby="objectives-title">
          <div className="container about-two-col"><div><span className="eyebrow">What we aim for</span><h2 id="objectives-title">Our objectives</h2><p>Our work is simple: look after the cows, and make it easy for good people to help.</p></div>
            <div className="approval-panel"><ul>{objectives.map(objective => <li key={objective}>{objective}</li>)}</ul></div>
          </div>
        </section>

        <section className="section about-journey" aria-labelledby="journey-title">
          <div className="container"><div className="section-heading about-heading"><span className="eyebrow">Our journey</span><h2 id="journey-title">Our journey so far</h2></div>
            <ol className="about-timeline">{milestones.map(item => <li key={`${item.date}-${item.title}`}><time>{item.date}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}<li className="timeline-pending"><time>Next chapter</time><div><h3>More to come</h3><p>New campaigns, shelter improvements and stories from the gaushala will be added here as we grow.</p></div></li></ol>
          </div>
        </section>

        <section className="section about-legal" aria-labelledby="legal-title">
          <div className="container about-two-col"><div><span className="eyebrow">Transparency</span><h2 id="legal-title">Legal information</h2><p>{legalClarification}</p></div><dl className="about-legal-list"><div><dt>Official name</dt><dd>{officialName}</dd></div><div><dt>Company type</dt><dd>{organisationType} under the {governingLaw}</dd></div><div><dt>Incorporation date</dt><dd>{incorporatedOn}</dd></div><div><dt>CIN</dt><dd>{cin}</dd></div><div><dt>Section 8 licence number</dt><dd>{section8LicenceNumber}</dd></div><div><dt>Registered-record location</dt><dd>{registeredRecordLocation}</dd></div></dl></div>
        </section>

        <section className="section about-readiness" aria-labelledby="readiness-title">
          <div className="container readiness-grid"><div><span className="eyebrow">Open and accountable</span><h2 id="readiness-title">Open and honest with donors.</h2><p>Our registration details are listed above, and our bank and UPI details are on the donate page. Please check the account name before you pay. No tax-exemption (such as 80G) is implied unless the Foundation confirms it.</p></div><div className="readiness-items"><div><FileText aria-hidden="true" /><span>Registration<small>Section 8 licence {section8LicenceNumber}</small></span></div><div><UsersRound aria-hidden="true" /><span>Donation account<small>UCO Bank, verified on the donate page</small></span></div></div></div>
        </section>

        <section className="section about-leadership" aria-labelledby="leadership-title"><div className="container"><div className="section-heading about-heading"><span className="eyebrow">Leadership</span><h2 id="leadership-title">People behind the Foundation.</h2><p>The two founders who started Gau Sevarth with one belief: no cow should go without care.</p></div>{founders.length ? <div className="leadership-grid">{founders.map((person, index) => <article className="leader-card" key={person.image}><img src={person.image} alt={person.imageAlt} loading="lazy" /><h3>{person.name || `Founder ${index + 1}`}</h3><p>{person.role}, Gau Sevarth</p></article>)}</div> : leadership.length ? <div className="leadership-grid">{leadership.map(person => <article className="leader-card" key={person.name}>{person.photo && <img src={person.photo} alt={person.photoAlt || `${person.name} profile`} />}<h3>{person.name}</h3><p>{person.designation}</p><small>{person.bio}</small></article>)}</div> : <div className="leadership-empty"><UsersRound aria-hidden="true" /><span>Approved leadership profiles are not yet available for publication.</span></div>}</div></section>

        <section className="section about-gallery" aria-labelledby="gallery-title"><div className="container"><div className="section-heading about-heading"><span className="eyebrow">Gallery</span><h2 id="gallery-title">A glimpse of the herd.</h2><p>More photos are in the full gallery.</p></div><div className="about-photo-grid">{[1,2,3,4,5,6,7,8].slice(0, 6).map(n => <img key={n} src={`/images/gallery-0${n}.jpg`} alt="Cows and calves at the gaushala" loading="lazy" />)}</div><div className="about-gallery-more"><Link to="/gallery" className="btn btn-primary">Open full gallery <ArrowUpRight size={17} /></Link></div></div></section>

        <section className="about-cta" aria-labelledby="cta-title"><div className="container about-cta-inner"><div><span className="eyebrow">Stay connected</span><h2 id="cta-title">Be Part of Our Journey</h2><p>Support the cows with a donation, give some time as a volunteer, or simply say hello.</p></div><div className="btn-row"><Link to="/our-work" className="btn btn-light">Our Work <ArrowUpRight size={17} /></Link><Link to="/contact" className="btn btn-outline-light">Contact Us <ArrowUpRight size={17} /></Link></div></div></section>
      </div>
    </div>
  )
}
