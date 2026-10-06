// Catálogo de la web: servicios y trabajos.
// Para añadir un trabajo, añade una entrada con el ID de YouTube y el título.
// Los vídeos verticales (Shorts) llevan `vertical: true`.

export const works = [
  { id: "ftEpr14IvAM", title: "New Balance", vertical: true },
  { id: "DFPtlqgoOLQ", title: "S.E.P Shortfilm - TEASER" },
  { id: "xUCmm-Ok4Bc", title: "La belleza del caos" },
  { id: "5-3FkJr44uo", title: "3:08" },
  { id: "Waf-QiBDYzk", title: "Valdo - Me gustas más que dormir" },
  { id: "yJXVszisGY8", title: "Aún Recuerdo" },
  { id: "ARZivn1zl1w", title: "TÓXICO" },
  { id: "aluL0g5vKYo", title: "Te he vuelto a ver" },
  { id: "J74Wtc5tvGA", title: "PRENDE EL BLON" },
  { id: "6oN7p1lFUac", title: "Y si...?" },
  { id: "lCZf0F5PbqY", title: "Miénteme Como Sabes" },
];

export const featuredWork = works.find((w) => w.id === "DFPtlqgoOLQ");

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
