#!/usr/bin/env python3
"""Generate iOS AppIcon + Android launcher icons from wellness-shift-logo.png."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print('Install Pillow: python3 -m venv .venv && .venv/bin/pip install pillow', file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / 'src/assets/images/wellness-shift-logo.png'
SIZE = 1024
WHITE = (255, 255, 255, 255)


def strip_dark_background(logo: Image.Image, threshold: int = 48) -> Image.Image:
    """Make near-black pixels transparent so the mark sits cleanly on white."""
    logo = logo.convert('RGBA')
    pixels = logo.load()
    width, height = logo.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a and r <= threshold and g <= threshold and b <= threshold:
                pixels[x, y] = (r, g, b, 0)
    return logo


def build_master() -> Image.Image:
    logo = strip_dark_background(Image.open(LOGO_PATH).convert('RGBA'))
    try:
        alpha = logo.split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            logo = logo.crop(bbox)
    except Exception:
        pass

    base = Image.new('RGBA', (SIZE, SIZE), WHITE)

    logo_max = int(SIZE * 0.72)
    lw, lh = logo.size
    scale = logo_max / max(lw, lh)
    new_size = (int(lw * scale), int(lh * scale))
    logo_scaled = logo.resize(new_size, Image.Resampling.LANCZOS)

    cx, cy = SIZE // 2, SIZE // 2
    base.alpha_composite(logo_scaled, (cx - new_size[0] // 2, cy - new_size[1] // 2))

    return base.convert('RGB')


def build_launch_screen() -> Image.Image:
    """Purple #8C59BF canvas with a centered white circular logo badge."""
    purple = (140, 89, 191, 255)
    size = SIZE
    badge_d = 560

    logo = strip_dark_background(Image.open(LOGO_PATH).convert('RGBA'))
    try:
        alpha = logo.split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            logo = logo.crop(bbox)
    except Exception:
        pass

    base = Image.new('RGBA', (size, size), purple)
    badge = Image.new('RGBA', (badge_d, badge_d), (0, 0, 0, 0))
    from PIL import ImageDraw
    ImageDraw.Draw(badge).ellipse((0, 0, badge_d - 1, badge_d - 1), fill=WHITE)

    inner = int(badge_d * 0.82)
    lw, lh = logo.size
    scale = inner / max(lw, lh)
    new_size = (max(1, int(lw * scale)), max(1, int(lh * scale)))
    logo_scaled = logo.resize(new_size, Image.Resampling.LANCZOS)
    bx = (badge_d - new_size[0]) // 2 + 6
    by = (badge_d - new_size[1]) // 2 - 4
    badge.alpha_composite(logo_scaled, (bx, by))

    cx = (size - badge_d) // 2
    cy = (size - badge_d) // 2
    base.alpha_composite(badge, (cx, cy))
    return base.convert('RGB')


def main() -> None:
    icon_master = build_master()
    icon_master.save(ROOT / 'scripts/app-icon-1024.png', 'PNG')

    ios_sizes = {
        'iphone_20@2x.png': 40,
        'iphone_20@3x.png': 60,
        'iphone_29@2x.png': 58,
        'iphone_29@3x.png': 87,
        'iphone_40@2x.png': 80,
        'iphone_40@3x.png': 120,
        'iphone_60@2x.png': 120,
        'iphone_60@3x.png': 180,
        'ipad_20@1x.png': 20,
        'ipad_20@2x.png': 40,
        'ipad_29@1x.png': 29,
        'ipad_29@2x.png': 58,
        'ipad_40@1x.png': 40,
        'ipad_40@2x.png': 80,
        'ipad_76@1x.png': 76,
        'ipad_76@2x.png': 152,
        'ipad_83.5@2x.png': 167,
        'appstore_1024.png': 1024,
    }
    ios_dir = ROOT / 'ios/WellnessShift/Images.xcassets/AppIcon.appiconset'
    for name, dim in ios_sizes.items():
        icon_master.resize((dim, dim), Image.Resampling.LANCZOS).save(ios_dir / name, 'PNG')

    launch_dir = ROOT / 'ios/WellnessShift/Images.xcassets/LaunchScreen.imageset'
    build_launch_screen().save(launch_dir / 'icon-ios-1024x1024.png', 'PNG')

    android_sizes = {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192,
    }
    for folder, dim in android_sizes.items():
        out_dir = ROOT / f'android/app/src/main/res/{folder}'
        out_dir.mkdir(parents=True, exist_ok=True)
        icon = icon_master.resize((dim, dim), Image.Resampling.LANCZOS)
        icon.save(out_dir / 'ic_launcher.png', 'PNG')
        icon.save(out_dir / 'ic_launcher_round.png', 'PNG')

    print(f'Generated app icons in {ios_dir} and android mipmap folders')
    print(f'Generated centered launch screen in {launch_dir}')


if __name__ == '__main__':
    main()
