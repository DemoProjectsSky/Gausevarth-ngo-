// Central SEO metadata for every public route.
// Keep titles under ~60 characters and descriptions under ~160 characters.
// Only describe things the Foundation has actually confirmed.

export const SITE_NAME = 'Gau Sevarth'
export const OFFICIAL_NAME = 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION'

// Optional: set VITE_SITE_URL (e.g. https://www.example.org) at build time to
// force the canonical domain. Otherwise the current origin is used.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

export const OG_IMAGE_PATH = '/images/gausevarth.logo.jpeg'

export const ROUTES = {
  '/': {
    title: 'Gau Seva NGO in Jodhpur, Rajasthan | Gau Sevarth',
    description:
      'Gau Sevarth is a charitable foundation in Bap, Jodhpur that cares for cows with fodder, clean water, medical care and shelter. Support gau seva today.',
    label: 'Home',
  },
  '/about': {
    title: 'About Gau Sevarth | Cow Protection Foundation, Rajasthan',
    description:
      'Learn about our mission, vision and values. Gau Sevarth is a Section 8 non-profit company based in Bap, Jodhpur, working for the care of cows.',
    label: 'About Us',
  },
  '/our-work': {
    title: 'Our Work: Cow Care, Feeding and Shelter | Gau Sevarth',
    description:
      'See how Gau Sevarth supports cows with daily fodder, clean drinking water, medical treatment and a safe, shaded shelter in Jodhpur, Rajasthan.',
    label: 'What We Do',
  },
  '/campaigns': {
    title: 'Gau Seva Campaigns: Fodder, Water, Care | Gau Sevarth',
    description:
      'Explore our campaigns for cow feeding, cool water, winter warmth and medical care, and see how your support can help cows in need.',
    label: 'Campaigns',
  },
  '/gallery': {
    title: 'Gallery: Cow Care Photos | Gau Sevarth, Jodhpur',
    description:
      'Photographs from Gau Sevarth, a cow welfare foundation in Bap, Jodhpur, Rajasthan.',
    label: 'Gallery',
  },
  '/get-involved': {
    title: 'Get Involved in Gau Seva | Gau Sevarth, Jodhpur',
    description:
      'Find ways to support cow welfare with Gau Sevarth. Reach out to learn how you can take part in gau seva.',
    label: 'Get Involved',
  },
  '/contact': {
    title: 'Contact Gau Sevarth | Bap, Jodhpur, Rajasthan',
    description:
      'Contact the Gau Sevarth team in Bap, Jodhpur by phone, WhatsApp, email or the contact form for donations, volunteering and questions.',
    label: 'Contact',
  },
  '/donate': {
    title: 'Donate for Cow Welfare | Gau Seva Donation | Gau Sevarth',
    description:
      'Donate for cow feeding, medical care and shelter. Pay by UPI QR or bank transfer to GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION.',
    label: 'Donate',
  },
  '/privacy': {
    title: 'Privacy Policy | Gau Sevarth',
    description: 'How Gau Sevarth collects, uses and protects your information.',
    label: 'Privacy Policy',
  },
  '/terms': {
    title: 'Terms & Conditions | Gau Sevarth',
    description: 'Terms and conditions for using the Gau Sevarth website.',
    label: 'Terms & Conditions',
  },
}

export const NOT_FOUND_META = {
  title: 'Page not found | Gau Sevarth',
  description: 'The page you are looking for could not be found.',
}
