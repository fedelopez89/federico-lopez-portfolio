import { useEffect } from 'react';
import type { Project } from '../../data/projects';

/**
 * Applies project-specific title, meta tags, canonical and JSON-LD while the
 * page is mounted, and restores the originals on unmount.
 */
export function useProjectSeo(
  project: Project | undefined,
  translatedTitle: string,
  translatedDesc: string
) {
  useEffect(() => {
    if (!project) return;

    const BASE_URL = 'https://federicoglopez.dev';
    const projectUrl = `${BASE_URL}/projects/${project.id}`;
    const imageUrl = project.imageUrl
      ? `${BASE_URL}${project.imageUrl.startsWith('/') ? '' : '/'}${project.imageUrl}`
      : `${BASE_URL}/images/og-image.png`;
    const shortDesc = translatedDesc.slice(0, 160);

    const getMeta = (sel: string) =>
      document.querySelector(sel)?.getAttribute('content') ?? '';
    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val);

    // ── Store originals ────────────────────────────────────────────
    const orig = {
      title: document.title,
      desc: getMeta('meta[name="description"]'),
      ogTitle: getMeta('meta[property="og:title"]'),
      ogDesc: getMeta('meta[property="og:description"]'),
      ogUrl: getMeta('meta[property="og:url"]'),
      ogImage: getMeta('meta[property="og:image"]'),
      twTitle: getMeta('meta[property="twitter:title"]'),
      twDesc: getMeta('meta[property="twitter:description"]'),
      twUrl: getMeta('meta[property="twitter:url"]'),
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute('href') ??
        '',
    };

    // ── Apply project-specific meta ────────────────────────────────
    const pageTitle = `${translatedTitle} | Federico López`;
    document.title = pageTitle;
    setMeta('meta[name="description"]', shortDesc);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', shortDesc);
    setMeta('meta[property="og:url"]', projectUrl);
    setMeta('meta[property="og:image"]', imageUrl);
    setMeta('meta[property="twitter:title"]', pageTitle);
    setMeta('meta[property="twitter:description"]', shortDesc);
    setMeta('meta[property="twitter:url"]', projectUrl);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', projectUrl);

    // ── Inject project JSON-LD ─────────────────────────────────────
    const JSONLD_ID = 'project-jsonld';
    document.getElementById(JSONLD_ID)?.remove();
    const script = document.createElement('script');
    script.id = JSONLD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': projectUrl,
      name: translatedTitle,
      description: translatedDesc,
      url: projectUrl,
      applicationCategory: 'WebApplication',
      author: { '@id': `${BASE_URL}/#person` },
      keywords: project.technologies.join(', '),
      ...(project.demoUrl && { sameAs: project.demoUrl }),
      ...(project.imageUrl && {
        image: { '@type': 'ImageObject', url: imageUrl },
      }),
    });
    document.head.appendChild(script);

    // ── Restore on unmount ─────────────────────────────────────────
    return () => {
      document.title = orig.title;
      setMeta('meta[name="description"]', orig.desc);
      setMeta('meta[property="og:title"]', orig.ogTitle);
      setMeta('meta[property="og:description"]', orig.ogDesc);
      setMeta('meta[property="og:url"]', orig.ogUrl);
      setMeta('meta[property="og:image"]', orig.ogImage);
      setMeta('meta[property="twitter:title"]', orig.twTitle);
      setMeta('meta[property="twitter:description"]', orig.twDesc);
      setMeta('meta[property="twitter:url"]', orig.twUrl);
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute('href', orig.canonical);
      document.getElementById(JSONLD_ID)?.remove();
    };
  }, [project, translatedTitle, translatedDesc]);
}
