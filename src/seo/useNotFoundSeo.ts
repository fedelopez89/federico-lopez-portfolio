import { useEffect } from 'react';
import { applyHead, homeHead } from './applyHead';

/**
 * Head for pages that don't exist: generic site values with the canonical set
 * to the requested URL, so a previous project's canonical never lingers.
 * Callers also mark the page noindex.
 */
export function useNotFoundSeo(active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    applyHead(homeHead(`${window.location.origin}${window.location.pathname}`));
  }, [active]);
}
