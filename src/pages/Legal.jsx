import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { foundationContent } from '../content/foundationContent'
import { Page, PageHero } from '../components/Shared'
import './gs-pages.css'

const UPDATED = '26 October 2026'

const privacy = [
  { id: 'who', title: 'Who we are', body: [
    `This website belongs to ${foundationContent.officialName}, a Section 8 company registered at ${foundationContent.registeredRecordLocation.replace(' - ', ', ')}. In this policy, "we" and "us" mean the Foundation.`,
  ] },
  { id: 'collect', title: 'What we collect', body: [
    'This website has no accounts, no sign-up and no payment form. We do not ask you to type personal details to read it.',
    'If you choose to write to us by email, phone or WhatsApp, we receive whatever you send (for example your name and message). We use it only to reply to you.',
    'Donations are paid through your own UPI app or bank. We never see your UPI PIN, card details or banking password.',
  ] },
  { id: 'third', title: 'Third-party services', body: [
    'To work properly this site loads fonts from Google Fonts and, on the Contact page, a map from Google Maps. Share buttons open WhatsApp or Facebook. These services may receive your IP address and browser details under their own privacy policies.',
    'We do not run advertising or tracking cookies on this website.',
  ] },
  { id: 'use', title: 'How we use information', body: [
    'Messages are used to answer your question, arrange a visit or discuss helping the Foundation. We do not sell your information and we do not share it for marketing.',
  ] },
  { id: 'choices', title: 'Your choices', body: [
    'You can ask us to delete any message you have sent us, or to correct it. Use the contact details on the Contact page.',
  ] },
  { id: 'changes', title: 'Changes to this policy', body: [
    'If we change how this website works, we will update this page and the date below.',
  ] },
]

const terms = [
  { id: 'use', title: 'Using this website', body: [
    'This website shares information about the Foundation and its care of cows. By using it you agree to these terms. If you do not agree, please do not use the site.',
  ] },
  { id: 'info', title: 'About our information', body: [
    'We try to keep everything accurate and up to date, but we cannot promise that every detail is complete or free of mistakes. Photos are shown to illustrate our work.',
  ] },
  { id: 'donate', title: 'Donations', body: [
    'All donations are voluntary and go towards the Foundation\'s work. No tax-exemption (such as under Section 80G) is offered or implied unless the Foundation has confirmed it in writing.',
    'Before you pay, please check that the name shown in your UPI or banking app is GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION. We are not responsible for payments sent to any other account.',
    'If you believe a payment was made by mistake, contact us soon with the date, amount and transaction reference.',
  ] },
  { id: 'ip', title: 'Logo, photos and text', body: [
    'The Foundation\'s name, logo, photos and text belong to the Foundation. Please ask before using them, other than for sharing a link to this site.',
  ] },
  { id: 'links', title: 'Links to other sites', body: [
    'This site may link to other websites such as Google Maps or WhatsApp. We do not control them and are not responsible for their content.',
  ] },
  { id: 'law', title: 'Law and changes', body: [
    'These terms are governed by the laws of India. We may update them from time to time, and the date below shows the latest version.',
  ] },
]

function Legal({ theme, kicker, title, lead, sections, other }) {
  return (
    <Page theme={theme}>
      <PageHero kicker={kicker} title={title} lead={lead} />
      <section className="gp-section gp-legal">
        <aside className="gp-toc" aria-label="On this page" data-anim="left">
          <b>On this page</b>
          <ol>
            {sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
          </ol>
          <Link to={other.to} className="gs-link">{other.label} <ArrowUpRight size={16} /></Link>
        </aside>
        <div className="gp-legal-body">
          {sections.map((s, i) => (
            <article key={s.id} id={s.id} data-anim="up">
              <span className="gp-legal-no">{String(i + 1).padStart(2, '0')}</span>
              <h2>{s.title}</h2>
              {s.body.map((p, j) => <p key={j}>{p}</p>)}
            </article>
          ))}
          <p className="gp-legal-date" data-anim="up">Last updated: {UPDATED}</p>
        </div>
      </section>
    </Page>
  )
}

export function Privacy() {
  return <Legal theme="brown" kicker="Privacy Policy" title="Privacy Policy" lead="Plain-language notes on what this website does, and does not do, with your information." sections={privacy} other={{ to: '/terms', label: 'Read the terms of use' }} />
}

export function Terms() {
  return <Legal theme="brown" kicker="Terms of Use" title="Terms of Use" lead="A few clear rules for using this website and for giving to the Foundation." sections={terms} other={{ to: '/privacy', label: 'Read the privacy policy' }} />
}
