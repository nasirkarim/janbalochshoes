import json
import os

items = [
  {"page": 1, "name": "Burgundy Hand-Tooled Balochi Chawat Chappal", "cat": "balochi-traditional", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean photograph; small DAST brand emblem attached."},
  {"page": 2, "name": "Dark Green Traditional Peshawari Chappal", "cat": "mens-chappal", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean studio cutout photograph."},
  {"page": 3, "name": "Dual-Strap Ergonomic Leather Sandal - Grey", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean in-store display shot."},
  {"page": 4, "name": "Skechers Go Walk Navy & Tan Knit Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean footwear photo with Go Walk branding."},
  {"page": 5, "name": "Artisan Black Leather Buckle Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean photograph; white brand backing card visible under strap."},
  {"page": 6, "name": "Dual-Band Grey Cushioned Comfort Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean display photo with CEWU insole branding."},
  {"page": 7, "name": "Gowall Sport Navy Mesh Athletic Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean display photo with Gowall tongue logo."},
  {"page": 8, "name": "Handcrafted Grey Leather Moccasin Derby", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean hand-held store photograph."},
  {"page": 9, "name": "Gowall Sport Navy Running Trainer", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean front-angle athletic sneaker photo."},
  {"page": 10, "name": "Tan Cross-Strap Ergonomic Leather Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean photo; red circular brand swing tag attached."},
  {"page": 11, "name": "Heritage Balochi Chawat Lifestyle On-Model", "cat": "balochi-traditional", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean editorial lifestyle photograph."},
  {"page": 12, "name": "Camel Tan Double-Strap Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean photo with oval insole brand label."},
  {"page": 13, "name": "Rugged Outdoor Strap Sandal - Khaki", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean outdoor casual strap sandal photo."},
  {"page": 14, "name": "Double Buckle Comfort Slide - Almond Beige", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean photo with Shoe Point branding on footbed."},
  {"page": 15, "name": "Crocodile-Textured Peshawari Chappal - Black", "cat": "mens-chappal", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean outdoor stone shot; heel liner has size 9 sticker and website label."},
  {"page": 16, "name": "Executive Burnished Leather Oxford Derby - Brown", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean hand-held photo with ICLAS insole."},
  {"page": 17, "name": "Mustard Tan Buckle Leather Comfort Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean display photo with decorative metal crest."},
  {"page": 18, "name": "Air-Cooled Brown Mesh Athletic Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean athletic sneaker photo; Ultra Go card visible."},
  {"page": 19, "name": "Signature Pure White Loafer with Silver Buckle", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean luxury slip-on loafer photo."},
  {"page": 20, "name": "Honey Tan Double-Strap Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean hand-held display photo."},
  {"page": 21, "name": "Breathable Brown Air Mesh Running Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean running trainer photo."},
  {"page": 22, "name": "Executive White Calfskin Loafer with Buckle", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean white loafer photo."},
  {"page": 23, "name": "Comfort Cushion Tan Leather Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean slide sandal photo."},
  {"page": 24, "name": "AeroFlex Light Grey Dynamic Training Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean lightweight trainer photo."},
  {"page": 25, "name": "Handmade Tan Leather Peshawari Chappal", "cat": "mens-chappal", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean studio cutout photo."},
  {"page": 26, "name": "Beige Casual Double-Strap Summer Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean display photo."},
  {"page": 27, "name": "Womens Rose Pink Knit Slip-on Sneaker", "cat": "womens-sneakers", "aud": "women", "clean": True, "embedded_price": False, "notes": "Clean women casual slip-on photo."},
  {"page": 28, "name": "Hand-Burnished Mocha Brown Horsebit Loafer", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean luxury loafer photo."},
  {"page": 29, "name": "Womens Lavender Grey Cloud-Knit Walking Sneaker", "cat": "womens-sneakers", "aud": "women", "clean": True, "embedded_price": False, "notes": "Clean knit walking shoe with Fashion badge."},
  {"page": 30, "name": "Cream Off-White Double Strap Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean comfort sandal photo."},
  {"page": 31, "name": "Contemporary Desert Sand Lace-up Derby", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean formal/casual derby photo."},
  {"page": 32, "name": "Womens White Platform Star-Chain Sneaker", "cat": "womens-sneakers", "aud": "women", "clean": True, "embedded_price": False, "notes": "Clean fashion chunky sneaker photo."},
  {"page": 33, "name": "Camel Tan Comfort Suede Slip-on Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean casual loafer sneaker photo."},
  {"page": 34, "name": "Traditional Crocodile-Grain Kaptaan Chappal", "cat": "mens-chappal", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean handcrafted Peshawari chappal photo."},
  {"page": 35, "name": "Espresso Brown Grained Leather Loafer", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean executive loafer photo."},
  {"page": 36, "name": "Womens Blush Pink Seamless Knit Walking Sneaker", "cat": "womens-sneakers", "aud": "women", "clean": True, "embedded_price": False, "notes": "Clean soft knit slip-on photo."},
  {"page": 37, "name": "Womens Lilac Purple Knit Everyday Sneaker", "cat": "womens-sneakers", "aud": "women", "clean": True, "embedded_price": False, "notes": "Clean comfortable walking shoe photo."},
  {"page": 38, "name": "Khaki Tan Ultra-Go Comfort Casual Shoe", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean hand-held shoe photo with Ultra Go tag."},
  {"page": 39, "name": "Navy Blue Textured Slip-on Canvas Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean casual slip-on photo."},
  {"page": 40, "name": "Slate Navy Woven Band Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean strap slide sandal photo."},
  {"page": 41, "name": "Steel Grey Urban Flex Lace-up Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean modern casual sneaker photo."},
  {"page": 42, "name": "Butterscotch Tan Double Buckle Leather Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean comfortable leather sandal photo."},
  {"page": 43, "name": "Almond Beige Suede Tassel Driver Loafer", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean luxury tassel loafer photo."},
  {"page": 44, "name": "Navy & Tan 1st Choice Responsive Running Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean multi-tone athletic sneaker photo."},
  {"page": 45, "name": "Ivory Cream Double-Strap Comfort Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean soft insole sandal photo."},
  {"page": 46, "name": "Charcoal Grey Medicated Insole Casual Shoe", "cat": "mens-shoes", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean tile-floor photo with geometric toe stitch."},
  {"page": 47, "name": "Stealth Black Breathable Mesh Lace-up Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean floor display sneaker photo."},
  {"page": 48, "name": "Black Gloss Full-Grain Peshawari Chappal", "cat": "mens-chappal", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean studio cutout Peshawari footwear photo."},
  {"page": 49, "name": "Taupe Grey Performance Lace-up Trainer Sneaker", "cat": "mens-sneakers", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean display photo."},
  {"page": 50, "name": "Warm Tan Ergonomic Cushion Slide Sandal", "cat": "mens-sandals", "aud": "men", "clean": True, "embedded_price": False, "notes": "Clean comfort sandal photo."}
]

manifest = []
for i in range(1, 101):
    fn = f"product-{i:03d}.jpg"
    if i <= 50:
        base = items[i - 1]
        manifest.append({
            "imageNumber": i,
            "filename": fn,
            "sourcePdfPage": i,
            "productCategory": base["cat"],
            "audience": base["aud"],
            "productName": base["name"],
            "aspectRatio": "original",
            "isCleanAndUsable": base["clean"],
            "hasEmbeddedPrice": base["embedded_price"],
            "notes": base["notes"]
        })
    else:
        orig_page = 101 - i
        base = items[orig_page - 1]
        manifest.append({
            "imageNumber": i,
            "filename": fn,
            "sourcePdfPage": i,
            "productCategory": base["cat"],
            "audience": base["aud"],
            "productName": "JAN BALOCH Signature " + base["name"],
            "aspectRatio": "1080x1080 square",
            "pairedImageNumber": orig_page,
            "isCleanAndUsable": base["clean"],
            "hasEmbeddedPrice": base["embedded_price"],
            "notes": f"Square 1080x1080 catalog view of page {orig_page}. " + base["notes"]
        })

os.makedirs("public/images/pdf-products", exist_ok=True)
with open("public/images/pdf-products/manifest.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print(f"Manifest written with {len(manifest)} items.")
