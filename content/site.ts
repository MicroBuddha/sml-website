// ─────────────────────────────────────────────────────────────────────────
// SITE-WIDE SETTINGS — navigation, footer and contact basics.
// ─────────────────────────────────────────────────────────────────────────

export const LAB_NAME = 'Sensing & Monitoring Lab'
export const LAB_EMAIL = 'npunjabi@iitb.ac.in'
export const LAB_AFFILIATION = 'Koita Centre for Digital Health, IIT Bombay'

// Main menu (top bar). Edit the order or labels here.
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/people', label: 'People' },
  { href: '/publications', label: 'Publications' },
  { href: '/outreach', label: 'Outreach' },
]

// Highlighted button at the right end of the menu.
export const navCta = { href: '/connect', label: 'Connect' }

// Footer link columns.
export const footerLinks = [
  {
    heading: 'Lab',
    links: [
      { href: '/projects', label: 'Projects' },
      { href: '/people', label: 'People' },
      { href: '/publications', label: 'Publications' },
    ],
  },
  {
    heading: 'Outreach',
    links: [
      { href: '/outreach', label: 'Workshops & events' },
      { href: '/course', label: 'Courses' },
      { href: '/foundation', label: 'Foundation' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/connect?type=internship#apply', label: 'Apply for an internship' },
      { href: '/connect?type=collaboration#apply', label: 'Collaborate with us' },
      { href: '/connect#visit', label: 'Visit the lab' },
      { href: `mailto:${LAB_EMAIL}`, label: 'Email the PI' },
    ],
  },
]
