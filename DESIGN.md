# DESIGN — Nayla’s Sweet Seventeen

## Direction
A private birthday invitation with a high-end feminine editorial character: romantic, intimate, contemporary, and premium. Treat the invitation and RSVP as one authored experience, not a SaaS landing page. Use typography, intentional asymmetry, paper-like surfaces, restrained ornament, and clear wayfinding. No generic card grids, repetitive containers, empty art panels, or marketplace conventions.

## Palette
| Token | Hex | Role |
|---|---:|---|
| Peony Pink | `#F2C1CF` | Hero and primary accent |
| Soft Pink | `#F8DDDD` | Selected states and letter surface |
| Cream | `#F4ECE2` | Warm secondary surface |
| Ivory | `#F8F5F1` | Main page surface |
| White | `#FAF9F7` | Reading surfaces |
| Dark Neutral Ink | `#352C34` | Primary text and closing contrast |
| Plum | `#8D526B` | Links, active states, secondary accent |

Chocolate brown, latte, beige, and sage are not identity colors. Avoid pale text on pale pink. Check foreground/background contrast for every state.

## Typography & composition
- Expressive high-contrast serif for Nayla, display headings, and date numerals.
- Legible sans-serif for body, details, labels, navigation, and controls.
- Restrained handwritten accent only for a few short phrases; never dense copy or controls.
- Hero keeps Nayla as focal point and establishes Birthday Party → Nayla → Sweet Seventeen hierarchy. Keep ornaments outside text-safe areas.
- Date, time, and venue form a single deliberate editorial composition; Braci is primary and “by Matoa Group” secondary.
- Each section has a distinct purpose, one focal point, and a clear transition. Align asymmetric content to shared gutters.
- RSVP is step-based and compact. Category navigation progressively reveals menu options; one choice per course, review before send. Keep selections and progress explicit.
- Menu options are hosted guest choices, not products: prices, currency, checkout, cart, quantity, and subtotal must never appear in the guest UI.

## Responsive/accessibility
- Mobile first; stable gutters, deliberate heading wraps, no horizontal overflow, minimum 44px primary touch targets, readable support text.
- Use visible keyboard focus, semantic step headings, labeled search, radio semantics, and reduced-motion support.
- Mobile category chips scroll horizontally; menu results scroll within a bounded viewport; sticky navigation/action must not obscure results.
- Outfit preview must load from `/outfit-inspo.png`; modal closes with close control, backdrop, and Escape.
- Map embed is responsive, has an explicit external Maps link, and must show a designed fallback instead of a blank area when unavailable.

## Functional constraints
- Preserve gate and personalized guest session.
- Preserve event: Saturday 17 October 2026, 13.00–16.00 WIB; Braci by Matoa Group; Jl. Sulanjana No. 5, Bandung.
- Preserve frontend menu choices, categories, attendance rules, one-food/one-drink validation, and countdown target.
- Payload must remain exactly `nama`, `will_join`, `makanan`, `minuman`, `notes_for_nayla`; no endpoint or backend changes. Never run a real production RSVP during QA.

## QA acceptance
Test invitation and RSVP at 360px, 375px, 390px, and 1280px. Check no overflow, clipping, overlapping copy, or unexplained blank areas; ensure map fallback/link, image/lightbox, step progression, back/forward selection persistence, exactly one food and drink, review, validation, and no displayed prices. Run typecheck, lint, tests, build, and `git diff --check`; inspect real rendered screenshots before claiming visual validation.
