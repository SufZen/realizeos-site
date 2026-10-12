import type { TFunction } from 'i18next';
import { guideSections } from '@/data/guideContent';
import { LANGS, LOCALIZED_PAGES, localizedPath, type Lang, type RouteMeta } from './lang';

export * from './lang';

/**
 * Single source of truth for public, indexable routes and their metadata.
 * Used by the client (document.title, meta tags on navigation) and by
 * scripts/prerender.mjs (static HTML per route, sitemap.xml).
 */

/** `t` must be bound to the page's language. */
export function getRouteMetas(tFor: (lang: Lang) => TFunction): RouteMeta[] {
  const metas: RouteMeta[] = [];

  for (const base of LOCALIZED_PAGES) {
    const alternates = Object.fromEntries(LANGS.map((l) => [l, localizedPath(base, l)])) as Record<Lang, string>;
    for (const lang of LANGS) {
      const t = tFor(lang);
      const key = base === '/' ? 'seo.home' : 'workshops.seo';
      metas.push({
        path: localizedPath(base, lang),
        lang,
        title: t(`${key}.title`),
        description: t(`${key}.desc`),
        alternates,
        priority: base === '/' ? 1.0 : 0.4,
      });
    }
  }

  metas.push({
    path: '/guide',
    lang: 'en',
    title: "RealizeOS Guide — Install, Connect Your Agent, Approvals and More",
    description: 'Step-by-step guides for RealizeOS: install it, connect Claude.ai and other agents, set up approvals, users and roles, field packs, Hebrew and production hosting.',
    priority: 0.9,
  });
  for (const s of guideSections) {
    metas.push({
      path: `/guide/${s.id}`,
      lang: 'en',
      title: `${s.title} · RealizeOS Guide`,
      description: s.description,
      priority: 0.7,
    });
  }

  metas.push(
    { path: '/wizard', lang: 'en', title: "Venture Wizard · Build Your Firm's Profile · RealizeOS", description: "A free guided wizard that turns your firm's identity, services and way of working into FABRIC files: the starting point of your company brain.", priority: 0.5 },
    { path: '/terms', lang: 'en', title: 'Terms and Conditions · RealizeOS', description: 'Terms and conditions for using realizeos.ai and RealizeOS services.', priority: 0.1 },
    { path: '/privacy', lang: 'en', title: 'Privacy Policy · RealizeOS', description: 'How realizeos.ai collects, uses and protects personal data.', priority: 0.1 },
    { path: '/accessibility', lang: 'en', title: 'Accessibility Statement · RealizeOS', description: 'The accessibility statement for realizeos.ai.', priority: 0.1 },
  );

  return metas;
}

export function findRouteMeta(metas: RouteMeta[], pathname: string): RouteMeta | undefined {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return metas.find((m) => m.path === clean);
}
