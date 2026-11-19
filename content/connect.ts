// ─────────────────────────────────────────────────────────────────────────
// CONNECT PAGE — internship form, open positions and lab locations.
// ─────────────────────────────────────────────────────────────────────────

// ⚙️  WHERE FORM SUBMISSIONS GO  (the only setting you need)
// Paste the Google Apps Script web-app URL here — setup steps are in
// docs/form-setup.md. Every submission is then saved as a row in a Google
// Sheet (one tab per form type), uploaded CVs/files are saved in a Google
// Drive folder, and the lab gets an email for each one.
//
// ⚠️ While this is empty NOTHING IS SAVED: the form only opens the visitor's
// own email app, pre-filled, and asks them to attach their CV themselves.
export const FORM_ENDPOINT = ''

// Largest file visitors can upload (in MB).
export const MAX_FILE_MB = 5

// ── What visitors can contact the lab about ─────────────────────────────
// Shown as choices at the top of the Connect form. 'internship' opens the
// full internship application; the others open a shorter enquiry form.
export const enquiryTypes = [
  { id: 'internship', label: 'Internship', desc: 'Apply for a project, with your CV' },
  { id: 'phd-masters', label: 'PhD or Masters', desc: 'Ask about joining for a degree' },
  { id: 'collaboration', label: 'Collaboration', desc: 'Clinical, academic or industry partnership' },
  { id: 'workshop', label: 'Invite a workshop', desc: 'A session at your institution or event' },
  { id: 'other', label: 'Something else', desc: 'Any other question' },
] as const

// ── Internship form drop-downs ──────────────────────────────────────────
export const programmeOptions = [
  'B.Tech / B.E.', 'B.Sc', 'B.Pharm', 'BDS', 'MBBS', 'Integrated / dual degree',
  'M.Tech / M.E.', 'M.Sc', 'MS by Research', 'M.Pharm', 'MBA', 'PhD', 'Other',
]
export const yearOptions = ['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Final year', 'Graduated']

// ── Open positions ──────────────────────────────────────────────────────
// These show as selectable cards above the form. Set `open: false` to show
// a position as closed without deleting it.
export interface Opening {
  id: string
  title: string
  type: 'Internship' | 'Masters thesis' | 'PhD' | 'Project staff'
  summary: string
  skills: string[]
  open: boolean
}

export const openings: Opening[] = [
  {
    id: 'bio-impedance',
    title: 'Bio-impedance hardware',
    type: 'Internship',
    summary: 'Help build and test the oral bio-impedance probe: circuits, firmware and bench measurements.',
    skills: ['Electronics', 'Microcontrollers', 'Python'],
    open: true,
  },
  {
    id: 'opmd-imaging',
    title: 'Oral lesion imaging (OPMD)',
    type: 'Internship',
    summary: 'Train and evaluate segmentation and classification models on clinical photographs of the mouth.',
    skills: ['PyTorch', 'Computer vision'],
    open: true,
  },
  {
    id: 'llms-health',
    title: 'Small and large language models for health',
    type: 'Internship',
    summary: 'Fine-tune, benchmark and deploy language models for healthcare tasks.',
    skills: ['NLP', 'Hugging Face', 'Python'],
    open: true,
  },
  {
    id: 'general',
    title: 'Something else in digital health',
    type: 'Internship',
    summary: "Have your own idea that fits the lab? Tell us about it in the form.",
    skills: [],
    open: true,
  },
]

// ── Locations (map tabs) ────────────────────────────────────────────────
export const locations = [
  {
    name: 'Hardware lab',
    address: 'Room 306, Transit Building, IIT Bombay, Powai, Mumbai 400076',
    embed: 'https://maps.google.com/maps?q=19.1345835,72.9176572&z=17&output=embed',
    mapLink: 'https://maps.app.goo.gl/RMGDti8dmVnQoHwK7',
  },
  {
    name: 'KCDH office',
    address: 'Koita Centre for Digital Health, IIT Bombay, Powai, Mumbai 400076',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4846644937406!2d72.91587759999999!3d19.1302507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7cdd0997009%3A0x62c5c13f16fcda81!2sKoita%20Centre%20for%20Digital%20Health!5e0!3m2!1sen!2sin!4v1772035970138!5m2!1sen!2sin',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=19.1302507,72.9158776',
  },
]
