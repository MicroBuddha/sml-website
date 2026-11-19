// ─────────────────────────────────────────────────────────────────────────
// CONNECT PAGE — internship form, open positions and lab locations.
// ─────────────────────────────────────────────────────────────────────────

// ⚙️  WHERE INTERNSHIP APPLICATIONS GO
// Paste the Google Apps Script web-app URL here (setup steps are in
// docs/internship-form-setup.md). Each application then lands as a row in
// a Google Sheet, and the uploaded CV is saved to a Google Drive folder.
//
// While this is left empty, the form still works: it opens the applicant's
// email app with everything filled in and asks them to attach their CV.
export const APPLICATION_ENDPOINT = ''

// Largest CV file applicants can upload (in MB).
export const MAX_CV_MB = 5

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
