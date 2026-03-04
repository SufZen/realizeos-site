# Veo 3 Video Clip Generation Guide

## How to Use These Prompts

### Option A: Google AI Studio (Manual)
1. Go to aistudio.google.com
2. Select Veo 3 model
3. Paste each prompt
4. Download the generated clip
5. Import into Descript for assembly

### Option B: Gemini API
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_GOOGLE_AI_API_KEY")

# Note: Veo 3 API access may require specific model version
model = genai.GenerativeModel("veo-3")

# Generate video
response = model.generate_content(prompt)
# Save video bytes to file
```

## Clips Overview

| # | Clip | Duration | Used In |
|---|------|----------|---------|
| 1 | Logo Reveal | 8 sec | Demo Reel (0.1) opening |
| 2 | LLM Routing Diagram | 15 sec | Demo Reel (0.1) mid |
| 3 | FABRIC Hexagon Assembly | 48 sec | What is FABRIC? (0.2) |

## Important Notes

- Clip 3 (FABRIC) is the longest and most complex. It may need to be generated in 2-3 segments and assembled in Descript.
- All clips use the same visual language: dark background (#0e0e18), gold accents (#ffcc00), clean geometric shapes.
- No people, no cartoons, no stock footage. Pure motion graphics.
- After generation, add narration in Descript (see narration scripts in ../narration/).
