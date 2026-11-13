"""
Builds the 1200x630 social-preview images for the blog (public/images/blog/og/<slug>.jpg).

Reads every post from src/data/blog/posts.ts (slug, title, image slug, focus) and composes:
the post's gallery photo, an emerald gradient, a fine gold frame, the title in Playfair Display
and the Meezan badge. Re-run after adding or renaming a post:

    python scripts/blog-og.py            (needs Pillow: pip install pillow)

Only existing site assets are used (gallery photos, the badge and the Playfair font from node_modules).
"""
from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / 'src/data/blog/posts.ts'
GALLERY = ROOT / 'public/images/gallery'
OUT = ROOT / 'public/images/blog/og'
BADGE = ROOT / 'public/images/brand/meezan-badge-280.png'
PLAYFAIR = ROOT / 'node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2'

W, H = 1200, 630
EMERALD = (8, 42, 33)
GOLD = (201, 162, 74)
GOLD_LIGHT = (232, 199, 103)


def font(size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(PLAYFAIR), size)
    f.set_variation_by_axes([weight])
    return f


def unq(s: str) -> str:
    return s.replace("\\'", "'")


def read_posts() -> list[dict]:
    src = POSTS.read_text(encoding='utf-8')
    posts = []
    for chunk in re.split(r"\n  \{\n", src)[1:]:
        slug = re.search(r"slug: '([^']+)'", chunk)
        title = re.search(r"\n    title: '((?:[^'\\]|\\.)*)'", chunk)
        img = re.search(r"image: \{\s*slug: '([^']+)'", chunk)
        focus = re.search(r"focus: '([\d.]+)% ([\d.]+)%'", chunk)
        if slug and title and img:
            posts.append({
                'slug': slug.group(1),
                'title': unq(title.group(1)),
                'image': img.group(1),
                'focus': (float(focus.group(1)) / 100, float(focus.group(2)) / 100) if focus else (0.5, 0.5),
            })
    return posts


def largest_photo(slug: str) -> Path:
    files = sorted(GALLERY.glob(f'{slug}-*.webp'), key=lambda p: int(re.search(r'-(\d+)\.webp$', p.name).group(1)))
    if not files:
        raise SystemExit(f'no gallery photo for {slug}')
    return files[-1]


def cover(img: Image.Image, focus: tuple[float, float]) -> Image.Image:
    """Scale to cover 1200x630, then crop around the focus point (like CSS object-position)."""
    scale = max(W / img.width, H / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = round((img.width - W) * focus[0])
    top = round((img.height - H) * focus[1])
    return img.crop((left, top, left + W, top + H))


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines, line = [], ''
    for word in text.split():
        test = f'{line} {word}'.strip()
        if draw.textlength(test, font=f) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def compose(title: str, photo: Path, focus: tuple[float, float], kicker: str, out: Path) -> None:
    base = cover(Image.open(photo).convert('RGB'), focus)

    # emerald wash: strong on the left where the text sits, clear on the right
    shade = Image.new('L', (W, H))
    px = shade.load()
    for x in range(W):
        a = max(0.0, 1 - x / (W * 0.78))
        for y in range(H):
            b = max(0.0, (y - H * 0.55) / (H * 0.45))
            px[x, y] = round(255 * min(0.94, 0.30 + 0.66 * a ** 1.15 + 0.35 * b))
    base = Image.composite(Image.new('RGB', (W, H), EMERALD), base, shade)

    d = ImageDraw.Draw(base)
    d.rectangle((22, 22, W - 23, H - 23), outline=GOLD + (0,), width=2)

    x0 = 70
    d.text((x0, 66), kicker, font=font(28, 500), fill=GOLD_LIGHT)
    d.line((x0, 112, x0 + 56, 112), fill=GOLD, width=2)

    size = 60
    while True:
        f = font(size, 600)
        lines = wrap(d, title, f, 640)
        if len(lines) <= 4 or size <= 42:
            break
        size -= 4
    y = 142
    for line in lines:
        d.text((x0, y), line, font=f, fill=(255, 255, 255))
        y += round(size * 1.18)

    badge = Image.open(BADGE).convert('RGBA').resize((72, 72), Image.LANCZOS)
    mask = Image.new('L', (72, 72))
    ImageDraw.Draw(mask).ellipse((0, 0, 71, 71), fill=255)
    by = H - 70 - 72
    d.ellipse((x0 - 3, by - 3, x0 + 74, by + 74), fill=GOLD)
    base.paste(badge, (x0, by), mask)
    d.text((x0 + 92, by + 10), 'Meezan Tours & Travels', font=font(28, 600), fill=(255, 255, 255))
    d.text((x0 + 92, by + 44), 'Hajj and Umrah, Pune', font=font(22, 400), fill=(230, 222, 200))

    out.parent.mkdir(parents=True, exist_ok=True)
    base.save(out, 'JPEG', quality=84, optimize=True, progressive=True)
    print('wrote', out.relative_to(ROOT), f'{out.stat().st_size // 1024} KB')


def main() -> None:
    posts = read_posts()
    if not posts:
        raise SystemExit('no posts found in posts.ts')
    for p in posts:
        compose(p['title'], largest_photo(p['image']), p['focus'], 'Meezan Journal', OUT / f"{p['slug']}.jpg")
    compose('Hajj and Umrah guides from a team that travels with pilgrims', largest_photo('haram-group-wide'), (0.5, 0.45), 'Meezan Journal', OUT / 'blog.jpg')


if __name__ == '__main__':
    main()
