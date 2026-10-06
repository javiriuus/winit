import { useLang } from "../lib/i18n";
import { services } from "../lib/content";

export default function Services() {
  const { lang, t } = useLang();

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="section-head">
        <h2 id="services-title" className="section-title">
          {t.servicesTitle}
        </h2>
      </div>

      <div className="services-layout">
        <ul className="services-list">
          {services.map((s) => (
            <li className="service" key={s.en.title}>
              <h3>{s[lang].title}</h3>
              <p>{s[lang].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
