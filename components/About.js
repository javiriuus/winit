import { useLang } from "../lib/i18n";

// Studio-style statement: one large line, then the bio.
export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <h2 id="about-title" className="sr-only">
        {t.aboutLabel}
      </h2>
      <p className="about-statement">{t.aboutStatement}</p>
      <div className="about-body">
        {t.aboutBody.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
    </section>
  );
}
