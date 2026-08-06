'use client'

import { useEffect, useState } from 'react'

export interface CarouselImage {
  url: string
  alt?: string
  caption?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  /** Placeholder label shown when there are no images yet, e.g. "Workshop photos coming soon" */
  placeholderLabel?: string
  /** ms between auto-advances */
  intervalMs?: number
  aspectRatio?: string
  rounded?: boolean
}

export default function ImageCarousel({
  images,
  placeholderLabel = 'Photos coming soon',
  intervalMs = 4500,
  aspectRatio = '16 / 10',
  rounded = true,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [hasMultiple, images.length, intervalMs])

  return (
    <>
      <style>{`
        .ic-root {
          position: relative;
          width: 100%;
          aspect-ratio: ${aspectRatio};
          overflow: hidden;
          border-radius: ${rounded ? '4px' : '0'};
          background: #ede8e0;
          border: 1px solid #e8e3db;
        }
        .ic-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .ic-slide--active { opacity: 1; }
        .ic-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ic-caption {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 10px 16px;
          font-size: 11.5px;
          font-weight: 400;
          color: #fff;
          background: linear-gradient(0deg, rgba(20,18,14,0.55), transparent);
          font-family: 'DM Sans', sans-serif;
        }
        .ic-dots {
          position: absolute;
          bottom: 10px;
          right: 12px;
          display: flex;
          gap: 5px;
        }
        .ic-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          transition: background 0.25s, transform 0.25s;
        }
        .ic-dot--active {
          background: #fff;
          transform: scale(1.3);
        }
        .ic-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #a09585;
          background:
            repeating-linear-gradient(45deg, #f0ece5, #f0ece5 10px, #ede8e0 10px, #ede8e0 20px);
        }
        .ic-placeholder-icon {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 30px;
          opacity: 0.6;
        }
        .ic-placeholder-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="ic-root">
        {images.length === 0 ? (
          <div className="ic-placeholder">
            <span className="ic-placeholder-icon">◇</span>
            <span className="ic-placeholder-label">{placeholderLabel}</span>
          </div>
        ) : (
          <>
            {images.map((img, i) => (
              <div key={img.url + i} className={`ic-slide${i === index ? ' ic-slide--active' : ''}`}>
                <img src={img.url} alt={img.alt ?? ''} className="ic-img" />
                {img.caption && <div className="ic-caption">{img.caption}</div>}
              </div>
            ))}
            {hasMultiple && (
              <div className="ic-dots">
                {images.map((_, i) => (
                  <span key={i} className={`ic-dot${i === index ? ' ic-dot--active' : ''}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
