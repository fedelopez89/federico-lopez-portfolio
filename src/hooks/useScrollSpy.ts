import { useEffect, useRef, useState } from 'react';

interface UseScrollSpyOptions {
  /** Section ids in document order. */
  sectionIds: string[];
  /** Height of the fixed navbar; the activation line sits below it. */
  offset?: number;
}

/** Fraction of the visible area (below the navbar) at which a section activates. */
const ACTIVATION_RATIO = 0.4;

/** Quiet time after an anchor jump before the spy resumes control of the URL. */
const SETTLE_MS = 150;

interface PickInput {
  /** Section ids paired with their current viewport-relative top, in document order. */
  sections: { id: string; top: number }[];
  /** Viewport-relative y of the activation line. */
  line: number;
  atBottom: boolean;
  /** Section the URL already points at and that is on screen; wins at the bottom. */
  preferred?: string;
}

/**
 * The active section is the last one whose top has crossed the activation
 * line. At the very bottom of the page the last section wins, so short
 * trailing sections can still become active, unless the URL already points
 * at a visible section (the user just jumped there).
 */
export const pickActiveSection = ({
  sections,
  line,
  atBottom,
  preferred,
}: PickInput): string => {
  if (sections.length === 0) return '';
  if (atBottom) {
    return preferred && sections.some((s) => s.id === preferred)
      ? preferred
      : sections[sections.length - 1].id;
  }

  let active = '';
  for (const { id, top } of sections) {
    if (top <= line) active = id;
  }
  return active;
};

const syncUrl = (id: string) => {
  const nextHash = id === 'home' ? '' : `#${id}`;
  if (window.location.hash === nextHash) return;
  // Keep history.state so React Router's bookkeeping survives.
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}${nextHash}`
  );
};

const currentHashId = (): string => {
  const raw = window.location.hash.slice(1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

export const useScrollSpy = ({
  sectionIds,
  offset = 92,
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState('');
  const activeRef = useRef('');
  // Stable dependency even when callers pass a fresh array every render.
  const idsKey = sectionIds.join('|');

  useEffect(() => {
    const ids = idsKey.split('|').filter(Boolean);
    let frame = 0;
    let isFirstRun = true;
    let suppressed = false;
    let settleTimer = 0;

    const update = (force = false) => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const root = document.documentElement;
      const sections = ids.flatMap((id) => {
        const el = document.getElementById(id);
        return el ? [{ id, top: el.getBoundingClientRect().top }] : [];
      });
      const canScroll = root.scrollHeight > viewportHeight + 2;
      const atBottom =
        canScroll && window.scrollY + viewportHeight >= root.scrollHeight - 2;

      const hashId = currentHashId();
      const hashSection = sections.find((s) => s.id === hashId);
      const hashEl = hashSection ? document.getElementById(hashId) : null;
      const preferred =
        hashSection &&
        hashEl &&
        hashSection.top < viewportHeight &&
        hashSection.top + hashEl.offsetHeight > 0
          ? hashId
          : undefined;

      const next = pickActiveSection({
        sections,
        line: offset + (viewportHeight - offset) * ACTIVATION_RATIO,
        atBottom,
        preferred,
      });

      if (!next) return;
      const changed = next !== activeRef.current;
      if (changed) {
        activeRef.current = next;
        setActiveSection(next);
      }
      // The first run happens before a deep link (/#projects) is scrolled to;
      // rewriting the URL then would erase the hash being resolved.
      if (!isFirstRun && (changed || force)) syncUrl(next);
    };

    // After an anchor jump, stay out of the way until scrolling settles so the
    // spy does not overwrite the hash the user just navigated to.
    const suppress = () => {
      suppressed = true;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        suppressed = false;
        update(true);
      }, SETTLE_MS);
    };

    const onScroll = () => {
      if (suppressed) suppress();
      else if (!frame) frame = requestAnimationFrame(() => update());
    };

    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href^="#"]')) suppress();
    };

    update();
    isFirstRun = false;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', suppress);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', suppress);
      window.clearTimeout(settleTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [idsKey, offset]);

  return activeSection;
};
