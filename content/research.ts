// Research projects shown on the /research page.
//
// `image`: put the file in /public/images/research/ and reference it as
// e.g. '/images/research/oral-camera.jpg'. Leave undefined to hide the image.
// `teamMembers`: just the person's name as a plain string (doesn't need to
// match a /content/people.ts entry).
// `order`: lower numbers appear first within their status group (ongoing /
// completed). Ties fall back to array order.

export interface ResearchProject {
  _id: string
  title: string
  area:
    | 'oral-health'
    | 'non-invasive-screening'
    | 'physiological-monitoring'
    | 'acoustic-biomarkers'
    | 'neonatal-monitoring'
    | 'edge-other'
  status: 'ongoing' | 'completed'
  shortDescription: string
  motivation?: string
  approach?: string
  outcomes?: string[]
  image?: string
  tags?: string[]
  teamMembers?: string[]
  startYear?: number
  order?: number
}

export const researchProjects: ResearchProject[] = [
  // Example — copy this block per project, then delete the comment markers:
  //
  // {
  //   _id: 'oral-camera',
  //   title: 'AI-enabled Portable Oral Camera',
  //   area: 'oral-health',
  //   status: 'ongoing',
  //   shortDescription: 'A multimodal intraoral device with swappable sensor heads for OPMD and caries detection.',
  //   motivation: 'Why this problem matters and who it affects.',
  //   approach: 'The methods, algorithms, or devices used.',
  //   outcomes: ['First result or milestone', 'Second result or milestone'],
  //   image: '/images/research/oral-camera.jpg',
  //   tags: ['Device + AI', 'Computer Vision'],
  //   teamMembers: ['Prof. Nirmal Punjabi'],
  //   startYear: 2023,
  //   order: 1,
  // },
]
