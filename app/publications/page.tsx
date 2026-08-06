import { publications } from '@/content/publications'
import PublicationsClient from './PublicationsClient'

export const metadata = {
  title: 'Publications | Sensing & Monitoring Lab',
  description: 'Peer-reviewed journal articles, conference papers and preprints from the Sensing & Monitoring Lab, IIT Bombay.',
}

export default function PublicationsPage() {
  const sorted = [...publications].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1
    return b.year - a.year
  })

  return <PublicationsClient publications={sorted} />
}
