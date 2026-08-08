import Link from 'next/link'
import { people } from '@/content/people'

import { hero, mission, highlights, collaborators, testimonials } from '@/content/home'
import ImageCarousel from './components/ImageCarousel'
import Collaborators from './components/Collaborators'
import Testimonials from './components/Testimonials'

export default function HomePage() {
  const pi = people.find((p) => p.role === 'PI')

  // Pool a few recent workshop/event photos for the "Life in the Lab" strip.
  const recentEvents = [...events]
    .filter((e) => (e.gallery && e.gallery.length > 0) || e.coverImage)
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 6)
  const labImages = [
    { url: '/images/events/lab_photo.jpg', alt: 'Life in the lab', caption: 'Life in the lab' },
    { url: '/images/events/lab_photo2.jpg', alt: 'Life in the lab', caption: 'Life in the lab' },
    { url: '/images/events/lab_photo3.jpg', alt: 'Life in the lab', caption: 'Life in the lab' },
    { url: '/images/events/lab_photo4.jpg', alt: 'Life in the lab', caption: 'Life in the lab' },
  ]

  const researchAreas = [
    {
      icon: '◎',
      title: 'Oral Health Diagnostics',
      desc: 'AI-powered detection and classification of pre-cancerous oral lesions, caries, and gum disease using a portable multimodal sensing device with 360° rotation and swappable sensor heads.',
    },
    {
      icon: '◈',
      title: 'Non-invasive Screening',
      desc: 'Hemoglobin and anemia estimation directly from mobile phone images — enabling mass screening in remote areas through ASHA workers without invasive procedures.',
    },
    {
      icon: '◇',
      title: 'Physiological Monitoring',
      desc: 'Multi form-factor wearable devices (ring, glove, watch, patch, chest-strap) for continuous monitoring of HR, HRV, SpO₂, respiratory rate, blood pressure, and vascular stiffness.',
    },
    {
      icon: '◉',
      title: 'Acoustic Biomarkers',
      desc: 'Machine learning models on speech and acoustic data for detection and progression tracking of neurodegenerative diseases, trained with limited-data protocols.',
    },
    {
      icon: '◌',
      title: 'Neonatal Monitoring',
      desc: 'Non-contact height and weight estimation of neonates from images using simulated datasets and trained deep learning models — no physical constraints required.',
    },
    {
      icon: '◍',
      title: 'Edge & Emerging Work',
      desc: 'Erythroblast differentiation for hematology, model deployment on edge devices, pressure sensor patches for bed-sore prevention, and cardiac acoustic monitoring.',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .home {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          color: #1a1a1a;
        }

        /* ── HERO ── */
        .hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 96px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
          align-items: center;
        }
        .hero__eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #854f0b;
          margin-bottom: 24px;
        }
        .hero__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(44px, 6vw, 76px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 28px;
        }
        .hero__title em {
          font-style: italic;
          color: #3c3489;
        }
        .hero__desc {
          font-size: 16px;
          line-height: 1.8;
          color: #5a5249;
          font-weight: 300;
          max-width: 520px;
          margin-bottom: 40px;
        }
        .hero__actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-block;
          padding: 12px 28px;
          background: #3c3489;
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        .btn-primary:hover { background: #26215c; }
        .btn-ghost {
          display: inline-block;
          padding: 12px 28px;
          border: 1px solid #ef9f27;
          color: #5a5249;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: #3c3489; color: #3c3489; }

        /* ── HERO CARD (PI) ── */
        .hero__card {
          background: #fff;
          border: 1px solid #e8e3db;
          border-radius: 4px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hero__card-avatar {
          width: 72px;
          height: 72px;
          border-radius: 2px;
          background: #ede8e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          color: #a09585;
          flex-shrink: 0;
        }
        .hero__card-name {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #111;
          margin: 0 0 2px;
        }
        .hero__card-role {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9e8a67;
          font-weight: 500;
        }
        .hero__card-divider {
          height: 1px;
          background: #e8e3db;
        }
        .hero__card-meta {
          font-size: 13px;
          color: #5a5249;
          line-height: 1.7;
          font-weight: 300;
        }
        .hero__card-meta a {
          color: #3c3489;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #cecbf6;
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .hero__card-meta a:hover { border-color: #3c3489; }
        .hero__card-stat {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .hero__card-stat-item {
          background: #faf9f7;
          border: 1px solid #e8e3db;
          border-radius: 2px;
          padding: 14px;
          text-align: center;
        }
        .hero__card-stat-num {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #3c3489;
          line-height: 1;
          display: block;
        }
        .hero__card-stat-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9e8a67;
          font-weight: 500;
          margin-top: 4px;
          display: block;
        }

        /* ── DIVIDER ── */
        .section-divider {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .section-divider__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9e8a67;
          white-space: nowrap;
        }
        .section-divider__line {
          flex: 1;
          height: 1px;
          background: #e5e0d8;
        }

        /* ── MISSION ── */
        .mission {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .mission__quote {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 400;
          line-height: 1.45;
          color: #111;
          letter-spacing: -0.01em;
          position: relative;
          padding-left: 28px;
        }
        .mission__quote::before {
          content: '';
          position: absolute;
          left: 0; top: 4px; bottom: 4px;
          width: 2px;
          background: #3c3489;
          border-radius: 2px;
        }
        .mission__quote em { font-style: italic; color: #3c3489; }
        .mission__body {
          font-size: 15px;
          line-height: 1.85;
          color: #5a5249;
          font-weight: 300;
        }
        .mission__body p { margin: 0 0 16px; }
        .mission__body p:last-child { margin: 0; }

        /* ── RESEARCH GRID ── */
        .research {
          background: #fff;
          border-top: 1px solid #e5e0d8;
          border-bottom: 1px solid #e5e0d8;
          padding: 80px 0;
        }
        .research__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .research__header {
          margin-bottom: 56px;
        }
        .research__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 40px;
          font-weight: 400;
          color: #111;
          margin: 12px 0 0;
          letter-spacing: -0.01em;
        }
        .research__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .research__card {
          padding: 36px 32px;
          border: 1px solid #e8e3db;
          position: relative;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: block;
        }
        .research__card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3c3489, #7f77dd);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .research__card:hover::before { transform: scaleX(1); }
        .research__card:hover {
          background: #fdfcfa;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }
        .research__card-icon {
          font-size: 20px;
          color: #3c3489;
          margin-bottom: 16px;
          display: block;
          opacity: 0.7;
        }
        .research__card-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #111;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .research__card-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
        }

        /* ── HIGHLIGHTS ── */
        .highlights {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .highlights__header {
          margin-bottom: 48px;
        }
        .highlights__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 40px;
          font-weight: 400;
          color: #111;
          margin: 12px 0 0;
          letter-spacing: -0.01em;
        }
        .highlights__list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #e8e3db;
        }
        .highlight__item {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          align-items: center;
          gap: 24px;
          padding: 28px 32px;
          border-bottom: 1px solid #e8e3db;
          transition: background 0.2s;
        }
        .highlight__item:last-child { border-bottom: none; }
        .highlight__item:hover { background: #fdfcfa; }
        .highlight__num {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: #e0dbd3;
          line-height: 1;
          text-align: center;
        }
        .highlight__text {
          font-size: 14px;
          line-height: 1.7;
          color: #4a4540;
          font-weight: 300;
        }
        .highlight__text strong {
          font-weight: 500;
          color: #111;
          font-size: 15px;
          display: block;
          margin-bottom: 2px;
        }
        .highlight__tag {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #854f0b;
          font-weight: 500;
          background: #f0ece5;
          padding: 4px 10px;
          border-radius: 2px;
          white-space: nowrap;
        }

        /* ── LIFE IN THE LAB ── */
        .lab-strip {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 40px 88px;
        }
        .lab-strip__header { margin-bottom: 32px; }
        .lab-strip__grid {
          max-width: 760px;
        }

        /* ── CTA ── */
        .cta {
          background: #3c3489;
          padding: 80px 40px;
          text-align: center;
        }
        .cta__inner { max-width: 600px; margin: 0 auto; }
        .cta__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        .cta__title em { font-style: italic; opacity: 0.75; }
        .cta__sub {
          font-size: 15px;
          color: #cecbf6;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .btn-light {
          display: inline-block;
          padding: 13px 32px;
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

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid #e5e0d8;
          padding: 32px 40px;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer__left {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 16px;
          color: #854f0b;
        }
        .footer__right {
          font-size: 12px;
          color: #9e8a67;
          letter-spacing: 0.04em;
        }
        .footer__right a {
          color: #854f0b;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer__right a:hover { color: #3c3489; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; gap: 48px; }
          .hero__card { max-width: 400px; }
          .mission { grid-template-columns: 1fr; gap: 40px; }
          .research__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .hero, .mission, .research__inner, .highlights, .section-divider { padding-left: 24px; padding-right: 24px; }
          .research__grid { grid-template-columns: 1fr; }
          .highlight__item { grid-template-columns: 40px 1fr; }
          .highlight__tag { display: none; }
          .footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px; }
        }
      `}</style>

      <div className="home">

        {/* ── HERO ── */}
        <section className="hero">
          <div>
            <p className="hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title">
              {hero.titleLines.map((line, i) => (
                <span key={i}>
                  {line.em ? <em>{line.em}</em> : line.text}
                  {i < hero.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero__desc">{hero.description}</p>
            <div className="hero__actions">
              <Link href={hero.primaryCta.href} className="btn-primary">{hero.primaryCta.label}</Link>
              <Link href={hero.secondaryCta.href} className="btn-ghost">{hero.secondaryCta.label}</Link>
            </div>
          </div>

          {/* PI CARD */}
          <div className="hero__card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {pi?.photo ? (
                <img
                  src={pi.photo}
                  alt={pi.name}
                  style={{ width: '72px', height: '72px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div className="hero__card-avatar">N</div>
              )}
              <div>
                <p className="hero__card-name">{pi?.name ?? 'Prof. Nirmal Punjabi'}</p>
                <p className="hero__card-role">Principal Investigator</p>
              </div>
            </div>
            <div className="hero__card-divider" />
            <div className="hero__card-meta">
              Koita Centre for Digital Health<br />
              IIT Bombay, Mumbai<br /><br />
              <a href="mailto:npunjabi@iitb.ac.in">npunjabi@iitb.ac.in</a>
              &ensp;·&ensp;
              <a href="https://www.linkedin.com/in/npunjabi108/" target="_blank" rel="noreferrer">LinkedIn</a>
              &ensp;·&ensp;
              <a href="https://scholar.google.com/citations?hl=en&user=86tKGf8AAAAJ" target="_blank" rel="noreferrer">Scholar</a>
            </div>
            <div className="hero__card-stat">
              {hero.stats.map((s) => (
                <div key={s.label} className="hero__card-stat-item">
                  <span className="hero__card-stat-num">{s.num}</span>
                  <span className="hero__card-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <div className="section-divider">
          <span className="section-divider__label">Mission</span>
          <div className="section-divider__line" />
        </div>

        <section className="mission">
          <blockquote className="mission__quote">
            {mission.quote.split(/\{em\}|\{\/em\}/).map((part, i) =>
              i % 2 === 1 ? <em key={i}>{part}</em> : part
            )}
          </blockquote>
          <div className="mission__body">
            {mission.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── RESEARCH AREAS ── */}
        <div className="section-divider">
          <span className="section-divider__label">Research Areas</span>
          <div className="section-divider__line" />
        </div>

        <section className="research">
          <div className="research__inner">
            <div className="research__header">
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#854f0b', margin: '0 0 12px' }}>What we work on</p>
              <h2 className="research__title">Six domains, one goal.</h2>
            </div>
            <div className="research__grid">
              {researchAreas.map((area) => (
                <div key={area.title} className="research__card">
                  <span className="research__card-icon">{area.icon}</span>
                  <h3 className="research__card-title">{area.title}</h3>
                  <p className="research__card-desc">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECT HIGHLIGHTS ── */}
        <div className="section-divider" style={{ marginTop: '0', paddingTop: '80px' }}>
          <span className="section-divider__label">Project Highlights</span>
          <div className="section-divider__line" />
        </div>

        <section className="highlights">
          <div className="highlights__header">
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#854f0b', margin: '0 0 12px' }}>What we focus on</p>
            <h2 className="highlights__title">From sensing to deployment.</h2>
          </div>
          <div className="highlights__list">
            {highlights.map((item, i) => (
              <div key={item.title} className="highlight__item">
                <span className="highlight__num">0{i + 1}</span>
                <div className="highlight__text">
                  <strong>
                    <span aria-hidden="true" style={{ color: '#3c3489', marginRight: '10px', opacity: 0.7 }}>{item.icon}</span>
                    {item.title}
                  </strong>
                  {item.desc}
                </div>
                <span className="highlight__tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── LIFE IN THE LAB ── */}
        <div className="section-divider">
          <span className="section-divider__label">Life in the Lab</span>
          <div className="section-divider__line" />
        </div>

        <section className="lab-strip">
          <div className="lab-strip__header">
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#854f0b', margin: '0 0 12px' }}>Workshops & events</p>
            <h2 className="highlights__title" style={{ margin: 0 }}>Snapshots from the lab.</h2>
          </div>
          <div className="lab-strip__grid">
            <ImageCarousel
              images={labImages}
              placeholderLabel="Lab & workshop photos coming soon"
              aspectRatio="16 / 9"
            />
          </div>
          <div style={{ marginTop: '24px' }}>
            <Link href="/workshops-events" className="btn-ghost">Workshops & Events</Link>
          </div>
        </section>

        {/* ── COLLABORATORS ── */}
        <div className="section-divider">
          <span className="section-divider__label">Collaborators</span>
          <div className="section-divider__line" />
        </div>

        <section className="highlights" style={{ paddingBottom: '40px' }}>
          <div className="highlights__header" style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#854f0b', margin: '0 0 12px' }}>Who we work with</p>
            <h2 className="highlights__title" style={{ margin: 0 }}>Partners &amp; collaborators.</h2>
          </div>
          <Collaborators items={collaborators} />
        </section>

        {/* ── TESTIMONIALS ── */}
        <div className="section-divider">
          <span className="section-divider__label">Testimonials</span>
          <div className="section-divider__line" />
        </div>

        <section className="highlights">
          <div className="highlights__header">
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#854f0b', margin: '0 0 12px' }}>In their words</p>
            <h2 className="highlights__title">What partners say.</h2>
          </div>
          <Testimonials items={testimonials} />
        </section>

        {/* ── CTA ── */}
        <section className="cta">
          <div className="cta__inner">
            <h2 className="cta__title">Interested in <em>collaborating</em> or joining the lab?</h2>
            <p className="cta__sub">
              We welcome project collaborations, internship enquiries, and prospective PhD and Masters students with a passion for digital health.
            </p>
            <Link href="/contact" className="btn-light">Get in Touch</Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <span className="footer__left">Sensing & Monitoring Lab, KCDH</span>
          <span className="footer__right">
            IIT Bombay &nbsp;·&nbsp;{' '}
            <a href="https://www.kcdh.iitb.ac.in" target="_blank" rel="noreferrer">kcdh.iitb.ac.in</a>
            &nbsp;·&nbsp;{' '}
            <a href="mailto:npunjabi@iitb.ac.in">npunjabi@iitb.ac.in</a>
          </span>
        </footer>

      </div>
    </>
  )
}
