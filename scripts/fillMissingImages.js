import fs from 'fs';
import path from 'path';

// Known working Pexels & Unsplash high resolution footwear photo URLs
const fallbackFootwearUrls = [
  'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1447264/pexels-photo-1447264.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1586093/pexels-photo-1586093.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/1858407/pexels-photo-1858407.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=700'
];

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 JanBalochStore/1.0' }
    });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) return false;
    fs.writeFileSync(dest, buf);
    return true;
  } catch (e) {
    return false;
  }
}

async function fixMissing() {
  console.log('Checking and filling any missing footwear images...');

  let urlIndex = 0;

  // Check Men's 01 to 50
  for (let i = 1; i <= 50; i++) {
    const num = String(i).padStart(2, '0');
    const p = path.resolve(`public/images/men/men-footwear-${num}.jpg`);
    if (!fs.existsSync(p) || fs.statSync(p).size < 5000) {
      const url = fallbackFootwearUrls[urlIndex % fallbackFootwearUrls.length];
      urlIndex++;
      process.stdout.write(`Fetching missing men-footwear-${num}... `);
      const ok = await download(url, p);
      console.log(ok ? '✓ Done' : '✗ Failed');
    }
  }

  // Check Women's 01 to 50
  for (let i = 1; i <= 50; i++) {
    const num = String(i).padStart(2, '0');
    const p = path.resolve(`public/images/women/women-footwear-${num}.jpg`);
    if (!fs.existsSync(p) || fs.statSync(p).size < 5000) {
      const url = fallbackFootwearUrls[urlIndex % fallbackFootwearUrls.length];
      urlIndex++;
      process.stdout.write(`Fetching missing women-footwear-${num}... `);
      const ok = await download(url, p);
      console.log(ok ? '✓ Done' : '✗ Failed');
    }
  }

  // Check Balochi 01 to 05
  for (let i = 1; i <= 5; i++) {
    const num = String(i).padStart(2, '0');
    const p = path.resolve(`public/images/balochi/balochi-chawat-${num}.jpg`);
    if (!fs.existsSync(p) || fs.statSync(p).size < 5000) {
      const url = fallbackFootwearUrls[urlIndex % fallbackFootwearUrls.length];
      urlIndex++;
      process.stdout.write(`Fetching missing balochi-chawat-${num}... `);
      const ok = await download(url, p);
      console.log(ok ? '✓ Done' : '✗ Failed');
    }
  }

  console.log('Finished missing check!');
}

fixMissing();
