// ─────────────────────────────────────────────────────────────────────────
// PROJECTS — shown on /projects and as "featured" cards on the homepage.
// ─────────────────────────────────────────────────────────────────────────
// TO ADD A PROJECT: copy one block, give it a unique `id`, fill the fields.
// Don't forget the comma after the closing brace `},` — a missing comma
// breaks the Vercel build silently.
//
// area         → must be one of the keys in `projectAreas` below
// status       → 'ongoing' | 'completed'
// featured     → true = also shown on the homepage (keep it to ~3)
// image        → optional, put the file in /public/images/research/
// publications → optional list of `_id`s from content/publications.ts;
//                they appear as "Related papers" in the project drawer.
//
// NOTE: descriptions below were drafted from team bios and paper titles.
// Please have each project owner check and refine their entry.
// ─────────────────────────────────────────────────────────────────────────

export const projectAreas = {
  'oral-health': { label: 'Oral health imaging', color: '#3c3489' },
  wearables: { label: 'Wearables & hardware', color: '#b26a0e' },
  acoustic: { label: 'Acoustic diagnostics', color: '#1f7a6d' },
  'edge-ai': { label: 'Edge AI', color: '#7a3b8f' },
  'language-models': { label: 'Language models for health', color: '#2f5da8' },
  biosensing: { label: 'Optical biosensing', color: '#a33a3a' },
} as const

export type ProjectArea = keyof typeof projectAreas

export interface Project {
  id: string
  title: string
  area: ProjectArea
  status: 'ongoing' | 'completed'
  summary: string // one or two sentences for the card
  why?: string // the problem and who it affects
  how?: string // methods, devices, models
  outcomes?: string[]
  team?: string[] // plain names
  tags?: string[]
  image?: string
  publications?: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'oral-precancer-screening',
    title: 'AI screening for oral cancer and pre-cancer',
    area: 'oral-health',
    status: 'ongoing',
    featured: true,
    summary:
      'Deep learning that finds and grades oral potentially malignant disorders (OPMD) from ordinary photographs of the mouth.',
    why:
      'Oral cancer is often caught late in India. Most early lesions are visible, but specialists who can recognise them are scarce outside cities.',
    how:
      'Segmentation and classification models — transformer segmenters, mixture-of-experts classifiers and multimodal fusion — trained on multicentre clinical photographs.',
    team: ['Prof. Nirmal Punjabi', 'Buddhadev Goswami'],
    tags: ['Computer vision', 'Segmentation', 'Mixture of experts'],
    publications: [
      'opmd-multimodal-isbi-2025',
      'opmd-moe-isbi-2025',
      'opmd-transformer-icpr-2024',
      'opmd-transfer-ijmpo-2024',
    ],
  },
  {
    id: 'intraoral-camera',
    title: 'Intraoral camera',
    area: 'wearables',
    status: 'ongoing',
    featured: true,
    summary:
      'A low-cost camera built to image the inside of the mouth consistently, so screening models get the same kind of picture every time.',
    how:
      'Electronics designed in-house: prototyping, PCB design, fabrication, testing and performance evaluation.',
    team: ['Prof. Nirmal Punjabi'],
    tags: ['Hardware', 'Imaging', 'PCB design'],
  },
  {
    id: 'oral-impedance',
    title: 'Oral bio-impedance device',
    area: 'wearables',
    status: 'ongoing',
    summary:
      'A handheld probe that measures the electrical impedance of oral tissue as an extra, non-visual signal for screening.',
    team: ['Prof. Nirmal Punjabi'],
    tags: ['Hardware', 'Bio-impedance'],
  },
  {
    id: 'smart-ring',
    title: 'Smart ring for physiological monitoring',
    area: 'wearables',
    status: 'ongoing',
    summary: 'A ring-sized wearable that tracks key physiological parameters continuously.',
    team: ['Amrita Shirke'],
    tags: ['Wearable', 'Low power'],
  },
  {
    id: 'colour-standardisation',
    title: 'Colour standardisation for health images',
    area: 'oral-health',
    status: 'ongoing',
    summary:
      'Algorithms that correct colour across phones and lighting, so image-based diagnosis gives the same answer wherever the photo is taken.',
    why: 'Mass screening relies on images from many different devices. Colour drift between them hurts model reliability.',
    team: ['Rajalakshmi S.'],
    tags: ['Computer vision', 'Colour science'],
  },
  {
    id: 'wearable-diabetes',
    title: 'Wearable biomarkers for diabetes prediction',
    area: 'wearables',
    status: 'ongoing',
    featured: true,
    summary:
      'Predicting diabetes risk from biomarkers captured by wearable sensors, with monitoring personalised to each person.',
    team: ['Bipasha Sarkar'],
    tags: ['Wearables', 'Personalised health'],
  },
  {
    id: 'analog-front-ends',
    title: 'Low-power analog front-ends',
    area: 'wearables',
    status: 'ongoing',
    summary: 'Sensor interface circuits that pull clean signals from the body while running on a small battery.',
    team: ['Amrita Shirke'],
    tags: ['Analog design', 'Prototyping'],
  },
  {
    id: 'acoustic-diagnosis',
    title: 'Listening for disease: heart, lung and cough sounds',
    area: 'acoustic',
    status: 'ongoing',
    summary:
      'AI that reads heart sounds, lung sounds and coughs, and detects sleep apnoea from audio.',
    team: ['Nikita Mahale', 'Mayurakshi Mukherji'],
    tags: ['Audio AI', 'Signal processing'],
  },
  {
    id: 'edge-deployment',
    title: 'Running models on the device',
    area: 'edge-ai',
    status: 'ongoing',
    summary:
      'Making models small and fast enough for edge hardware — through network design, training methods, compression and partitioning.',
    why: 'Field clinics often have weak or no internet, so diagnosis has to happen on the device itself.',
    team: ['Sameer Kishor Nilkhan'],
    tags: ['Model compression', 'Embedded'],
  },
  {
    id: 'mental-health-llms',
    title: 'Language models for mental health',
    area: 'language-models',
    status: 'ongoing',
    summary:
      'Knowledge-grounded fine-tuning, multi-turn dialogue benchmarks and training resources for mental-health conversational AI.',
    team: ['Suraj Sahadev Racha'],
    tags: ['LLMs', 'Benchmarks'],
    publications: ['omind-2026', 'mhqa-2025'],
  },
  {
    id: 'optical-biosensing',
    title: 'Fibre-optic and nanoparticle biosensors',
    area: 'biosensing',
    status: 'ongoing',
    summary:
      'Optical sensors — fibre-optic refractometers, immunosensors and nanoparticle probes — that detect metal ions, bacteria and biomarkers.',
    team: ['Prof. Nirmal Punjabi'],
    tags: ['Optics', 'Nanomaterials'],
    publications: [
      'cobalt-apscon-2026',
      'fiber-gold-tio2-2024',
      'tio2-refractometer-ipc-2023',
      'binding-kinetics-2021',
      'heavy-metal-2019',
      'mercury-ions-2019',
    ],
  },
  {
    id: 'caries-vlm',
    title: 'Dental caries screening with vision-language models',
    area: 'oral-health',
    status: 'completed',
    summary: 'Screening for tooth decay from multimodal dental data using vision-language models.',
    team: ['Neena S Nair'],
    tags: ['VLMs', 'Dentistry'],
  },
  {
    id: 'erythroblast',
    title: 'Erythroblast differentiation from blood smears',
    area: 'oral-health',
    status: 'completed',
    summary: 'A classifier-enhanced deep learning model that tells erythroblast stages apart with very little labelled data.',
    team: ['Buddhadev Goswami'],
    tags: ['Haematology', 'Low-data learning'],
    publications: ['erythroblast-icpr-2024'],
  },
]
