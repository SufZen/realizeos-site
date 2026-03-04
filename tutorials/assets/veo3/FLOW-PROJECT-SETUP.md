# Google Flow Project Setup Guide

## Step 1: Create the Project

1. Go to [flow.google.com](https://flow.google.com) (or labs.google → Flow)
2. Click **New Project**
3. Name it: `RealizeOS Tutorial Series`

---

## Step 2: Configure Project Settings

Click the **Settings** icon (gear) above the prompt box and set:

| Setting | Value |
|---------|-------|
| **Model** | Veo 3.1 (select "Highest Quality") |
| **Aspect Ratio** | 16:9 (Landscape) |
| **Resolution** | 1080p (or 4K if you have Ultra credits) |
| **Variations** | 2 (generates 2 options per prompt — pick the best) |

> **Important:** The default mode may use Veo 2. Always verify you've selected **Veo 3.1** and **Highest Quality** in the settings dropdown.

---

## Step 3: Create Ingredients (for Visual Consistency)

Ingredients are reusable visual references that keep your style consistent across all clips. Create these **before** generating any video.

### Ingredient 1: "RealizeOS Brand Style"
- Click **Ingredients** → **Create New**
- Use ImageFX or upload an image with these characteristics:
  - Deep navy-black background (hex `#0e0e18`)
  - Gold accent elements (hex `#ffcc00`)
  - Clean geometric shapes, thin lines
  - Dark tech / motion graphics aesthetic
- **Prompt for ImageFX:** `A professional dark tech UI dashboard on a deep navy-black background (#0e0e18). Gold geometric shapes, thin golden lines, hexagonal grid elements, and subtle gold particle effects. Clean, minimal, cinematic. No text, no people.`
- Save as ingredient: **"Brand Style"**

### Ingredient 2: "Gold Hexagon Tile"
- Generate or upload an image of a single golden hexagonal tile on a dark background
- **Prompt for ImageFX:** `A single golden hexagonal tile with a thin gold border and subtle inner glow, centered on a pure dark navy-black background (#0e0e18). Clean geometric, minimal. The hexagon is semi-transparent with a warm gold (#ffcc00) outline. No text, no people.`
- Save as ingredient: **"Gold Hexagon"**

### Ingredient 3: "Node Diagram Style"
- Generate or upload a reference for the routing diagram style
- **Prompt for ImageFX:** `A technical node diagram on a dark navy-black background. Three glowing circular nodes connected by thin luminous lines. Left node glows gold, top-right glows light blue, bottom-right glows deep purple. Clean minimal data visualization aesthetic. No text, no people.`
- Save as ingredient: **"Node Diagram"**

---

## Step 4: Create Frames (Start/End Keyframes)

Frames let you control exactly how a clip starts and ends. This is critical for stitching clips together seamlessly.

### How to Use Frames:
1. After generating your **first clip** of a sequence, hover over the **last frame**
2. Click the **+** button → **Save frame as asset**
3. Use that saved frame as the **Start Frame** for your next clip
4. This ensures visual continuity between clips

### For the FABRIC sequence specifically:
- After generating clip 3a (letter F), save the last frame
- Use it as the Start Frame for clip 3b (letter A)
- Repeat for each subsequent letter

---

## Step 5: Scene Builder Workflow

For longer sequences (like the FABRIC assembly), use Scene Builder:

1. Generate each clip individually using the prompts in `prompts.json`
2. Open **Scene Builder** in your project
3. Drag clips into the timeline in order
4. Use **"Jump To"** between clips for smooth AI-generated transitions
5. Use **"Extend"** on any clip that needs to be longer (note: Extend currently uses Veo 2 — for Veo 3 quality, use Frames-to-Video instead)
6. Download the assembled scene, or download clips individually and stitch in Descript

---

## Step 6: Prompt Tips for Best Results

1. **Repeat key visual details in every prompt** — background color, gold accent color, "no people, no cartoons"
2. **Reference your ingredients** — mention them in the prompt so Flow uses them as style anchors
3. **Keep ingredient images on plain backgrounds** — helps the model isolate the visual elements
4. **Use the same terminology consistently** — always say "deep navy-black background" not sometimes "dark background"
5. **Describe camera behavior** — "static camera, no camera movement" for diagram shots, or "slow dolly in" for dramatic reveals
6. **Include timing cues** — "In the first 3 seconds... then over the next 4 seconds..."

---

## Credits Budget Estimate

| Clip Set | Clips | Variations | Total Generations |
|----------|-------|------------|-------------------|
| Logo Reveal | 1 | x2 | 2 |
| LLM Routing | 2 | x2 | 4 |
| FABRIC Assembly | 6 | x2 | 12 |
| **Total** | **9** | | **~18 generations** |

At 20 credits per video on free plan, that's ~360 credits. With Pro/Ultra subscription you'll have more than enough.

---

## File Organization

Save all generated clips to:
```
tutorials/assets/veo3/output/
├── 01-logo-reveal.mp4
├── 02a-routing-layout.mp4
├── 02b-routing-dataflow.mp4
├── 03a-fabric-F.mp4
├── 03b-fabric-A.mp4
├── 03c-fabric-B.mp4
├── 03d-fabric-R.mp4
├── 03e-fabric-IC.mp4
└── 03f-fabric-assembly.mp4
```
