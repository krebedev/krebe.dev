# krebe.dev

Personal website for **Solomon Ekrebe** ([krebeDev](https://github.com/krebedev)) — software developer. Live at [krebe.dev](https://www.krebe.dev).

## Repository layout

| Path | Status | Purpose |
|------|--------|---------|
| `v1/` | **Active** | New site — Astro, single-page homepage |
| `v0/` | Legacy | Previous Gatsby site (portfolio, blog, about, contact). Reference only. |
| `README.md` | Active | Minimal repo overview and dev commands |
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

## Site status

**`v1/` is the active site** — live at [krebe.dev](https://www.krebe.dev). Scope: single homepage (fixed hero, scroll-reveal story, contact block).

**`v0/` is legacy** — previous Gatsby site (portfolio, blog, about, contact). Reference only; do not edit unless explicitly asked. Do not port v0 pages into v1 without approval.

Use `v0/` for historical copy tone, old images, and UX patterns — not as the source of truth for current metadata or story content.

## Author & site metadata

**Source of truth:** `v1/src/data/site.ts`

Current values (update `site.ts`, not this list, when they change):

- Name: Solomon Ekrebe
- Role: Software Developer
- Site URL: https://www.krebe.dev
- Email: hello@krebe.dev
- Social: GitHub, LinkedIn (see `site.social`)

Story copy lives in `v1/src/data/draft.md`. SEO, hero, contact, and employer fields live in `site.ts`. See `v1/AGENTS.md` for the full content-update checklist.

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

## Deployment

- **Live site:** `v1/` → Netlify (publish directory: `v1/dist`)
- **Legacy site:** `v0/` deployed via Netlify (`v0/README.md`)

Do not assume `v0/` Netlify settings apply to `v1/` without checking. Ask before changing deployment or DNS configuration.
