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

  // Example — copy this block for each additional team member, then delete
  // the comment markers:
  //
  // {
  //   _id: 'jane-doe',
  //   name: 'Jane Doe',
  //   role: 'PhD Student',
  //   seniorityOrder: 1,
  //   photo: '/images/people/jane-doe.jpg',
  //   email: 'jane@iitb.ac.in',
  //   googleScholar: 'https://scholar.google.com/citations?user=XXXXXXX',
  //   linkedin: 'https://www.linkedin.com/in/jane-doe/',
  //   bio: 'Short 2–4 sentence biography.',
  // },
]
