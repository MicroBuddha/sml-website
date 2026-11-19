# How to update the website

Everything on the site comes from the files in `content/`. Edit a file, then run:

```bash
npm run build        # must finish without errors
git add -A && git commit -m "what you changed" && git push
```

Vercel updates the live site 1–2 minutes after the push.

| To change… | Edit this file | Notes |
| --- | --- | --- |
| People (add, remove, IDDDP, alumni) | `content/people.ts` | Photo → `public/images/people/name.jpg`. `role: 'IDDDP'` puts someone in the IDDDP section. |
| Projects | `content/projects.ts` | `featured: true` shows it on the homepage. |
| Publications | `content/publications.ts` | Newest paper also appears in the homepage "What's new" panel. |
| Workshops, events, photos | `content/events.ts` | Photos → `public/images/events/`. |
| Homepage "What's new" announcements | `content/home.ts` → `news` | Delete items when they go out of date. |
| Collaborators strip | `content/home.ts` → `collaborators` | One line per partner. Optional logo → `public/images/logos/`. |
| Homepage headline and mission | `content/home.ts` → `hero`, `mission` | |
| Internship projects on the form | `content/connect.ts` → `openings` | `open: false` marks one as closed. |
| Form choices (programmes, years, enquiry types) | `content/connect.ts` | |
| Where form submissions are saved | `content/connect.ts` → `FORM_ENDPOINT` | See `docs/form-setup.md`. |
| Courses and community programmes | `content/outreach.ts` | |
| Menu and footer links, lab email | `content/site.ts` | |
| Colours and fonts | `app/globals.css` (top of file) | |

**Most common build error:** a missing comma after `}` when adding an entry. Every entry ends with `},`.
