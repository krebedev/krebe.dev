# krebe.dev v1 — Astro site

New implementation of [krebe.dev](https://www.krebe.dev). Built with **Astro**. Scope for this round: **homepage only** — fixed hero, scroll-reveal story, and a closing contact block.

## Start here

| Task | Read first |
|------|------------|
| Story / copy only | [`src/data/draft.md`](src/data/draft.md) and [Editing the story](#editing-the-story) below |
| Hero, contact, SEO meta | [`src/data/site.ts`](src/data/site.ts) and [Content update checklist](#content-update-checklist) |
| UI / layout / motion | Relevant component in `src/components/`, [Client scripts](#client-scripts), [Styling & theming](#styling--theming-tailwind) |
| SEO / LLM files | [SEO & LLM discovery](#seo--llm-discovery), `src/data/llms.ts` |

## Living documentation

This file is a **living doc**. Keep it accurate as `v1/` evolves — agents rely on it instead of inferring from scratch.

Update this file when you:

- Scaffold or materially restructure the project
- Lock in stack choices (replace "TBD" placeholders with actual decisions)
- Add, remove, or rename routes, scripts, or env vars
- Change deployment, form handling, or content sources

Do not treat outdated sections (e.g. "not scaffolded yet") as harmless — fix or remove them in the same PR or task that makes them obsolete.

## Tech stack

- **Framework:** Astro (static site)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` (not the legacy `@astrojs/tailwind` integration)
- **Theming:** Light and dark modes — semantic design tokens, user-toggleable, system-preference aware on first visit
- **Content:** Hardcoded or local data files for now — no CMS, no MDX pipeline unless explicitly added
- **Hosting:** Netlify — base directory `v1/`, publish `dist/`, build command `npm run build`

## Commands

Run all commands from this directory (`v1/`):

```bash
npm install
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

## Client scripts

Keep client JavaScript minimal. Current scripts:

| Component | Purpose |
|-----------|---------|
| `ThemeToggle.astro` | Light/dark toggle + `localStorage` persistence |
| `StorySection.astro` | Scroll-reveal for story stanzas |
| `Hero.astro` | Pointer-tracking hero copy (desktop fine pointer only) |
| `SiteCursor.astro` | Custom cursor (fine pointer + hover, disabled on touch/reduced motion) |

Mobile, keyboard, and `prefers-reduced-motion` fall back to stacked hero layout without pointer-tracking.

## Styling & theming (Tailwind)

Use **Tailwind utility classes** in `.astro` components. Avoid ad-hoc CSS files unless Tailwind cannot express it (e.g. a complex animation).

### Light / dark mode

Support **both themes** with a user-facing toggle. Requirements:

| Requirement | Approach |
|-------------|----------|
| User can switch themes | Toggle control in the layout (header or footer) |
| Remembers choice | `localStorage` (e.g. key `theme`: `"light"` \| `"dark"`) |
| Respects system on first visit | If no stored preference, use `prefers-color-scheme` |
| No flash of wrong theme | Inline blocking script in `<head>` applies `dark` class before first paint |

**Tailwind v4 setup:** `@import "tailwindcss"` in `src/styles/global.css`; Vite plugin in `astro.config.mjs`. Theme tokens live in CSS (`:root` / `.dark` variables + `@theme inline`), not `tailwind.config.mjs`.

**Dark mode:** `@custom-variant dark (&:where(.dark, .dark *))` in `global.css` — toggle via `class="dark"` on `<html>`.

**Theme toggle:** `ThemeToggle.astro` — minimal inline script; keep theme logic in one place.

### Semantic tokens

**Orange is the dominant brand color** (`primary`). Use it for accents, CTAs, focus rings, and active nav — not as wallpaper.

Semantic tokens in `src/styles/global.css`:

- `primary` / `primary-foreground` — orange brand (`#f99f20`), dark text on buttons
- `background` / `foreground` — warm neutrals (stone palette), not blue-tinted
- `muted`, `border`, `ring` — supporting surfaces and focus

Use semantic classes in components (`text-primary`, `bg-primary`, `bg-background`). Avoid scattering raw `bg-orange` unless intentional.

### Design direction

**This is a bespoke, premium site — not a v0 remake.** `v0/` is a historical reference for old copy tone and images only. Do not replicate v0 layout, quirks, or visual patterns (multi-step forms, blue-heavy palette, chunky social buttons, etc.).

Aim for: restrained typography, generous whitespace, warm neutrals, orange as a precise accent, Geist sans throughout.

### Tailwind conventions

- Prefer layout/spacing utilities (`flex`, `gap`, `p-`, `max-w-`) over custom CSS
- Use responsive prefixes (`sm:`, `md:`, `lg:`) — mobile-first
- Extract repeated class strings into Astro components, not `@apply` piles
- Run `npm run build` to catch invalid Tailwind classes

## Pages (in scope)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — fixed hero, scroll-reveal story, closing email + social links |
| `/llms.txt` | Prerendered [llms.txt](https://llmstxt.org/) index (from `site.ts`) |
| `/llms-full.txt` | Prerendered Markdown export of story + contact (from `site.ts` + `draft.md`) |

Static assets in `public/`: `robots.txt`, `sitemap.xml`, `thumbnail.png`, favicons.

No other user-facing pages in this round. Do not add routes without approval.

## Project structure (target)

Follow conventional Astro layout as the project grows:

```
v1/
├── public/              # robots.txt, sitemap.xml, thumbnail.png, favicons
├── src/
│   ├── assets/          # Images optimized at build time (astro:assets)
│   ├── components/      # SiteHeader, SiteFooter, ThemeToggle, HeroIntro, …
│   ├── data/            # site.ts, story.ts, llms.ts, draft.md
│   ├── layouts/         # BaseLayout.astro
│   ├── pages/           # index.astro, llms.txt.ts, llms-full.txt.ts
│   └── styles/          # global.css — Tailwind import + theme tokens
├── astro.config.mjs
└── package.json
```

`src/styles/global.css` imports Tailwind and defines semantic color tokens as CSS variables for light/dark themes.

## SEO & LLM discovery

| Output | Source | Purpose |
|--------|--------|---------|
| `robots.txt` | `public/` (static) | Crawler rules; references sitemap and `/llms.txt` |
| `sitemap.xml` | `public/` (static) | Single-page sitemap for `https://www.krebe.dev/` |
| `/llms.txt` | `src/data/llms.ts` → `src/pages/llms.txt.ts` | [llms.txt](https://llmstxt.org/) index for AI agents |
| `/llms-full.txt` | `site.ts` + `draft.md` → `src/pages/llms-full.txt.ts` | Full homepage copy in Markdown |
| `thumbnail.png` | `public/` (static) | Social preview (`og:image` / `twitter:image`) |

`site.ts` holds `description` (meta/OG), `heroStatement` (hero only), and employer metadata. `BaseLayout.astro` sets canonical URL, Open Graph/Twitter tags, JSON-LD `Person` schema, and a `<link rel="alternate">` to `/llms.txt`.

Update `site.description` when scope or role changes materially. See [Content update checklist](#content-update-checklist).

## Content sources

| File | Holds |
|------|--------|
| `src/data/site.ts` | **Source of truth** — name, role, URLs, email, hero statement, meta description, employer, social links, social image dimensions |
| `src/data/draft.md` | Story copy (parsed by `story.ts` → `StorySection.astro`) |
| `src/data/llms.ts` | `buildLlmsTxt()` — generates `/llms.txt` body from `site.ts` |
| `public/thumbnail.png` | Social preview image (`og:image` / `twitter:image`) |

`../v0/` is legacy reference only — old portfolio/blog copy and images. Do not treat `v0/gatsby-config.js` as current metadata.

## Content update checklist

When changing site content, update every file that applies:

- [ ] **`draft.md`** — story stanzas, chapter headings, inline links
- [ ] **`site.ts`** — `heroStatement`, `description`, `closing`, `email`, `employer`, `social` if any of those change
- [ ] **`public/thumbnail.png`** — if visual branding in social previews should change
- [ ] **`site.socialImage.width` / `height`** — if `thumbnail.png` dimensions change

`/llms.txt`, `llms-full.txt`, and homepage meta tags update automatically from `site.ts` + `draft.md` at build time.

## Editing the story

`draft.md` is plain Markdown with a custom block structure parsed by `src/data/story.ts`:

| Syntax | Renders as |
|--------|------------|
| `## Heading` | Chapter title (`h2`) — first chapter shows portrait + title |
| `### Subheading` | Section label (`h3`, uppercase styling) |
| Blank line between paragraphs | Separate scroll-reveal stanza |
| `[label](https://url)` | Inline link in a stanza (`parseStoryLine` in `story.ts`) |
| `"Quoted line"` | Quote styling (`isStoryQuote` in `story.ts`) — line must start and end with `"` |

**Rules:**

- One blank line separates stanzas; a single long paragraph is one reveal unit.
- Short single-line stanzas (&lt; 48 chars) get punch emphasis styling.
- Do not use `#` (h1) — chapters start at `##`.
- Prefer plain language; avoid resume-style lists of employers or tech stacks unless intentional.

After editing `draft.md`, run `npm run build` from `v1/` to verify parsing.

## Legacy content reference (`v0/`)

Use only when migrating assets or checking historical tone:

- Old homepage copy: `../v0/src/pages/index.js`
- Old about/contact: `../v0/contents/about/`, `../v0/src/pages/contact.js`
- Images: `../v0/src/images/`

Write fresh copy and layout for v1 — do not mirror v0 page structure or visual design.

## Code conventions

- Prefer **Astro components** (`.astro`) for static markup; reach for client JS only when needed (see [Client scripts](#client-scripts)).
- Keep components small and purpose-named (`BaseLayout`, `SiteHeader`, `ThemeToggle`, `StorySection`).
- Use semantic Tailwind token classes (`bg-background`, `text-primary`) — not raw palette utilities scattered across components.
- Use semantic HTML and accessible patterns (labels, focus states, heading hierarchy). Theme toggle needs an accessible name and visible focus style.
- Match existing repo tone: professional, direct, not marketing-heavy.

## UI expectations

- **Bespoke and premium** — clean, intentional, generous whitespace; not a v0 port or generic template
- Orange as the dominant accent; warm neutrals for surfaces and text
- Light and dark themes must both feel deliberate — test both when reviewing UI
- Responsive from mobile up
- Fast: optimize images, avoid unnecessary JS bundles
- For detailed UI guidance, apply `.cursor/rules/frontend-ui-engineering.mdc`

## Closing block

Homepage ends with a simple contact block (`site.closing`, `site.email`, GitHub + LinkedIn). No separate contact page or form in this round.

## Boundaries

- Work only inside `v1/` unless explicitly migrating an asset from `v0/`
- No blog, portfolio, about, or MDX content pipeline in this round
- No new user-facing pages beyond `/` without approval (`/llms.txt` and `/llms-full.txt` are build artifacts)
- No commits unless the user asks

## Verification

Before marking work complete:

1. `npm run build` succeeds from `v1/`
2. Homepage renders correctly in dev and preview
3. Light/dark toggle works, persists across reloads, and respects system preference on first visit
4. Homepage story stanzas reveal on scroll; hero stays fixed while story scrolls over it
5. No console errors on pages that should be static
6. If copy or metadata changed: spot-check hero, story, contact block, `dist/llms.txt`, and `dist/llms-full.txt`
7. If `site.ts` or `thumbnail.png` changed: spot-check `og:image` meta in built `index.html`
8. If `draft.md` changed: confirm stanza breaks and any `[links](url)` render correctly
9. Reduced-motion and mobile: hero uses stacked layout (no pointer-tracking copy); story still readable
