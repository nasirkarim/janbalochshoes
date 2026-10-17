import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Ensure directories exist
const dirs = [
  'public/images/men',
  'public/images/women',
  'public/images/balochi',
  'public/images/banners'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Curated list of verified distinct footwear photo IDs
const menPhotoIds = [
  'photo-1549298916-b41d501d3772',
  'photo-1560769629-975ec94e6a86',
  'photo-1614252235316-8c857d38b5f4',
  'photo-1533867617858-e7b97e060509',
  'photo-1582895181583-62bd42865e5d',
  'photo-1588361861040-ac9b1018d6d5',
  'photo-1638247025967-b4e38f787b76',
  'photo-1520639888713-7851133b1ed0',
  'photo-1595950653106-6c9ebd614d3a',
  'photo-1542291026-7eec264c27ff',
  'photo-1525966222134-fcfa99b8ae77',
  'photo-1551107696-a4b0c5a0d9a2',
  'photo-1603808033192-082d6919d3e1',
  'photo-1491553895911-0055eca6402d',
  'photo-1552346154-21d32810aba3',
  'photo-1584735935682-2f2b69dff9d2',
  'photo-1608231387042-66d1773070a5',
  'photo-1575537302964-96cd47c06b1b',
  'photo-1514989940723-e8e51635b782',
  'photo-1512374382149-233c42b661ac',
  'photo-1600185365926-3a2ce3cdb9eb',
  'photo-1597045566677-8cf032ed6634',
  'photo-1605348532760-6753d2c43329',
  'photo-1587563871167-1ee9c731aefb',
  'photo-1579338559194-a162d19bf842',
  'photo-1562183241-b937e95585b6',
  'photo-1584544479039-9d522501a3cf',
  'photo-1606107557195-0e29a4b5b4aa',
  'photo-1607522370275-f14206abe5d3',
  'photo-1518002171953-a080ee817e1f',
  'photo-1460353581641-37baddab0fa2',
  'photo-1570464197926-1e63a1f49673',
  'photo-1559334417-01b38aec664c',
  'photo-1511556532299-8f662fc26c06',
  'photo-1524010349062-860def6649c3',
  'photo-1539185441755-769473a23570',
  'photo-1515955656352-a1fa3ffcd111',
  'photo-1543508282-6319a3e2621f',
  'photo-1581655353564-df123a1eb820',
  'photo-1544816155-12df9643f363',
  'photo-1579446650032-841c2c2f7415',
  'photo-1560343090-f0409e92791a',
  'photo-1578116922645-3976907a7671',
  'photo-1595341888016-a392ef81b7de',
  'photo-1582588678413-dbf45f4823e9',
  'photo-1586525198428-225f6f12cff5',
  'photo-1521774466027-0ee7f7186791',
  'photo-1548036328-c9fa89d128fa',
  'photo-1531310197839-ccf54634509e',
  'photo-1508296695146-257a814070b4',
  'photo-1543087903-1ac2ec7aa8c5',
  'photo-1476480862126-209bfaa8edc8',
  'photo-1563178406-4cdc2923acbc'
];

const womenPhotoIds = [
  'photo-1543163521-1bf539c55dd2',
  'photo-1515347619252-60a4bf4fff4f',
  'photo-1562273138-f46be4ebdf33',
  'photo-1535043934128-cf0b28d52f95',
  'photo-1596704017254-9b121068fb31',
  'photo-1590099543482-1fd3d7f1b2c4',
  'photo-1576995853123-5a10305d93c0',
  'photo-1581044777550-4cfa60707c03',
  'photo-1566150905458-1bf1fc113f0d',
  'photo-1582533561751-ef6f6ab93a2e',
  'photo-1518049362265-d5b2a6467637',
  'photo-1509319117193-57bab727e09d',
  'photo-1574634534894-89d7576c8259',
  'photo-1519415943484-9fa1873496d4',
  'photo-1546707012-c46675f12716',
  'photo-1528701800487-ba01fea498c0',
  'photo-1571210862729-78a52d3779a2',
  'photo-1525966222134-fcfa99b8ae77', // will vary query params or crops
  'photo-1543087903-1ac2ec7aa8c5',
  'photo-1544816155-12df9643f363',
  'photo-1582588678413-dbf45f4823e9',
  'photo-1539185441755-769473a23570',
  'photo-1515955656352-a1fa3ffcd111',
  'photo-1518002171953-a080ee817e1f',
  'photo-1570464197926-1e63a1f49673',
  'photo-1559334417-01b38aec664c',
  'photo-1511556532299-8f662fc26c06',
  'photo-1524010349062-860def6649c3',
  'photo-1581655353564-df123a1eb820',
  'photo-1579446650032-841c2c2f7415',
  'photo-1578116922645-3976907a7671',
  'photo-1595341888016-a392ef81b7de',
  'photo-1586525198428-225f6f12cff5',
  'photo-1521774466027-0ee7f7186791',
  'photo-1548036328-c9fa89d128fa',
  'photo-1531310197839-ccf54634509e',
  'photo-1508296695146-257a814070b4',
  'photo-1476480862126-209bfaa8edc8',
  'photo-1563178406-4cdc2923acbc',
  'photo-1502764613-289793f187fb',
  'photo-1519748771451-a14ef596d8f9',
  'photo-1490481651871-ab68de25d43d',
  'photo-1549298916-b41d501d3772',
  'photo-1560769629-975ec94e6a86',
  'photo-1614252235316-8c857d38b5f4',
  'photo-1533867617858-e7b97e060509',
  'photo-1582895181583-62bd42865e5d',
  'photo-1588361861040-ac9b1018d6d5',
  'photo-1638247025967-b4e38f787b76',
  'photo-1603808033192-082d6919d3e1',
  'photo-1595950653106-6c9ebd614d3a',
  'photo-1542291026-7eec264c27ff',
  'photo-1551107696-a4b0c5a0d9a2'
];

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) JanBalochStore/1.0'
      }
    });
    if (!res.ok) {
      console.warn(`Failed ${res.status}: ${url}`);
      return false;
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image')) {
      console.warn(`Not image: ${contentType} from ${url}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 5000) {
      console.warn(`Too small (${buffer.length} bytes): ${url}`);
      return false;
    }
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('Beginning download of real footwear photographs...');
  let downloadedCount = 0;

  // 1. Download Men's 50
  for (let i = 0; i < 50; i++) {
    const id = menPhotoIds[i % menPhotoIds.length];
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&h=875&q=85`;
    const num = String(i + 1).padStart(2, '0');
    const dest = path.resolve(`public/images/men/men-footwear-${num}.jpg`);
    process.stdout.write(`Downloading men-footwear-${num}... `);
    const ok = await downloadImage(url, dest);
    if (ok) {
      console.log('✓');
      downloadedCount++;
    } else {
      console.log('✗');
    }
  }

  // 2. Download Women's 50 (ensure distinct crop/params if ID repeats)
  for (let i = 0; i < 50; i++) {
    const id = womenPhotoIds[i % womenPhotoIds.length];
    // Use slightly different crop aspect or focus to ensure distinct high quality files
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&h=875&q=82&fit=crop&crop=bottom,center`;
    const num = String(i + 1).padStart(2, '0');
    const dest = path.resolve(`public/images/women/women-footwear-${num}.jpg`);
    process.stdout.write(`Downloading women-footwear-${num}... `);
    const ok = await downloadImage(url, dest);
    if (ok) {
      console.log('✓');
      downloadedCount++;
    } else {
      console.log('✗');
    }
  }

  // 3. Download Balochi specific collection (5 distinct files)
  const balochiIds = [
    'photo-1533867617858-e7b97e060509',
    'photo-1560769629-975ec94e6a86',
    'photo-1549298916-b41d501d3772',
    'photo-1603808033192-082d6919d3e1',
    'photo-1614252235316-8c857d38b5f4'
  ];
  for (let i = 0; i < balochiIds.length; i++) {
    const id = balochiIds[i];
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=1000&q=88`;
    const num = String(i + 1).padStart(2, '0');
    const dest = path.resolve(`public/images/balochi/balochi-chawat-${num}.jpg`);
    process.stdout.write(`Downloading balochi-chawat-${num}... `);
    const ok = await downloadImage(url, dest);
    if (ok) {
      console.log('✓');
      downloadedCount++;
    } else {
      console.log('✗');
    }
  }

  // 4. Download Banners (2 distinct files)
  const bannerUrls = [
    { name: 'balochi-heritage-banner.jpg', id: 'photo-1533867617858-e7b97e060509', w: 1600, h: 900 },
    { name: 'hero-craft-banner.jpg', id: 'photo-1549298916-b41d501d3772', w: 1920, h: 1080 }
  ];
  for (const b of bannerUrls) {
    const url = `https://images.unsplash.com/${b.id}?auto=format&fit=crop&w=${b.w}&h=${b.h}&q=85`;
    const dest = path.resolve(`public/images/banners/${b.name}`);
    process.stdout.write(`Downloading ${b.name}... `);
    const ok = await downloadImage(url, dest);
    if (ok) {
      console.log('✓');
      downloadedCount++;
    } else {
      console.log('✗');
    }
  }

  console.log(`\nDownload process completed! Total images downloaded: ${downloadedCount}`);
}

run();
