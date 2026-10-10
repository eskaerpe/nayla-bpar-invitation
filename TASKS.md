# TASKS --- Nayla's Sweet 17 Invitation Website

- **Current phase:** R1
- **Last completed phase:** none
- **Last updated:** 2026-10-10

Legend: `[ ]` open, `[x]` done and verified, `[~]` dropped (with reason).

Rules for working through this file are in `AGENTS.md`. Each phase ends with a commit and a push.

## Owner actions

These need the owner. They do not block the build, because the agent works against placeholders and a dev mock until they arrive.

- [ ] Create the new GitHub repository and give the agent push access (needed by Phase 1).
- [ ] Connect the repository to Vercel (Phase 1).
- [ ] Create the Google Sheet and deploy the Apps Script Web App, following `apps-script/README.md` (Phase 2). Share the Web App URL with the agent.
- [ ] Paste the generated codes into the `Codes` tab (Phase 2).
- [ ] Provide event start time and timezone, venue address or map link, dress code, personal note (by Phase 8).
- [ ] Provide the final menu Markdown file and images (by Phase 8).
- [ ] Decide the RSVP edit cutoff date (by Phase 8).
- [ ] Hand out the invitation codes to guests (after Phase 8).

---

## Phase 1 --- Project setup and first deploy

- [x] Create the Next.js app (App Router, TypeScript, Tailwind, ESLint) in the repo root. Keep `PRD.md`, `DESIGN.md`, `TECH_STACK.md`, `AGENTS.md`, and `TASKS.md` at the root.
- [x] Enable TypeScript strict mode and add a `typecheck` script.
- [x] Add `.gitignore` entries for `.env*.local` and `private/`.
- [x] Add `.env.example` with `NEXT_PUBLIC_RSVP_ENDPOINT=`.
- [x] Create placeholder pages for `/` and `/rsvp`.
- [ ] Push to `main` and confirm the Vercel deployment serves both routes on direct navigation.

**Done when:** lint, typecheck, and build pass, and the production URL serves `/` and `/rsvp`.
**Commit:** `phase 1: project setup and first deploy`
Notes: skills used: antislop, antislop-code, antislop-ui, antislop-human, antislop-layoutmobile, design-taste-frontend. Frontend implementation is locally reviewable; deployment, endpoint spike, and owner-supplied content remain open.

## Phase 2 --- RSVP endpoint (Apps Script spike)

This is the highest-risk phase, so it runs before the UI.

- [ ] Write `apps-script/Code.gs` with `doPost` routing for `verify` and `submit`. Read sheet columns by header name, not by position.
- [ ] Validate input in `submit`: code exists, name required with a length limit, `attending` is `yes` or `no`, menu fields required only when attending, note length limit. Ignore unknown fields.
- [ ] Wrap writes in `LockService`. Upsert the `RSVP` row keyed by code, set the code status to `used`, and write `submitted_at` and `updated_at`.
- [ ] Return JSON in the shapes from `TECH_STACK.md`: `{ valid, existing }`, `{ ok, updated }`, `{ ok: false, error }`. Use stable error codes (`invalid_code`, `invalid_input`, `server_error`).
- [ ] Write `scripts/generate-codes.mjs`. It produces 25 unique codes using unambiguous characters (no `0/O`, `1/I/L`) and writes `private/codes.csv`.
- [ ] Write `apps-script/README.md`: create the Sheet and both tabs with exact headers, paste the script, deploy as Web App (execute as the owner, access for anyone), copy the URL, publish updates as a new version so the URL stays the same.
- [ ] Spike test from a local page or script: valid code, invalid code, first submit, resubmit with the same code updates the same row, not attending leaves menu columns empty, and the response is readable from the browser (no CORS failure).
- [ ] Record the result in "Decisions and blockers". If the spike fails, switch to the Google Form fallback described in `TECH_STACK.md` and log the change.

**Done when:** the spike test passes against a real deployed Web App, or the fallback decision is recorded.
**Commit:** `phase 2: google sheets rsvp endpoint`
**Notes:** skills used: ___

## Phase 3 --- Design foundation and content

- [ ] Add the six palette tokens from `DESIGN.md` to the Tailwind theme.
- [ ] Choose and load the three typefaces with `next/font` (display, supporting, accent). Check that the display face has the characters needed for `17`, `Nayla`, and `Sweet Seventeen`.
- [ ] Check contrast for small text on each background. Keep Latte and Muted Sage out of small text unless they pass.
- [ ] Build the base layout: page container, section wrapper, global focus-visible style, and a reduced-motion rule.
- [ ] Create the small doodle set as SVG components (sparkle, hand-drawn line, ribbon, and similar), all `aria-hidden`.
- [ ] Create `content/event.ts` with the known facts and `null // PENDING` for time, timezone, address, map link, dress code, and note.
- [ ] Create `content/menu.ts` with types for items and per-category selection limits, and an empty list until the menu arrives.
- [ ] Create button and link primitives with clear focus and pressed states.

**Done when:** a sample page renders every token, font, and doodle correctly at 360 px and desktop widths, and gates pass.
**Commit:** `phase 3: design foundation and content config`
**Notes:** skills used: ___

## Phase 4 --- Main invitation page (static)

Build the full page without motion first. Motion comes in Phase 5.

- [ ] Hero: centered oversized `17` that never clips at 320 px, `Nayla` and `Sweet Seventeen`, date and venue, a small scroll cue.
- [ ] A Little Note: letter-like layout. Use a clearly labeled placeholder while the note is `null`.
- [ ] Save the Date: strong date typography and the venue. Show time, address, and map link only when they exist.
- [ ] What to Expect: render only confirmed blocks. Hide the whole section while none are confirmed.
- [ ] Until Then: closing line, countdown component, and the **RSVP & Choose Your Menu** CTA linking to `/rsvp`.
- [ ] Countdown logic in `lib/countdown.ts`. Hidden while the event time is `null`, uses the event timezone, handles an event that has already started, and renders only after mount to avoid hydration mismatch.
- [ ] Add metadata: title, description, and `robots: noindex` so the private invitation stays out of search results.

**Done when:** all five sections render with real structure and no horizontal overflow at 320 px, 360 px, and desktop. The CTA opens `/rsvp`.
**Commit:** `phase 4: main invitation page`
**Notes:** skills used: ___

## Phase 5 --- Motion

- [ ] Install `motion` and create a small `Reveal` wrapper that respects `prefers-reduced-motion`.
- [ ] Hero: controlled scale and reveal for `17`, staggered headline text, then event details. No simultaneous multi-direction movement.
- [ ] A Little Note: gentle reveal, optionally line by line. The text is readable without waiting for it.
- [ ] Save the Date: a distinctive date reveal. Supporting details enter quietly.
- [ ] What to Expect: light stagger only.
- [ ] Countdown and closing: calm, no explosive effects.
- [ ] Subtle parallax on desktop only. Off on mobile and under reduced motion.
- [ ] Use `once: true` for in-view reveals so scrolling back does not replay everything.
- [ ] Verify that all text stays visible with reduced motion on and with JavaScript disabled, that scrolling is never locked, and that there is no horizontal overflow during animation.

**Done when:** the hero is clearly the most expressive section, everything else is calmer, and the motion rules in `DESIGN.md` hold.
**Commit:** `phase 5: motion and scroll choreography`
**Notes:** skills used: ___

## Phase 6 --- RSVP flow

- [ ] `lib/rsvp-client.ts`: `verify` and `submit` with a request timeout, typed results, and error mapping. Send the body as `text/plain`. Use the dev mock only when the endpoint is unset and `NODE_ENV` is `development`.
- [ ] `lib/validation.ts`: name, attendance, menu limits, note length.
- [ ] Set up Vitest and add unit tests for validation, the countdown, and the RSVP client's response handling. Test pure logic only.
- [ ] Step flow with a reducer: code, details, menu, review, result.
- [ ] Code step: trim and uppercase the input, show loading and clear invalid-code feedback.
- [ ] Details step: guest name and attendance choice. No guest-count field.
- [ ] Menu step: shown only when attending. Cards with image, name, short description, and a clear selected state. Respect the selection limits from `content/menu.ts`. Cards work without images.
- [ ] Optional note field.
- [ ] Review step: summary of attendance and choices, with edit links back to earlier steps.
- [ ] Submit: disable the button while sending to prevent double submission. Show success only on `ok: true`. On failure, keep the guest's input and offer a retry.
- [ ] Prefill from `existing` when the code already has a response, and use "update" wording.
- [ ] Accessibility: labeled inputs, `aria-live` for errors and results, logical focus movement between steps.
- [ ] Do not log codes or guest data.

**Done when:** a full run works against the real endpoint (or the mock in dev) for both the attending and not-attending paths, including invalid code, resubmit, and network failure. Tests pass.
**Commit:** `phase 6: rsvp flow`
**Notes:** skills used: ___

## Phase 7 --- QA and hardening

- [ ] Check layouts at 320, 360, 390, 768, and 1280 px. On a real phone if possible.
- [ ] Keyboard-only walkthrough of both pages. Focus is always visible and the order is logical.
- [ ] Reduced-motion walkthrough.
- [ ] Run Lighthouse on both routes. Fix accessibility issues and any large performance problems.
- [ ] Confirm images use `next/image` and are properly sized.
- [ ] Add friendly 404 and error pages.
- [ ] Security check: search the repo and the production build output for secrets and for a sample invitation code. Neither may appear.
- [ ] Walk through the `DESIGN.md` QA checklist and the `PRD.md` acceptance criteria. Mark anything that depends on pending content as waiting for Phase 8.

**Done when:** every item passes or is explicitly waiting on pending content.
**Commit:** `phase 7: qa and hardening`
**Notes:** skills used: ___

## Phase 8 --- Final content and launch

- [ ] Run `grep -rn "PENDING" content/` and list what is still open.
- [ ] Fill in event time and timezone, address and map link, dress code, personal note, and the menu with images, using only what the owner supplied.
- [ ] Confirm the countdown now shows and uses the right timezone.
- [ ] Apply the edit cutoff date if the owner gave one.
- [ ] Set `NEXT_PUBLIC_RSVP_ENDPOINT` in Vercel production environment variables and redeploy.
- [ ] End-to-end test on the production URL with a test code: attending and not attending, resubmit, invalid code.
- [ ] Delete the test rows and reset the test code to `unused` in the Sheet.
- [ ] Re-run all gates and the `DESIGN.md` and `PRD.md` checklists with the final content.
- [ ] Record resolved decisions in "Decisions and blockers".

**Done when:** no unresolved `PENDING` remains (or the owner approved hiding it), the production end-to-end test passes, and the Sheet is clean.
**Commit:** `phase 8: final content and launch`
**Notes:** skills used: ___

---

## Decisions and blockers

Add entries as `YYYY-MM-DD: text`.

- 2026-10-10: R1 baseline review at 360, 393, 768, and 1280 px confirmed a left-aligned oversized `17` colliding with the eyebrow and headline; the hero lacked confirmed date and venue details, repeated Sweet Seventeen, and left large unused space. Existing CSS revealed only one generic float-in animation; no staged type choreography was visible in the review.
- 2026-10-10: The invitation used unsupported copy in What to Expect and Until Then, exposed pending address/time text, and repeated a rounded-card-plus-icon pattern across sections. These findings violate the confirmed-content and pending-content rules in `PRD.md`, `DESIGN.md`, and `AGENTS.md`.
- 2026-10-10: R1 art direction — Cormorant Garamond remains the display face because its high-contrast editorial forms give the oversized `17` a clear silhouette; Caveat is reserved for short accent phrases, and DM Sans carries labels and body copy.
- 2026-10-10: Vanilla Cream is the quiet base, Warm Sand is reserved for the letter surface, Latte draws the dominant numeral and hand-drawn marks, Cocoa Brown handles secondary text and rules, Espresso carries primary type and CTAs, and Muted Sage remains unused until a confirmed content need exists.
- 2026-10-10: Doodles use one imperfect ink vocabulary: four-point sparkles, a loose underline, a small arrow, and a ribbon loop near the `7`; each stays secondary to type and is `aria-hidden`.
- 2026-10-10: The hero is a centered typographic stack; A Little Note is a letter sheet; Save the Date is an editorial split layout; What to Expect is a sparse fact index; Until Then is a quiet closing field with one large CTA.
- 2026-10-10: `MENU_BRACI.md` has food grouped by menu section and beverages grouped by coffee/signature/refresher sections, but no RSVP selection rule. Applying the documented default of one food and one drink; each category uses one radio choice.
- 2026-10-10: R1 screenshots are stored in ignored `private/screens/`; the current branch has no git remote, so phase commits/pushes cannot be performed until repository history and a remote exist.

## Phase R1 --- Evaluation and art direction

- [ ] Run the app and capture `/` and `/rsvp` at 360, 393, 768, and 1280 px widths in `private/screens/`.
- [ ] Observe the current hero motion in the browser and record what moves, what is missing, and what breaks.
- [ ] Compare the current build with `DESIGN.md` and `PRD.md`; record honest findings under "Decisions and blockers".
- [ ] Add a 10 to 15 line art-direction note covering fonts, palette, doodles, and distinct section compositions.
- [ ] Confirm the display face renders `17`, `Nayla`, and `Sweet Seventeen` clearly at large sizes.

**Done when:** the baseline screenshots, motion observation, findings, and art direction are recorded.
**Commit:** `phase R1: evaluation and art direction`
**Notes:** skills used: antislop, antislop-ui, antislop-layoutmobile, antislop-copywriting.

## Phase R2 --- Hero and invitation redesign

- [x] Rebuild the centered, readable hero with a dominant oversized `17`, confirmed date and venue, intentional doodles, and no invented copy.
- [x] Redesign each invitation section with a distinct composition and hide all pending blocks except the intentional personal-note placeholder.
- [x] Remove repeated or invented copy and keep the CTA in the closing section.
- [x] Verify no horizontal overflow at 320 px and desktop widths.

**Done when:** `/` follows `DESIGN.md`, uses only confirmed content, and is readable at every required width.
**Commit:** `phase R2: hero and invitation redesign`
**Notes:** skills used: antislop, antislop-ui, antislop-layoutmobile, antislop-copywriting.

## Phase R3 --- Motion pass

- [x] Rebuild the hero motion as a readable staged sequence with reduced-motion and no-JavaScript-safe text.
- [x] Keep information reveals calm, once-only, and disable desktop-only parallax on mobile and reduced motion.
- [x] Verify scrolling remains free and animation causes no horizontal overflow.

**Done when:** motion hierarchy matches `DESIGN.md` and the page remains readable with motion reduced or JavaScript disabled.
**Commit:** `phase R3: motion and scroll choreography`
**Notes:** skills used: antislop, antislop-ui, antislop-layoutmobile.

## Phase R4 --- RSVP menu cards

- [ ] Convert `MENU_BRACI.md` into typed food and drink data with category limits and no invented fields.
- [ ] Build attending-only food and drink card groups with real form semantics, selected states, limits, progress, and a mobile review action.
- [ ] Connect code, details, menu, note, review, submit, and result states for attending and not-attending paths.
- [ ] Document development test codes in `README.md` and walk both paths in the browser.

**Done when:** the full local RSVP flow works with the supplied menu and preserves inputs on errors.
**Commit:** `phase R4: RSVP menu cards`
**Notes:** skills used: antislop, antislop-ui, antislop-layoutmobile, antislop-human.

## Phase R5 --- QA

- [ ] Capture `/` and every `/rsvp` step at 360, 393, 768, and 1280 px; review the images against R1 findings.
- [ ] Check 320 px clipping, keyboard focus, reduced motion, both attendance paths, and endpoint/error behavior.
- [ ] Run Lighthouse or equivalent accessibility review on both routes.
- [ ] Confirm no invented copy, pending guest-facing copy, invitation code in production output, or security regressions.
- [ ] Run all quality gates from `AGENTS.md`.

**Done when:** the required QA evidence passes, remaining owner blockers are explicit, and screenshots show a centered readable hero dominated by `17`.
**Commit:** `phase R5: QA and hardening`
**Notes:** skills used: antislop, antislop-ui, antislop-layoutmobile, antislop-human.

---

## Decisions and blockers

Add entries as `YYYY-MM-DD: text`.

- 2026-10-10: R1 baseline and art direction findings pending.
