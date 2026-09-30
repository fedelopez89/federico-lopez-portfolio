import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import '../../../i18n/config';
import ScrollCue from './ScrollCue';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

const motionMock = vi.hoisted(() => ({ reduce: false, hiddenViewport: false }));

// useMediaQuery caches lists per query at module level, so it is mocked.
vi.mock('@/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks')>();
  return { ...actual, useMediaQuery: () => motionMock.hiddenViewport };
});

// framer-motion reads the media query once per module, so the hook is mocked.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return { ...actual, useReducedMotion: () => motionMock.reduce };
});

const mockReducedMotion = (reduce: boolean) => {
  motionMock.reduce = reduce;
};

const segment = () => screen.getByTestId('hero-scroll-cue-segment');

describe('ScrollCue', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    vi.useRealTimers();
    motionMock.reduce = false;
    motionMock.hiddenViewport = false;
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('is a real link to the About section with a translated name', () => {
    renderWithProviders(<ScrollCue hidden={false} />);
    const link = screen.getByRole('link', { name: 'Scroll to About' });
    expect(link).toHaveAttribute('href', '#aboutme');
    expect(link).toHaveTextContent('Scroll');
  });

  it('starts the travel only after the idle delay, at the top of the page', () => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    renderWithProviders(<ScrollCue hidden={false} />);
    expect(segment()).not.toHaveAttribute('data-playing');
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(segment()).toHaveAttribute('data-playing', 'true');
  });

  it('does not start when the page has already been scrolled', () => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    Object.defineProperty(window, 'scrollY', {
      value: 200,
      configurable: true,
    });
    renderWithProviders(<ScrollCue hidden={false} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(segment()).not.toHaveAttribute('data-playing');
  });

  it('never animates under reduced motion', () => {
    vi.useFakeTimers();
    mockReducedMotion(true);
    renderWithProviders(<ScrollCue hidden={false} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(segment()).not.toHaveAttribute('data-playing');
  });

  it('leaves the tab order once hidden', () => {
    renderWithProviders(<ScrollCue hidden />);
    expect(
      screen.queryByRole('link', { name: 'Scroll to About' })
    ).not.toBeInTheDocument();
  });

  it('stops the travel when the page is scrolled away from the top', () => {
    vi.useFakeTimers();
    renderWithProviders(<ScrollCue hidden={false} />);
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(segment()).toHaveAttribute('data-playing', 'true');
    Object.defineProperty(window, 'scrollY', {
      value: 120,
      configurable: true,
    });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(segment()).not.toHaveAttribute('data-playing');
  });

  it('clears the idle timer on unmount', () => {
    vi.useFakeTimers();
    const { unmount } = renderWithProviders(<ScrollCue hidden={false} />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not start a timer where the cue is not displayed', () => {
    vi.useFakeTimers();
    motionMock.hiddenViewport = true;
    renderWithProviders(<ScrollCue hidden={false} />);
    expect(vi.getTimerCount()).toBe(0);
  });
});
