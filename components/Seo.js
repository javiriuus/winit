import Head from "next/head";
import { useLang, localePath } from "../lib/i18n";

export const SITE = "https://javierllarenafilms.com";
const DEFAULT_IMAGE = "/images/000026.JPG";
const abs = (u) => (/^https?:\/\//.test(u) ? u : SITE + u);
// Search results show about 155 characters: cut at a word and add an ellipsis.
const clip = (s, max = 158) => (s.length <= max ? s : s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…");

// Title, description, canonical, hreflang, Open Graph / Twitter cards and JSON-LD for a page.
// `path` is the Spanish path ("/foro/mi-post"); the English one is derived from it.
// `english: false` marks pages with no English text: /en points back to the Spanish page.
export default function Seo({ title, description: fullDescription, path, image, imageAlt, type = "website", english = true, jsonLd }) {
  const { lang } = useLang();
  const esUrl = SITE + (path === "/" ? "/" : path);
  const enUrl = SITE + localePath(path, "en");
  const canonical = lang === "en" && english ? enUrl : esUrl;
  const img = abs(image || DEFAULT_IMAGE);
  const description = clip(fullDescription || "");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#0b0b0a" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      {english && <link rel="alternate" hrefLang="en" href={enUrl} />}
      <link rel="alternate" hrefLang="x-default" href={esUrl} />
      <link rel="alternate" type="application/rss+xml" title="Javier Llarena — Foro" href={`${SITE}/feed.xml`} />
      <link rel="alternate" type="application/rss+xml" title="Javier Llarena — Forum (EN)" href={`${SITE}/feed-en.xml`} />

      <meta property="og:site_name" content="Javier Llarena" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:locale" content={lang === "en" ? "en_GB" : "es_ES"} />
      <meta property="og:locale:alternate" content={lang === "en" ? "es_ES" : "en_GB"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
    </Head>
  );
}
