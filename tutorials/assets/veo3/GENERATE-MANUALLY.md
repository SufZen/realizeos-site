# Veo 3 Clips — Manual Generation Guide

Go to **https://aistudio.google.com** → select **Veo 3** → paste each prompt below.

Save outputs to `tutorials/assets/veo3/output/` with the exact filenames listed.

---

## Clip 1: Logo Reveal

- **File:** `01-logo-reveal.mp4`
- **Duration:** 8 seconds
- **Used in:** Video 0.1 — Product Demo Reel (0:00–0:08)
- **Settings:** 16:9, 1080p+

### Prompt (copy this):

```
Professional dark tech logo reveal animation. Deep navy-black background. Hundreds of tiny gold particles floating in space, slowly converging toward the center. The particles assemble into the text 'RealizeOS' in a clean sans-serif font. Once the text forms, a subtle gold glow pulse radiates outward from the letters. Below the logo, smaller text fades in: 'The AI Operations System You Own'. Cinematic, elegant, minimal. No people, no cartoons. 4K quality.
```

### Quality check:
- [ ] Background is very dark navy/black
- [ ] Particles are gold, not white
- [ ] Text reads "RealizeOS" (not garbled)
- [ ] Subtitle text appears below
- [ ] No people, no cartoons

---

## Clip 2: LLM Routing Diagram

- **File:** `02-llm-routing-diagram.mp4`
- **Duration:** 8 seconds (will loop/extend in Descript to fill 15 sec)
- **Used in:** Video 0.1 — Product Demo Reel (1:00–1:15)
- **Settings:** 16:9, 1080p+

### Prompt (copy this):

```
Professional dark tech animation of a data routing diagram. Deep navy-black background. A central gold node labeled 'Request' at the left. Three glowing nodes on the right side: top node in light blue labeled 'Gemini Flash' with subtitle 'Quick Tasks', middle node in warm gold labeled 'Claude Sonnet' with subtitle 'Content', bottom node in deep purple labeled 'Claude Opus' with subtitle 'Strategy'. Animated golden data streams flow from the central node, splitting and routing to each of the three destination nodes. The streams pulse with light as data flows through them. Clean technical diagram aesthetic, no cartoons, no people. Minimal and professional.
```

### Quality check:
- [ ] Dark background
- [ ] Central node + 3 destination nodes visible
- [ ] Data streams animate between nodes
- [ ] Labels are at least partially readable
- [ ] No people, no cartoons

### Note:
Veo 3 max is ~8 seconds. Generate one clip and extend/loop in Descript to fill 15 seconds. If labels are unreadable, that's fine — add them as Descript text overlays on top.

---

## Clip 3: FABRIC Hexagon Assembly (P2 — not launch-critical)

- **File:** `03-fabric-hexagon-assembly.mp4`
- **Duration:** 48 seconds total → generate as **3 segments**
- **Used in:** Video 0.2 — What is FABRIC? (0:00–0:48)
- **Settings:** 16:9, 1080p+

### Segment A — `03a-fabric-FA.mp4` (8 sec)

```
Professional dark tech animation. Deep navy-black background. A golden hexagonal tile slides in from the left containing the letter 'F'. It pauses, expands to show simplified document icons, then contracts. A second golden hexagonal tile with the letter 'A' appears next to it, expands to show four small human silhouette icons, then contracts. Clean geometric minimal aesthetic. Gold color accents on dark background. No cartoons, no people.
```

### Segment B — `03b-fabric-BRIC.mp4` (8 sec)

```
Professional dark tech animation continuing a hexagonal tile sequence. Deep navy-black background. Two golden hexagonal tiles already visible (letters F and A). Third tile 'B' with book icons appears, expands, contracts. Fourth tile 'R' with workflow arrow icons. Fifth tile 'I' with circular loop icon. Sixth tile 'C' with file icons. All tiles are gold on dark navy background. Clean geometric minimal style. No cartoons, no people.
```

### Segment C — `03c-fabric-assembly.mp4` (8 sec)

```
Professional dark tech animation. Deep navy-black background. Six golden hexagonal tiles in a row, each containing one letter: F, A, B, R, I, C. The tiles smoothly rearrange into a compact honeycomb grid pattern. Once assembled, all letters glow gold together as a unified system. Clean geometric professional aesthetic. Gold accents on dark background. No cartoons, no people.
```

### Quality check (all 3 segments):
- [ ] Dark background throughout
- [ ] Hexagons are gold-bordered
- [ ] Letters are visible inside hexagons
- [ ] Motion is smooth
- [ ] Stitch together in Descript → single 24-sec clip (or slow down to fill 48 sec)

---

## After generating

1. Save all files to `tutorials/assets/veo3/output/`
2. Delete `failed.log` from the output folder
3. Preview each clip — if text is garbled, plan to overlay correct text in Descript
