import Link from 'next/link'
import { footerLinks, LAB_NAME, LAB_AFFILIATION, LAB_EMAIL } from '@/content/site'

export default function Footer() {
  return (
    <footer className="dark" style={{ borderTop: '1px solid var(--line-dark)' }}>
      <style>{`
        .ft { display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 40px; padding: 72px 0 40px; }
        .ft h4 { font-family: var(--font-display); font-weight: 600; font-size: 1rem; margin-bottom: 14px; color: #fff; }
        .ft ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        .ft a { color: #b9b6dc; text-decoration: none; transition: color .2s; }
        .ft a:hover { color: var(--amber); }
        .ft__base { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 22px 0 34px;
          border-top: 1px solid var(--line-dark); font-size: .85rem; color: #8e8ab8; }
        @media (max-width: 800px) { .ft { grid-template-columns: 1fr 1fr; } .ft__about { grid-column: 1 / -1; } }
      `}</style>
      <div className="wrap">
        <div className="ft">
          <div className="ft__about">
            <p className="h3" style={{ color: '#fff' }}>{LAB_NAME}</p>
            <p className="muted" style={{ marginTop: 10, maxWidth: '34ch' }}>
              Sensors, signals and AI for health screening, at the {LAB_AFFILIATION}.
            </p>
            <a href={`mailto:${LAB_EMAIL}`} style={{ display: 'inline-block', marginTop: 16, color: 'var(--amber)' }}>
              {LAB_EMAIL}
            </a>
          </div>
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith('mailto:') ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ft__base">
          <span>© {new Date().getFullYear()} {LAB_NAME}, IIT Bombay</span>
          <span>Powai, Mumbai 400076</span>
        </div>
      </div>
    </footer>
  )
}
