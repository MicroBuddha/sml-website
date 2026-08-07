import Link from 'next/link'

export const metadata = {
  title: 'Courses | Sensing & Monitoring Lab',
  description:
    'Courses taught by the Sensing & Monitoring Lab at IIT Bombay — DH 803 Wearable Health Technologies and DH 308 Clinical Data Management.',
}

// ─────────────────────────────────────────────────────────────────────────
// EDITABLE CONTENT
// ─────────────────────────────────────────────────────────────────────────
// All course data lives in the arrays/objects below so it's easy to update or
// add a new course. Leave a field as an empty string ('') to hide it.
// ─────────────────────────────────────────────────────────────────────────

interface CourseSection {
  heading: string
  points: string[]
}

interface Course {
  code: string
  name: string
  credits: string
  type: string
  lecture?: string
  tutorial?: string
  practical?: string
  selfStudy?: string
  halfSemester: string
  references: string[]
  sections?: CourseSection[] // structured syllabus (used by DH 803)
  description?: string // running description (used by DH 308)
  handsOn?: string // optional hands-on / practical note
  lastUpdate?: string
}

const courses: Course[] = [
  {
    code: 'DH 803',
    name: 'Wearable Health Technologies',
    credits: '6.0',
    type: 'Theory',
    lecture: '2.0',
    tutorial: '1.0',
    halfSemester: 'N',
    sections: [
      {
        heading: 'Section 1 · Background & Need for Wearable Monitoring',
        points: [
          'Need and scope for wearable monitoring',
          'Basics of common biomedical signals and basic parameters in physiological monitoring',
          'Sources of data for wearable devices: electronic signals, physical movements, sweat, tear, sound, breath',
          'Basic sensors and transducers',
        ],
      },
      {
        heading: 'Section 2 · Wearable Devices for Healthcare',
        points: [
          'Types of wearable medical devices',
          'Rehabilitation and clinic- or ward-based wearable devices',
          'Point-of-care devices and home health',
          'Combination of monitoring and therapeutics',
          'Types of measurement: absolute and relative',
          'Non-invasive monitoring and subcutaneous monitoring',
          'Commercial monitoring (Fitbit, Apple Watch, etc.) versus medical-grade monitoring',
        ],
      },
      {
        heading: 'Section 3 · Technologies in Wearable Health',
        points: [
          'Internet of Things, cloud computing and telemedicine systems',
          'Artificial Intelligence & Machine Learning in wearable technology',
          'Frameworks for integration with digital networks',
        ],
      },
      {
        heading: 'Section 4 · Data Validation & Management',
        points: [
          'Potential interference factors affecting the reliability of wearable sensors',
          'Data standards for interoperability',
          'Privacy, security and ethics',
        ],
      },
      {
        heading: 'Section 5 · Applications: Current & Futuristic',
        points: [
          'Healthcare monitoring embedded in clothing and wearable accessories',
          'Virtual and Augmented Reality in wearable healthcare devices; health gamification',
          'Non-conventional applications: sports medicine, space health, mental health, oral health, defence',
        ],
      },
    ],
    references: [
      'Eugenijus Kaniusas, Biomedical Signals and Sensors I: Linking Physiological Phenomena and Biosignals, Springer.',
      'Edward Sazonov and Michael R. Neuman, Wearable Sensors: Fundamentals, Implementation and Applications, Elsevier Science, 2020.',
      'Alan Godfrey and Stan Stuart, Digital Health: Exploring Use and Integration of Wearables, Elsevier Science, 2021.',
      'Manuel Cardona, Vijender Kumar Solanki, and Cecilia E. García Cena, Internet of Medical Things: Paradigm of Wearable Devices, Taylor & Francis, 2021.',
      'Peer-reviewed literature on various topics.',
      'White papers from various wearable health device companies.',
    ],
  },
  {
    code: 'DH 308',
    name: 'Clinical Data Management',
    credits: '6.0',
    type: 'Theory',
    lecture: '3.0',
    halfSemester: 'N',
    description:
      'Introduction to Clinical Data Management (CDM) and the CDM flow; Case Report Form (CRF) design, ' +
      'the function of the CRF and procedures for CRF design; data capture and traditional data-capture ' +
      'methods; data from external databases; reading optical image data and factors affecting data capture; ' +
      'remote data-entry methods; introduction to database design and build, and database validation; ' +
      'quality assurance and CDM; audit and error metrics; CDM training; computer validation; performance ' +
      'measures and status reporting; data presentation and clinical-research issues for data presentation; ' +
      'and types of clinical data.',
    handsOn:
      'Hands-on practice with clinical data loading, database creation, and quality control of clinical data.',
    references: [
      'Clinical Data Management, 2nd Edition — Richard K. Rondel, Sheila A. Varley, Colin F. Webb.',
      'Practical Guide to Clinical Data Management — Susanne Prokscha, Taylor & Francis.',
      'Appropriate research articles for each topic will be suggested in class.',
    ],
    lastUpdate: '2021-07-06',
  },
]

// Course instructor / faculty.
interface Faculty {
  name: string
  title: string
  affiliation: string
  bio: string
  initials: string
  photo?: string // e.g. '/images/course/nirmal-sir.jpg'
}

const faculty: Faculty = {
  name: 'Nirmal Sir',
  title: 'Assistant Professor in Research',
  affiliation: 'Koita Centre for Digital Health · IIT Bombay',
  bio:
    'Teaches across the digital-health curriculum and mentors students in the ' +
    'Sensing & Monitoring Lab, from point-of-care sensing to the deployment of ' +
    'deep-learning models in real-world healthcare settings.',
  initials: 'NS',
  // photo: '/images/course/nirmal-sir.jpg',
}

// Student testimonials — replace these placeholders with real student quotes
// and names when you have them.
interface Testimonial {
  quote: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'The Wearable Health Technologies course took me from biosignal basics to ' +
      'reasoning about medical-grade versus consumer devices. The applications ' +
      'section — from sports medicine to oral health — reshaped how I think ' +
      'about where sensing can go.',
    author: 'Digital Health Student',
    role: 'DH 803 · Wearable Health Technologies',
  },
  {
    quote:
      'Clinical Data Management was the first time I understood how much careful ' +
      'work sits between raw clinical data and a usable dataset. The hands-on CRF ' +
      'design and database sessions were the most practical part of my coursework.',
    author: 'MS Research Student',
    role: 'DH 308 · Clinical Data Management',
  },
  {
    quote:
      'These courses bridge engineering and the clinic in a way I had not seen ' +
      'before. The reading lists are dense but genuinely useful, and every topic ' +
      'connects back to real deployment.',
    author: 'PhD Student',
    role: 'Sensing & Monitoring Lab',
  },
]

// ── small presentational helpers ─────────────────────────────────────────
const serif = { fontFamily: "'EB Garamond', Georgia, serif" }

function metaChips(c: Course) {
  const chips: { label: string; value: string }[] = [
    { label: 'Credits', value: c.credits },
    { label: 'Type', value: c.type },
  ]
  if (c.lecture) chips.push({ label: 'Lecture', value: c.lecture })
  if (c.tutorial) chips.push({ label: 'Tutorial', value: c.tutorial })
  if (c.practical) chips.push({ label: 'Practical', value: c.practical })
  if (c.selfStudy) chips.push({ label: 'Self-study', value: c.selfStudy })
  chips.push({ label: 'Half Sem', value: c.halfSemester })
  return chips
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-[6px] border border-[#e8e3db] bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#eee7dd] p-7 sm:flex-row sm:items-start sm:justify-between sm:p-9">
        <div>
          <span className="inline-block rounded-[2px] bg-[#efeafc] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3c3489]">
            {course.code}
          </span>
          <h3
            className="mt-3 text-[28px] font-normal leading-[1.15] text-[#111]"
            style={serif}
          >
            {course.name}
          </h3>
        </div>
        <div className="flex flex-shrink-0 flex-col items-start rounded-[4px] border border-[#e8e3db] bg-[#faf9f7] px-5 py-3 sm:items-center">
          <span className="text-[26px] leading-none text-[#3c3489]" style={serif}>
            {course.credits}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9e8a67]">
            Credits
          </span>
        </div>
      </div>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2 border-b border-[#eee7dd] px-7 py-5 sm:px-9">
        {metaChips(course).map((chip) => (
          <span
            key={chip.label}
            className="inline-flex items-baseline gap-1.5 rounded-[2px] border border-[#e8e3db] bg-[#faf9f7] px-3 py-1.5"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#9e8a67]">
              {chip.label}
            </span>
            <span className="text-[13px] font-medium text-[#4a4540]">{chip.value}</span>
          </span>
        ))}
      </div>

      {/* Body */}
      <div className="p-7 sm:p-9">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#854f0b]">
          Course description
        </p>

        {/* Structured syllabus (DH 803) */}
        {course.sections && (
          <div className="flex flex-col gap-6">
            {course.sections.map((sec) => (
              <div key={sec.heading}>
                <h4 className="text-[15px] font-medium text-[#111]">{sec.heading}</h4>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {sec.points.map((p, i) => (
                    <li
                      key={i}
                      className="relative pl-5 text-[14px] font-light leading-[1.6] text-[#5a5249] before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-[#7f77dd]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Running description (DH 308) */}
        {course.description && (
          <p className="text-[14.5px] font-light leading-[1.85] text-[#5a5249]">
            {course.description}
          </p>
        )}
        {course.handsOn && (
          <p className="mt-4 rounded-[4px] border-l-2 border-[#3c3489] bg-[#faf9f7] px-4 py-3 text-[14px] font-light leading-[1.7] text-[#4a4540]">
            <span className="font-medium text-[#111]">Hands-on: </span>
            {course.handsOn}
          </p>
        )}

        {/* References */}
        <div className="mt-8 border-t border-[#eee7dd] pt-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#854f0b]">
            Text & references
          </p>
          <ol className="flex flex-col gap-2">
            {course.references.map((ref, i) => (
              <li key={i} className="flex gap-3 text-[13px] font-light leading-[1.6] text-[#5a5249]">
                <span className="text-[#b6ad9c]" style={serif}>
                  {i + 1}.
                </span>
                <span>{ref}</span>
              </li>
            ))}
          </ol>
        </div>

        {course.lastUpdate && (
          <p className="mt-6 text-[11px] text-[#b6ad9c]">Last updated: {course.lastUpdate}</p>
        )}
      </div>
    </article>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="mx-auto flex max-w-[1100px] items-center gap-6 px-6 sm:px-10">
      <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-[#9e8a67]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#e5e0d8]" />
    </div>
  )
}

export default function CoursePage() {
  return (
    <>
      {/* Load the shared fonts so the page matches the rest of the site. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        .course-root { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <main className="course-root min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-[900px] px-6 pt-[120px] pb-14 sm:px-10">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#854f0b]">
            Courses
          </p>
          <h1
            className="text-[clamp(40px,6vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111]"
            style={serif}
          >
            Courses in <em className="not-italic text-[#3c3489]">digital health</em> at
            IIT Bombay.
          </h1>
          <p className="mt-7 max-w-[580px] text-[16px] font-light leading-[1.8] text-[#5a5249]">
            Taught through the Koita Centre for Digital Health, our courses connect
            hands-on engineering with clinical practice — spanning wearable sensing
            hardware and the disciplined management of real clinical data.
          </p>
        </section>

        {/* ── COURSES ── */}
        <Divider label="Course Catalogue" />
        <section className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10">
          <div className="flex flex-col gap-10">
            {courses.map((c) => (
              <CourseCard key={c.code} course={c} />
            ))}
          </div>

          {/* New courses coming soon */}
          <div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-[#d8cfc0] bg-white/60 px-6 py-12 text-center">
            <span className="text-[26px] text-[#cec6b5]" style={serif} aria-hidden="true">
              ✦
            </span>
            <p className="text-[18px] text-[#5a5249]" style={serif}>
              New courses coming soon
            </p>
            <p className="max-w-[420px] text-[13px] font-light text-[#9e8a67]">
              More offerings from the lab are on the way. Check back for updates.
            </p>
          </div>
        </section>

        {/* ── FACULTY ── */}
        <Divider label="Faculty" />
        <section className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10">
          <div className="flex flex-col items-start gap-7 rounded-[6px] border border-[#e8e3db] bg-white p-8 sm:flex-row sm:items-center sm:p-10">
            {faculty.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={faculty.photo}
                alt={faculty.name}
                className="h-24 w-24 flex-shrink-0 rounded-[3px] object-cover"
              />
            ) : (
              <div
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-[3px] bg-[#ede8e0] text-[32px] text-[#a09585]"
                style={serif}
                aria-hidden="true"
              >
                {faculty.initials}
              </div>
            )}
            <div>
              <h3 className="text-[26px] font-normal text-[#111]" style={serif}>
                {faculty.name}
              </h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#3c3489]">
                {faculty.title}
              </p>
              <p className="mt-1 text-[13px] text-[#9e8a67]">{faculty.affiliation}</p>
              <p className="mt-4 max-w-[620px] text-[14px] font-light leading-[1.75] text-[#5a5249]">
                {faculty.bio}
              </p>
            </div>
          </div>
        </section>

        {/* ── STUDENT TESTIMONIALS ── */}
        <Divider label="Student Voices" />
        <section className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10">
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#854f0b]">
              In their words
            </p>
            <h2
              className="text-[clamp(28px,4vw,40px)] font-normal leading-[1.1] tracking-[-0.01em] text-[#111]"
              style={serif}
            >
              What students say.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex h-full flex-col rounded-[4px] border border-[#e8e3db] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <span
                  className="mb-3 block text-[40px] leading-none text-[#cecbf6]"
                  style={serif}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-[14.5px] font-light leading-[1.75] text-[#4a4540]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-[#eee7dd] pt-4">
                  <p className="text-[14px] font-medium text-[#111]">{t.author}</p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#9e8a67]">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#3c3489] px-6 py-20 text-center sm:px-10">
          <div className="mx-auto max-w-[600px]">
            <h2
              className="text-[clamp(30px,4vw,44px)] font-normal leading-[1.15] tracking-[-0.01em] text-white"
              style={serif}
            >
              Interested in these courses?
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-[15px] font-light leading-[1.7] text-[#cecbf6]">
              Reach out to learn more about the modules, enrolment, and project
              opportunities with the lab.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-[2px] bg-[#faf9f7] px-8 py-[13px] text-[13px] font-medium uppercase tracking-[0.06em] text-[#3c3489] no-underline transition-colors hover:bg-white"
            >
              Get in Touch
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 border-t border-[#e5e0d8] px-6 py-8 sm:flex-row sm:px-10">
          <span className="text-[16px] text-[#854f0b]" style={serif}>
            Sensing &amp; Monitoring Lab, KCDH
          </span>
          <span className="text-[12px] tracking-[0.04em] text-[#9e8a67]">
            IIT Bombay &nbsp;·&nbsp;{' '}
            <a
              href="https://www.kcdh.iitb.ac.in"
              target="_blank"
              rel="noreferrer"
              className="text-[#854f0b] no-underline transition-colors hover:text-[#3c3489]"
            >
              kcdh.iitb.ac.in
            </a>
          </span>
        </footer>
      </main>
    </>
  )
}
