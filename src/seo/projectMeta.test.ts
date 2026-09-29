import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { projects } from '../data/projects';
import en from '../i18n/locales/en/translation.json';
import {
  buildProjectMeta,
  projectKey,
  SITE_ORIGIN,
  truncateDescription,
  type Translate,
} from './projectMeta';

const lookup = (key: string): string | undefined => {
  const value = key
    .split('.')
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown> | undefined)?.[part],
      en
    );
  return typeof value === 'string' ? value : undefined;
};

const t: Translate = (key, options) =>
  (lookup(key) ?? options.defaultValue).replace(
    /\{\{(\w+)\}\}/g,
    (_, name: string) => String(options[name])
  );

describe('buildProjectMeta', () => {
  it.each(projects.map((p) => [p.id, p] as const))(
    'builds complete metadata for %s',
    (_id, project) => {
      const meta = buildProjectMeta(project, t, SITE_ORIGIN);

      expect(meta.title).toMatch(/\S.* \| Federico López$/);
      expect(meta.description.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeLessThanOrEqual(160);
      expect(meta.canonical).toBe(`${SITE_ORIGIN}/projects/${project.id}`);
      expect(meta.image).toMatch(/^https:\/\/federicoglopez\.dev\/images\/.+/);
      expect(meta.imageAlt).toBe(`Screenshot of ${meta.name}`);
      expect(lookup(`projects.${projectKey(project.id)}.title`)).toBeDefined();

      const imageFile = resolve(
        __dirname,
        '../../public',
        `.${meta.image.slice(SITE_ORIGIN.length)}`
      );
      expect(existsSync(imageFile)).toBe(true);
      expect(meta.image.endsWith('.jpg')).toBe(true);
    }
  );

  it('emits CreativeWork and BreadcrumbList JSON-LD with absolute URLs', () => {
    const meta = buildProjectMeta(projects[0], t, SITE_ORIGIN);
    expect(meta.jsonLd.map((entry) => entry.data['@type'])).toEqual([
      'CreativeWork',
      'BreadcrumbList',
    ]);
    const serialized = JSON.stringify(meta.jsonLd);
    expect(serialized).toContain(`${SITE_ORIGIN}/#person`);
    expect(serialized).toContain(meta.canonical);
  });

  it('falls back to the default og image when there is no screenshot', () => {
    const meta = buildProjectMeta(
      { ...projects[0], imageUrl: undefined },
      t,
      SITE_ORIGIN
    );
    expect(meta.image).toBe(`${SITE_ORIGIN}/images/og-image.png`);
    expect(meta.imageType).toBe('image/png');
  });

  it('honours a custom origin', () => {
    const meta = buildProjectMeta(projects[0], t, 'http://localhost:4173');
    expect(meta.canonical.startsWith('http://localhost:4173/')).toBe(true);
  });

  it('truncates at a word boundary with an ellipsis', () => {
    const long = 'word '.repeat(60).trim();
    const out = truncateDescription(long);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith('word…')).toBe(true);
    expect(truncateDescription('short text')).toBe('short text');
  });

  it('never ends a long description mid-word', () => {
    for (const project of projects) {
      const { description, fullDescription } = buildProjectMeta(
        project,
        t,
        SITE_ORIGIN
      );
      if (fullDescription.length > 160) {
        expect(description.endsWith('…')).toBe(true);
        const stem = description.slice(0, -1);
        expect(fullDescription.startsWith(stem)).toBe(true);
        expect(fullDescription.charAt(stem.length)).toMatch(/[\s,;:.\-–—]/);
      }
    }
  });
});
