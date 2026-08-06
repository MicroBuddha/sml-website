import { events } from '@/content/events'
import ImageCarousel from '../components/ImageCarousel'

export const metadata = {
  title: "Workshops & Events | Sensing & Monitoring Lab",
  description: "Workshops, events, and achievements from the Sensing & Monitoring Lab, IIT Bombay.",
}

const SECTIONS: { category: string; heading: string; empty: string }[] = [
  { category: 'workshop', heading: 'Workshops', empty: 'No workshops listed yet.' },
  { category: 'event', heading: 'Events & Conferences', empty: 'No events listed yet.' },
  { category: 'achievement', heading: 'Achievements', empty: 'No achievements listed yet.' },
]

export default function WorkshopsEventsPage() {
  const items = [...events].sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .we-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }

        .we-hero {
          padding: 120px 40px 64px;
          max-width: 900px;
          margin: 0 auto;
        }
        .we-hero__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #854f0b;
          margin-bottom: 20px;
        }
        .we-hero__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(44px, 6.5vw, 76px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 24px;
        }
        .we-hero__title em { font-style: italic; color: #3c3489; }
        .we-hero__sub {
          font-size: 16px;
          line-height: 1.8;
          color: #5a5249;
          font-weight: 300;
          max-width: 560px;
        }

        .we-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 40px 120px;
        }

        .we-section { margin-bottom: 80px; }
        .we-section:last-child { margin-bottom: 0; }
        .we-section__header {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: baseline;
          gap: 24px;
          margin-bottom: 40px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e0d8;
        }
        .we-section__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #111;
          white-space: nowrap;
        }
        .we-section__count {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9e8a67;
          font-weight: 500;
          justify-self: end;
        }
        .we-empty {
          font-size: 14px;
          color: #9e8a67;
          font-style: italic;
          padding: 8px 0 0;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .we-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .we-card {
          background: #fff;
          border: 1px solid #e8e3db;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .we-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .we-card__body { padding: 22px 24px 26px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .we-card__date {
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #854f0b;
          font-weight: 500;
        }
        .we-card__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 19px;
          font-weight: 400;
          color: #111;
          line-height: 1.25;
          margin: 0;
        }
        .we-card__location {
          font-size: 12px;
          color: #9e8a67;
        }
        .we-card__desc {
          font-size: 13px;
          line-height: 1.65;
          color: #5a5249;
          font-weight: 300;
          margin-top: 4px;
        }
        .we-card__people {
          font-size: 11.5px;
          color: #854f0b;
          margin-top: 6px;
        }
        .we-card__link {
          font-size: 12px;
          font-weight: 500;
          color: #3c3489;
          text-decoration: none;
          border-bottom: 1px solid #cecbf6;
          align-self: flex-start;
          margin-top: 8px;
          padding-bottom: 1px;
        }
        .we-card__link:hover { border-color: #3c3489; }

        @media (max-width: 900px) {
          .we-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .we-hero { padding: 80px 24px 56px; }
          .we-body { padding: 0 24px 80px; }
          .we-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="we-root">

        {/* ── HERO ── */}
        <section className="we-hero">
          <p className="we-hero__label">Community</p>
          <h1 className="we-hero__title">
            Workshops <em>&amp;</em> Events
          </h1>
          <p className="we-hero__sub">
            Teaching, outreach, and milestones from the lab — workshops we've run, events we've taken part
            in, and achievements along the way.
          </p>
        </section>

        <div className="we-body">
          {SECTIONS.map(({ category, heading, empty }) => {
            const sectionItems = items.filter((it: any) => it.category === category)
            return (
              <section key={category} className="we-section">
                <div className="we-section__header">
                  <h2 className="we-section__title">{heading}</h2>
                  <span className="we-section__count">
                    {sectionItems.length} {sectionItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {sectionItems.length === 0 ? (
                  <p className="we-empty">{empty}</p>
                ) : (
                  <div className="we-grid">
                    {sectionItems.map((it: any) => (
                      <EventCard key={it._id} item={it} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}

function EventCard({ item }: { item: any }) {
  const galleryImages =
    item.gallery && item.gallery.length > 0
      ? item.gallery.map((src: string) => ({ url: src, alt: item.title }))
      : item.coverImage
      ? [{ url: item.coverImage, alt: item.title }]
      : []

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    : null

  return (
    <div className="we-card">
      <ImageCarousel images={galleryImages} aspectRatio="4 / 3" rounded={false} />
      <div className="we-card__body">
        {formattedDate && <span className="we-card__date">{formattedDate}</span>}
        <h3 className="we-card__title">{item.title}</h3>
        {item.location && <span className="we-card__location">{item.location}</span>}
        {item.description && <p className="we-card__desc">{item.description}</p>}
        {item.people && item.people.length > 0 && (
          <p className="we-card__people">{item.people.join(', ')}</p>
        )}
        {item.link && (
          <a href={item.link} target="_blank" rel="noreferrer" className="we-card__link">
            Learn more ↗
          </a>
        )}
      </div>
    </div>
  )
}
