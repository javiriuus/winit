// Minimal Markdown → HTML for forum posts (headings, paragraphs, lists, quotes,
// images, bold, italic, links). Posts are written only by the site owner.
import { responsive } from "./img";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text) {
  let s = escape(text);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const external = /^https?:\/\//.test(url);
    return `<a href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return s;
}

const IMG = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

// sizeOf(src) → { w, h } | null, so images reserve their space and can open in the lightbox.
// Grid photos are small, single photos span the post column (64rem).
function imgTag(src, alt, sizeOf, inGrid = false) {
  const size = sizeOf && sizeOf(src);
  const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
  const r = responsive(src, inGrid ? "(max-width: 760px) 50vw, 32rem" : "(max-width: 1100px) 100vw, 64rem", inGrid ? [640, 1080] : [828, 1200, 1920]);
  const set = r.srcSet ? ` srcset="${escape(r.srcSet)}" sizes="${escape(r.sizes)}"` : "";
  return `<img src="${escape(r.src)}"${set} data-full="${escape(src)}" alt="${escape(alt)}"${dims} loading="lazy" decoding="async" />`;
}

export function markdownToHtml(md, sizeOf) {
  const blocks = md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const first = lines[0];
      const images = lines.map((l) => l.trim().match(IMG));
      // Several images on consecutive lines → a photo grid (no captions).
      if (images.length > 1 && images.every(Boolean)) {
        const cols = images.length <= 3 ? images.length : 2;
        return `<div class="post-gallery" style="--cols:${cols}">${images
          .map(([, alt, src]) => `<figure>${imgTag(src, alt, sizeOf, true)}</figure>`)
          .join("")}</div>`;
      }
      const img = block.trim().match(IMG);
      if (img) {
        const [, alt, src] = img;
        return `<figure>${imgTag(src, alt, sizeOf)}${alt ? `<figcaption>${inline(alt)}</figcaption>` : ""}</figure>`;
      }
      if (/^###\s/.test(first)) return `<h4>${inline(first.replace(/^###\s+/, ""))}</h4>`;
      if (/^##\s/.test(first)) return `<h3>${inline(first.replace(/^##\s+/, ""))}</h3>`;
      if (/^#\s/.test(first)) return `<h2>${inline(first.replace(/^#\s+/, ""))}</h2>`;
      if (lines.every((l) => /^[-*]\s/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
      }
      if (lines.every((l) => /^>\s?/.test(l))) {
        return `<blockquote><p>${inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</p></blockquote>`;
      }
      return `<p>${lines.map(inline).join("<br />")}</p>`;
    })
    .join("\n");
}

export function plainText(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*#>`_-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
