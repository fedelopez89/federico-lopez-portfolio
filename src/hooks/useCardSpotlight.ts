import { useEffect, type RefObject } from 'react';

const CARD_SELECTOR = '[data-spot-card]';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
/** Longer than the spotlight's opacity fade-out, so the glow does not snap to centre while fading. */
const RELEASE_DELAY_MS = 500;

/**
 * One delegated `pointermove` listener on a container drives the card
 * spotlight. Per frame (rAF-throttled) it writes `--spot-x` / `--spot-y` on
 * the hovered card only: the pointer's offset from the card's centre, so a
 * card without the vars (keyboard focus) is centred by CSS. No React state.
 * A card's vars are released only after the fade-out finishes. Inactive on touch and under reduced motion (re-evaluated on change).
 */
export const useCardSpotlight = <T extends HTMLElement>(
  ref: RefObject<T | null>
): void => {
  useEffect(() => {
    const container = ref.current;
    if (!container || typeof window.matchMedia !== 'function') return;

    const pointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const setup = (): (() => void) => {
      let card: HTMLElement | null = null;
      let frame = 0;
      let x = 0;
      let y = 0;

      const releaseTimers = new Map<HTMLElement, number>();

      const clear = (el: HTMLElement) => {
        el.style.removeProperty('--spot-x');
        el.style.removeProperty('--spot-y');
      };

      const release = (el: HTMLElement | null) => {
        if (!el || releaseTimers.has(el)) return;
        releaseTimers.set(
          el,
          window.setTimeout(() => {
            releaseTimers.delete(el);
            clear(el);
          }, RELEASE_DELAY_MS)
        );
      };

      const hold = (el: HTMLElement) => {
        const timer = releaseTimers.get(el);
        if (timer === undefined) return;
        window.clearTimeout(timer);
        releaseTimers.delete(el);
      };

      const write = () => {
        frame = 0;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          '--spot-x',
          `${(x - rect.left - rect.width / 2).toFixed(1)}px`
        );
        card.style.setProperty(
          '--spot-y',
          `${(y - rect.top - rect.height / 2).toFixed(1)}px`
        );
      };

      const handleMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        const next =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>(CARD_SELECTOR)
            : null;
        if (next !== card) {
          release(card);
          card = next;
        }
        if (!card) return;
        hold(card);
        x = event.clientX;
        y = event.clientY;
        if (!frame) frame = requestAnimationFrame(write);
      };

      const stop = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        release(card);
        card = null;
      };

      container.addEventListener('pointermove', handleMove, { passive: true });
      container.addEventListener('pointerleave', stop, { passive: true });

      return () => {
        container.removeEventListener('pointermove', handleMove);
        container.removeEventListener('pointerleave', stop);
        stop();
        releaseTimers.forEach((timer, el) => {
          window.clearTimeout(timer);
          clear(el);
        });
        releaseTimers.clear();
      };
    };

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
  }, [ref]);
};
