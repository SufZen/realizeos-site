/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Renders a route to static HTML so every public URL ships real content
 * (crawlers get a 200 with the page, not the SPA 404 redirect).
 */
import { StrictMode, Suspense } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import i18next, { type i18n as I18n } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import App from './App';
import en from '../public/locales/en/translation.json';
import he from '../public/locales/he/translation.json';
import pt from '../public/locales/pt/translation.json';
import { getRouteMetas, type Lang, type RouteMeta } from '@/seo/routes';

const resources = { en: { translation: en }, he: { translation: he }, pt: { translation: pt } };

async function makeI18n(lng: Lang): Promise<I18n> {
  const instance = i18next.createInstance();
  await instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    supportedLngs: ['en', 'he', 'pt'],
    interpolation: { escapeValue: false },
    initAsync: false,
  });
  return instance;
}

export async function getMetas(): Promise<RouteMeta[]> {
  const byLang = {
    en: await makeI18n('en'),
    he: await makeI18n('he'),
    pt: await makeI18n('pt'),
  };
  return getRouteMetas((lang) => byLang[lang].t);
}

export async function render(url: string, lang: Lang): Promise<string> {
  // First pass resolves the page's React.lazy() modules; the second renders with nothing
  // suspended, so every section is inline HTML (no hidden segments moved in by script).
  await renderOnce(url, lang);
  return renderOnce(url, lang);
}

async function renderOnce(url: string, lang: Lang): Promise<string> {
  const i18n = await makeI18n(lang);
  const { prelude } = await prerenderToNodeStream(
    // Same element tree as src/main.tsx, so the client can hydrate this markup.
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider defaultTheme="dark">
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </ThemeProvider>
        </Suspense>
      </I18nextProvider>
    </StrictMode>,
    // Static output: never split large Suspense boundaries into script-moved chunks.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of prelude as AsyncIterable<Uint8Array | string>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
  }
  return html + decoder.decode();
}
