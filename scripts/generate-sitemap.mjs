// Generates dist/sitemap.xml at build time. Plain Node, no dependencies.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE_URL = 'https://federicoglopez.dev';

/** Extracts project ids (`id: '...'` fields) from the source of projects.ts. */
export function extractProjectIds(source) {
  const ids = [];
  for (const match of source.matchAll(/^\s*id:\s*(['"`])([^'"`\n]+)\1\s*,/gm)) {
    if (!ids.includes(match[2])) ids.push(match[2]);
  }
  return ids;
}

/** Escapes the characters that are not allowed raw in XML text nodes. */
export function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Builds the sitemap XML for the home page and each project page. */
export function buildSitemap(ids) {
  const entry = (path) =>
    `  <url>\n    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>\n  </url>`;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entry('/'),
    ...ids.map((id) => entry(`/projects/${id}`)),
    '</urlset>',
    '',
  ].join('\n');
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const source = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8');
  const ids = extractProjectIds(source);
  if (ids.length === 0) {
    throw new Error('generate-sitemap: no project ids found in projects.ts');
  }
  const outFile = resolve(root, 'dist/sitemap.xml');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, buildSitemap(ids));
  console.log(`sitemap.xml: ${ids.length + 1} URLs written to dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
