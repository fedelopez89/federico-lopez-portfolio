import { useEffect } from 'react';

const RETURN_KEY = 'portfolio:return-project';
/** A marker older than this belongs to an earlier visit, not to a back navigation. */
const MAX_AGE_MS = 30_000;
/** Section the returning card lives in; the scroll spy may leave its hash in the URL. */
const RETURN_HASH = '#projects';

interface Marker {
  id: string;
  ts: number;
}

// Only SPA navigations (Back button, browser back) may use a marker: a fresh
// full-page load starts clean.
try {
  sessionStorage.removeItem(RETURN_KEY);
} catch {
  // Storage blocked: nothing to clear.
}

/**
 * A project page records which card it was opened from (and refreshes the
 * timestamp when it unmounts). The home route reads it on the way back,
 * whether the user pressed the Back button or the browser's back (both are
 * POP navigations to an entry that cannot carry that state itself), and puts
 * focus on that card again (WCAG 2.4.3).
 */
export const rememberProject = (id: string) => {
  try {
    const marker: Marker = { id, ts: Date.now() };
    sessionStorage.setItem(RETURN_KEY, JSON.stringify(marker));
  } catch {
    // Storage blocked: focus falls back to the main landmark.
  }
};

const forgetProject = () => {
  try {
    sessionStorage.removeItem(RETURN_KEY);
  } catch {
    // Nothing to clear.
  }
};

const readProject = (): string | null => {
  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return null;
    const marker = JSON.parse(raw) as Partial<Marker>;
    if (
      typeof marker.id !== 'string' ||
      typeof marker.ts !== 'number' ||
      Date.now() - marker.ts > MAX_AGE_MS
    ) {
      forgetProject();
      return null;
    }
    return marker.id;
  } catch {
    return null;
  }
};

/**
 * The card to restore focus to, if a valid marker exists and the URL hash is
 * empty or the projects section (the scroll spy writes that one while the
 * user browses cards). Other hashes are deliberate navigation elsewhere.
 */
export const pendingProjectReturn = (): string | null => {
  const id = readProject();
  if (!id) return null;
  const { hash } = window.location;
  return hash === '' || hash === RETURN_HASH ? id : null;
};

export const useRestoreProjectFocus = () => {
  useEffect(() => {
    const id = pendingProjectReturn();
    if (!id) {
      // Unrelated deep link: the marker is stale for this visit.
      forgetProject();
      return;
    }

    // Read without clearing here: a StrictMode remount re-runs this effect.
    // Runs after useHashScroll's frame (which stands down while a return is
    // pending), so the card wins over the section heading.
    const frame = requestAnimationFrame(() => {
      forgetProject();
      const link = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]')
      ).find((a) => a.getAttribute('href') === `/projects/${id}`);
      if (link) {
        link.scrollIntoView?.({
          behavior: 'instant' as ScrollBehavior,
          block: 'center',
        });
        link.focus({ preventScroll: true });
      } else {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);
};
