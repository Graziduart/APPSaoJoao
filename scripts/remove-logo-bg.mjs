import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../assets/logo-faculdade-source.png');
const output = path.join(__dirname, '../assets/logo-faculdade.png');

function isBackgroundWhite(r, g, b) {
  return r > 228 && g > 228 && b > 228;
}

function removeWhiteBackground(data, width, height, channels) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];

  const pushIfWhite = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * channels;
    if (!isBackgroundWhite(data[i], data[i + 1], data[i + 2])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    pushIfWhite(x, 0);
    pushIfWhite(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfWhite(0, y);
    pushIfWhite(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    pushIfWhite(x - 1, y);
    pushIfWhite(x + 1, y);
    pushIfWhite(x, y - 1);
    pushIfWhite(x, y + 1);
  }

  for (let idx = 0; idx < total; idx++) {
    if (!visited[idx]) continue;
    const i = idx * channels;
    data[i + 3] = 0;
  }
}

const meta = await sharp(input).metadata();
const cropTop = Math.floor(meta.height * 0.54);

const { data, info } = await sharp(input)
  .extract({
    left: 0,
    top: cropTop,
    width: meta.width,
    height: meta.height - cropTop,
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

removeWhiteBackground(data, info.width, info.height, info.channels);

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .trim({ threshold: 12 })
  .png()
  .toFile(output);

console.log('Logo salva sem fundo branco:', output);
