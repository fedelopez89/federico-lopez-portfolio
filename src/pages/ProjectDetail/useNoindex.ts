import { useEffect } from 'react';

/**
 * Marks the page as noindex while `active` is true (e.g. a not-found state
 * served with HTTP 200 by the SPA rewrite), then restores the previous
 * robots meta.
 */
export function useNoindex(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const existing = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]'
    );
    if (existing) {
      const previous = existing.getAttribute('content') ?? '';
      existing.setAttribute('content', 'noindex');
      return () => existing.setAttribute('content', previous);
    }

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [active]);
}
