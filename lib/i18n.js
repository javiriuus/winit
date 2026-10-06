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
    viewGrid: "Cuadrícula",
    viewList: "Lista",
    viewLabel: "Vista",
    watch: "Ver",
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
    viewGrid: "Grid",
    viewList: "List",
    viewLabel: "View",
    watch: "Watch",
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
