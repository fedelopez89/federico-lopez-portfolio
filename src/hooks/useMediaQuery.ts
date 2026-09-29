import { useCallback, useState, useSyncExternalStore } from 'react';

const lists = new Map<string, MediaQueryList | undefined>();

/** One MediaQueryList per query, shared by every subscriber. */
const getList = (query: string): MediaQueryList | undefined => {
  if (!lists.has(query)) lists.set(query, window.matchMedia?.(query));
  return lists.get(query);
};

/**
 * Reactive `matchMedia`. Returns `fallback` where matchMedia is unavailable
 * (SSR, some test environments).
 */
export const useMediaQuery = (query: string, fallback = false): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = getList(query);
      media?.addEventListener?.('change', onChange);
      return () => media?.removeEventListener?.('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => getList(query)?.matches ?? fallback,
    () => fallback
  );
};

/**
 * Like useMediaQuery, but with a dead band: turns on when `enter` matches and
 * off only when `leave` matches, so a value hovering at a threshold (mobile
 * toolbars resizing the viewport) does not flicker.
 */
export const useMediaQueryHysteresis = (
  enter: string,
  leave: string
): boolean => {
  const entered = useMediaQuery(enter);
  const left = useMediaQuery(leave);
  const [active, setActive] = useState(entered);

  // Adjusting state during render (React-sanctioned) avoids a stale frame.
  if (entered && !active) setActive(true);
  else if (left && active) setActive(false);

  return active;
};
