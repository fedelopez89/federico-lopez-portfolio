import { useEffect } from 'react';
import { sectionTitleId } from '@/components/Sections/shared/sectionTitleId';

/**
 * Deep links (/#projects) load before React has rendered the target, so the
 * browser's own hash scroll finds nothing. Resolve it once after mount,
 * instantly, honoring the target's scroll-margin-top. Web fonts can shift
 * layout afterwards, so it re-aligns once fonts are ready, but only if the
 * user has not scrolled in the meantime.
 *
 * Once aligned, focus moves to the section heading (as a native fragment
 * navigation would), so keyboard and screen reader users land where the page
 * scrolled, on deep links and on client-side navigation from another route.
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
      document.getElementById(id)?.scrollIntoView?.({
        behavior: 'instant' as ScrollBehavior,
        block: 'start',
      });
      settledY = window.scrollY;
    };

    const focusHeading = () => {
      const heading = document.getElementById(sectionTitleId(id));
      if (!heading) return;
      if (!heading.hasAttribute('tabindex')) {
        heading.setAttribute('tabindex', '-1');
      }
      heading.style.outline = 'none';
      heading.focus({ preventScroll: true });
    };

    const frame = requestAnimationFrame(() => {
      align();
      focusHeading();
    });

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
