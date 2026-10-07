import { useLang } from "../lib/i18n";

// Samba-style about: a wide set photo, the role as a large heading with the
// statement, then a portrait photo beside the bio.
const WIDE = { src: "/images/f37777664.jpg", pos: "50% 40%" };
const PORTRAIT = { src: "/images/000032.JPG", pos: "60% 35%" };

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <figure className="about-wide">
        <img src={WIDE.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: WIDE.pos }} />
      </figure>

      <div className="about-head">
        <h2 id="about-title" className="about-role">
          {t.aboutRole}
        </h2>
        <p className="about-statement">{t.aboutStatement}</p>
      </div>

      <div className="about-split">
        <figure className="about-portrait">
          <img src={PORTRAIT.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: PORTRAIT.pos }} />
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
