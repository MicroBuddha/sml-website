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
  eyebrow: 'IIT Bombay · KCDH · Sensing & Monitoring Lab',
  titleLines: [
    { text: 'Building the future of' },
    { em: 'digital health' },
    { text: 'diagnostics.' },
  ] as Array<{ text?: string; em?: string }>,
  description:
    'We design end-to-end screening and diagnostic systems that bring ' +
    'clinical-grade sensing to the point of need — from remote villages to ' +
    'neonatal wards.',
  primaryCta: { label: 'Our Research', href: '/research' },
  secondaryCta: { label: 'Publications', href: '/publications' },
  // Small stat chips on the PI card.
  stats: [
    { num: '5', label: 'Focus Areas' },
    { num: '8+', label: 'Team Members' },
  ],
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
// Shown as a dynamic, auto-scrolling ticker on the homepage. To add a partner,
// just append an entry. `logo` and `url` are optional — if there's no logo the
// ticker shows the name as text.
export interface Collaborator {
  name: string
  logo?: string // e.g. '/images/collaborators/iitb.png'
  url?: string
}

export const collaborators: Collaborator[] = [
  { name: 'Koita Centre for Digital Health', url: 'https://www.kcdh.iitb.ac.in' },
  { name: 'IIT Bombay', url: 'https://www.iitb.ac.in' },
  { name: 'Tata Memorial Hospital' },
  { name: 'ASHA Community Health Workers' },
  { name: 'AIIMS' },
  { name: 'Wadhwani AI' },
  { name: 'National Health Mission' },
  { name: 'Rural Health Centres' },
]

/* ── TESTIMONIALS ───────────────────────────────────────────────────────── */
// Add or edit testimonials here; the homepage renders them in a responsive
// grid. Keep quotes to a couple of sentences for the cleanest layout.
export interface Testimonial {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'The portable screening devices from the lab let our field workers ' +
      'reach villages that had never had access to diagnostics before. The ' +
      'impact on early detection has been remarkable.',
    author: 'Community Health Coordinator',
    role: 'Rural Health Programme',
  },
  {
    quote:
      'Working with the team bridged a real gap between engineering and the ' +
      'clinic. Their edge-deployed models held up under conditions we ' +
      'genuinely encounter in the field.',
    author: 'Clinical Collaborator',
    role: 'Partner Hospital',
  },
  {
    quote:
      'A rare group that takes a device all the way from a breadboard ' +
      'prototype to a validated tool in a health worker\u2019s hands. That ' +
      'end-to-end discipline is exactly what this space needs.',
    author: 'Research Partner',
    role: 'Digital Health Initiative',
  },
]
