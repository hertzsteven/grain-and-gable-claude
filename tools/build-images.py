#!/usr/bin/env python3
"""Resize and compress the source photos into the repo's images/ folder.

The originals (1152x864) live outside the repo in ../photos/ and are never
committed. Run from the repo root:

    python3 tools/build-images.py [path-to-source-photos]

Produces, for each photo, a 1152px and a 768px wide variant in both JPEG
(fallback) and WebP (preferred), plus a tiny inline-ready blur placeholder.
"""

import os
import sys

from PIL import Image

SRC_DIR = sys.argv[1] if len(sys.argv) > 1 else "../photos"
OUT_DIR = "images"
WIDTHS = (1152, 768)
JPEG_QUALITY = 78
WEBP_QUALITY = 74

PHOTOS = (
    "1-kitchen-built-ins.jpg",
    "2-deck-stairs.jpg",
    "3-hand-planing.jpg",
    "4-dovetail-joint.jpg",
    "5-workshop.jpg",
)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for name in PHOTOS:
        src = os.path.join(SRC_DIR, name)
        stem = os.path.splitext(name)[0]
        with Image.open(src) as im:
            im = im.convert("RGB")
            for width in WIDTHS:
                if width > im.width:  # never upscale
                    continue
                height = round(im.height * width / im.width)
                resized = im.resize((width, height), Image.LANCZOS)
                jpg = os.path.join(OUT_DIR, f"{stem}-{width}.jpg")
                webp = os.path.join(OUT_DIR, f"{stem}-{width}.webp")
                resized.save(jpg, "JPEG", quality=JPEG_QUALITY,
                             optimize=True, progressive=True)
                resized.save(webp, "WEBP", quality=WEBP_QUALITY, method=6)
                print(f"{jpg} {width}x{height} "
                      f"{os.path.getsize(jpg) // 1024}K / "
                      f"{os.path.getsize(webp) // 1024}K webp")


if __name__ == "__main__":
    main()
