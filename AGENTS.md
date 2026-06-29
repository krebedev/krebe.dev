# krebe.dev

Personal website for **Solomon Ekrebe** ([krebeDev](https://github.com/krebedev)) — software developer. Live at [krebe.dev](https://www.krebe.dev).

## Repository layout

| Path | Status | Purpose |
|------|--------|---------|
| `v1/` | **Active** | New site — Astro, single-page homepage |
| `v0/` | Legacy | Previous Gatsby site (portfolio, blog, about, contact). Reference only. |
| `.cursor/rules/` | Active | Workflow rules for AI-assisted development |

All new implementation belongs in `v1/`. Read `v1/AGENTS.md` before editing anything under `v1/`.

## Living documentation

Treat `AGENTS.md` files as **living docs**, not one-time setup notes. Update them in the same change (or immediately after) when the repo changes in ways agents need to know about.

**Update the root `AGENTS.md` when:**

- Migration status or active vs legacy paths change
- Scope expands or contracts (new pages, new directories)
- Deployment or hosting setup changes

**Update `v1/AGENTS.md` when:**

- The Astro project is scaffolded or restructured
- Tech choices are finalized (styling approach, form handling, env vars)
- Commands, routes, or conventions change
- Something in the doc is no longer accurate (e.g. "TBD", "not scaffolded yet")

If you notice stale guidance while working, fix it — don't leave the next agent to rediscover the same gap.

## Current migration

The site is being rebuilt from scratch in `v1/` with a narrower scope:

- **Homepage** — fixed hero, scroll-reveal story, closing email + social links

Pages from `v0/` (portfolio, blog, about, contact) are out of scope for this round. Do not port or reintroduce them unless explicitly requested.

Use `v0/` as a **content and design reference** — copy, metadata, images, and UX patterns live there. Do not modify `v0/` unless the task explicitly says so.

## Author & site metadata

Source of truth for personal details: `v0/gatsby-config.js` → `siteMetadata`.

- Name: Solomon Ekrebe
- Role: Full-Stack Developer
- Site URL: https://www.krebe.dev
- Social: GitHub, LinkedIn, Twitter (see `siteMetadata.author.socialProfiles`)

When wiring SEO or contact content in `v1/`, pull from these values rather than inventing new copy.

## Agent workflow

1. **Scope** — Confirm the task targets `v1/`, not `v0/`.
2. **Context** — Read `v1/AGENTS.md` and the files you will change before editing.
3. **Skills & rules** — For non-trivial work, follow applicable `.cursor/rules/` (e.g. `incremental-implementation`, `frontend-ui-engineering`, `spec-driven-development`).
4. **Verify** — Run build/dev commands from `v1/` and confirm pages render before considering work done.
5. **Docs** — If the change affects stack, structure, commands, or scope, update the relevant `AGENTS.md` in the same change.

## Boundaries

- Never commit `.env` files, API keys, or secrets.
- Do not add dependencies without a clear reason; prefer Astro built-ins and minimal additions.
- Do not delete or refactor `v0/` as part of `v1/` work.
- Do not expand scope (blog, portfolio, CMS, etc.) without explicit approval.
- Ask before changing deployment or DNS configuration.

## Deployment

The legacy site deploys via Netlify (`v0/README.md`). `v1/` deployment setup will be defined as the Astro project is scaffolded — do not assume `v0/` Netlify config applies to `v1/` without checking.
