# RealizeOS Website — UX/UI & Responsiveness Audit Report

**Date:** 2026-03-15 (updated after repo sync — commits up to `1ae9543`)
**Auditor:** Claude Code (Opus 4.6)
**Scope:** Full codebase analysis of realizeos.ai — responsiveness, UX, UI, accessibility, performance
**Stack:** React 19 + Vite 7 + Tailwind CSS 3.4 + Framer Motion + Radix UI + i18next (EN/HE/PT)

---

## Executive Summary

RealizeOS.ai is a well-architected single-page marketing site with a strong dark-theme design system, solid component structure, and good i18n support. The recent sync (`1ae9543 feat: align website with updated Lite/Full packages`) improved the BrandWizard with new fields (personalValues, antiPatterns, brandPersonality, channelAdjustments) and expanded use cases from 5 to 6. However, core UX and i18n issues remain unaddressed.

The audit reveals **25 actionable issues** across responsiveness, UX flow, accessibility, and performance that impact conversion potential — especially on mobile devices where ~60% of traffic typically lands.

**Overall Score: 67/100**

| Category | Score | Issues Found |
|----------|-------|-------------|
| Responsiveness | 7/10 | 5 issues |
| UX / Information Architecture | 6/10 | 8 issues |
| UI / Visual Design | 7/10 | 5 issues |
| Accessibility | 5/10 | 5 issues |
| Performance | 7/10 | 2 issues |

---

## 1. RESPONSIVENESS ISSUES

### R1 — HowItWorks: 5-column grid breaks on tablets (HIGH)
**File:** `src/components/sections/HowItWorks.tsx:45`
**Issue:** `lg:grid-cols-5` creates very narrow cards on screens between 1024-1200px. On `sm` breakpoint, it falls to `sm:grid-cols-2` leaving one orphan card. At `md` breakpoint (768-1023px), it shows 2 columns with 1 orphan — awkward layout for 5 items.
**Impact:** Steps feel cramped on tablet; orphan card looks unbalanced.

### R2 — Features: 4-column grid too dense on small laptops (MEDIUM)
**File:** `src/components/sections/Features.tsx:46`
**Issue:** `lg:grid-cols-4` at 1024px with `max-w-site: 1200px` gives each card only ~270px width. With padding and illustration, text wraps aggressively.
**Impact:** Feature cards become hard to scan on smaller laptops.

### R3 — MobileStickyBar uses JS media query instead of CSS (LOW)
**File:** `src/components/shared/MobileStickyBar.tsx:9`
**Issue:** `useMediaQuery('(max-width: 768px)')` renders/unmounts the component via JS. This causes a layout shift flash when the viewport crosses 768px (e.g., rotating a tablet). CSS-based hiding (`md:hidden`) would be smoother.
**Impact:** Minor jank on tablet rotation.

### R4 — No `xl` breakpoint utilization (MEDIUM)
**File:** `tailwind.config.js`
**Issue:** The site uses only `sm`, `md`, and `lg` breakpoints. On large screens (1440px+), content is constrained to `max-w-site: 1200px` with no breathing room adjustments. The hero illustration could scale up, and grids could space out more.
**Impact:** Wasted space on large monitors; site feels "small" on 27" displays.

### R5 — Comparison table not horizontally scrollable on mobile (MEDIUM)
**File:** `src/components/sections/Comparison.tsx:47`
**Issue:** `md:grid-cols-3` stacks to single column on mobile. For comparison content, a horizontally scrollable table or swipeable cards would let users compare side-by-side — stacking defeats the purpose of comparison.
**Impact:** Users can't easily compare the three options on mobile.

---

## 2. UX / INFORMATION ARCHITECTURE ISSUES

### U1 — Page is extremely long — 16 sections (HIGH)
**File:** `src/App.tsx:27-51`
**Issue:** The page renders 16 distinct sections: Hero, Founder, Methodology, PainPoints, DemoVideo, CaseStudies, FabricSystem, Features, UseCases, Pricing, Comparison, HowItWorks, Delivery, Testimonials, FAQ, FinalCTA. This creates a very long scroll. Several sections overlap conceptually:
- **Pricing** vs **Comparison** vs **Delivery** all discuss what you get and how much it costs
- **Methodology** vs **FabricSystem** vs **Features** all explain how the product works
- **CaseStudies** vs **Testimonials** both provide social proof

**Impact:** Scroll fatigue leads to abandonment before reaching pricing/CTA. Cognitive overload from repetitive messaging.

### U2 — Founder section appears too early (HIGH)
**File:** `src/App.tsx:32`
**Issue:** The Founder section is the *second* thing users see, before they even understand the product (before PainPoints, Demo, Features). Users don't care about the founder until they care about the product.
**Impact:** Breaks the persuasion flow. Standard SaaS landing page flow: Problem then Solution then Proof then Pricing then CTA.

### U3 — No navigation to many sections (MEDIUM)
**File:** `src/lib/constants.ts:24-29`
**Issue:** The navbar only links to 4 sections: FABRIC, Features, Pricing, FAQ. There are 16 sections total. Key sections like Case Studies, How It Works, and Comparison are unreachable from nav.
**Impact:** Users can't jump to content they care about.

### U4 — Demo section is just a placeholder (HIGH)
**File:** `src/components/sections/DemoVideo.tsx:19-21`
**Issue:** The "demo" section shows a static mockup SVG with "Coming Soon" text. This is a prominent section with a glow effect that draws attention to... nothing.
**Impact:** Creates a trust gap. Either have a demo or don't show the section.

### U5 — MobileStickyBar CTA text is not translated (MEDIUM)
**File:** `src/components/shared/MobileStickyBar.tsx:16`
**Issue:** Hard-coded "Get RealizeOS" instead of using `t()`. The site supports EN/HE/PT but this key mobile conversion element stays in English for all languages.
**Impact:** Breaks localization on the most important mobile CTA.

### U6 — BrandWizard UI text is entirely untranslated (MEDIUM)
**File:** `src/components/wizard/BrandWizard.tsx:14-19, 156-375`
**Issue:** Despite the recent update adding 4 new fields (personalValues, antiPatterns, brandPersonality, channelAdjustments), **all** wizard labels, hints, placeholders, step labels ("About You", "Your Business", "Your Voice", "Examples", "Export"), button text ("Next", "Back", "Copy", "Download", "Done"), and instructional paragraphs remain hard-coded in English. The wizard does not import or use `useTranslation()`. This is now a larger problem than before, as the wizard grew from ~14 to ~18 fields without addressing localization.
**Impact:** Hebrew and Portuguese users get a fully English-only experience in the wizard — a key conversion tool.

### U7 — Exit intent popup fires on mobile (LOW)
**File:** `src/hooks/useExitIntent.ts` (referenced in `ExitIntentPopup.tsx`)
**Issue:** Exit intent detection (mouse leaving viewport) doesn't work on mobile — there's no mouse-leave event. If it falls back to a timer or scroll-based trigger, it may annoy mobile users with an unexpected popup.
**Impact:** Potentially intrusive UX on mobile.

### U8 — Delivery section has dual data sources (LOW)
**Files:** `src/data/delivery.ts`, `public/locales/en/translation.json` (delivery section)
**Issue:** The Delivery component reads from `t('delivery.models...')` (translation JSON), but `src/data/delivery.ts` also exports a full `deliveryColumns` array with the same data. The translation JSON was updated in the latest commit to match the new Lite/Full packages, but `delivery.ts` was also updated independently. Having two sources of truth risks drift — a content change in one file may not be reflected in the other.
**Impact:** Maintenance risk. Currently in sync, but fragile.

---

## 3. UI / VISUAL DESIGN ISSUES

### V1 — Testimonials section title not translated (MEDIUM)
**File:** `src/components/sections/Testimonials.tsx:12`
**Issue:** `SectionHeader title="What Early Users Say"` — hard-coded English string instead of `t('testimonials.title')`.
**Impact:** Inconsistent language for non-English users.

### V2 — Accordion labels inconsistently translated (MEDIUM)
**Files:**
- `Pricing.tsx:71` — "What's Included Technically" (hardcoded)
- `Delivery.tsx:62` — "View Technical Details" (hardcoded)
- `Methodology.tsx:66` — "Under the Hood" (hardcoded)

**Issue:** Multiple accordion trigger labels are hard-coded in English across different sections.
**Impact:** Breaks the i18n experience.

### V3 — Glass-card hover effect invisible on touch devices (LOW)
**File:** `src/index.css:73-76`
**Issue:** `.glass-card:hover` changes border color and background, but `hover` states are unreliable on touch devices. The `GlowCard` component also uses `hover:-translate-y-1` which creates a "sticky hover" on mobile (tapping a card lifts it and it stays lifted until you tap elsewhere).
**Impact:** Inconsistent visual feedback on mobile.

### V4 — Multiple innerHTML usages without sanitization (MEDIUM)
**Files:** `SectionHeader.tsx:18`, `Methodology.tsx:90`, `FAQ.tsx:34`
**Issue:** Three components render translated content via raw innerHTML injection. If translation files are compromised or contain user-generated content, this could be a security vector. Consider using a sanitization library like DOMPurify, or restructure translations as component arrays.
**Impact:** Security concern. Even for static translations, this is a risky pattern.

### V5 — UseCases: missing unique illustrations for 2 of 6 use cases (LOW)
**File:** `src/components/sections/UseCases.tsx:15-22`
**Issue:** The illustration map has 6 entries but only 5 unique components. Both `Flag` (Engineering) and `Layers` (Urban Planning) map to `UseCaseSaaS`, which is semantically wrong — a SaaS icon doesn't represent engineering or urban planning. After expanding from 5 to 6 use cases in the latest update, no new illustration components were created for the two new industries.
**Impact:** Visual inconsistency; the icons don't match their use case labels.

---

## 4. ACCESSIBILITY ISSUES

### A1 — Minimal landmark/ARIA usage across sections (HIGH)
**Issue:** While SVG illustrations correctly use `role="img"` and `aria-label`, the main page sections don't use ARIA landmarks (`aria-labelledby`, `role="region"`). The `Section` component generates plain `<section>` tags without accessible names.
**Impact:** Screen readers can't announce section names during navigation.

### A2 — No skip-to-content link (HIGH)
**File:** `src/App.tsx`
**Issue:** No "skip to main content" link for keyboard users. The glassmorphism navbar with multiple links requires tabbing through everything to reach content.
**Impact:** Keyboard users must tab through all nav items on every page load.

### A3 — Color contrast on muted text (MEDIUM)
**File:** `src/index.css:24`
**Issue:** `--muted-foreground: 243 12% 64.7%` (#9a9ab0) on `--background: 240 33% 3.7%` (#0a0a0f) gives approximately 6.5:1 contrast ratio — passes AA for body text. However, `text-muted-foreground/50` (used in Comparison.tsx:75) drops this below 3:1, failing WCAG AA.
**Impact:** Some text elements are unreadable for users with low vision.

### A4 — Focus indicators rely on browser defaults (MEDIUM)
**Issue:** The `--ring` color is set to yellow, but many interactive elements (cards, accordion triggers) don't show visible focus rings when navigated via keyboard.
**Impact:** Keyboard users can't track their position on the page.

### A5 — Animated content has no reduced-motion support (MEDIUM)
**Files:** `src/components/shared/AnimateOnScroll.tsx`, `src/index.css:104-116`
**Issue:** `AnimateOnScroll` uses Framer Motion animations with no check for `prefers-reduced-motion`. The CSS `@keyframes rotateBorder` animation runs infinitely with no reduced-motion media query.
**Impact:** Users with vestibular disorders may experience discomfort.

---

## 5. PERFORMANCE ISSUES

### P1 — Large number of Framer Motion instances (MEDIUM)
**Issue:** Every section uses `AnimateOnScroll` (which creates a `motion.div` with `whileInView` observer). With 16 sections, each containing 3-8 animated items, there are approximately 60+ IntersectionObservers active simultaneously on page load.
**Impact:** May cause jank on lower-end mobile devices.

### P2 — No lazy loading of below-fold sections (MEDIUM)
**File:** `src/App.tsx:27-51`
**Issue:** All 16 sections render immediately. There's no `React.lazy()` or dynamic imports for below-fold sections. The hero illustration, all SVG illustrations, and all translations load upfront.
**Impact:** Larger initial bundle; slower Time to Interactive on mobile.

---

## 6. IMPROVEMENT PLAN

### Phase 1: Quick Wins (1-2 days)

| # | Action | Priority | Impact |
|---|--------|----------|--------|
| 1 | **Translate all hard-coded strings** — MobileStickyBar, Testimonials title, accordion labels, BrandWizard (now 18 fields + all UI chrome). This is the single largest i18n gap | HIGH | Fixes broken i18n for HE/PT users |
| 2 | **Add skip-to-content link** — add a visually hidden, focus-visible anchor before Navbar | HIGH | Instant accessibility win |
| 3 | **Add `prefers-reduced-motion` support** — wrap AnimateOnScroll in a motion check; add `@media (prefers-reduced-motion: reduce)` to CSS animations | MEDIUM | Accessibility compliance |
| 4 | **Remove or hide DemoVideo section** until actual video exists | HIGH | Removes trust gap |
| 5 | **Fix MobileStickyBar** — use CSS `md:hidden` instead of JS `useMediaQuery` | LOW | Eliminates layout shift |

### Phase 2: UX Restructure (3-5 days)

| # | Action | Priority | Impact |
|---|--------|----------|--------|
| 6 | **Reorganize section order** to follow proven SaaS flow: Hero, PainPoints, FabricSystem, Features, CaseStudies, Pricing, HowItWorks, FAQ, FinalCTA. Move Founder near bottom, merge Comparison into Pricing, merge Delivery into HowItWorks, merge Testimonials into CaseStudies | HIGH | Reduces page from 16 to ~10 sections; tighter narrative |
| 7 | **Update nav items** to reflect reorganized sections — add Case Studies and How It Works links | MEDIUM | Better navigability |
| 8 | **Make Comparison section horizontally scrollable on mobile** — add `overflow-x-auto` wrapper with snap scrolling | MEDIUM | Enables actual comparison on mobile |
| 9 | **Add section `aria-labelledby`** — pass an `id` to each `SectionHeader` h2 and reference it in `Section` | MEDIUM | Screen reader navigation |

### Phase 3: Performance & Polish (3-5 days)

| # | Action | Priority | Impact |
|---|--------|----------|--------|
| 10 | **Lazy-load below-fold sections** — use `React.lazy()` + `Suspense` for everything below Hero | MEDIUM | Faster initial load |
| 11 | **Reduce Framer Motion overhead** — batch animations per section instead of per-card; use CSS animations for simple fade-ups | MEDIUM | Less jank on mobile |
| 12 | **Add `xl` breakpoint layouts** — hero illustration scales up, grids get more spacing on 1440px+ screens | LOW | Better large-screen experience |
| 13 | **Fix HowItWorks grid** — change to `lg:grid-cols-3` with second row of 2 centered, or use a horizontal stepper layout | MEDIUM | Clean layout at all breakpoints |
| 14 | **Replace raw innerHTML** — use a sanitization library (DOMPurify) or split translations into structured data to avoid injection risks | MEDIUM | Eliminates security risk |
| 15 | **Add visible focus indicators** — apply `focus-visible:ring-2 focus-visible:ring-brand-yellow` to all interactive elements | MEDIUM | Keyboard accessibility |
| 16 | **Create unique illustrations** for Engineering and Urban Planning use cases — currently both reuse the SaaS icon | LOW | Visual consistency |
| 17 | **Consolidate delivery data** — remove `src/data/delivery.ts` and use translation JSON as single source, or vice versa | LOW | Eliminates dual data source risk |

### Phase 4: Conversion Optimization (ongoing)

| # | Action | Priority | Impact |
|---|--------|----------|--------|
| 18 | **A/B test section order** — try moving Pricing higher (after FabricSystem) vs current position | MEDIUM | Data-driven layout |
| 19 | **Add social proof near CTAs** — show a micro-testimonial or "X businesses built" counter near pricing buttons | MEDIUM | Conversion lift |
| 20 | **Add breadcrumb progress indicator** — subtle dot-nav on the side showing scroll position through sections | LOW | Orientation for long-scroll pages |
| 21 | **Mobile-first CTA redesign** — the sticky bar should show pricing tier name and price, not just "Get RealizeOS" | MEDIUM | Higher mobile conversion |
| 22 | **Add structured data (JSON-LD)** — Product, FAQ, Organization schema for SEO | MEDIUM | Better search presence |

---

## Recent Improvements (commits `5182f5d` + `1ae9543`)

The following changes were made since the initial audit analysis:

- **BrandWizard expanded** — 4 new fields (personalValues, antiPatterns, brandPersonality, channelAdjustments) make the wizard significantly more thorough. File path labels updated to match actual vault structure (`systems/my-business-1/F-foundations/`). Better step 5 instructions.
- **Use cases expanded** — from 5 to 6 (added Engineering & Operations, Urban Planning, Asset Management), better aligned with target audience.
- **Pricing/delivery content updated** — Lite now lists Brand Worksheet, 6 skill workflows, 3 shared methods, CLAUDE.md protocol. Full lists 8 industry templates, CLI scaffolding.
- **Translation files synced** — EN/HE/PT updated with new content.

**What was NOT addressed:** All i18n hardcoding issues (BrandWizard, MobileStickyBar, Testimonials, accordion labels). No responsiveness, accessibility, or performance changes.

---

## Architecture Strengths Worth Preserving

- Clean component separation (layout, sections, shared, illustrations, ui)
- Consistent design token system via CSS custom properties
- i18next setup supporting 3 languages with lazy loading
- Radix UI primitives for accessible accordion, dialog, sheet
- Analytics tracking integrated at CTA touchpoints
- Brand Wizard is a genuinely unique differentiator (now with 18 fields across 5 steps) — polish, don't remove
- Glassmorphism + yellow accent is visually distinctive and consistent
- Use case content is now industry-specific and deeply relevant to target audience

---

*End of audit (v2, post-sync). Implementation of Phase 1 can begin immediately.*
