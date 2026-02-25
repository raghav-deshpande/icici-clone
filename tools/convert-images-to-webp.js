const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'public');
const exts = ['.png', '.jpg', '.jpeg'];

async function walk(dir) {
  let files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(await walk(res));
    else files.push(res);
  }
  return files;
}

async function convert(file) {
  try {
    const ext = path.extname(file).toLowerCase();
    if (!exts.includes(ext)) return;
    const out = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    // Skip if webp already exists and is newer
    try {
      const [s1, s2] = await Promise.all([fs.stat(file), fs.stat(out)]);
      if (s2.mtimeMs >= s1.mtimeMs) return;
    } catch (e) {}

    await sharp(file)
      .webp({ quality: 80 })
      .toFile(out);
    console.log('converted', file, '->', out);
  } catch (e) {
    console.error('error converting', file, e.message);
  }
}

(async function(){
  const files = await walk(root);
  const images = files.filter(f => exts.includes(path.extname(f).toLowerCase()));
  for (const img of images) await convert(img);
  console.log('done');
})();
