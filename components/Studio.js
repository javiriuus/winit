import { useLang } from "../lib/i18n";

// What I do, for whom, how and the usual questions: the text clients search for
// ("videoclips Madrid", "director de fotografía"…), set as a quiet editorial block.
export default function Studio() {
  const { t } = useLang();
  const s = t.studio;

  return (
    <section id="studio" className="section studio" aria-labelledby="studio-title">
      <div className="section-head">
        <h2 id="studio-title" className="section-title">
          {s.title}
        </h2>
      </div>
      <p className="studio-lead">{s.lead}</p>

      <ul className="studio-audiences">
        {s.audiences.map((a) => (
          <li key={a.title}>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </li>
        ))}
      </ul>

      <div className="studio-split">
        <div>
          <h3 className="meta studio-label">{s.processTitle}</h3>
          <ol className="studio-process">
            {s.process.map((p) => (
              <li key={p.title}>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="meta studio-label">{s.faqTitle}</h3>
          <div className="studio-faq">
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const faqSchema = (t) => ({
  "@type": "FAQPage",
  mainEntity: t.studio.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
