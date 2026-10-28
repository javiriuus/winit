import { createContext, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const dict = {
  es: {
    navWork: "Trabajo",
    navServices: "Servicios",
    navContact: "Contacto",
    navForum: "Foro",
    navPhoto: "Fotografía",
    menu: "Menú",
    photoTitle: "Fotografía",
    photoIntro: "Calles, ciudades, conciertos, retratos y rodajes. Una selección de mi fotografía fija.",
    photoCount: (n) => `${n} fotografías`,
    photoOpen: (i) => `Ver fotografía ${i}`,
    prev: "Anterior",
    next: "Siguiente",
    forumTitle: "Foro",
    forumIntro: "Noticias del trabajo y reflexiones sobre cine, rodajes y lo que hay detrás de cada proyecto.",
    forumEmpty: "Todavía no hay publicaciones.",
    readPost: "Leer",
    backToForum: "Volver al foro",
    onlySpanish: "Esta publicación solo está disponible en español.",
    formatDate: (d) => new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(d),
    langLabel: "Idioma",
    skip: "Saltar al contenido",
    heroLine: "Elevando historias a través de la lente.",
    heroRoles: "Dirección · Fotografía · Montaje · Color",
    latest: "Último trabajo",
    play: "Reproducir",
    workTitle: "Trabajo seleccionado",
    workCount: (n) => `${n} piezas`,
    viewGrid: "Galería",
    viewList: "Lista",
    viewLabel: "Vista",
    watch: "Ver",
    synopsisLabel: "Sinopsis",
    selectionsLabel: "Seleccionado en",
    stillsLabel: (t) => `Fotogramas de ${t}`,
    aboutLabel: "Sobre mí",
    aboutRole: "Director / Director de fotografía",
    aboutStatement: "Historias con mirada de cine, rodadas desde dentro del plano.",
    aboutBody: [
      "Javier Llarena es director y director de fotografía con base en Madrid. Dirige y fotografía videoclips y firma el cortometraje S.E.P, su trabajo más reciente como director, seleccionado en Fantastic Gijón, Lloret Negre y Bloodtober Fest.",
      "También trabaja al servicio de otras miradas: en publicidad para marcas como New Balance y Heineken, y como director de fotografía, operador, primer ayudante de cámara y colorista en múltiples cortometrajes y videoclips. Detrás de todo ello hay un amplio bagaje en fotografía fija, en retrato, campañas y proyectos artísticos, que marca su forma de mirar cada plano.",
      "Viene de la ingeniería, y se nota en su forma de trabajar: precisión técnica al servicio de la emoción. Escribe, produce, monta y etalona, así que puede llevar un proyecto de la idea a la entrega final o sumarse a un equipo en el puesto que haga falta.",
    ],
    servicesTitle: "Qué hago",
    servicesIntro:
      "Soy Javier Llarena, cineasta, director creativo y narrador visual. Ayudo a marcas, creadores y productoras a crear experiencias visuales de alto nivel.",
    onSetTitle: "En rodaje",
    contactTitle: "¿Damos vida a tu idea?",
    contactIntro: "Cuéntame el proyecto: qué es, para cuándo y qué necesitas. Respondo en persona.",
    orWrite: "O escríbeme a",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    sent: "Mensaje enviado. Te responderé pronto.",
    failed: "No se ha podido enviar. Inténtalo de nuevo o escríbeme directamente.",
    required: "Rellena tu nombre, un email válido y el mensaje.",
    close: "Cerrar",
    rights: "Todos los derechos reservados.",
    backTop: "Volver arriba",
    playerLabel: (t) => `Reproductor: ${t}`,
    homeTitle: "Javier Llarena — Director y director de fotografía en Madrid",
    homeDescription:
      "Javier Llarena, director y director de fotografía en Madrid. Videoclips, cortometrajes y contenido de marca, de la idea a la entrega final.",
    workSheet: "Ver ficha",
    backToWork: "Volver a trabajos",
    rolesLabel: "Mi papel",
    moreWork: "Más trabajos",
    workCtaTitle: "¿Tienes un proyecto parecido?",
    workCtaText: "Cuéntame qué tienes en mente y te respondo en persona.",
    workCtaButton: "Hablemos",
    workDescription: (title, roles) =>
      `${title}. ${roles}: Javier Llarena, director y director de fotografía en Madrid.`,
    projectType: "Tipo de proyecto",
    projectTypes: ["Videoclip", "Publicidad / marca", "Cortometraje", "Dirección de fotografía", "Fotografía", "Montaje o color", "Otro"],
    dates: "Fechas aproximadas",
    datesHint: "p. ej. finales de noviembre",
    budget: "Presupuesto orientativo",
    budgets: ["Menos de 1.000 €", "1.000 – 3.000 €", "3.000 – 10.000 €", "Más de 10.000 €", "Aún por definir"],
    optional: "opcional",
    choose: "Elige una opción",
    roles: {
      director: "Director",
      dop: "Director de fotografía",
      operator: "Operador de cámara",
      ac1: "Primer ayudante de cámara",
      colorist: "Colorista",
      filmmaker: "Filmmaker",
    },
  },
  en: {
    navWork: "Work",
    navServices: "Services",
    navContact: "Contact",
    navForum: "Forum",
    navPhoto: "Photography",
    menu: "Menu",
    photoTitle: "Photography",
    photoIntro: "Streets, cities, concerts, portraits and film sets. A selection of my still photography.",
    photoCount: (n) => `${n} photographs`,
    photoOpen: (i) => `View photograph ${i}`,
    prev: "Previous",
    next: "Next",
    forumTitle: "Forum",
    forumIntro: "News from the work and reflections on film, shoots and what goes on behind each project.",
    forumEmpty: "No posts yet.",
    readPost: "Read",
    backToForum: "Back to the forum",
    onlySpanish: "This post is only available in Spanish.",
    formatDate: (d) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d),
    langLabel: "Language",
    skip: "Skip to content",
    heroLine: "Elevating stories through the lens.",
    heroRoles: "Direction · Cinematography · Editing · Color",
    latest: "Latest work",
    play: "Play",
    workTitle: "Selected work",
    workCount: (n) => `${n} pieces`,
    viewGrid: "Gallery",
    viewList: "List",
    viewLabel: "View",
    watch: "Watch",
    synopsisLabel: "Synopsis",
    selectionsLabel: "Selected at",
    stillsLabel: (t) => `Stills from ${t}`,
    aboutLabel: "About",
    aboutRole: "Director / Cinematographer",
    aboutStatement: "Stories with a cinematic eye, shot from inside the frame.",
    aboutBody: [
      "Javier Llarena is a director and cinematographer based in Madrid. He directs and shoots music videos, and his latest work as a director is the short film S.E.P., selected at Fantastic Gijón, Lloret Negre and Bloodtober Fest.",
      "He also works in service of other filmmakers' vision: on commercials for brands such as New Balance and Heineken, and as cinematographer, camera operator, 1st AC and colorist on multiple short films and music videos. Behind it all lies an extensive background in still photography, across portraits, campaigns and art projects, which shapes the way he looks at every shot.",
      "His background is in engineering, and it shows in how he works: technical precision in service of emotion. He writes, produces, edits and grades, so he can take a project from first idea to final delivery or join a crew in whatever role it needs.",
    ],
    servicesTitle: "What I do",
    servicesIntro:
      "I'm Javier Llarena, filmmaker, creative director and storyteller. Helping brands, creators and productions craft high-end visual experiences.",
    onSetTitle: "On set",
    contactTitle: "Ready to bring your vision to life?",
    contactIntro: "Tell me about the project: what it is, when it's for and what you need. I reply personally.",
    orWrite: "Or write to",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent. I'll get back to you soon.",
    failed: "It couldn't be sent. Try again or write to me directly.",
    required: "Add your name, a valid email and your message.",
    close: "Close",
    rights: "All rights reserved.",
    backTop: "Back to top",
    playerLabel: (t) => `Player: ${t}`,
    homeTitle: "Javier Llarena — Director and Cinematographer in Madrid",
    homeDescription:
      "Javier Llarena, director and cinematographer based in Madrid. Music videos, short films and brand content, from first idea to final delivery.",
    workSheet: "View project",
    backToWork: "Back to work",
    rolesLabel: "My role",
    moreWork: "More work",
    workCtaTitle: "Got a similar project?",
    workCtaText: "Tell me what you have in mind and I'll get back to you personally.",
    workCtaButton: "Let's talk",
    workDescription: (title, roles) => `${title}. ${roles}: Javier Llarena, director and cinematographer in Madrid.`,
    projectType: "Project type",
    projectTypes: ["Music video", "Commercial / brand", "Short film", "Cinematography", "Photography", "Editing or color", "Other"],
    dates: "Approximate dates",
    datesHint: "e.g. late November",
    budget: "Approximate budget",
    budgets: ["Under €1,000", "€1,000 – 3,000", "€3,000 – 10,000", "Over €10,000", "Not sure yet"],
    optional: "optional",
    choose: "Choose one",
    roles: {
      director: "Director",
      dop: "Director of Photography",
      operator: "Camera Operator",
      ac1: "1st AC",
      colorist: "Colorist",
      filmmaker: "Filmmaker",
    },
  },
};

const LangContext = createContext({ lang: "es", setLang: () => {}, t: dict.es, path: (p) => p });

// Internal link in the current language: "/foro" → "/en/foro", "/#work" → "/en#work".
export function localePath(p, lang) {
  if (lang !== "en") return p;
  if (p === "/") return "/en";
  if (p.startsWith("/#")) return "/en" + p.slice(1);
  return "/en" + p;
}

// The language comes from the URL (/ = Spanish, /en = English), so every page is
// rendered and indexed in both languages.
export function LangProvider({ children }) {
  const router = useRouter();
  const lang = router.locale === "en" ? "en" : "es";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next) => {
      if (next === lang) return;
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
      router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: next, scroll: false });
    },
    [lang, router]
  );

  const path = useCallback((p) => localePath(p, lang), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: dict[lang], path }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
