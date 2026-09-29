import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../data/projects';
import { applyHead, projectHead } from '../../seo/applyHead';
import {
  buildProjectMeta,
  BREADCRUMB_JSONLD_ID,
  JSONLD_ID,
  type Translate,
} from '../../seo/projectMeta';

export { BREADCRUMB_JSONLD_ID, JSONLD_ID };

/**
 * Applies project-specific title, meta tags, canonical and JSON-LD while the
 * page is mounted and removes the JSON-LD on unmount.
 */
export function useProjectSeo(project: Project | undefined) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    if (!project) return;

    const meta = buildProjectMeta(project, t as unknown as Translate);
    document.title = meta.title;
    applyHead(projectHead(meta));

    for (const { id, data } of meta.jsonLd) {
      document.getElementById(id)?.remove();
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }

    // The next route (Home, another project, 404) applies its own head, so
    // nothing is restored from the DOM: after a prerendered deep link the DOM
    // holds this project's values, not the home page's.
    return () => {
      for (const { id } of meta.jsonLd) document.getElementById(id)?.remove();
    };
    // `language` re-runs the effect when the translations change.
  }, [project, t, language]);
}
