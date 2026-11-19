import { projects, projectAreas } from '@/content/projects'
import { publications } from '@/content/publications'
import PageHead from '../components/PageHead'
import Footer from '../components/Footer'
import ProjectsExplorer from './ProjectsExplorer'

export const metadata = {
  title: 'Projects | Sensing & Monitoring Lab',
  description: 'Ongoing and completed projects in sensing hardware, medical imaging, acoustic diagnostics, edge AI and language models for health.',
}

export default function ProjectsPage() {
  // Attach paper details so the drawer can list related publications.
  const pubIndex = Object.fromEntries(
    publications.map((p) => [p._id, { title: p.title, year: p.year, venue: p.journal ?? '', link: p.link ?? (p.doi ? `https://doi.org/${p.doi}` : p.arxivId ? `https://arxiv.org/abs/${p.arxivId}` : '') }]),
  )
  const withPubs = projects.map((p) => ({
    ...p,
    papers: (p.publications ?? []).map((id) => pubIndex[id]).filter(Boolean),
  }))

  return (
    <>
      <PageHead kicker="Projects" title="Problems we are working on right now" trace="ppg">
        Devices, models and field studies across {Object.keys(projectAreas).length} areas. Filter by area, or open a project to see who is on it and what has come out of it.
      </PageHead>
      <ProjectsExplorer projects={withPubs} />
      <Footer />
    </>
  )
}
