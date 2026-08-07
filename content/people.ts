// People shown on the /people page and the homepage PI card.
//
// TO ADD SOMEONE: copy an existing entry, give it a unique `_id`, and fill in
// the fields. Roles must be one of: 'PI', 'PhD Student', 'Masters Student',
// 'Undergraduate', 'Research Staff', 'Alumni' — these control which section
// of the People page a person appears in.
//
// `photo`: put the image file in /public/images/people/ and reference it as
// e.g. '/images/people/nirmal.jpg'. Leave undefined for a placeholder avatar.
//
// `seniorityOrder`: controls sort order *within* a role group — lower numbers
// appear first (e.g. a 3rd-year PhD student = 1, a 1st-year = 4). People
// without a value are sorted alphabetically after those with one.
export interface Person {
  _id: string
  name: string
  role: 'PI' | 'PhD Student' | 'Masters Student' | 'Undergraduate' | 'Research Staff' | 'Alumni'
  seniorityOrder?: number
  photo?: string
  email?: string
  googleScholar?: string
  linkedin?: string
  bio?: string
}

export const people: Person[] = [
  {
    _id: 'nirmal-punjabi',
    name: 'Prof. Nirmal Punjabi',
    role: 'PI',
    photo: '/images/people/nirmal.jpeg',
    email: 'npunjabi@iitb.ac.in',
    googleScholar: 'https://scholar.google.com/citations?hl=en&user=86tKGf8AAAAJ',
    linkedin: 'https://www.linkedin.com/in/npunjabi108/',
    bio:
      'Principal Investigator of the Sensing & Monitoring Lab at the Koita Centre for Digital Health, IIT Bombay. ' +
      'Placeholder bio — replace with a short description of research interests and background.',
  },

  {
    _id: 'buddhadev-goswami',
    name: 'Buddhadev Goswami',
    role: 'PhD Student',
    seniorityOrder: 1, // joined 2022
    photo: '/images/people/buddhadev.jpg',
    email: '',
    googleScholar: 'https://scholar.google.com/citations?user=zlPtcn4AAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/buddha92/',
    bio: 'Working in the field of computer vision for healthcare, at the Koita Centre for Digital Health (KCDH) — oral pre-cancer detection.',
  },

  {
    _id: 'rajalakshmi-s',
    name: 'Rajalakshmi S.',
    role: 'PhD Student',
    seniorityOrder: 2, // joined 2024
    photo: '/images/people/rajalakshmi.jpg',
    email: '',
    googleScholar: '',
    linkedin: 'https://www.linkedin.com/in/rajalakshmi-sivaramakrishnan-ba942720a',
    bio: 'Second-year PhD student specializing in computer vision, focused on developing color standardization algorithms for digital health images. Research aims to enhance the consistency of image-based diagnostics, enabling reliable mass screening and diagnosis in resource-limited settings.',
  },

  {
    _id: 'bipasha-sarkar',
    name: 'Bipasha Sarkar',
    role: 'PhD Student',
    seniorityOrder: 3, // joined 2025
    photo: '/images/people/bipasha.jpg',
    email: '',
    googleScholar: 'https://scholar.google.com/citations?user=G_MUb2cAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/bipasha-sarkar-497b9628a',
    bio: "PhD student (India AI Fellow). Completed bachelor's and master's degrees in Microbiology, and previously worked as a Junior Research Fellow in the Department of Biosciences and Bioengineering, IIT Bombay. Research focuses on biomarker-based diabetes prediction using wearable sensors and personalized health monitoring.",
  },

  {
    _id: 'nikita-mahale',
    name: 'Nikita Mahale',
    role: 'Masters Student',
    photo: '/images/people/nikita.jpg',
    email: '',
    googleScholar: '',
    linkedin: 'https://www.linkedin.com/in/nikitamahale15',
    bio: 'Pursuing an M.S. by Research at the Koita Centre for Digital Health (KCDH), IIT Bombay. Completed a B.Pharm. and was selected as an IndiaAI Fellow. Research focuses on AI-based acoustic signal processing for disease diagnosis — heart sounds, lung sounds, cough analysis, and sleep apnea detection.',
  },

  {
    _id: 'sameer-kishor-nilkhan',
    name: 'Sameer Kishor Nilkhan',
    role: 'Masters Student',
    photo: '/images/people/Sameer.jpg',
    email: '',
    googleScholar: '',
    linkedin: 'https://www.linkedin.com/in/sameer302/',
    bio: 'Working in the domain of edge AI, exploring optimizations at different stages of AI/ML deployment on edge devices — from network design and training methods to model compression and network partitioning.',
  },

  {
    _id: 'neena-s-nair',
    name: 'Neena S Nair',
    role: 'Alumni',
    photo: '/images/people/neena.jpg',
    email: '',
    googleScholar: '',
    linkedin: 'https://www.linkedin.com/in/dr-neena-s-nair-359a292a7',
    bio: 'Department of Biosciences and Bioengineering (BSBE). Worked on AI in dentistry — dental caries screening from multimodal data using VLMs.',
  },

{
    _id: 'amrita-shirke',
    name: 'Amrita Shirke',
    role: 'PhD Student',
    seniorityOrder: 4,
    // photo: download from https://drive.google.com/open?id=1STIVPuA3okOC-lAb9chSCdLls9tPufzU
    //        save to /public/images/people/amrita.jpg, then set: photo: '/images/people/amrita.jpg'
    photo: '',
    email: '',
    googleScholar: 'https://scholar.google.com/citations?user=DZUWIMQAAAAJ&hl=en',
    // NOTE: this is a personal "profile/me" link that only works when Amrita is
    // logged in — replace with her public profile URL (linkedin.com/in/...).
    linkedin: 'https://www.linkedin.com/mwlite/profile/me?trk=p_mwlite_feed-secondary_nav',
    bio: 'PhD student at the Koita Centre for Digital Health (KCDH), IIT Bombay. Research focuses on wearable sensor design, low-power analog front-ends, and prototype building.',
  },

  {
    _id: 'mayurakshi-mukherji',
    name: 'Mayurakshi Mukherji',
    role: 'PhD Student',
    seniorityOrder: 5,
    // photo: download from https://drive.google.com/open?id=1D2m7lYRFJG3neJEGNBfLXtKMVXCk2sCy
    //        save to /public/images/people/mayurakshi.jpg, then set: photo: '/images/people/mayurakshi.jpg'
    photo: '',
    email: '',
    googleScholar: 'https://scholar.google.com/citations?hl=en&user=fMp6E_oAAAAJ',
    linkedin: 'https://www.linkedin.com/in/mayurakshi-mukherji-ba4a83144',
    bio: 'PhD student at the Koita Centre for Digital Health (KCDH), IIT Bombay. Research focuses on intelligent acoustic systems for healthcare, with applications in AI-based diagnosis, monitoring, and early detection of diverse pathologies.',
  },

  {
    _id: 'suraj-sahadev-racha',
    name: 'Suraj Sahadev Racha',
    role: 'PhD Student',
    seniorityOrder: 6,
    // photo: download from https://drive.google.com/open?id=19zzroKaS5stxdKo3w6EItZMR09BTrnqg
    //        save to /public/images/people/suraj.jpg, then set: photo: '/images/people/suraj.jpg'
    photo: '',
    email: '',
    googleScholar: 'https://scholar.google.com/citations?user=Lq8xtrMAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/suraj-racha-a9519b186',
    bio: 'PhD student at the Koita Centre for Digital Health (KCDH), IIT Bombay. Research focuses on Large Language Models in healthcare — specifically mental health — including conversational frameworks, benchmarking, and training resources.',
  },
]
