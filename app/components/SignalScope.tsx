'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A live "oscilloscope" for the homepage hero.
 * Three synthetic physiological traces scroll across a grid:
 *   ECG (lavender), PPG / pulse (amber) and heart sounds (soft white).
 * Moving the pointer over it acts like a probe: a cursor line appears and the
 * readouts show each trace's value at that point. Respects reduced motion.
 */

const CHANNELS = [
  { key: 'ecg', label: 'ECG', unit: 'mV', color: '#a9a3ff', scale: 1.4 },
  { key: 'ppg', label: 'Pulse (PPG)', unit: 'a.u.', color: '#e39a2d', scale: 1 },
  { key: 'pcg', label: 'Heart sound', unit: 'a.u.', color: 'rgba(236,235,255,.75)', scale: 1 },
] as const

type Key = (typeof CHANNELS)[number]['key']

const g = (x: number, mu: number, s: number) => Math.exp(-((x - mu) ** 2) / (2 * s * s))

function ecg(p: number) {
  return 0.12 * g(p, 0.18, 0.025) - 0.12 * g(p, 0.37, 0.008) + 1.0 * g(p, 0.4, 0.01) - 0.26 * g(p, 0.43, 0.01) + 0.28 * g(p, 0.66, 0.045)
}
function ppg(p: number) {
  const q = (p + 0.85) % 1
  return 0.9 * g(q, 0.22, 0.07) + 0.32 * g(q, 0.48, 0.07) - 0.45
}
// deterministic pseudo-noise so the sound trace looks textured but stable
function noise(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453
  return s - Math.floor(s) - 0.5
}
function pcg(p: number, i: number) {
  const s1 = g(p, 0.42, 0.018)
  const s2 = 0.65 * g(p, 0.7, 0.014)
  return (s1 + s2) * (Math.sin(i * 1.7) * 0.6 + noise(i) * 0.9)
}

export default function SignalScope({ bpm = 72 }: { bpm?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const probeRef = useRef<number | null>(null)
  const [readout, setReadout] = useState<Record<Key, number> | null>(null)
  const [hr, setHr] = useState(bpm)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, raf = 0, last = performance.now(), offset = 0
    const SPEED = 110 // px per second
    const beatPx = () => (60 / bpm) * SPEED * 1.6

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const valueAt = (key: Key, x: number) => {
      const pos = x + offset
      const bp = beatPx()
      const p = ((pos % bp) + bp) % bp / bp
      if (key === 'ecg') return ecg(p)
      if (key === 'ppg') return ppg(p)
      return pcg(p, Math.floor(pos))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // grid
      const step = 28
      ctx.lineWidth = 1
      for (let x = (-offset % step + step) % step; x < w; x += step) {
        ctx.strokeStyle = 'rgba(169,163,255,0.07)'
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += step) {
        ctx.strokeStyle = 'rgba(169,163,255,0.07)'
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      const band = h / CHANNELS.length
      CHANNELS.forEach((c, ci) => {
        const mid = band * ci + band * 0.58
        const amp = band * 0.36 * c.scale
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y = mid - valueAt(c.key, x) * amp
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = c.color
        ctx.lineWidth = c.key === 'pcg' ? 1.2 : 2
        ctx.shadowColor = c.color
        ctx.shadowBlur = c.key === 'pcg' ? 0 : 10
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      // fading leading edge (right side) — like a sweep
      const grad = ctx.createLinearGradient(w - 90, 0, w, 0)
      grad.addColorStop(0, 'rgba(22,19,61,0)')
      grad.addColorStop(1, 'rgba(22,19,61,0.9)')
      ctx.fillStyle = grad
      ctx.fillRect(w - 90, 0, 90, h)

      // probe
      const px = probeRef.current
      if (px !== null) {
        ctx.strokeStyle = 'rgba(227,154,45,.8)'
        ctx.setLineDash([4, 5])
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke()
        ctx.setLineDash([])
        CHANNELS.forEach((c, ci) => {
          const mid = band * ci + band * 0.58
          const amp = band * 0.36 * c.scale
          const y = mid - valueAt(c.key, px) * amp
          ctx.fillStyle = c.color
          ctx.beginPath(); ctx.arc(px, y, 4.5, 0, Math.PI * 2); ctx.fill()
        })
        setReadout({
          ecg: valueAt('ecg', px),
          ppg: valueAt('ppg', px),
          pcg: valueAt('pcg', px),
        })
      }
    }

    let frame = 0
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      offset += SPEED * dt
      draw()
      if (++frame % 90 === 0) setHr(bpm + Math.round(Math.sin(t / 2300) * 2))
      raf = requestAnimationFrame(loop)
    }
    if (reduce) draw()
    else raf = requestAnimationFrame(loop)

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      probeRef.current = e.clientX - r.left
      if (reduce) draw()
    }
    const leave = () => {
      probeRef.current = null
      setReadout(null)
      if (reduce) draw()
    }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [bpm])

  return (
    <div className="scope">
      <style>{`
        .scope { position: relative; border: 1px solid var(--line-dark); border-radius: 22px; background: rgba(34,30,85,.45); overflow: hidden; }
        .scope canvas { display: block; width: 100%; height: clamp(300px, 30vw, 460px); cursor: crosshair; touch-action: pan-y; }
        .scope__bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--line-dark); font-size: .84rem; color: #b9b6dc; }
        .scope__live { display: inline-flex; align-items: center; gap: 8px; }
        .scope__dot { width: 8px; height: 8px; border-radius: 50%; background: #ff6b6b; box-shadow: 0 0 0 0 rgba(255,107,107,.6); animation: livedot 1.6s infinite; }
        @keyframes livedot { 70% { box-shadow: 0 0 0 9px rgba(255,107,107,0); } 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0); } }
        .scope__hr { font-family: var(--font-display); font-size: 1.05rem; color: #fff; font-variant-numeric: tabular-nums; }
        .scope__reads { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line-dark); }
        .scope__read { padding: 12px 18px; font-size: .82rem; color: #b9b6dc; }
        .scope__read + .scope__read { border-left: 1px solid var(--line-dark); }
        .scope__val { display: block; font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-variant-numeric: tabular-nums; margin-top: 2px; }
        @media (max-width: 600px) { .scope canvas { height: 260px; } .scope__read { padding: 10px 12px; } }
      `}</style>
      <div className="scope__bar">
        <span className="scope__live"><span className="scope__dot" /> Simulated signals</span>
        <span>Heart rate <span className="scope__hr">{hr}</span> bpm</span>
      </div>
      <canvas ref={canvasRef} aria-label="Animated ECG, pulse and heart-sound traces. Move the pointer over them to read values." role="img" />
      <div className="scope__reads">
        {CHANNELS.map((c) => (
          <div key={c.key} className="scope__read">
            <span style={{ color: c.color }}>●</span> {c.label}
            <span className="scope__val">
              {readout ? `${readout[c.key] >= 0 ? '+' : ''}${readout[c.key].toFixed(2)}` : '—'}{' '}
              <small style={{ fontSize: '.7rem', color: '#8e8ab8' }}>{c.unit}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
