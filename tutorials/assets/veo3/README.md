# Veo 3 / Google Flow Video Clip Generation

## Quick Start

1. **[FLOW-PROJECT-SETUP.md](./FLOW-PROJECT-SETUP.md)** — Set up your Google Flow project, configure settings, and create Ingredients for visual consistency
2. **[GENERATE-MANUALLY.md](./GENERATE-MANUALLY.md)** — Step-by-step guide to generate each clip with prompts and frame chaining
3. **[prompts.json](./prompts.json)** — Machine-readable prompts with Flow settings metadata

## Clips Overview

| # | Clip | Duration | Used In |
|---|------|----------|---------|
| 1 | Logo Reveal | 8 sec | Demo Reel (0.1) opening |
| 2a–2b | LLM Routing Diagram | 16 sec (2 clips) | Demo Reel (0.1) mid |
| 3a–3f | FABRIC Hexagon Assembly | 48 sec (6 clips) | What is FABRIC? (0.2) |

## Visual Language

All clips share a consistent visual identity:

- **Background:** Deep navy-black `#0e0e18`
- **Accent color:** Warm gold `#ffcc00`
- **Style:** Clean geometric motion graphics, no people, no cartoons
- **Camera:** Static (no camera movement) for all diagram/assembly clips

## Workflow

**Recommended:** Google Flow with Veo 3.1 (Highest Quality)
- Use **Ingredients** for style consistency across clips
- Use **Frames-to-Video** (save last frame → use as Start Frame) for seamless transitions
- Use **Scene Builder** to assemble multi-clip sequences

**Alternative:** Generate in AI Studio → assemble in Descript

## Important Notes

- All clips are 8 seconds, 16:9, 1080p+
- Generate 2 variations per prompt — pick the best result
- Text labels may render imperfectly — plan to overlay correct text in your editor
- Save generated clips to `output/` directory
