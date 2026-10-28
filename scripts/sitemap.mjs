// Writes public/sitemap.xml before each build (run by `npm run build`).
// Lists the home, photography, forum and every forum post.
import fs from "fs";
import path from "path";

const SITE = "https://javierllarenafilms.com";
const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);

const posts = fs
  .readdirSync(path.join(root, "content", "foro"))
  .filter((f) => f.endsWith(".md") && !f.endsWith(".en.md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort()
  .reverse();
const latestPost = posts[0] ? posts[0].slice(0, 10) : today;

const urls = [
  { loc: "/", lastmod: today, priority: "1.0" },
  { loc: "/fotografia", lastmod: today, priority: "0.8" },
  { loc: "/foro", lastmod: latestPost, priority: "0.7" },
  ...posts.map((slug) => ({ loc: `/foro/${slug}`, lastmod: slug.slice(0, 10), priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
