const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, '..', 'public');

function isImageExt(src) {
  return /\.(png|jpe?g)$/i.test(src);
}

async function walk(dir) {
  let files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(await walk(res));
    else files.push(res);
  }
  return files;
}

(async function(){
  const files = await walk(publicDir);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  for (const file of htmlFiles) {
    let content = await fs.readFile(file, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });
    let changed = false;

    $('img').each((i, img) => {
      const $img = $(img);
      const src = $img.attr('src') || $img.attr('data-src');
      if (!src) return;
      if (!isImageExt(src)) return;
      // skip if already wrapped in picture
      if ($img.parent().is('picture')) return;
      const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
      const attrs = {};
      for (const attr of img.attribs ? Object.keys(img.attribs) : []) attrs[attr] = $img.attr(attr);
      const imgHtml = $('<img>').attr(attrs);
      const picture = $('<picture>');
      picture.append($('<source>').attr('type','image/webp').attr('srcset', webp));
      picture.append(imgHtml);
      $img.replaceWith(picture);
      changed = true;
    });

    if (changed) {
      await fs.writeFile(file, $.html(), 'utf8');
      console.log('updated', file);
    }
  }
  console.log('html update done');
})();
