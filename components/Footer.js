import { useLang } from "../lib/i18n";
import { social } from "../lib/content";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer">
      <img src="/brand/jlf-logo.png" alt="JLF Creative Studio" width="643" height="410" className="footer-logo" />
      <span className="meta">
        © {new Date().getFullYear()} Javier Llarena. {t.rights}
      </span>
      <nav aria-label="Social">
        {social.map((s) => (
          <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="meta">
            {s.label}
          </a>
        ))}
        <a
          href="#top"
          className="meta"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t.backTop}
        </a>
      </nav>
    </footer>
  );
}
