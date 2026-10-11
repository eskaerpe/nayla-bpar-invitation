import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = readFileSync(fileURLToPath(new URL('./ScrollReveal.tsx', import.meta.url)), 'utf8');

describe('ScrollReveal', () => {
  it('includes the complete hero sequence in the reveal targets', () => {
    for (const selector of [
      "'.hero-topline'",
      "'.hero-seal'",
      "'.hero-kicker'",
      "'.hero-invite'",
      "'.hero-celebrate'",
      "'#hero-title'",
      "'.hero-occasion'",
      "'.hero-bottomline > *'",
    ]) {
      expect(source).toContain(selector);
    }
  });

  it('stages the hero entrance more slowly than scroll-section reveals', () => {
    expect(source).toContain('Math.max(heroIndex, 0) * 180');
    expect(source).toContain('(index % 3) * 110');
  });
});
