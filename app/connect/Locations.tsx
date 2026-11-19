'use client'

import { useState } from 'react'

type Loc = { name: string; address: string; embed: string; mapLink: string }

export default function Locations({ locations }: { locations: Loc[] }) {
  const [i, setI] = useState(0)
  const loc = locations[i]
  return (
    <div className="lc">
      <style>{`
        .lc { display: grid; grid-template-columns: 320px 1fr; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--line); background: var(--card); }
        .lc__list { display: flex; flex-direction: column; padding: 12px; gap: 6px; background: var(--ink); }
        .lc__tab { text-align: left; font: inherit; color: #d9d7f5; background: none; border: 1px solid transparent; border-radius: 14px; padding: 18px; cursor: pointer; transition: all .25s; }
        .lc__tab:hover { background: rgba(169,163,255,.08); }
        .lc__tab[aria-selected="true"] { background: var(--ink-2); border-color: var(--line-dark); color: #fff; }
        .lc__tab strong { display: block; font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; }
        .lc__tab span { font-size: .86rem; color: #b9b6dc; }
        .lc__map { position: relative; min-height: 400px; }
        .lc__map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; animation: fade .4s ease; }
        .lc__open { position: absolute; right: 16px; bottom: 16px; z-index: 1; }
        @media (max-width: 820px) { .lc { grid-template-columns: 1fr; } .lc__map { min-height: 320px; } }
      `}</style>
      <div className="lc__list" role="tablist" aria-label="Lab locations">
        {locations.map((l, k) => (
          <button key={l.name} role="tab" aria-selected={k === i} className="lc__tab" onClick={() => setI(k)}>
            <strong>{l.name}</strong>
            <span>{l.address}</span>
          </button>
        ))}
      </div>
      <div className="lc__map">
        <iframe key={loc.embed} src={loc.embed} title={`Map: ${loc.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a className="btn btn--indigo lc__open" href={loc.mapLink} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
      </div>
    </div>
  )
}
