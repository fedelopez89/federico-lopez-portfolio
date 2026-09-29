import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useCardSpotlight } from './useCardSpotlight';

const mockMedia = ({ fine = true, reduce = false } = {}) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes('hover: hover') ? fine : reduce,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
};

const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);
  useCardSpotlight(ref);
  return (
    <div ref={ref} data-testid="grid">
      <a data-spot-card data-testid="a" href="/a">
        <span data-testid="inner">a</span>
      </a>
      <a data-spot-card data-testid="b" href="/b">
        b
      </a>
    </div>
  );
};

const flushFrame = () => vi.advanceTimersByTimeAsync(20);

describe('useCardSpotlight', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      width: 200,
      height: 100,
      right: 300,
      bottom: 150,
      x: 100,
      y: 50,
      toJSON: () => ({}),
    });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('writes offsets from the centre on the hovered card only', async () => {
    mockMedia();
    const { getByTestId } = render(<Grid />);

    fireEvent.pointerMove(getByTestId('inner'), {
      clientX: 220,
      clientY: 70,
      pointerType: 'mouse',
    });
    await flushFrame();

    expect(getByTestId('a').style.getPropertyValue('--spot-x')).toBe('20.0px');
    expect(getByTestId('a').style.getPropertyValue('--spot-y')).toBe('-30.0px');
    expect(getByTestId('b').style.getPropertyValue('--spot-x')).toBe('');
  });

  it('clears the previous card and on leave', async () => {
    mockMedia();
    const { getByTestId } = render(<Grid />);
    const move = (id: string) =>
      fireEvent.pointerMove(getByTestId(id), {
        clientX: 150,
        clientY: 60,
        pointerType: 'mouse',
      });

    move('a');
    await flushFrame();
    move('b');
    await flushFrame();
    // The previous card keeps its position while its glow fades out.
    expect(getByTestId('a').style.getPropertyValue('--spot-x')).not.toBe('');
    await vi.advanceTimersByTimeAsync(600);
    expect(getByTestId('a').style.getPropertyValue('--spot-x')).toBe('');
    expect(getByTestId('b').style.getPropertyValue('--spot-x')).not.toBe('');

    fireEvent.pointerLeave(getByTestId('grid'));
    expect(getByTestId('b').style.getPropertyValue('--spot-x')).not.toBe('');
    await vi.advanceTimersByTimeAsync(600);
    expect(getByTestId('b').style.getPropertyValue('--spot-x')).toBe('');
  });

  it('keeps the vars if the pointer re-enters before the release', async () => {
    mockMedia();
    const { getByTestId } = render(<Grid />);
    const move = () =>
      fireEvent.pointerMove(getByTestId('a'), {
        clientX: 150,
        clientY: 60,
        pointerType: 'mouse',
      });

    move();
    await flushFrame();
    fireEvent.pointerLeave(getByTestId('grid'));
    await vi.advanceTimersByTimeAsync(200);
    move();
    await vi.advanceTimersByTimeAsync(600);
    expect(getByTestId('a').style.getPropertyValue('--spot-x')).not.toBe('');
  });

  it('ignores touch pointers', async () => {
    mockMedia();
    const { getByTestId } = render(<Grid />);
    fireEvent.pointerMove(getByTestId('a'), {
      clientX: 150,
      clientY: 60,
      pointerType: 'touch',
    });
    await flushFrame();
    expect(getByTestId('a').style.getPropertyValue('--spot-x')).toBe('');
  });

  it.each([
    ['coarse pointer', { fine: false }],
    ['reduced motion', { reduce: true }],
  ])('does not attach with %s', async (_label, opts) => {
    mockMedia(opts);
    const { getByTestId } = render(<Grid />);
    fireEvent.pointerMove(getByTestId('a'), {
      clientX: 150,
      clientY: 60,
      pointerType: 'mouse',
    });
    await flushFrame();
    expect(getByTestId('a').style.getPropertyValue('--spot-x')).toBe('');
  });

  it('removes its listeners and vars on unmount', async () => {
    mockMedia();
    const { getByTestId, unmount } = render(<Grid />);
    const grid = getByTestId('grid');
    const removeSpy = vi.spyOn(grid, 'removeEventListener');
    fireEvent.pointerMove(getByTestId('a'), {
      clientX: 150,
      clientY: 60,
      pointerType: 'mouse',
    });
    await flushFrame();
    const a = getByTestId('a');
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(a.style.getPropertyValue('--spot-x')).toBe('');
  });
});
