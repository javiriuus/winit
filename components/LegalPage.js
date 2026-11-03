import Header from "./Header";
import Footer from "./Footer";
import FilmicDefs from "./FilmicDefs";
import Seo from "./Seo";
import { useLang } from "../lib/i18n";

export default function LegalPage({ doc, path }) {
  const { lang } = useLang();
  const v = doc[lang];
  return (
    <>
      <Seo title={`${v.title} — Javier Llarena`} description={v.description} path={path} />
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <article className="section legal">
          <header className="post-head">
            <h1 className="post-title">{v.title}</h1>
            <p className="meta legal-updated">{v.updated}</p>
          </header>
          <div className="post-body">
            {v.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
