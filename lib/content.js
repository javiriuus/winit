import { catalog } from "./catalog.mjs";

export { slugOf, slugify } from "./catalog.mjs";

// Latest short first, everything else in catalog order.
export const works = [...catalog.filter((w) => w.latestShort), ...catalog.filter((w) => !w.latestShort)].map(
  (w) => ({ ...w, title: w.title || w.fallbackTitle || "" })
);

export const featuredOf = (list) => list.find((w) => w.latestShort) || list[0];

// Services, written for clients searching for each one (Madrid, music videos,
// commercials, short films…). Keep the titles short: they're the list headings.
export const services = [
  {
    es: {
      title: "Dirección de videoclips",
      text: "Videoclips para artistas y sellos, de la idea visual al montaje final. Concepto, guion técnico, dirección del rodaje y una estética pensada para la canción.",
    },
    en: {
      title: "Music video direction",
      text: "Music videos for artists and labels, from visual concept to final cut. Treatment, shot list, direction on set and a look built around the song.",
    },
  },
  {
    es: {
      title: "Dirección de fotografía",
      text: "Dirección de fotografía (DoP) para cortometrajes, videoclips y publicidad: encuadre, iluminación con luz natural o artificial, elección de cámara y ópticas, y el look de la imagen.",
    },
    en: {
      title: "Cinematography",
      text: "Director of photography for short films, music videos and commercials: framing, lighting with natural or artificial light, camera and lens choice, and the look of the image.",
    },
  },
  {
    es: {
      title: "Publicidad y contenido de marca",
      text: "Piezas para marcas y agencias, en horizontal y en vertical para redes sociales. He rodado para New Balance y Heineken como operador de cámara y filmmaker.",
    },
    en: {
      title: "Commercials and brand content",
      text: "Films for brands and agencies, horizontal and vertical for social media. I've shot for New Balance and Heineken as camera operator and filmmaker.",
    },
  },
  {
    es: {
      title: "Cortometrajes",
      text: "Dirección y fotografía de cortometrajes de ficción. Mi último corto, S.E.P, ha sido seleccionado en Fantastic Gijón, Lloret Negre y Bloodtober Fest.",
    },
    en: {
      title: "Short films",
      text: "Directing and shooting fiction short films. My latest short, S.E.P, has been selected at Fantastic Gijón, Lloret Negre and Bloodtober Fest.",
    },
  },
  {
    es: {
      title: "Montaje",
      text: "Montaje de videoclips, anuncios y cortos con ritmo narrativo, desde el primer premontaje hasta la versión final para cada plataforma.",
    },
    en: {
      title: "Editing",
      text: "Editing music videos, commercials and shorts with narrative rhythm, from the first assembly to the final version for each platform.",
    },
  },
  {
    es: {
      title: "Etalonaje y color",
      text: "Etalonaje profesional para dar a cada proyecto un tono cinematográfico propio y coherente, también como colorista para otros equipos.",
    },
    en: {
      title: "Color grading",
      text: "Professional color grading that gives each project a consistent cinematic tone, also as a colorist for other teams.",
    },
  },
  {
    es: {
      title: "Fotografía",
      text: "Fotografía fija para campañas, retratos, conciertos y foto de rodaje, con la misma mirada que llevo a la imagen en movimiento.",
    },
    en: {
      title: "Photography",
      text: "Still photography for campaigns, portraits, concerts and on-set stills, with the same eye I bring to moving images.",
    },
  },
  {
    es: {
      title: "Cámara para otros equipos",
      text: "Me sumo a rodajes ajenos como operador de cámara o primer ayudante de cámara (foquista), con oficio técnico y trato fácil en el set.",
    },
    en: {
      title: "Camera crew",
      text: "I join other productions as camera operator or 1st AC (focus puller), with solid technique and an easy presence on set.",
    },
  },
  {
    es: {
      title: "Guion y producción",
      text: "Desarrollo de la idea y del guion, planificación del rodaje, equipo y presupuesto para que el proyecto llegue entero a la entrega.",
    },
    en: {
      title: "Writing and production",
      text: "Developing the idea and script, planning the shoot, crew and budget so the project reaches delivery intact.",
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
