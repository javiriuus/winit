// Forum posts live in content/foro as Markdown files (server-side only).
//   2026-10-07-mi-post.md      → Spanish (required)
//   2026-10-07-mi-post.en.md   → English (optional; falls back to Spanish)
import fs from "fs";
import path from "path";
import { markdownToHtml, plainText } from "./markdown";

const DIR = path.join(process.cwd(), "content", "foro");

function parse(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  let body = raw;
  if (match) {
    body = match[2];
    for (const line of match[1].split("\n")) {
      const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (m) meta[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  const firstParagraph = body.trim().split(/\n{2,}/).find((b) => !/^(#|!\[)/.test(b.trim())) || "";
  return {
    meta,
    version: {
      title: meta.title || "",
      excerpt: meta.excerpt || plainText(firstParagraph).slice(0, 220),
      html: markdownToHtml(body),
    },
  };
}

export function getAllPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".en.md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const es = parse(path.join(DIR, f));
      const enFile = path.join(DIR, `${slug}.en.md`);
      const en = fs.existsSync(enFile) ? parse(enFile) : null;
      return {
        slug,
        date: es.meta.date || slug.slice(0, 10),
        cover: es.meta.cover || null,
        es: es.version,
        en: en ? en.version : null,
      };
    })
    .filter((p) => p.es.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}
