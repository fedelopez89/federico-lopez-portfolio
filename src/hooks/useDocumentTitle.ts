import { useEffect } from 'react';

/**
 * Sets the document title while the calling route is mounted (WCAG 2.4.2).
 * Pass undefined to leave the title to another owner (e.g. useProjectSeo).
 */
export const useDocumentTitle = (title: string | undefined) => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
};
