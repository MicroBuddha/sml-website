import { openings, locations } from '@/content/connect'
import { people } from '@/content/people'
import { LAB_EMAIL } from '@/content/site'
import PageHead from '../components/PageHead'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import ApplyForm from './ApplyForm'
import Locations from './Locations'

export const metadata = {
  title: 'Connect | Sensing & Monitoring Lab',
  description: 'Apply for an internship, propose a collaboration, or visit the Sensing & Monitoring Lab at IIT Bombay.',
}

export default function ConnectPage() {
  const pi = people.find((p) => p.role === 'PI')
  return (
    <>
      <style>{`
        .cn__ways { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .way { display: flex; flex-direction: column; gap: 10px; padding: 28px; border-radius: var(--radius-lg); background: var(--card); border: 1px solid var(--line); text-decoration: none; color: inherit;
          transition: transform .3s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .3s; }
        .way:hover { transform: translateY(-4px); border-color: var(--indigo); box-shadow: 0 20px 40px rgba(22,19,61,.1); }
        .way__icon { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: var(--indigo-soft); color: var(--indigo); font-size: 20px; transition: transform .4s; }
        .way:hover .way__icon { transform: rotate(-8deg) scale(1.08); }
        .way__go { margin-top: auto; padding-top: 10px; color: var(--indigo); font-weight: 500; }
        .cn__apply { display: grid; grid-template-columns: .8fr 1.2fr; gap: 56px; align-items: start; }
        .cn__aside { position: sticky; top: 110px; }
        @media (max-width: 900px) { .cn__ways, .cn__apply { grid-template-columns: 1fr; } .cn__aside { position: static; } }
      `}</style>

      <PageHead kicker="Connect" title="Join us, work with us, or come and visit">
        Apply for an internship with your CV, propose a collaboration, or find your way to the lab.
      </PageHead>

      <main>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap cn__ways">
            <Reveal><a className="way" href="#apply">
              <span className="way__icon" aria-hidden="true">✎</span>
              <span className="h3">Apply for an internship</span>
              <span className="muted">Pick a project, upload your CV and tell us when you can start.</span>
              <span className="way__go">Start an application</span>
            </a></Reveal>
            <Reveal delay={80}><a className="way" href={`mailto:${LAB_EMAIL}?subject=${encodeURIComponent('Collaboration enquiry')}`}>
              <span className="way__icon" aria-hidden="true">⇄</span>
              <span className="h3">Collaborate</span>
              <span className="muted">Clinicians, hospitals and industry partners: write to {pi?.name ?? 'the PI'} with your proposal.</span>
              <span className="way__go">{LAB_EMAIL}</span>
            </a></Reveal>
            <Reveal delay={160}><a className="way" href="#visit">
              <span className="way__icon" aria-hidden="true">⌖</span>
              <span className="h3">Visit the lab</span>
              <span className="muted">The hardware lab is in the Transit Building; the office is at KCDH.</span>
              <span className="way__go">See the maps</span>
            </a></Reveal>
          </div>
        </section>

        <section id="apply" className="section" style={{ scrollMarginTop: 90 }}>
          <div className="wrap cn__apply">
            <div className="cn__aside">
              <h2 className="h2">Internship application</h2>
              <p className="muted" style={{ marginTop: 14 }}>
                Takes about three minutes. We read every application and reply to shortlisted students by email, usually within two weeks.
              </p>
              <ul className="muted" style={{ marginTop: 22, paddingLeft: 18, display: 'grid', gap: 8 }}>
                <li>Have your CV ready as a PDF</li>
                <li>Say which project you want and why</li>
                <li>Give your earliest start date and how long you can stay</li>
              </ul>
            </div>
            <ApplyForm openings={openings} />
          </div>
        </section>

        <section id="visit" className="section" style={{ paddingTop: 0, scrollMarginTop: 90 }}>
          <div className="wrap">
            <Reveal><h2 className="h2" style={{ marginBottom: 28 }}>Find us</h2></Reveal>
            <Reveal><Locations locations={locations} /></Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
