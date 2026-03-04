# RealizeOS Tutorial Video Plan

## Production Toolstack (Minimal, API-Connected)

| Tool | Purpose | Access Method |
|------|---------|---------------|
| **Descript** | Screen recording, editing, English narration, Hebrew/Portuguese subtitles, GIF export | Desktop app (manual) |
| **Veo 3** (Google) | AI-generated video clips (animations, motion graphics, explainers) | Gemini API / AI Studio |
| **Imagen 3** (Google) | Title cards, thumbnails, illustrations, text overlays, logos | Gemini API / AI Studio |
| **Gemini 3.1** | Script refinement, subtitle translation verification, prompt generation for Veo/Imagen | Gemini API (already integrated) |

**Why this stack:** 3 tools total (1 manual + 2 API). All Google AI tools accessible via the same API key you already have. Veo 3 and Imagen 3 can be orchestrated from Claude Code via MCP or direct API calls, maintaining consistency across all generated assets. Gemini 3.1 handles script/prompt refinement and subtitle QA.

**Visual consistency rules for AI-generated assets:**
- Background: #0e0e18 (dark, matches site)
- Accent: #ffcc00 (gold)
- Font rendering: Poppins for titles, JetBrains Mono for code
- Style prompt prefix for all Veo/Imagen calls: "Professional dark tech aesthetic, deep navy-black background (#0e0e18), gold (#ffcc00) accent highlights, clean minimalist design, no cartoons, no stock photo look"

**Philosophy: AI-first, screen recording only when essential.** Record the screen only when the user MUST see the real UI to follow along (installations with gotchas, real CLI output, Obsidian navigation). Everything else -- title cards, transitions, concept explainers, Mac notes, comparison graphics, diagrams -- is AI-generated.

---

## Video Inventory by User Journey Phase

### PHASE 0: PRE-PURCHASE (Landing Page)

---

#### Video 0.1: Product Demo Reel
- **Priority**: P1 (must-have)
- **Duration**: ~2:00 (compressed from 3:00 -- cut filler, tighter pacing)
- **Audience**: All prospects
- **Placement**: `src/components/sections/DemoVideo.tsx`

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:08 | Gold particles resolve into RealizeOS logo + tagline | "What if your AI tools worked together -- as a team -- in your voice, on your machine?" | AI video | **Veo 3** |
| 0:08-0:25 | Screen: Obsidian FABRIC folders + CLAUDE.md. Quick scroll. | "Six folders. One structure called FABRIC. Everything your AI team needs." | Screen rec | **Descript** |
| 0:25-0:45 | Screen: PowerShell -> `claude` -> type prompt -> output streams matching brand voice | "Launch Claude Code. Output matches your voice rules. Not generic AI. Your AI." | Screen rec | **Descript** |
| 0:45-1:00 | Screen: Reviewer agent scores output (brand alignment, clarity) | "Built-in quality gate. The Reviewer checks everything." | Screen rec | **Descript** |
| 1:00-1:15 | Animated LLM routing diagram (3 nodes, flowing arrows) | "Full edition routes each request to the optimal model automatically." | AI video | **Veo 3** |
| 1:15-1:35 | Screen: `docker compose up` -> health check -> Telegram bot response | "One command to deploy. REST API, Telegram, Google Workspace." | Screen rec | **Descript** |
| 1:35-1:50 | Animated comparison: 3 columns with prices, RealizeOS glows gold | "One purchase. Own it forever." | AI graphic + animation | **Imagen 3 + Descript** (ken-burns on static) |
| 1:50-2:00 | CTA with pricing | "Lite $79. Full $249. Start today." | AI graphic | **Imagen 3** |

---

#### Video 0.2: What is FABRIC?
- **Priority**: P2
- **Duration**: ~1:00 (compressed from 1:30 -- one concept per 8 seconds)
- **Audience**: Both
- **Placement**: FABRIC section on landing page

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:08 | Six golden hexagonal tiles appear: F-A-B-R-I-C | "FABRIC organizes everything your AI team needs." | AI video | **Veo 3** |
| 0:08-0:18 | F expands: brand files. A expands: 4 agent cards. | "Foundations define your voice. Agents are your AI team." | AI video | **Veo 3** |
| 0:18-0:28 | B expands: knowledge docs. R expands: workflow diagram. | "Brain holds domain knowledge. Routines chain agents together." | AI video | **Veo 3** |
| 0:28-0:38 | I expands: learning loop. C expands: output files. | "Insights learn from usage. Creations are your deliverables." | AI video | **Veo 3** |
| 0:38-0:48 | All tiles reassemble into grid. | "Six folders. One intelligence." | AI video | **Veo 3** |
| 0:48-1:00 | RealizeOS logo + CTA | "That is FABRIC." | AI graphic | **Imagen 3** |

**Full AI-generated video.** Generate as 2-3 Veo 3 clips, assemble in Descript with narration.

---

### PHASE 1: POST-PURCHASE (Thank-You Page)

---

#### Video 1.1: Welcome and Next Steps
- **Priority**: P1
- **Duration**: ~1:00 (compressed from 2:00 -- just the essentials)
- **Audience**: Both
- **Placement**: `public/thank-you.html`

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:10 | Welcome card with edition name + "Your files are ready" | "Welcome to RealizeOS. Here's what to do." | AI graphic | **Imagen 3** |
| 0:10-0:25 | Screen: Click download -> show ZIP -> click Interactive Setup | "Download your package. Then open Interactive Setup." | Screen rec | **Descript** |
| 0:25-0:40 | Screen: Brand Worksheet link -> first question loads | "Start with the Brand Worksheet -- ten minutes, three files." | Screen rec | **Descript** |
| 0:40-0:50 | Timeline graphic: Day 3, 7, 14 milestones | "Onboarding emails arrive over the next two weeks." | AI graphic | **Imagen 3** |
| 0:50-1:00 | Community links card (Telegram + WhatsApp) | "Join the community. Real people, fast help." | AI graphic | **Imagen 3** |

---

### PHASE 2: LITE EDITION SETUP

---

#### Video 2.0: Opening a Terminal
- **Priority**: P1
- **Format**: GIF only (no video needed)
- **Duration**: ~8 seconds per GIF
- **Audience**: Lite (non-technical)

| Scene | Visual | Method | Tool |
|-------|--------|--------|------|
| Windows GIF | Right-click Start -> PowerShell -> blue window + "This is PowerShell" text | Screen rec -> GIF | **Descript** |
| Mac note | Static card: "Mac: Cmd+Space -> Terminal -> Enter" | AI graphic | **Imagen 3** |

---

#### Video 2.1: Installing Obsidian + Node.js + Claude Code
- **Priority**: P1
- **Duration**: ~2:00 (merged Videos 2.1 + 2.2 -- both are simple installs, no need for separate videos)
- **Audience**: Lite

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:05 | Title: "Install 3 Tools" | "Three tools. Two minutes." | AI graphic | **Imagen 3** |
| 0:05-0:20 | Screen: obsidian.md/download -> click Windows -> run installer -> done | "Obsidian: download, install, done." | Screen rec | **Descript** |
| 0:20-0:45 | Screen: nodejs.org -> download LTS -> run installer -> **ZOOM on "Add to PATH" checkbox** -> finish | "Node.js: download, install. CHECK 'Add to PATH.' Most common mistake." | Screen rec -- Descript zoom annotation on checkbox | **Descript** |
| 0:45-1:00 | Screen: Close + reopen PowerShell -> `node --version` -> shows version | "Close terminal, reopen. Verify: node dash-dash-version." | Screen rec | **Descript** |
| 1:00-1:20 | Screen: `npm install -g @anthropic-ai/claude-code` -> progress -> `claude --version` | "Install Claude Code globally. Verify: claude dash-dash-version." | Screen rec | **Descript** |
| 1:20-1:35 | Mac note card | "Mac: brew install node, then same npm command" | AI graphic | **Imagen 3** |
| 1:35-1:50 | Screen: setup.html checklist -> check items | "Check off both items in the setup guide." | Screen rec | **Descript** |
| 1:50-2:00 | Transition: "Next: Open Your Vault" | | AI graphic | **Imagen 3** |

**Key value of screen recording here:** The "Add to PATH" checkbox is invisible to users who don't know to look for it. Zooming + circling it in a real installer window is worth more than any text description.

---

#### Video 2.2: Download and Open Vault in Obsidian
- **Priority**: P1
- **Duration**: ~1:15 (compressed from 2:00 -- cut CLAUDE.md exploration, focus on action)
- **Audience**: Lite

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:15 | Screen: Click download -> ZIP appears in Downloads | "Download your package from the setup page." | Screen rec | **Descript** |
| 0:15-0:30 | Screen: Extract ZIP to Documents (NOT cloud folders) | "Extract to Documents. Not OneDrive, not iCloud." | Screen rec + Descript annotation "NOT cloud folders" | **Descript** |
| 0:30-0:50 | Screen: Obsidian -> "Open folder as vault" -> select folder -> FABRIC appears | "Open folder as vault. Select realize_lite. FABRIC folders appear." | Screen rec | **Descript** |
| 0:50-1:05 | Screen: Quick tour -- click each FABRIC folder (2 sec each) | "Foundations, Agents, Brain, Routines, Insights, Creations." | Screen rec | **Descript** |
| 1:05-1:15 | Transition: "Next: Define Your Brand" | | AI graphic | **Imagen 3** |

**Key value:** Seeing "Open folder as vault" in the real Obsidian UI is critical. Users who've never used Obsidian don't know where this option is.

---

#### Video 2.3: Brand Discovery Worksheet
- **Priority**: P1
- **Duration**: ~2:30 (compressed from 4:00 -- cut redundant typing, show pre-filled fast)
- **Audience**: Both

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:10 | Screen: Open brand-worksheet.html | "Ten questions. Ten minutes. Three files your AI team uses for everything." | Screen rec | **Descript** |
| 0:10-0:25 | Screen: Fill name/role with specific example (speed up typing) | "Be specific. What you build, who you serve." | Screen rec -- Descript speed-up on typing | **Descript** |
| 0:25-0:40 | Screen: Strengths + gaps (speed up typing) | "Strengths the AI amplifies. Gaps it fills." | Screen rec -- speed-up | **Descript** |
| 0:40-0:55 | Screen: Business name, mission, UVP template | "If you can't fit your UVP in one sentence, refine it." | Screen rec | **Descript** |
| 0:55-1:20 | Screen: Voice section -- tone + vocabulary (USE/AVOID) | "Describe your tone like a person. The AVOID list is more powerful than USE." | Screen rec | **Descript** |
| 1:20-1:40 | Screen: Good example paste + anti-example paste | "One real paragraph you wrote. One anti-example. Contrast teaches boundaries." | Screen rec | **Descript** |
| 1:40-2:00 | Screen: Export -> three files -> click Copy | "Three files generated. Copy each one." | Screen rec | **Descript** |
| 2:00-2:20 | Screen: Switch to Obsidian -> paste into 3 files | "Paste into the matching vault files. Save." | Screen rec | **Descript** |
| 2:20-2:30 | Transition: "Brand defined. Let's test it." | | AI graphic | **Imagen 3** |

**100% screen recording** -- the value IS showing the real form. Speed up typing segments to save time.

---

#### Video 2.4: First Conversation with Claude Code
- **Priority**: P1
- **Duration**: ~1:30 (compressed from 2:30 -- cut the alternative prompt, focus on the "wow" moment)
- **Audience**: Lite

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:15 | Screen: File Explorer -> address bar -> "powershell" -> opens in vault | "Navigate to your vault. Type powershell in the address bar." | Screen rec | **Descript** |
| 0:15-0:30 | Screen: Type `claude` -> initialization | "Type claude. It reads your knowledge base automatically." | Screen rec | **Descript** |
| 0:30-0:55 | Screen: Type prompt -> output streams -> highlight matching voice rules with annotations | "Watch: short paragraphs, your vocabulary, no banned words. Not generic AI. Your AI." | Screen rec + Descript annotations (circles on matching elements) | **Descript** |
| 0:55-1:15 | Screen: "Review the post" -> Reviewer scores | "Ask for a review. Four-dimension score. Below 8? Add more voice rules." | Screen rec | **Descript** |
| 1:15-1:30 | Celebration card: "Your RealizeOS Lite is Live" | "You're running." | AI graphic | **Imagen 3** |

**Must be screen recorded** -- seeing real Claude Code output matching your brand voice is the "aha" moment. This can't be AI-generated.

---

### PHASE 3: FULL EDITION SETUP

---

#### Video 3.1: Prerequisites (Python + Docker + Git)
- **Priority**: P1
- **Duration**: ~2:00 (merged 3.1 + 3.2 -- all installs in one video)
- **Audience**: Full

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:05 | Title: "3 Prerequisites" | "Three installs. Two minutes." | AI graphic | **Imagen 3** |
| 0:05-0:25 | Screen: python.org -> download -> run installer -> **ZOOM "Add to PATH"** -> finish | "Python: download, install. CHECK 'Add to PATH.' Number one mistake." | Screen rec -- Descript zoom on checkbox | **Descript** |
| 0:25-0:35 | Screen: PowerShell -> `python --version` -> shows 3.11+ | "Verify: python dash-dash-version." | Screen rec | **Descript** |
| 0:35-0:55 | Screen: docker.com -> download -> run installer -> accept WSL2 | "Docker: download, install. Accept WSL2 if prompted. May require restart." | Screen rec -- Descript annotation: "WSL2 = required" | **Descript** |
| 0:55-1:10 | Screen: Docker Desktop running -> `docker --version` | "Wait for whale icon. Verify: docker dash-dash-version." | Screen rec | **Descript** |
| 1:10-1:25 | Screen: `git --version` (usually pre-installed on modern Windows) | "Git: usually already installed. Verify: git dash-dash-version. If not, download from git-scm.com." | Screen rec | **Descript** |
| 1:25-1:40 | Mac notes card | "Mac: brew install python@3.11 docker git" | AI graphic | **Imagen 3** |
| 1:40-1:50 | Screen: setup.html checklist -> check all 3 | "Check all three in the setup guide." | Screen rec | **Descript** |
| 1:50-2:00 | Transition: "Next: API Keys" | | AI graphic | **Imagen 3** |

**Screen recording essential for:** PATH checkbox zoom (Python), WSL2 prompt (Docker). Rest could be AI-generated but consistency is better with one continuous recording.

---

#### Video 3.2: Getting API Keys
- **Priority**: P1
- **Duration**: ~1:30 (compressed from 3:00 -- tighter pacing, cut billing details)
- **Audience**: Full

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:08 | Title: "2 API Keys. 2 Minutes." with key icons | "One required. One recommended." | AI graphic | **Imagen 3** |
| 0:08-0:30 | Screen: console.anthropic.com -> API Keys -> Create Key -> copy | "Anthropic: Create Key, name it realizeos, copy immediately." | Screen rec | **Descript** |
| 0:30-0:40 | Screen: Billing -> add $5 credit | "Add $5 credit. Pay-as-you-go." | Screen rec | **Descript** |
| 0:40-1:00 | Screen: aistudio.google.com/apikey -> Create Key -> copy | "Google AI: Create API Key, copy. Gemini Flash free tier." | Screen rec | **Descript** |
| 1:00-1:15 | Security warning card: lock icon, "Never commit keys to git" | "Treat like passwords. Never share publicly." | AI graphic | **Imagen 3** |
| 1:15-1:30 | Checklist + transition: "Next: Clone & Deploy" | | AI graphic + screen rec | **Imagen 3** |

**Screen recording essential for:** Showing exact navigation through Anthropic console and Google AI Studio -- UIs change frequently and users need to see the real thing.

---

#### Video 3.3: Clone, Configure, Deploy
- **Priority**: P1
- **Duration**: ~2:30 (compressed from 4:00 -- time-lapse Docker build, cut second test)
- **Audience**: Full

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:15 | Screen: `git clone ...` -> `cd realize-os` | "Clone and enter the directory." | Screen rec | **Descript** |
| 0:15-0:35 | Screen: `cp .env.example .env` -> open in editor -> paste keys -> ZOOM on format | "No spaces around equals. No quotes. Most common .env mistakes." | Screen rec -- Descript zoom annotations | **Descript** |
| 0:35-0:50 | Screen: `python cli.py init --template consulting` | "Initialize from a template. Consulting, agency, multi-venture, saas, ecommerce." | Screen rec | **Descript** |
| 0:50-1:15 | Screen: `docker compose up --build` -> time-lapse the build (4x speed) | "Docker builds on first run. Takes a few minutes." | Screen rec -- Descript 4x speed-up | **Descript** |
| 1:15-1:30 | Screen: "Server running at localhost:8080" highlighted | "Server running. You're live." | Screen rec -- Descript highlight | **Descript** |
| 1:30-1:50 | Screen: `curl localhost:8080/status` -> JSON "healthy" | "Health check: healthy." | Screen rec | **Descript** |
| 1:50-2:10 | Screen: curl chat test -> response references brand | "If it references your brand, it works end to end." | Screen rec | **Descript** |
| 2:10-2:20 | Screen: setup.html checklist complete | "Check everything off." | Screen rec | **Descript** |
| 2:20-2:30 | "RealizeOS Full is Live" celebration card | "Your engine is running." | AI graphic | **Imagen 3** |

**100% screen recording** (except final card) -- users need to see real terminal output at every step.

---

### PHASE 4: ONGOING USE (Both Editions)

---

#### Video 4.1: Brand Voice Calibration
- **Priority**: P2 (first month)
- **Duration**: ~1:30 (compressed from 3:00 -- show bad vs good, one test cycle)
- **Audience**: Both

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:15 | Split screen: LEFT = bad rules ("Be professional"), RIGHT = good rules (specific tone, vocabulary, anti-patterns) | "Bad rules produce generic output. Good rules produce your voice." | AI graphic -- Imagen 3 split comparison card | **Imagen 3** |
| 0:15-0:35 | Screen: brand-voice.md in Obsidian. Write specific rules: tone, vocabulary USE/AVOID, formatting, anti-patterns | "Specific. Measurable. Add anti-patterns -- what you NEVER say." | Screen rec | **Descript** |
| 0:35-0:55 | Screen: Claude Code test prompt -> output -> annotate matching elements | "Test. Short paragraphs? Check. Brand vocabulary? Check." | Screen rec + Descript annotations | **Descript** |
| 0:55-1:15 | Screen: Adjust one rule, test again, show improvement | "One rule at a time. Test, adjust, repeat." | Screen rec | **Descript** |
| 1:15-1:30 | Tip card: "3-5 tests/day. Day 3 = your voice." | "By day three, it sounds like you." | AI graphic | **Imagen 3** |

---

#### Video 4.2: FABRIC Folder Tour
- **Priority**: P2
- **Duration**: ~1:00 (compressed from 2:00 -- rapid tour, one sentence per folder)
- **Audience**: Both

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:08 | Animated FABRIC diagram (same style as Video 0.2, abbreviated) | "Six folders. Here's what goes where." | AI graphic or reuse 0.2 clip | **Veo 3 / Imagen 3** |
| 0:08-0:45 | Screen: Obsidian -- click each folder (6 sec each), open one file in each | "Foundations: brand. Agents: team. Brain: knowledge. Routines: workflows. Insights: learning. Creations: output." | Screen rec | **Descript** |
| 0:45-1:00 | Summary card: "Add to B. Customize A. Build in R." | "Add knowledge to Brain. Customize Agents. Build Routines." | AI graphic | **Imagen 3** |

---

#### Video 4.3: Adding Knowledge to the Brain
- **Priority**: P2
- **Duration**: ~1:00 (compressed from 2:00 -- show one file creation + one test)
- **Audience**: Both

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:10 | Screen: B-brain folder in Obsidian | "Brain: knowledge your AI team references." | Screen rec | **Descript** |
| 0:10-0:30 | Screen: Create file, add headers + content, save | "Create a markdown file. Clear headers. Specific content." | Screen rec -- speed up typing | **Descript** |
| 0:30-0:50 | Screen: Claude Code query referencing the new file | "Ask about it. The AI references what you just wrote." | Screen rec | **Descript** |
| 0:50-1:00 | Tip: "Full edition: run `python cli.py index` after adding files" | "Full edition: reindex after adding files." | AI graphic | **Imagen 3** |

---

#### Video 4.4: YAML Skill Workflows
- **Priority**: P3
- **Duration**: ~2:00 (compressed from 3:30)
- **Audience**: Both

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:15 | AI diagram: workflow pipeline (trigger -> agent1 -> agent2 -> output) | "Workflows chain agents together automatically." | AI graphic | **Imagen 3** |
| 0:15-0:45 | Screen: Open existing workflow YAML. Annotate sections. | "Trigger, steps, agents, output. YAML defines the pipeline." | Screen rec + Descript annotations | **Descript** |
| 0:45-1:20 | Screen: Create new workflow from scratch, save | "Build one: weekly digest. Writer drafts, Reviewer checks." | Screen rec -- speed up typing | **Descript** |
| 1:20-2:00 | Screen: Trigger workflow, watch multi-step output | "Trigger it. Watch agents hand off work." | Screen rec | **Descript** |

---

#### Video 4.5: Google Workspace Connection
- **Priority**: P3
- **Duration**: ~2:00 (compressed from 3:00)
- **Audience**: Full

| Time | Visual | Narration | Method | Tool |
|------|--------|-----------|--------|------|
| 0:00-0:10 | Google tools grid graphic (13 icons) | "Thirteen Google tools. Five minutes to connect." | AI graphic | **Imagen 3** |
| 0:10-0:40 | Screen: Google Cloud Console -> create project -> enable APIs | "Create project, enable Gmail, Calendar, Drive." | Screen rec | **Descript** |
| 0:40-1:10 | Screen: OAuth credentials -> download -> add to .env | "Create credentials, add to your .env." | Screen rec | **Descript** |
| 1:10-1:40 | Screen: Test "check my calendar" -> response | "Test with a real request." | Screen rec | **Descript** |
| 1:40-2:00 | Summary: "Gmail, Calendar, Drive, Sheets, Docs + 8 more" | "All thirteen tools now available to your agents." | AI graphic | **Imagen 3** |

---

### PHASE 5: GIF INVENTORY

All GIFs are screen recordings exported as GIF from Descript.

| ID | Description | Priority | Tool |
|----|-------------|----------|------|
| G.1 | Click "Copy" -> "Copied!" feedback | P1 | **Descript** |
| G.2 | Click checklist item -> gold checkmark | P1 | **Descript** |
| G.3 | Obsidian: Open vault -> FABRIC appears | P1 | **Descript** |
| G.4 | Switch Lite/Full tab -> content changes | P2 | **Descript** |
| G.5 | Switch macOS/Windows tab -> commands change | P2 | **Descript** |
| G.6 | Terminal: `claude` -> initialization | P1 | **Descript** |
| G.7 | Brand Wizard: Copy -> Obsidian -> paste | P2 | **Descript** |

---

## Priority Summary

### P1 -- Must-Have for Launch (9 videos + 4 GIFs)

| ID | Title | Duration | Screen Rec % | AI-Generated % |
|----|-------|----------|-------------|----------------|
| 0.1 | Product Demo Reel | 2:00 | 60% | 40% (Veo 3 + Imagen 3) |
| 1.1 | Welcome & Next Steps | 1:00 | 50% | 50% (Imagen 3 cards) |
| 2.0 | Opening a Terminal | 8 sec GIF | 100% | Mac note = Imagen 3 |
| 2.1 | Install Obsidian + Node.js + Claude Code | 2:00 | 80% | 20% (Imagen 3 cards) |
| 2.2 | Download & Open Vault | 1:15 | 90% | 10% (transition card) |
| 2.3 | Brand Discovery Worksheet | 2:30 | 95% | 5% (transition card) |
| 2.4 | First Conversation | 1:30 | 90% | 10% (celebration card) |
| 3.1 | Prerequisites (Python + Docker + Git) | 2:00 | 80% | 20% (Mac note + transition) |
| 3.2 | Getting API Keys | 1:30 | 65% | 35% (title + warning + transition) |
| 3.3 | Clone, Configure, Deploy | 2:30 | 95% | 5% (celebration card) |

**Total P1 screen recording: ~16 minutes** (down from ~29 minutes)
**Total P1 video content: ~17 minutes**
**P1 AI-generated assets needed: ~15 Imagen 3 graphics + 3 Veo 3 clips**

### P2 -- First Month (4 videos + 3 GIFs)

| ID | Title | Duration | Screen Rec % | AI-Generated % |
|----|-------|----------|-------------|----------------|
| 0.2 | What is FABRIC? | 1:00 | 0% | 100% (Veo 3) |
| 4.1 | Brand Voice Calibration | 1:30 | 55% | 45% (Imagen 3 comparison + tip) |
| 4.2 | FABRIC Folder Tour | 1:00 | 60% | 40% (diagram + summary) |
| 4.3 | Adding Knowledge to Brain | 1:00 | 80% | 20% (tip card) |

### P3 -- Nice-to-Have (2 videos)

| ID | Title | Duration | Screen Rec % | AI-Generated % |
|----|-------|----------|-------------|----------------|
| 4.4 | YAML Workflows | 2:00 | 85% | 15% (diagram) |
| 4.5 | Google Workspace | 2:00 | 70% | 30% (grid + summary) |

---

## AI-Generated Asset Inventory

### Imagen 3 Batch (generate in one session with consistent prompt)

**Base prompt:** `"Professional dark tech card, background #0e0e18, gold (#ffcc00) accent, Poppins font, clean minimalist, 1920x1080"`

| # | Asset | Specific addition | Used in |
|---|-------|-------------------|---------|
| 1 | CTA card | "Lite $79. Full $249. Start today." | 0.1 |
| 2 | Comparison graphic | "3 columns: Hire Team $50K, AI Tools $1.2K, RealizeOS $249, gold highlight on third" | 0.1 |
| 3 | Welcome card | "Welcome to RealizeOS, your files are ready" | 1.1 |
| 4 | Timeline | "Horizontal timeline Day 3, 7, 14 with gold markers" | 1.1 |
| 5 | Community card | "Telegram + WhatsApp icons, join the community" | 1.1 |
| 6 | Mac Terminal note | "Mac: Cmd+Space -> Terminal -> Enter" | 2.0 |
| 7 | "3 Tools" title | "Install 3 Tools, checkmark icons" | 2.1 |
| 8 | Mac brew note | "Mac: brew install node" | 2.1 |
| 9 | Transition cards (x4) | "Next: [topic], arrow right" | 2.1, 2.2, 2.3, 3.1 |
| 10 | Celebration Lite | "RealizeOS Lite is Live, checkmark, gold glow" | 2.4 |
| 11 | "3 Prerequisites" title | "Python, Docker, Git icons" | 3.1 |
| 12 | Mac brew note Full | "Mac: brew install python@3.11 docker git" | 3.1 |
| 13 | "2 API Keys" title | "Two key icons, gold on dark" | 3.2 |
| 14 | Security warning | "Lock icon, Never commit API keys, red-gold" | 3.2 |
| 15 | Celebration Full | "RealizeOS Full is Live, gold glow" | 3.3 |
| 16 | Voice comparison | "Split: Bad rules (vague) vs Good rules (specific)" | 4.1 |
| 17 | Iteration tip | "3-5 tests/day, Day 3 = your voice" | 4.1 |
| 18 | FABRIC summary | "6 items: Add B, Customize A, Build R" | 4.2 |
| 19 | Index tip | "Full: python cli.py index" | 4.3 |
| 20 | Workflow diagram | "Pipeline: trigger -> agent1 -> agent2 -> output" | 4.4 |
| 21 | Google tools grid | "13 tool icons in grid, gold outlines" | 4.5 |
| 22 | Google summary | "Gmail, Calendar, Drive, Sheets, Docs + 8 more" | 4.5 |
| 23 | FABRIC logo end card | "RealizeOS logo + CTA" | 0.2 |

**Total: ~23 Imagen 3 generations**

### Veo 3 Clips

| # | Clip | Duration | Prompt | Used in |
|---|------|----------|--------|---------|
| 1 | Logo reveal | 8 sec | "Gold particles assembling into logo text on dark navy background, cinematic tech" | 0.1 |
| 2 | LLM routing | 15 sec | "Three glowing nodes connected by flowing golden data streams, dark background, tech diagram" | 0.1 |
| 3 | FABRIC assembly | 48 sec | "Six golden hexagonal tiles appearing sequentially with letters F A B R I C, each expanding to show icons, then reassembling into grid" | 0.2 |

**Total: 3 Veo 3 generations** (FABRIC may need 2-3 iterations)

---

## Production Workflow

1. **Gemini 3.1: Generate all Imagen 3 prompts** -- Use consistent style, batch generate 23 graphics
2. **Gemini 3.1: Generate Veo 3 prompts** -- 3 clips, iterate for quality
3. **Record P1 screen recordings** (2 sessions in Descript):
   - Session 1: Lite path (2.1-2.4) -- ~7 min of recording
   - Session 2: Full path (3.1-3.3) + Demo reel screen segments (0.1) -- ~9 min
4. **Assemble in Descript** -- Drop in AI assets, add annotations, narration
5. **Subtitles** -- Descript auto-subtitles (EN, HE, PT)
6. **Export GIFs** -- 7 GIFs from Descript
7. **YouTube upload** -- Playlist with chapters
8. **Embed on site**

---

## Embed Integration Points

| Video | File | Location |
|-------|------|----------|
| 0.1 | `src/components/sections/DemoVideo.tsx` | Replace placeholder |
| 0.2 | `src/components/sections/FabricSection.tsx` | Add inline/modal |
| 1.1 | `public/thank-you.html` | Above "First 15 Minutes" |
| 2.0-2.4 | `public/setup.html` | Inline at Lite wizard steps |
| 3.1-3.3 | `public/setup.html` | Inline at Full wizard steps |
| 2.3 | `public/brand-worksheet.html` | Top of page |
| 4.1-4.5 | `public/guide.html` | Inline at relevant steps |
| All GIFs | `public/setup.html` | Inline at steps |
