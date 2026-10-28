import { useLang } from "../lib/i18n";
import { responsive } from "../lib/img";

// Extended sheet for works that have it (synopsis, festival selections, stills).
export default function WorkDetails({ w, onStill }) {
  const { lang, t } = useLang();
  if (!w.synopsis && !w.selections && !w.stills) return null;
  return (
    <div className="work-details">
      <div className="work-details-text">
        {w.synopsis && (
          <div className="work-synopsis">
            <h3 className="meta">{t.synopsisLabel}</h3>
            <p>{w.synopsis[lang]}</p>
          </div>
        )}
        {w.selections && (
          <div className="work-selections">
            <h3 className="meta">{t.selectionsLabel}</h3>
            <ul>
              {w.selections.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {w.stills && (
        <ul className="work-stills" aria-label={t.stillsLabel(w.title)}>
          {w.stills.map((src) => (
            <li key={src}>
              {onStill ? (
                <button type="button" className="work-still-open" onClick={() => onStill(src)} aria-label={t.photoOpen(w.stills.indexOf(src) + 1)}>
                  <img {...responsive(src, "(max-width: 760px) 100vw, 50vw", [640, 1080, 1920])} alt="" loading="lazy" decoding="async" />
                </button>
              ) : (
                <img {...responsive(src, "(max-width: 760px) 100vw, 50vw", [640, 1080, 1920])} alt="" loading="lazy" decoding="async" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

