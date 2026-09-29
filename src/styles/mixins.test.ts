import { describe, it, expect } from 'vitest';
import { alpha } from './mixins';

describe('alpha', () => {
  it('builds a color-mix expression', () => {
    expect(alpha('#2563eb', 15)).toBe('color-mix(in srgb, #2563eb 15%, transparent)');
  });

  it('accepts any CSS color string', () => {
    expect(alpha('var(--x)', 40)).toBe('color-mix(in srgb, var(--x) 40%, transparent)');
  });
});
