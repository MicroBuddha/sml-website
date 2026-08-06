import type { Testimonial } from '@/content/home'

interface TestimonialsProps {
  items: Testimonial[]
}

/**
 * Responsive grid of testimonial cards. Content comes from `content/home.ts`
 * (the `testimonials` array) so the section is easy to extend.
 */
export default function Testimonials({ items }: TestimonialsProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <figure
          key={i}
          className="flex h-full flex-col rounded-[4px] border border-[#e8e3db] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        >
          <span
            className="mb-3 block text-[40px] leading-none text-[#cecbf6]"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="flex-1 text-[14.5px] font-light leading-[1.75] text-[#4a4540]">
            {t.quote}
          </blockquote>
          <figcaption className="mt-5 border-t border-[#eee7dd] pt-4">
            <p className="text-[14px] font-medium text-[#111]">{t.author}</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#9e8a67]">
              {t.role}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
