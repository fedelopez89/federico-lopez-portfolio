import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import '../../../i18n/config';
import Hero from './Hero';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

const mediaMock = vi.hoisted(() => ({ wide: false }));

// useMediaQuery caches lists per query at module level, so the hook is mocked to
// switch the viewport per test.
vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hooks')>();
  return {
    ...actual,
    useMediaQueryHysteresis: (enter: string) =>
      enter.includes('min-width') ? mediaMock.wide : false,
  };
});

// jsdom has no Web Animations API, which scroll-linked motion values rely on.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: actual.motionValue(0) }),
  };
});

const pointerMoveListeners = (spy: {
  mock: { calls: unknown[][]; contexts: unknown[] };
}) => spy.mock.calls.filter((call) => call[0] === 'pointermove');

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

describe('Hero work stack', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mediaMock.wide = false;
  });

  it('is not rendered below the desktop breakpoint', () => {
    mediaMock.wide = false;
    renderWithProviders(<Hero />);
    expect(screen.queryByTestId('hero-work-stack')).not.toBeInTheDocument();
    expect(document.querySelectorAll('img')).toHaveLength(0);
  });

  it('renders as a decorative stack of three screenshots on desktop', () => {
    mediaMock.wide = true;
    renderWithProviders(<Hero />);
    const stack = screen.getByTestId('hero-work-stack');
    expect(stack).toHaveAttribute('aria-hidden', 'true');
    const images = stack.querySelectorAll('img');
    expect(images).toHaveLength(3);
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', '');
      expect(img).toHaveAttribute('width');
      expect(img).toHaveAttribute('height');
      expect(img).toHaveAttribute('decoding', 'async');
      expect(img).toHaveAttribute('fetchpriority', 'low');
    });
    expect(stack.querySelectorAll('a, button, [tabindex]')).toHaveLength(0);
  });

  // Other libraries (framer-motion) register their own pointermove
  // listeners, so the stack's are measured as a delta against a hero without it.
  const countPointerMove = (wide: boolean) => {
    mediaMock.wide = wide;
    const add = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    const remove = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    const { unmount } = renderWithProviders(<Hero />);
    const added = pointerMoveListeners(add).length;
    unmount();
    const removed = pointerMoveListeners(remove).length;
    vi.restoreAllMocks();
    return { added, removed };
  };

  it('attaches no pointer listeners for the stack under reduced motion', () => {
    mockMatchMedia(() => true);
    const without = countPointerMove(false);
    const withStack = countPointerMove(true);
    expect(withStack.added).toBe(without.added);
  });

  it('attaches a parallax pointer listener with a fine pointer and removes it on unmount', () => {
    mockMatchMedia((q) => q.includes('pointer: fine'));
    const without = countPointerMove(false);
    const withStack = countPointerMove(true);
    expect(withStack.added).toBe(without.added + 1);
    expect(withStack.removed).toBe(without.removed + 1);
  });
});
