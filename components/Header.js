import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-solid={solid}>
      <a href="#top" className="wordmark" aria-label="Javier Llarena">
        Javier Llarena
      </a>

      <nav className="site-nav" aria-label="Principal">
        <a href="#work" className="link-line">
          {t.navWork}
        </a>
        <a href="#services" className="link-line">
          {t.navServices}
        </a>
        <a href="#contact" className="link-line nav-contact">
          {t.navContact}
        </a>
      </nav>

      <div className="header-end">
        <div className="lang" role="group" aria-label={t.langLabel}>
          <button type="button" aria-pressed={lang === "es"} onClick={() => setLang("es")} lang="es">
            ES
          </button>
          <span className="lang-sep" aria-hidden="true">
            /
          </span>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")} lang="en">
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
