import i18n from 'i18next';
import { projects } from '../data/projects';

const PROJECT_PATH = /^\/projects\/([^/]+)\/?$/;

/**
 * Title of the page a path renders, without waiting for the lazy route.
 * Only an exact /projects/:id path yields a project (or project-not-found)
 * title; every other unknown path is the site-wide 404.
 */
export const titleForPath = (pathname: string): string => {
  const author = 'Federico López';
  const id = pathname.match(PROJECT_PATH)?.[1];
  if (id !== undefined) {
    const project = projects.find((p) => p.id === id);
    return project
      ? `${project.title} | ${author}`
      : `${i18n.t('projectDetail.notFoundTitle')} | ${author}`;
  }
  if (pathname === '/') return i18n.t('meta.homeTitle');
  return `${i18n.t('notFound.title')} | ${author}`;
};
