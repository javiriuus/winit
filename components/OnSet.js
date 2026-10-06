import { useLang } from "../lib/i18n";
import { stills } from "../lib/content";

// Behind-the-scenes stills as a horizontal, snap-scrolling strip.
export default function OnSet() {
  const { t } = useLang();

  return (
    <section className="stills" aria-labelledby="onset-title">
      <div className="stills-head">
        <div className="section-head">
          <h2 id="onset-title" className="section-title">
            {t.onSetTitle}
          </h2>
        </div>
      </div>
      <div className="stills-track" tabIndex={0} aria-label={t.onSetTitle}>
        {stills.map((s) => (
          <figure key={s.src}>
            <img src={s.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: s.pos }} />
          </figure>
        ))}
      </div>
    </section>
  );
}
