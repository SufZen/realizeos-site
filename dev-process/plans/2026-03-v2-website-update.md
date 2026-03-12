# Plan 2 — realizeos-site v2.0 Website Update

> **Type**: BMAD MTH-35 Quick Spec → MTH-37 Dev Stories
> **Repo**: `d:\Antigravity\realize-os-site\realizeos-site` (GitHub: `SufZen/realizeos-site`)
> **Status**: Ready for execution
> **Date**: 2026-03-12

---

## Context

### What Is RealizeOS

RealizeOS is an **AI operations platform** with two tiers:
- **Lite** — Obsidian vault + Claude Code/Desktop for non-technical solo entrepreneurs
- **Full** — Python server + FastAPI + Docker + multi-channel gateway for technical users

The core engine just completed **all 13 development phases**. This plan updates the customer-facing website to reflect v2.0 capabilities.

### What Was Already Done

**Plan 1 (Distribution Packages)** is ✅ complete:
- `RealizeOS-Lite-v2.0.zip` (31.1 KB) — uploaded to Google Drive
- `RealizeOS-Full-v2.0.zip` (270.5 KB) — uploaded to Google Drive
- All verification checks passed

**Plan 3 (Frontend Sync)** is ❌ skipped — `realize-os/frontend/` was intentionally moved to this repo and gitignored.

**This document covers Plan 2 only** — the website content update.

---

## Architecture

### Tech Stack
- **Framework**: Vite + React 19 + TypeScript 5.9
- **Styling**: TailwindCSS 3.4 + tailwindcss-animate
- **UI**: Radix UI (Accordion, Dialog, Dropdown), Lucide React icons
- **i18n**: `react-i18next` v16 + `i18next` v25 + `i18next-browser-languagedetector`
- **Animations**: Framer Motion v12

### i18n System (Critical)

All user-facing text is in translation JSONs. **Never hardcode English strings in components.**

```
public/locales/
  en/translation.json    ← English (source of truth)
  he/translation.json    ← Hebrew (RTL)
  pt/translation.json    ← Portuguese
```

Components access text via: `const { t } = useTranslation();` → `t('section.key')`

### Directory Structure

```
src/
  App.tsx                           ← Root app, renders all sections
  i18n.ts                           ← i18next configuration
  index.css                         ← Global styles (Tailwind)
  main.tsx                          ← Entry point
  components/
    illustrations/                  ← SVG React components for features, tiers, etc.
      FeatureCreativePipeline.tsx
      FeatureKBSearch.tsx
      FeatureMultiLLM.tsx
      FeaturePromptAssembly.tsx
      FeatureSelfEvolution.tsx
      FeatureSkills.tsx
      index.ts                      ← Re-exports all illustrations
    layout/
      Logo.tsx, Footer.tsx, Navbar.tsx, LanguageSwitcher.tsx
    sections/
      Hero.tsx                      ← Hero with stats bar
      Features.tsx                  ← Feature cards grid with accordion
      Pricing.tsx                   ← Lite vs Full tiers
      Delivery.tsx                  ← "What's included" breakdown
      FAQ.tsx                       ← Accordion FAQ
      ...more sections
    shared/                         ← Reusable components
    ui/                             ← shadcn/ui primitives
    wizard/                         ← Onboarding wizard
  data/
    features.ts                     ← Feature data (uses i18n keys)
    pricing.ts                      ← Pricing tiers (uses i18n keys)
    delivery.ts                     ← Delivery details (hardcoded fallback)
  hooks/
    useFeatures.ts (or similar)     ← Hook returning translated features
```

---

## Tier Feature Matrix (Source of Truth)

All content changes derive from this matrix. Read it carefully before editing.

| Capability | Lite | Full | v2.0 Status |
|-----------|:----:|:----:|-------------|
| FABRIC vault structure | ✅ | ✅ | unchanged |
| 4 agent templates | ✅ | ✅ | unchanged |
| Brand identity & voice wizards | ✅ | ✅ | unchanged |
| **Brand Worksheet (130-line wizard)** | ✅ | ✅ | **NEW** |
| **6 skill workflows** (was 2) | ✅ | ✅ | **NEW** |
| **3 shared methods** | ✅ | ✅ | **NEW** |
| Enhanced CLAUDE.md (155 lines) | ✅ | ✅ | **UPGRADED** |
| Setup guide | ✅ | ✅ | unchanged |
| Multi-LLM routing (4 providers, 20+ models) | -- | ✅ | **UPGRADED** |
| **4 routing strategies** | -- | ✅ | **NEW** |
| 9 task modalities + classifier | -- | ✅ | **NEW** |
| Cost tracking per call | -- | ✅ | **NEW** |
| Workflow engine (7 node types + triggers) | -- | ✅ | **NEW** |
| **WhatsApp, Web/WebSocket, Webhooks, Scheduler channels** | -- | ✅ | **NEW** |
| REST API + Telegram | -- | ✅ | unchanged |
| **Tool SDK (7 categories, MCP)** | -- | ✅ | **NEW** |
| **Security: RBAC, encrypted vault, audit logging** | -- | ✅ | **NEW** |
| **Media processing (vision, transcription, gen)** | -- | ✅ | **NEW** |
| Auto-evolution (5 types, risk, rollback) | -- | ✅ | **UPGRADED** |
| **8 industry templates** (was 5) | -- | ✅ | **UPGRADED** |
| **CI/CD (GitHub Actions + pytest)** | -- | ✅ | **NEW** |
| **Tests (20+ files, 70%+ coverage)** | -- | ✅ | **NEW** |

---

## Dev Stories

Execute in order. Each story follows BMAD MTH-37: Load Context → Plan → Implement → Self-Review → Verify → Document.

---

### Story A1: EN Pricing & Delivery

**Goal**: Update English pricing features and delivery items to match v2.0 matrix.

#### Files to Modify

**1. `public/locales/en/translation.json`**

**`pricing.tiers.lite.features`** — update array to 8 items:
```diff
 Current (approximate, verify by reading file):
-"Brand identity & voice wizards",
-"Skill workflows (YAML-defined pipelines)",
-"CLAUDE.md for Claude Code integration",
 Replace with:
+"Brand identity & voice wizards + interactive Brand Worksheet",
+"6 skill workflows (proposals, campaigns, social, reviews, content, research)",
+"3 shared methods (competitive analysis, content repurposing, decision framework)",
+"Enhanced CLAUDE.md protocol (155 lines)",
```
Total should be 8 items. Read the current file first to understand the exact structure.

**`pricing.tiers.full.features.list`** — update to 14 items:
- Replace generic LLM line → `"Provider-agnostic LLM routing (Claude, Gemini, OpenAI, Ollama)"`
- Add `"20+ models with 4 routing strategies (cost, quality, balanced, speed)"`
- Replace skill executor → `"Workflow engine with 7 node types + triggers"`
- Replace channels → `"Multi-channel: WhatsApp, Web/WebSocket, Webhooks, Scheduler"`
- Replace evolution → `"Auto-evolution engine with risk assessment & rollback"`
- Replace CLI line → `"CLI scaffolding + dev process templates"`
- Add: `"Tool SDK & extensibility framework"`
- Add: `"Security: RBAC, encrypted vault, audit logging"`
- Add: `"Media processing (image analysis, transcription, generation)"`
- Add: `"CI/CD pipeline (GitHub Actions + pytest)"`

**`delivery.models.lite.items`** — update:
- `"2 skill workflows"` → `"6 skill workflows"` with updated description
- Add Brand Worksheet item, 3 shared methods item
- Update CLAUDE.md to "155-line enhanced protocol"

**`delivery.models.full.items`** — update:
- `"8,800+ lines"` → `"11,000+ lines"`
- `"REST API + Telegram"` → `"5 channels (REST, Telegram, WhatsApp, Web/WebSocket, Webhooks) + Scheduler"`
- `"5 industry templates"` → `"8 industry templates (+ freelance, coaching, accounting)"`
- Add Security, Tool SDK, Media processing items

**2. `src/data/delivery.ts`** — Mirror the delivery changes as hardcoded fallback data.

#### Acceptance Criteria
- [ ] EN translation JSON has 8 Lite features, 14 Full features
- [ ] Delivery models updated for both tiers
- [ ] `delivery.ts` fallback data matches translation JSON
- [ ] `npm run build` passes

---

### Story A2: EN Features (6 → 8)

**Goal**: Add Multi-Channel Gateway and Enterprise Security as new feature cards.

#### Files to Modify

**1. `public/locales/en/translation.json`**

Update existing technical descriptions:
- `features.routing.technical` → mention 4 providers, 20+ models, 4 strategies
- `features.execution.technical` → mention 7 node types, triggers
- `features.evolution.technical` → mention 5 types, risk assessment, rollback

Add 2 new feature keys under `features`:
```json
"multichannel": {
  "title": "Multi-Channel Gateway",
  "promise": "Reach your AI team from anywhere — WhatsApp, Web, Webhooks, or scheduled tasks. One brain, every channel.",
  "technical": "5 channel adapters: REST API, Telegram, WhatsApp Cloud API, Web/WebSocket, Webhooks (HMAC-signed). Plus cron-based scheduler. Channel-agnostic message routing with attachment handling."
},
"security": {
  "title": "Enterprise Security",
  "promise": "Multi-user access control, encrypted credentials, audit trails. Your AI operations, secured.",
  "technical": "Role-based access control with 16 permissions across 5 default roles. AES-256 encrypted credential vault. Full audit logging with structured events. Prompt injection detection and filtering."
}
```

**2. `src/data/features.ts`**

Add 2 entries to the `useFeatures()` return array:
```typescript
{ icon: Radio, key: 'multichannel' },
{ icon: Shield, key: 'security' },
```
Import `Radio` and `Shield` from `lucide-react`.

**3. `src/components/sections/Features.tsx`**

- Change grid: `lg:grid-cols-3` → `lg:grid-cols-4` for 2×4 layout
- If feature cards reference illustration components, add mappings for the 2 new features (may use Lucide icon fallback if no SVG illustration exists — check `src/components/illustrations/index.ts`)

#### Acceptance Criteria
- [ ] 8 feature keys in EN translation JSON (6 existing + multichannel + security)
- [ ] `features.ts` returns 8 entries from `useFeatures()`
- [ ] Grid shows 2 rows × 4 columns on desktop
- [ ] New feature cards render with icons and expandable technical details
- [ ] `npm run build` passes

---

### Story A3: EN Hero Stats & FAQ

**Goal**: Update hero bar to show 4 capability stats. Update relevant FAQ answers.

#### Files to Modify

**1. `src/components/sections/Hero.tsx`**

Update the stats array (currently 3 stats, need 4):
```typescript
const stats = [
  { value: 20, suffix: '+', label: t('hero.stats.models') },
  { value: 5, suffix: '', label: t('hero.stats.channels') },
  { value: 13, suffix: '', label: t('hero.stats.tools') },
  { value: 4, suffix: '', label: t('hero.stats.strategies') },
];
```

**2. `public/locales/en/translation.json`**

Add/update `hero.stats` keys:
```json
"hero": {
  "stats": {
    "models": "AI Models",
    "channels": "Channels",
    "tools": "Tools",
    "strategies": "Routing Strategies"
  }
}
```

Update FAQ items:
- `faq.items[0]` (requirements): Mention OpenAI and Ollama for Full tier
- `faq.items[2]` (AI models): 4 providers, 20+ models, 4 routing strategies
- `faq.items[3]` (privacy): RBAC, encrypted vault, Ollama for local inference

#### Acceptance Criteria
- [ ] Hero shows 4 stats: 20+ models, 5 channels, 13 tools, 4 strategies
- [ ] FAQ answers updated with v2.0 specifics
- [ ] `npm run build` passes

---

### Story A4: Hebrew Translation

**Goal**: Mirror ALL A1–A3 changes in Hebrew (`he/translation.json`).

#### Files to Modify

**1. `public/locales/he/translation.json`**

Mirror every change from Stories A1–A3:
- 8 Lite pricing features (Hebrew)
- 14 Full pricing features (Hebrew)
- Delivery model updates (Hebrew)
- 2 new feature keys: multichannel + security (Hebrew)
- Updated technical descriptions (Hebrew)
- Hero stats labels (Hebrew)
- FAQ updates (Hebrew)

> [!IMPORTANT]
> Hebrew is RTL. The translation JSON handles this — just provide correct Hebrew text. No layout changes needed.

#### Acceptance Criteria
- [ ] All new/updated keys present in HE translation
- [ ] Zero missing i18n key warnings in browser console when switching to Hebrew
- [ ] Hebrew text reads naturally (not machine-translated)
- [ ] `npm run build` passes

---

### Story A5: Portuguese Translation

**Goal**: Mirror ALL A1–A3 changes in Portuguese (`pt/translation.json`).

#### Files to Modify

**1. `public/locales/pt/translation.json`**

Mirror every change from Stories A1–A3 — same scope as A4 but in Portuguese.

#### Acceptance Criteria
- [ ] All new/updated keys present in PT translation
- [ ] Zero missing i18n key warnings in browser console when switching to Portuguese
- [ ] Portuguese text reads naturally
- [ ] `npm run build` passes

---

### Story A6: Build & Visual Verification

**Goal**: Full build + visual verification across all 3 languages.

#### Steps

**1. Build test**:
```bash
cd d:\Antigravity\realize-os-site\realizeos-site
npm run build
```
Pass: zero TypeScript errors.

**2. Start dev server**:
```bash
npm run dev
```

**3. Visual verification checklist** (check in browser):

| Section | Check | Expected |
|---------|-------|----------|
| Hero | Stats bar | 4 stats: 20+ models, 5 channels, 13 tools, 4 strategies |
| Pricing Lite | Features | 8 items (Brand Worksheet, 6 workflows, 3 methods, CLAUDE.md 155 lines) |
| Pricing Full | Features | 14 items under "Everything in Lite, plus:" |
| Features | Grid | 8 cards in 2×4 grid, includes Multi-Channel + Security |
| Features | Accordion | Each card expands to show technical details |
| Delivery Lite | Items | 6 workflows, brand worksheet, shared methods |
| Delivery Full | Items | 11K+ lines, 5 channels, security, tool SDK, media |
| FAQ #1 | Answer | Mentions OpenAI and Ollama |
| FAQ #3 | Answer | 4 providers, 20+ models, 4 strategies |
| FAQ #4 | Answer | RBAC, encrypted vault, Ollama |
| 🇮🇱 Hebrew | All above | Toggle language → verify no missing keys, RTL correct |
| 🇧🇷 Portuguese | All above | Toggle language → verify no missing keys |
| Console | Warnings | Zero `i18n::translator` warnings |

#### Acceptance Criteria
- [ ] `npm run build` succeeds with zero errors
- [ ] All checklist items verified in English
- [ ] Hebrew: no missing keys, RTL layout correct
- [ ] Portuguese: no missing keys
- [ ] Zero console warnings related to i18n

---

## Reference Files

These files contain the detailed specifications. **Read them during Story context loading (MTH-37 Step 1)**:

| File | What It Contains | When to Read |
|------|-----------------|-------------|
| `d:\Antigravity\realize-os\docs\dev-process\plans\2026-03-v2-website-packages-update.md` | The full v2.0 update plan with exact copy and acceptance criteria | Before starting any story |
| `public/locales/en/translation.json` | Current English content (source of truth) | Before A1 |
| `public/locales/he/translation.json` | Current Hebrew content | Before A4 |
| `public/locales/pt/translation.json` | Current Portuguese content | Before A5 |
| `src/data/features.ts` | Feature data model + `useFeatures()` hook | Before A2 |
| `src/data/delivery.ts` | Delivery fallback data | Before A1 |
| `src/data/pricing.ts` | Pricing tier data structure | Before A1 |
| `src/components/sections/Features.tsx` | Features grid component | Before A2 |
| `src/components/sections/Hero.tsx` | Hero section with stats | Before A3 |
| `src/components/illustrations/index.ts` | Illustration component exports | Before A2 (check for new illustrations) |

---

## BMAD Framework Reference

This project follows the **BMAD-inspired development framework**:

- **Framework files**: `D:\Antigravity\BMAD`
- **Workflow**: MTH-37 Dev Story (Load Context → Plan → Implement → Self-Review → Verify → Document)
- **Code Review**: MTH-22 checklist (acceptance criteria met, conventions followed, no anti-patterns)

### Conventions (from project-context.md)
- **Naming**: camelCase for JS/TS
- **Git**: conventional commits (`feat:`, `fix:`, `docs:`)
- **Testing**: run `npm run build` after each story as minimum quality gate
