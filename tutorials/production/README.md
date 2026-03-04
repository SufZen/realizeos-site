# Tutorial Video Production Guide

## Quick Start

### Step 1: Generate AI Assets (No Descript needed)

```bash
# Install dependencies
pip install google-generativeai Pillow

# Set your API key
export GOOGLE_AI_API_KEY=your-key-here

# Generate all 23 Imagen 3 graphics
python generate-imagen3-assets.py

# Generate 3 Veo 3 video clips
python generate-veo3-clips.py
```

### Step 2: Review AI Assets
- Check `../assets/imagen3/output/` for generated graphics
- Check `../assets/veo3/output/` for generated clips
- Re-generate any that don't match the visual style
- All assets use: dark background (#0e0e18), gold accents (#ffcc00)

### Step 3: Record Screen Sessions (Descript)
See `screen-recording-checklist.md` for the recording plan.

### Step 4: Assemble in Descript
1. Import AI assets into Descript project
2. Record narration using scripts in `../assets/narration/`
3. Add annotations (zoom, circles, highlights)
4. Generate subtitles (English, Hebrew, Portuguese)
5. Export to 1080p MP4

### Step 5: Upload & Embed
1. Upload to YouTube, create playlist
2. Embed on site (see plan for integration points)

## File Structure

```
tutorials/
├── plan/
│   └── tutorial-video-plan.md       # Full production plan
├── assets/
│   ├── imagen3/
│   │   ├── prompts.json             # All 23 prompts (batch-ready)
│   │   ├── README.md                # How to generate
│   │   └── output/                  # Generated PNGs go here
│   ├── veo3/
│   │   ├── prompts.json             # All 3 video prompts
│   │   ├── README.md                # How to generate
│   │   └── output/                  # Generated MP4s go here
│   └── narration/
│       ├── video-0.1-demo-reel.txt  # Each video's narration script
│       ├── video-0.2-what-is-fabric.txt
│       ├── video-1.1-welcome.txt
│       ├── video-2.1-install-tools.txt
│       ├── video-2.2-open-vault.txt
│       ├── video-2.3-brand-worksheet.txt
│       ├── video-2.4-first-conversation.txt
│       ├── video-3.1-prerequisites.txt
│       ├── video-3.2-api-keys.txt
│       ├── video-3.3-clone-deploy.txt
│       ├── video-4.1-voice-calibration.txt
│       ├── video-4.2-fabric-tour.txt
│       └── video-4.3-brain-knowledge.txt
└── production/
    ├── README.md                    # This file
    ├── generate-imagen3-assets.py   # Batch Imagen 3 generator
    ├── generate-veo3-clips.py       # Batch Veo 3 generator
    └── screen-recording-checklist.md
```
