import { describe, it, expect } from 'vitest';
import {
  addHomeNoscript,
  escapeAttr,
  renderNoscript,
  rewriteProjectHead,
  type HeadMeta,
} from '../../scripts/head-rewrite.mjs';
import indexHtml from '../../index.html?raw';

const meta: HeadMeta = {
  title: 'Tom & "Jerry" <App> | Federico López',
  description: 'A "quoted" <b>description</b> & more',
  canonical: 'https://federicoglopez.dev/projects/demo',
  image: 'https://federicoglopez.dev/images/og/demo.jpg',
  imageType: 'image/jpeg',
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: 'Screenshot of "Demo"',
  jsonLd: [
    {
      id: 'project-jsonld',
      data: { '@type': 'CreativeWork', name: '</script>' },
    },
    { id: 'project-breadcrumb-jsonld', data: { '@type': 'BreadcrumbList' } },
  ],
};
const noscript = renderNoscript({
  heading: 'Demo',
  description: 'Desc',
  links: [{ href: '/', label: 'Home' }],
});
const ldCount = (html: string) =>
  (html.match(/<script[^>]*application\/ld\+json/g) ?? []).length;

describe('rewriteProjectHead', () => {
  const out = rewriteProjectHead(indexHtml, meta, noscript);

  it('replaces title, canonical and every social tag', () => {
    expect(out).toContain(
      '<title>Tom &amp; "Jerry" &lt;App&gt; | Federico López</title>'
    );
    expect(out).toContain(
      '<link rel="canonical" href="https://federicoglopez.dev/projects/demo" />'
    );
    for (const key of ['og:url', 'twitter:url']) {
      expect(out).toContain(`content="${meta.canonical}"`);
      expect(out).toMatch(new RegExp(`"${key}" content="${meta.canonical}"`));
    }
    expect(out).toContain(
      '<meta property="og:image" content="https://federicoglopez.dev/images/og/demo.jpg" />'
    );
    expect(out).toContain(
      '<meta name="twitter:image" content="https://federicoglopez.dev/images/og/demo.jpg" />'
    );
    expect(out).toContain(
      '<meta property="og:image:type" content="image/jpeg" />'
    );
    expect(out).toContain('<meta property="og:image:width" content="1200" />');
    expect(out).toContain('<meta property="og:image:height" content="630" />');
  });

  it('leaves no home metadata behind', () => {
    const head = out.slice(
      0,
      out.indexOf('<script type="application/ld+json">')
    );
    expect(head).not.toContain('og-image.png');
    expect(head).not.toContain('Senior Frontend Engineer with 16+');
    expect(head).not.toContain('<title>Federico López — Senior');
  });

  it('escapes attribute values', () => {
    expect(out).toContain(
      'content="A &quot;quoted&quot; &lt;b&gt;description&lt;/b&gt; &amp; more"'
    );
    expect(out).toContain('content="Screenshot of &quot;Demo&quot;"');
    expect(escapeAttr(`a&"<>`)).toBe('a&amp;&quot;&lt;&gt;');
  });

  it('adds the project JSON-LD next to the home entity and keeps scripts safe', () => {
    expect(ldCount(out)).toBe(ldCount(indexHtml) + 2);
    expect(out).toContain('id="project-jsonld"');
    expect(out).toContain('id="project-breadcrumb-jsonld"');
    expect(out).toContain('\\u003c/script>');
    expect(out.match(/<\/script>/g)?.length).toBe(
      (indexHtml.match(/<\/script>/g)?.length ?? 0) + 2
    );
  });

  it('puts the noscript fallback in the body before #root', () => {
    const body = out.slice(out.indexOf('<body'));
    expect(body.indexOf('<noscript>')).toBeGreaterThan(-1);
    expect(body.indexOf('<noscript>')).toBeLessThan(body.indexOf('id="root"'));
    expect(body).toContain('<h1>Demo</h1>');
  });

  it.each([
    ['<title>', /<title>[\s\S]*?<\/title>/],
    ['canonical', /<link rel="canonical"[^>]*>/],
    ['og:image', /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/],
    ['twitter:image:alt', /<meta name="twitter:image:alt"[^>]*>/],
    ['ld+json', /<script type="application\/ld\+json">[\s\S]*?<\/script>/],
    ['<body>', /<body>/],
  ])('throws when %s is missing', (_label, pattern) => {
    const broken = indexHtml.replace(pattern, '');
    expect(broken).not.toBe(indexHtml);
    expect(() => rewriteProjectHead(broken, meta, noscript)).toThrow(
      /expected tag not found/
    );
  });
});

describe('JSON-LD and idempotency', () => {
  it('round-trips JSON containing </script> through the emitted script tag', () => {
    const out = rewriteProjectHead(indexHtml, meta, noscript);
    const doc = new DOMParser().parseFromString(out, 'text/html');
    const parsed = JSON.parse(
      doc.getElementById('project-jsonld')?.textContent ?? ''
    );
    expect(parsed.name).toBe('</script>');
    expect(doc.getElementById('project-breadcrumb-jsonld')).not.toBeNull();
  });

  it('never duplicates the noscript when applied repeatedly', () => {
    const once = addHomeNoscript(indexHtml, noscript);
    const twice = addHomeNoscript(once, noscript);
    expect(twice).toBe(once);
    const project = rewriteProjectHead(once, meta, noscript);
    expect(project.match(/<noscript>/g)).toHaveLength(1);
    expect(rewriteProjectHead(project, meta, noscript)).toBe(project);
  });
});

describe('addHomeNoscript', () => {
  it('only adds a noscript block to the body', () => {
    const out = addHomeNoscript(indexHtml, noscript);
    expect(out.slice(0, out.indexOf('<body'))).toBe(
      indexHtml.slice(0, indexHtml.indexOf('<body'))
    );
    expect(out).toContain('<noscript>');
    expect(out.indexOf('<noscript>')).toBeLessThan(out.indexOf('id="root"'));
  });

  it('throws without a body tag', () => {
    expect(() => addHomeNoscript('<html></html>', noscript)).toThrow(
      /expected tag not found/
    );
  });
});
