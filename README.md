# Tania Clayton — Economics Portfolio

A dark/light "Vibrant Scholastic" portfolio built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/TaniaClayton/
npm run build    # output to dist/
npm run preview  # preview the production build
```

## Project structure

- `src/pages/` — routes (`index.astro`, `blog/`, `reading-list.astro`, `404.astro`)
- `src/components/` — Nav, Hero, StatsBar, Portfolio, BlogList, Footer, ThemeToggle
- `src/content/blog/` — Markdown blog posts (one file per post)
- `src/data/` — `site.ts` (name, email, socials, CV path), `projects.ts` (portfolio cards)
- `src/styles/global.css` — theme colour variables (dark = `:root`, light = `html.light`)
- `tailwind.config.mjs` — design tokens from `DESIGN.md`
- `public/` — static assets (`files/cv.pdf`, `videos/hero.mp4`, `images/`)

## Theming

Dark is the default. The light/dark toggle lives in the nav and persists via `localStorage`.
Colours are CSS variables consumed by Tailwind, so a single class set works in both modes.

## Things to personalise (currently placeholders)

- **`src/data/site.ts`** — your LinkedIn URL (GitHub is set; email is set).
- **`src/data/projects.ts`** — real project titles, descriptions, categories, images.
- **`src/components/StatsBar.astro`** — two of the four stats ("Interests", "12+ Done").
- **`src/content/blog/*.md`** — replace the sample post bodies with your real writing.
- **`src/pages/reading-list.astro`** — your real reading list.
- **`public/images/`** — add project images and a real favicon/avatar.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and deploys to
GitHub Pages. **One-time setup:** in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**. The site is served at `https://taniaclayton.github.io/TaniaClayton/`
(configured via `site` + `base` in `astro.config.mjs`).
