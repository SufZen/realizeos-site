"""
Batch generate all Imagen 3 assets for RealizeOS tutorial videos.

Usage:
  1. Set your GOOGLE_AI_API_KEY environment variable
  2. Run: python generate-imagen3-assets.py
  3. Assets are saved to ../assets/imagen3/output/

Requirements:
  pip install google-genai Pillow
"""

import os
import json
import time
import sys
import base64
from pathlib import Path

try:
    from google import genai
except ImportError:
    print("Install required package: pip install google-genai")
    print("(Note: the old 'google-generativeai' is deprecated)")
    sys.exit(1)

# Configuration
API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
if not API_KEY:
    print("Set GOOGLE_AI_API_KEY environment variable")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROMPTS_FILE = SCRIPT_DIR / "../assets/imagen3/prompts.json"
OUTPUT_DIR = SCRIPT_DIR / "../assets/imagen3/output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load prompts
with open(PROMPTS_FILE, "r") as f:
    prompts = json.load(f)

print(f"Loaded {len(prompts)} prompts")
print(f"Output directory: {OUTPUT_DIR}")
print("=" * 60)

for i, asset in enumerate(prompts):
    filename = asset["filename"]
    output_path = OUTPUT_DIR / filename

    # Skip if already generated
    if output_path.exists():
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue

    print(f"[{i+1}/{len(prompts)}] Generating: {filename}")
    print(f"  Used in: {asset['used_in']}")

    try:
        response = client.models.generate_images(
            model="imagen-3.0-generate-002",
            prompt=asset["prompt"],
            config={
                "number_of_images": 1,
                "aspect_ratio": "16:9",
                "safety_filter_level": "BLOCK_ONLY_HIGH",
            },
        )

        # Save the image
        if response.generated_images:
            img = response.generated_images[0]
            img_bytes = img.image.image_bytes
            with open(output_path, "wb") as f:
                f.write(img_bytes)
            print(f"  Saved: {output_path}")
        else:
            print(f"  WARNING: No image generated (may have been filtered)")
            with open(OUTPUT_DIR / "failed.log", "a") as log:
                log.write(f"{filename}: No image returned (safety filter?)\n")

    except Exception as e:
        print(f"  ERROR: {e}")
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

    # Rate limiting
    if i < len(prompts) - 1:
        time.sleep(3)

print("=" * 60)
print("Done! Check output directory for generated assets.")
print(f"Output: {OUTPUT_DIR}")

failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome assets failed. Check {failed_log}")
