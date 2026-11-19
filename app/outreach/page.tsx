import Link from 'next/link'
import { events } from '@/content/events'
import { courses, programmes } from '@/content/outreach'
import PageHead from '../components/PageHead'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import Gallery from '../components/Gallery'
import Counter from '../components/Counter'
import Timeline from './Timeline'

export const metadata = {
  title: 'Outreach | Sensing & Monitoring Lab',
  description: 'Workshops, courses, field programmes and events run by the Sensing & Monitoring Lab, IIT Bombay.',
}

export default function OutreachPage() {
  const timeline = events
    .filter((e) => e.category !== 'event' || !e.gallery || e.gallery.length < 3) // photo albums go to the gallery below
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  const photos = events.flatMap((e) => (e.gallery ?? []).map((src) => ({ src, cap: e.title })))
  const workshopPeople = new Set(events.filter((e) => e.category === 'workshop').flatMap((e) => e.people ?? [])).size

  return (
    <>
      <style>{`
        .ot__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .ot__stat { padding: 28px; border-radius: var(--radius-lg); background: var(--card); border: 1px solid var(--line); }
        .ot__n { font-family: var(--font-display); font-weight: 600; font-size: 3rem; line-height: 1; color: var(--indigo); }
        .ot__courses { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
        .course { position: relative; display: block; padding: 32px; border-radius: var(--radius-lg); background: var(--ink); color: #ecebff; text-decoration: none; overflow: hidden;
          transition: transform .35s cubic-bezier(.2,.7,.2,1); }
        .course:hover { transform: translateY(-4px); }
        .course__code { font-family: var(--font-display); font-weight: 600; font-size: 4.2rem; line-height: .9; color: transparent; -webkit-text-stroke: 1.5px var(--lavender); transition: color .4s; }
        .course:hover .course__code { color: var(--lavender); }
        .ot__prog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); }
        .ot__prog > div { padding: 30px 28px 10px 0; }
        .ot__prog > div + div { padding-left: 28px; border-left: 1px solid var(--line); }
        .ot__found { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; padding: 44px; border-radius: var(--radius-lg); background: var(--indigo-soft); }
        @media (max-width: 820px) {
          .ot__stats, .ot__prog { grid-template-columns: 1fr; }
          .ot__prog > div + div { padding-left: 0; border-left: 0; border-top: 1px solid var(--line); }
          .ot__found { grid-template-columns: 1fr; padding: 28px; }
        }
      `}</style>

      <PageHead kicker="Outreach" title="Teaching, workshops and work in the field" trace="sound">
        We share what we build — through workshops for students and clinicians, courses at IIT Bombay, and screening programmes with health workers.
      </PageHead>

      <main>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap ot__stats">
            <Reveal className="ot__stat"><div className="ot__n"><Counter value={events.filter((e) => e.category === 'workshop').length} /></div><p className="muted" style={{ marginTop: 8 }}>workshops delivered</p></Reveal>
            <Reveal className="ot__stat" delay={80}><div className="ot__n"><Counter value={courses.length} /></div><p className="muted" style={{ marginTop: 8 }}>courses taught at IIT Bombay</p></Reveal>
            <Reveal className="ot__stat" delay={160}><div className="ot__n"><Counter value={workshopPeople} /></div><p className="muted" style={{ marginTop: 8 }}>instructors and volunteers involved</p></Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal><h2 className="h2" style={{ marginBottom: 36 }}>Workshops and events</h2></Reveal>
            <Timeline items={timeline} />
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
              <h2 className="h2">Courses</h2>
              <Link href="/course" style={{ color: 'var(--indigo)', fontWeight: 500 }}>Syllabi and references</Link>
            </Reveal>
            <div className="ot__courses">
              {courses.map((c, i) => (
                <Reveal key={c.code} delay={i * 80}>
                  <Link href={c.href} className="course">
                    <span className="course__code">{c.code}</span>
                    <p className="h3" style={{ marginTop: 18, color: '#fff' }}>{c.title}</p>
                    <p style={{ marginTop: 8, color: '#b9b6dc' }}>{c.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal><h2 className="h2" style={{ marginBottom: 28 }}>How we work with the community</h2></Reveal>
            <Reveal className="ot__prog">
              {programmes.map((p) => (
                <div key={p.title}>
                  <p className="h3">{p.title}</p>
                  <p className="muted" style={{ marginTop: 8 }}>{p.body}</p>
                  {p.href && <Link href={p.href} className="btn btn--indigo" style={{ marginTop: 18 }}>{p.cta}</Link>}
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {photos.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <Reveal><h2 className="h2" style={{ marginBottom: 28 }}>Photos</h2></Reveal>
              <Reveal><Gallery images={photos.map((p) => p.src)} captions={photos.map((p) => p.cap)} /></Reveal>
            </div>
          </section>
        )}

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="ot__found">
              <div>
                <p className="h2" style={{ fontSize: '1.9rem' }}>Want a workshop at your institution?</p>
                <p className="muted" style={{ marginTop: 10, maxWidth: '60ch' }}>
                  We run hands-on sessions on data science and AI for health. Tell us your audience and dates, or read about the lab&apos;s foundation and facilities.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="/connect?type=workshop#apply" className="btn btn--indigo">Invite us</a>
                <Link href="/foundation" className="btn btn--outline">Foundation</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
