// Pure HTML head rewriting helpers for the prerender step. No dependencies,
// no filesystem access, so they are unit-testable.

/** Escapes a value for use inside a double-quoted HTML attribute. */
export function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escapes a value for use as HTML text content. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Matches quoted attribute values so a `>` inside a value can't end the tag.
const TAG_BODY = `(?:[^>"']|"[^"]*"|'[^']*')*`;

/** Replaces the first match of `pattern`; throws if there is none. */
function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender-heads: expected tag not found in HTML: ${label}`
    );
  }
  return html.replace(pattern, () => replacement);
}

function setMeta(html, attr, key, value) {
  const pattern = new RegExp(
    `<meta\\s${TAG_BODY}?\\b${attr}="${escapeRegExp(key)}"${TAG_BODY}>`
  );
  return replaceTag(
    html,
    pattern,
    `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`,
    `meta ${attr}="${key}"`
  );
}

/** JSON for an inline `<script>`: keeps `</script>` and `<!--` from ending it. */
function jsonForScript(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Renders the `<noscript>` fallback block. `links` is `[{ href, label }]`. */
export function renderNoscript({ heading, subheading, description, links }) {
  const items = links
    .map(
      (link) =>
        `<li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`
    )
    .join('');
  return [
    '<noscript>',
    `<h1>${escapeHtml(heading)}</h1>`,
    subheading ? `<p><strong>${escapeHtml(subheading)}</strong></p>` : '',
    description ? `<p>${escapeHtml(description)}</p>` : '',
    items ? `<ul>${items}</ul>` : '',
    '</noscript>',
  ]
    .filter(Boolean)
    .join('\n      ');
}

const NOSCRIPT_START = '<!-- prerender:noscript -->';
const NOSCRIPT_END = '<!-- /prerender:noscript -->';
const NOSCRIPT_BLOCK = new RegExp(
  `\\n[ \\t]*${escapeRegExp(NOSCRIPT_START)}[\\s\\S]*?${escapeRegExp(NOSCRIPT_END)}`,
  'g'
);

/**
 * Inserts `block` right after the opening `<body>` tag, wrapped in marker
 * comments. Any block from an earlier run is removed first, so running the
 * prerender twice never duplicates the noscript. Throws if `<body>` is missing.
 */
function insertAfterBodyOpen(html, block) {
  const clean = html.replace(NOSCRIPT_BLOCK, '');
  const pattern = /<body(?:\s[^>]*)?>/;
  if (!pattern.test(clean)) {
    throw new Error('prerender-heads: expected tag not found in HTML: <body>');
  }
  return clean.replace(
    pattern,
    (open) =>
      `${open}\n    ${NOSCRIPT_START}\n    ${block}\n    ${NOSCRIPT_END}`
  );
}

/**
 * Rewrites the head of the built home page for one project. Throws when any
 * expected tag is missing so a broken template never ships home metadata.
 * The home Person/WebSite JSON-LD stays (the project's `author` references its
 * `@id`, as at runtime); the project JSON-LD is appended after it.
 */
export function rewriteProjectHead(html, meta, noscript) {
  let out = html;

  out = replaceTag(
    out,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
    '<title>'
  );
  out = replaceTag(
    out,
    new RegExp(`<link\\s${TAG_BODY}?\\brel="canonical"${TAG_BODY}>`),
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    'link rel="canonical"'
  );

  const tags = [
    ['name', 'description', meta.description],
    ['property', 'og:url', meta.canonical],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description],
    ['property', 'og:image', meta.image],
    ['property', 'og:image:width', String(meta.imageWidth)],
    ['property', 'og:image:height', String(meta.imageHeight)],
    ['property', 'og:image:type', meta.imageType],
    ['property', 'og:image:alt', meta.imageAlt],
    ['name', 'twitter:url', meta.canonical],
    ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description],
    ['name', 'twitter:image', meta.image],
    ['name', 'twitter:image:alt', meta.imageAlt],
  ];
  for (const [attr, key, value] of tags) out = setMeta(out, attr, key, value);

  if (!/<script type="application\/ld\+json">/.test(out)) {
    throw new Error(
      'prerender-heads: expected tag not found in HTML: ld+json script'
    );
  }
  const jsonLd = meta.jsonLd
    .map(
      ({ id, data }) =>
        `<script id="${escapeAttr(id)}" type="application/ld+json">${jsonForScript(data)}</script>`
    )
    .join('\n    ');
  for (const { id } of meta.jsonLd) {
    out = out.replace(
      new RegExp(
        `\\n?[ \\t]*<script id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?</script>`,
        'g'
      ),
      ''
    );
  }
  out = replaceTag(out, /<\/head>/, `    ${jsonLd}\n  </head>`, '</head>');

  return insertAfterBodyOpen(out, noscript);
}

/** Adds only a `<noscript>` block to the built home page. */
export function addHomeNoscript(html, noscript) {
  return insertAfterBodyOpen(html, noscript);
}
