"""
Batch generate all image assets for RealizeOS tutorial videos.

Uses Gemini native image generation (Nano Banana).
Falls through model options until one works with your API key.

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

# --- Detect which model works ---
# Try models in order of preference
MODELS_TO_TRY = [
    "gemini-2.5-flash-image",           # Nano Banana (fast, current)
    "gemini-3.1-flash-image-preview",   # Newer flash preview
    "gemini-3-pro-image-preview",       # Pro quality preview
    "gemini-2.0-flash-exp",             # Older experimental
]

working_model = None
test_prompt = "A simple gold circle on a solid dark navy background, minimal, clean"

for model_name in MODELS_TO_TRY:
    print(f"\nTesting {model_name}...")
    try:
        response = client.models.generate_content(
            model=model_name,
            contents=test_prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )
        # Check if we got an image back
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data and part.inline_data.mime_type.startswith("image/"):
                    working_model = model_name
                    print(f"  Works! Using {model_name}")
                    break
        if working_model:
            break
        else:
            print(f"  Response received but no image data")
    except Exception as e:
        print(f"  Not available: {e}")

if not working_model:
    # Also try Imagen standalone API
    print(f"\nTrying Imagen 4 standalone API...")
    try:
        response = client.models.generate_images(
            model="imagen-4.0-generate-001",
            prompt=test_prompt,
            config=types.GenerateImagesConfig(number_of_images=1),
        )
        if response.generated_images:
            working_model = "imagen-4.0-generate-001"
            print(f"  Works! Using Imagen 4")
    except Exception as e:
        print(f"  Not available: {e}")

if not working_model:
    print("\n!!! No image generation model available with your API key.")
    print("Go to https://aistudio.google.com and verify you can generate images there.")
    print("You may need to enable billing or use a different API key.")
    sys.exit(1)

USE_IMAGEN_API = working_model.startswith("imagen-")
print(f"\n{'=' * 60}")
print(f"Using model: {working_model}")
print(f"{'=' * 60}\n")


def generate_image(prompt_text, output_path):
    """Generate an image using the detected working model."""
    if USE_IMAGEN_API:
        response = client.models.generate_images(
            model=working_model,
            prompt=prompt_text,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
            ),
        )
        if response.generated_images:
            img_bytes = response.generated_images[0].image.image_bytes
            with open(output_path, "wb") as f:
                f.write(img_bytes)
            return True
        return False
    else:
        # Gemini generate_content approach
        # Add aspect ratio hint to prompt
        enhanced_prompt = f"{prompt_text} Aspect ratio 16:9 widescreen, 1920x1080 resolution."
        response = client.models.generate_content(
            model=working_model,
            contents=enhanced_prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data and part.inline_data.mime_type.startswith("image/"):
                    img_bytes = part.inline_data.data
                    ext = part.inline_data.mime_type.split("/")[-1]
                    if ext == "jpeg":
                        ext = "jpg"
                    final_path = output_path.with_suffix(f".{ext}")
                    with open(final_path, "wb") as f:
                        f.write(img_bytes)
                    return True
        return False


# --- Generate all assets ---
for i, asset in enumerate(prompts):
    filename = asset["filename"]
    output_path = OUTPUT_DIR / filename

    # Skip if already generated (check multiple extensions)
    stem = output_path.stem
    if any((OUTPUT_DIR / f"{stem}.{ext}").exists() for ext in ["png", "jpg", "jpeg", "webp"]):
        print(f"[{i+1}/{len(prompts)}] SKIP (exists): {filename}")
        continue

    print(f"[{i+1}/{len(prompts)}] Generating: {filename}")
    print(f"  Used in: {asset['used_in']}")

    try:
        success = generate_image(asset["prompt"], output_path)

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
        time.sleep(5)

print("=" * 60)
print("Done! Check output directory for generated assets.")
print(f"Output: {OUTPUT_DIR}")

failed_log = OUTPUT_DIR / "failed.log"
if failed_log.exists():
    print(f"\nSome assets failed. Check {failed_log}")
