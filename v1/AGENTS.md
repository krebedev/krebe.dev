# krebe.dev v1 — Astro site

New implementation of [krebe.dev](https://www.krebe.dev). Built with **Astro**. Scope for this round: **homepage** and **contact page** only.

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
- **Styling:** TBD at scaffold time — keep it simple; CSS Modules or scoped Astro styles are fine
- **Content:** Hardcoded or local data files for now — no CMS, no MDX pipeline unless explicitly added
- **Hosting:** Netlify (target; config to be added with the project)

## Commands

Run all commands from this directory (`v1/`):

```bash
npm install      # after package.json exists
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build locally
```

If the Astro project is not scaffolded yet, that is the first task — use the official Astro starter and keep the default structure lean.

## Pages (in scope)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — who Solomon is, what he does, CTA to contact |
| `/contact` | Contact — form, social links, or both |

No other routes in this round. A minimal shared layout (header, footer, nav between these two pages) is expected.

## Project structure (target)

Follow conventional Astro layout as the project grows:

```
v1/
├── public/           # Static assets (favicon, images)
├── src/
│   ├── components/   # Reusable UI (Layout, Nav, Button, etc.)
│   ├── layouts/      # Page shells
│   ├── pages/        # File-based routes (index.astro, contact.astro)
│   └── styles/       # Global styles, tokens, resets
├── astro.config.mjs
└── package.json
```

Colocate component-specific styles with components when using CSS Modules or `<style>` blocks.

## Content reference

Personal copy, SEO text, social URLs, and images are in `../v0/`:

- Metadata: `../v0/gatsby-config.js`
- Homepage copy: `../v0/src/pages/index.js`
- Contact page & form: `../v0/src/pages/contact.js`
- Images: `../v0/src/images/`

Reuse content where it still fits the simpler site. Rewrite only when the old copy references removed pages (portfolio, blog, about).

## Code conventions

- Prefer **Astro components** (`.astro`) for static markup; reach for framework islands only when client-side interactivity is required (e.g. contact form validation/submit).
- Keep components small and purpose-named (`Layout`, `SiteHeader`, `ContactForm`).
- Use semantic HTML and accessible patterns (labels, focus states, heading hierarchy).
- Minimize client JavaScript — Astro's default is zero JS unless opted in.
- Match existing repo tone: professional, direct, not marketing-heavy.

## UI expectations

- Production-quality, clean, modern — not generic "AI slop"
- Responsive from mobile up
- Fast: optimize images, avoid unnecessary JS bundles
- For detailed UI guidance, apply `.cursor/rules/frontend-ui-engineering.mdc`

## Contact form

The `v0` contact page used EmailJS with a multi-step form. For `v1`:

- Prefer the simplest approach that works (single-page form, Netlify Forms, or a small API route)
- Do not copy the multi-step pattern unless requested
- Never hardcode API keys; use environment variables

## Boundaries

- Work only inside `v1/` unless explicitly migrating an asset from `v0/`
- No blog, portfolio, about, or MDX content pipeline in this round
- No new pages beyond `/` and `/contact` without approval
- No commits unless the user asks

## Verification

Before marking work complete:

1. `npm run build` succeeds from `v1/`
2. Homepage and contact page render correctly in dev and preview
3. Navigation between the two pages works
4. No console errors on pages that should be static
