'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { projectAreas, type Project, type ProjectArea } from '@/content/projects'

type Paper = { title: string; year: number; venue: string; link: string }
type P = Project & { papers: Paper[] }

export default function ProjectsExplorer({ projects }: { projects: P[] }) {
  const [area, setArea] = useState<ProjectArea | 'all'>('all')
  const [status, setStatus] = useState<'all' | 'ongoing' | 'completed'>('all')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  // Open a project from the URL hash, e.g. /projects#intraoral-camera
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (projects.some((p) => p.id === id)) setOpenId(id)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [projects])

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openId])

  const open = (id: string) => {
    setOpenId(id)
    history.replaceState(null, '', `#${id}`)
  }
  const close = () => {
    setOpenId(null)
    history.replaceState(null, '', window.location.pathname)
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length }
    projects.forEach((p) => (c[p.area] = (c[p.area] ?? 0) + 1))
    return c
  }, [projects])

  const shown = projects.filter((p) => {
    if (area !== 'all' && p.area !== area) return false
    if (status !== 'all' && p.status !== status) return false
    if (q) {
      const hay = [p.title, p.summary, ...(p.tags ?? []), ...(p.team ?? [])].join(' ').toLowerCase()
      if (!hay.includes(q.toLowerCase())) return false
    }
    return true
  })

  const current = projects.find((p) => p.id === openId)

  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <style>{`
        .px__bar { display: flex; flex-wrap: wrap; gap: 14px 24px; align-items: center; justify-content: space-between; margin-bottom: 30px; }
        .px__chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .px__chip-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
        .chip[aria-pressed="true"] .px__chip-dot { background: #fff !important; }
        .px__tools { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .px__search { font: inherit; font-size: .95rem; padding: 10px 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--card); min-width: 220px; }
        .px__search:focus { outline: none; border-color: var(--indigo); box-shadow: 0 0 0 4px var(--indigo-soft); }
        .px__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
        .pc { position: relative; text-align: left; font: inherit; color: inherit; cursor: pointer; display: flex; flex-direction: column; gap: 14px;
          padding: 26px; border-radius: var(--radius-lg); background: var(--card); border: 1px solid var(--line); overflow: hidden;
          animation: pcIn .45s cubic-bezier(.2,.7,.2,1) both; transition: transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s, border-color .3s; }
        @keyframes pcIn { from { opacity: 0; transform: translateY(14px) scale(.98); } }
        .pc::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--c); transform: scaleY(0); transform-origin: top; transition: transform .35s ease; }
        .pc:hover { transform: translateY(-4px); box-shadow: 0 22px 44px rgba(22,19,61,.12); border-color: var(--c); }
        .pc:hover::before { transform: scaleY(1); }
        .pc__top { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: .84rem; }
        .pc__area { display: inline-flex; gap: 8px; align-items: center; font-weight: 500; color: var(--c); }
        .pc__status { padding: 3px 10px; border-radius: 999px; background: #eef7f1; color: #1d6b3d; }
        .pc__status--done { background: #f0eff4; color: var(--muted); }
        .pc__title { font-family: var(--font-display); font-weight: 600; font-size: 1.32rem; line-height: 1.18; letter-spacing: -.015em; }
        .pc__team { margin-top: auto; display: flex; align-items: center; gap: 8px; font-size: .85rem; color: var(--muted); }
        .av { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-size: .7rem; font-weight: 600; color: #fff; background: var(--indigo); border: 2px solid #fff; }
        .av + .av { margin-left: -8px; }
        .px__empty { padding: 60px 20px; text-align: center; border: 1px dashed var(--line); border-radius: var(--radius-lg); }
        .dr { padding: 40px 40px 60px; }
        .dr__band { height: 8px; border-radius: 4px; background: var(--c); width: 64px; margin-bottom: 22px; }
        .dr h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; margin: 28px 0 8px; }
        .dr__papers { list-style: none; padding: 0; display: grid; gap: 10px; }
        .dr__papers li { padding: 14px 16px; border-radius: var(--radius-sm); background: var(--paper); }
        .dr__papers a { color: var(--indigo); text-decoration: none; }
        .dr__papers a:hover { text-decoration: underline; }
        @media (max-width: 600px) { .dr { padding: 30px 22px 50px; } .px__search { min-width: 0; width: 100%; } .px__tools { width: 100%; } }
      `}</style>

      <div className="wrap">
        <div className="px__bar">
          <div className="px__chips" role="group" aria-label="Filter by area">
            <button className="chip" aria-pressed={area === 'all'} onClick={() => setArea('all')}>
              All <span className="chip__count">{counts.all}</span>
            </button>
            {(Object.keys(projectAreas) as ProjectArea[]).filter((k) => counts[k]).map((k) => (
              <button key={k} className="chip" aria-pressed={area === k} onClick={() => setArea(k)}>
                <span className="px__chip-dot" style={{ background: projectAreas[k].color }} />
                {projectAreas[k].label} <span className="chip__count">{counts[k]}</span>
              </button>
            ))}
          </div>
          <div className="px__tools">
            <div className="seg" role="group" aria-label="Filter by status">
              {(['all', 'ongoing', 'completed'] as const).map((s) => (
                <button key={s} aria-pressed={status === s} onClick={() => setStatus(s)}>
                  {s === 'all' ? 'All' : s === 'ongoing' ? 'Ongoing' : 'Completed'}
                </button>
              ))}
            </div>
            <input className="px__search" type="search" placeholder="Search projects or people" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search projects" />
          </div>
        </div>

        {shown.length ? (
          <div className="px__grid" key={`${area}-${status}-${q}`}>
            {shown.map((p, i) => {
              const a = projectAreas[p.area]
              return (
                <button key={p.id} id={p.id} className="pc" style={{ ['--c' as string]: a.color, animationDelay: `${i * 45}ms` }} onClick={() => open(p.id)}>
                  <span className="pc__top">
                    <span className="pc__area"><span className="px__chip-dot" style={{ background: a.color }} />{a.label}</span>
                    <span className={`pc__status${p.status === 'completed' ? ' pc__status--done' : ''}`}>{p.status === 'ongoing' ? 'Ongoing' : 'Completed'}</span>
                  </span>
                  <span className="pc__title">{p.title}</span>
                  <span className="muted" style={{ fontSize: '.96rem' }}>{p.summary}</span>
                  {p.team?.length ? (
                    <span className="pc__team">
                      <span style={{ display: 'flex' }}>
                        {p.team.slice(0, 3).map((n) => (
                          <span key={n} className="av" style={{ background: a.color }}>{initials(n)}</span>
                        ))}
                      </span>
                      {p.team.length === 1 ? p.team[0] : `${p.team.length} people`}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="px__empty">
            <p className="h3">No projects match those filters</p>
            <p className="muted" style={{ marginTop: 8 }}>Try another area, or clear the search.</p>
            <button className="btn btn--outline" style={{ marginTop: 18 }} onClick={() => { setArea('all'); setStatus('all'); setQ('') }}>Clear filters</button>
          </div>
        )}
      </div>

      {current && (
        <>
          <div className="scrim" onClick={close} />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label={current.title} style={{ ['--c' as string]: projectAreas[current.area].color }}>
            <button className="close-btn" onClick={close} aria-label="Close project">×</button>
            <div className="dr">
              <div className="dr__band" />
              <p className="kicker" style={{ color: projectAreas[current.area].color }}>
                {projectAreas[current.area].label}, {current.status}
              </p>
              <h2 className="h2" style={{ marginTop: 8, fontSize: '2rem' }}>{current.title}</h2>
              <p className="lede muted" style={{ marginTop: 14 }}>{current.summary}</p>
              {current.why && (<><h3>Why it matters</h3><p className="muted">{current.why}</p></>)}
              {current.how && (<><h3>How we approach it</h3><p className="muted">{current.how}</p></>)}
              {current.outcomes?.length ? (<><h3>Results so far</h3><ul className="muted" style={{ paddingLeft: 18 }}>{current.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></>) : null}
              {current.tags?.length ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                  {current.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              ) : null}
              {current.team?.length ? (<><h3>Team</h3><p className="muted">{current.team.join(', ')}</p></>) : null}
              {current.papers.length ? (
                <>
                  <h3>Related papers</h3>
                  <ul className="dr__papers">
                    {current.papers.map((pp) => (
                      <li key={pp.title}>
                        {pp.link ? <a href={pp.link} target="_blank" rel="noopener noreferrer">{pp.title}</a> : pp.title}
                        <div className="muted" style={{ fontSize: '.85rem', marginTop: 4 }}>{[pp.venue, pp.year].filter(Boolean).join(', ')}</div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <div style={{ marginTop: 34, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/connect#apply" className="btn btn--indigo">Join this work</Link>
                <Link href="/publications" className="btn btn--outline">All publications</Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </section>
  )
}

function initials(name: string) {
  return name.replace(/^Prof\.\s*|^Dr\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}
