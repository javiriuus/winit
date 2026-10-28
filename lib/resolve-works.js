// Runs at build time (getStaticProps): fills in titles that aren't set in the
// catalog and the Vimeo frame, from the platforms' public oEmbed endpoints,
// and gives every work the slug of its page (/trabajo/<slug>).
import { works } from "./content";
import { oembedUrl, slugOf } from "./catalog.mjs";

async function get(url, as = "json") {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "Accept-Language": "es-ES,es;q=0.9" } });
    if (!res.ok) return null;
    return as === "json" ? await res.json() : await res.text();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Shared by the pages built together (one fetch per video); kept one hour so the
// daily revalidation still picks up title changes.
const cache = new Map();
const once = (key, fn) => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 3600e3) return hit.value;
  const value = fn();
  cache.set(key, { at: Date.now(), value });
  return value;
};

export async function resolveWorks() {
  return once("works", () =>
    Promise.all(
      works.map(async (w) => {
        const needsTitle = Boolean(w.fallbackTitle) && w.title === w.fallbackTitle;
        const needsThumb = w.platform === "vimeo";
        const out = { ...w };
        if (needsTitle || needsThumb) {
          const data = await get(oembedUrl(w));
          if (data) {
            if (needsTitle && data.title) out.title = data.title;
            if (needsThumb && data.thumbnail_url) out.thumbnail = data.thumbnail_url;
            if (data.upload_date) out.uploadDate = data.upload_date.replace(" ", "T");
          }
        }
        out.slug = slugOf(out);
        return out;
      })
    )
  );
}

// Publication date of a video, for its structured data (YouTube: read from the watch
// page; Vimeo: from oEmbed). Null when the platform doesn't say.
export async function uploadDateOf(work) {
  if (work.uploadDate) return work.uploadDate;
  if (work.platform !== "youtube") return null;
  return once(`date:${work.id}`, async () => {
    const html = await get(`https://www.youtube.com/watch?v=${work.id}`, "text");
    if (!html) return null;
    const m =
      html.match(/itemprop="uploadDate" content="([^"]+)"/) ||
      html.match(/"uploadDate":"([^"]+)"/) ||
      html.match(/"publishDate":"([^"]+)"/);
    return m ? m[1] : null;
  });
}
