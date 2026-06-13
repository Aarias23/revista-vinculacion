from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont


DATA = Path("_data/pasantes_2025_2026.yml")
OUT = Path("assets/source/pasantes/2025-2026/audit")
OUT.mkdir(parents=True, exist_ok=True)


def font(size):
    for name in ("arial.ttf", "calibri.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()


title_font = font(18)
body_font = font(13)

def unquote(value):
    value = value.strip()
    if value.startswith('"') and value.endswith('"'):
        value = value[1:-1]
    return value.replace('\\"', '"').replace("\\\\", "\\")


data = {"areas": {}}
current_area = None
current_item = None

for raw in DATA.read_text(encoding="utf-8").splitlines():
    line = raw.rstrip()
    stripped = line.strip()
    if not stripped or stripped.startswith("#") or stripped == "areas:":
        continue
    if line.startswith("  ") and not line.startswith("    ") and stripped.endswith(":"):
        current_area = stripped[:-1]
        data["areas"][current_area] = []
    elif stripped.startswith("- nombre:"):
        current_item = {"nombre": unquote(stripped.split(":", 1)[1])}
        data["areas"][current_area].append(current_item)
    elif current_item is not None and ":" in stripped:
        key, value = stripped.split(":", 1)
        current_item[key] = unquote(value)

for area, items in data["areas"].items():
    cell_w, cell_h = 230, 330
    cols = 5
    rows = (len(items) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "white")
    draw = ImageDraw.Draw(sheet)

    for index, item in enumerate(items):
        x = (index % cols) * cell_w
        y = (index // cols) * cell_h
        photo = Image.open(item["foto"].lstrip("/")).convert("RGB")
        photo.thumbnail((190, 205))
        px = x + (cell_w - photo.width) // 2
        sheet.paste(photo, (px, y + 10))

        label = f"{index + 1:02d}. {item['nombre']}"
        lines = []
        for part in textwrap.wrap(label, width=24):
            lines.append(part)
        lines.extend(textwrap.wrap(item["empresa"], width=27)[:2])

        ty = y + 225
        for line_no, line in enumerate(lines[:5]):
            draw.text((x + 12, ty + (line_no * 18)), line, fill=(20, 35, 50), font=body_font)

    sheet.save(OUT / f"{area}-contact-sheet.jpg", quality=92)
    print(OUT / f"{area}-contact-sheet.jpg")
