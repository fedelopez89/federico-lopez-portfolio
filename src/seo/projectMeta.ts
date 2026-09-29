import type { Project } from '../data/projects';

export const SITE_ORIGIN = 'https://federicoglopez.dev';
export const SITE_NAME = 'Federico López';
export const FALLBACK_OG_IMAGE = '/images/og-image.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const DESCRIPTION_MAX_LENGTH = 160;

export const JSONLD_ID = 'project-jsonld';
export const BREADCRUMB_JSONLD_ID = 'project-breadcrumb-jsonld';

/** Minimal translate signature shared by i18next's `t` and the build script. */
export type Translate = (
  key: string,
  options: { defaultValue: string; [option: string]: unknown }
) => string;

export interface ProjectMeta {
  /** Project name (translated), without the site suffix. */
  name: string;
  /** Full untruncated description (translated). */
  fullDescription: string;
  /** Document title: `<name> | <site>`. */
  title: string;
  /** Description truncated for meta tags. */
  description: string;
  canonical: string;
  image: string;
  imageType: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  jsonLd: { id: string; data: Record<string, unknown> }[];
}

/**
 * Shortens text to `max` characters at a word boundary with an ellipsis, so
 * meta descriptions never end mid-word.
 */
export function truncateDescription(
  text: string,
  max = DESCRIPTION_MAX_LENGTH
) {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const room = clean.slice(0, max - 1);
  const lastSpace = room.lastIndexOf(' ');
  const cut = lastSpace > max / 2 ? room.slice(0, lastSpace) : room;
  return `${cut.replace(/[\s,;:.\-–—]+$/, '')}…`;
}

/** Translation key segment for a project id (`real-evals-uber` -> `realevalsuber`). */
export const projectKey = (id: string) => id.replace(/-/g, '');

/** Translated name and description of a project, falling back to the data file. */
export function translateProject(project: Project, t: Translate) {
  return {
    name: t(`projects.${projectKey(project.id)}.title`, {
      defaultValue: project.title,
    }),
    description: t(`projects.${projectKey(project.id)}.description`, {
      defaultValue: project.description,
    }),
  };
}

/** Absolute URL of the JPG social image generated for a project. */
export function ogImagePath(project: Project) {
  return project.imageUrl ? `/images/og/${project.id}.jpg` : FALLBACK_OG_IMAGE;
}

/**
 * Single source of truth for a project page's SEO metadata. Used at runtime by
 * `useProjectSeo` and at build time by `scripts/prerender-heads.mjs`.
 */
export function buildProjectMeta(
  project: Project,
  t: Translate,
  origin: string = SITE_ORIGIN
): ProjectMeta {
  const { name, description: fullDescription } = translateProject(project, t);
  const canonical = `${origin}/projects/${project.id}`;
  const imagePath = ogImagePath(project);
  const image = `${origin}${imagePath}`;

  const jsonLd: ProjectMeta['jsonLd'] = [
    {
      id: JSONLD_ID,
      data: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${canonical}#work`,
        mainEntityOfPage: canonical,
        name,
        description: fullDescription,
        author: { '@id': `${origin}/#person` },
        keywords: project.technologies.join(', '),
        ...(project.demoUrl && { url: project.demoUrl }),
        ...(project.imageUrl && {
          image: { '@type': 'ImageObject', url: image },
        }),
      },
    },
    {
      id: BREADCRUMB_JSONLD_ID,
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${origin}/#projects`,
          },
          { '@type': 'ListItem', position: 3, name, item: canonical },
        ],
      },
    },
  ];

  return {
    name,
    fullDescription,
    title: `${name} | ${SITE_NAME}`,
    description: truncateDescription(fullDescription),
    canonical,
    image,
    imageType: imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
    imageWidth: OG_IMAGE_WIDTH,
    imageHeight: OG_IMAGE_HEIGHT,
    imageAlt: t('projects.imageAlt', {
      title: name,
      defaultValue: `Screenshot of ${name}`,
    }),
    jsonLd,
  };
}
