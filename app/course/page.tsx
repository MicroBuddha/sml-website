import Link from 'next/link'

export const metadata = {
  title: 'Course | Sensing & Monitoring Lab',
  description:
    'Course offerings from the Sensing & Monitoring Lab at IIT Bombay — including Clinical Data Management, faculty, and applied research directions.',
}

// ─────────────────────────────────────────────────────────────────────────
// EDITABLE CONTENT
// ─────────────────────────────────────────────────────────────────────────
// Everything the page renders lives in these objects/arrays so the content is
// easy to update. To add a real photo for a research area, drop the file into
// /public/images/course/ and set `image` to e.g. '/images/course/oral-cam.jpg'.
// ─────────────────────────────────────────────────────────────────────────

interface Faculty {
  name: string
  title: string
  affiliation: string
  bio: string
  initials: string
  photo?: string // e.g. '/images/course/nirmal-sir.jpg' — drop file in /public/images/course/
}

const faculty: Faculty = {
  name: 'Nirmal Sir',
  title: 'Assistant Professor in Research',
  affiliation: 'Koita Centre for Digital Health · IIT Bombay',
  bio:
    'Leads the Clinical Data Management module and mentors students across the ' +
    "lab's applied research directions, from point-of-care sensing to " +
    'deep-learning-driven diagnostics.',
  initials: 'NS',
  // photo: '/images/course/nirmal-sir.jpg', // optional — leave undefined for the initials avatar
}

const clinicalDataTopics = [
  'Data governance, provenance, and quality in clinical settings',
  'Structuring, cleaning, and annotating real-world patient data',
  'Privacy, consent, de-identification, and regulatory compliance',
  'Building reproducible pipelines for downstream ML models',
]

interface ResearchArea {
  title: string
  desc: string
  image?: string // e.g. '/images/course/oral-cam.jpg'
}

const researchAreas: ResearchArea[] = [
  {
    title: 'Intra-oral Camera for Oral Cancer Detection',
    desc:
      'A portable intra-oral imaging system paired with on-device models to ' +
      'screen for oral pre-malignant lesions and cancer, bringing early ' +
      'detection to community and low-resource settings.',
  },
  {
    title: "Speech & Acoustics in Parkinson's and Heart Disorders",
    desc:
      'Machine-learning analysis of speech and acoustic biomarkers to detect ' +
      "and track Parkinson's disease progression and cardiac abnormalities " +
      'from simple, non-invasive voice and sound recordings.',
  },
  {
    title: 'Mental Health LLMs',
    desc:
      'Large language models tuned for mental-health support and screening — ' +
      'exploring safe, empathetic, and clinically grounded conversational ' +
      'tools that can widen access to first-line care.',
  },
  {
    title: 'Point-of-Care Amino Acid Sensor for Diabetes',
    desc:
      'A point-of-care electrochemical sensor for amino-acid detection, aimed ' +
      'at rapid, low-cost screening and monitoring relevant to diabetes at ' +
      'the bedside or in the field.',
  },
]

// Small helper: shows the real image if provided, otherwise a labelled
// placeholder box that makes it obvious where a photo belongs.
function ResearchImage({ image, alt }: { image?: string; alt: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className="h-full w-full rounded-[4px] border border-[#e8e3db] object-cover"
      />
    )
  }
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-[#d8cfc0] text-[#a09585]"
      style={{
        background:
          'repeating-linear-gradient(45deg, #f0ece5, #f0ece5 10px, #ede8e0 10px, #ede8e0 20px)',
      }}
    >
      <span
        className="text-[30px] opacity-60"
        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
        aria-hidden="true"
      >
        ◇
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.08em]">
        Image placeholder
      </span>
    </div>
  )
}

export default function CoursePage() {
  const serif = { fontFamily: "'EB Garamond', Georgia, serif" }

  return (
    <>
      {/* Load the shared fonts so the page matches the rest of the site. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        .course-root { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <main className="course-root min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-[900px] px-6 pt-[120px] pb-16 sm:px-10">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#854f0b]">
            Course
          </p>
          <h1
            className="text-[clamp(40px,6vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111]"
            style={serif}
          >
            Learning at the <em className="not-italic text-[#3c3489]">intersection</em> of
            sensing, data &amp; care.
          </h1>
          <p className="mt-7 max-w-[560px] text-[16px] font-light leading-[1.8] text-[#5a5249]">
            Our course work connects hands-on engineering with clinical practice —
            grounding students in how real health data is captured, managed, and
            turned into deployable diagnostic tools.
          </p>
        </section>

        {/* ── CLINICAL DATA MANAGEMENT ── */}
        <section className="border-y border-[#e5e0d8] bg-white">
          <div className="mx-auto max-w-[1100px] px-6 py-[72px] sm:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#854f0b]">
                  Core module
                </p>
                <h2
                  className="text-[clamp(30px,4vw,42px)] font-normal leading-[1.1] tracking-[-0.01em] text-[#111]"
                  style={serif}
                >
                  Clinical Data Management
                </h2>
                <p className="mt-6 text-[15px] font-light leading-[1.85] text-[#5a5249]">
                  A foundational module on how clinical data is collected,
                  governed, and prepared for research. Students learn to treat
                  data as the backbone of trustworthy digital health — handling it
                  responsibly from the point of capture all the way to
                  model-ready datasets.
                </p>
              </div>

              <div>
                <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#9e8a67]">
                  What the module covers
                </p>
                <ul className="flex flex-col gap-3">
                  {clinicalDataTopics.map((topic, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 rounded-[4px] border border-[#e8e3db] bg-[#faf9f7] px-5 py-4"
                    >
                      <span
                        className="mt-0.5 text-[15px] leading-none text-[#3c3489]"
                        style={serif}
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[14px] font-light leading-[1.6] text-[#4a4540]">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FACULTY PROFILE ── */}
        <div className="mx-auto flex max-w-[1100px] items-center gap-6 px-6 pt-[72px] sm:px-10">
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-[#9e8a67]">
            Faculty
          </span>
          <div className="h-px flex-1 bg-[#e5e0d8]" />
        </div>

        <section className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10">
          <div className="flex flex-col items-start gap-7 rounded-[4px] border border-[#e8e3db] bg-white p-8 sm:flex-row sm:items-center sm:p-10">
            {faculty.photo ? (
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

        {/* ── RESEARCH AREAS (with image placeholders) ── */}
        <div className="mx-auto flex max-w-[1100px] items-center gap-6 px-6 pt-8 sm:px-10">
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-[#9e8a67]">
            Research Directions
          </span>
          <div className="h-px flex-1 bg-[#e5e0d8]" />
        </div>

        <section className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#854f0b]">
              Applied projects
            </p>
            <h2
              className="text-[clamp(30px,4vw,42px)] font-normal leading-[1.1] tracking-[-0.01em] text-[#111]"
              style={serif}
            >
              Where the course leads.
            </h2>
          </div>

          <div className="flex flex-col gap-14">
            {researchAreas.map((area, i) => (
              <article
                key={area.title}
                className={`flex flex-col gap-8 md:items-center md:gap-12 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="w-full md:w-[46%]">
                  <ResearchImage image={area.image} alt={area.title} />
                </div>
                <div className="w-full md:w-[54%]">
                  <span
                    className="text-[28px] leading-none text-[#e0dbd3]"
                    style={serif}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="mt-2 text-[24px] font-normal leading-[1.2] text-[#111]"
                    style={serif}
                  >
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[15px] font-light leading-[1.8] text-[#5a5249]">
                    {area.desc}
                  </p>
                </div>
              </article>
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
              Interested in the course or the research?
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-[15px] font-light leading-[1.7] text-[#cecbf6]">
              Reach out to learn more about the module, project opportunities, and
              how to get involved with the lab.
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
