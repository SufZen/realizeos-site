# Current Focus

> Last updated: 2026-10-12
> Updated by: Claude Code (Opus 5.5)

## Website upgrade to RealizeOS 5.14.0 and the 2026-10 direction

Goal: make realizeos.ai accurate for v5.14.0, aligned with the direction ("Bring any agent. Keep your company's brain. Stay in control, with people who know your field."), useful as a guide, and indexable.

### Done (one PR per phase, stacked — merge in order; each merge to `main` deploys)

| Phase | PR | What |
| --- | --- | --- |
| 1 Correctness | #4 | Offer ladder (free / Audit Sprint €495 / Implementation / Operate), no hard-coded versions, frozen roadmap removed, `/bootcamp` → `/workshops` archive, `/webinar/*` hidden, webinar CTA → YouTube after 20.10, MCP docs updated, `docs/` and logs untracked |
| 2 Positioning | #5 | Homepage rewritten: hero → problem → bring any agent → four layers → AEC field packs (worked example) → control & candor → offer → proof → FAQ; wizard popup translated and AEC-framed |
| 3 Guide | #6 | New: Connect Your Agent (Claude.ai OAuth), Approvals & Trail, Users & Roles, Field Packs, Hebrew & RTL. Updated: Getting Started, Configuration, Self-Hosting, CLI & REST API, Architecture, Integrations |
| 4 FAQ | #7 | 15 fact-checked questions in EN/HE/PT, FAQPage JSON-LD |
| 5 SEO | #8 | Build-time prerender of 24 routes, per-route title/description/canonical/OG, `/he` and `/pt` URLs with hreflang, sitemap.xml, robots.txt, llms.txt, README |

### Left to do

- [ ] After deploy: `curl -I` every URL in the sitemap (expect 200). Check that `/guide` and `/guide/` both resolve on GitHub Pages; if `/guide` redirects, switch canonicals to trailing slashes in `src/seo/lang.ts`.
- [ ] Submit `https://realizeos.ai/sitemap.xml` in Google Search Console.
- [ ] Phase 6: full HE/PT review by a native speaker; cookie banner is English-only; guide pages are English-only (and render RTL when the stored language is Hebrew).
- [ ] After 20.10.2026: confirm the YouTube recording is up (CTAs switch automatically at 21:30 IDT).
- [ ] Owner decisions: keep the Apollo tracker (it costs Lighthouse Best Practices: third-party cookie + console 400)? Remove `legacy/`, `update_translations.py`, `test-analyze-body.json`? Refresh or delete the hidden webinar presentation (it references removed keys).
- [ ] Product repo follow-ups found while writing the guide (see PR #6): `OLLAMA_HOST` vs `OLLAMA_BASE_URL`, `users.yaml` not mounted in compose, `venture create --template` routing, "fails open" wording, install-script image name, stale tool count.
- [ ] Case studies: add more only with owner-approved numbers.
