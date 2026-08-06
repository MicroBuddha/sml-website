# Sensing & Monitoring Lab — Website

Website for the Sensing & Monitoring Lab, Koita Centre for Digital Health, IIT Bombay.

Built with **Next.js 16** + **React 19** + **TypeScript**. All content (people,
research, publications, workshops/events) lives in plain TypeScript files under
`/content` — there's no external CMS or database. Edit a file, commit, push,
and Vercel redeploys automatically.

## Editing content

| What you want to change            | File                       |
|-------------------------------------|-----------------------------|
| Lab members (PI, students, alumni)  | `content/people.ts`         |
| Research projects                   | `content/research.ts`       |
| Publications                        | `content/publications.ts`   |
| Workshops, events, achievements     | `content/events.ts`         |
| Homepage copy, research area cards  | `app/page.tsx`              |
| "Foundation" page copy              | `app/foundation/page.tsx`   |
| Navigation links                    | `app/components/Navbar.tsx` |

Each `content/*.ts` file has an `interface` describing the shape of an entry
and a commented example showing exactly what to copy/paste. Just add objects
to the exported array.

**Photos:** drop image files into `public/images/people/`,
`public/images/research/`, or `public/images/events/`, then reference them in
the content file as e.g. `/images/people/nirmal.jpg`. Leave a `photo`/`image`
field out entirely to fall back to the site's built-in placeholder graphics.
Add more than one image to an event's `gallery` array to get an
auto-rotating carousel automatically — no extra config needed.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables
or accounts are required — the site is fully static content, so `npm run dev`
and `npm run build` both work immediately after cloning.

## Deploying

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, at github.com/new — don't initialize
it with a README so this push doesn't conflict.)

### Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import this repository.
3. Leave all settings at their defaults (Vercel auto-detects Next.js) and
   click **Deploy** — no environment variables needed.
4. Every future push to `main` redeploys automatically. Editing a file in
   `/content` and pushing is enough to update the live site — no rebuild
   steps, no CMS login.

## Project structure

```
app/                  Pages (Next.js App Router)
  page.tsx            Homepage
  people/              /people
  research/            /research
  publications/        /publications
  workshops-events/    /workshops-events
  foundation/          /foundation
  contact/             /contact
  components/          Navbar, ImageCarousel
content/              Editable site content (people, research, publications, events)
public/images/        Photos referenced from /content
```
