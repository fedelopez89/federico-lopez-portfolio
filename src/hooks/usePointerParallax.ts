import { useEffect, type RefObject } from 'react';

interface PointerParallaxOptions {
  /** Fraction of the distance covered per frame (0-1). */
  ease?: number;
}

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SETTLE_THRESHOLD = 0.001;
const FRAME_MS = 1000 / 60;

/**
 * Drives `--px`, `--py` (normalized pointer position, -1..1 across the
 * viewport) and `--m` (0..1 distance from the centre) on `targetRef`, eased
 * with a rAF loop that stops once settled. Styles are written directly (no
 * React state). Listens on `hostRef`, so the target itself can stay
 * `pointer-events: none`. Inactive without a fine pointer, with reduced
 * motion, or while `enabled` is false; re-evaluated when either media query
 * changes. On pointer leave the values ease back to rest.
 */
export const usePointerParallax = <T extends HTMLElement>(
  hostRef: RefObject<T | null>,
  targetRef: RefObject<HTMLElement | null>,
  enabled = true,
  { ease = 0.1 }: PointerParallaxOptions = {}
): void => {
  useEffect(() => {
    const host = hostRef.current;
    const target = targetRef.current;
    if (
      !enabled ||
      !host ||
      !target ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const setup = (): (() => void) => {
      let frame = 0;
      let cx = 0;
      let cy = 0;
      let tx = 0;
      let ty = 0;

      const write = () => {
        target.style.setProperty('--px', cx.toFixed(3));
        target.style.setProperty('--py', cy.toFixed(3));
        target.style.setProperty(
          '--m',
          Math.min(1, Math.hypot(cx, cy)).toFixed(3)
        );
      };

      let last = 0;

      const tick = (now: number) => {
        // Frame-rate independent: `ease` is the fraction covered per 60Hz frame.
        const dt = last ? Math.min(now - last, 64) : FRAME_MS;
        last = now;
        const k = 1 - Math.pow(1 - ease, dt / FRAME_MS);
        const dx = tx - cx;
        const dy = ty - cy;
        if (
          Math.abs(dx) < SETTLE_THRESHOLD &&
          Math.abs(dy) < SETTLE_THRESHOLD
        ) {
          cx = tx;
          cy = ty;
          write();
          frame = 0;
          last = 0;
          return;
        }
        cx += dx * k;
        cy += dy * k;
        write();
        frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (!frame) frame = requestAnimationFrame(tick);
      };

      const clamp = (v: number) => Math.max(-1, Math.min(1, v));

      const handleMove = (event: PointerEvent) => {
        tx = clamp((event.clientX / window.innerWidth) * 2 - 1);
        ty = clamp((event.clientY / window.innerHeight) * 2 - 1);
        start();
      };

      const handleLeave = (event: PointerEvent) => {
        // The fixed navbar overlaps the hero: leaving onto it is not leaving.
        const rect = host.getBoundingClientRect();
        const stillInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (stillInside) return;
        tx = 0;
        ty = 0;
        start();
      };

      // Leaving the window (for instance through the fixed navbar) does not
      // always fire pointerleave on the host, so the root resets as well.
      const handleWindowLeave = () => {
        tx = 0;
        ty = 0;
        start();
      };

      host.addEventListener('pointermove', handleMove, { passive: true });
      host.addEventListener('pointerleave', handleLeave, { passive: true });
      document.documentElement.addEventListener(
        'pointerleave',
        handleWindowLeave,
        { passive: true }
      );

      return () => {
        host.removeEventListener('pointermove', handleMove);
        host.removeEventListener('pointerleave', handleLeave);
        document.documentElement.removeEventListener(
          'pointerleave',
          handleWindowLeave
        );
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        target.style.removeProperty('--px');
        target.style.removeProperty('--py');
        target.style.removeProperty('--m');
      };
    };

    const pointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let teardown: (() => void) | undefined;

    const sync = () => {
      const shouldRun = pointerQuery.matches && !motionQuery.matches;
      if (shouldRun && !teardown) teardown = setup();
      else if (!shouldRun && teardown) {
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
  }, [hostRef, targetRef, enabled, ease]);
};
