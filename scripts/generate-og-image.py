#!/usr/bin/env python3
"""Generate og-image.png social card for the portfolio. Run from repo root."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

BG         = (15,  23,  42)
SURFACE    = (30,  41,  59)
BLUE       = (59,  130, 246)
BLUE_DARK  = (30,  58,  138)
TEXT_WHITE = (241, 245, 249)
TEXT_GRAY  = (148, 163, 184)
TEXT_MUTED = (71,  85,  105)
BORDER     = (51,  65,  85)
GOLD       = (245, 158, 11)

img  = Image.new('RGB', (W, H), BG)
draw = ImageDraw.Draw(img)

for i in range(400):
    t = i / 400
    r = int(BG[0] + (BLUE_DARK[0] - BG[0]) * (1 - t) * 0.4)
    g = int(BG[1] + (BLUE_DARK[1] - BG[1]) * (1 - t) * 0.4)
    b = int(BG[2] + (BLUE_DARK[2] - BG[2]) * (1 - t) * 0.4)
    draw.line([(i, 0), (i, H)], fill=(r, g, b))

font_path = '/System/Library/Fonts/HelveticaNeue.ttc'
fn_name   = ImageFont.truetype(font_path, 76, index=1)
fn_role   = ImageFont.truetype(font_path, 36, index=0)
fn_tech   = ImageFont.truetype(font_path, 26, index=0)
fn_badge  = ImageFont.truetype(font_path, 20, index=0)
fn_footer = ImageFont.truetype(font_path, 22, index=0)

cx, cy = 980, 315
draw.ellipse([cx-260, cy-260, cx+260, cy+260], outline=BLUE_DARK, width=1)
draw.ellipse([cx-180, cy-180, cx+180, cy+180], outline=BLUE_DARK, width=1)
draw.ellipse([cx-100, cy-100, cx+100, cy+100], outline=BLUE, width=2)
draw.ellipse([cx-40,  cy-40,  cx+40,  cy+40],  fill=BLUE_DARK)
draw.ellipse([cx-12,  cy-12,  cx+12,  cy+12],  fill=BLUE)

draw.rounded_rectangle([80, 160, 85, 470], radius=3, fill=BLUE)

draw.text((114, 210), "Federico López", font=fn_name, fill=TEXT_WHITE)
draw.text((114, 308), "Senior Frontend Engineer", font=fn_role, fill=BLUE)
draw.text((114, 370), "React  ·  TypeScript  ·  Next.js", font=fn_tech, fill=TEXT_GRAY)

draw.rounded_rectangle([114, 415, 495, 463], radius=24, fill=SURFACE, outline=BORDER, width=1)
draw.text((138, 432), "★", font=fn_badge, fill=GOLD)
draw.text((163, 432), "Featured in The New York Times", font=fn_badge, fill=TEXT_GRAY)

draw.rectangle([80, 540, 1120, 541], fill=SURFACE)
draw.text((114, 560), "federicoglopez.dev", font=fn_footer, fill=TEXT_MUTED)
right_text = "portfolio · 2025"
bbox = draw.textbbox((0, 0), right_text, font=fn_footer)
draw.text((1120 - (bbox[2] - bbox[0]), 560), right_text, font=fn_footer, fill=BORDER)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'images', 'og-image.png')
img.save(out, 'PNG', optimize=True)
print(f"Generated {os.path.abspath(out)} ({os.path.getsize(out) // 1024}KB)")
