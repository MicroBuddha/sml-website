'use client'

import { useCallback, useEffect, useState } from 'react'

/** Photo mosaic with a keyboard-friendly lightbox. */
export default function Gallery({ images, captions = [] }: { images: string[]; captions?: string[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  if (!images.length) return null

  return (
    <>
      <style>{`
        .gal { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 12px; }
        .gal__item { position: relative; overflow: hidden; border-radius: var(--radius-md); border: 0; padding: 0; cursor: zoom-in; background: var(--ink-2); }
        .gal__item:nth-child(5n+1) { grid-column: span 2; grid-row: span 2; }
        .gal__item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1), filter .4s; }
        .gal__item:hover img { transform: scale(1.06); }
        .gal__item:focus-visible { outline-offset: 2px; }
        .lb { position: fixed; inset: 0; z-index: 300; background: rgba(12,10,36,.94); display: grid; place-items: center; animation: fade .2s ease; }
        .lb img { max-width: min(1100px, 92vw); max-height: 80vh; border-radius: 12px; animation: pop2 .3s ease; }
        @keyframes pop2 { from { opacity: 0; transform: scale(.96); } }
        .lb__btn { position: absolute; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border-radius: 50%; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.06); color: #fff; font-size: 22px; cursor: pointer; }
        .lb__btn:hover { background: rgba(255,255,255,.16); }
        .lb__cap { position: absolute; bottom: 28px; left: 0; right: 0; text-align: center; color: #d9d7f5; font-size: .92rem; }
        @media (max-width: 720px) { .gal { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 150px; } }
      `}</style>
      <div className="gal">
        {images.map((src, i) => (
          <button key={src + i} className="gal__item" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={captions[i] ?? 'Lab photo'} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[open]} alt={captions[open] ?? 'Lab photo'} onClick={(e) => e.stopPropagation()} />
          <button className="lb__btn" style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo">‹</button>
          <button className="lb__btn" style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo">›</button>
          <button className="close-btn" style={{ top: 20, right: 20, background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => setOpen(null)} aria-label="Close">×</button>
          <p className="lb__cap">{captions[open] ?? ''} {open + 1} / {images.length}</p>
        </div>
      )}
    </>
  )
}
