import { useEffect, type RefObject } from 'react';

const CARD_SELECTOR = '[data-spot-card]';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * One delegated `pointermove` listener on a container drives the card
 * spotlight. Per frame (rAF-throttled) it writes `--spot-x` / `--spot-y` on
 * the hovered card only: the pointer's offset from the card's centre, so a
 * card without the vars (keyboard focus) is centred by CSS. No React state.
 * Inactive on touch and under reduced motion (re-evaluated on change).
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

      const clear = (el: HTMLElement | null) => {
        el?.style.removeProperty('--spot-x');
        el?.style.removeProperty('--spot-y');
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
          clear(card);
          card = next;
        }
        if (!card) return;
        x = event.clientX;
        y = event.clientY;
        if (!frame) frame = requestAnimationFrame(write);
      };

      const stop = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        clear(card);
        card = null;
      };

      container.addEventListener('pointermove', handleMove, { passive: true });
      container.addEventListener('pointerleave', stop, { passive: true });

      return () => {
        container.removeEventListener('pointermove', handleMove);
        container.removeEventListener('pointerleave', stop);
        stop();
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
