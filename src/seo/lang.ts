import { useLocation } from 'react-router-dom';

/** Language helpers shared by the app shell. Kept small: no page data here. */

export const SITE_URL = 'https://realizeos.ai';
export const OG_IMAGE = `${SITE_URL}/img/og-image.png`;

export type Lang = 'en' | 'he' | 'pt';
export const LANGS: Lang[] = ['en', 'he', 'pt'];

/** Pages that exist in every language get a /he and /pt version. */
export const LOCALIZED_PAGES = ['/', '/workshops'] as const;

export interface RouteMeta {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  /** hreflang alternates (lang → path), including this page. */
  alternates?: Partial<Record<Lang, string>>;
  priority: number;
}

export function langPrefix(lang: Lang): string {
  return lang === 'en' ? '' : `/${lang}`;
}

/** '/he/workshops' → { lang: 'he', base: '/workshops' } */
export function splitLangPath(pathname: string): { lang: Lang; base: string } {
  const m = pathname.match(/^\/(he|pt)(\/.*)?$/);
  if (!m) return { lang: 'en', base: pathname || '/' };
  return { lang: m[1] as Lang, base: m[2] && m[2] !== '/' ? m[2] : '/' };
}

export function localizedPath(base: string, lang: Lang): string {
  const prefix = langPrefix(lang);
  if (!prefix) return base;
  return base === '/' ? prefix : `${prefix}${base}`;
}

export function isLocalizedPage(base: string): boolean {
  return (LOCALIZED_PAGES as readonly string[]).includes(base);
}

/** Canonical URL: no trailing slash, except the root. */
export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** On pages that exist in every language, the language prefix to keep in links ('' for English). */
export function useLangPrefix(): string {
  const { pathname } = useLocation();
  const { lang, base } = splitLangPath(pathname);
  return isLocalizedPage(base) && lang !== 'en' ? `/${lang}` : '';
}
