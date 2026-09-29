import { describe, it, expect, beforeAll } from 'vitest';
import '../i18n/config';
import { projects } from '../data/projects';
import { titleForPath } from './pageTitle';

describe('titleForPath', () => {
  beforeAll(async () => {
    const i18n = (await import('../i18n/config')).default;
    await i18n.changeLanguage('en');
  });

  it('returns the home title for /', () => {
    expect(titleForPath('/')).toBe(
      'Federico López — Senior Frontend Engineer (React)'
    );
  });

  it('returns the project title for an exact project path, with or without a trailing slash', () => {
    const p = projects[0];
    expect(titleForPath(`/projects/${p.id}`)).toBe(
      `${p.title} | Federico López`
    );
    expect(titleForPath(`/projects/${p.id}/`)).toBe(
      `${p.title} | Federico López`
    );
  });

  it('returns the project not-found title for an unknown project id', () => {
    expect(titleForPath('/projects/nope')).toBe(
      'Project not found | Federico López'
    );
  });

  it.each([
    '/projects/',
    '/projects',
    `/projects/${projects[0].id}/x`,
    '/projects/x/y',
    '/whatever',
  ])('returns the site 404 title for %s', (path) => {
    expect(titleForPath(path)).toBe('Page not found | Federico López');
  });
});
