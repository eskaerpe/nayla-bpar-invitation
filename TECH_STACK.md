# TECH STACK --- Nayla's Sweet 17 Invitation Website

## Decisions

| Area | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js (App Router) | Two routes: `/` and `/rsvp`. Vercel-native. |
| UI | React + TypeScript | Small, typed components. |
| Styling | Tailwind CSS | DESIGN tokens are defined once in the Tailwind theme. |
| Fonts | `next/font` | Display, supporting, and accent faces. Self-hosted by Next.js. |
| Motion | Motion for React, selectively | Hero and scroll choreography only. CSS for simple transitions. |
| RSVP storage | Google Sheets | Owner's own Sheet. |
| RSVP write path | Google Apps Script (bound to the Sheet), deployed as a Web App | Not a server we run. No database, no service account. |
| Access codes | `Codes` tab in the Sheet, checked inside Apps Script | Codes never ship to the browser. |
| Email | None | On-site summary and confirmation only. |
| Hosting | Vercel | Production deployment target. |
| Repository | New repository | Created by the project owner. |

## Why not embed Google Forms as the primary path

Google Forms can store responses in Sheets, but it cannot render the custom menu cards required by DESIGN, and an embedded form cannot tell our page whether a submission succeeded. The PRD requires that confirmation reflects the real result. Apps Script gives us both the custom UI and a verifiable response, with no server to maintain.

Google Forms remains the fallback (see "Fallback" below).

## Architecture

```
Browser (Next.js on Vercel)
   │  fetch: verify code / submit RSVP (JSON)
   ▼
Google Apps Script Web App   (runs as the owner's Google account)
   │  reads and writes
   ▼
Google Sheet
   ├── Codes tab   (code, status, updated_at)
   └── RSVP tab    (one row per code)
```

There is no custom backend, no database, and no credentials in browser code. The Apps Script endpoint is the only write path, and it performs the code check itself.

## Google Sheet structure

**Codes tab**

| code | status | used_at |
| --- | --- | --- |
| e.g. `NY17-A7K2` | unused / used | timestamp |

**RSVP tab**

| code | guest_name | attending | food_choice | drink_choice | note | submitted_at | updated_at |
| --- | --- | --- | --- | --- | --- | --- | --- |

`attending` is `yes` or `no`. Food and drink columns stay empty when `attending` is `no`.

## Apps Script endpoints

Apps Script receives JSON sent as a `text/plain` body, which avoids a CORS preflight.

- **`verify`**: input `{ action: "verify", code }`. Returns `{ valid: true, existing: {...} | null }` when the code exists, or `{ valid: false }`. `existing` returns the saved RSVP so a guest who already responded can review or edit it.
- **`submit`**: input `{ action: "submit", code, guest_name, attending, food_choice, drink_choice, note }`. Re-checks the code, validates fields (required name, menu fields required only when attending), then upserts the row keyed by `code`. Marks the code as `used`. Returns `{ ok: true, updated: boolean }` or `{ ok: false, error }`.

The frontend shows the success state only when `ok` is `true`. On any network or server error, it shows a retry message and keeps the guest's input.

The Apps Script deployment must be set to "Execute as: Me" and "Who has access: Anyone" so the public site can call it. Update the deployed version through "Manage deployments → Edit → New version" so the URL does not change.

## Access codes

- Target about 20–25 unique codes, generated once and loaded into the `Codes` tab.
- Codes are checked only inside Apps Script. The browser never receives the full list.
- Codes are a light barrier, not secure authentication. Anyone who has a code can view and edit that guest's own response. This is acceptable for a private list of about 25 invitees, but it must be documented.
- Default policy (confirm with owner): one row per code. Resubmitting with the same code updates that row and does not create a duplicate.

## Security and privacy

- No service-account keys, OAuth secrets, or private keys in the repository or browser code.
- The Sheet is shared only with the owner's account.
- The Apps Script URL is public by design. Mitigations: server-side code check, field length limits, and a reject for unknown codes. Abuse beyond this is accepted as low risk for this event.
- Store only RSVP fields. Do not collect contact details, addresses, or extra personal data.
- Delete or archive the Sheet after the event.

## Content

- Keep menu and event content in `content/*.md` as the source of truth.
- Copy menu data into a typed config (`content/menu.ts`) for the build. This is faster than parsing Markdown at build time.
- Replace placeholders only after the owner confirms the final content.

## Vercel deployment

- Create the new repository and connect it to Vercel.
- One environment variable: `NEXT_PUBLIC_RSVP_ENDPOINT`, set to the Apps Script Web App URL. The URL is public, so `NEXT_PUBLIC_` is acceptable.
- Test the production build and direct navigation to `/` and `/rsvp`.
- Run one end-to-end test with a test code, then delete the test row and reset that code to `unused`.

## Performance and accessibility

- Keep the hero as the only heavy animation. Information sections use light, staggered reveals.
- Respect reduced-motion preferences. Essential text must not depend on animation.
- Optimize images. Avoid multiple animation libraries.
- Support keyboard navigation, visible focus states, labeled inputs, and clear error messages.
- Test on a real phone before launch.

## Fallback

If Apps Script cannot be used (for example, the owner cannot deploy a Web App or the POST flow fails in the spike), switch `/rsvp` to an embedded Google Form. Menu choices become conditional sections. Accept a less custom menu-card experience and state this in the PRD.

## Suggested implementation order

1. Create the repository and Next.js skeleton. Set up Tailwind tokens and fonts. Deploy an empty page to Vercel to catch deployment issues early.
2. Apps Script spike (highest risk): create the Sheet and tabs, seed a few test codes, deploy the Web App, and verify `verify` and `submit` from a local page. Confirm the response is readable in the browser.
3. Build `/` with temporary content. Add the hero typography motion, then the remaining sections.
4. Build `/rsvp` against the real endpoint: code step, guest details, menu cards, review, and submit states.
5. Test mobile, accessibility, reduced motion, duplicate submission, and error states.
6. Replace placeholders with final content from the owner.
7. Deploy to Vercel and run the end-to-end test. Reset test data.

## Pending decisions

- Final menu data and images.
- Event time and timezone for the countdown (expected Asia/Jakarta).
- Confirmed venue address or map link.
- Dress code and personal note.
- Confirm the edit policy: editable until a cutoff date, and the cutoff date.
- Confirm that the Apps Script approach is accepted over the Google Form fallback.
- Generation and distribution of the 20–25 codes.
