'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Person } from '@/content/people'

// Tabs on the People page. Each tab collects one or more roles from content/people.ts.
const GROUPS: { label: string; plural: string; roles: Person['role'][] }[] = [
  { label: 'PhD', plural: 'PhD students', roles: ['PhD Student'] },
  { label: 'Masters', plural: 'Masters students', roles: ['Masters Student'] },
  { label: 'Dual degree & UG', plural: 'Dual degree and undergraduate students', roles: ['IDDDP', 'Undergraduate'] },
  { label: 'Staff', plural: 'Research and project staff', roles: ['Research Staff', 'Project Staff'] },
  { label: 'Alumni', plural: 'Alumni', roles: ['Alumni'] },
]

const ROLE_LABEL: Record<Person['role'], string> = {
  PI: 'Principal investigator',
  'PhD Student': 'PhD student',
  'Masters Student': 'Masters student',
  Undergraduate: 'Undergraduate',
  'Research Staff': 'Research staff',
  'Project Staff': 'Project staff',
  IDDDP: 'Dual degree student',
  Alumni: 'Alumnus',
}

const sortPeople = (a: Person, b: Person) =>
  (a.seniorityOrder ?? 999) - (b.seniorityOrder ?? 999) || a.name.localeCompare(b.name)

export default function PeopleGrid({
  people,
  projectsByPerson,
}: {
  people: Person[]
  projectsByPerson: Record<string, { id: string; title: string }[]>
}) {
  const [tab, setTab] = useState<string>('All')
  const [openId, setOpenId] = useState<string | null>(null)
  const pi = people.find((p) => p.role === 'PI')

  const groups = useMemo(
    () =>
      GROUPS.map((g) => ({ ...g, members: people.filter((p) => g.roles.includes(p.role)).sort(sortPeople) })).filter(
        (g) => g.members.length,
      ),
    [people],
  )
  const visible = tab === 'All' ? groups : groups.filter((g) => g.label === tab)
  const current = people.find((p) => p._id === openId)

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openId])

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <style>{`
        .pg__pi { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: center; padding: 40px; border-radius: var(--radius-lg);
          background: var(--card); border: 1px solid var(--line); margin-bottom: 56px; position: relative; overflow: hidden; }
        .pg__pi::after { content: ''; position: absolute; right: -80px; top: -80px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, var(--indigo-soft), transparent 70%); }
        .pg__pi img { width: 300px; height: 360px; object-fit: cover; border-radius: var(--radius-md); }
        .pg__tabs { position: sticky; top: 92px; z-index: 5; display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 0; margin-bottom: 18px; background: var(--paper); }
        .pg__grp { margin-top: 40px; }
        .pg__grp h2 { font-family: var(--font-display); font-weight: 600; font-size: 1.5rem; letter-spacing: -.015em; margin-bottom: 18px; display: flex; gap: 12px; align-items: baseline; }
        .pg__grp h2 span { font-family: var(--font-body); font-weight: 400; font-size: .95rem; color: var(--muted); }
        .pg__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; }
        .pp { position: relative; aspect-ratio: 4 / 5; border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; border: 0; padding: 0; text-align: left; font: inherit;
          background: var(--ink); color: #fff; animation: pcIn .5s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes pcIn { from { opacity: 0; transform: translateY(14px); } }
        .pp img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.2,.7,.2,1), filter .5s; }
        .pp:hover img, .pp:focus-visible img { transform: scale(1.07); filter: saturate(1.1); }
        .pp__ph { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-display); font-size: 3.4rem; font-weight: 600;
          background: linear-gradient(135deg, var(--indigo), var(--ink)); color: var(--lavender); }
        .pp__shade { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(22,19,61,.92) 100%); transition: background .4s; }
        .pp:hover .pp__shade, .pp:focus-visible .pp__shade { background: linear-gradient(180deg, rgba(22,19,61,.25) 0%, rgba(22,19,61,.95) 75%); }
        .pp__info { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; }
        .pp__name { font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; line-height: 1.15; }
        .pp__role { font-size: .85rem; color: var(--amber); margin-top: 3px; }
        .pp__bio { font-size: .85rem; color: #d9d7f5; line-height: 1.45; max-height: 0; opacity: 0; overflow: hidden; transition: max-height .45s ease, opacity .35s ease, margin .35s; }
        .pp:hover .pp__bio, .pp:focus-visible .pp__bio { max-height: 120px; opacity: 1; margin-top: 10px; }
        .pm { display: grid; grid-template-columns: 240px 1fr; }
        .pm img, .pm .pp__ph { position: relative; width: 100%; height: 100%; min-height: 320px; object-fit: cover; }
        .pm__body { padding: 40px 36px 36px; }
        .pm__links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
        .pm__proj { list-style: none; padding: 0; display: grid; gap: 8px; margin-top: 8px; }
        .pm__proj a { color: var(--indigo); text-decoration: none; }
        .pm__proj a:hover { text-decoration: underline; }
        @media (max-width: 820px) {
          .pg__pi { grid-template-columns: 1fr; padding: 24px; gap: 24px; }
          .pg__pi img { width: 100%; height: 320px; }
          .pg__tabs { top: 84px; }
          .pm { grid-template-columns: 1fr; }
          .pm img, .pm .pp__ph { min-height: 260px; max-height: 300px; }
          .pm__body { padding: 28px 22px; }
        }
      `}</style>

      <div className="wrap">
        {pi && (
          <div className="pg__pi reveal is-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {pi.photo ? <img src={pi.photo} alt={pi.name} /> : null}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="kicker">Principal investigator</p>
              <h2 className="h2" style={{ marginTop: 6 }}>{pi.name}</h2>
              {pi.bio && <p className="muted" style={{ marginTop: 14, maxWidth: '62ch' }}>{pi.bio}</p>}
              <div className="pm__links">
                {pi.email && <a className="btn btn--indigo" href={`mailto:${pi.email}`}>Email</a>}
                {pi.googleScholar && <a className="btn btn--outline" href={pi.googleScholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>}
                {pi.linkedin && <a className="btn btn--outline" href={pi.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              </div>
            </div>
          </div>
        )}

        <div className="pg__tabs" role="group" aria-label="Filter people">
          {['All', ...groups.map((g) => g.label)].map((t) => (
            <button key={t} className="chip" aria-pressed={tab === t} onClick={() => setTab(t)}>
              {t}
              {t !== 'All' && <span className="chip__count">{groups.find((g) => g.label === t)?.members.length}</span>}
            </button>
          ))}
        </div>

        {visible.map((g) => (
          <div key={g.label + tab} className="pg__grp">
            <h2>{g.plural} <span>{g.members.length}</span></h2>
            <div className="pg__grid">
              {g.members.map((p, i) => (
                <button key={p._id} className="pp" style={{ animationDelay: `${i * 60}ms` }} onClick={() => setOpenId(p._id)} aria-label={`About ${p.name}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.photo ? <img src={p.photo} alt="" loading="lazy" /> : <span className="pp__ph">{initials(p.name)}</span>}
                  <span className="pp__shade" />
                  <span className="pp__info">
                    <span className="pp__name" style={{ display: 'block' }}>{p.name}</span>
                    <span className="pp__role" style={{ display: 'block' }}>{ROLE_LABEL[p.role]}</span>
                    {p.bio && <span className="pp__bio" style={{ display: 'block' }}>{p.bio.length > 140 ? p.bio.slice(0, 140).trim() + '…' : p.bio}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 72, padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <p className="h3">Want to join the team?</p>
            <p className="muted" style={{ marginTop: 6 }}>We take interns, thesis students and PhD applicants through the year.</p>
          </div>
          <Link href="/connect#apply" className="btn btn--indigo">Apply now</Link>
        </div>
      </div>

      {current && (
        <>
          <div className="scrim" onClick={() => setOpenId(null)} />
          <div className="modal" role="dialog" aria-modal="true" aria-label={current.name}>
            <div className="pm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {current.photo ? <img src={current.photo} alt={current.name} /> : <span className="pp__ph">{initials(current.name)}</span>}
              <div className="pm__body">
                <button className="close-btn" onClick={() => setOpenId(null)} aria-label="Close">×</button>
                <p className="kicker">{ROLE_LABEL[current.role]}</p>
                <h2 className="h2" style={{ fontSize: '1.9rem', marginTop: 4, paddingRight: 40 }}>{current.name}</h2>
                {current.bio && <p className="muted" style={{ marginTop: 14 }}>{current.bio}</p>}
                {projectsByPerson[current.name]?.length ? (
                  <>
                    <p style={{ fontWeight: 600, marginTop: 22 }}>Projects</p>
                    <ul className="pm__proj">
                      {projectsByPerson[current.name].map((pr) => (
                        <li key={pr.id}><Link href={`/projects#${pr.id}`}>{pr.title}</Link></li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <div className="pm__links">
                  {current.email && <a className="btn btn--indigo" href={`mailto:${current.email}`}>Email</a>}
                  {current.googleScholar && <a className="btn btn--outline" href={current.googleScholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>}
                  {current.linkedin && <a className="btn btn--outline" href={current.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function initials(name: string) {
  return name.replace(/^Prof\.\s*|^Dr\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}
