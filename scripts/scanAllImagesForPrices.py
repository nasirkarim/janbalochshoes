import os
import re
from rapidocr_onnxruntime import RapidOCR

engine = RapidOCR()

search_dirs = [
    'public/images/pdf-products',
    'public/images/men',
    'public/images/women',
    'public/images/balochi',
    'public/images/banners'
]

price_patterns = [
    r'rs\.?',
    r'pkr',
    r'/\-?',
    r'\$\d+',
    r'\b\d{3,5}\b' # Numbers like 1500, 2000, 3500 etc.
]

results = []
total_images = 0
images_with_text = 0
images_with_price = 0

print("Starting OCR scan of all images in project...")

for sdir in search_dirs:
    if not os.path.exists(sdir):
        continue
    files = sorted(os.listdir(sdir))
    for f in files:
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        total_images += 1
        img_path = os.path.join(sdir, f)
        try:
            ocr_res, _ = engine(img_path)
        except Exception as e:
            print(f"Error on {img_path}: {e}")
            continue

        texts = []
        has_price_match = False
        detected_price_snippets = []

        if ocr_res:
            images_with_text += 1
            for item in ocr_res:
                box, txt, score = item[0], item[1], item[2]
                texts.append(txt)
                lower_txt = txt.lower().strip()
                # Check for currency symbols or price indicators
                if any(re.search(p, lower_txt) for p in [r'rs\.?', r'pkr', r'price', r'sale', r'\$\d+']):
                    has_price_match = True
                    detected_price_snippets.append((txt, score, box))
                # Check for isolated 4-digit prices like 2500, 3200
                elif re.search(r'^\d{3,5}$', lower_txt) and int(lower_txt) in range(800, 25000):
                    has_price_match = True
                    detected_price_snippets.append((txt, score, box))

        if has_price_match:
            images_with_price += 1
            print(f"[PRICE DETECTED] in {img_path}: {detected_price_snippets}")
        elif texts:
            # Uncomment if helpful to see other detected labels (brands/sizes)
            pass

        results.append({
            'file': img_path,
            'has_text': bool(texts),
            'has_price': has_price_match,
            'texts': texts,
            'price_snippets': detected_price_snippets
        })

print("\n--- OCR Scan Summary ---")
print(f"Total images scanned: {total_images}")
print(f"Images with any text detected: {images_with_text}")
print(f"Images with price-like text detected: {images_with_price}")

import json
with open('scripts/ocr_scan_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
