import { useEffect } from 'react';

/**
 * Deep links (/#projects) load before React has rendered the target, so the
 * browser's own hash scroll finds nothing. Resolve it once after mount,
 * instantly, honoring the target's scroll-margin-top. Web fonts can shift
 * layout afterwards, so it re-aligns once fonts are ready, but only if the
 * user has not scrolled in the meantime.
 */
export const useHashScroll = () => {
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    if (!raw) return;

    let id = raw;
    try {
      id = decodeURIComponent(raw);
    } catch {
      // Malformed escape sequence: fall back to the raw value.
    }

    let cancelled = false;
    let settledY: number | null = null;

    const align = () => {
      document
        .getElementById(id)
        ?.scrollIntoView?.({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
      settledY = window.scrollY;
    };

    const frame = requestAnimationFrame(align);

    document.fonts?.ready.then(() => {
      if (cancelled || settledY === null) return;
      if (Math.abs(window.scrollY - settledY) <= 2) align();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);
};
