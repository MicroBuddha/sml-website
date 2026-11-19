'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks, navCta, LAB_NAME } from '@/content/site'

// Menu items live in content/site.ts.
export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <style>{`
        .nav { position: fixed; top: 14px; left: 0; right: 0; z-index: 100; pointer-events: none; }
        .nav__bar {
          pointer-events: auto; margin: 0 auto; width: min(calc(var(--max) + 2 * var(--gutter)), calc(100% - 28px));
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 10px 10px 10px 22px; border-radius: 999px;
          background: rgba(22, 19, 61, .72); backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(169,163,255,.18);
          transition: background .3s ease, box-shadow .3s ease, padding .3s ease;
          position: relative; overflow: hidden;
        }
        .nav--scrolled .nav__bar { background: rgba(22, 19, 61, .92); box-shadow: 0 14px 40px rgba(22,19,61,.28); }
        .nav__progress { position: absolute; left: 0; bottom: 0; height: 2px; background: linear-gradient(90deg, var(--lavender), var(--amber)); transition: width .1s linear; }
        .nav__brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff; }
        .nav__pulse { width: 30px; height: 30px; flex: none; }
        .nav__pulse path { fill: none; stroke: var(--amber); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
          stroke-dasharray: 60; animation: navpulse 2.4s linear infinite; }
        @keyframes navpulse { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        .nav__name { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; letter-spacing: -.01em; line-height: 1.1; }
        .nav__sub { display: block; font-family: var(--font-body); font-weight: 400; font-size: .74rem; color: #b9b6dc; }
        .nav__links { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; }
        .nav__link { display: block; padding: 9px 14px; border-radius: 999px; color: #d9d7f5; text-decoration: none; font-size: .93rem; transition: background .2s, color .2s; }
        .nav__link:hover { color: #fff; background: rgba(169,163,255,.12); }
        .nav__link--on { color: var(--ink); background: var(--lavender); }
        .nav__link--on:hover { color: var(--ink); background: var(--lavender); }
        .nav__cta { margin-left: 8px; padding: 10px 18px; border-radius: 999px; background: var(--amber); color: var(--ink); font-weight: 600; font-size: .93rem; text-decoration: none; transition: background .2s, transform .2s; }
        .nav__cta:hover { background: #f1ad47; transform: translateY(-1px); }
        .nav__burger { display: none; width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(169,163,255,.15); cursor: pointer; position: relative; }
        .nav__burger span { position: absolute; left: 13px; right: 13px; height: 2px; background: #fff; border-radius: 2px; transition: transform .25s, opacity .25s, top .25s; }
        .nav__burger span:nth-child(1) { top: 16px; } .nav__burger span:nth-child(2) { top: 21px; } .nav__burger span:nth-child(3) { top: 26px; }
        .nav__burger--x span:nth-child(1) { top: 21px; transform: rotate(45deg); }
        .nav__burger--x span:nth-child(2) { opacity: 0; }
        .nav__burger--x span:nth-child(3) { top: 21px; transform: rotate(-45deg); }
        .nav__sheet { pointer-events: auto; width: min(calc(var(--max) + 2 * var(--gutter)), calc(100% - 28px)); margin: 8px auto 0; padding: 10px; border-radius: 24px;
          background: rgba(22,19,61,.96); border: 1px solid rgba(169,163,255,.18); display: none; flex-direction: column; animation: sheet .25s ease; }
        @keyframes sheet { from { opacity: 0; transform: translateY(-8px); } }
        .nav__sheet a { padding: 14px 18px; border-radius: 14px; color: #ecebff; text-decoration: none; font-size: 1.05rem; }
        .nav__sheet a:hover, .nav__sheet a.on { background: rgba(169,163,255,.14); }
        @media (max-width: 900px) {
          .nav__links, .nav__cta--desk { display: none; }
          .nav__burger { display: block; }
          .nav__sheet { display: flex; }
        }
      `}</style>

      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <nav className="nav__bar" aria-label="Main">
          <Link href="/" className="nav__brand">
            <svg className="nav__pulse" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M2 16h6l3-7 4 13 3-9 2 3h8" />
            </svg>
            <span className="nav__name">
              {LAB_NAME}
              <span className="nav__sub">IIT Bombay</span>
            </span>
          </Link>

          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`nav__link${isActive(l.href) ? ' nav__link--on' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={navCta.href} className="nav__cta nav__cta--desk">
                {navCta.label}
              </Link>
            </li>
          </ul>

          <button
            className={`nav__burger${open ? ' nav__burger--x' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
          <span className="nav__progress" style={{ width: `${progress * 100}%` }} />
        </nav>

        {open && (
          <div className="nav__sheet">
            {[...navLinks, navCta].map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? 'on' : ''}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
