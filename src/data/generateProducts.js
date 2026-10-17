import fs from 'fs';
import path from 'path';

const menTitles = [
  "Traditional Peshawari Chappal",
  "Premium Handmade Leather Peshawari Chappal",
  "Classic Black Peshawari Chappal",
  "Brown Leather Peshawari Chappal",
  "Dark Tan Traditional Chappal",
  "Premium Kaptaan Chappal",
  "Traditional Zalmi-Style Leather Chappal",
  "Balochi Chawat Traditional Footwear",
  "Authentic Balochi Leather Footwear",
  "Balochi Embroidered Traditional Footwear",
  "Balochi-Inspired Handmade Leather Sandals",
  "Pakistani Traditional Kolhapuri-Style Chappal",
  "Men's Handcrafted Leather Sandals",
  "Everyday Casual Leather Sandals",
  "Comfortable Home Leather Slippers",
  "Premium Hand-Stitched Leather Slippers",
  "Traditional Pakistani Wedding Footwear",
  "Executive Formal Black Leather Shoes",
  "Heritage Brown Oxford Shoes",
  "Classic Hand-Burnished Derby Shoes",
  "Men's Italian Leather Loafers",
  "Premium Penny Loafers",
  "Casual Suede Driver Loafers",
  "Pure White Casual Leather Sneakers",
  "Stealth Black Casual Sneakers",
  "Modern Everyday Urban Sneakers",
  "Dynamic Sports-Style Training Shoes",
  "AeroFlex Responsive Running Shoes",
  "Classic Low-Top Canvas Shoes",
  "Relaxed Casual Slip-On Shoes",
  "Men's Handcrafted Leather Moccasins",
  "Traditional Regional Ethnic Footwear",
  "Embroidered Festive Khussa for Men",
  "Pakistani Wedding Tilla Khussa for Men",
  "Handmade Buffalo Leather Chappal",
  "Premium Double-Strap Leather Sandals",
  "Cross-Strap Ergonomic Leather Sandals",
  "Comfortable Walking Cushion Sandals",
  "Rugged Outdoor Casual Sandals",
  "Minimalist Raw Leather Slippers",
  "Stylish Black Casual Comfort Shoes",
  "Tan Leather Casual Derby Shoes",
  "Traditional Brown Handmade Tire-Sole Chappal",
  "Premium Festive Gold-Thread Leather Footwear",
  "Balochi Cultural Heritage Footwear Collection",
  "Traditional Regional Hand-Tooled Leather Sandals",
  "Men's Everyday Comfort Foam Slippers",
  "Premium Handcrafted Formal Monk-Strap Sandals",
  "Modern Pakistani Casual Fusion Footwear",
  "Exclusive JAN BALOCH Signature Royal Footwear"
];

const womenTitles = [
  "Traditional Pakistani Women's Khussa",
  "Handmade Dabka Embroidered Khussa",
  "Golden Royal Wedding Khussa",
  "Silver Star Festive Khussa",
  "Multicolor Traditional Rangoli Khussa",
  "Floral Silk Embroidered Khussa",
  "Mirror-Work Festive Sheesha Khussa",
  "Traditional Sindhi-Inspired Embroidered Footwear",
  "Balochi-Inspired Embroidered Women's Footwear",
  "Traditional Balochi Chawat-Inspired Women's Footwear",
  "Pakistani Wedding Zari Flats",
  "Bridal Hand-Embroidered Velvet Flats",
  "Golden Glitter Party Sandals",
  "Silver Shimmer Festive Heel Sandals",
  "Women's Artisan Leather Strappy Sandals",
  "Flat Everyday Cushion Sandals",
  "Comfortable Daily-Wear Soft Chappal",
  "Traditional Pakistani Ladies' Leather Chappal",
  "Elegant Onyx Black Ladies' Chappal",
  "Rich Brown Leather Women's Sandals",
  "Warm Tan-Colored Casual Sandals",
  "Cross-Strap Women's Comfort Sandals",
  "Double-Strap Ladies' Ergonomic Sandals",
  "Minimalist Everyday Pointed Flats",
  "Premium Hand-Burnished Leather Flats",
  "Embellished Festive Tilla Flats",
  "Traditional Handmade Mustard Leather Khussa",
  "Colorful Embroidered Ethnic Festive Flats",
  "Elegant Wedding Guest Footwear",
  "Vibrant Mehndi Function Yellow Khussa",
  "Eid Festive Collection Velvet Khussa",
  "Radiant Festive Golden Flats",
  "Pearl-Embellished Royal Ivory Flats",
  "Hand-Beaded Traditional Bridal Footwear",
  "Floral Botanical Printed Summer Flats",
  "Women's Active Casual Sneakers",
  "Pure White Everyday Minimalist Sneakers",
  "Chic Black Lightweight Casual Sneakers",
  "Women's Ergonomic Walking Shoes",
  "Cloud-Comfort Slip-On Casual Shoes",
  "Women's Tailored Leather Loafers",
  "Elegant Formal Pointed Ballet Flats",
  "Low-Heel Delicate Party Sandals",
  "Stable Block-Heel Festive Evening Sandals",
  "Traditional Kashmiri Embroidered Slippers",
  "Premium Ladies' Padded Leather Slippers",
  "Ultra-Comfortable Quilted Home Slippers",
  "Pakistani Ethnic Hand-Braided Sandals",
  "Modern Fusion Traditional Khussa-Mule",
  "Exclusive JAN BALOCH Women's Signature Collection"
];

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function generateProducts() {
  const products = [];

  // Generate Men's products (50) with local image paths
  menTitles.forEach((title, index) => {
    const idNum = String(index + 1).padStart(3, '0');
    const id = `men-${idNum}`;
    const slug = slugify(title);
    const num = String(index + 1).padStart(2, '0');
    
    let category = 'mens-chappal';
    let isBalochi = false;
    let isFestive = false;
    let style = 'traditional';

    const tLower = title.toLowerCase();
    if (tLower.includes('balochi')) {
      category = 'balochi-traditional';
      isBalochi = true;
    } else if (tLower.includes('sneaker') || tLower.includes('running') || tLower.includes('canvas') || tLower.includes('sports')) {
      category = 'mens-sneakers';
      style = 'contemporary';
    } else if (tLower.includes('sandal') || tLower.includes('slipper') || tLower.includes('moccasin')) {
      category = 'mens-sandals';
    } else if (tLower.includes('oxford') || tLower.includes('derby') || tLower.includes('formal') || tLower.includes('loafer')) {
      category = 'mens-shoes';
      style = 'contemporary';
    } else if (tLower.includes('khussa') || tLower.includes('wedding') || tLower.includes('festive')) {
      category = 'festive-collection';
      isFestive = true;
    }

    if (tLower.includes('wedding') || tLower.includes('festive') || tLower.includes('tilla') || tLower.includes('embroidered')) {
      isFestive = true;
    }

    const basePrice = 3200 + ((index * 137) % 5200);
    const price = Math.round(basePrice / 100) * 100;
    const originalPrice = Math.round((price * 1.25) / 100) * 100;

    const badge = index % 5 === 0 ? 'Bestseller' : (index % 7 === 0 ? 'New Arrival' : (isBalochi ? 'Balochi Heritage' : (isFestive ? 'Festive' : 'Handcrafted')));

    // Use Balochi image for Balochi products if available, else men-footwear
    let imagePath = `/images/men/men-footwear-${num}.jpg`;
    if (isBalochi) {
      const bIndex = String(((index % 5) + 1)).padStart(2, '0');
      imagePath = `/images/balochi/balochi-chawat-${bIndex}.jpg`;
    }

    const nextIndex = String(((index + 1) % 50) + 1).padStart(2, '0');
    const thirdIndex = String(((index + 3) % 50) + 1).padStart(2, '0');

    products.push({
      id,
      name: title,
      slug,
      category,
      audience: 'men',
      style,
      price,
      originalPrice,
      shortDescription: `Artisan handcrafted Pakistani ${title.toLowerCase()} tailored for unmatched durability and comfort.`,
      description: `The ${title} is meticulously crafted by master shoemakers in Pakistan. Built with authentic full-grain leather, balanced arch support, and reinforced welt stitching. Ideal for cultural festivities, Friday prayers, office attire, and everyday distinction.`,
      image: imagePath,
      gallery: [
        imagePath,
        `/images/men/men-footwear-${nextIndex}.jpg`,
        `/images/men/men-footwear-${thirdIndex}.jpg`
      ],
      sizes: [39, 40, 41, 42, 43, 44, 45],
      colors: ['Midnight Black', 'Rich Tan', 'Deep Brown', 'Mustard'],
      rating: Number((4.6 + ((index % 5) * 0.1)).toFixed(1)),
      reviewCount: 15 + ((index * 3) % 45),
      isFeatured: index < 8 || isBalochi,
      isBestseller: index % 4 === 0,
      isNewArrival: index % 6 === 0,
      isFestive,
      isBalochi,
      badge
    });
  });

  // Generate Women's products (50) with local image paths
  womenTitles.forEach((title, index) => {
    const idNum = String(index + 1).padStart(3, '0');
    const id = `women-${idNum}`;
    const slug = slugify(title);
    const num = String(index + 1).padStart(2, '0');
    
    let category = 'womens-khussa';
    let isBalochi = false;
    let isFestive = false;
    let style = 'traditional';

    const tLower = title.toLowerCase();
    if (tLower.includes('balochi')) {
      category = 'balochi-traditional';
      isBalochi = true;
    } else if (tLower.includes('sneaker') || tLower.includes('running') || tLower.includes('walking') || tLower.includes('slip-on')) {
      category = 'womens-sneakers';
      style = 'contemporary';
    } else if (tLower.includes('sandal') || tLower.includes('chappal') || tLower.includes('slipper')) {
      category = 'womens-sandals';
    } else if (tLower.includes('heel') || tLower.includes('flat') || tLower.includes('loafer')) {
      category = 'womens-shoes';
      style = 'contemporary';
    } else if (tLower.includes('khussa') || tLower.includes('juttis')) {
      category = 'womens-khussa';
    }

    if (tLower.includes('wedding') || tLower.includes('festive') || tLower.includes('dabka') || tLower.includes('zari') || tLower.includes('sheesha') || tLower.includes('mehndi') || tLower.includes('eid') || tLower.includes('pearl')) {
      isFestive = true;
    }

    const basePrice = 2800 + ((index * 119) % 4800);
    const price = Math.round(basePrice / 100) * 100;
    const originalPrice = Math.round((price * 1.25) / 100) * 100;

    const badge = index % 5 === 0 ? 'Bestseller' : (index % 7 === 0 ? 'New Arrival' : (isBalochi ? 'Balochi Heritage' : (isFestive ? 'Festive Gold' : 'Artisan Handcrafted')));

    let imagePath = `/images/women/women-footwear-${num}.jpg`;
    if (isBalochi) {
      const bIndex = String(((index % 5) + 1)).padStart(2, '0');
      imagePath = `/images/balochi/balochi-chawat-${bIndex}.jpg`;
    }

    const nextIndex = String(((index + 1) % 50) + 1).padStart(2, '0');
    const thirdIndex = String(((index + 3) % 50) + 1).padStart(2, '0');

    products.push({
      id,
      name: title,
      slug,
      category,
      audience: 'women',
      style,
      price,
      originalPrice,
      shortDescription: `Exquisite hand-finished Pakistani ${title.toLowerCase()} featuring royal embroidery and cushioned insoles.`,
      description: `Designed for celebratory charm and effortless grace. The ${title} combines traditional craftsmanship with cushioned footbeds to ensure total comfort across wedding receptions, Eid mornings, and social gatherings.`,
      image: imagePath,
      gallery: [
        imagePath,
        `/images/women/women-footwear-${nextIndex}.jpg`,
        `/images/women/women-footwear-${thirdIndex}.jpg`
      ],
      sizes: [36, 37, 38, 39, 40, 41],
      colors: ['Royal Gold', 'Pure Silver', 'Ruby Red', 'Emerald Green', 'Jet Black', 'Pearl White'],
      rating: Number((4.7 + ((index % 4) * 0.1)).toFixed(1)),
      reviewCount: 18 + ((index * 4) % 55),
      isFeatured: index < 8 || isBalochi,
      isBestseller: index % 3 === 0,
      isNewArrival: index % 5 === 0,
      isFestive,
      isBalochi,
      badge
    });
  });

  const fileContent = `/**
 * Centralized Pakistani Footwear Dataset (100 Unique Products)
 * Includes 50 Men's & Boys' Products and 50 Women's & Girls' Products
 * All items reference real downloaded local photographs in /images/men, /images/women, and /images/balochi
 */
export const PRODUCTS = ${JSON.stringify(products, null, 2)};

export default PRODUCTS;
`;

  fs.writeFileSync(path.resolve('./src/data/products.js'), fileContent, 'utf-8');
  console.log(`Successfully written ${products.length} products with local image paths to src/data/products.js`);
}

generateProducts();
