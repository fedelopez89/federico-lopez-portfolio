import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRef } from 'react';
import { usePointerParallax } from './usePointerParallax';

const Harness = ({ enabled = true }: { enabled?: boolean }) => {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  usePointerParallax(host, target, enabled);
  return (
    <div ref={host} data-testid="host">
      <div ref={target} data-testid="target" />
    </div>
  );
};

/** matchMedia whose fine-pointer and reduced-motion states can change. */
const media = { fine: true, reduced: false };
let mediaListeners: Array<() => void> = [];

const installMatchMedia = () => {
  mediaListeners = [];
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      get matches() {
        if (query.includes('pointer: fine')) return media.fine;
        if (query.includes('prefers-reduced-motion')) return media.reduced;
        return false;
      },
      media: query,
      addEventListener: (_: string, cb: () => void) => mediaListeners.push(cb),
      removeEventListener: (_: string, cb: () => void) => {
        mediaListeners = mediaListeners.filter((l) => l !== cb);
      },
    })),
  });
};

const changeMedia = (patch: Partial<typeof media>) => {
  Object.assign(media, patch);
  [...mediaListeners].forEach((cb) => cb());
};

/** Manual rAF: `frames()` runs queued callbacks, one 60Hz step at a time. */
let queue = new Map<number, FrameRequestCallback>();
let nextId = 1;
let clock = 1000;

const installRaf = () => {
  queue = new Map();
  nextId = 1;
  clock = 1000;
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    const id = nextId++;
    queue.set(id, cb);
    return id;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    queue.delete(id);
  });
};

const frames = (count: number) => {
  for (let i = 0; i < count && queue.size > 0; i++) {
    clock += 1000 / 60;
    const pending = [...queue.entries()];
    queue.clear();
    pending.forEach(([, cb]) => cb(clock));
  }
};

const hostCalls = (spy: {
  mock: { calls: unknown[][]; contexts: unknown[] };
}) =>
  spy.mock.calls.filter(
    (call, i) =>
      call[0] === 'pointermove' &&
      (spy.mock.contexts[i] as HTMLElement).dataset?.testid === 'host'
  );

const px = (el: HTMLElement) => Number(el.style.getPropertyValue('--px') || 0);

const move = (host: HTMLElement, clientX: number, clientY = 400) =>
  host.dispatchEvent(new MouseEvent('pointermove', { clientX, clientY }));

describe('usePointerParallax', () => {
  beforeEach(() => {
    media.fine = true;
    media.reduced = false;
    installMatchMedia();
    installRaf();
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('eases the normalized vars towards the pointer', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 1000);
    frames(1);
    const first = px(getByTestId('target'));
    expect(first).toBeGreaterThan(0);
    expect(first).toBeLessThan(0.5);
    frames(200);
    expect(px(getByTestId('target'))).toBeGreaterThan(0.99);
    expect(px(getByTestId('target'))).toBeLessThanOrEqual(1);
  });

  it('does not attach when disabled, without a fine pointer, or with reduced motion', () => {
    const spy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    render(<Harness enabled={false} />);
    media.fine = false;
    render(<Harness />);
    media.fine = true;
    media.reduced = true;
    render(<Harness />);
    expect(hostCalls(spy)).toHaveLength(0);
  });

  it('removes listeners and cancels the frame on unmount', () => {
    const remove = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    const { unmount, getByTestId } = render(<Harness />);
    move(getByTestId('host'), 900);
    expect(queue.size).toBe(1);
    unmount();
    expect(hostCalls(remove)).toHaveLength(1);
    expect(queue.size).toBe(0);
  });

  it('toggles with the pointer media query', () => {
    const add = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    const remove = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    render(<Harness />);
    expect(hostCalls(add)).toHaveLength(1);
    changeMedia({ fine: false });
    expect(hostCalls(remove)).toHaveLength(1);
    changeMedia({ fine: true });
    expect(hostCalls(add)).toHaveLength(2);
  });

  it('toggles with the enabled flag', () => {
    const add = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    const remove = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    const { rerender } = render(<Harness enabled />);
    expect(hostCalls(add)).toHaveLength(1);
    rerender(<Harness enabled={false} />);
    expect(hostCalls(remove)).toHaveLength(1);
    rerender(<Harness enabled />);
    expect(hostCalls(add)).toHaveLength(2);
  });

  it('eases back to rest when the pointer leaves the host', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 1000);
    frames(300);
    expect(px(getByTestId('target'))).toBeGreaterThan(0.99);
    // jsdom rects are all zero, so this point is outside the host.
    getByTestId('host').dispatchEvent(
      new MouseEvent('pointerleave', { clientX: 500, clientY: 500 })
    );
    frames(400);
    expect(Math.abs(px(getByTestId('target')))).toBeLessThan(0.01);
  });

  it('eases back to rest when the pointer leaves the window', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 0);
    frames(300);
    expect(px(getByTestId('target'))).toBeLessThan(-0.99);
    document.documentElement.dispatchEvent(new MouseEvent('pointerleave'));
    frames(400);
    expect(Math.abs(px(getByTestId('target')))).toBeLessThan(0.01);
  });

  it('stops the loop once settled', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 1000);
    frames(1000);
    expect(queue.size).toBe(0);
    // A new move restarts it.
    move(getByTestId('host'), 200);
    expect(queue.size).toBe(1);
  });

  it('covers the same distance regardless of frame rate', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 1000);
    frames(1); // first frame assumes 60Hz: 0.1
    // A 33ms frame covers about as much as two 16.7ms frames: 0.1 + 0.9 * 0.19
    clock += 33.4;
    const cb = [...queue.values()][0];
    queue.clear();
    cb(clock);
    const value = px(getByTestId('target'));
    expect(value).toBeGreaterThan(0.26);
    expect(value).toBeLessThan(0.28);
  });

  it('stops tracking when reduced motion turns on', () => {
    const { getByTestId } = render(<Harness />);
    move(getByTestId('host'), 1000);
    frames(5);
    expect(queue.size).toBe(1);
    changeMedia({ reduced: true });
    expect(queue.size).toBe(0);
    expect(getByTestId('target').style.getPropertyValue('--px')).toBe('');
    const add = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    move(getByTestId('host'), 500);
    expect(queue.size).toBe(0);
    expect(hostCalls(add)).toHaveLength(0);
  });
});
