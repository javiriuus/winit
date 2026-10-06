// Runs at build time (getStaticProps): fills in titles that aren't set in the
// catalog and the Vimeo frame, from the platforms' public oEmbed endpoints.
import { works } from "./content";

async function getJSON(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function oembedUrl(work) {
  if (work.platform === "vimeo") {
    return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${work.id}`)}&width=1280`;
  }
  return `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${work.id}`
  )}`;
}

export async function resolveWorks() {
  return Promise.all(
    works.map(async (w) => {
      const needsTitle = Boolean(w.fallbackTitle) && w.title === w.fallbackTitle;
      const needsThumb = w.platform === "vimeo";
      if (!needsTitle && !needsThumb) return w;
      const data = await getJSON(oembedUrl(w));
      if (!data) return w;
      const out = { ...w };
      if (needsTitle && data.title) out.title = data.title;
      if (needsThumb && data.thumbnail_url) out.thumbnail = data.thumbnail_url;
      return out;
    })
  );
}
