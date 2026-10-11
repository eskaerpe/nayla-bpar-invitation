import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const reveal = readFileSync(join(process.cwd(), 'components/ScrollReveal.tsx'), 'utf8');
const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

describe('invitation scroll reveal', () => {
  it('uses intersection-triggered reveal and reduced-motion fallback', () => {
    expect(reveal).toContain('IntersectionObserver');
    expect(reveal).toContain('is-revealed');
    expect(reveal).toContain('prefers-reduced-motion: reduce');
  });

  it('reveals progressively with motion-safe transitions', () => {
    expect(styles).toContain('.has-scroll-reveal [data-reveal]');
    expect(styles).toContain('[data-reveal].is-revealed');
    expect(styles).toContain('transition: opacity');
  });

  it('keeps anchor smooth scrolling and disables motion for reduced-motion', () => {
    expect(styles).toContain('html { scroll-behavior: smooth; }');
    expect(styles).toContain('scroll-behavior: auto');
    expect(styles).toContain('prefers-reduced-motion: reduce');
  });
});
