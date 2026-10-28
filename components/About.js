import { useLang } from "../lib/i18n";
import { responsive } from "../lib/img";

// Samba-style about: a wide set photo, the role as a large heading with the
// statement, then a portrait photo beside the bio.
const WIDE = { src: "/images/f37777664.jpg", pos: "50% 40%" };
const PORTRAIT = { src: "/images/javier-gimbal.jpg", pos: "67% 30%" };

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <figure className="about-wide">
        <img {...responsive(WIDE.src, "100vw", [828, 1200, 1920])} alt="" loading="lazy" decoding="async" style={{ objectPosition: WIDE.pos }} />
      </figure>

      <div className="about-head">
        <h2 id="about-title" className="about-role">
          {t.aboutRole}
        </h2>
        <p className="about-statement">{t.aboutStatement}</p>
      </div>

      <div className="about-split">
        <figure className="about-portrait">
          <img {...responsive(PORTRAIT.src, "(max-width: 760px) 100vw, 40vw", [640, 1080])} alt="" loading="lazy" decoding="async" style={{ objectPosition: PORTRAIT.pos }} />
        </figure>
        <div className="about-body">
          {t.aboutBody.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
