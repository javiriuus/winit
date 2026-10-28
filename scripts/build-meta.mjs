// Runs before each build (`npm run build`). Writes into public/:
//   sitemap.xml   every page in Spanish and English, with hreflang alternates
//   feed.xml      RSS of the forum (Spanish)
//   feed-en.xml   RSS of the forum (English, Spanish text where there's no translation)
import fs from "fs";
import path from "path";
import { catalog, oembedUrl, slugOf } from "../lib/catalog.mjs";

const SITE = "https://javierllarenafilms.com";
const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const en = (p) => (p === "/" ? "/en" : "/en" + p);

// ---------- Forum posts ----------
function parse(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  let body = raw;
  if (m) {
    body = m[2];
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  const first = body.trim().split(/\n{2,}/).find((b) => !/^(#|!\[|>)/.test(b.trim())) || "";
  const plain = first.replace(/\*\*|\*|\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ").trim();
  return { meta, excerpt: meta.excerpt || plain.slice(0, 220) };
}

const dir = path.join(root, "content", "foro");
const posts = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md") && !f.endsWith(".en.md"))
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const es = parse(path.join(dir, f));
    const enFile = path.join(dir, `${slug}.en.md`);
    const enV = fs.existsSync(enFile) ? parse(enFile) : null;
    return { slug, date: es.meta.date || slug.slice(0, 10), cover: es.meta.cover, es, en: enV };
  })
  .filter((p) => p.es.meta.title)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// ---------- Works (titles not set in the catalog come from oEmbed, as on the site) ----------
async function title(work) {
  if (work.title || !work.fallbackTitle) return work.title || "";
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(oembedUrl(work), { signal: ctrl.signal });
    clearTimeout(timer);
    if (res.ok) return (await res.json()).title || work.fallbackTitle;
  } catch (e) {}
  return work.fallbackTitle;
}
const works = await Promise.all(catalog.map(async (w) => slugOf({ ...w, title: await title(w) })));

// ---------- sitemap.xml ----------
const pages = [
  { loc: "/", lastmod: today, priority: "1.0" },
  { loc: "/fotografia", lastmod: today, priority: "0.8" },
  { loc: "/foro", lastmod: posts[0] ? posts[0].date : today, priority: "0.7" },
  ...works.map((slug) => ({ loc: `/trabajo/${slug}`, lastmod: today, priority: "0.7" })),
  ...posts.map((p) => ({ loc: `/foro/${p.slug}`, lastmod: p.date, priority: "0.6", english: !!p.en })),
];

const url = (loc, lastmod, priority, alts) =>
  `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n${alts}  </url>`;

const entries = pages.flatMap((p) => {
  const english = p.english !== false;
  const alts =
    `    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${p.loc}"/>\n` +
    (english ? `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en(p.loc)}"/>\n` : "") +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p.loc}"/>\n`;
  const out = [url(p.loc, p.lastmod, p.priority, alts)];
  if (english) out.push(url(en(p.loc), p.lastmod, p.priority, alts));
  return out;
});

fs.writeFileSync(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`
);

// ---------- RSS ----------
function feed(lang) {
  const isEn = lang === "en";
  const items = posts.map((p) => {
    const v = (isEn && p.en) || p.es;
    const link = SITE + (isEn && p.en ? en(`/foro/${p.slug}`) : `/foro/${p.slug}`);
    const cover = p.cover ? `<p><img src="${SITE}${p.cover}" alt="" /></p>` : "";
    return `    <item>
      <title>${esc(v.meta.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
      <description>${esc(cover + `<p>${esc(v.excerpt)}</p>`)}</description>${
        p.cover ? `\n      <enclosure url="${SITE}${p.cover}" type="image/jpeg" length="0"/>` : ""
      }
    </item>`;
  });
  const self = `${SITE}/${isEn ? "feed-en" : "feed"}.xml`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${isEn ? "Javier Llarena — Forum" : "Javier Llarena — Foro"}</title>
    <link>${SITE}${isEn ? "/en/foro" : "/foro"}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
    <description>${
      isEn
        ? "News from the work and reflections on film, shoots and what goes on behind each project."
        : "Noticias del trabajo y reflexiones sobre cine, rodajes y lo que hay detrás de cada proyecto."
    }</description>
    <language>${isEn ? "en" : "es"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;
}
fs.writeFileSync(path.join(root, "public", "feed.xml"), feed("es"));
fs.writeFileSync(path.join(root, "public", "feed-en.xml"), feed("en"));

console.log(`build-meta: sitemap ${entries.length} URLs, feeds ${posts.length} posts, works ${works.length}`);
