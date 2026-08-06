'use client'

import type { Collaborator } from '@/content/home'

interface CollaboratorsProps {
  items: Collaborator[]
  /** seconds for one full loop — higher is slower */
  durationSec?: number
}

/**
 * A dynamic, auto-scrolling ticker of collaborator names/logos.
 *
 * Entries come from `content/home.ts` (the `collaborators` array), so adding a
 * new partner is as simple as appending to that array — no changes needed here.
 * The list is rendered twice back-to-back and translated by -50% so the loop is
 * seamless. Hovering pauses the scroll.
 */
export default function Collaborators({ items, durationSec = 32 }: CollaboratorsProps) {
  if (!items || items.length === 0) return null

  // Duplicate the list so the marquee can loop without a visible seam.
  const loop = [...items, ...items]

  return (
    <>
      <style>{`
        @keyframes collab-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="group relative w-full overflow-hidden py-2"
        style={{
          // Fade the edges so items appear/disappear gently.
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          maskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div
          className="flex w-max items-stretch group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animation: `collab-scroll ${durationSec}s linear infinite` }}
        >
          {loop.map((c, i) => {
            const inner = (
              <span className="flex items-center gap-3">
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="h-7 w-auto object-contain opacity-80"
                  />
                ) : null}
                <span
                  className="whitespace-nowrap text-[14px] font-normal tracking-wide text-[#5a5249]"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                >
                  {c.name}
                </span>
              </span>
            )

            return (
              <div
                key={`${c.name}-${i}`}
                className="mx-4 flex items-center rounded-sm border border-[#e8e3db] bg-white px-6 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#cecbf6]"
              >
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:opacity-70"
                    aria-label={c.name}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
