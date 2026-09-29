import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRef } from 'react';
import { usePointerGlow } from './usePointerGlow';

const Harness = () => {
  const ref = useRef<HTMLDivElement>(null);
  usePointerGlow(ref);
  return <div ref={ref} data-testid="host" />;
};

const hostPointerMoveCalls = (spy: { mock: { calls: unknown[][]; contexts: unknown[] } }) =>
  spy.mock.calls.filter(
    (call, i) =>
      call[0] === 'pointermove' &&
      (spy.mock.contexts[i] as HTMLElement).dataset?.testid === 'host'
  );

const mockMatchMedia = (matching: (query: string) => boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: matching(query),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
};

describe('usePointerGlow', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('attaches a passive pointermove listener with a fine pointer', () => {
    mockMatchMedia((q) => q.includes('pointer: fine'));
    const spy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    render(<Harness />);
    const calls = hostPointerMoveCalls(spy);
    expect(calls).toHaveLength(1);
    expect(calls[0][2]).toEqual({ passive: true });
  });

  it('does not attach when there is no fine pointer', () => {
    mockMatchMedia(() => false);
    const spy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    render(<Harness />);
    expect(hostPointerMoveCalls(spy)).toHaveLength(0);
  });

  it('does not attach when reduced motion is preferred', () => {
    mockMatchMedia(() => true);
    const spy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    render(<Harness />);
    expect(hostPointerMoveCalls(spy)).toHaveLength(0);
  });
});

describe('usePointerGlow lifecycle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('removes listeners, cancels the frame and disconnects the observer on unmount', () => {
    mockMatchMedia((q) => q.includes('pointer: fine'));

    const disconnect = vi.fn();
    class FakeObserver {
      observe = vi.fn();
      disconnect = disconnect;
    }
    vi.stubGlobal('IntersectionObserver', FakeObserver);

    const cancel = vi.spyOn(window, 'cancelAnimationFrame');
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42);
    const addSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    const removeSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');

    const { unmount, getByTestId } = render(<Harness />);
    // Start the loop so there is a pending frame to cancel.
    getByTestId('host').dispatchEvent(
      new MouseEvent('pointermove', { clientX: 50, clientY: 50 })
    );
    expect(hostPointerMoveCalls(addSpy)).toHaveLength(1);

    unmount();

    const removed = removeSpy.mock.calls.filter(
      (call, i) =>
        call[0] === 'pointermove' &&
        (removeSpy.mock.contexts[i] as HTMLElement).dataset?.testid === 'host'
    );
    expect(removed).toHaveLength(1);
    expect(cancel).toHaveBeenCalledWith(42);
    expect(disconnect).toHaveBeenCalled();
  });

  it('tears down when the pointer media query stops matching', () => {
    let fine = true;
    const listeners: Array<() => void> = [];
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return query.includes('pointer: fine') ? fine : false;
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => listeners.push(cb),
        removeEventListener: vi.fn(),
      })),
    });
    const removeSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');

    render(<Harness />);
    fine = false;
    listeners.forEach((cb) => cb());

    const removed = removeSpy.mock.calls.filter(
      (call, i) =>
        call[0] === 'pointermove' &&
        (removeSpy.mock.contexts[i] as HTMLElement).dataset?.testid === 'host'
    );
    expect(removed).toHaveLength(1);
  });
});
