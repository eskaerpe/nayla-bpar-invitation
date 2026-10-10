# DESIGN --- Nayla's Sweet 17 Invitation Website

## Design vision

**Playful & youthful, balanced with warm editorial design.** The website
should feel expressive and personal without looking childish or
cluttered. Typography is the primary visual identity; beige and brown
create warmth, while a small, consistent set of doodles adds
personality.

The site is one continuous vertical experience, not a slide deck.
Visitors remain in control of scrolling.

## Visual principles

1.  Typography leads; oversized `17` is the main visual anchor.
2.  Playful, not chaotic: use scale, composition, and motion instead of
    excessive decoration.
3.  Use whitespace, clear hierarchy, and calm information sections.
4.  A few expressive moments should stand out against quieter sections.
5.  Keep important information readable and available without animation.
6.  The design must work without personal photographs.

## Color palette

  Token           Hex         Use
  --------------- ----------- --------------------------------------
  Vanilla Cream   `#F8F2E8`   Main background
  Warm Sand       `#E8D8C3`   Alternate surfaces/cards
  Latte           `#C4A484`   Decorative accents
  Cocoa Brown     `#795548`   Secondary headings and illustrations
  Espresso        `#38271F`   Primary text and contrast
  Muted Sage      `#A6AB91`   Optional limited accent

Use Vanilla Cream as the dominant surface, Warm Sand for section
separation, and darker browns for readable text. Muted Sage is optional.
Check contrast before using mid-tone colors for small text.

## Typography

-   **Display:** expressive and distinctive for `17`, `Nayla`, and major
    headings.
-   **Supporting:** clean and legible for dates, location, body copy,
    labels, and menu descriptions.
-   **Accent:** restrained handwritten or italic style for selected
    phrases only.

Use contrast in size and placement rather than too many typefaces. Exact
font choices can be settled during visual prototyping.

## Main invitation --- `/`

### 1. The Invitation (hero)

**Purpose:** establish the event identity. - Centered oversized `17`. -
`Nayla` and `Sweet Seventeen` as supporting typography. - Date and venue
as secondary details. - Small invitation prompt or scroll cue. - Minimal
sparkles, hand-drawn lines, or a small ribbon motif.

**Motion:** controlled scale/reveal for `17`; staggered headline text;
event details follow. Avoid making everything move in different
directions simultaneously.

### 2. A Little Note

**Purpose:** add a personal voice. - Quiet, letter-like composition. -
Space around the message. - One or two decorative accents. - Final copy
is pending.

**Motion:** gentle reveal, potentially line-by-line. Do not make
visitors wait for the text to finish animating.

### 3. Save the Date

**Purpose:** make event information easy to scan. - Saturday, 17 October
2026. - Braci Bandung, Bandung, Indonesia. - Event time and confirmed
address/map link are pending.

Use strong date typography and a clear information group. A date reveal
can be distinctive; supporting information should enter more quietly.

### 4. What to Expect

**Purpose:** explain event details, activities, dress code, or practical
information. - Use a small set of clear information blocks. - Do not
display a dress code until confirmed. - Do not invent activities.

Motion should be light and staggered rather than elaborate for every
item.

### 5. Until Then

**Purpose:** close with anticipation and a clear next action. - Compact
countdown showing days, hours, minutes, and seconds after event time is
confirmed. - Short closing line. - CTA: **RSVP & Choose Your Menu**,
linking to `/rsvp`.

Keep countdown motion calm. Avoid explosive effects or dramatic
full-screen transitions.

## RSVP --- `/rsvp`

### Step 1: Invitation access

-   Ask for the guest's invitation code.
-   Give clear invalid-code feedback.
-   Do not describe client-side-only validation as secure
    authentication.

### Step 2: Guest details

-   Guest enters their name.
-   Guest chooses attendance status.
-   No guest-count field.

### Step 3: Menu selection

-   Show food and drink choices only for attending guests.
-   Use cards with image, name, short description, and a clear selected
    state.
-   The number of allowed selections depends on the final menu/event
    arrangements.
-   Menu content and images are pending.

### Step 4: Review and submit

-   Summarize attendance and selected items.
-   Allow edits before submission where the chosen form workflow
    supports them.
-   Show success only when submission succeeds.
-   No email notifications in v1.

Google Forms may not fully match the custom design. Decide whether to
embed it or open it separately after testing its conditional logic and
visual limitations.

## Motion and scroll

1.  **Typography motion:** staggered word/character reveals, controlled
    scale changes, small position shifts, expressive timing.
2.  **Scroll choreography:** section reveals and occasional subtle
    depth/parallax.
3.  **Micro-interactions:** clear feedback for buttons, menu selection,
    and form states.

Rules: - Hero is the most expressive section. - Information sections are
calmer. - Countdown and ending remain restrained. - Never lock vertical
scrolling or turn the page into horizontal slides. - Avoid simultaneous,
distracting movement. - Essential text remains available if animation is
skipped. - Respect reduced-motion preferences. - Provide visible
keyboard focus states.

## Responsive behavior

**Mobile:** keep `17` dominant without clipping; reflow rather than
shrink the desktop layout; ensure buttons/cards are easy to tap; avoid
uncomfortable parallax; make RSVP easy to complete.\
**Desktop:** use whitespace and controlled line lengths; preserve
centered hero composition; decorative elements must not compete with
typography.

## Content and asset rules

-   No personal photos required.
-   Do not invent menu items, dress code, event time, personal message,
    or activities.
-   Use a small, consistent doodle set.
-   Menu imagery must match actual menu items once supplied.
-   Use appropriate alt text for informative images; hide purely
    decorative images from assistive technology where appropriate.

## Design QA checklist

-   [ ] Centered oversized `17` is the dominant hero element.
-   [ ] Visuals are youthful and expressive without clutter.
-   [ ] Typography motion has intentional timing and hierarchy.
-   [ ] Visitors can scroll freely in both directions.
-   [ ] Only a few cinematic moments are used.
-   [ ] Date and venue are easy to find.
-   [ ] Countdown uses confirmed event time/timezone.
-   [ ] RSVP has no guest-count field.
-   [ ] Menu cards show clear selected/unselected states.
-   [ ] Mobile layout is readable and usable.
-   [ ] Reduced-motion preferences are respected.
-   [ ] Pending content is confirmed before launch.
