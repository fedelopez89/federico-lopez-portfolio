// Writes dist/projects/<id>.html for every project, with the head
// rewritten for link unfurlers (which don't run JS), and adds a <noscript>
// fallback to dist/index.html. Runs after `vite build`. No new dependencies:
// the TS sources are loaded through the already-installed Vite.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import {
  addHomeNoscript,
  renderNoscript,
  rewriteProjectHead,
} from './head-rewrite.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** English `t` backed by the locale JSON, matching i18next's lookup + interpolation. */
function createEnglishTranslate(translations) {
  return (key, options = {}) => {
    const value = key
      .split('.')
      .reduce((node, part) => (node == null ? node : node[part]), translations);
    const template = typeof value === 'string' ? value : options.defaultValue;
    return String(template).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) =>
      String(options[name] ?? '')
    );
  };
}

async function main() {
  const distIndex = resolve(root, 'dist/index.html');
  if (!existsSync(distIndex)) {
    throw new Error(
      'prerender-heads: dist/index.html not found, run vite build first'
    );
  }
  const template = readFileSync(distIndex, 'utf8');
  const en = JSON.parse(
    readFileSync(resolve(root, 'src/i18n/locales/en/translation.json'), 'utf8')
  );
  const t = createEnglishTranslate(en);

  const server = await createServer({
    root,
    // Not loading vite.config.ts (it pulls in the bundle visualizer), so the
    // path aliases are mirrored here to keep `@/...` imports resolvable.
    configFile: false,
    resolve: {
      alias: {
        '@components': resolve(root, 'src/components'),
        '@hooks': resolve(root, 'src/hooks'),
        '@utils': resolve(root, 'src/utils'),
        '@types': resolve(root, 'src/types'),
        '@data': resolve(root, 'src/data'),
        '@assets': resolve(root, 'src/assets'),
        '@': resolve(root, 'src'),
      },
    },
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  let projects;
  let buildProjectMeta;
  let SITE_ORIGIN;
  try {
    ({ projects } = await server.ssrLoadModule('/src/data/projects.ts'));
    ({ buildProjectMeta, SITE_ORIGIN } = await server.ssrLoadModule(
      '/src/seo/projectMeta.ts'
    ));
  } finally {
    await server.close();
  }
  if (!projects?.length) throw new Error('prerender-heads: no projects loaded');

  for (const project of projects) {
    const meta = buildProjectMeta(project, t, SITE_ORIGIN);
    if (!meta.title || !meta.description) {
      throw new Error(
        `prerender-heads: empty title/description for ${project.id}`
      );
    }
    const imagePath = meta.image.slice(SITE_ORIGIN.length);
    if (!existsSync(resolve(root, 'dist', `.${imagePath}`))) {
      throw new Error(
        `prerender-heads: og image missing in dist: ${imagePath}`
      );
    }
    const noscript = renderNoscript({
      heading: meta.name,
      description: meta.fullDescription,
      links: [
        { href: '/', label: `${en.header.name} — ${en.header.role}` },
        ...(project.demoUrl
          ? [{ href: project.demoUrl, label: 'Live demo' }]
          : []),
      ],
    });
    const html = rewriteProjectHead(template, meta, noscript);
    const outFile = resolve(root, 'dist/projects', `${project.id}.html`);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
  }

  const homeNoscript = renderNoscript({
    heading: en.header.name,
    subheading: en.header.role,
    description: en.header.tagline,
    links: projects.map((project) => ({
      href: `/projects/${project.id}`,
      label: t(`projects.${project.id.replace(/-/g, '')}.title`, {
        defaultValue: project.title,
      }),
    })),
  });
  writeFileSync(distIndex, addHomeNoscript(template, homeNoscript));

  console.log(
    `prerender-heads: ${projects.length} project pages written to dist/projects`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
