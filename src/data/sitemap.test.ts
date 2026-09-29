import { describe, it, expect } from 'vitest';
import { projects } from './projects';
import {
  extractProjectIds,
  buildSitemap,
  escapeXml,
} from '../../scripts/generate-sitemap.mjs';
import projectsSource from './projects.ts?raw';

describe('sitemap generation', () => {
  it('extracts every project id from projects.ts, in order', () => {
    expect(extractProjectIds(projectsSource)).toEqual(
      projects.map((p) => p.id)
    );
  });

  it('ignores duplicates and non-id fields', () => {
    const src = "  id: 'a',\n  title: 'id: b,',\n  id: \"c\",\n  id: 'a',\n";
    expect(extractProjectIds(src)).toEqual(['a', 'c']);
  });

  it('builds a urlset with the home page and each project', () => {
    const xml = buildSitemap(['a', 'b']);
    expect(xml).toContain('<loc>https://federicoglopez.dev/</loc>');
    expect(xml).toContain('<loc>https://federicoglopez.dev/projects/a</loc>');
    expect(xml).toContain('<loc>https://federicoglopez.dev/projects/b</loc>');
    expect(xml).not.toContain('<lastmod>');
    expect(xml).not.toContain('<changefreq>');
    expect(xml).not.toContain('<priority>');
  });

  it('escapes XML special characters in URLs', () => {
    expect(escapeXml(`a&b<c>"d"'e'`)).toBe(
      'a&amp;b&lt;c&gt;&quot;d&quot;&apos;e&apos;'
    );
    expect(buildSitemap(['a&b'])).toContain('/projects/a&amp;b</loc>');
  });
});
