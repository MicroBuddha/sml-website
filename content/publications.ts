// Publications shown on the /publications page.
//
// Grouped automatically into "Recent" (2022 onwards) and "Earlier" sections,
// then by year within each. Filterable by type.
//
// `type` must be one of: 'journal' | 'conference' | 'workshop' | 'preprint'
// | 'thesis' | 'book-chapter'
//
// `citations`: optional — shown as a small badge. Update occasionally from
// Google Scholar; it's fine to leave out.

export interface Publication {
  _id: string
  title: string
  authors: string
  type: 'journal' | 'conference' | 'workshop' | 'preprint' | 'thesis' | 'book-chapter'
  journal?: string
  volume?: string
  pages?: string
  year: number
  link?: string
  doi?: string
  arxivId?: string
  abstract?: string
  tags?: string[]
  featured?: boolean
  citations?: number
}

// Lab Google Scholar profile — a "Scholar" link to this is shown on every entry.
export const SCHOLAR_PROFILE_URL =
  'https://scholar.google.com/citations?hl=en&user=86tKGf8AAAAJ'

export const publications: Publication[] = [
  {
    _id: 'omind-2026',
    title:
      'OMIND: Framework for Knowledge Grounded Finetuning and Multi-Turn Dialogue Benchmark for Mental Health LLMs',
    authors:
      'S. Racha, P. H. Joshi, U. Maurya, N. Yadav, M. Sharma, A. Kunisetty, et al.',
    type: 'preprint',
    journal: 'arXiv preprint',
    year: 2026,
    arxivId: '2603.25105',
    citations: 1,
    tags: ['LLMs', 'Mental Health'],
  },
  {
    _id: 'cobalt-apscon-2026',
    title: 'Dual-Mode Optical Detection of Cobalt Ions using Silica Nanoparticles',
    authors: 'P. A. Shedbale, N. Punjabi, S. Mukherji, S. Mukherji',
    type: 'conference',
    journal: 'IEEE Applied Sensing Conference (APSCON)',
    pages: 'pp. 1–4',
    year: 2026,
    tags: ['Optical Sensing', 'Nanoparticles'],
  },

  {
    _id: 'opmd-multimodal-isbi-2025',
    title:
      'Classification of Oral Potentially Malignant Disorders Using Multimodal Feature Integration',
    authors: 'B. Goswami, S. Neogi, S. Nagar, N. Punjabi, R. Gudi',
    type: 'conference',
    journal: 'IEEE 22nd International Symposium on Biomedical Imaging (ISBI)',
    pages: 'pp. 1–4',
    year: 2025,
    citations: 2,
    featured: true,
    tags: ['Oral Health', 'Multimodal'],
  },
  {
    _id: 'opmd-moe-isbi-2025',
    title: 'OPMD Classification using a Mixture of Experts Framework',
    authors: 'B. Goswami, S. Sudhakar, S. Nagar, N. Punjabi, R. Gudi',
    type: 'conference',
    journal: 'IEEE 22nd International Symposium on Biomedical Imaging (ISBI)',
    pages: 'pp. 1–4',
    year: 2025,
    tags: ['Oral Health', 'Mixture of Experts'],
  },
  {
    _id: 'mhqa-2025',
    title:
      'MHQA: A Diverse, Knowledge Intensive Mental Health Question Answering Challenge for Language Models',
    authors: 'S. Racha, P. Joshi, A. Raman, N. Jangid, M. Sharma, G. Ramakrishnan, et al.',
    type: 'preprint',
    journal: 'arXiv preprint',
    year: 2025,
    arxivId: '2502.15418',
    citations: 5,
    tags: ['LLMs', 'Mental Health'],
  },

  {
    _id: 'erythroblast-icpr-2024',
    title: 'Classifier Enhanced Deep Learning Model for Erythroblast Differentiation with Limited Data',
    authors: 'B. Goswami, A. B. Somaraj, P. Chakrabarti, R. Gudi, N. Punjabi',
    type: 'conference',
    journal: 'International Conference on Pattern Recognition (ICPR)',
    pages: 'pp. 18–30',
    year: 2024,
    citations: 3,
    tags: ['Hematology', 'Deep Learning'],
  },
  {
    _id: 'opmd-transformer-icpr-2024',
    title: 'Detection of Oral Potentially Malignant Lesions Through Transformer-Based Segmentation Models',
    authors: 'B. Goswami, S. Hazra, S. Das, S. R. Nagar, R. Gudi, N. Punjabi',
    type: 'conference',
    journal: 'International Conference on Pattern Recognition (ICPR)',
    pages: 'pp. 318–332',
    year: 2024,
    citations: 1,
    tags: ['Oral Health', 'Segmentation'],
  },
  {
    _id: 'opmd-transfer-ijmpo-2024',
    title: 'Detection and Differentiation of OPMD from Photographic Images Using Transfer Learning',
    authors: 'B. Goswami, S. R. Nagar, R. Bhattacharyya, N. Punjabi, R. D. Gudi',
    type: 'journal',
    journal: 'Indian Journal of Medical and Paediatric Oncology',
    volume: 'Vol. 45 (S 01)',
    pages: 'A014',
    year: 2024,
    tags: ['Oral Health', 'Transfer Learning'],
  },
  {
    _id: 'fiber-gold-tio2-2024',
    title:
      'Optical Fiber Based Gold Nanoparticles and Titanium Dioxide Modified In Situ Refractometer and Immunosensor',
    authors: 'M. De, N. Punjabi, N. Prakash, S. Mukherji',
    type: 'journal',
    journal: 'IEEE Sensors Journal',
    volume: 'Vol. 24, No. 5',
    pages: 'pp. 6264–6271',
    year: 2024,
    citations: 8,
    tags: ['Optical Sensing', 'Biosensors'],
  },

  {
    _id: 'tio2-refractometer-ipc-2023',
    title: 'Titanium Dioxide Modified Optical Fiber Refractometer',
    authors: 'M. De, N. Punjabi, S. Mukherji',
    type: 'conference',
    journal: 'IEEE Photonics Conference (IPC)',
    pages: 'pp. 1–2',
    year: 2023,
    tags: ['Optical Sensing'],
  },

  {
    _id: 'binding-kinetics-2021',
    title: 'A Mechanical Setup to Improve the Binding Kinetics of Absorbance-based Fiber-Optic Immunosensor',
    authors: 'N. Punjabi, A. Dhawangale, A. Khatri, S. Mukherji',
    type: 'conference',
    journal: 'Optics and Photonics for Sensing the Environment',
    pages: 'JW2A.2',
    year: 2021,
    tags: ['Optical Sensing', 'Immunosensors'],
  },
  {
    _id: 'ecoli-bacteriophage-2021',
    title:
      'Label-Free Detection of Escherichia coli from Mixed Bacterial Cultures Using Bacteriophage T4 on Plasmonic Fiber-Optic Sensor',
    authors: 'P. Halkare, N. Punjabi, J. Wangchuk, S. Madugula, K. Kondabagil, et al.',
    type: 'journal',
    journal: 'ACS Sensors',
    volume: 'Vol. 6, No. 7',
    pages: 'pp. 2720–2727',
    year: 2021,
    citations: 33,
    tags: ['Biosensors', 'Plasmonics'],
  },

  {
    _id: 'heavy-metal-2019',
    title:
      'Bacteria Functionalized Gold Nanoparticle Matrix Based Fiber-Optic Sensor for Monitoring Heavy Metal Pollution in Water',
    authors: 'P. Halkare, N. Punjabi, J. Wangchuk, A. Nair, K. Kondabagil, S. Mukherji',
    type: 'journal',
    journal: 'Sensors and Actuators B: Chemical',
    volume: 'Vol. 281',
    pages: 'pp. 643–651',
    year: 2019,
    citations: 68,
    tags: ['Biosensors', 'Environmental'],
  },
  {
    _id: 'mercury-ions-2019',
    title:
      'Optimization of Plasmonic U-Shaped Optical Fiber Sensor for Mercury Ions Detection Using Glucose Capped Silver Nanoparticles',
    authors: 'G. M. Shukla, N. Punjabi, T. Kundu, S. Mukherji',
    type: 'journal',
    journal: 'IEEE Sensors Journal',
    volume: 'Vol. 19, No. 9',
    pages: 'pp. 3224–3231',
    year: 2019,
    citations: 67,
    tags: ['Optical Sensing', 'Plasmonics'],
  },

  {
    _id: 'synuclein-2018',
    title:
      'Detection and Differentiation of α-Synuclein Monomer and Fibril by Chitosan Film Coated Nanogold Array on Optical Sensor Platform',
    authors: 'A. Khatri, N. Punjabi, D. Ghosh, S. K. Maji, S. Mukherji',
    type: 'journal',
    journal: 'Sensors and Actuators B: Chemical',
    volume: 'Vol. 255',
    pages: 'pp. 692–700',
    year: 2018,
    citations: 66,
    tags: ['Biosensors', 'Neurodegeneration'],
  },
  {
    _id: 'dendrimer-capping-2018',
    title:
      'Dendrimer as a Multifunctional Capping Agent for Metal Nanoparticles for Use in Bioimaging, Drug Delivery and Sensor Applications',
    authors: 'S. R. Barman, A. Nain, S. Jain, N. Punjabi, S. Mukherji, J. Satija',
    type: 'journal',
    journal: 'Journal of Materials Chemistry B',
    volume: 'Vol. 6, No. 16',
    pages: 'pp. 2368–2384',
    year: 2018,
    citations: 99,
    tags: ['Nanoparticles', 'Drug Delivery'],
  },

  {
    _id: 'dendrimer-sensors-2017',
    title: 'Dendrimer Sensors',
    authors: 'J. Satija, S. K. Chauhan, N. Punjabi, S. Mukherji',
    type: 'book-chapter',
    journal:
      'Reference Module in Chemistry, Molecular Sciences and Chemical Engineering',
    year: 2017,
    citations: 2,
    tags: ['Sensors'],
  },

  {
    _id: 'myeloperoxidase-2016',
    title:
      'Inexpensive Polyester Sheet Based Waveguides for Detection of Cardiac Biomarker, Myeloperoxidase',
    authors: 'A. Khatri, N. Punjabi, A. Dhawangale, S. Mukherji',
    type: 'conference',
    journal: 'Procedia Engineering',
    volume: 'Vol. 168',
    pages: 'pp. 125–128',
    year: 2016,
    citations: 5,
    tags: ['Biosensors', 'Cardiac'],
  },
  {
    _id: 's-shaped-biosensor-2016',
    title:
      'Evanescent Wave Absorption Based S-shaped Fiber-optic Biosensor for Immunosensing Applications',
    authors: 'S. Chauhan, N. Punjabi, D. Sharma, S. Mukherji',
    type: 'conference',
    journal: 'Procedia Engineering',
    volume: 'Vol. 168',
    pages: 'pp. 117–120',
    year: 2016,
    citations: 38,
    tags: ['Biosensors', 'Immunosensors'],
  },
  {
    _id: 'hollow-gold-bacteria-2016',
    title:
      'Detection of Bacteria Using Bacteriophage with Hollow Gold Nanostructures Immobilized Fiber Optic Sensor',
    authors: 'P. Halkare, N. Punjabi, J. Wangchuk, K. Kondabagil, S. Mukherji',
    type: 'conference',
    journal: 'Optical Sensing and Detection IV',
    volume: 'Vol. 9899',
    pages: 'pp. 665–672',
    year: 2016,
    citations: 6,
    tags: ['Biosensors', 'Plasmonics'],
  },
]
