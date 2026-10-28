// Catálogo de la web: servicios y trabajos.
//
// Cada trabajo: plataforma ("youtube" o "vimeo"), ID del vídeo, título y tus roles.
// - `latestShort: true` marca tu último cortometraje: sale siempre el primero y
//   es el destacado de la portada. Cuando estrenes otro, mueve la marca.
// - `vertical: true` para vídeos verticales (Shorts).
// - Si un trabajo no tiene `title`, se toma el título del vídeo al publicar la web
//   (`fallbackTitle` se usa solo si ese paso falla).
// Roles disponibles: director, dop, operator, ac1, colorist, filmmaker (textos en lib/i18n.js).
// Plataformas: youtube, vimeo, instagram.
// `slug` es la dirección de su ficha: javierllarenafilms.com/trabajo/<slug>. Si falta,
// se crea a partir del título. No la cambies una vez publicada (rompería enlaces).
//
// Este archivo es .mjs para que también lo lea el script que genera el sitemap.

export const catalog = [
  {
    platform: "youtube",
    id: "DFPtlqgoOLQ", slug: "sep",
    title: "S.E.P Shortfilm - TEASER",
    roles: ["director"],
    latestShort: true,
    // Ficha ampliada (opcional en cualquier trabajo): sinopsis, festivales y fotogramas.
    synopsis: {
      es: "En el S.E.P., una oficina donde el asesinato se gestiona como un trámite más, Antonio Ontañón solicita un servicio urgente: acabar con su mujer. Lo que parece un procedimiento rutinario pronto se complica cuando el sistema detecta un problema inesperado, obligándole a enfrentarse a una decisión peligrosa en un entorno donde la burocracia normaliza lo impensable.",
      en: "At the S.E.P., an office where murder is handled like any other paperwork, Antonio Ontañón requests an urgent service: getting rid of his wife. What looks like a routine procedure soon gets complicated when the system flags an unexpected problem, forcing him to face a dangerous decision in a place where bureaucracy makes the unthinkable normal.",
    },
    selections: ["Fantastic Gijón", "Lloret Negre", "Bloodtober Fest"],
    stills: ["/images/works/sep-1.jpg", "/images/works/sep-2.jpg", "/images/works/sep-3.jpg", "/images/works/sep-4.jpg"],
  },
  { platform: "youtube", id: "ftEpr14IvAM", slug: "new-balance", title: "New Balance", roles: ["operator"], vertical: true },
  {
    platform: "instagram",
    id: "DZYCh9mTeHG", slug: "heineken-chile",
    title: "Heineken Chile",
    roles: ["filmmaker"],
    vertical: true,
    // Instagram images can't be linked reliably, so the still lives in the project.
    thumbnail: "/images/works/heineken-chile.jpg",
  },
  { platform: "youtube", id: "NXqovyZ4UN8", fallbackTitle: "Cortometraje", roles: ["dop"] },
  {
    platform: "vimeo",
    id: "1054101787", slug: "sol-y-caipirinhas",
    title: "Sol y caipirinhas - TRAILER",
    roles: ["ac1"],
    thumbnail:
      "https://i.vimeocdn.com/video/1979399080-56a04b3f972b4283e7e48292aa95deea61634b137cb5606b159a9bed9ec84290-d_1280x720",
  },
  { platform: "youtube", id: "YPQSay9Crxs", fallbackTitle: "Etalonaje", roles: ["colorist"] },
  { platform: "youtube", id: "xUCmm-Ok4Bc", slug: "la-belleza-del-caos", title: "La belleza del caos", roles: ["director", "dop"] },
  { platform: "youtube", id: "5-3FkJr44uo", slug: "3-08", title: "3:08", roles: ["ac1"] },
  { platform: "youtube", id: "Waf-QiBDYzk", slug: "valdo-me-gustas-mas-que-dormir", title: "Valdo - Me gustas más que dormir", roles: ["director", "dop"] },
  { platform: "youtube", id: "yJXVszisGY8", slug: "aun-recuerdo", title: "Aún Recuerdo", roles: ["director", "dop"] },
  { platform: "youtube", id: "ARZivn1zl1w", slug: "toxico", title: "TÓXICO", roles: ["director", "dop"] },
  { platform: "youtube", id: "aluL0g5vKYo", slug: "te-he-vuelto-a-ver", title: "Te he vuelto a ver", roles: ["director", "dop"] },
  { platform: "youtube", id: "J74Wtc5tvGA", slug: "prende-el-blon", title: "PRENDE EL BLON", roles: ["director", "dop"] },
  { platform: "youtube", id: "6oN7p1lFUac", slug: "y-si", title: "Y si...?", roles: ["director", "dop"] },
  { platform: "youtube", id: "lCZf0F5PbqY", slug: "mienteme-como-sabes", title: "Miénteme Como Sabes", roles: ["director", "dop"] },
];


// "Aún Recuerdo" → "aun-recuerdo"
export const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const slugOf = (work) => work.slug || slugify(work.title || work.fallbackTitle || work.id);

// Public oEmbed endpoint for a work (title, thumbnail, upload date for Vimeo).
export function oembedUrl(work) {
  if (work.platform === "vimeo") {
    return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${work.id}`)}&width=1280`;
  }
  return `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${work.id}`
  )}`;
}
