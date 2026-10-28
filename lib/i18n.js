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
    homeTitle: "Javier Llarena — Director de videoclips y director de fotografía en Madrid",
    homeDescription:
      "Director de videoclips, cortometrajes y publicidad y director de fotografía en Madrid. De la idea a la entrega final: rodaje, montaje y etalonaje.",
    studio: {
      title: "Producción audiovisual en Madrid",
      lead:
        "Dirijo y fotografío videoclips, cortometrajes y piezas de publicidad con mirada de cine. Trabajo desde Madrid con artistas, marcas, agencias y productoras, y puedo llevar un proyecto entero o sumarme a tu equipo en el puesto que haga falta.",
      audiences: [
        {
          title: "Artistas y sellos",
          text: "Videoclips con una idea visual clara, pensados para la canción y para que funcionen en YouTube y en redes. Me encargo del concepto, la dirección, la fotografía, el montaje y el color, o de la parte que necesites.",
        },
        {
          title: "Marcas y agencias",
          text: "Anuncios, contenido de marca y vídeo vertical para Instagram y TikTok. He rodado para New Balance y Heineken, y adapto cada pieza al formato y a la plataforma donde se va a ver.",
        },
        {
          title: "Productoras y cortometrajes",
          text: "Dirección de fotografía, cámara, primer ayudante y etalonaje para cortos y proyectos de ficción. Como director, mi corto S.E.P ha sido seleccionado en Fantastic Gijón, Lloret Negre y Bloodtober Fest.",
        },
      ],
      processTitle: "Cómo trabajo",
      process: [
        { title: "Idea", text: "Hablamos del proyecto, el público y el presupuesto, y te propongo una idea visual con referencias." },
        { title: "Preproducción", text: "Guion técnico, localizaciones, equipo, material y plan de rodaje, para llegar al set con todo resuelto." },
        { title: "Rodaje", text: "Dirección y fotografía en el set, cuidando la luz y el ritmo de cada plano." },
        { title: "Postproducción", text: "Montaje, etalonaje y entrega en los formatos de cada plataforma: horizontal, vertical y cine." },
      ],
      faqTitle: "Preguntas frecuentes",
      faq: [
        {
          q: "¿Dónde trabajas?",
          a: "Tengo base en Madrid y ruedo sobre todo en Madrid y alrededores. Si tu proyecto es en otra ciudad, cuéntamelo y vemos cómo hacerlo.",
        },
        {
          q: "¿Cuánto cuesta un videoclip o un anuncio?",
          a: "Depende de los días de rodaje, el equipo, el material y la postproducción. Cuéntame qué tienes en mente y tu presupuesto aproximado, y te preparo una propuesta ajustada.",
        },
        {
          q: "¿Puedo contratarte solo para una parte del proyecto?",
          a: "Sí. Además de dirigir proyectos completos, trabajo como director de fotografía, operador de cámara, primer ayudante de cámara, montador o colorista para otros equipos.",
        },
        {
          q: "¿Haces vídeo vertical para redes sociales?",
          a: "Sí. Ruedo y monto piezas en vertical para Instagram, TikTok y YouTube Shorts, como las de New Balance y Heineken Chile, y puedo sacar versiones horizontal y vertical del mismo rodaje.",
        },
        {
          q: "¿Qué necesito para empezar?",
          a: "Una idea del proyecto, fechas aproximadas y un presupuesto orientativo. Escríbeme desde el formulario de contacto y te respondo en persona.",
        },
      ],
    },
    workTypes: { "music-video": "Videoclip", short: "Cortometraje", ad: "Publicidad" },
    workAbout: (type, roles) => {
      const list = roles.map((r, i) => (i === 0 ? r.charAt(0).toLowerCase() + r.slice(1) : r.toLowerCase()));
      const as = list.length > 1 ? `${list.slice(0, -1).join(", ")} y ${list[list.length - 1]}` : list[0];
      const by = {
        "music-video": "Dirijo y fotografío videoclips para artistas y sellos en Madrid, desde la idea visual hasta el montaje y el color.",
        short: "En cortometrajes trabajo como director, director de fotografía, cámara y colorista, en Madrid y alrededores.",
        ad: "Ruedo publicidad y contenido de marca para marcas y agencias, también en vertical para redes sociales.",
      };
      return [
        `En este proyecto trabajé como ${as}.`,
        by[type] || "Trabajo como director, director de fotografía y equipo de cámara en videoclips, cortometrajes y publicidad desde Madrid.",
      ];
    },
    workSheet: "Ver ficha",
    backToWork: "Volver a trabajos",
    rolesLabel: "Mi papel",
    moreWork: "Más trabajos",
    workCtaTitle: "¿Tienes un proyecto parecido?",
    workCtaText: "Cuéntame qué tienes en mente y te respondo en persona.",
    workCtaButton: "Hablemos",
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
    homeTitle: "Javier Llarena — Music Video Director and Cinematographer in Madrid",
    homeDescription:
      "Director of music videos, short films and commercials, and cinematographer based in Madrid. From first idea to final delivery: shoot, edit and color grade.",
    studio: {
      title: "Video production in Madrid",
      lead:
        "I direct and shoot music videos, short films and commercials with a cinematic eye. I work from Madrid with artists, brands, agencies and production companies, and I can take on a whole project or join your crew in whatever role it needs.",
      audiences: [
        {
          title: "Artists and labels",
          text: "Music videos with a clear visual idea, built around the song and made to work on YouTube and social media. I handle concept, direction, cinematography, editing and color, or just the part you need.",
        },
        {
          title: "Brands and agencies",
          text: "Commercials, brand content and vertical video for Instagram and TikTok. I've shot for New Balance and Heineken, and I adapt every piece to the format and platform where it will be seen.",
        },
        {
          title: "Production companies and short films",
          text: "Cinematography, camera operating, 1st AC and color grading for shorts and fiction projects. As a director, my short S.E.P has been selected at Fantastic Gijón, Lloret Negre and Bloodtober Fest.",
        },
      ],
      processTitle: "How I work",
      process: [
        { title: "Idea", text: "We talk about the project, the audience and the budget, and I pitch a visual idea with references." },
        { title: "Pre-production", text: "Shot list, locations, crew, gear and schedule, so we arrive on set with everything solved." },
        { title: "Shoot", text: "Direction and cinematography on set, taking care of the light and rhythm of every shot." },
        { title: "Post-production", text: "Editing, color grading and delivery in each platform's formats: horizontal, vertical and cinema." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Where do you work?",
          a: "I'm based in Madrid and mostly shoot in and around the city. If your project is somewhere else, tell me about it and we'll work it out.",
        },
        {
          q: "How much does a music video or a commercial cost?",
          a: "It depends on shoot days, crew, gear and post-production. Tell me what you have in mind and your rough budget, and I'll put together a tailored proposal.",
        },
        {
          q: "Can I hire you for just part of a project?",
          a: "Yes. Besides directing full projects, I work as cinematographer, camera operator, 1st AC, editor or colorist for other teams.",
        },
        {
          q: "Do you make vertical video for social media?",
          a: "Yes. I shoot and edit vertical pieces for Instagram, TikTok and YouTube Shorts, like the New Balance and Heineken Chile ones, and can deliver horizontal and vertical versions from the same shoot.",
        },
        {
          q: "What do I need to get started?",
          a: "An idea of the project, rough dates and an approximate budget. Write to me through the contact form and I'll reply personally.",
        },
      ],
    },
    workTypes: { "music-video": "Music video", short: "Short film", ad: "Commercial" },
    workAbout: (type, roles) => {
      const as = roles.length > 1 ? `${roles.slice(0, -1).join(", ")} and ${roles[roles.length - 1]}` : roles[0];
      const by = {
        "music-video": "I direct and shoot music videos for artists and labels in Madrid, from the visual idea to the edit and color grade.",
        short: "On short films I work as director, cinematographer, camera crew and colorist, in and around Madrid.",
        ad: "I shoot commercials and brand content for brands and agencies, including vertical video for social media.",
      };
      return [
        `On this project I worked as ${as}.`,
        by[type] || "I work as director, cinematographer and camera crew on music videos, short films and commercials from Madrid.",
      ];
    },
    workSheet: "View project",
    backToWork: "Back to work",
    rolesLabel: "My role",
    moreWork: "More work",
    workCtaTitle: "Got a similar project?",
    workCtaText: "Tell me what you have in mind and I'll get back to you personally.",
    workCtaButton: "Let's talk",
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
