"""
Generate Veo 3 video clips for RealizeOS tutorial videos.

Usage:
  1. Set your GOOGLE_AI_API_KEY environment variable
  2. Run: python generate-veo3-clips.py
  3. Clips are saved to ../assets/veo3/output/

Note: Veo 3 may not be available via API yet. If this fails,
use Google AI Studio manually with the prompts in ../assets/veo3/prompts.json.

Requirements:
  pip install google-genai
"""

import os
import json
import sys
import time
from pathlib import Path

try:
    from google import genai
except ImportError:
    print("Install required package: pip install google-genai")
    sys.exit(1)

# Configuration
API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
if not API_KEY:
    print("Set GOOGLE_AI_API_KEY environment variable")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

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

    try:
        # Veo 3 video generation via Gemini API
        response = client.models.generate_videos(
            model="veo-3.0-generate-preview",
            prompt=clip["prompt"],
            config={
                "number_of_videos": 1,
                "duration_seconds": int(clip["duration"].split()[0]),
                "aspect_ratio": "16:9",
            },
        )

        # Video generation is async -- poll for completion
        print(f"  Submitted. Polling for completion...")
        while not response.done:
            time.sleep(10)
            print(f"  Still generating...")

        if response.generated_videos:
            vid = response.generated_videos[0]
            vid_bytes = vid.video.video_bytes
            with open(output_path, "wb") as f:
                f.write(vid_bytes)
            print(f"  Saved: {output_path}")
        else:
            print(f"  WARNING: No video generated")
            with open(OUTPUT_DIR / "failed.log", "a") as log:
                log.write(f"{filename}: No video returned\n")

    except Exception as e:
        print(f"  ERROR: {e}")
        print(f"  -> Try manually in Google AI Studio with the prompt from prompts.json")
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

    # Rate limiting between clips
    if i < len(prompts) - 1:
        time.sleep(5)

print("=" * 60)
print("Done!")

failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome clips failed. Check {failed_log}")
    print("\nFor failed clips, use the prompts manually in Google AI Studio:")
    for clip in prompts:
        p = OUTPUT_DIR / clip["filename"]
        if not p.exists():
            print(f"\n--- {clip['filename']} ({clip['duration']}) ---")
            print(clip['prompt'][:200] + "...")
