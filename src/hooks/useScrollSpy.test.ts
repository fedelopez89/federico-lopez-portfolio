import { describe, it, expect } from 'vitest';
import { pickActiveSection } from './useScrollSpy';

const sections = (tops: Record<string, number>) =>
  Object.entries(tops).map(([id, top]) => ({ id, top }));

describe('pickActiveSection', () => {
  it('returns home while no nav section has crossed the line', () => {
    expect(
      pickActiveSection({
        sections: sections({ home: -100, aboutme: 700, projects: 1500 }),
        line: 400,
        atBottom: false,
      })
    ).toBe('home');
  });

  it('activates a section once its top crosses the line', () => {
    expect(
      pickActiveSection({
        sections: sections({ home: -900, aboutme: 380, projects: 1200 }),
        line: 400,
        atBottom: false,
      })
    ).toBe('aboutme');
  });

  it('keeps the previous section until the next top crosses', () => {
    expect(
      pickActiveSection({
        sections: sections({
          home: -2000,
          aboutme: -800,
          projects: 420,
          experience: 1400,
        }),
        line: 400,
        atBottom: false,
      })
    ).toBe('aboutme');
  });

  it('activates the last section at the bottom even if its top never crosses', () => {
    expect(
      pickActiveSection({
        sections: sections({ home: -5000, experience: -300, contact: 600 }),
        line: 400,
        atBottom: true,
      })
    ).toBe('contact');
  });

  it('returns an empty id when there are no sections', () => {
    expect(
      pickActiveSection({ sections: [], line: 400, atBottom: false })
    ).toBe('');
  });

  it('prefers the section the URL points at when at the bottom', () => {
    expect(
      pickActiveSection({
        sections: sections({ home: -5000, experience: 100, contact: 600 }),
        line: 400,
        atBottom: true,
        preferred: 'experience',
      })
    ).toBe('experience');
  });
});
