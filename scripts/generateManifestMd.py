import json

with open('public/images/pdf-products/manifest.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

lines = []
lines.append('# JAN BALOCH SHOES STORE — PDF IMAGE ASSET MANIFEST')
lines.append('Comprehensive accounting of all 100 images extracted from `shoes_catalog.pdf`.\n')
lines.append('| # | Filename | PDF Page | Product Title | Category | Audience | Clean & Usable | Embedded Price | Notes |')
lines.append('|---|---|---|---|---|---|---|---|---|')

for item in items:
    clean_str = 'Yes' if item['isCleanAndUsable'] else 'No'
    price_str = 'None' if not item['hasEmbeddedPrice'] else 'Yes'
    num = item['imageNumber']
    fn = item['filename']
    pg = item['sourcePdfPage']
    title = item['productName']
    cat = item['productCategory']
    aud = item['audience']
    notes = item['notes']
    lines.append(f'| {num} | `{fn}` | Page {pg} | {title} | {cat} | {aud} | {clean_str} | {price_str} | {notes} |')

md_content = '\n'.join(lines)

artifact_path = r'C:\Users\Dell Latitude 5590\.gemini\antigravity-ide\brain\3d1d1b8c-f077-4115-a628-be30478d0d6d\image_manifest.md'
with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write(md_content)

print(f'Successfully wrote image_manifest.md artifact ({len(items)} rows).')
