import { people } from '@/content/people'
import { projects } from '@/content/projects'
import PageHead from '../components/PageHead'
import Footer from '../components/Footer'
import PeopleGrid from './PeopleGrid'

export const metadata = {
  title: 'People | Sensing & Monitoring Lab',
  description: 'Researchers, students and staff of the Sensing & Monitoring Lab at IIT Bombay.',
}

export default function PeoplePage() {
  // Which projects each person appears on (matched by name in content/projects.ts).
  const projectsByPerson: Record<string, { id: string; title: string }[]> = {}
  projects.forEach((p) =>
    (p.team ?? []).forEach((name) => {
      ;(projectsByPerson[name] ??= []).push({ id: p.id, title: p.title })
    }),
  )
  const current = people.filter((p) => p.role !== 'Alumni').length

  return (
    <>
      <PageHead kicker="People" title="The team behind the devices and models">
        {current} researchers, students and engineers working across hardware, signals and AI, plus the alumni who built the lab with us.
      </PageHead>
      <PeopleGrid people={people} projectsByPerson={projectsByPerson} />
      <Footer />
    </>
  )
}
