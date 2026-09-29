import { useEffect } from 'react';
import { applyHead, homeHead } from './applyHead';

/** Applies the home head (translated title + English social tags). */
export function useHomeSeo(title: string) {
  useEffect(() => {
    document.title = title;
    applyHead(homeHead());
  }, [title]);
}
