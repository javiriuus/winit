import { catalog } from "./catalog.mjs";

export { slugOf, slugify } from "./catalog.mjs";

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
  { src: "/images/javier-gimbal.jpg", pos: "62% 25%" },
  { src: "/images/f63414272.jpg", pos: "50% 25%" },
  { src: "/images/set-red-shoulder.jpg", pos: "35% 35%" },
  { src: "/images/000063.JPG", pos: "50% 30%" },
  { src: "/images/f37777664.jpg", pos: "50% 30%" },
  { src: "/images/set-camera-cap.jpg", pos: "50% 25%" },
  { src: "/images/000012.JPG", pos: "50% 35%" },
  { src: "/images/f28347648.jpg", pos: "50% 30%" },
  { src: "/images/set-street-rig.jpg", pos: "55% 22%" },
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

// Public page of a work on its platform.
export const watchUrlFor = (work) =>
  work.platform === "instagram"
    ? `https://www.instagram.com/p/${work.id}/`
    : work.platform === "vimeo"
    ? `https://vimeo.com/${work.id}`
    : work.vertical
    ? `https://www.youtube.com/shorts/${work.id}`
    : `https://www.youtube.com/watch?v=${work.id}`;
