import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useHashScroll } from './useHashScroll';
import { useScrollSpy } from './useScrollSpy';

afterEach(() => {
  document.body.innerHTML = '';
  window.history.replaceState(null, '', '/');
});

const addSection = (id: string, top: number) => {
  const section = document.createElement('section');
  section.id = id;
  section.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.appendChild(section);
  return section;
};

describe('useHashScroll', () => {
  it('scrolls to the hash target and focuses its heading', async () => {
    window.history.replaceState(null, '', '/#projects');
    const section = addSection('projects', 0);
    section.scrollIntoView = vi.fn();
    const heading = document.createElement('h2');
    heading.id = 'projects-title';
    document.body.appendChild(heading);

    renderHook(() => useHashScroll());

    await waitFor(() => expect(heading).toHaveFocus());
    expect(section.scrollIntoView).toHaveBeenCalled();
    expect(heading).toHaveAttribute('tabindex', '-1');
  });

  it('does nothing without a hash', () => {
    const heading = document.createElement('h2');
    heading.id = 'projects-title';
    document.body.appendChild(heading);
    renderHook(() => useHashScroll());
    expect(heading).not.toHaveFocus();
  });
});

describe('useScrollSpy initial hash grace', () => {
  it('does not rewrite the URL while a deep link is being resolved', async () => {
    window.history.replaceState(null, '', '/#projects');
    addSection('home', -900);
    addSection('projects', 300);
    addSection('experience', 1500);

    renderHook(() =>
      useScrollSpy({ sectionIds: ['home', 'projects', 'experience'] })
    );
    // A scroll from the hash alignment lands on a different section.
    document.getElementById('projects')!.getBoundingClientRect = () =>
      ({ top: 2000 }) as DOMRect;
    window.dispatchEvent(new Event('scroll'));
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    expect(window.location.hash).toBe('#projects');
  });
});
