"""
Generate Veo video clips for RealizeOS tutorial videos.

Auto-detects the available Veo model version.

Usage:
  1. Set your GOOGLE_AI_API_KEY environment variable
  2. Run: python generate-veo3-clips.py
  3. Clips are saved to ../assets/veo3/output/

Note: Veo may require a paid API tier. If generation fails,
the script prints prompts for manual use in Google AI Studio.

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
    from google.genai import types
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

# --- Detect which Veo model works ---
VEO_MODELS = [
    "veo-3.0-generate-preview",
    "veo-2.0-generate-001",
    "veo-3.0-generate-001",
]

working_model = None

for model_name in VEO_MODELS:
    print(f"\nTesting {model_name}...")
    try:
        # Try listing model info to see if it exists
        response = client.models.generate_videos(
            model=model_name,
            prompt="A simple gold circle rotating on a dark background",
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                duration_seconds=5,
                aspect_ratio="16:9",
            ),
        )
        working_model = model_name
        print(f"  Works! Using {model_name}")
        # Cancel/discard the test video to avoid wasting quota
        break
    except Exception as e:
        err_str = str(e)
        if "not found" in err_str.lower() or "404" in err_str:
            print(f"  Not available: model not found")
        elif "not supported" in err_str.lower():
            print(f"  Not available: not supported for this API")
        else:
            # If it's a different error (like quota), the model exists
            print(f"  Model exists but got error: {e}")
            working_model = model_name
            break

if not working_model:
    print("\n" + "=" * 60)
    print("No Veo model available via API with your key.")
    print("This is normal -- Veo may require a paid tier or")
    print("may only be available in Google AI Studio UI.")
    print("")
    print("Use the prompts below manually in AI Studio:")
    print("  https://aistudio.google.com")
    print("=" * 60)
    for clip in prompts:
        print(f"\n--- {clip['filename']} ({clip['duration']}) ---")
        print(f"Used in: {clip['used_in']}")
        print(f"\nPrompt:\n{clip['prompt']}")
        if clip.get("style_notes"):
            print(f"\nStyle notes:\n{clip['style_notes']}")
        print()
    sys.exit(0)

print(f"\n{'=' * 60}")
print(f"Using model: {working_model}")
print(f"{'=' * 60}\n")

# --- Generate clips ---
for i, clip in enumerate(prompts):
    filename = clip["filename"]
    output_path = OUTPUT_DIR / filename

    # Skip if already generated
    stem = output_path.stem
    if any((OUTPUT_DIR / f"{stem}.{ext}").exists() for ext in ["mp4", "webm", "mov"]):
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue

    print(f"[{i+1}/{len(prompts)}] Generating: {filename}")
    print(f"  Duration: {clip['duration']}")
    print(f"  Used in: {clip['used_in']}")

    try:
        duration = int(clip["duration"].split()[0])
        # Veo clips are typically 5-8 seconds max per generation
        # For longer clips, we note this for the user
        if duration > 8:
            print(f"  Note: Requested {duration}s but Veo generates max ~8s clips.")
            print(f"  Generate multiple clips and stitch in Descript.")
            duration = 8

        response = client.models.generate_videos(
            model=working_model,
            prompt=clip["prompt"],
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                duration_seconds=duration,
                aspect_ratio="16:9",
            ),
        )

        # Video generation is async -- poll for completion
        print(f"  Submitted. Polling for completion (this may take 1-3 minutes)...")
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
        print(f"  -> Use AI Studio manually with the prompt from prompts.json")
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

    # Rate limiting between clips
    if i < len(prompts) - 1:
        time.sleep(10)

print("=" * 60)
print("Done!")

failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome clips failed. See {failed_log}")
    print("\nFor failed clips, use prompts manually in Google AI Studio:")
    for clip in prompts:
        stem = Path(clip["filename"]).stem
        if not any((OUTPUT_DIR / f"{stem}.{ext}").exists() for ext in ["mp4", "webm", "mov"]):
            print(f"\n--- {clip['filename']} ({clip['duration']}) ---")
            print(clip["prompt"][:200] + "...")
