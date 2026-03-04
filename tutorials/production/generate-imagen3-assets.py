"""
Batch generate all Imagen 3 assets for RealizeOS tutorial videos.

Usage:
  1. Set your GOOGLE_AI_API_KEY environment variable
  2. Run: python generate-imagen3-assets.py
  3. Assets are saved to ../assets/imagen3/output/

Requirements:
  pip install google-generativeai Pillow
"""

import os
import json
import time
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
PROMPTS_FILE = SCRIPT_DIR / "../assets/imagen3/prompts.json"
OUTPUT_DIR = SCRIPT_DIR / "../assets/imagen3/output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load prompts
with open(PROMPTS_FILE, "r") as f:
    prompts = json.load(f)

print(f"Loaded {len(prompts)} prompts")
print(f"Output directory: {OUTPUT_DIR}")
print("=" * 60)

# Generate each asset
model = genai.ImageGenerationModel("imagen-3.0-generate-002")

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
        response = model.generate_images(
            prompt=asset["prompt"],
            number_of_images=1,
            aspect_ratio="16:9",
            safety_filter_level="block_only_high",
        )

        # Save the image
        response.images[0].save(str(output_path))
        print(f"  Saved: {output_path}")

    except Exception as e:
        print(f"  ERROR: {e}")
        # Log failed prompts for retry
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

    # Rate limiting -- avoid hitting API limits
    if i < len(prompts) - 1:
        time.sleep(2)

print("=" * 60)
print("Done! Check output directory for generated assets.")
print(f"Output: {OUTPUT_DIR}")

# Check for failures
failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome assets failed. Check {failed_log}")
