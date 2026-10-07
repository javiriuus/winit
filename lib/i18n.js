import { createContext, useCallback, useContext, useEffect, useState } from "react";

const dict = {
  es: {
    navWork: "Trabajo",
    navServices: "Servicios",
    navContact: "Contacto",
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
    aboutStatement: "Historias con mirada de cine, rodadas desde dentro del plano.",
    aboutBody: [
      "Javier Llarena es director y director de fotografía con base en Madrid. Dirige y fotografía videoclips y firma el cortometraje S.E.P, su trabajo más reciente como director, seleccionado en Fantastic Gijón y Lloret Negre.",
      "También trabaja al servicio de otras miradas: como operador de cámara en publicidad para marcas como New Balance, como primer ayudante de cámara en cortometrajes como Sol y caipirinhas, de Pablo Galdo, y como director de fotografía y colorista en proyectos de otros directores.",
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
    aboutStatement: "Stories with a cinematic eye, shot from inside the frame.",
    aboutBody: [
      "Javier Llarena is a director and cinematographer based in Madrid. He directs and shoots music videos, and his latest work as a director is the short film S.E.P., selected at Fantastic Gijón and Lloret Negre.",
      "He also works in service of other filmmakers' vision: as camera operator on commercials for brands such as New Balance, as 1st AC on short films such as Pablo Galdo's Sol y caipirinhas, and as cinematographer and colorist for other directors.",
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

const LangContext = createContext({ lang: "es", setLang: () => {}, t: dict.es });

const STORAGE_KEY = "jl-lang";

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("es");

  useEffect(() => {
    let saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (saved === "es" || saved === "en") {
      setLangState(saved);
    } else if (navigator.language && !navigator.language.toLowerCase().startsWith("es")) {
      setLangState("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
