# Repository Guidelines

## Project Overview

This repository contains the planned Nayla's Sweet 17 invitation. The product is an English Next.js App Router/Vercel app with two routes: `/` for the invitation and `/rsvp` for code-gated RSVP and menu selection. `PRD.md`, `DESIGN.md`, and `TECH_STACK.md` define product behavior, visual direction, and implementation constraints; `TASKS.md` is the live phase status. Do not invent event details that the specifications mark as pending.

## Architecture & Data Flow

- The browser renders the Next.js pages and sends JSON request bodies as `text/plain` POSTs to the public Google Apps Script Web App.
- Apps Script validates the invitation code and RSVP fields, then verifies/upserts data in the Google Sheet's `Codes` and `RSVP` tabs. The browser must never receive the invitation-code list.
- There is no custom backend or database. Browser code must not contain Google credentials or privileged tokens, and must not log invitation codes or guest data.
- Show RSVP success only after a response containing `{ok:true}`. On failure, retain the input and show a retry/error state; do not claim success.
- Invitation codes are a light access barrier, not secure authentication. Do not add a guest-count field.

## Key Directories

These are the planned directories:

- `app/` — App Router routes and page-level composition for `/` and `/rsvp`.
- `components/` — reusable UI pieces.
- `lib/` — pure validation, countdown, and response-mapping logic; keep it independent of rendering and network side effects.
- `content/` — approved invitation and menu content.
- `public/` — static assets.
- `apps-script/` — Google Apps Script endpoint implementation and deployment material.
- `scripts/` — project utilities.

## Development Commands

The repository is documentation-only today: no application setup, package manifest, lockfile, scripts, or build/test configuration exists, so no commands are currently executable. Once setup is added, the expected quality commands are:

```text
npm run lint
npm run typecheck
npm run build
npm test                 # once Phase 6 tests exist
```

Use npm by default only because no lockfile exists yet. A future lockfile determines the package manager; do not invent Node versions or unimplemented scripts.

## Code Conventions & Common Patterns

- Use strict TypeScript and keep dependencies limited to the planned stack.
- Prefer server components. Add small client components only where browser state, effects, or motion require them.
- Keep Tailwind color/type tokens defined from `DESIGN.md`; do not scatter raw hex values through components.
- Use `next/font` for fonts and `next/image` for images. Use semantic headings, labels, controls, appropriate image alt text, and `aria-live` for changing status or error feedback.
- Handle pending or unavailable values as `null` rather than displaying fabricated details. Do not make essential information depend on animation.
- Keep menu fields conditional on attendance, preserve input across submission errors, and never add a guest-count field or unapproved event copy.

## Important Files

- `PRD.md` — scope, behavior, routes, and acceptance criteria.
- `DESIGN.md` — layout, typography, palette tokens, motion, and accessibility direction.
- `TECH_STACK.md` — Next.js, Apps Script, Sheet structure, and request/response contract.
- `TASKS.md` — live phase status and owner-provided decisions.

Read the relevant specification before changing implementation. Keep those specification files unchanged unless the owner explicitly requests an update.

## Runtime/Tooling Preferences

Deploy the web app to Vercel and use the owner's public Google Apps Script Web App as the only RSVP write endpoint. Send requests in the documented `text/plain` JSON format. Keep credentials, invitation-code data, and guest data out of browser code and logs. Prefer platform capabilities and the existing planned stack over adding dependencies or services.

When the endpoint is absent, a local RSVP mock may be used in development only. Production must show a visible missing-endpoint error rather than silently falling back or reporting success.

## Testing & QA

- Phase 6 adds Vitest tests for pure logic in `lib/`, including validation, countdown behavior, and response mapping.
- Manually check the invitation and RSVP flows at 360px and on desktop, including keyboard and accessible status/error feedback.
- Verify attending/non-attending paths, conditional menu fields, pending `null` values, endpoint failures, and the `{ok:true}` success gate.
- Do not treat the development-only local mock as production behavior; confirm production reports a missing endpoint when configuration is absent.
