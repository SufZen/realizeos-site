"""
Batch generate all image assets for RealizeOS tutorial videos.

Tries Imagen 3 first, falls back to Gemini 2.0 Flash image generation
(which works on free AI Studio API keys).

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
    from google.genai import types
except ImportError:
    print("Install required package: pip install google-genai Pillow")
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

# --- Detect which model to use ---
IMAGEN_MODEL = "imagen-3.0-generate-002"
GEMINI_MODEL = "gemini-2.0-flash-exp-image-generation"
use_gemini_fallback = False

print(f"\nTesting Imagen 3 ({IMAGEN_MODEL})...")
try:
    test = client.models.generate_images(
        model=IMAGEN_MODEL,
        prompt="A simple gold circle on a dark background",
        config=types.GenerateImagesConfig(number_of_images=1),
    )
    print(f"  Imagen 3 works! Using {IMAGEN_MODEL}")
except Exception as e:
    print(f"  Imagen 3 not available: {e}")
    print(f"  Falling back to Gemini Flash image generation ({GEMINI_MODEL})")
    use_gemini_fallback = True

print("=" * 60)


def generate_with_imagen(prompt_text, output_path):
    """Generate image using Imagen 3 API."""
    response = client.models.generate_images(
        model=IMAGEN_MODEL,
        prompt=prompt_text,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio="16:9",
            safety_filter_level="BLOCK_ONLY_HIGH",
        ),
    )
    if response.generated_images:
        img_bytes = response.generated_images[0].image.image_bytes
        with open(output_path, "wb") as f:
            f.write(img_bytes)
        return True
    return False


def generate_with_gemini(prompt_text, output_path):
    """Generate image using Gemini 2.0 Flash image generation."""
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt_text,
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE", "TEXT"],
        ),
    )

    # Extract image from response parts
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                img_bytes = part.inline_data.data
                # Determine extension from mime type
                ext = part.inline_data.mime_type.split("/")[-1]
                # Update output path extension if needed
                final_path = output_path.with_suffix(f".{ext}")
                with open(final_path, "wb") as f:
                    f.write(img_bytes)
                return True
    return False


# --- Generate all assets ---
for i, asset in enumerate(prompts):
    filename = asset["filename"]
    output_path = OUTPUT_DIR / filename

    # Skip if already generated (check with and without extension variants)
    if output_path.exists():
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue
    # Also check for .jpeg/.webp variants from Gemini
    if any((OUTPUT_DIR / f"{output_path.stem}.{ext}").exists() for ext in ["png", "jpeg", "jpg", "webp"]):
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue

    print(f"[{i+1}/{len(prompts)}] Generating: {filename}")
    print(f"  Used in: {asset['used_in']}")

    try:
        if use_gemini_fallback:
            success = generate_with_gemini(asset["prompt"], output_path)
        else:
            success = generate_with_imagen(asset["prompt"], output_path)

        if success:
            print(f"  Saved!")
        else:
            print(f"  WARNING: No image generated (may have been filtered)")
            with open(OUTPUT_DIR / "failed.log", "a") as log:
                log.write(f"{filename}: No image returned\n")

    except Exception as e:
        print(f"  ERROR: {e}")
        with open(OUTPUT_DIR / "failed.log", "a") as log:
            log.write(f"{filename}: {e}\n")

    # Rate limiting
    if i < len(prompts) - 1:
        wait = 5 if use_gemini_fallback else 3
        time.sleep(wait)

print("=" * 60)
print("Done! Check output directory for generated assets.")
print(f"Output: {OUTPUT_DIR}")

failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome assets failed. Check {failed_log}")
