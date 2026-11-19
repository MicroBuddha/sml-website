// ─────────────────────────────────────────────────────────────────────────
// HOMEPAGE CONTENT
// ─────────────────────────────────────────────────────────────────────────
// This file holds all the editable text and data for the homepage
// (app/page.tsx). Change copy here instead of digging through the JSX — the
// page reads everything from the exports below.
//
// IMAGES: put files in /public/images/... and reference them with a path that
// starts from /public, e.g. '/images/collaborators/iitb.png'.
// ─────────────────────────────────────────────────────────────────────────

/* ── HERO ───────────────────────────────────────────────────────────────── */
// The big intro block at the top of the page. `titleLines` is rendered line by
// line; wrap a word in {em: '...'} to give it the italic accent colour.
export const hero = {
  kicker: 'Koita Centre for Digital Health, IIT Bombay',
  title: 'Sensors, signals and AI for screening beyond the clinic.',
  description:
    'We design end-to-end screening and diagnostic systems that bring ' +
    'clinical-grade sensing to the point of need — from remote villages to ' +
    'neonatal wards.',
  primaryCta: { label: 'Explore our projects', href: '/projects' },
  secondaryCta: { label: 'Apply for an internship', href: '/connect#apply' },
}

/* ── MISSION ────────────────────────────────────────────────────────────── */
export const mission = {
  quote:
    'To pioneer and create {em}end-to-end digital health{/em} screening and ' +
    'diagnostics solutions.',
  paragraphs: [
    "The Sensing and Monitoring Lab at IIT Bombay's Koita Centre for Digital " +
      'Health bridges the gap between cutting-edge sensing hardware and ' +
      'AI-driven diagnostics — building systems that work in the real world, ' +
      'not just the lab.',
    'Our work spans portable device design, machine learning on physiological ' +
      'signals, and deployment-ready solutions for mass-screening scenarios ' +
      'where clinical infrastructure is limited or absent.',
    'We collaborate with clinicians, public health workers, and industry ' +
      'partners to validate and deploy our systems where they are needed most.',
  ],
}

/* ── HIGHLIGHTS ─────────────────────────────────────────────────────────── */
// The five things the lab wants to feature most prominently. Add, remove, or
// reorder freely — the homepage renders whatever is in this array.
export interface Highlight {
  icon: string
  title: string
  desc: string
  tag: string
}

export const highlights: Highlight[] = [
  {
    icon: '◎',
    title: 'Sensing',
    desc:
      'Multimodal biomedical sensing — optical, acoustic, electrochemical, and ' +
      'pressure — engineered into portable form factors that capture ' +
      'clinical-grade signals outside the hospital.',
    tag: 'Hardware',
  },
  {
    icon: '◈',
    title: 'Microcontrollers',
    desc:
      'Low-power embedded firmware and microcontroller platforms that acquire, ' +
      'filter, and stream physiological data reliably on constrained, ' +
      'battery-driven devices.',
    tag: 'Embedded',
  },
  {
    icon: '◇',
    title: 'Edge Devices',
    desc:
      'On-device inference at the edge — running optimised models directly on ' +
      'the sensor node so diagnostics work with intermittent or absent ' +
      'connectivity.',
    tag: 'Edge AI',
  },
  {
    icon: '◉',
    title: 'Remote Health',
    desc:
      'Screening and monitoring tools designed for frontline and community ' +
      'health workers, extending diagnostic reach to underserved and ' +
      'geographically remote populations.',
    tag: 'mHealth',
  },
  {
    icon: '◍',
    title: 'Deep Learning in Rural Settings',
    desc:
      'End-to-end deployment of deep learning models in rural, ' +
      'low-resource environments — from data collection and robust training ' +
      'to field validation and real-world rollout.',
    tag: 'Deployment',
  },
]

/* ── COLLABORATORS ──────────────────────────────────────────────────────── */
// Shown as an auto-scrolling strip on the homepage.
// TO ADD A PARTNER: append one line. `logo` and `url` are optional — with no
// logo the strip shows the name as text. Logos go in /public/images/logos/.
// TO REMOVE ONE: delete its line.
export interface Collaborator {
  name: string
  logo?: string // e.g. '/images/logos/nirdh.png'
  url?: string
}

export const collaborators: Collaborator[] = [
  { name: 'Koita Centre for Digital Health, IIT Bombay', url: 'https://www.kcdh.iitb.ac.in' },
  { name: 'ICMR – National Institute for Research in Digital Health and Data Science (NIRDH)' },
  { name: 'IIT Bombay', url: 'https://www.iitb.ac.in' },
  { name: 'ASHA Community Health Workers' },
  { name: 'AIIMS' },
  { name: 'Wadhwani AI' },
  { name: 'National Health Mission' },
  { name: 'Rural Health Centres' },
]

/* ── NEWS / ANNOUNCEMENTS ───────────────────────────────────────────────── */
// The homepage "What's new" panel cycles through these first, then adds the
// latest paper, latest workshop, open internships and a featured project
// automatically from the other content files.
// Delete an item when it's out of date. `href` and `image` are optional.
export interface NewsItem {
  label: string // small tag, e.g. 'Announcement'
  title: string
  text?: string
  href?: string
  cta?: string // button text, e.g. 'Apply now'
  image?: string // e.g. '/images/events/lab_photo.jpg'
}

export const news: NewsItem[] = [
  {
    label: 'Internships open',
    title: 'Applications are open for lab internships',
    text: 'Join live projects in bio-impedance hardware, oral lesion imaging, and language models for health.',
    href: '/connect#apply',
    cta: 'Apply now',
  },
]
