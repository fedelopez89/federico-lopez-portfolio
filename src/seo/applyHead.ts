import { HOME_META } from './homeMeta';
import type { ProjectMeta } from './projectMeta';

/** Head values a route applies on mount; every route sets all of them. */
export interface HeadValues {
  canonical: string;
  description: string;
  socialTitle: string;
  image: string;
  imageType: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

export const homeHead = (
  canonical: string = HOME_META.canonical
): HeadValues => ({
  ...HOME_META,
  canonical,
});

export const projectHead = (meta: ProjectMeta): HeadValues => ({
  canonical: meta.canonical,
  description: meta.description,
  socialTitle: meta.title,
  image: meta.image,
  imageType: meta.imageType,
  imageWidth: meta.imageWidth,
  imageHeight: meta.imageHeight,
  imageAlt: meta.imageAlt,
});

/** Writes head values into the live document. Missing tags are skipped. */
export function applyHead(head: HeadValues) {
  const tags: [string, string][] = [
    ['meta[name="description"]', head.description],
    ['meta[property="og:title"]', head.socialTitle],
    ['meta[property="og:description"]', head.description],
    ['meta[property="og:url"]', head.canonical],
    ['meta[property="og:image"]', head.image],
    ['meta[property="og:image:width"]', String(head.imageWidth)],
    ['meta[property="og:image:height"]', String(head.imageHeight)],
    ['meta[property="og:image:type"]', head.imageType],
    ['meta[property="og:image:alt"]', head.imageAlt],
    ['meta[name="twitter:title"]', head.socialTitle],
    ['meta[name="twitter:description"]', head.description],
    ['meta[name="twitter:url"]', head.canonical],
    ['meta[name="twitter:image"]', head.image],
    ['meta[name="twitter:image:alt"]', head.imageAlt],
  ];
  for (const [selector, value] of tags) {
    document.querySelector(selector)?.setAttribute('content', value);
  }
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute('href', head.canonical);
}
