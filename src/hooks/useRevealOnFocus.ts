import { useCallback, useState } from 'react';

/**
 * Keyboard safety net for in-view reveal animations (WCAG 2.4.7 / 2.4.11).
 * A focusable child can receive focus while its reveal is still 'hidden'
 * (opacity 0). Spread `reveal(key)` on the motion element that owns the
 * variants: once focus lands anywhere inside it, it animates to 'visible'
 * and stays there. Use a distinct key per element when one hook serves
 * several (e.g. list items); omit it for a single element.
 */
export const useRevealOnFocus = () => {
  const [revealed, setRevealed] = useState<ReadonlySet<string>>(new Set());

  const reveal = useCallback(
    (key = '') =>
      ({
        onFocusCapture: () =>
          setRevealed((prev) =>
            prev.has(key) ? prev : new Set(prev).add(key)
          ),
        ...(revealed.has(key) && { animate: 'visible' }),
      }) as { onFocusCapture: () => void; animate?: 'visible' },
    [revealed]
  );

  return reveal;
};
