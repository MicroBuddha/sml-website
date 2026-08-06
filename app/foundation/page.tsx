import Link from 'next/link'
import ImageCarousel from '../components/ImageCarousel'

export const metadata = {
  title: "The Foundation | Sensing & Monitoring Lab",
  description: "The story, mission, and infrastructure behind the Sensing & Monitoring Foundation at IIT Bombay's Koita Centre for Digital Health.",
}

const pillars = [
  {
    title: 'Accessible Diagnostics',
    desc: 'Every device and algorithm we build is designed to work outside the clinic — in homes, community health centres, and the hands of frontline workers.',
  },
  {
    title: 'Rigorous Science',
    desc: 'Every claim we make is backed by peer-reviewed evidence, clinical validation, and reproducible methodology — not just a working demo.',
  },
  {
    title: 'Open Collaboration',
    desc: 'We partner across disciplines — engineering, medicine, public health, and design — because real-world impact rarely fits inside one department.',
  },
  {
    title: 'People First',
    desc: 'Students and researchers at the Foundation are given ownership of full problems, from hardware to deployment, not just a slice of a pipeline.',
  },
]

export default function FoundationPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .fd-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* ── HERO ── */
        .fd-hero {
          padding: 120px 40px 72px;
          max-width: 900px;
          margin: 0 auto;
        }
        .fd-hero__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #854f0b;
          margin-bottom: 20px;
        }
        .fd-hero__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(44px, 6.5vw, 76px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 28px;
        }
        .fd-hero__title em { font-style: italic; color: #3c3489; }
        .fd-hero__sub {
          font-size: 16px;
          line-height: 1.8;
          color: #5a5249;
          font-weight: 300;
          max-width: 620px;
        }

        /* ── SHARED SECTION DIVIDER ── */
        .fd-divider {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .fd-divider__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9e8a67;
          white-space: nowrap;
        }
        .fd-divider__line { flex: 1; height: 1px; background: #e5e0d8; }

        /* ── STORY ── */
        .fd-story {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 40px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 64px;
        }
        .fd-story__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 34px;
          font-weight: 400;
          color: #111;
          margin: 0;
          line-height: 1.15;
        }
        .fd-story__body {
          font-size: 15px;
          line-height: 1.85;
          color: #5a5249;
          font-weight: 300;
        }
        .fd-story__body p { margin: 0 0 18px; }
        .fd-story__body p:last-child { margin: 0; }

        /* ── PILLARS ── */
        .fd-pillars {
          background: #fff;
          border-top: 1px solid #e5e0d8;
          border-bottom: 1px solid #e5e0d8;
          padding: 72px 0;
        }
        .fd-pillars__inner { max-width: 1100px; margin: 0 auto; padding: 0 40px; }
        .fd-pillars__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          color: #111;
          margin: 12px 0 48px;
          letter-spacing: -0.01em;
        }
        .fd-pillars__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        .fd-pillar {
          padding: 32px;
          border: 1px solid #e8e3db;
          background: #fff;
        }
        .fd-pillar__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #111;
          margin: 0 0 10px;
        }
        .fd-pillar__desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
        }

        /* ── FACILITIES ── */
        .fd-facilities {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .fd-facilities__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: #111;
          margin: 0 0 16px;
        }
        .fd-facilities__body {
          font-size: 15px;
          line-height: 1.8;
          color: #5a5249;
          font-weight: 300;
        }
        .fd-facilities__list {
          list-style: none;
          margin: 20px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .fd-facilities__list li {
          font-size: 13.5px;
          color: #4a4540;
          padding-left: 16px;
          position: relative;
        }
        .fd-facilities__list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #ef9f27;
        }

        /* ── SUPPORT ── */
        .fd-support {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 88px;
        }
        .fd-support__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: #111;
          margin: 12px 0 16px;
        }
        .fd-support__body {
          font-size: 14.5px;
          line-height: 1.8;
          color: #5a5249;
          font-weight: 300;
          max-width: 640px;
          margin-bottom: 32px;
        }
        .fd-support__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 2px;
        }
        .fd-support__slot {
          border: 1px dashed #d8d0c2;
          background: #fff;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 12px;
          color: #9e8a67;
          letter-spacing: 0.04em;
          text-align: center;
          padding: 8px;
        }

        /* ── CTA ── */
        .fd-cta {
          background: #3c3489;
          padding: 72px 40px;
          text-align: center;
        }
        .fd-cta__inner { max-width: 560px; margin: 0 auto; }
        .fd-cta__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 14px;
          line-height: 1.2;
        }
        .fd-cta__sub {
          font-size: 14.5px;
          color: #cecbf6;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .fd-cta__actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .btn-light {
          display: inline-block;
          padding: 12px 28px;
          background: #faf9f7;
          color: #3c3489;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .btn-light:hover { background: #fff; }
        .btn-outline-light {
          display: inline-block;
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: border-color 0.2s;
        }
        .btn-outline-light:hover { border-color: #fff; }

        @media (max-width: 900px) {
          .fd-story { grid-template-columns: 1fr; gap: 28px; }
          .fd-facilities { grid-template-columns: 1fr; gap: 32px; }
          .fd-pillars__grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .fd-hero { padding: 80px 24px 56px; }
          .fd-story, .fd-pillars__inner, .fd-facilities, .fd-support, .fd-divider { padding-left: 24px; padding-right: 24px; }
        }
      `}</style>

      <main className="fd-root">

        {/* ── HERO ── */}
        <section className="fd-hero">
          <p className="fd-hero__label">About</p>
          <h1 className="fd-hero__title">
            The <em>Sensing &amp; Monitoring</em><br />Foundation
          </h1>
          <p className="fd-hero__sub">
            The Sensing & Monitoring Lab operates as part of a broader effort — the Sensing & Monitoring
            Foundation — to translate research at IIT Bombay's Koita Centre for Digital Health into
            diagnostic tools that reach the people who need them most.
          </p>
        </section>

        <div className="fd-divider">
          <span className="fd-divider__label">Our Story</span>
          <div className="fd-divider__line" />
        </div>

        {/* ── STORY ── */}
        <section className="fd-story">
          <h2 className="fd-story__title">From a lab bench to the last mile.</h2>
          <div className="fd-story__body">
            <p>
              The Foundation grew out of a simple observation: some of the most capable diagnostic
              technology in the world never reaches the people who need it most, because it is built for
              hospitals rather than homes, clinics rather than communities.
            </p>
            <p>
              What began as individual research projects on oral health imaging, hemoglobin screening, and
              wearable monitoring has grown into a coordinated effort spanning device engineering, machine
              learning, and field deployment — with the explicit goal of taking ideas from prototype to
              people.
            </p>
            <p>
              Today, the Foundation supports the Sensing & Monitoring Lab's research, its student
              researchers, and its collaborations with clinicians and public health partners across India.
              <em> (This section is a placeholder — replace with the Foundation's actual history, founding
              date, and milestones.)</em>
            </p>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <div className="fd-divider" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span className="fd-divider__label">What We Stand For</span>
          <div className="fd-divider__line" />
        </div>
        <section className="fd-pillars">
          <div className="fd-pillars__inner">
            <h2 className="fd-pillars__title">Four principles guide everything we build.</h2>
            <div className="fd-pillars__grid">
              {pillars.map((p) => (
                <div key={p.title} className="fd-pillar">
                  <h3 className="fd-pillar__title">{p.title}</h3>
                  <p className="fd-pillar__desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FACILITIES ── */}
        <div className="fd-divider">
          <span className="fd-divider__label">Infrastructure</span>
          <div className="fd-divider__line" />
        </div>
        <section className="fd-facilities">
          <div>
            <h2 className="fd-facilities__title">Facilities &amp; equipment.</h2>
            <p className="fd-facilities__body">
              The Foundation is housed within the Koita Centre for Digital Health at IIT Bombay, with
              access to hardware prototyping, imaging, and signal-processing infrastructure.
            </p>
            <ul className="fd-facilities__list">
              <li>Device prototyping &amp; electronics bench</li>
              <li>Optical &amp; intraoral imaging setup</li>
              <li>Wearable sensor testing rigs</li>
              <li>GPU compute for model training</li>
              <li>Field-testing partnerships with clinics &amp; ASHA networks</li>
            </ul>
          </div>
          <ImageCarousel images={[]} placeholderLabel="Facility photos coming soon" aspectRatio="4 / 3" />
        </section>

        {/* ── SUPPORT / PARTNERS ── */}
        <div className="fd-divider">
          <span className="fd-divider__label">Support</span>
          <div className="fd-divider__line" />
        </div>
        <section className="fd-support">
          <h2 className="fd-support__title">Partners &amp; funding.</h2>
          <p className="fd-support__body">
            Placeholder — list funding bodies, institutional partners, and collaborating hospitals or
            organisations here once confirmed.
          </p>
          <div className="fd-support__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="fd-support__slot">Partner logo</div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="fd-cta">
          <div className="fd-cta__inner">
            <h2 className="fd-cta__title">Get involved with the Foundation.</h2>
            <p className="fd-cta__sub">
              Whether you're a prospective student, a clinician, or a potential partner — we'd like to
              hear from you.
            </p>
            <div className="fd-cta__actions">
              <Link href="/contact" className="btn-light">Get in Touch</Link>
              <Link href="/people" className="btn-outline-light">Meet the Team</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
