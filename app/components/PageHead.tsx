import type { ReactNode } from 'react'

/**
 * Dark header band used at the top of every inner page.
 * A faint ECG-style trace draws itself along the bottom edge on load.
 */
export default function PageHead({
  kicker,
  title,
  children,
  trace = 'ecg',
}: {
  kicker?: string
  title: ReactNode
  children?: ReactNode
  trace?: 'ecg' | 'ppg' | 'sound'
}) {
  const paths: Record<string, string> = {
    ecg: 'M0 90 H220 l14 -8 l10 8 H300 l8 12 l12 -86 l12 98 l10 -24 H420 q30 -26 60 0 H700 l14 -8 l10 8 H780 l8 12 l12 -86 l12 98 l10 -24 H900 q30 -26 60 0 H1180 l14 -8 l10 8 H1260 l8 12 l12 -86 l12 98 l10 -24 H1380 q30 -26 60 0 H1600',
    ppg: 'M0 100 C60 100 80 30 120 30 C150 30 160 70 180 66 C200 62 210 80 260 100 C320 100 340 30 380 30 C410 30 420 70 440 66 C460 62 470 80 520 100 C580 100 600 30 640 30 C670 30 680 70 700 66 C720 62 730 80 780 100 C840 100 860 30 900 30 C930 30 940 70 960 66 C980 62 990 80 1040 100 C1100 100 1120 30 1160 30 C1190 30 1200 70 1220 66 C1240 62 1250 80 1300 100 C1360 100 1380 30 1420 30 C1450 30 1460 70 1480 66 C1500 62 1510 80 1600 100',
    sound:
      'M0 80 H160 l6 -30 l6 60 l6 -50 l6 40 l6 -20 H260 l5 -14 l5 28 l5 -14 H520 l6 -30 l6 60 l6 -50 l6 40 l6 -20 H620 l5 -14 l5 28 l5 -14 H880 l6 -30 l6 60 l6 -50 l6 40 l6 -20 H980 l5 -14 l5 28 l5 -14 H1240 l6 -30 l6 60 l6 -50 l6 40 l6 -20 H1340 l5 -14 l5 28 l5 -14 H1600',
  }
  return (
    <section className="page-head dark">
      <svg className="page-head__trace" viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true">
        <path d={paths[trace]} stroke={trace === 'ppg' ? 'var(--amber)' : 'var(--lavender)'} />
      </svg>
      <div className="wrap" style={{ position: 'relative' }}>
        {kicker && <p className="kicker" style={{ marginBottom: 14 }}>{kicker}</p>}
        <h1 className="display" style={{ maxWidth: '16ch' }}>{title}</h1>
        {children && <div className="lede muted" style={{ marginTop: 22 }}>{children}</div>}
      </div>
    </section>
  )
}
