// Structured data (schema.org JSON-LD) shared by the pages.
import { social } from "./content";

export const SITE = "https://javierllarenafilms.com";
export const PERSON_ID = `${SITE}/#javier`;
export const ORG_ID = `${SITE}/#studio`;

export function person(lang) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Javier Llarena",
    url: SITE + "/",
    image: `${SITE}/images/javier-gimbal.jpg`,
    jobTitle: lang === "en" ? "Director and Cinematographer" : "Director y director de fotografía",
    description:
      lang === "en"
        ? "Director and cinematographer based in Madrid: music videos, short films and brand content."
        : "Director y director de fotografía en Madrid: videoclips, cortometrajes y contenido de marca.",
    knowsAbout:
      lang === "en"
        ? ["Film direction", "Cinematography", "Music videos", "Short films", "Color grading", "Editing", "Photography"]
        : ["Dirección", "Dirección de fotografía", "Videoclips", "Cortometrajes", "Etalonaje", "Montaje", "Fotografía"],
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    sameAs: social.map((s) => s.href),
    worksFor: { "@id": ORG_ID },
  };
}

export function organization(lang) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "JLF Creative Studio",
    alternateName: "Javier Llarena Films",
    url: SITE + "/",
    logo: `${SITE}/icon-512.png`,
    founder: { "@id": PERSON_ID },
    areaServed: "Madrid",
    sameAs: social.map((s) => s.href),
    description:
      lang === "en"
        ? "Film direction, cinematography, editing and color for brands, artists and production companies."
        : "Dirección, dirección de fotografía, montaje y color para marcas, artistas y productoras.",
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "Javier Llarena",
    alternateName: ["JLF Creative Studio", "Javier Llarena Films"],
    url: SITE + "/",
    inLanguage: ["es", "en"],
    publisher: { "@id": ORG_ID },
  };
}

export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

export function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
