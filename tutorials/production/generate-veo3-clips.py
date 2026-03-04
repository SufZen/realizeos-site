"""
Generate Veo 3 video clips for RealizeOS tutorial videos.

Usage:
  1. Set your GOOGLE_AI_API_KEY environment variable
  2. Run: python generate-veo3-clips.py
  3. Clips are saved to ../assets/veo3/output/

Note: Veo 3 API availability may vary. If API access is not available,
use Google AI Studio manually with the prompts in ../assets/veo3/prompts.json.

Requirements:
  pip install google-generativeai
"""

import os
import json
import sys
from pathlib import Path

try:
    import google.generativeai as genai
except ImportError:
    print("Install required package: pip install google-generativeai")
    sys.exit(1)

# Configuration
API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
if not API_KEY:
    print("Set GOOGLE_AI_API_KEY environment variable")
    sys.exit(1)

genai.configure(api_key=API_KEY)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROMPTS_FILE = SCRIPT_DIR / "../assets/veo3/prompts.json"
OUTPUT_DIR = SCRIPT_DIR / "../assets/veo3/output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load prompts
with open(PROMPTS_FILE, "r") as f:
    prompts = json.load(f)

print(f"Loaded {len(prompts)} video prompts")
print(f"Output directory: {OUTPUT_DIR}")
print("=" * 60)

for i, clip in enumerate(prompts):
    filename = clip["filename"]
    output_path = OUTPUT_DIR / filename

    if output_path.exists():
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue

    print(f"[{i+1}/{len(prompts)}] Generating: {filename}")
    print(f"  Duration: {clip['duration']}")
    print(f"  Used in: {clip['used_in']}")
    print(f"  Prompt: {clip['prompt'][:100]}...")

    try:
        # Note: Veo 3 API interface may differ from this example.
        # Check current Gemini API docs for video generation endpoints.
        # This is a placeholder for the actual API call.
        model = genai.GenerativeModel("veo-3")

        response = model.generate_content(
            clip["prompt"],
            generation_config={
                "response_mime_type": "video/mp4",
            }
        )

        # Save video
        with open(output_path, "wb") as f:
            f.write(response.candidates[0].content.parts[0].data)

        print(f"  Saved: {output_path}")

    except Exception as e:
        print(f"  ERROR: {e}")
        print(f"  -> Use Google AI Studio manually with the prompt from prompts.json")
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

print("=" * 60)
print("Done!")
print()
print("If API generation failed, use these prompts manually in Google AI Studio:")
for clip in prompts:
    print(f"\n--- {clip['filename']} ({clip['duration']}) ---")
    print(clip['prompt'])
