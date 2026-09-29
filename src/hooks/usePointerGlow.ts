import { useEffect, type RefObject } from 'react';

interface PointerGlowOptions {
  /** Fraction of the distance covered per frame (0-1). */
  ease?: number;
  /** Resting position as a fraction of the element width. */
  restX?: number;
  /** Resting position as a fraction of the element height. */
  restY?: number;
  /** Element that receives the CSS variables. Defaults to the tracked element. */
  varsRef?: RefObject<HTMLElement | null>;
}

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SETTLE_THRESHOLD = 0.1;

interface Point {
  x: number;
  y: number;
}

/**
 * Drives the `--glow-x` / `--glow-y` CSS variables so a light follows the
 * pointer with an eased lag. Writes styles directly (no React state), runs a
 * rAF loop only while the value is converging, and stays inactive on touch
 * devices or when reduced motion is preferred (re-evaluated when either
 * media query changes).
 */
export const usePointerGlow = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { ease = 0.12, restX = 0.65, restY = 0.4, varsRef }: PointerGlowOptions = {}
): void => {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== 'function') return;
    const varsEl = varsRef?.current ?? el;

    const setup = (): (() => void) => {
      let frame = 0;
      let attached = false;
      let current: Point = { x: 0, y: 0 };
      let target: Point = { x: 0, y: 0 };
      let lastClient: Point | null = null;

      const write = () => {
        varsEl.style.setProperty('--glow-x', `${current.x.toFixed(1)}px`);
        varsEl.style.setProperty('--glow-y', `${current.y.toFixed(1)}px`);
      };

      const getRest = (): Point => {
        const rect = el.getBoundingClientRect();
        return { x: rect.width * restX, y: rect.height * restY };
      };

      // Measuring at mount would force layout right after React commits. The
      // CSS defaults already park the glow at rest, so measure on first use.
      let ready = false;
      const ensureReady = () => {
        if (ready) return;
        ready = true;
        current = getRest();
        target = { ...current };
      };

      const tick = () => {
        const dx = target.x - current.x;
        const dy = target.y - current.y;

        if (
          Math.abs(dx) < SETTLE_THRESHOLD &&
          Math.abs(dy) < SETTLE_THRESHOLD
        ) {
          current = { ...target };
          write();
          frame = 0;
          return;
        }

        current = { x: current.x + dx * ease, y: current.y + dy * ease };
        write();
        frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (!frame) frame = requestAnimationFrame(tick);
      };

      const stop = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      };

      const retarget = () => {
        if (!lastClient) return;
        ensureReady();
        const rect = el.getBoundingClientRect();
        target = { x: lastClient.x - rect.left, y: lastClient.y - rect.top };
        start();
      };

      const handlePointerMove = (event: PointerEvent) => {
        lastClient = { x: event.clientX, y: event.clientY };
        retarget();
      };

      const handlePointerLeave = (event: PointerEvent) => {
        // The fixed navbar overlaps the hero: leaving onto it is not leaving the hero.
        const rect = el.getBoundingClientRect();
        const stillInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (stillInside) return;
        ensureReady();
        lastClient = null;
        target = getRest();
        start();
      };

      // Keeps the light under a stationary cursor while the page scrolls.
      const handleScroll = () => retarget();

      const attach = () => {
        if (attached) return;
        attached = true;
        el.addEventListener('pointermove', handlePointerMove, {
          passive: true,
        });
        el.addEventListener('pointerleave', handlePointerLeave, {
          passive: true,
        });
        window.addEventListener('scroll', handleScroll, { passive: true });
      };

      const detach = () => {
        if (!attached) return;
        attached = false;
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('scroll', handleScroll);
        lastClient = null;
        stop();
      };

      attach();

      let observer: IntersectionObserver | undefined;
      if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) attach();
          else detach();
        });
        observer.observe(el);
      }

      return () => {
        observer?.disconnect();
        detach();
      };
    };

    const pointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let teardown: (() => void) | undefined;

    const sync = () => {
      const shouldRun = pointerQuery.matches && !motionQuery.matches;
      if (shouldRun && !teardown) {
        teardown = setup();
      } else if (!shouldRun && teardown) {
        teardown();
        teardown = undefined;
      }
    };

    pointerQuery.addEventListener?.('change', sync);
    motionQuery.addEventListener?.('change', sync);
    sync();

    return () => {
      pointerQuery.removeEventListener?.('change', sync);
      motionQuery.removeEventListener?.('change', sync);
      teardown?.();
    };
  }, [ref, varsRef, ease, restX, restY]);
};
