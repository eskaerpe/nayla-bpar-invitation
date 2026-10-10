# Handover — Nayla’s Sweet Seventeen Invitation

**Repository:** `/home/eska/Coding/nayla-bpar-invitation`  
**Remote:** `https://github.com/eskaerpe/nayla-bpar-invitation.git`  
**Branch:** `main`  
**Updated:** 11 October 2026 (WIB)
**Current verified checkpoint:** `6745444` — `fix(gate): restore invitation code modal layout`

This is the current source of truth for implementation constraints and verified state. Owner-provided visual references override old Git-era design direction if they conflict.

---

## 1. Product and architecture

Private web invitation for **Nayla’s Sweet Seventeen**:

1. Invitation-code gate before main content.
2. Personalized editorial invitation after valid code verification.
3. RSVP flow: attendance confirmation plus one food and one drink selection for attendees.
4. Direct client-side submission to a supplied Google Apps Script Web App.

Architecture:

```text
Vercel static frontend → Google Apps Script Web App → Google Sheets
```

Non-negotiable architecture constraints:

- No custom backend.
- No database.
- No Next.js `/api` route or proxy.
- Do not modify Apps Script without explicit owner confirmation.
- Never expose or document the production endpoint, credentials, tokens, or guest codes in public handover text.

---

## 2. Active design direction

The current direction is **pink editorial**: feminine, intimate, print-inspired, with deliberate typography and paper-like surfaces. It must not become a generic SaaS/card interface.

Palette:

| Token | Hex | Role |
|---|---:|---|
| Peony Pink | `#F2C1CF` | Hero and primary accent |
| Soft Pink | `#F8DDDD` | Quiet fields and gate background |
| Cream | `#F4ECE2` | Alternate information surfaces |
| Ivory | `#F8F5F1` | Main page surface |
| White | `#FAF9F7` | Cards, inputs, dialog surface |
| Dark Neutral Ink | `#352C34` | Primary text and closing section |
| Plum | `#8D526B` | Secondary accent, labels, links |

Rules:

- Do not reintroduce the old dominant chocolate/brown identity.
- Use `--page-gutter` for stable shared horizontal alignment.
- Decorations (rings, seals, tape, large numerals) must not obstruct text-safe areas.
- Gate, invitation, RSVP, and outfit dialog must use one consistent pink/ivory/ink system.
- Preserve minimum touch target and visible keyboard focus.

Canonical design reference: `DESIGN.md`.

---

## 3. Event data

Source: `content/event.ts`

| Field | Current value |
|---|---|
| Person | Nayla |
| Occasion | Sweet Seventeen |
| Date | Saturday, 17 October 2026 |
| Time | 13.00–16.00 WIB |
| Venue | Braci by Matoa Group |
| Address | Jl. Sulanjana No. 5, Bandung |
| Dress code | Cream or beige |

Do not change event data, menu choices, or map destination without owner approval.

---

## 4. Invitation-code gate

Files:

- `app/page.tsx` renders `InvitationGate`.
- `components/InvitationGate.tsx` contains UI and client gate state.
- `lib/invitations.ts` contains guest lookup and serialization.
- `app/globals.css` contains `.gate-*` styling.

Behavior:

1. User enters an uppercase alphanumeric six-character invitation code.
2. `findGuestByCode()` identifies the guest only in frontend data.
3. A valid match shows personalized confirmation.
4. Continuing stores only guest `name` and `note` in `sessionStorage` under `nayla-invitation-guest`.
5. Refresh in the same tab session bypasses the gate; Incognito/new session shows it again.
6. The guest list/code is not included in the RSVP payload.

Security boundary:

- This is a personalization gate, **not authentication**. Guest data is bundled in the frontend and can be inspected by a determined visitor.
- Do not claim that the gate provides strong access control.

Manual reset for gate testing:

```js
sessionStorage.removeItem('nayla-invitation-guest');
location.reload();
```

---

## 5. Invitation and RSVP behavior

### Invitation

Primary implementation: `components/Invitation.tsx`

Includes:

- hero and editorial marquee;
- personal note;
- date/time and venue section;
- responsive Google Map embed plus external Google Maps action;
- outfit inspiration preview and dialog;
- countdown;
- RSVP CTA.

Outfit dialog requirements:

- open from outfit preview;
- close via close button, backdrop, or `Escape`;
- lock background scroll while open;
- retain visible focus styling.

`public/outfit-inspo.png` is the tracked browser-served asset. `OUTFIT_INSPO.png` at repository root is an untracked source artifact; do not delete it without owner approval.

### RSVP

Files:

- `app/rsvp/page.tsx`
- `components/RsvpForm.tsx`
- `lib/rsvp.ts`
- `lib/rsvp.test.ts`
- `content/menu.ts`

Contract that must not change:

```ts
{
  nama: string,
  will_join: 'Ya' | 'Tidak',
  makanan: string,
  minuman: string,
  notes_for_nayla: string
}
```

Rules:

- `nama` and attendance are required.
- When attending, exactly one food and one drink selection are required.
- When not attending, food and drink submit as empty strings.
- Submission is direct client-side `POST` via `FormData` to `NEXT_PUBLIC_RSVP_ENDPOINT`.
- A valid endpoint response must be `{ result: 'success', row: integer }`.
- After success, form must remain immutable; no re-edit/re-submit path.

---

## 6. Styling regression history and prevention

### Fixed regression 1 — global styling absent

Commit: `bf7383f fix(styles): restore global invitation stylesheet`

Cause: `app/globals.css` was overwritten with only RSVP CSS. This removed:

- `@tailwind base/components/utilities`;
- global CSS variables and fonts;
- invitation selectors such as `.hero-section`;
- the rest of the site visual system.

Prevention: never replace `app/globals.css` to add a small route-specific block. Integrate additions into the existing stylesheet or make a narrowly-scoped separate stylesheet.

### Fixed regression 2 — gate visually unstyled/broken

Commit: `6745444 fix(gate): restore invitation code modal layout`

Cause: CSS targeted old `.gate-card` markup while the rendered component uses `.gate-modal`. The result was no usable padding/layout, and the CTA icon wrapped to a separate line.

Current `.gate-*` styling provides centered responsive layout, modal padding, typography, code input, CTA layout, focus/error states, and mobile adjustments.

---

## 7. Repository map

```text
app/
  globals.css                 Global tokens, invitation, gate, and RSVP styling
  layout.tsx                  Root layout; imports globals.css
  page.tsx                    Gate entry route
  rsvp/page.tsx               RSVP page shell
components/
  Invitation.tsx              Main invitation experience + outfit dialog
  InvitationGate.tsx          Code verification and session persistence
  RsvpForm.tsx                RSVP form and immutable success state
  Countdown.tsx               Countdown display
content/
  event.ts                    Event facts and external map URL
  menu.ts                     RSVP menu options
lib/
  invitations.ts              Frontend guest-code lookup
  rsvp.ts                     Validation, exact payload, POST/response parsing
  rsvp.test.ts                RSVP validation/payload/response tests
  countdown.ts                Countdown logic
public/
  outfit-inspo.png            Outfit image shown in site
tailwind.config.ts            Tailwind configuration
DESIGN.md                     Design-system reference
```

---

## 8. Commands and verified status

Run from repository root:

```bash
npm run dev
npm run typecheck
npm run lint
npm test -- --run
npm run build
git diff --check
```

Latest automated validation after the gate fix:

| Command | Result |
|---|---|
| `npm run typecheck` | passed |
| `npm run lint` | passed, no ESLint warnings/errors |
| `npm test -- --run` | passed, 1 file / 6 tests |
| `npm run build` | passed; `/` and `/rsvp` statically generated |
| `git diff --check` | passed |

Do not claim visual parity from these checks alone.

---

## 9. Visual/manual QA status

Required viewport checks: `360px`, `375px`, `390px`, and desktop `1280px`.

Test:

1. Gate: valid code, invalid code, uppercase normalization, six-character restriction, refresh persistence, incognito/new-session reset.
2. Mobile: no horizontal overflow, clipping, accidental overlap, or inaccessible CTA.
3. Desktop: stable hierarchy and balanced hero/date/venue/map composition.
4. Outfit dialog: open, close button, backdrop close, `Escape`, body scroll lock.
5. Map: responsive embed and correct external location action.
6. RSVP: attending requires one food/drink; non-attending submits without menu; success state is immutable.

Known QA limitation:

- WSL-local HTTP checks worked, but Windows Chrome screenshot automation could not reliably reach the WSL development server. Previous screenshot files in `/home/eska/output/nayla-visual-qa/` captured browser connectivity error pages, not the invitation.
- Therefore automated visual QA across required viewports is **not verified**. Manual browser inspection is still required after each visual change.

Non-blocking browser-console notes:

- `GET /.well-known/appspecific/com.chrome.devtools.json 404` is Chrome DevTools probing an optional endpoint; it is unrelated to site styling.
- Google Maps `net::ERR_BLOCKED_BY_CLIENT` means an extension/ad blocker blocked map content. It is not a CSS failure. Disable the blocker or test in a clean profile to evaluate the embed.

---

## 10. Git state and working rules

Latest relevant local commits:

```text
6745444 fix(gate): restore invitation code modal layout
bf7383f fix(styles): restore global invitation stylesheet
7010a8d style(rsvp): align form route with pink identity
9bbe792 style(invitation): redesign pink editorial experience
5bde3f1 docs: add comprehensive project handover
```

Rules agreed with owner:

- Commit every verified code/design/documentation change locally with a descriptive message.
- Do not push or deploy automatically.
- Do not delete user artifacts or untracked files without explicit approval.
- Validate changes before committing.
- Do not treat Git history as the visual source of truth; render against the provided reference.

Current untracked artifacts intentionally left untouched:

```text
.hermes/plans/2026-10-10_174743-rsvp-preview-first.md
OUTFIT_INSPO.png
Party Outfit Inspo_ Cream & Beige.png:Zone.Identifier
```

---

## 11. Safe next steps

1. Open `http://localhost:3000` in a browser and perform the manual QA list above.
2. Use a browser profile without ad blockers to evaluate the map embed.
3. On any visual modification: inspect a real rendered screenshot, run relevant automated checks, then make one local commit.
4. Keep all changes frontend-only unless the owner explicitly authorizes an Apps Script or architecture change.
