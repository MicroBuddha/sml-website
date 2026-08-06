// Workshops, events, and achievements shown on the /workshops-events page,
// and the "Life in the Lab" strip on the homepage (pulled from `gallery`/`coverImage`).
//
// `gallery`: put photos in /public/images/events/ and list their paths — if
// there's more than one, the site shows an auto-rotating carousel.

export interface EventItem {
  _id: string
  title: string
  category: 'workshop' | 'event' | 'achievement'
  date?: string // ISO date, e.g. '2026-03-14'
  location?: string
  description?: string
  link?: string
  coverImage?: string
  gallery?: string[]
  people?: string[] // plain names
}

export const events: EventItem[] = [
  // Example — copy this block per item, then delete the comment markers:
  //
  // {
  //   _id: 'dh-workshop-2026',
  //   title: 'Medical Image Data Science Workshop',
  //   category: 'workshop',
  //   date: '2026-03-14',
  //   location: 'IIT Bombay',
  //   description: 'A hands-on workshop on medical image analysis for students and clinicians.',
  //   link: 'https://example.com',
  //   gallery: ['/images/events/dh-workshop-1.jpg', '/images/events/dh-workshop-2.jpg'],
  //   people: ['Prof. Nirmal Punjabi'],
  // },
]
