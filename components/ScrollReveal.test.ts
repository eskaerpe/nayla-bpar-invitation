import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const component = readFileSync(fileURLToPath(new URL('./ScrollReveal.tsx', import.meta.url)), 'utf8');
const styles = readFileSync(fileURLToPath(new URL('../app/globals.css', import.meta.url)), 'utf8');
const invitation = readFileSync(fileURLToPath(new URL('./Invitation.tsx', import.meta.url)), 'utf8');
const event = readFileSync(fileURLToPath(new URL('../content/event.ts', import.meta.url)), 'utf8');

describe('ScrollReveal', () => {
  it('keeps hero content visible by excluding it from scroll-reveal targets', () => {
    expect(component).not.toContain("'.hero-topline'");
    expect(component).not.toContain("'.hero-seal'");
    expect(component).not.toContain("'#hero-title'");
    expect(component).not.toContain('heroIndex >= 0 ? heroIndex * 180');
    expect(styles).toContain('.has-scroll-reveal [data-reveal]');
    expect(styles).toContain('[data-reveal].is-revealed');
    expect(styles).not.toContain('hero-reveal-ready');
    expect(styles).not.toContain('.has-scroll-reveal .hero-section [data-reveal]');
    expect(styles).toContain('Hero content remains visible until its post-paint entrance begins.');
  });

  it('starts the hero entrance only after the invitation has painted', () => {
    expect(invitation).toContain("useState(false)");
    expect(invitation).toContain('requestAnimationFrame(() => {');
    expect(invitation).toContain('window.setTimeout(() => setHeroReady(true), 150)');
    expect(invitation).toContain("hero-section${heroReady ? ' hero-section--ready' : ''}");
    expect(styles).toContain('.hero-section--ready .hero-topline');
    expect(styles).toContain('opacity: 0');
    expect(styles).toContain('translate3d(0, 24px, 0)');
    expect(styles).toContain('.hero-section--ready .hero-seal');
    expect(styles).toContain('rotate(12deg)');
    expect(styles).toContain('1250ms cubic-bezier(.16, 1, .3, 1)');
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
