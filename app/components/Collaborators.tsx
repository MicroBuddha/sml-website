import type { Collaborator } from '@/content/home'

/**
 * Auto-scrolling strip of partner names/logos (from content/home.ts).
 * The list is rendered twice and shifted by -50% for a seamless loop.
 * Hover pauses it.
 */
export default function Collaborators({ items, durationSec = 38 }: { items: Collaborator[]; durationSec?: number }) {
  if (!items?.length) return null
  const loop = [...items, ...items]
  return (
    <div className="mq">
      <style>{`
        .mq { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .mq__row { display: flex; width: max-content; gap: 14px; animation: marquee ${durationSec}s linear infinite; }
        .mq:hover .mq__row { animation-play-state: paused; }
        .mq__item { display: inline-flex; align-items: center; gap: 12px; padding: 14px 24px; border-radius: 999px; border: 1px solid var(--line); background: var(--card);
          font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; color: var(--text); text-decoration: none; white-space: nowrap; transition: border-color .2s, color .2s; }
        a.mq__item:hover { border-color: var(--indigo); color: var(--indigo); }
        .mq__item img { height: 26px; width: auto; }
      `}</style>
      <div className="mq__row">
        {loop.map((c, i) => {
          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {c.logo && <img src={c.logo} alt="" />}
              {c.name}
            </>
          )
          return c.url ? (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="mq__item" aria-hidden={i >= items.length} tabIndex={i >= items.length ? -1 : 0}>
              {inner}
            </a>
          ) : (
            <span key={i} className="mq__item" aria-hidden={i >= items.length}>{inner}</span>
          )
        })}
      </div>
    </div>
  )
}
