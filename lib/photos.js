// Photography page: every image in public/fotografia is listed automatically.
// Drop new .jpg/.png/.webp files into that folder and they appear on the page.
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "public", "fotografia");
const EXT = /\.(jpe?g|png|webp)$/i;

// Read width/height from the file header (JPEG, PNG, WebP) without extra dependencies.
function imageSize(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (kind === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: walk the markers until a start-of-frame
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    let orientation = 1;
    while (i < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker === 0xe1 && buf.toString("ascii", i + 4, i + 8) === "Exif") {
        orientation = exifOrientation(buf, i + 10) || 1;
      }
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const h = buf.readUInt16BE(i + 5);
        const w = buf.readUInt16BE(i + 7);
        return orientation >= 5 ? { w: h, h: w } : { w, h };
      }
      i += 2 + len;
    }
  }
  return null;
}

function exifOrientation(buf, tiff) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const n = u16(ifd);
    for (let k = 0; k < n; k++) {
      const e = ifd + 2 + k * 12;
      if (u16(e) === 0x0112) return u16(e + 8);
    }
  } catch (e) {}
  return 1;
}

export function getPhotos() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => EXT.test(f) && !f.startsWith("."))
    .sort()
    .map((f) => {
      let size = null;
      try {
        size = imageSize(fs.readFileSync(path.join(DIR, f)));
      } catch (e) {}
      return { src: `/fotografia/${encodeURIComponent(f)}`, w: size?.w || 1200, h: size?.h || 1500 };
    });
}
