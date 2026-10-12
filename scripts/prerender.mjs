/**
 * Build step: prerender every public route into docs/ so GitHub Pages serves
 * real HTML (HTTP 200, own title/description/canonical/hreflang) instead of the
 * SPA 404 redirect. Also writes sitemap.xml and robots.txt.
 *
 * Runs after `vite build` (client → docs/) and `vite build --ssr` (→ dist-ssr/).
 * No extra dependencies: uses React 19's react-dom/static via src/entry-server.tsx.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs');
const SITE_URL = 'https://realizeos.ai';
const OG_IMAGE = `${SITE_URL}/img/og-image.png`;

const { render, getMetas } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const canonical = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
const OG_LOCALE = { en: 'en_US', he: 'he_IL', pt: 'pt_PT' };

function replaceBetween(html, start, end, content) {
  const i = html.indexOf(start);
  const j = html.indexOf(end);
  if (i === -1 || j === -1) throw new Error(`Marker ${start} / ${end} not found in docs/index.html`);
  return html.slice(0, i + start.length) + '\n' + content + '\n  ' + html.slice(j);
}

function headFor(meta) {
  const lines = [
    `  <title>${esc(meta.title)}</title>`,
    `  <meta name="description" content="${esc(meta.description)}">`,
    `  <link rel="canonical" href="${canonical(meta.path)}">`,
  ];
  if (meta.alternates) {
    for (const [lang, path] of Object.entries(meta.alternates)) {
      lines.push(`  <link rel="alternate" hreflang="${lang}" href="${canonical(path)}">`);
    }
    if (meta.alternates.en) lines.push(`  <link rel="alternate" hreflang="x-default" href="${canonical(meta.alternates.en)}">`);
  }
  return lines.join('\n');
}

function socialFor(meta) {
  return [
    `  <meta property="og:title" content="${esc(meta.title)}">`,
    `  <meta property="og:description" content="${esc(meta.description)}">`,
    `  <meta property="og:type" content="website">`,
    `  <meta property="og:url" content="${canonical(meta.path)}">`,
    `  <meta property="og:site_name" content="RealizeOS">`,
    `  <meta property="og:locale" content="${OG_LOCALE[meta.lang]}">`,
    `  <meta property="og:image" content="${OG_IMAGE}">`,
    `  <meta property="og:image:width" content="1200">`,
    `  <meta property="og:image:height" content="630">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${esc(meta.title)}">`,
    `  <meta name="twitter:description" content="${esc(meta.description)}">`,
    `  <meta name="twitter:image" content="${OG_IMAGE}">`,
  ].join('\n');
}

async function writePage(path, html) {
  if (path === '/') {
    await writeFile(join(outDir, 'index.html'), html);
    return;
  }
  // Both /x.html and /x/index.html, so /x and /x/ both resolve on GitHub Pages.
  const rel = path.replace(/^\//, '');
  await mkdir(dirname(join(outDir, `${rel}.html`)), { recursive: true });
  await writeFile(join(outDir, `${rel}.html`), html);
  await mkdir(join(outDir, rel), { recursive: true });
  await writeFile(join(outDir, rel, 'index.html'), html);
}

const template = await readFile(join(outDir, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('docs/index.html has no empty #root — was it already prerendered?');

const metas = await getMetas();
const failed = [];

for (const meta of metas) {
  let body = '';
  try {
    body = await render(meta.path, meta.lang);
  } catch (err) {
    failed.push(meta.path);
    console.warn(`  ! ${meta.path}: rendered head only (${err?.message ?? err})`);
  }
  // React emits resource hints (e.g. <link rel="preload" as="image">) at the start of a fragment;
  // they belong in <head>, and leaving them in #root breaks hydration.
  const hints = body.match(/^(?:<link [^>]*>)+/)?.[0] ?? '';
  body = body.slice(hints.length);
  let html = template
    .replace('<html lang="en" dir="ltr"', `<html lang="${meta.lang}" dir="${meta.lang === 'he' ? 'rtl' : 'ltr'}"`)
    .replace('</head>', hints ? `  ${hints}` + String.fromCharCode(10) + '</head>' : '</head>')
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = replaceBetween(html, '<!--seo:start-->', '<!--seo:end-->', headFor(meta));
  html = replaceBetween(html, '<!--social:start-->', '<!--social:end-->', socialFor(meta));
  await writePage(meta.path, html);
  console.log(`  ✓ ${meta.path}${body ? '' : ' (head only)'}`);
}

// sitemap.xml with hreflang alternates
const today = new Date().toISOString().slice(0, 10);
const urls = metas.map((m) => {
  const alts = m.alternates
    ? Object.entries(m.alternates)
        .map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonical(p)}"/>`)
        .concat(m.alternates.en ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(m.alternates.en)}"/>`] : [])
        .join('\n') + '\n'
    : '';
  return `  <url>\n    <loc>${canonical(m.path)}</loc>\n${alts}    <lastmod>${today}</lastmod>\n    <priority>${m.priority.toFixed(1)}</priority>\n  </url>`;
});
await writeFile(join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);

await writeFile(join(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /design\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Prerendered ${metas.length} routes${failed.length ? `, ${failed.length} head-only: ${failed.join(', ')}` : ''}. Wrote sitemap.xml and robots.txt.`);
