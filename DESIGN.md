# DESIGN — Nayla’s Sweet Seventeen

## Direction

A private birthday invitation with a romantic editorial character: feminine, intimate, soft, and premium. It must read as a continuous invitation rather than a SaaS landing page or a generic birthday template. Typography, intentional whitespace, paper-like surfaces, and a small number of ornamental motifs carry the visual identity.

The invitation is mobile-first. On narrow screens, every detail must remain readable, tap-safe, and inside stable gutters. Decorative rings, seals, tape, and oversized date numerals must never compete with functional content.

## Reading order

1. Nayla / Sweet Seventeen / Birthday Party
2. Date and event time
3. Personal invitation note
4. Venue and map
5. Dress code / outfit inspiration
6. Useful details: venue, RSVP, menu
7. Countdown and RSVP action

## Palette

| Token | Hex | Role |
|---|---:|---|
| Peony Pink | `#F2C1CF` | Hero, primary accent, RSVP emphasis |
| Soft Pink | `#F8DDDD` | Letter, quiet color fields, form accents |
| Cream | `#F4ECE2` | Alternate information section |
| Ivory | `#F8F5F1` | Main page surface |
| White | `#FAF9F7` | Cards, map label, modal surface |
| Dark Neutral Ink | `#352C34` | Primary text, contrast, closing section |
| Plum | `#8D526B` | Secondary text accent and links |

Chocolate brown, latte, beige, and sage are not part of the visual identity. Do not introduce dominant dark-brown surfaces or text. Validate foreground/background contrast before using pale pink for text.

## Typography

- **Display:** high-contrast expressive serif for `Nayla`, date numerals, major headings, and venue highlight.
- **Supporting:** clean sans-serif for dates, address, labels, body copy, controls, and forms.
- **Accent:** restrained handwritten/script only for a short invitation accent, signoff, or one emphasized word.

Never use handwritten type for dense body copy, form labels, dates, map metadata, countdown units, or CTAs.

## Layout rules

- Use `--page-gutter` as the shared horizontal rhythm.
- Hero uses centered focal typography plus a secondary seal/orbit system outside text-safe zones.
- Editorial asymmetry must still follow shared gutters and have clear purpose.
- Each section gets one visual focal point. Do not stack arbitrary badges, cards, or shadows.
- Cards are reserved for actual grouped information: note, venue facts, map, RSVP form, and modal.
- Primary CTA must use explicit text, visible focus state, and a minimum 44px touch target.

## Functional UI

- Gate, RSVP, menu selection, success state, and lightbox use the same pink/ivory/ink identity.
- The Google Map is an embedded responsive map, with the external Google Maps link retained as a secondary action.
- Outfit inspiration opens in an image dialog with backdrop, close control, and Escape support.
- RSVP invariants are architecture constraints: direct client-side Apps Script submission; exact five-field payload; no backend/proxy; immutable success state.

## QA acceptance

Test at 360px, 375px, 390px, and 1280px:

- no horizontal overflow, accidental clipping, or unreadable overlap;
- hero bottomline and scroll affordance remain visible;
- headline wrapping is deliberate;
- map and image dialog are operable;
- countdown and CTA remain readable;
- keyboard focus is visible;
- the gate and RSVP pages belong to the same identity.
