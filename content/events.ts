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
  {
    _id: 'ws-data-science-digital-health',
    title: 'Introduction to Data Science Techniques for Digital Health Applications',
    category: 'workshop',
    date: '2026-07-22', // approximate — set the actual workshop date
    location: 'Koita Centre for Digital Health (KCDH), IIT Bombay',
    description:
      'The first of two back-to-back Computer Vision for Healthcare workshops, held under the guidance of ' +
      'Prof. Nirmal Punjabi. An introduction to data science techniques for digital health applications, ' +
      'aimed at students. Co-coordinated by Suraj Racha.',
    link: 'https://www.linkedin.com/posts/kcdh-iitb_digitalhealth-machinelearning-healthcareai-activity-7442911709159419905-Nf1b',
    people: ['Prof. Nirmal Punjabi', 'Buddhadev Goswami', 'Suraj Racha'],
    // Add photos here and they replace the placeholder automatically:
    // gallery: ['/images/events/ws-datascience-1.jpg', '/images/events/ws-datascience-2.jpg'],
  },

  {
    _id: 'ws-ai-in-healthcare',
    title: 'Artificial Intelligence (AI) in Healthcare',
    category: 'workshop',
    date: '2026-07-24', // approximate — set the actual workshop date
    location: 'Koita Centre for Digital Health (KCDH), IIT Bombay',
    description:
      'The second of two back-to-back Computer Vision for Healthcare workshops, held under the guidance of ' +
      'Prof. Nirmal Punjabi. A workshop on the role of Artificial Intelligence in healthcare, aimed at doctors, ' +
      "conducted by Prof. Kalyani Addya. Bipasha Sarkar and Nikita Mahale volunteered during the workshop.",
    link: 'https://www.linkedin.com/posts/kcdh-iitb_digitalhealth-machinelearning-healthcareai-activity-7442911709159419905-Nf1b',
    people: ['Prof. Nirmal Punjabi', 'Prof. Kalyani Addya', 'Bipasha Sarkar', 'Nikita Mahale', 'Buddhadev Goswami'],
    // Add photos here and they replace the placeholder automatically:
    // gallery: ['/images/events/ws-ai-healthcare-1.jpg', '/images/events/ws-ai-healthcare-2.jpg'],
  },

  {
    _id: 'life-in-the-lab',
    title: 'Life in the Lab',
    category: 'event',
    date: '2026-01-01',
    location: 'Sensing & Monitoring Lab, IIT Bombay',
    description: 'Snapshots from day-to-day work and activities in the lab.',
    gallery: [
      '/images/events/lab_photo.jpg',
      '/images/events/lab_photo2.jpg',
      '/images/events/lab_photo3.jpg',
      '/images/events/lab_photo4.jpg',
    ],
  },

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
