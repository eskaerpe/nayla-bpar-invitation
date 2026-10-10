# PRD --- Nayla's Sweet 17 Invitation Website

## Overview

- **Event:** Nayla's Sweet 17
- **Date:** 17 October 2026
- **Venue:** Braci Bandung, Bandung, Indonesia
- **Language:** English
- **Deployment:** Vercel
- **Status:** Requirements finalized for v1. Event time, venue address, menu content, dress code, and personal note are pending.

The website is a custom digital invitation with an expressive vertical-scroll experience. The main invitation lives at `/`. RSVP and menu selection live at `/rsvp`.

## Goals

- Create a distinctive, youthful, warm Sweet 17 invitation.
- Make the oversized `17` the central visual identity.
- Communicate event information clearly.
- Collect attendance and menu responses into a Google Sheet, without a custom backend server or database.
- Work well on mobile and desktop.

## Non-goals

- Custom API server, custom database, or any backend service the project must maintain. The only write endpoint is a Google Apps Script bound to the owner's Sheet.
- Email confirmations or notifications.
- Guest-count field.
- Separate food-order route.
- Horizontal slide navigation or scroll locking.
- Excessive animation on every element.
- Strong authentication. Invitation codes are a light access barrier.

## Users

**Invited guest:** reads the invitation and submits RSVP and menu preferences.
**Event owner:** reviews responses in Google Sheets.

## Information architecture

### `/` --- Main invitation

1. The Invitation (hero)
2. A Little Note
3. Save the Date
4. What to Expect
5. Until Then (countdown and closing CTA)

Primary CTA: **RSVP & Choose Your Menu**, linking to `/rsvp`.

### `/rsvp` --- RSVP

1. Invitation-code entry
2. Guest name
3. Attendance response
4. Food selection (attending guests only)
5. Drink selection (attending guests only)
6. Optional note
7. Review and confirmation summary

If the guest cannot attend, menu choices are skipped or hidden. Do not ask how many people will attend: each invitation is for one person.

## Functional requirements

### Main invitation

- Display Nayla's name and Sweet 17 identity.
- Feature a centered oversized `17`.
- Show the event date, 17 October 2026, and venue, Braci Bandung.
- Include a countdown once event time and timezone are confirmed.
- Keep the page freely vertically scrollable.
- Use English copy.
- Link clearly to `/rsvp`.

### RSVP and access

- Ask for an invitation code before displaying the RSVP flow.
- Validate the code on the server side (inside the Apps Script endpoint). The browser never receives the list of codes.
- If the code already has a response, show the saved response so the guest can review or edit it.
- Let the guest enter their name and attendance status.
- Do not include a guest-count field.
- Show food and drink menu cards only for attending guests, using the final supplied menu.
- Show a review summary before submission.
- Show a success state only when the submission endpoint confirms the save. On error, show a retry message and keep the guest's input.
- Do not send email.
- Document that invitation codes are a light access barrier, not secure authentication.

### Data collection

- RSVP responses are stored in a Google Sheet owned by the event owner, through a Google Apps Script Web App.
- The Sheet contains a `Codes` tab (code status) and an `RSVP` tab (one row per code).
- Resubmitting with the same code updates that guest's existing row. It does not create a duplicate.
- The browser never holds Google credentials, service-account keys, or privileged tokens.
- If the Apps Script approach cannot be deployed or tested successfully, fall back to an embedded Google Form. The fallback is documented in TECH_STACK.md and accepts a less custom menu experience.

## Non-functional requirements

- Responsive mobile and desktop layouts.
- Good text contrast and visible focus states.
- Form labels and understandable validation messages.
- Respect reduced-motion preferences.
- Essential information must not depend on animation.
- Optimize images and avoid unnecessary effects.
- Use semantic headings and accessible controls.
- Store only RSVP fields: name, attendance, menu choices, optional note, and timestamps.

## Known content

| Item | Status |
| --- | --- |
| Birthday person | Nayla |
| Occasion | Sweet 17 |
| Date | 17 October 2026 |
| Venue | Braci Bandung |
| Language | English |
| Event time | Pending |
| Venue address or map link | Pending |
| Dress code | Pending |
| Personal note | Pending |
| Food and drink menu | Pending, Markdown file to be supplied |
| Invitation codes | To be generated (about 20–25), loaded into the `Codes` tab |
| RSVP storage | Google Sheet via Google Apps Script Web App |

## Acceptance criteria

- Hero prominently features a centered oversized `17`.
- Typography animation is expressive but readable.
- Visitors can scroll freely without horizontal slides or scroll locking.
- Date and venue are easy to find.
- Main CTA opens `/rsvp`.
- RSVP includes invitation code, guest name, and attendance status.
- No guest-count field appears.
- Menu choices appear only for attending guests.
- A valid code is required before the RSVP form is shown. An invalid code shows clear feedback.
- Resubmitting with the same code updates the same row without creating a duplicate.
- Confirmation appears only after the endpoint confirms the save.
- No email is sent.
- Mobile layout and reduced-motion behavior are tested.
- Production deployment on Vercel works end to end, including a real test submission that is then removed from the Sheet.
- No private credentials are committed or exposed in browser code.

## Open questions

- Event start time and timezone (expected Asia/Jakarta, confirm).
- Confirmed venue address or map URL.
- Final food and drink menu and images.
- Dress code and personal message.
- Edit policy: guests can edit their response until a cutoff date. Confirm the cutoff date.
- Are invitation codes single-use? Proposed default: one response per code, editable until the cutoff.
- Is the Apps Script approach accepted over the Google Form fallback?
