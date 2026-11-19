'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface FeedItem {
  key: string
  tab: string // short tab label
  label: string // kicker inside the card
  title: string
  text?: string
  meta?: string
  href?: string
  cta?: string
  image?: string
  mark?: string // big outlined watermark for slides without a photo
  accent: string
  external?: boolean
}

const DURATION = 6500 // ms per slide

/**
 * "What's new" panel for the homepage hero.
 * Cycles through real lab updates (built in app/page.tsx from the content
 * files). Hover or focus pauses it; tabs jump straight to an item.
 */
export default function HeroFeed({ items }: { items: FeedItem[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(0)
  const elapsedRef = useRef(0)

  useEffect(() => {
    if (items.length < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let raf = 0
    startRef.current = performance.now() - elapsedRef.current
    const tick = (t: number) => {
      if (!paused) {
        const e = t - startRef.current
        elapsedRef.current = e
        setProgress(Math.min(1, e / DURATION))
        if (e >= DURATION) {
          elapsedRef.current = 0
          startRef.current = t
          setI((x) => (x + 1) % items.length)
        }
      } else {
        startRef.current = t - elapsedRef.current
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, items.length])

  const go = (n: number) => {
    elapsedRef.current = 0
    startRef.current = performance.now()
    setProgress(0)
    setI(n)
  }

  if (!items.length) return null
  const it = items[i]

  const body = (
    <>
      {it.image && (
        <span className="hf__img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.image} alt="" />
        </span>
      )}
      {!it.image && it.mark && <span className="hf__mark" aria-hidden="true" style={{ WebkitTextStrokeColor: it.accent }}>{it.mark}</span>}
      <span className="hf__content">
        <span className="hf__label" style={{ color: it.accent }}>{it.label}</span>
        <span className="hf__title">{it.title}</span>
        {it.text && <span className="hf__text">{it.text}</span>}
        <span className="hf__foot">
          {it.meta && <span className="hf__meta">{it.meta}</span>}
          {it.href && <span className="hf__cta" style={{ background: it.accent }}>{it.cta ?? 'Read more'}</span>}
        </span>
      </span>
    </>
  )

  return (
    <div
      className="hf"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{`
        .hf { border: 1px solid var(--line-dark); border-radius: 24px; background: rgba(34,30,85,.5); overflow: hidden; backdrop-filter: blur(6px); }
        .hf__tabs { display: grid; grid-template-columns: repeat(${items.length}, 1fr); gap: 6px; padding: 14px 16px 0; }
        .hf__tab { background: none; border: 0; padding: 0 0 12px; text-align: left; cursor: pointer; font: inherit; color: #8e8ab8; font-size: .8rem; min-width: 0; }
        .hf__tab span { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px; transition: color .2s; }
        .hf__tab[aria-selected="true"] span, .hf__tab:hover span { color: #fff; }
        .hf__bar { display: block; height: 3px; border-radius: 3px; background: rgba(169,163,255,.18); overflow: hidden; }
        .hf__bar i { display: block; height: 100%; background: var(--amber); }
        .hf__card { position: relative; overflow: hidden; display: flex; flex-direction: column; min-height: clamp(380px, 32vw, 500px); color: inherit; text-decoration: none; }
        .hf__slide { display: flex; flex-direction: column; flex: 1; animation: hfIn .55s cubic-bezier(.2,.7,.2,1); }
        @keyframes hfIn { from { opacity: 0; transform: translateY(16px); } }
        .hf__img { display: block; height: clamp(150px, 13vw, 220px); margin: 14px 16px 0; border-radius: 16px; overflow: hidden; }
        .hf__img img { width: 100%; height: 100%; object-fit: cover; animation: hfZoom ${DURATION}ms linear both; }
        @keyframes hfZoom { from { transform: scale(1.12); } to { transform: scale(1); } }
        .hf__mark { position: absolute; right: -10px; bottom: -30px; font-family: var(--font-display); font-weight: 700; font-size: clamp(7rem, 13vw, 13rem); line-height: 1; color: transparent; -webkit-text-stroke: 1.5px; opacity: .35; pointer-events: none; animation: hfMark 1.2s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes hfMark { from { opacity: 0; transform: translateX(40px); } }
        .hf__content { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 24px 28px 28px; flex: 1; }
        .hf__label { font-size: .88rem; font-weight: 600; }
        .hf__title { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.45rem, 2.1vw, 2.1rem); line-height: 1.12; letter-spacing: -.02em; color: #fff; }
        .hf__text { color: #c9c6ea; max-width: 54ch; }
        .hf__foot { margin-top: auto; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
        .hf__meta { font-size: .86rem; color: #8e8ab8; }
        .hf__cta { padding: 10px 18px; border-radius: 999px; color: var(--ink); font-weight: 600; font-size: .9rem; transition: transform .2s; }
        a.hf__card:hover .hf__cta { transform: translateX(4px); }
        @media (max-width: 600px) { .hf__tab span { font-size: .72rem; } .hf__content { padding: 20px; } }
      `}</style>

      <div className="hf__tabs" role="tablist" aria-label="Lab updates">
        {items.map((x, n) => (
          <button key={x.key} role="tab" aria-selected={n === i} className="hf__tab" onClick={() => go(n)}>
            <span>{x.tab}</span>
            <span className="hf__bar"><i style={{ width: n < i ? '100%' : n === i ? `${progress * 100}%` : '0%' }} /></span>
          </button>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        {it.href ? (
          it.external ? (
            <a className="hf__card" href={it.href} target="_blank" rel="noopener noreferrer" key={it.key}>
              <span className="hf__slide">{body}</span>
            </a>
          ) : (
            <Link className="hf__card" href={it.href} key={it.key}>
              <span className="hf__slide">{body}</span>
            </Link>
          )
        ) : (
          <div className="hf__card" key={it.key}><span className="hf__slide">{body}</span></div>
        )}
      </div>
    </div>
  )
}
