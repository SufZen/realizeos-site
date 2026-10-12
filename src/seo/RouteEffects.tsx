import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OG_IMAGE, LANGS, canonicalUrl, isLocalizedPage, splitLangPath, type Lang } from './lang';
import type { RouteMeta } from './lang';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps the UI language and the <head> in sync with the URL.
 * On localized pages (/, /workshops and their /he, /pt versions) the URL decides the language.
 */
export function RouteEffects() {
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();
  const { lang, base } = splitLangPath(pathname);
  const localized = isLocalizedPage(base);

  useEffect(() => {
    if (localized && i18n.resolvedLanguage !== lang) void i18n.changeLanguage(lang);
  }, [localized, lang, i18n]);

  // The route table pulls in the guide content, so load it on demand instead of in the main bundle.
  const [meta, setMetaState] = useState<RouteMeta | undefined>();
  useEffect(() => {
    let cancelled = false;
    void import('./routes').then(({ findRouteMeta, getRouteMetas }) => {
      if (!cancelled) setMetaState(findRouteMeta(getRouteMetas(() => t), pathname));
    });
    return () => { cancelled = true; };
  }, [t, pathname]);

  useEffect(() => {
    if (!meta) return;
    if (localized && i18n.resolvedLanguage !== meta.lang) return; // wait for the language switch
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl(meta.path));
    setMeta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setLink('canonical', canonicalUrl(meta.path));
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (meta.alternates) {
      for (const l of LANGS as Lang[]) {
        const alt = meta.alternates[l];
        if (alt) setLink('alternate', canonicalUrl(alt), l);
      }
      if (meta.alternates.en) setLink('alternate', canonicalUrl(meta.alternates.en), 'x-default');
    }
  }, [meta, localized, i18n.resolvedLanguage]);

  return null;
}
