import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const component = readFileSync(fileURLToPath(new URL('./ScrollReveal.tsx', import.meta.url)), 'utf8');
const styles = readFileSync(fileURLToPath(new URL('../app/globals.css', import.meta.url)), 'utf8');
const invitation = readFileSync(fileURLToPath(new URL('./Invitation.tsx', import.meta.url)), 'utf8');
const event = readFileSync(fileURLToPath(new URL('../content/event.ts', import.meta.url)), 'utf8');

describe('ScrollReveal', () => {
  it('targets each hero element for a staggered entrance', () => {
    for (const selector of [
      "'.hero-topline'", "'.hero-seal'", "'.hero-kicker'", "'.hero-invite'",
      "'.hero-celebrate'", "'#hero-title'", "'.hero-occasion'", "'.hero-bottomline > *'",
    ]) expect(component).toContain(selector);
    expect(component).toContain('heroIndex >= 0 ? heroIndex * 180');
  });

  it('applies the reveal styles with a visible hero-specific entrance', () => {
    expect(styles).toContain('.has-scroll-reveal [data-reveal]');
    expect(styles).toContain('[data-reveal].is-revealed');
    expect(styles).toContain('.has-scroll-reveal .hero-section [data-reveal]');
    expect(styles).toContain('prefers-reduced-motion: reduce');
    expect(component).toContain('IntersectionObserver');
    expect(component).toContain('is-revealed');
  });

  it('keeps the invitation note in Nayla’s first-person voice without em dashes', () => {
    const note = event.match(/personalNote:\s*"([^"]+)"/)?.[1] ?? '';
    expect(note).toMatch(/^I(?:'|’)/);
    expect(note).not.toContain('—');
  });

  it('labels the afternoon as lunch and games without mentioning surprises', () => {
    expect(invitation).toContain("title: 'Lunch & games'");
    expect(invitation.toLowerCase()).not.toContain('surprise');
    expect(event.toLowerCase()).not.toContain('surprise');
  });
});
