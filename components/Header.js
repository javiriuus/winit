import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLang } from "../lib/i18n";
import { CloseIcon } from "./Icons";

export default function Header({ alwaysSolid = false }) {
  const { lang, setLang, t } = useLang();
  const { pathname } = useRouter();
  const [solid, setSolid] = useState(alwaysSolid);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  // Phone menu: lock scroll while open, close on Esc.
  useEffect(() => {
    if (!menuOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const links = [
    { href: "/#work", label: t.navWork },
    { href: "/fotografia", label: t.navPhoto, current: pathname.startsWith("/fotografia") },
    { href: "/#services", label: t.navServices },
    { href: "/foro", label: t.navForum, current: pathname.startsWith("/foro") },
    { href: "/#contact", label: t.navContact },
  ];

  const langSwitch = (
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
  );

  return (
    <header className="site-header" data-solid={solid}>
      <a href="/" className="wordmark" aria-label="Javier Llarena">
        Javier Llarena
      </a>

      <nav className="site-nav" aria-label="Principal">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="link-line" aria-current={l.current ? "true" : undefined}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="header-end">
        {langSwitch}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon size={14} /> : null}
          {menuOpen ? t.close : t.menu}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={l.current ? "true" : undefined} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
