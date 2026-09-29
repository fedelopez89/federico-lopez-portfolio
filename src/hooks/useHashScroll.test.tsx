import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
  // Fake clock so the grace window and the frame are stepped, not awaited.
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'Date',
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mountOnProjectsHash = () => {
    window.history.replaceState(null, '', '/#projects');
    addSection('home', -900);
    const projects = addSection('projects', 300);
    addSection('experience', 1500);
    renderHook(() =>
      useScrollSpy({ sectionIds: ['home', 'projects', 'experience'] })
    );
    // A scroll from the hash alignment lands on a different section.
    projects.getBoundingClientRect = () => ({ top: 2000 }) as DOMRect;
  };

  it('does not rewrite the URL while a deep link is being resolved', () => {
    mountOnProjectsHash();
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(20);

    expect(window.location.hash).toBe('#projects');
  });

  it('rewrites the URL for scrolls after the grace window', () => {
    mountOnProjectsHash();
    vi.advanceTimersByTime(301);
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(20);

    // Home is the active section, whose hash is empty.
    expect(window.location.hash).toBe('');
  });
});
