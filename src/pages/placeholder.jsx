import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const pageCopy = {
  'About Us': {
    eyebrow: 'About the Foundation',
    title: 'A Section 8 company, incorporated in 2024.',
    text: 'The Foundation was incorporated on 23 February 2024 under the Companies Act, 2013. Its registered-record location is Bap, Jodhpur, Rajasthan. This date records legal incorporation, not the start of charitable activities.',
    href: '/#transparency',
    action: 'View legal information',
  },
  'Our Initiatives': {
    eyebrow: 'Our Initiatives',
    title: 'Programmes will be listed when verified.',
    text: 'The Foundation has not yet supplied initiative names or descriptions for publication. No service areas are inferred from the organisation’s logo or name.',
    href: '/#initiatives',
    action: 'View initiative status',
  },
  Campaigns: {
    eyebrow: 'Campaigns',
    title: 'No campaigns are published yet.',
    text: 'Campaign details and authorised contribution instructions must be confirmed by the Foundation before they appear here.',
    href: '/#contact',
    action: 'View contact status',
  },
  Gallery: {
    eyebrow: 'Stories & Gallery',
    title: 'Approved stories will appear here.',
    text: 'No project photographs or case studies have been supplied. Identifiable people and sensitive locations require appropriate consent before publication.',
    href: '/#gallery',
    action: 'View gallery status',
  },
  'Get Involved': {
    eyebrow: 'Get Involved',
    title: 'Ways to participate need confirmation.',
    text: 'Volunteer opportunities, partnerships and donation arrangements have not been confirmed for publication. Please check the Foundation’s verified contact details before sharing personal information or making a contribution.',
    href: '/#contact',
    action: 'View contact status',
  },
  Contact: {
    eyebrow: 'Contact',
    title: 'Public contact details are pending.',
    text: 'A verified public email address, phone number or visiting address has not been provided. The registered-record location is shown for identification only.',
    href: '/#contact',
    action: 'View contact status',
  },
  Donate: {
    eyebrow: 'Donation Information',
    title: 'No payment method is published.',
    text: 'An authorised payment provider and verified donation instructions have not been supplied. This page does not accept payments or imply tax benefits.',
    href: '/#transparency',
    action: 'View legal information',
  },
  'Privacy Policy': {
    eyebrow: 'Privacy',
    title: 'Privacy policy requires Foundation review.',
    text: 'This informational website currently has no contact form. The Foundation must approve a privacy notice before any personal information is collected through this site.',
    href: '/',
    action: 'Return to homepage',
  },
  'Terms & Conditions': {
    eyebrow: 'Terms of Use',
    title: 'Terms require Foundation review.',
    text: 'The Foundation has not supplied approved terms of use. No donation or service agreement is offered through this website.',
    href: '/',
    action: 'Return to homepage',
  },
}

export default function Placeholder({ title }) {
  const copy = pageCopy[title] ?? {
    eyebrow: 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION',
    title: 'This page is not available.',
    text: 'The requested page could not be found.',
    href: '/',
    action: 'Return to homepage',
  }

  return (
    <section className="page-ph container">
      <span className="eyebrow">{copy.eyebrow}</span>
      <h1>{copy.title}</h1>
      <p>{copy.text}</p>
      <div className="page-actions">
        <Link to={copy.href} className="btn btn-primary">{copy.action} <ArrowUpRight size={17} /></Link>
        <Link to="/" className="text-link">Back to home <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  )
}