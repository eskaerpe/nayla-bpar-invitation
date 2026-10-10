# Plan: RSVP Menu and Google Apps Script Integration

## Goal

Make the RSVP flow usable and verifiable with the existing direct Google Apps Script Web App URL, without any `/api` route, then commit and push only after production checks pass.

## Current context

- Repository: `/home/eska/Coding/nayla-bpar-invitation`
- Branch: `main`
- Architecture: Vercel frontend → Google Apps Script Web App → Google Sheets
- `/api` route has been removed locally.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` is currently blocked by `next/font` failing to download Google Fonts because of network timeout.
- `npm test` is currently blocked because the repository has no test files.
- The current Apps Script `doPost(e)` accepts only these sheet-backed fields:
  - `nama`
  - `will_join`
  - `makanan`
  - `minuman`
  - `notes_for_nayla`
- The Apps Script shown does not implement invitation-code verification. It only appends received parameters to the sheet.
- The current local modifications are in `components/RsvpForm.tsx` and `lib/rsvp.ts`.

## Proposed approach

### Phase 1 — Keep the scope explicit

1. Treat the immediate objective as menu-flow testing:
   - name input;
   - attendance selection;
   - food menu;
   - drink menu;
   - review page;
   - direct Apps Script submission.
2. Do not add `action` or `code` to the Apps Script payload because the provided `doPost(e)` does not consume them.
3. Do not add or restore any `/api` route.
4. Keep the invitation-code gate out of the production claim until Apps Script exposes a real verification contract.

### Phase 2 — Verify and stabilize the frontend flow

1. Inspect `components/RsvpForm.tsx` and confirm each transition has a visible state change:
   - details → menu;
   - menu → review;
   - review → submit/success.
2. Run the local app and manually test the actual `/rsvp` page in a browser.
3. Verify that:
   - the continue button is enabled only when required details are valid;
   - food and drink options render;
   - selected food and drink persist into Review;
   - validation errors are visible;
   - no browser console error prevents the transition.
4. If browser automation is unavailable, use a reproducible manual test checklist and record the exact observed result instead of claiming browser verification.

### Phase 3 — Verify the direct Apps Script contract

1. Send a controlled test request directly to the configured Apps Script URL using `FormData`/multipart form data with exactly:
   - `nama`
   - `will_join`
   - `makanan`
   - `minuman`
   - `notes_for_nayla`
2. Follow redirects and record:
   - final HTTP status;
   - response content type;
   - response body;
   - whether a new row appears in the spreadsheet.
3. Compare the observed response with the expected response:
   ```json
   {"result":"success","row":2}
   ```
4. If the endpoint returns `405`, HTML, an empty body, or a redirect without the expected JSON, stop integration changes and report that the deployed Apps Script version/configuration does not match the supplied script.
5. Do not send real guest data during probing. Use a clearly labelled test row and remove it only if the user explicitly requests deletion.

### Phase 4 — Make the frontend transport match the verified endpoint

1. Keep `lib/rsvp.ts` as a direct client-side request to `NEXT_PUBLIC_RSVP_ENDPOINT`.
2. Ensure the payload uses the exact Apps Script field names and values:
   - `will_join=Ya` or `will_join=Tidak`;
   - `makanan`;
   - `minuman`;
   - `notes_for_nayla`.
3. Parse the Apps Script response defensively:
   - accept the documented `{result:'success', row:number}` response;
   - show an error for non-JSON, non-success, or unexpected responses;
   - never report success based only on HTTP 200.
4. Keep the endpoint in environment configuration and keep `.env.local` untracked.

### Phase 5 — Resolve build reproducibility

1. Retry `npm run build` once with the current network.
2. If Google Fonts still time out, change the font strategy before committing:
   - preferred: self-host the required font files in the repository if legally and technically appropriate;
   - fallback: use system/font-stack CSS and remove build-time remote font fetching.
3. Re-run the build from a clean `.next` directory.
4. Treat a failed production build as a release blocker.

### Phase 6 — Add a minimal regression test

1. Add focused tests for pure RSVP behavior, not network calls:
   - payload field mapping;
   - `Ya`/`Tidak` attendance mapping;
   - validation of required menu selections;
   - successful Apps Script response parsing;
   - rejection of malformed/non-success responses.
2. Mock `fetch`; never call the real Apps Script URL from automated tests.
3. Run `npm test` and require a zero exit code.

### Phase 7 — Restore or explicitly redesign invitation-code verification

This is separate from the menu submission fix.

1. Confirm whether the Apps Script deployment has a `doGet(e)` or another published verification contract.
2. If it does not, the current provided `doPost(e)` cannot securely verify invitation codes; the frontend must not pretend that it can.
3. Only after the contract is supplied should a code-gated flow be implemented.
4. Never embed the private invitation-code list in the browser.

### Phase 8 — Release gate, commit, and push

Run all of these before committing:

```text
npm run typecheck
npm run lint
npm test
npm run build
git diff --check
```

Also verify:

- no `app/api/` exists;
- no tracked `.env.local`, private code list, credential, or token exists;
- direct Apps Script response is verified;
- menu selections are visible in Review;
- no accidental unrelated files are modified.

Then:

1. Review the final diff.
2. Create one focused commit, for example:
   ```text
   Fix direct Apps Script RSVP menu flow
   ```
3. Push `main` to `origin`.
4. Verify the remote branch contains the commit with `git ls-remote` and `git log`.
5. Report exact commit hash and validation results.

## Files likely to change

- `components/RsvpForm.tsx`
- `lib/rsvp.ts`
- `app/layout.tsx` or `app/globals.css` only if font build reproducibility requires it
- a focused test file under the existing test convention
- `.hermes/plans/2026-10-10_165519-rsvp-menu-appscript.md` (this plan only)

## Risks and tradeoffs

- The provided Apps Script is a write-only append handler. It cannot validate invitation codes unless additional server-side code exists.
- A successful HTTP response is not enough; the spreadsheet row and JSON response must be checked.
- Direct client-side Apps Script integration exposes the Web App URL in the browser, but this is consistent with the chosen architecture and does not expose the private code list.
- A Google Fonts network failure can make an otherwise valid application fail at production build time; this must be eliminated or explicitly accepted before release.
- Adding tests increases scope slightly but prevents another regression where a button appears to work while the transport payload is wrong.

## Release decision

Do not commit or push until Phases 2–6 pass. Invitation-code verification remains a separate release decision and must not be claimed as implemented using the supplied write-only `doPost(e)` script.
