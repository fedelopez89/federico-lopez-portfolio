import { useEffect } from 'react';
import {
  findProjectLink,
  isViewTransitionActive,
  markSharedElements,
  projectCardShared,
  signalViewTransitionReady,
} from '../utils/viewTransition';

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

/** Frames to let content-visibility estimates settle; timer covers paused rAF. */
const SETTLE_FALLBACK_MS = 120;
const MAX_RESCROLLS = 2;

/**
 * While a view transition waits for this page, bring the returning card into
 * view once layout has settled (off-screen sections use content-visibility
 * estimates that change after the first render), name it, then signal ready.
 */
const settleForTransition = (id: string | null) => {
  let done = false;
  const frames: number[] = [];

  const settle = () => {
    if (done) return;
    done = true;
    const card = id ? findProjectLink(id) : undefined;
    if (id && card) {
      const scroll = () =>
        card.scrollIntoView?.({
          behavior: 'instant' as ScrollBehavior,
          block: 'center',
        });
      scroll();
      // Force layout; if the card moved once the section rendered, re-scroll.
      for (let i = 0; i < MAX_RESCROLLS; i++) {
        const before = card.getBoundingClientRect().top;
        scroll();
        if (card.getBoundingClientRect().top === before) break;
      }
      markSharedElements(projectCardShared(card, id));
    }
    signalViewTransitionReady();
  };

  frames.push(
    requestAnimationFrame(() => {
      frames.push(requestAnimationFrame(settle));
    })
  );
  const timer = setTimeout(settle, SETTLE_FALLBACK_MS);

  return () => {
    frames.forEach(cancelAnimationFrame);
    clearTimeout(timer);
  };
};

export const useRestoreProjectFocus = () => {
  useEffect(() => {
    const id = pendingProjectReturn();

    // Returning through a view transition: bring the card into view and name
    // it now, before the new snapshot, so the project page morphs back into it.
    const cancelTransitionWork = isViewTransitionActive()
      ? settleForTransition(id)
      : undefined;

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
      const link = findProjectLink(id);
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

    return () => {
      cancelAnimationFrame(frame);
      cancelTransitionWork?.();
    };
  }, []);
};
