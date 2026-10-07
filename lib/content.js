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

const catalog = [
  {
    platform: "youtube",
    id: "DFPtlqgoOLQ",
    title: "S.E.P Shortfilm - TEASER",
    roles: ["director"],
    latestShort: true,
    // Ficha ampliada (opcional en cualquier trabajo): sinopsis, festivales y fotogramas.
    synopsis: {
      es: "En el S.E.P., una oficina donde el asesinato se gestiona como un trámite más, Antonio Ontañón solicita un servicio urgente: acabar con su mujer. Lo que parece un procedimiento rutinario pronto se complica cuando el sistema detecta un problema inesperado, obligándole a enfrentarse a una decisión peligrosa en un entorno donde la burocracia normaliza lo impensable.",
      en: "At the S.E.P., an office where murder is handled like any other paperwork, Antonio Ontañón requests an urgent service: getting rid of his wife. What looks like a routine procedure soon gets complicated when the system flags an unexpected problem, forcing him to face a dangerous decision in a place where bureaucracy makes the unthinkable normal.",
    },
    selections: ["Fantastic Gijón", "Lloret Negre"],
    stills: ["/images/works/sep-1.jpg", "/images/works/sep-2.jpg", "/images/works/sep-3.jpg", "/images/works/sep-4.jpg"],
  },
  { platform: "youtube", id: "ftEpr14IvAM", title: "New Balance", roles: ["operator"], vertical: true },
  {
    platform: "instagram",
    id: "DZYCh9mTeHG",
    title: "Heineken Chile",
    roles: ["filmmaker"],
    vertical: true,
    // Instagram images can't be linked reliably, so the still lives in the project.
    thumbnail: "/images/works/heineken-chile.jpg",
  },
  { platform: "youtube", id: "NXqovyZ4UN8", fallbackTitle: "Cortometraje", roles: ["dop"] },
  {
    platform: "vimeo",
    id: "1054101787",
    title: "Sol y caipirinhas - TRAILER",
    roles: ["ac1"],
    thumbnail:
      "https://i.vimeocdn.com/video/1979399080-56a04b3f972b4283e7e48292aa95deea61634b137cb5606b159a9bed9ec84290-d_1280x720",
  },
  { platform: "youtube", id: "YPQSay9Crxs", fallbackTitle: "Etalonaje", roles: ["colorist"] },
  { platform: "youtube", id: "xUCmm-Ok4Bc", title: "La belleza del caos", roles: ["director", "dop"] },
  { platform: "youtube", id: "5-3FkJr44uo", title: "3:08", roles: ["ac1"] },
  { platform: "youtube", id: "Waf-QiBDYzk", title: "Valdo - Me gustas más que dormir", roles: ["director", "dop"] },
  { platform: "youtube", id: "yJXVszisGY8", title: "Aún Recuerdo", roles: ["director", "dop"] },
  { platform: "youtube", id: "ARZivn1zl1w", title: "TÓXICO", roles: ["director", "dop"] },
  { platform: "youtube", id: "aluL0g5vKYo", title: "Te he vuelto a ver", roles: ["director", "dop"] },
  { platform: "youtube", id: "J74Wtc5tvGA", title: "PRENDE EL BLON", roles: ["director", "dop"] },
  { platform: "youtube", id: "6oN7p1lFUac", title: "Y si...?", roles: ["director", "dop"] },
  { platform: "youtube", id: "lCZf0F5PbqY", title: "Miénteme Como Sabes", roles: ["director", "dop"] },
];

// Latest short first, everything else in catalog order.
export const works = [...catalog.filter((w) => w.latestShort), ...catalog.filter((w) => !w.latestShort)].map(
  (w) => ({ ...w, title: w.title || w.fallbackTitle || "" })
);

export const featuredOf = (list) => list.find((w) => w.latestShort) || list[0];

export const services = [
  {
    en: {
      title: "Film Director",
      text: "Creative direction of cinematic projects from concept to final delivery.",
    },
    es: {
      title: "Director de cine",
      text: "Dirección creativa de proyectos cinematográficos, del concepto a la entrega final.",
    },
  },
  {
    en: {
      title: "Director of Photography",
      text: "Mastery of visual aesthetics: framing, lighting, and image composition.",
    },
    es: {
      title: "Director de fotografía",
      text: "Dominio de la estética visual: encuadre, iluminación y composición de la imagen.",
    },
  },
  {
    en: {
      title: "Video Editor",
      text: "Crafting smooth, compelling edits with strong narrative rhythm.",
    },
    es: {
      title: "Montador",
      text: "Montajes fluidos y envolventes con un ritmo narrativo sólido.",
    },
  },
  {
    en: {
      title: "Colorist",
      text: "Professional color grading to achieve cinematic tone and visual style.",
    },
    es: {
      title: "Colorista",
      text: "Etalonaje profesional para lograr un tono cinematográfico y un estilo visual propio.",
    },
  },
  {
    en: {
      title: "Photographer",
      text: "Capturing impactful stills for campaigns, portraits, and artistic projects.",
    },
    es: {
      title: "Fotógrafo",
      text: "Fotografía fija con impacto para campañas, retratos y proyectos artísticos.",
    },
  },
  {
    en: {
      title: "Producer",
      text: "Coordinating teams, schedules and resources to ensure smooth productions.",
    },
    es: {
      title: "Productor",
      text: "Coordinación de equipos, calendarios y recursos para que la producción fluya.",
    },
  },
  {
    en: {
      title: "Screenwriter",
      text: "Developing stories, scripts and screenplays with a strong narrative foundation.",
    },
    es: {
      title: "Guionista",
      text: "Desarrollo de historias y guiones con una base narrativa sólida.",
    },
  },
  {
    en: {
      title: "Industry Experience",
      text: "Years of experience with brands, artists, and high-end productions.",
    },
    es: {
      title: "Experiencia en la industria",
      text: "Años de experiencia con marcas, artistas y producciones de alto nivel.",
    },
  },
  {
    en: {
      title: "Engineer",
      text: "Technical background applied to visual media: precision and structure.",
    },
    es: {
      title: "Ingeniero",
      text: "Formación técnica aplicada a los medios audiovisuales: precisión y estructura.",
    },
  },
];

export const stills = [
  { src: "/images/000026.JPG", pos: "50% 30%" },
  { src: "/images/f63414272.jpg", pos: "50% 25%" },
  { src: "/images/javier-gimbal.jpg", pos: "62% 25%" },
  { src: "/images/000063.JPG", pos: "50% 30%" },
  { src: "/images/f37777664.jpg", pos: "50% 30%" },
  { src: "/images/000012.JPG", pos: "50% 35%" },
  { src: "/images/f28347648.jpg", pos: "50% 30%" },
  { src: "/images/000032.JPG", pos: "50% 30%" },
  { src: "/images/f51642112.jpg", pos: "50% 30%" },
  { src: "/images/000075.JPG", pos: "50% 30%" },
  { src: "/images/f54933248.jpg", pos: "50% 30%" },
];

export const social = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/javierllarenafilms/" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@javirius5294" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/javier-llarena-s%C3%A1nchez-33b7371b9/",
  },
];

export const contactEmail = "javierllarena@gmail.com";

export const thumb = (id, quality = "maxresdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

// Thumbnail for any work: YouTube sizes, or the image set in the catalog.
export const thumbFor = (work, quality = "maxresdefault") =>
  work.platform === "youtube" ? thumb(work.id, quality) : work.thumbnail || "";

export const embedFor = (work) =>
  work.platform === "instagram"
    ? `https://www.instagram.com/p/${work.id}/embed/`
    : work.platform === "vimeo"
    ? `https://player.vimeo.com/video/${work.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${work.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
