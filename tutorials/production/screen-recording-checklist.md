# Screen Recording Checklist (Descript)

## Before Recording

### Environment Setup (Windows)
- [ ] Set PowerShell/Windows Terminal to dark theme (match #0e0e18)
- [ ] Set browser to dark mode
- [ ] Set Obsidian to dark theme
- [ ] Close all unnecessary apps/notifications
- [ ] Set display to 1920x1080
- [ ] Increase font size in terminal to 16px+ (readable on mobile)
- [ ] Disable Windows notifications (Focus Assist)

### Content Preparation
- [ ] Pre-fill Brand Worksheet with realistic example data
- [ ] Set up Obsidian vault with good brand voice rules
- [ ] Have API keys ready (test keys, never show real ones)
- [ ] Clone realize-os repo and have it ready
- [ ] Pre-configure .env with working keys
- [ ] Test Claude Code output -- make sure it matches brand voice convincingly

---

## Recording Sessions

### Session 1: Lite Path (~7 min total recording)

Record these in order, one continuous session if possible:

- [ ] **Video 2.1** (2:00) -- Install Obsidian + Node.js + Claude Code
  - Install Obsidian from obsidian.md
  - Install Node.js -- ZOOM on PATH checkbox
  - Close/reopen terminal, verify node
  - npm install claude-code, verify

- [ ] **Video 2.2** (1:15) -- Download & Open Vault
  - Download ZIP from setup page
  - Extract to Documents (NOT cloud folders)
  - Obsidian: "Open folder as vault"
  - Quick FABRIC folder tour

- [ ] **Video 2.3** (2:30) -- Brand Worksheet
  - Walk through all sections (speed up typing)
  - Export 3 files, copy each
  - Paste into Obsidian vault files

- [ ] **Video 2.4** (1:30) -- First Conversation
  - Navigate to vault in File Explorer
  - Open PowerShell from address bar
  - Type `claude`, show initialization
  - Type prompt, show output matching voice
  - Request review, show scores

### Session 2: Full Path + Demo (~9 min total recording)

- [ ] **Video 3.1** (2:00) -- Prerequisites
  - Install Python -- ZOOM on PATH checkbox
  - Verify python version
  - Install Docker -- accept WSL2
  - Verify docker version
  - Check git version

- [ ] **Video 3.2** (1:30) -- API Keys
  - Navigate Anthropic console, create key
  - Add billing credit
  - Navigate Google AI Studio, create key
  - (blur any real keys)

- [ ] **Video 3.3** (2:30) -- Clone, Configure, Deploy
  - git clone, cd
  - Create .env, paste keys (zoom on format)
  - python cli.py init --template
  - docker compose up (time-lapse the build)
  - Health check, chat test

- [ ] **Video 0.1 screen segments** (1:30) -- Demo Reel
  - Obsidian FABRIC folder scroll
  - Claude Code session (prompt + output)
  - Reviewer scores
  - Docker compose + API test

### Session 3: P2 Videos (~3 min total recording)

- [ ] **Video 4.1** (1:00 screen portion) -- Voice Calibration
  - Edit brand-voice.md with specific rules
  - Claude Code test, annotate output

- [ ] **Video 4.2** (0:40 screen portion) -- FABRIC Tour
  - Click each folder, show one file

- [ ] **Video 4.3** (0:50 screen portion) -- Brain Knowledge
  - Create new file in B-brain
  - Claude Code query referencing it

---

## Post-Recording (Descript)

### For Each Video:
- [ ] Import AI-generated assets (Imagen 3 PNGs, Veo 3 clips)
- [ ] Record narration using script from `../assets/narration/`
- [ ] Add annotations (zoom, circles, arrows, text overlays)
- [ ] Add Mac note cards at appropriate moments
- [ ] Speed up typing segments (2x)
- [ ] Time-lapse Docker builds (4x)
- [ ] Generate subtitles: English, Hebrew, Portuguese
- [ ] Export 1080p MP4
- [ ] Export GIFs where applicable (Videos 2.0, G.1-G.7)

### YouTube Upload:
- [ ] Create "RealizeOS Setup" playlist
- [ ] Upload in order, add chapters
- [ ] Add cards linking to next video
- [ ] Add end screens

### Site Embedding:
- [ ] Video 0.1 -> DemoVideo.tsx
- [ ] Video 1.1 -> thank-you.html
- [ ] Videos 2.x -> setup.html (Lite steps)
- [ ] Videos 3.x -> setup.html (Full steps)
- [ ] Video 2.3 -> brand-worksheet.html
- [ ] Videos 4.x -> guide.html
