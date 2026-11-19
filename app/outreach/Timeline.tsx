'use client'

import { useState } from 'react'
import type { EventItem } from '@/content/events'

const CAT: Record<EventItem['category'], { label: string; color: string }> = {
  workshop: { label: 'Workshop', color: '#3c3489' },
  event: { label: 'Event', color: '#1f7a6d' },
  achievement: { label: 'Achievement', color: '#b26a0e' },
}

function fmt(d?: string) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Vertical timeline; click an entry to expand its details and photos. */
export default function Timeline({ items }: { items: EventItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?._id ?? null)
  const [filter, setFilter] = useState<'all' | EventItem['category']>('all')
  const cats = Array.from(new Set(items.map((i) => i.category)))
  const shown = filter === 'all' ? items : items.filter((i) => i.category === filter)

  if (!items.length) return <p className="muted">Workshops and events will appear here.</p>

  return (
    <div>
      <style>{`
        .tl { position: relative; list-style: none; padding: 0; margin: 0; }
        .tl::before { content: ''; position: absolute; left: 132px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(var(--indigo), var(--amber)); opacity: .35; }
        .tl__item { display: grid; grid-template-columns: 120px 1fr; gap: 40px; padding-bottom: 22px; }
        .tl__date { text-align: right; font-size: .9rem; color: var(--muted); padding-top: 22px; font-variant-numeric: tabular-nums; }
        .tl__card { position: relative; border-radius: var(--radius-lg); background: var(--card); border: 1px solid var(--line); transition: border-color .3s, box-shadow .3s; }
        .tl__card::before { content: ''; position: absolute; left: -29px; top: 24px; width: 14px; height: 14px; border-radius: 50%; background: var(--paper); border: 3px solid var(--c); transition: transform .3s, background .3s; }
        .tl__card--open { border-color: var(--c); box-shadow: 0 18px 40px rgba(22,19,61,.1); }
        .tl__card--open::before { background: var(--c); transform: scale(1.2); }
        .tl__head { width: 100%; display: flex; justify-content: space-between; gap: 16px; align-items: center; padding: 20px 24px; background: none; border: 0; font: inherit; color: inherit; text-align: left; cursor: pointer; }
        .tl__title { font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; line-height: 1.2; }
        .tl__cat { font-size: .82rem; font-weight: 500; color: var(--c); }
        .tl__plus { flex: none; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; transition: transform .3s, background .3s; }
        .tl__card--open .tl__plus { transform: rotate(45deg); background: var(--c); color: #fff; border-color: var(--c); }
        .tl__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s ease; }
        .tl__card--open .tl__body { grid-template-rows: 1fr; }
        .tl__inner { overflow: hidden; }
        .tl__pad { padding: 0 24px 24px; }
        .tl__photos { display: flex; gap: 10px; overflow-x: auto; margin-top: 16px; scroll-snap-type: x mandatory; }
        .tl__photos img { height: 150px; border-radius: 10px; scroll-snap-align: start; }
        .tl__people { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
        @media (max-width: 680px) {
          .tl::before { left: 8px; }
          .tl__item { grid-template-columns: 1fr; gap: 6px; padding-left: 30px; }
          .tl__date { text-align: left; padding-top: 0; }
          .tl__card::before { left: -29px; }
        }
      `}</style>

      {cats.length > 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          <button className="chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
          {cats.map((c) => (
            <button key={c} className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>{CAT[c].label}s</button>
          ))}
        </div>
      )}

      <ol className="tl">
        {shown.map((e) => {
          const isOpen = open === e._id
          return (
            <li key={e._id} className="tl__item">
              <div className="tl__date">{fmt(e.date)}</div>
              <div className={`tl__card${isOpen ? ' tl__card--open' : ''}`} style={{ ['--c' as string]: CAT[e.category].color }}>
                <button className="tl__head" onClick={() => setOpen(isOpen ? null : e._id)} aria-expanded={isOpen}>
                  <span>
                    <span className="tl__cat">{CAT[e.category].label}{e.location ? `, ${e.location}` : ''}</span>
                    <span className="tl__title" style={{ display: 'block', marginTop: 4 }}>{e.title}</span>
                  </span>
                  <span className="tl__plus" aria-hidden="true">+</span>
                </button>
                <div className="tl__body">
                  <div className="tl__inner">
                    <div className="tl__pad">
                      {e.description && <p className="muted">{e.description}</p>}
                      {e.people?.length ? (
                        <div className="tl__people">{e.people.map((p) => <span key={p} className="tag">{p}</span>)}</div>
                      ) : null}
                      {e.gallery?.length ? (
                        <div className="tl__photos">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {e.gallery.map((g) => <img key={g} src={g} alt="" loading="lazy" />)}
                        </div>
                      ) : null}
                      {e.link && (
                        <a href={e.link} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ marginTop: 18 }}>
                          Read the post
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
