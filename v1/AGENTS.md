# krebe.dev v1 — Astro site

New implementation of [krebe.dev](https://www.krebe.dev). Built with **Astro**. Scope for this round: **homepage only** — fixed hero, scroll-reveal story, and a closing contact block.

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
- **Hosting:** Netlify (target; config to be added with the project)

## Commands

Run all commands from this directory (`v1/`):

```bash
npm install
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

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

**Theme toggle:** Small client island or minimal inline script — the only justified client JS on static pages. Keep it in one place (e.g. `ThemeToggle.astro`).

### Semantic tokens

**Orange is the dominant brand color** (`primary`). Use it for accents, CTAs, focus rings, and active nav — not as wallpaper.

Semantic tokens in `src/styles/global.css`:

- `primary` / `primary-foreground` — orange brand (`#f99f20`), dark text on buttons
- `background` / `foreground` — warm neutrals (stone palette), not blue-tinted
- `muted`, `border`, `ring` — supporting surfaces and focus

Use semantic classes in components (`text-primary`, `bg-primary`, `bg-background`). Avoid scattering raw `bg-orange` unless intentional.

### Design direction

**This is a bespoke, premium site — not a v0 remake.** `v0/` is a reference for metadata and copy tone only. Do not replicate v0 layout, quirks, or visual patterns (multi-step forms, blue-heavy palette, chunky social buttons, etc.).

Aim for: restrained typography, generous whitespace, warm neutrals, orange as a precise accent, Geist sans throughout.

### Tailwind conventions

- Prefer layout/spacing utilities (`flex`, `gap`, `p-`, `max-w-`) over custom CSS
- Use responsive prefixes (`sm:`, `md:`, `lg:`) — mobile-first
- Extract repeated class strings into Astro components, not `@apply` piles, unless a single primitive (e.g. `Button`) warrants it
- Run `npm run build` to catch invalid Tailwind classes

## Pages (in scope)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — fixed hero, scroll-reveal story, closing email + social links |

No other routes in this round. A minimal shared layout (header, footer, nav between these two pages) is expected.

## Project structure (target)

Follow conventional Astro layout as the project grows:

```
v1/
├── public/              # Static assets (favicon)
├── src/
│   ├── assets/          # Images optimized at build time (astro:assets)
│   ├── components/      # SiteHeader, SiteFooter, ThemeToggle, Button, …
│   ├── data/            # site.ts — metadata; story.ts — parsed draft.md stanzas
│   ├── layouts/         # BaseLayout.astro
│   ├── pages/           # index.astro
│   └── styles/          # global.css — Tailwind import + theme tokens
├── astro.config.mjs
└── package.json
```

`src/styles/global.css` imports Tailwind and defines semantic color tokens as CSS variables for light/dark themes.

## Content reference

Personal copy, SEO text, social URLs, and images are in `../v0/`:

- Metadata: `../v0/gatsby-config.js`
- Homepage copy: `../v0/src/pages/index.js`
- Contact page & form: `../v0/src/pages/contact.js`
- Images: `../v0/src/images/`

Reuse **metadata** (name, email, social URLs) from `v0/`. Write fresh copy and layout — do not mirror v0 page structure or visual design.

## Code conventions

- Prefer **Astro components** (`.astro`) for static markup; reach for client JS only when needed (theme toggle, story reveal).
- Keep components small and purpose-named (`BaseLayout`, `SiteHeader`, `ThemeToggle`, `StorySection`).
- Use semantic Tailwind token classes (`bg-background`, `text-primary`) — not raw palette utilities scattered across components.
- Use semantic HTML and accessible patterns (labels, focus states, heading hierarchy). Theme toggle needs an accessible name and visible focus style.
- Minimize client JavaScript — theme toggle and story reveal are the expected scripts.
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
- No new pages beyond `/` without approval
- No commits unless the user asks

## Verification

Before marking work complete:

1. `npm run build` succeeds from `v1/`
2. Homepage renders correctly in dev and preview
3. Light/dark toggle works, persists across reloads, and respects system preference on first visit
4. Homepage story stanzas reveal on scroll; hero stays fixed while story scrolls over it
5. No console errors on pages that should be static
