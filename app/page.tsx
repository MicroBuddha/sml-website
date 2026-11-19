import Link from 'next/link'
import { people } from '@/content/people'
import { events } from '@/content/events'
import { publications } from '@/content/publications'
import { projects, projectAreas } from '@/content/projects'
import { hero, mission, highlights, collaborators } from '@/content/home'
import SignalScope from './components/SignalScope'
import Pipeline from './components/Pipeline'
import Collaborators from './components/Collaborators'
import Gallery from './components/Gallery'
import Counter from './components/Counter'
import Reveal from './components/Reveal'
import Footer from './components/Footer'

export default function HomePage() {
  const pi = people.find((p) => p.role === 'PI')
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  const labPhotos = events.flatMap((e) => e.gallery ?? []).slice(0, 8)
  const team = people.filter((p) => p.role !== 'Alumni').length
  const workshops = events.filter((e) => e.category === 'workshop').length
  const ongoing = projects.filter((p) => p.status === 'ongoing').length

  const missionHtml = mission.quote.replace('{em}', '').replace('{/em}', '')

  return (
    <>
      <style>{`
        .hero { position: relative; overflow: hidden; padding: 140px 0 80px; min-height: 92vh; display: flex; align-items: center; }
        .hero__glow { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .45; pointer-events: none; }
        .hero__grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(40px, 5vw, 96px); align-items: center; }
        .hero__title { animation: rise .9s cubic-bezier(.2,.7,.2,1) both; }
        .hero__lede { animation: rise .9s .12s cubic-bezier(.2,.7,.2,1) both; }
        .hero__ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; animation: rise .9s .24s cubic-bezier(.2,.7,.2,1) both; }
        .hero__scope { animation: rise 1s .3s cubic-bezier(.2,.7,.2,1) both; }
        .hero__hint { margin-top: 12px; font-size: .84rem; color: #8e8ab8; }
        @keyframes rise { from { opacity: 0; transform: translateY(24px); } }

        .stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line-dark); }
        .stat { padding: 28px 24px 34px; }
        .stat + .stat { border-left: 1px solid var(--line-dark); }
        .stat__n { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem, 4vw, 3.2rem); line-height: 1; color: #fff; font-variant-numeric: tabular-nums; }
        .stat__l { margin-top: 8px; color: #b9b6dc; font-size: .95rem; }
        .stat a { color: inherit; text-decoration: none; }
        .stat a:hover .stat__n { color: var(--amber); }

        .mission { display: grid; grid-template-columns: 1.1fr 1fr; gap: 64px; align-items: start; }
        .mission__quote { font-family: var(--font-display); font-weight: 500; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.18; letter-spacing: -.02em; color: var(--ink); }
        .mission p + p { margin-top: 14px; }

        .sec-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
        .link-arrow { color: var(--indigo); font-weight: 500; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 2px; }
        .link-arrow:hover { color: var(--amber-deep); }

        .fp { display: grid; grid-template-columns: 1.3fr 1fr; grid-template-rows: auto auto; gap: 18px; }
        .fp__card { position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; padding: 30px; border-radius: var(--radius-lg);
          background: var(--card); border: 1px solid var(--line); text-decoration: none; color: inherit; overflow: hidden; transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s, border-color .35s; }
        .fp__lead { grid-row: span 2; }
        .fp__cell { display: flex; }
        .fp__cell > a { flex: 1; }
        .fp__card--lead { background: var(--ink); color: #ecebff; border-color: var(--ink); }
        .fp__card--lead .muted { color: #b9b6dc; }
        .fp__card:hover { transform: translateY(-4px); box-shadow: 0 24px 50px rgba(22,19,61,.14); border-color: var(--indigo); }
        .fp__area { display: inline-flex; align-items: center; gap: 8px; font-size: .86rem; font-weight: 500; }
        .fp__area i { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .fp__title { font-family: var(--font-display); font-weight: 600; letter-spacing: -.02em; line-height: 1.12; font-size: 1.55rem; margin-top: 14px; }
        .fp__card--lead .fp__title { font-size: clamp(1.9rem, 3vw, 2.5rem); }
        .fp__trace { width: 100%; height: 90px; margin-top: auto; }
        .fp__trace path { fill: none; stroke: var(--amber); stroke-width: 2; stroke-dasharray: 900; stroke-dashoffset: 900; transition: stroke-dashoffset 1.6s ease; }
        .is-in .fp__trace path { stroke-dashoffset: 0; }
        .fp__go { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; border: 1px solid currentColor; opacity: .6; transition: all .3s; }
        .fp__card:hover .fp__go { opacity: 1; background: var(--amber); border-color: var(--amber); color: var(--ink); transform: rotate(-45deg); }

        .pi { display: grid; grid-template-columns: 220px 1fr; gap: 40px; align-items: center; padding: 36px; border-radius: var(--radius-lg); background: var(--indigo-soft); }
        .pi img { width: 220px; height: 260px; object-fit: cover; border-radius: var(--radius-md); }

        .cta { position: relative; overflow: hidden; border-radius: 28px; padding: 64px; background: var(--indigo); color: #fff; display: grid; grid-template-columns: 1.4fr auto; gap: 32px; align-items: center; }
        .cta__rings { position: absolute; right: -120px; top: -120px; width: 420px; height: 420px; pointer-events: none; }
        .cta__rings circle { fill: none; stroke: rgba(255,255,255,.14); animation: ring 4s ease-out infinite; transform-origin: center; }
        .cta__rings circle:nth-child(2) { animation-delay: 1.3s; } .cta__rings circle:nth-child(3) { animation-delay: 2.6s; }
        @keyframes ring { from { transform: scale(.3); opacity: 1; } to { transform: scale(1); opacity: 0; } }

        @media (max-width: 960px) {
          .hero__grid, .mission { grid-template-columns: 1fr; gap: 40px; }
          .stats { grid-template-columns: 1fr 1fr; }
          .stat:nth-child(3) { border-left: 0; }
          .stat:nth-child(n+3) { border-top: 1px solid var(--line-dark); }
          .fp { grid-template-columns: 1fr; }
          .fp__lead { grid-row: auto; }
          .pi { grid-template-columns: 1fr; }
          .cta { grid-template-columns: 1fr; padding: 40px 28px; }
        }
      `}</style>

      <main>
        {/* ── HERO ── */}
        <section className="hero dark">
          <div className="hero__glow" style={{ width: 520, height: 520, background: '#3c3489', left: -160, top: -120 }} />
          <div className="hero__glow" style={{ width: 380, height: 380, background: '#854f0b', right: -100, bottom: -80, opacity: 0.3 }} />
          <div className="wrap" style={{ position: 'relative', width: '100%' }}>
            <div className="hero__grid">
              <div>
                <p className="kicker" style={{ marginBottom: 18 }}>{hero.kicker}</p>
                <h1 className="display hero__title">{hero.title}</h1>
                <p className="lede muted hero__lede" style={{ marginTop: 24 }}>{hero.description}</p>
                <div className="hero__ctas">
                  <Link href={hero.primaryCta.href} className="btn btn--amber">{hero.primaryCta.label}</Link>
                  <Link href={hero.secondaryCta.href} className="btn btn--ghost">{hero.secondaryCta.label}</Link>
                </div>
              </div>
              <div className="hero__scope">
                <SignalScope />
                <p className="hero__hint">Move your pointer over the traces to probe them.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── NUMBERS (all counted from the content files) ── */}
        <section className="dark">
          <div className="wrap">
            <div className="stats">
              <div className="stat"><Link href="/projects"><div className="stat__n"><Counter value={ongoing} /></div><div className="stat__l">ongoing projects</div></Link></div>
              <div className="stat"><Link href="/people"><div className="stat__n"><Counter value={team} /></div><div className="stat__l">researchers and staff</div></Link></div>
              <div className="stat"><Link href="/publications"><div className="stat__n"><Counter value={publications.length} /></div><div className="stat__l">publications</div></Link></div>
              <div className="stat"><Link href="/outreach"><div className="stat__n"><Counter value={workshops} /></div><div className="stat__l">workshops taught</div></Link></div>
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="section">
          <div className="wrap mission">
            <Reveal><p className="mission__quote">{missionHtml}</p></Reveal>
            <Reveal delay={120} className="muted">
              {mission.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </Reveal>
          </div>
        </section>

        {/* ── PIPELINE ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="sec-head">
              <h2 className="h2" style={{ maxWidth: '20ch' }}>From a sensor on the bench to a tool in the field</h2>
            </Reveal>
            <Reveal><Pipeline stages={highlights} /></Reveal>
          </div>
        </section>

        {/* ── FEATURED PROJECTS ── */}
        {featured.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <Reveal className="sec-head">
                <h2 className="h2">What we&apos;re working on</h2>
                <Link href="/projects" className="link-arrow">All {projects.length} projects</Link>
              </Reveal>
              <div className="fp">
                {featured.map((p, i) => {
                  const area = projectAreas[p.area]
                  return (
                    <Reveal key={p.id} delay={i * 90} className={`fp__cell${i === 0 ? ' fp__lead' : ''}`}>
                      <Link href={`/projects#${p.id}`} className={`fp__card${i === 0 ? ' fp__card--lead' : ''}`}>
                        <div>
                          <span className="fp__area"><i style={{ background: i === 0 ? 'var(--amber)' : area.color }} />{area.label}</span>
                          <p className="fp__title">{p.title}</p>
                          <p className="muted" style={{ marginTop: 12, maxWidth: '48ch' }}>{p.summary}</p>
                        </div>
                        {i === 0 && (
                          <svg className="fp__trace" viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
                            <path d="M0 60 H70 l8 -6 l8 6 H120 l6 10 l9 -62 l9 70 l7 -18 H190 q22 -20 44 0 H270 l8 -6 l8 6 H320 l6 10 l9 -62 l9 70 l7 -18 H400" />
                          </svg>
                        )}
                        <span className="fp__go" aria-hidden="true">→</span>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── PI ── */}
        {pi && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <Reveal className="pi">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {pi.photo && <img src={pi.photo} alt={pi.name} />}
                <div>
                  <p className="kicker">Principal investigator</p>
                  <p className="h2" style={{ marginTop: 6 }}>{pi.name}</p>
                  {pi.bio && <p className="muted" style={{ marginTop: 14, maxWidth: '60ch' }}>{pi.bio}</p>}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
                    <Link href="/people" className="btn btn--indigo">Meet the team</Link>
                    {pi.googleScholar && <a href={pi.googleScholar} target="_blank" rel="noopener noreferrer" className="btn btn--outline">Google Scholar</a>}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── LIFE IN THE LAB ── */}
        {labPhotos.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <Reveal className="sec-head">
                <h2 className="h2">Life in the lab</h2>
                <Link href="/outreach" className="link-arrow">Workshops and events</Link>
              </Reveal>
              <Reveal><Gallery images={labPhotos} /></Reveal>
            </div>
          </section>
        )}

        {/* ── COLLABORATORS ── */}
        <section className="section--tight" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal><p className="h3" style={{ marginBottom: 22 }}>We work with</p></Reveal>
          </div>
          <Collaborators items={collaborators} />
        </section>

        {/* ── CTA ── */}
        <section className="section">
          <div className="wrap">
            <Reveal className="cta">
              <svg className="cta__rings" viewBox="0 0 420 420" aria-hidden="true">
                <circle cx="210" cy="210" r="200" /><circle cx="210" cy="210" r="200" /><circle cx="210" cy="210" r="200" />
              </svg>
              <div style={{ position: 'relative' }}>
                <h2 className="h2">Build health tech that leaves the lab.</h2>
                <p style={{ marginTop: 14, color: '#d9d7f5', maxWidth: '52ch' }}>
                  We take interns, thesis students and collaborators. Send your details and CV in a couple of minutes.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
                <Link href="/connect#apply" className="btn btn--amber">Apply for an internship</Link>
                <Link href="/connect" className="btn btn--ghost">Get in touch</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
