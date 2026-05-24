# PLAN B — Website relaunch (`SufZen/realizeos-site`)

> Part of the RealizeOS 5.5.0 relaunch, split across two repos. This plan is for the **website repo**. The companion **product** plan lives in `SufZen/RealizeOS-5` at `docs/v5.5.0/PLAN-site-alignment.md`, and it produces the handoff artifact this plan consumes.
>
> **Repo:** `/home/user/realizeos-site` · **Branch:** `claude/amazing-albattani-He3xD`

## Goal

Relaunch realizeos.ai for the open-source (BSL 1.1) + services pivot, timed to **v5.5.0**. Lead with the "AI OS you own" narrative, complete placeholder sections, full EN/HE/PT parity, cleanup, accessibility.

## Shared context

RealizeOS is moving from a paid, closed-source package model to an **open-source (BSL 1.1) product + services** model (free core; monetize via guided installation sessions + vertical consulting).

**v5.5.0 is already built and on `main` of `SufZen/RealizeOS-5`** (Sprints 1–8; `VERSION` already `5.5.0`). Shipped now (present as **available**): FABRIC Entity System (the Heart), Synapse knowledge index, Event Log + SOUL identity, Runtime Adapter Layer + Registry + FABRIC REST API, Mission Engine, Dreaming subsystem + Trust Policy, FABRIC operator CLI, and dashboard pages `/missions` `/knowledge` `/dreams`. **Roadmap (label "coming," never available):** Voice channel, full three-pane Workspace redesign, Cytoscape visual graph, React Native mobile companion, host-satellite sync.

**Positioning thesis:** "You own the Heart (FABRIC knowledge graph + event log + identity) forever; agent runtimes, models, channels, and even the dashboard are swappable adapters; local-first." The current site still tells the old story ("20+ models, 5 channels").

**Current state:** the transformation is already ~70% done. `src/pages/Home.tsx` renders the 10-section open-source structure (Hero → PainPoints → GithubDemo → FabricSystem → Features → Founder → UseCases → GetStarted → CommunityDocs → FAQ → FinalCTA). Pricing is already Free/Guided/Consulting. Old Stripe `$79/$249/$499` Pricing/Delivery/Comparison/DemoVideo/Methodology sections are removed. The `@realizeos/design-system` (`--rz-*` tokens + `.fx-*` effects) is adopted; legacy `.glass`/`.glow` migrated.

**Strategy:** don't rebuild — finish and re-aim. Most work is content, the 5.5.0 narrative, i18n, completing placeholders, cleanup, accessibility.

**Resolved decisions:**
1. **Timeline:** launch this week on the real shipping build; shipped capabilities are "available now," roadmap clearly labeled.
2. **Venture Wizard → freemium funnel:** free **Google Gem + Custom GPT** for self-serve FABRIC-file generation (runs on user's own AI subscription → zero API cost; also distribution channels). The **live on-site Wizard** (n8n/LLM backend, real API cost) is **gated to paying clients**.
3. **Webinar / Lite vs Full:** a **single webinar for the Full version only**. **Lite stays** as an optional simpler first-timer onboarding phase, promoted via a **simple demo video** (not a webinar). Retire the per-tier (`lite`/`setup`) webinar booking routes.

## B0. Ground-truth from the product repo (do first)
Read `docs/v5.5.0/SITE-CLAIMS.md` from `SufZen/RealizeOS-5` (local path `/home/user/RealizeOS-5/docs/v5.5.0/SITE-CLAIMS.md`, or GitHub MCP `get_file_contents` on `SufZen/RealizeOS-5` @ `claude/amazing-albattani-He3xD`). Treat it as authoritative for all version/stat/install/shipped-vs-roadmap claims; pull dashboard screenshots from `docs/v5.5.0/assets/`. If it isn't there yet, start with B3/B4/B5 and block only the copy-lock (B1/B2).

## B1. Content & messaging foundation (lock copy before touching components)
1. Positioning brief (working doc): headline, sub-headline, "own the Heart / swap everything else" thesis, local-first promise, 3 audience framings (self-hoster, multi-venture operator, consulting client).
2. Lock Hero copy; replace the stats row in `src/components/sections/Hero.tsx` (currently 20 models / 5 channels / 13 tools / 4 strategies) with 5.5.0-true numbers **from `SITE-CLAIMS.md`**.
3. Define the new "Architecture" story (`src/data/fabric.ts`, `FabricSystem.tsx`): FABRIC as the Heart inside the layered AI-OS model (Heart you own + swappable Limbs/Senses/Skin).
4. Draft Community & Docs content to replace the `CommunityDocs` placeholder (Discussions, docs links, office hours, contributor guide, license explainer).
5. Draft "Walk the Talk" proof for Founder ("Powering N regions • N+ agents • used daily by Realization").
6. Rewrite FAQ (`src/data/faq.ts`): BSL 1.1 (free self-host, no-compete-SaaS, Apache-2.0 in 2030), local-first / data residency, runtime-agnostic, self-hosting requirements, what installation sessions include, upgrade path.

## B2. Section build-out & re-aim (English first)
1. **Hero** — locked copy + new stats; keep GitHub badge + dual CTA (`Get Started (free)` → `#quickstart`, `Book Expert Setup` → TidyCal). Verify destinations (B3).
2. **Architecture / FABRIC** — evolve `FabricSystem.tsx` + `FabricDiagram.tsx` to the layered AI-OS framing.
3. **Features** (`Features.tsx`, `src/data/features.ts`) — add shipped capabilities: Runtime Adapters, Synapse, Mission Engine, Dreaming + Trust Policy, Event Log/audit, SOUL, local-first, multi-LLM routing. Label Voice/mobile/Workspace-redesign as **roadmap**. Reuse `Feature*` illustrations; flag gaps.
4. **GithubDemo / Quickstart** — keep multi-install terminal; use **only verified commands from `SITE-CLAIMS.md`**; replace the "Coming Soon" demo placeholder with **real dashboard screenshots** (`/missions`, `/knowledge`, `/dreams`).
5. **Founder** — add the "Walk the Talk" proof badge.
6. **UseCases** (`UseCases.tsx`, `src/data/usecases.ts`) — feature the Realization internal deployment; align verticals (real estate, hotel investment, home maintenance, venture studios, architecture).
7. **GetStarted (pricing)** (`GetStarted.tsx`, `src/data/pricing.ts`) — keep Free/Guided/Consulting; **fix CTAs** (Free tier currently points to legacy `/webinar/booking/lite?mode=open` → repoint to GitHub/quickstart; confirm Guided `tidycal.com/realization` + Consulting `mailto:info@realizeos.ai`). Surface the two onboarding paths in Free: (a) "Start with Lite" → Lite demo video, (b) full install → Quickstart. Add the **free Venture Wizard via Google Gem / Custom GPT** as an **email-gated** self-serve entry.
8. **Lite onboarding + Full webinar** — add a **simple Lite demo video** (Lite = gentle Obsidian-vault first step); route **Full version to a single webinar** booking.
9. **CommunityDocs** — build out the real section (replace placeholder).
10. **FAQ + FinalCTA** — apply rewritten copy; FinalCTA dual CTA (Star on GitHub + Book session).
11. **MobileStickyBar** (`src/components/shared/MobileStickyBar.tsx`) — replace hardcoded "Get RealizeOS" with a translated string.
12. **Navbar** — nav items match final anchors (quickstart, community, …).

## B3. Cleanup & route/CTA correction
1. Remove orphaned sections not in `Home.tsx` (`CaseStudies.tsx`, `HowItWorks.tsx`, `Testimonials.tsx` — verify no imports). Decide on `comparison.ts`/`delivery.ts` (delete if unused or fold comparison into pricing).
2. Legacy public pages tied to the old `$79/$249/$499` + ZIP model (`public/guide-lite.html`, `guide-full.html`, `setup.html`, `thank-you.html`, `venture-worksheet.html`, `public/downloads/*`) — delete or repurpose to the session/community flow.
3. **Venture Wizard gating** (`src/components/wizard/*`, `src/pages/BrandWizardPage.tsx`): gate the live wizard behind the chosen mechanism (see open question) so API cost only accrues for paying users; rate-limit. Free path = email-gated Gem/GPT links.
4. **Webinar routes** (`src/App.tsx`, `WebinarBooking.tsx`): consolidate to a single Full-version booking; **retire `lite`/`setup`** routes; redirect retired aliases.

## B4. Full trilingual parity (EN / HE / PT)
State: EN/HE ~494 keys; **PT ~200 keys behind**; `quickstart` + `community` keys missing in all three (currently hardcoded English fallbacks).
1. Add `quickstart` + `community` groups to EN, plus new B1/B2 keys; remove dead groups (`demoVideo`, `caseStudies`, `comparison`, `howItWorks`, `delivery`, `methodology`).
2. Backfill **HE** to parity (RTL review; design system already swaps to Rubik for `[dir="rtl"]`).
3. Backfill **PT** to parity (largest lift); drop `pres`/`webinar` groups only if those routes are retired.
4. Translate the Venture Wizard (`src/components/wizard/*`) EN/HE/PT (even if gated). Offer Gem/GPT prompts in EN/HE/PT.
5. Add a locale-parity check (extend `update_translations.py`) wired into CI so drift fails the build.

## B5. Design-system polish, accessibility & performance
(`SITE-AUDIT-REPORT.md` scored 67/100, a11y 5/10.)
1. Confirm every section uses `--rz-*` tokens + `.fx-*` primitives; consider exposing the theme toggle.
2. A11y: skip-to-content link, ARIA landmarks (`Section.tsx`), `prefers-reduced-motion` for Framer Motion/`.fx-*`, focus states, alt text.
3. Responsive + perf fixes; lazy-load heavy illustrations; mobile-check the terminal + demo video.
4. SEO/meta: update `index.html` title/description/OG image (`public/img/og-image.png`).
5. Add the **`/design`** route serving the design-system showcase page documented in `SITE-CLAIMS.md` (so the README link resolves).

## Verification
- `npm run build` (regenerates `docs/` for GH Pages) + lint pass.
- `npm run dev`: walk the full page desktop + mobile; no placeholders/"Coming Soon".
- Trilingual: `?lng=he` / `?lng=pt` — zero hardcoded English, correct RTL, parity script passes.
- CTAs land correctly (GitHub, quickstart anchor, TidyCal, consulting mailto); no links to retired routes.
- Claims-vs-`SITE-CLAIMS.md`: install commands work; only shipped capabilities shown as available; roadmap labeled.
- Wizard funnel: Gem/GPT links work + email-gated; live wizard gated (unreachable without entitlement/token).
- Lite vs Full: Lite demo video plays; Full → single webinar booking; retired URLs redirect not 404.
- A11y keyboard pass + reduced-motion honored; deploy preview (`docs/` + `CNAME`) serves correctly.

## Open questions to confirm with the user
1. **Wizard gating mechanism** (B3.3): login/entitlement, post-booking token link, or a password?
2. **Lite demo video** (B2.8): existing recording, or should the agent produce a simple screen capture of the Lite (Obsidian-vault) flow?

## Critical files
`src/pages/Home.tsx`, `src/App.tsx`; `src/components/sections/{Hero,FabricSystem,Features,Founder,UseCases,GetStarted,CommunityDocs,FAQ,FinalCTA,GithubDemo,Navbar}.tsx`; `src/data/{pricing,fabric,features,usecases,faq}.ts`; `src/i18n.ts`, `public/locales/{en,he,pt}/translation.json`, `update_translations.py`; `src/design-system/*`; `src/components/shared/MobileStickyBar.tsx`, `src/components/layout/Section.tsx`; `src/components/wizard/*`, `src/pages/BrandWizardPage.tsx`, `WebinarBooking.tsx`; cleanup targets `src/components/sections/{CaseStudies,HowItWorks,Testimonials}.tsx`, `public/{guide-lite,guide-full,setup,thank-you,venture-worksheet}.html`, `public/downloads/`.

Commit and push to `claude/amazing-albattani-He3xD`. Do NOT open a PR unless asked.
