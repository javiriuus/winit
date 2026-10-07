// Minimal Markdown → HTML for forum posts (headings, paragraphs, lists, quotes,
// images, bold, italic, links). Posts are written only by the site owner.

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

export function markdownToHtml(md) {
  const blocks = md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const first = lines[0];
      const img = block.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
      if (img) {
        const [, alt, src] = img;
        return `<figure><img src="${escape(src)}" alt="${escape(alt)}" loading="lazy" />${
          alt ? `<figcaption>${inline(alt)}</figcaption>` : ""
        }</figure>`;
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
