# Imagen 3 Asset Generation Guide

## How to Use These Prompts

### Option A: Google AI Studio (Manual)
1. Go to aistudio.google.com
2. Select Imagen 3 model
3. Set aspect ratio to 16:9 (1920x1080)
4. Paste each prompt below
5. Save output to the corresponding filename

### Option B: Gemini API (Automated)
```python
import google.generativeai as genai
import json

genai.configure(api_key="YOUR_GOOGLE_AI_API_KEY")

# Load prompts
with open("prompts.json", "r") as f:
    prompts = json.load(f)

model = genai.ImageGenerationModel("imagen-3.0-generate-002")

for asset in prompts:
    response = model.generate_images(
        prompt=asset["prompt"],
        number_of_images=1,
        aspect_ratio="16:9",
    )
    response.images[0].save(f"output/{asset['filename']}")
    print(f"Generated: {asset['filename']}")
```

### Option C: Claude Code MCP (if Gemini MCP is configured)
Use the Gemini MCP server to call Imagen 3 directly from Claude Code.

---

## Style Consistency

**Every prompt includes this base prefix:**
> Professional dark tech graphic for a software product video. Deep navy-black background color #0e0e18. Gold accent color #ffcc00. Clean minimalist design. No cartoons, no stock photos, no people. Modern tech aesthetic. Text uses clean sans-serif font.

**Resolution:** 1920x1080 (16:9)
**Format:** PNG preferred

---

## Prompts (23 Total)

See individual files in this directory, or use prompts.json for batch generation.
