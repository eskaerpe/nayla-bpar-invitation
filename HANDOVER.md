# Handover — Nayla’s Sweet Seventeen Invitation

**Repository:** `/home/eska/Coding/nayla-bpar-invitation`  
**Remote:** `https://github.com/eskaerpe/nayla-bpar-invitation.git`  
**Branch:** `main`  
**Handover created:** 10 October 2026 (WIB)  
**Current code checkpoint before this document:** `a1e2a4c` — `style(invitation): align layout with requested baseline`

> This document is the single handover source for the next model. It describes the current implementation, design direction, behavior constraints, validation evidence, risks, and the next safe steps. Do not treat old documentation or Git history as the final visual source of truth when it conflicts with newer owner instructions.

---

## 1. Product purpose

This is a private web invitation for **Nayla’s Sweet Seventeen**. It is a Next.js App Router site with:

1. A lightweight invitation-code gate before the main invitation.
2. A vertically scrolling editorial invitation page.
3. An RSVP flow with attendance confirmation and one food plus one drink choice for attendees.
4. Direct client-side submission to a supplied Google Apps Script endpoint.
5. No custom backend, no database, no `/api` proxy route, and no credential embedded in source.

The intended deployment architecture is:

```text
Vercel static frontend → supplied Google Apps Script Web App → Google Sheets
```

---

## 2. Owner instructions and non-negotiable constraints

### 2.1 Design authority

- The **owner-provided screenshot is the visual source of truth**. Git commits are rollback checkpoints and rough baselines only.
- Screenshot reference file:

  ```text
  /home/eska/.hermes/cache/images/img_09ca904feb1a.jpg
  ```

- The intended aesthetic is a narrow, vertical, sweet vintage/editorial invitation:
  - deep chocolate brown;
  - cream and beige paper surfaces;
  - muted pale green accent;
  - large expressive typography;
  - stationery/paper/tape treatment;
  - calm whitespace;
  - personal and warm, not childish;
  - not a dashboard, SaaS landing page, generic card grid, or template-like feature section.
- Do not claim “exact”, “pixel-perfect”, or “persis” until a rendered screenshot has been compared against the owner reference.
- Use no emoji. Use icons from the installed icon library when an icon is actually needed.

### 2.2 Working rules

- Commit every code/design revision immediately after it is validated. This is required so the owner can always roll back.
- Do not reset, checkout, or delete user artifacts destructively without explicit approval.
- Do not push or deploy automatically.
- Do not expose guest code values, private endpoint values, secrets, tokens, passwords, or credentials in messages, screenshots, commits, or public docs.

### 2.3 Functional constraints

- Invitation gate must show before the invitation on a first visit.
- Invitation code input is uppercase alphanumeric and limited to six characters.
- The invitation code list is currently frontend-only; it must not be submitted to Apps Script.
- RSVP must submit **exactly these five fields**:

  ```text
  nama
  will_join
  makanan
  minuman
  notes_for_nayla
  ```

- Food and drink are each single-select.
- After a successful RSVP submit, the success UI must not expose an edit action.
- Do not change the Google Apps Script implementation/API contract without owner confirmation.
- Do not add an API route, server proxy, database, or another backend layer.

---

## 3. Final approved event data

Use `content/event.ts` as the code source for event values. Do not hardcode event data inside UI components.

```text
Person: Nayla
Occasion: Sweet Seventeen
Date: Saturday, 17 October 2026
Time: 13.00–16.00 WIB
Venue: Braci by Matoa Group
Address: Jl. Sulanjana No. 5, Bandung
Dress code: Cream or beige
Activities: Lunch together, Games, And more surprises
```

### Important content discrepancy

The screenshot/OCR may show a different time (`15.00–16.00 WIB`) and an inconsistent street spelling. Those are **not approved final data**. The active official data are the values above and in `content/event.ts`.

---

## 4. Current repository state

```text
Repository: /home/eska/Coding/nayla-bpar-invitation
Branch: main
Remote: origin → https://github.com/eskaerpe/nayla-bpar-invitation.git
```

At the time this handover was prepared, the local branch was ahead of `origin/main` by seven application commits and had not been pushed/deployed.

### Recent application checkpoints

```text
a1e2a4c style(invitation): align layout with requested baseline
0bd29aa feat(invitation): recreate supplied editorial reference design
b5c08a7 revert(invitation): restore approved reference layout
ef42eb5 test(rsvp): isolate endpoint configuration in unit test
e1409f4 style(invitation): restore restrained editorial visual system
7d506de refactor(invitation): restore restrained editorial reading flow
875f01c feat(invitation): add private guest gate and event details
30d1261 Add RSVP release plan
fd81c97 Fix RSVP flow and direct Apps Script submission
cc96662 Refine invitation UI and RSVP integration
```

### How to interpret those commits

- `30d1261cab20788ce21ffff11eca48d4753ad9af` was requested by the owner as a **temporary layout baseline** for the latest cleanup, not as a complete final visual target.
- `0bd29aa` was a screenshot-oriented recreation attempt.
- `a1e2a4c` is the latest UI alignment toward the requested baseline.
- Do not blindly roll back to old commits: later functional additions (gate, event content, RSVP test isolation) need to remain unless the owner explicitly requests removal.

---

## 5. Directory and file map

```text
nayla-bpar-invitation/
├── app/
│   ├── globals.css                 # Global visual system, invitation + gate styling
│   ├── layout.tsx                  # Metadata and root layout
│   ├── page.tsx                    # Route "/" → InvitationGate
│   └── rsvp/
│       └── page.tsx                # Route "/rsvp" → RsvpForm
│
├── components/
│   ├── Countdown.tsx               # Client countdown renderer
│   ├── Invitation.tsx              # Main invitation page composition
│   ├── InvitationGate.tsx          # Client-side invitation-code gate
│   └── RsvpForm.tsx                # RSVP multi-step UI
│
├── content/
│   ├── event.ts                    # Approved event content and links
│   └── menu.ts                     # Braci food/drink list
│
├── lib/
│   ├── countdown.ts                # Pure countdown calculation
│   ├── invitations.ts              # Guest lookup + session storage helpers
│   ├── rsvp.ts                     # Validation, mapping, response parser, submit
│   └── rsvp.test.ts                # Vitest coverage for RSVP behavior
│
├── public/
│   └── outfit-inspo.png            # Tracked outfit inspiration asset
│
├── .env.example                    # NEXT_PUBLIC_RSVP_ENDPOINT=
├── AGENTS.md                       # Partly stale project notes
├── DESIGN.md                       # Original design spec; partly stale
├── MENU_BRACI.md                   # Menu source material
├── PRD.md
├── README.md                       # Partly stale setup/content text
├── TASKS.md
├── TECH_STACK.md
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Approximate current source size

```text
app/*.tsx + app/*.css             208 lines
components/*.tsx                  320 lines
content/*.ts                      147 lines
lib/*.ts                          255 lines
Total                             930 lines
```

---

## 6. Technology and scripts

### Stack

```text
Next.js 14.2.16
React 18.3.1
TypeScript 5.7
Tailwind CSS 3.4
Vitest 2.1
Phosphor Icons
```

### Standard commands

```bash
cd /home/eska/Coding/nayla-bpar-invitation

npm run dev
npm run typecheck
npm run lint
npm test -- --run
npm run build

git status --short
git log --oneline -10
git diff --check
```

---

## 7. Route behavior

## Route `/`

Source file:

```text
app/page.tsx
```

It renders only:

```tsx
<InvitationGate />
```

Runtime flow:

```text
Open /
  ↓
InvitationGate checks sessionStorage
  ↓
No stored guest → invitation-code form
  ↓
Valid code → personalized welcome screen
  ↓
Continue → guest name/note stored in sessionStorage
  ↓
Invitation renders
```

## Route `/rsvp`

Source file:

```text
app/rsvp/page.tsx
```

It renders `RsvpForm` and includes a link back to `/`.

---

## 8. Invitation gate implementation

Source file:

```text
components/InvitationGate.tsx
```

### Relevant state

```ts
code
guest
storedGuest
error
isChecking
```

### Actual behavior

1. On client mount, it reads session storage key:

   ```text
   nayla-invitation-guest
   ```

2. If a stored guest object contains a `name` and `note`, it renders `<Invitation />`.
3. Otherwise it renders the code gate.
4. Code normalization is:

   ```ts
   value
     .toUpperCase()
     .replace(/[^A-Z0-9]/g, '')
     .slice(0, 6)
   ```

5. Lookup uses `findGuestByCode` from `lib/invitations.ts`.
6. A valid guest receives a personalized intermediate greeting.
7. Continuing stores a serialized `{ name, note }` object in session storage.

### Security limitation — do not misrepresent it

The guest list and invitation codes currently exist in browser-shipped source at `lib/invitations.ts`. This is **not secure authentication or protected access control**. A technically capable visitor can inspect the browser bundle.

Accurate framing:

```text
It is a lightweight personalization gate, not authentication.
```

A secure implementation would require server-side validation. That would be an architecture change and conflicts with the owner’s current no-backend/no-proxy direction; do not implement it without explicit approval.

### Guest data safety

- There are currently 20 guest entries in `lib/invitations.ts`.
- `guest-codes.txt` is tracked locally as reference material.
- Do not print, copy, publish, or disclose code values.

---

## 9. Main invitation UI

Primary source files:

```text
components/Invitation.tsx
app/globals.css
content/event.ts
components/Countdown.tsx
lib/countdown.ts
```

### Current section order

1. **Hero / cover**
   - Deep-brown surface.
   - Marquee with event labels.
   - Small chapter markers.
   - `You’re invited` kicker.
   - Large `17` seal.
   - Orbit-line decoration.
   - Large `Nayla’s Sweet Seventeen` title.
   - Date/venue summary.
   - Scroll prompt.

2. **Personal note**
   - Warm-sand paper card.
   - Tape treatment.
   - Personal note / invitation text.

3. **Date and venue**
   - Editorial date card.
   - Official date/time/venue/address.
   - Google Maps CTA.
   - Outfit inspiration CTA.

4. **Details**
   - Numbered fact sections:
     - `01 Venue`
     - `02 Reply`
     - `03 Menu`
   - Dress code and activity information.

5. **Closing**
   - Deep-brown closing region.
   - Countdown to event.
   - RSVP CTA.

### Visual status

The last code revision aimed to move back toward the composition seen around the requested `30d1261` baseline while preserving newer behavior. It is **not visually verified against the owner screenshot yet**.

### Required next visual QA

1. Start the site locally.
2. Render around 390px wide, then test desktop width.
3. Capture a screenshot.
4. Compare it directly to the provided reference screenshot.
5. Make changes from observed differences only.
6. Commit each revision immediately.

Do not rely on descriptions or Git diffs as evidence of visual fidelity.

---

## 10. Styling system

Primary stylesheet:

```text
app/globals.css
```

Tailwind token mapping:

```text
tailwind.config.ts
```

### Color tokens

```css
--vanilla-cream
--warm-sand
--latte
--cocoa-brown
--espresso
--muted-sage
```

### Font tokens

```css
--font-display
--font-supporting
--font-accent
```

### Styling ownership rules

- Keep markup and semantic classes in `components/Invitation.tsx`.
- Keep visual treatment, layouts, media queries, and invitation-specific skinning in `app/globals.css`.
- Avoid introducing random one-off hex values throughout JSX.
- Preserve readable contrast: dark brown requires light text, light paper requires dark text.
- Do not add decorative clutter just to make the page look “creative”. The reference is editorial and calm.

### Current visual risk

`app/layout.tsx` does not configure `next/font`. Therefore exact typography can drift between environments depending on the CSS fallbacks and browser. Do not claim font-level precision until actual rendered visual comparison is complete.

---

## 11. Countdown

Files:

```text
components/Countdown.tsx
lib/countdown.ts
```

### Behavior

- `getCountdown(target, now)` is pure and returns:

  ```ts
  {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  ```

- `Countdown.tsx` updates every second on the client.
- A passed event returns all zeroes.
- The invitation should use the official event start: **17 October 2026, 13:00 WIB**.

---

## 12. RSVP UI and state machine

Files:

```text
components/RsvpForm.tsx
lib/rsvp.ts
content/menu.ts
```

### State machine

```text
details → menu → review → success
```

For a guest who cannot attend:

```text
details → review → success
```

### Details step

Fields:

```text
name
attendance: yes | no
note
```

If the visitor entered via a valid invitation code, the guest name and note are prefilled from session storage.

### Menu step

Only shown if attendance is `yes`.

Requirements:

```text
Exactly one food
Exactly one drink
```

Selection is rendered using radio inputs, preserving single-select semantics.

### Review step

Shows:

```text
Name
Attendance
Food (attendees only)
Drink (attendees only)
Note
```

Editing is available **before** submission.

### Success state

After valid success response:

```text
Thank you, {name}.
```

There is no edit action in the success view. The current copy directs change requests to Nayla directly.

---

## 13. RSVP network contract

Source file:

```text
lib/rsvp.ts
```

### Internal form model

```ts
type RsvpForm = {
  name: string;
  attendance: 'yes' | 'no' | '';
  food: string;
  drink: string;
  note: string;
};
```

### Exact Apps Script payload

```ts
type RsvpPayload = {
  nama: string;
  will_join: 'Ya' | 'Tidak';
  makanan: string;
  minuman: string;
  notes_for_nayla: string;
};
```

### Mapping

```ts
nama: form.name.trim()
will_join: form.attendance === 'yes' ? 'Ya' : 'Tidak'
makanan: form.attendance === 'yes' ? form.food : ''
minuman: form.attendance === 'yes' ? form.drink : ''
notes_for_nayla: form.note.trim()
```

### Validation

- Name is required.
- Attendance is required.
- Food and drink are each required only when `attendance === 'yes'`.

### Endpoint configuration

The endpoint is read from:

```text
NEXT_PUBLIC_RSVP_ENDPOINT
```

Example:

```text
.env.example
```

contains only:

```text
NEXT_PUBLIC_RSVP_ENDPOINT=
```

Do not paste the actual endpoint in this document or source unless the owner explicitly provides a safe public value.

### Current transport and accepted response

`submitRsvp` uses `fetch` with `FormData`.

Accepted success response:

```json
{
  "result": "success",
  "row": 8
}
```

Recognized error response:

```json
{
  "result": "error",
  "error": "..."
}
```

### Runtime caveat

The unit tests mock the endpoint. A real production endpoint/cross-origin integration has not been independently confirmed in this handover. Do not claim the live RSVP workflow works until a controlled production or staging request receives and verifies a real successful response.

---

## 14. Menu data

Source file:

```text
content/menu.ts
```

### Current scale

```text
73 menu items total
```

Categories:

```text
food
drink
```

Sections include starters, Western dishes, pasta, Asian dishes, pizza, coffee, signature drinks, and refreshments. Every item contains an ID, category, section, name, description, and price.

### UX risk

The full menu is currently rendered as selectable cards. This can become very long on mobile. It works functionally but likely needs future UX refinement, such as grouped/filterable sections or a modal/drawer.

Do not curate, remove, or change menu options without owner approval.

---

## 15. Tests and validation evidence

File:

```text
lib/rsvp.test.ts
```

### Current test coverage

```text
6 tests, all passing
```

Covered behavior:

1. Required name and attendance validation.
2. Required food/drink validation for attendees.
3. Exact five-field attending payload mapping.
4. Non-attendee mapping with blank menu fields.
5. Strict success/error response parser behavior.
6. `submitRsvp` FormData submission behavior.

### Test endpoint isolation

The test uses:

```text
https://example.invalid/rsvp
```

through:

```ts
vi.stubEnv('NEXT_PUBLIC_RSVP_ENDPOINT', 'https://example.invalid/rsvp')
```

This keeps the suite deterministic and avoids relying on `.env.local`.

### Latest verified quality checks

The following have passed:

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
git diff --check
```

Observed build result:

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    8.73 kB         104 kB
├ ○ /_not-found                          873 B            88 kB
└ ○ /rsvp                                9.47 kB         105 kB
```

Both application routes are statically prerendered.

---

## 16. Documentation drift and source-of-truth rules

Several existing documents are stale. Do not blindly follow them.

### `README.md`

It says event time/address/dress/activity remain hidden until supplied. This is outdated; official content now exists in `content/event.ts`.

### `AGENTS.md`

It states or implies:

- repository is documentation-only;
- no executable project setup exists;
- Apps Script validates invitation codes server-side;
- browser must never receive the guest code list;
- browser sends JSON as `text/plain`;
- success returns `{ ok: true }`.

These statements conflict with current implementation. Actual code ships a client-side guest list, submits `FormData`, and expects `{ result: 'success', row: number }`.

### `DESIGN.md`

It is useful for broad principles only. Some content/pending-data statements are obsolete. The owner screenshot and latest explicit direction take priority.

### Correct authority order

Use this order when requirements conflict:

1. Latest explicit owner instruction.
2. Owner-provided screenshot for visual result.
3. Current tested source code for functional/API behavior.
4. `content/event.ts` for event data.
5. Git history for rollback/reference only.
6. Older docs as non-authoritative context.

---

## 17. Known risks and technical debt

### 17.1 Frontend guest code exposure

**Fact:** Invite codes reside in `lib/invitations.ts` and are shipped to clients.

Impact:

```text
Not secure authentication.
Codes can be extracted by inspecting a browser bundle.
```

Do not call it access protection or privacy protection.

### 17.2 Live RSVP endpoint unverified

Tests prove payload mapping and code paths, not the actual remote Apps Script behavior. Unknowns include:

- actual endpoint availability;
- CORS behavior from deployed Vercel origin;
- acceptance of `FormData`;
- response shape;
- Vercel environment configuration.

### 17.3 No successful visual screenshot QA after latest revisions

A dev server could start, but browser harness visual capture was blocked because Chrome was not available/running. Therefore current design similarity is not evidence-verified.

### 17.4 Untracked files

At the time of handover, these untracked files existed and were intentionally untouched:

```text
.hermes/plans/2026-10-10_174743-rsvp-preview-first.md
OUTFIT_INSPO.png
Party Outfit Inspo_ Cream & Beige.png:Zone.Identifier
```

Do not add, delete, rename, or commit these files without owner instruction.

### 17.5 Guest code reference material

`guest-codes.txt` is tracked. Treat it as sensitive/private data. Do not expose it publicly.

### 17.6 Font fidelity

No `next/font` setup is present in `app/layout.tsx`. This may create browser/device typography drift from the screenshot target.

---

## 18. Safe next steps for the next model

### Priority 1 — establish visual evidence

1. Inspect the latest source state before editing:

   ```bash
   git status --short
   git log --oneline -10
   npm run typecheck
   npm run lint
   ```

2. Start local dev server:

   ```bash
   npm run dev
   ```

3. Capture `/` at approximately 390px mobile width and desktop width.
4. Compare the render directly against:

   ```text
   /home/eska/.hermes/cache/images/img_09ca904feb1a.jpg
   ```

5. List observed mismatches by section: hero, note, date/venue, details, closing/countdown.
6. Modify only based on those observed mismatches.
7. Run checks and commit immediately:

   ```bash
   npm run typecheck && npm run lint && git diff --check
   git add <files>
   git commit -m "style(invitation): <specific visual change>"
   ```

### Priority 2 — preserve functional invariants

Do not remove or alter without confirmation:

```text
InvitationGate
The exact five RSVP fields
Single-select food and drink behavior
No API route/proxy/backend architecture
Apps Script integration contract
Final event data in content/event.ts
```

### Priority 3 — validate production only with owner approval

Before deployment or live RSVP test:

- verify endpoint configuration exists without disclosing it;
- confirm Vercel environment variables and deployment target;
- obtain explicit owner approval before sending a real RSVP payload;
- read back the exact target result before claiming success.

---

## 19. Completion criteria for future revisions

Do not declare the visual work done until all are true.

### Visual

- Rendered screenshot is compared to the owner reference.
- Hero, note, date/venue, details, and closing/countdown align in composition, spacing, color, hierarchy, and paper/stationery treatment.
- Mobile and desktop are checked.
- No generic dashboard/SaaS visual drift remains.
- Text contrast is accessible.

### Functional

- Valid invitation code reaches the invitation.
- Invalid code shows error.
- Guest name/note persists for the browser session.
- RSVP attending flow requires one food and one drink.
- RSVP non-attending flow bypasses menu.
- Submitted payload has exactly the five required fields.
- Error states retain form data.
- Success state appears only after a valid response.
- Countdown targets 17 October 2026, 13:00 WIB.

### Engineering

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
git diff --check
```

All must pass, and every change group must have a dedicated commit.

---

## 20. Fast reference

```text
Visual source of truth:
/home/eska/.hermes/cache/images/img_09ca904feb1a.jpg

Primary visual files:
components/Invitation.tsx
app/globals.css

Primary event data:
content/event.ts

RSVP behavior:
components/RsvpForm.tsx
lib/rsvp.ts
lib/rsvp.test.ts

Invitation gate:
components/InvitationGate.tsx
lib/invitations.ts

Do not expose:
guest-codes.txt
actual RSVP endpoint
any secret/token/credential

Do not auto-push or auto-deploy.
```
