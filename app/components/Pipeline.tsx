'use client'

import { useState } from 'react'
import type { Highlight } from '@/content/home'

/**
 * The lab's work shown as a signal chain: sense → embed → edge → remote → deploy.
 * Stages come from `highlights` in content/home.ts. Hover or tap a stage to
 * read about it; a pulse travels along the line to the active stage.
 */
export default function Pipeline({ stages }: { stages: Highlight[] }) {
  const [active, setActive] = useState(0)
  const pct = stages.length > 1 ? (active / (stages.length - 1)) * 100 : 0

  return (
    <div className="pl">
      <style>{`
        .pl__track { position: relative; display: grid; grid-template-columns: repeat(${stages.length}, 1fr); gap: 8px; }
        .pl__line { position: absolute; left: calc(100% / ${stages.length * 2}); right: calc(100% / ${stages.length * 2}); top: 27px; height: 2px; background: var(--line); }
        .pl__fill { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, var(--indigo), var(--amber)); transition: width .5s cubic-bezier(.2,.7,.2,1); }
        .pl__fill::after { content: ''; position: absolute; right: -6px; top: -5px; width: 12px; height: 12px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 6px rgba(227,154,45,.2); }
        .pl__stage { position: relative; background: none; border: 0; padding: 0; text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; color: inherit; font: inherit; }
        .pl__node { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--card); border: 2px solid var(--line);
          font-size: 22px; color: var(--indigo); transition: all .3s ease; position: relative; z-index: 1; }
        .pl__stage[aria-selected="true"] .pl__node { background: var(--indigo); border-color: var(--indigo); color: #fff; transform: scale(1.08); }
        .pl__stage:hover .pl__node { border-color: var(--indigo); }
        .pl__name { display: block; margin-top: 14px; font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; line-height: 1.2; padding: 0 6px; }
        .pl__tag { display: block; font-size: .82rem; color: var(--muted); margin-top: 2px; }
        .pl__panel { margin-top: 36px; display: grid; grid-template-columns: auto 1fr; gap: 28px; align-items: start; padding: 30px 32px; border-radius: var(--radius-lg); background: var(--card); border: 1px solid var(--line); }
        .pl__step { font-family: var(--font-display); font-weight: 600; font-size: 3.4rem; line-height: 1; color: var(--indigo-soft); -webkit-text-stroke: 1.5px var(--indigo); }
        .pl__body { animation: plIn .35s ease; }
        @keyframes plIn { from { opacity: 0; transform: translateX(10px); } }
        @media (max-width: 760px) {
          .pl__track { grid-template-columns: 1fr; gap: 14px; }
          .pl__line { left: 27px; right: auto; top: 28px; bottom: 28px; width: 2px; height: auto; }
          .pl__fill { right: 0; bottom: auto; height: ${pct}%; width: 100% !important; transition: height .5s; }
          .pl__fill::after { right: -5px; top: auto; bottom: -6px; }
          .pl__stage { display: grid; grid-template-columns: 56px 1fr; gap: 16px; align-items: center; text-align: left; }
          .pl__name { margin-top: 0; }
          .pl__panel { grid-template-columns: 1fr; gap: 10px; padding: 24px; }
          .pl__step { font-size: 2.4rem; }
        }
      `}</style>
      <div className="pl__track" role="tablist" aria-label="From sensor to field">
        <div className="pl__line"><div className="pl__fill" style={{ width: `${pct}%` }} /></div>
        {stages.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={i === active}
            className="pl__stage"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="pl__node" aria-hidden="true">{s.icon}</span>
            <span>
              <span className="pl__name">{s.title}</span>
              <span className="pl__tag">{s.tag}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="pl__panel" role="tabpanel">
        <span className="pl__step" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
        <div className="pl__body" key={active}>
          <p className="h3">{stages[active].title}</p>
          <p className="muted" style={{ marginTop: 8, maxWidth: '62ch' }}>{stages[active].desc}</p>
        </div>
      </div>
    </div>
  )
}
