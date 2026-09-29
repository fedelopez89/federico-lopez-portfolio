import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  canUseViewTransition,
  isViewTransitionActive,
  navigateWithTransition,
  projectCardShared,
  resetViewTransitionForTests,
  signalViewTransitionReady,
} from './viewTransition';

const setReducedMotion = (reduce: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockReturnValue({ matches: reduce }),
  });
};

const mockStartViewTransition = () => {
  let finish!: () => void;
  const finished = new Promise<void>((resolve) => (finish = resolve));
  const start = vi.fn((cb: () => Promise<void>) => {
    void cb();
    return {
      ready: Promise.resolve(),
      finished,
      updateCallbackDone: Promise.resolve(),
    };
  });
  (document as unknown as Record<string, unknown>).startViewTransition = start;
  return { start, finish };
};

describe('navigateWithTransition', () => {
  beforeEach(() => setReducedMotion(false));
  afterEach(() => {
    vi.useRealTimers();
    resetViewTransitionForTests();
    delete (document as unknown as Record<string, unknown>).startViewTransition;
    document.body.innerHTML = '';
  });

  it('runs the navigation inside a view transition when supported', async () => {
    const { start, finish } = mockStartViewTransition();
    const go = vi.fn();

    expect(navigateWithTransition(go)).toBe(true);
    expect(start).toHaveBeenCalledTimes(1);
    expect(isViewTransitionActive()).toBe(true);
    await Promise.resolve();
    expect(go).toHaveBeenCalledTimes(1);

    signalViewTransitionReady();
    finish();
    await vi.waitFor(() => expect(isViewTransitionActive()).toBe(false));
  });

  it('navigates directly when the API is unsupported', () => {
    const go = vi.fn();
    expect(canUseViewTransition()).toBe(false);
    expect(navigateWithTransition(go)).toBe(false);
    expect(go).toHaveBeenCalledTimes(1);
  });

  it('navigates directly under reduced motion', () => {
    const { start } = mockStartViewTransition();
    setReducedMotion(true);
    const go = vi.fn();

    expect(navigateWithTransition(go)).toBe(false);
    expect(start).not.toHaveBeenCalled();
    expect(go).toHaveBeenCalledTimes(1);
  });

  it('names only the given elements, and clears them when finished', async () => {
    const { finish } = mockStartViewTransition();
    document.body.innerHTML = `
      <a id="a" href="/projects/one"><div data-vt-shot></div><h4 data-vt-title></h4></a>
      <a id="b" href="/projects/two"><div data-vt-shot></div><h4 data-vt-title></h4></a>`;
    const a = document.getElementById('a')!;
    const b = document.getElementById('b')!;

    navigateWithTransition(vi.fn(), { shared: projectCardShared(a, 'one') });

    const name = (el: Element, sel: string) =>
      (el.querySelector(sel) as HTMLElement).style.getPropertyValue(
        'view-transition-name'
      );
    expect(name(a, '[data-vt-shot]')).toBe('project-shot-one');
    expect(name(a, '[data-vt-title]')).toBe('project-title-one');
    expect(name(b, '[data-vt-shot]')).toBe('');
    expect(name(b, '[data-vt-title]')).toBe('');

    signalViewTransitionReady();
    finish();
    await vi.waitFor(() => expect(name(a, '[data-vt-shot]')).toBe(''));
  });

  it('ignores a second navigation while one is running', () => {
    const { start } = mockStartViewTransition();
    const first = vi.fn();
    const second = vi.fn();

    navigateWithTransition(first);
    expect(navigateWithTransition(second)).toBe(false);

    expect(start).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
  });

  it('falls back to the timeout when the page never signals ready', async () => {
    vi.useFakeTimers();
    const { finish } = mockStartViewTransition();
    document.body.innerHTML =
      '<a id="a"><div data-vt-shot></div><h4 data-vt-title></h4></a>';
    const a = document.getElementById('a')!;
    const go = vi.fn();

    navigateWithTransition(go, { shared: projectCardShared(a, 'one') });
    await vi.advanceTimersByTimeAsync(1100);
    expect(go).toHaveBeenCalledTimes(1);

    finish();
    await vi.advanceTimersByTimeAsync(0);
    expect(isViewTransitionActive()).toBe(false);
    expect(
      (a.querySelector('[data-vt-shot]') as HTMLElement).style.getPropertyValue(
        'view-transition-name'
      )
    ).toBe('');
  });

  it('navigates directly if startViewTransition throws', () => {
    (document as unknown as Record<string, unknown>).startViewTransition =
      () => {
        throw new Error('boom');
      };
    const go = vi.fn();

    expect(navigateWithTransition(go)).toBe(false);
    expect(go).toHaveBeenCalledTimes(1);
    expect(isViewTransitionActive()).toBe(false);
  });
});
